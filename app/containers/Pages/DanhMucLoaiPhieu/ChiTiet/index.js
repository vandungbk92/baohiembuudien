import React, { Component, Fragment } from 'react';
import {
  Tabs,
  Checkbox,
  Input,
  Button,
  Form,
  Col,
  Row,
  message,
  InputNumber,
  Upload,
} from 'antd';
import {
  SaveOutlined,
  UploadOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { add, getById, updateById } from '@services/danhmucloaiphieuService';
import {  CONSTANTS } from '@constants';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import { uploadFiles } from '@services/uploadServices';
import { makeGetMyInfo } from '../../../Layout/HeaderComponent/HeaderProvider/selectors';
import Box from '@containers/Box';
import {THONG_TIN_DON_VI, THONG_TIN_CHAT_THAI, HOAT_DONG_DON_VI, KET_LUAN_THANH_TRA} from '@constants';
const { TabPane } = Tabs;

class DanhMucLoaiPhieu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRes: [],
      fileList: [],
      _id: this.props.match.params.id,
    };
    this.formRef = React.createRef();
  }

  onChangeTabs = (activeKey) => {
    this.setState({ activeKey });
  };

  async componentDidMount() {
    try {
      let { _id, fileList } = this.state;
      if (_id) {
        let apiRequest = await getById(_id);
        if (apiRequest) {
          fileList = this.convertUrlToList(apiRequest.files);
          this.setState({ fileList });
        }
        this.formRef.current.setFieldsValue(apiRequest);
      }
    } catch (e) {
      console.log(e);
    }
  }

  handleSaveData = async (data) => {
    let tenphieu = data.tenphieu;
    let maphieu = data.maphieu;
    let { fileList } = this.state;

    if (!tenphieu.trim() || !maphieu.trim()) {
      this.formRef.current.setFieldsValue({ tenphieu: '' });
      this.formRef.current.validateFields();
      return;
    }
    let [originFileNmKq, fileUploadKq] = this.getfileDetail(fileList);
    if (fileUploadKq.length) {
      let filesup = await uploadFiles(fileUploadKq);
      if (filesup && filesup.length) {
        originFileNmKq = [...originFileNmKq, ...filesup];
      }
    }
    data.files = originFileNmKq;
    const { _id } = this.state;
    if (_id) {
      // edit
      const apiResponse = await updateById(_id, data);
      if (apiResponse) {
        let fileList = this.convertUrlToList(apiResponse.files);
        this.setState({fileList});
        message.success('Cập nhật dữ liệu thành công');
      }

    } else {
      // create
      const apiResponse = await add(data);
      if (apiResponse) {
        message.success('Thêm mới dữ liệu thành công');
        this.props.history.push('/loai-phieu/' + apiResponse._id);
      }
    }
  };

  convertUrlToList = (list) => {
    let arr = list.map((data, idx) => {
      return {
        uid: idx,
        name: data,
        status: 'done',
        url: '/api/files/' + data,
        fileNm: data
      };
    });
    return arr;
  };


  renderThongTinDonVi() {
    return THONG_TIN_DON_VI.map((data, idx) => {
      return <Col xs={8} key={idx}>
        <Checkbox value={data.value}>{data.label}</Checkbox>
      </Col>;
    });
  }

  renderThongTinChatThai() {
    return THONG_TIN_CHAT_THAI.map((data, idx) => {
      return <Col xs={8} key={idx}>
        <Checkbox value={data.value}>{data.label}</Checkbox>
      </Col>;
    });
  }

  renderKetLuanThanhTra() {
    return KET_LUAN_THANH_TRA.map((data, idx) => {
      return <Col xs={8} key={idx}>
        <Checkbox value={data.value}>{data.label}</Checkbox>
      </Col>;
    });
  }

  renderHoatDongCuaDonVi() {
    return HOAT_DONG_DON_VI.map((data, idx) => {
      return <Col xs={12} key={idx}>
        <Checkbox value={data.value}>{data.label}</Checkbox>
      </Col>;
    });
  }

  getfileDetail = (listFile) => {
    let originFileNm = [];
    let fileUpload = [];
    listFile.filter(data => {
      if (data.url) {
        originFileNm = [...originFileNm, data.fileNm];
      } else {
        fileUpload = [...fileUpload, data.originFileObj];
      }
    });
    return [originFileNm, fileUpload];
  };

  handleChangeFiles = ({ fileList }) => this.setState({ fileList });

  render() {
    const { loading } = this.props;
    return <div>

      <Form ref={this.formRef} id="myForm" layout='vertical' name='myForm' autoComplete='off'
            onFinish={this.handleSaveData}>
        <Box title='LOẠI PHIẾU'
             boxActions= {this.props.myInfoResponse.role === CONSTANTS.ADMIN ?   <Button key="submit" htmlType="submit" form="myForm" icon={<SaveOutlined/>} size='small'
             type="primary" disabled={loading}>Lưu dữ liệu</Button> : ''}>
          <Row gutter={10}>
            <Col sm={24}>
              <Form.Item label={<b>Mã phiếu</b>} name="maphieu" hasFeedback validateTrigger={['onChange', 'onBlur']}
                         rules={[{ required: true, whitespace: true, message: 'Mã phiếu không được để trống' }]}>
                <Input placeholder='Mã phiếu' disabled={true}/>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label={<b>Tên phiếu</b>} name="tenphieu" hasFeedback validateTrigger={['onChange', 'onBlur']}
                         rules={[{ required: true, whitespace: true, message: 'Tên phiếu không được để trống' }]}>
                <Input placeholder='Tên phiếu' disabled={loading}/>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label={<b>Mô tả</b>} name="mota" hasFeedback validateTrigger={['onChange', 'onBlur']}>
                <Input.TextArea autoSize={{ minRows: 1, maxRows: 6 }} rows={5}
                                placeholder='Mô tả' disabled={loading}/>
              </Form.Item>
            </Col>
            <Col sm={24}>

              <Form.Item label={<b>Mẫu phiếu</b>} name="files" className="">

                <Upload
                  disabled={loading}
                  action={false}
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={this.handleChangeFiles}
                  fileList={this.state.fileList}
                  beforeUpload={file => {
                    return false;
                  }}
                  showUploadList={{
                    showDownloadIcon: true,
                    showRemoveIcon: true,
                    downloadIcon: (file) => <a download target="_self" href={file.url}><DownloadOutlined/></a>
                  }}
                >
                  <Button icon={<UploadOutlined/>}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item label={<b>Tên phiếu viết tắt</b>} name="tenphieu_viettat"
                         hasFeedback>
                <Input placeholder='Viết tắt' disabled={loading}/>
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item label={<b>Thứ tự</b>} name="thutu"
                         hasFeedback>
                <InputNumber placeholder='Thứ tự' disabled={loading}/>
              </Form.Item>
            </Col>

            <Col sm={8}>
              <Form.Item label={<b>Link</b>} name="link"
                         hasFeedback>
                <Input placeholder='Link' disabled={true}/>
              </Form.Item>
            </Col>

            <Tabs activeKey={this.state.activeKey} onChange={this.onChangeTabs}>
              <TabPane tab="A. Thông tin đơn vị được điều tra" key="1">
                <Col xs={24}>
                  <Form.Item label={<b>Chọn danh mục</b>} name="thongtindonvi">
                    <Checkbox.Group className="w-100">
                      <Row>
                        {
                          this.renderThongTinDonVi()
                        }
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
              </TabPane>
              <TabPane tab="B. Hoạt động của đơn vị" key="2">
                <Col xs={24}>
                  <Form.Item label={<b>Label hiển thị</b>} name="label_hoatdong">
                    <Input disabled={false}/>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label={<b>Chọn hoạt động của đơn vị</b>} name="hoatdongdonvi">
                    <Checkbox.Group className="w-100">
                      <Row>
                        {
                          this.renderHoatDongCuaDonVi()
                        }
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>

              </TabPane>
              <TabPane tab="C. Thông tin chất thải" key="3">
                <Col xs={24}>
                  <Form.Item label={<b>Chọn danh mục</b>} name="thongtinchatthai">
                    <Checkbox.Group className="w-100">
                    <Row>
                        {
                          this.renderThongTinChatThai()
                        }
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
              </TabPane>

              <TabPane tab="D. Thông tin thủ tục hành chính" key="4">
                <Col xs={24}>
                  <Form.Item label={<b>Chọn danh mục kết luận thanh tra</b>} name="ketluanthanhtra">
                    <Checkbox.Group className="w-100">
                    <Row>
                        {
                          this.renderKetLuanThanhTra()
                        }
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
              </TabPane>
            </Tabs>
          </Row>
          {/* <Button key="submit" htmlType="submit" form="myForm" icon={<SaveOutlined/>} size='small' type="primary">Lưu dữ liệu</Button> */}

        </Box>
      </Form>
    </div>;
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
  myInfoResponse: makeGetMyInfo(),

});

const withConnect = connect(mapStateToProps);

export default withConnect(DanhMucLoaiPhieu);
