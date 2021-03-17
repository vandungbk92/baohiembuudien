import React, { Component, Fragment } from 'react';
import {
  Input,
  InputNumber,
  Button,
  Form,
  message,
  Row,
  Col,
  Select,
  Radio,
  Checkbox
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { add, getById, updateById } from '@services/donviduocdieutraService';
import {  CONSTANTS } from '@constants';
import { getAllQuanHuyenById } from '@services/danhmuc/tinhthanhService';
import { getAllPhuongXaById } from '@services/danhmuc/quanhuyenService';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { makeGetMyInfo } from '../../../Layout/HeaderComponent/HeaderProvider/selectors';
import { connect } from 'react-redux';
import axios from 'axios';
import { URL } from '@url';
import Box from '@containers/Box';
import produce from 'immer';
import { withLoaiPhieu } from '@reduxApp/LoaiPhieu/connect';
import { withTinhThanh } from '@reduxApp/TinhThanh/connect';
import { withSetting } from '@reduxApp/Setting/connect';
import { compose } from 'redux';
import { LOAI_HINH_KINH_TE, LOAI_HINH_XU_LY, THONG_TIN_DON_VI, XEP_HANG_CO_SO, RULE } from '@constants';
import moment from 'moment';

const layoutCol = { 'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 4, 'xxl': 4 };
const layoutCol1 = { 'xs': 24, 'sm': 24, 'md': 24, 'lg': 24, 'xl': 8, 'xxl': 8 };
const layoutCol2 = { 'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 6, 'xxl': 6 };
const layoutCol3 = { 'xs': 24, 'sm': 24, 'md': 12, 'lg': 12 };
const layoutCol4 = { 'xs': 24, 'sm': 24, 'md': 24, 'lg': 24, 'xl': 16 };

class DonViDuocDieuTra extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quanhuyen: [],
      xaphuong: [],
      quanhuyenhoatdong: [],
      xaphuonghoatdong: [],
      _id: this.props.match.params.id,
      arrThongTin: [],
    };
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    try {
      let { _id } = this.state;
      let { loaiphieu, setting } = this.props;
      let arrThongTin = [];
      if (_id) {
        let apiRequest = await getById(_id);
        loaiphieu.forEach((curr, idx) => {
          if (curr._id === apiRequest.loaiphieu_id) {
            arrThongTin = curr.thongtindonvi;
          }
        });
        this.setState({ arrThongTin });
        if (apiRequest) {
          const newData = produce(apiRequest, draft => {
            draft.tinhthanhtruso_id = draft.tinhthanhtruso_id ? draft.tinhthanhtruso_id._id : undefined;
            draft.quanhuyentruso_id = draft.quanhuyentruso_id ? draft.quanhuyentruso_id._id : undefined;
            draft.phuongxatruso_id = draft.phuongxatruso_id ? draft.phuongxatruso_id._id : undefined;
            draft.tinhthanhhoatdong_id = draft.tinhthanhhoatdong_id ? draft.tinhthanhhoatdong_id._id : undefined;
            draft.quanhuyenhoatdong_id = draft.quanhuyenhoatdong_id ? draft.quanhuyenhoatdong_id._id : undefined;
            draft.phuongxahoatdong_id = draft.phuongxahoatdong_id ? draft.phuongxahoatdong_id._id : undefined;
          });

          this.formRef.current.setFieldsValue(newData);
          let apiRequestTT = [
            newData.tinhthanhtruso_id ? getAllQuanHuyenById(newData.tinhthanhtruso_id) : null,
            newData.quanhuyentruso_id ? getAllPhuongXaById(newData.quanhuyentruso_id) : null,
            newData.tinhthanhhoatdong_id ? getAllQuanHuyenById(newData.tinhthanhhoatdong_id) : null,
            newData.quanhuyenhoatdong_id ? getAllPhuongXaById(newData.quanhuyenhoatdong_id) : null,
          ];

          let apiResponse = await axios.all(apiRequestTT).then(axios.spread(function(quanhuyen, xaphuong, quanhuyenhoatdong, xaphuonghoatdong) {
            return {
              quanhuyen: quanhuyen,
              xaphuong: xaphuong,
              quanhuyenhoatdong: quanhuyenhoatdong,
              xaphuonghoatdong: xaphuonghoatdong,
            };
          }));
          let quanhuyen = apiResponse.quanhuyen ? apiResponse.quanhuyen : this.state.quanhuyen;
          let xaphuong = apiResponse.xaphuong ? apiResponse.xaphuong : this.state.xaphuong;
          let quanhuyenhoatdong = apiResponse.quanhuyenhoatdong ? apiResponse.quanhuyenhoatdong : this.state.quanhuyenhoatdong;
          let xaphuonghoatdong = apiResponse.xaphuonghoatdong ? apiResponse.xaphuonghoatdong : this.state.xaphuonghoatdong;
          this.setState({ quanhuyen, xaphuong, quanhuyenhoatdong, xaphuonghoatdong });

        }
      }
      else{
        if(setting.tinhdieutra_id){
          this.formRef.current.setFieldsValue({
            tinhthanhtruso_id: setting?.tinhdieutra_id,
            tinhthanhhoatdong_id: setting?.tinhdieutra_id
          });
          const quanhuyen = await getAllQuanHuyenById(setting.tinhdieutra_id);
          if (quanhuyen) {
            this.setState({ quanhuyen, quanhuyenhoatdong: quanhuyen});
          }
        }

      }
    } catch (e) {
      console.log(e);
    }
  }

  onFinish = async (values) => {
    if (this.state._id) {
      values.tencoso = values.tencoso.trim();
      values.nguoidaidien = values.nguoidaidien.trim();
      if (!values.tencoso || !values.nguoidaidien) {
        this.formRef.current.setFieldsValue({ tencoso: values.tencoso, nguoidaidien: values.nguoidaidien  });
        this.formRef.current.validateFields();
        return;
      }
      let apiRes = await updateById(this.state._id, values);
      if (apiRes) {
        message.success('Cập nhật dữ liệu thành công.');
      }
    } else {
      values.tencoso = values.tencoso.trim();
      values.nguoidaidien = values.nguoidaidien.trim();
      if (!values.tencoso || !values.nguoidaidien) {
        this.formRef.current.setFieldsValue({ tencoso: values.tencoso, nguoidaidien: values.nguoidaidien  });
        this.formRef.current.validateFields();
        return;
      }
      let apiRes = await add(values);
      if (apiRes) {
        message.success('Thêm dữ liệu thành công.');
        this.props.history.push(URL.DON_VI_DUOC_DIEU_TRA_ID.format(apiRes._id));
      }
    }
  };

  onFieldsChange = async (changedValues, allValues) => {

    if (changedValues.hasOwnProperty('tinhthanhtruso_id')) {
      this.formRef.current.setFieldsValue({ quanhuyentruso_id: '', phuongxatruso_id: '' });
      const quanhuyen = await getAllQuanHuyenById(changedValues['tinhthanhtruso_id']);
      if (quanhuyen) {
        this.setState({ quanhuyen, xaphuong: [] });
      }
    } else if (changedValues.hasOwnProperty('quanhuyentruso_id')) {
      this.formRef.current.setFieldsValue({ phuongxatruso_id: '' });
      const xaphuong = await getAllPhuongXaById(changedValues['quanhuyentruso_id']);
      if (xaphuong) {
        this.setState({ xaphuong });
      }
    } else if (changedValues.hasOwnProperty('tinhthanhhoatdong_id')) {
      this.formRef.current.setFieldsValue({ quanhuyenhoatdong_id: '', phuongxahoatdong_id: '' });
      const quanhuyenhoatdong = await getAllQuanHuyenById(changedValues['tinhthanhhoatdong_id']);
      if (quanhuyenhoatdong) {
        this.setState({ quanhuyenhoatdong, xaphuonghoatdong: [] });
      }
    } else if (changedValues.hasOwnProperty('quanhuyenhoatdong_id')) {
      this.formRef.current.setFieldsValue({ phuongxahoatdong_id: '' });
      const xaphuonghoatdong = await getAllPhuongXaById(changedValues['quanhuyenhoatdong_id']);
      if (xaphuonghoatdong) {
        this.setState({ xaphuonghoatdong });
      }
    } else if (changedValues.hasOwnProperty('loaiphieu_id')) {
      let { loaiphieu } = this.props;
      let arrThongTin = [];
      loaiphieu.forEach((curr, idx) => {
        if (curr._id === changedValues.loaiphieu_id) {
          arrThongTin = curr.thongtindonvi;
        }
      });
      this.setState({ arrThongTin });

    }
  };

  renderLoaiHinhXuLy() {
    return LOAI_HINH_XU_LY.map((data, idx) => {
      return <Col {...layoutCol} key={idx}>
        <Checkbox value={data.value}>{data.label}</Checkbox>
      </Col>;
    });
  }

  renderLoaiHinhKinhTe() {
    return LOAI_HINH_KINH_TE.map((data, idx) => {
      return <Col {...layoutCol3} key={idx}>
        <Radio value={data.value}>{data.label}</Radio>
      </Col>;
    });
  }

  renderXepHangCoSo() {
    return XEP_HANG_CO_SO.map((data, idx) => {
      return <Col {...layoutCol2} key={idx}>
        <Radio value={data.value}>{data.label}</Radio>
      </Col>;
    });
  }

  render() {

    const { loading, tinhthanh, loaiphieu } = this.props;
    const { _id, quanhuyen, xaphuong, quanhuyenhoatdong, xaphuonghoatdong, arrThongTin } = this.state;
    return <Form ref={this.formRef} layout='vertical' size='small' autoComplete='off' onFinish={this.onFinish}
                 onValuesChange={this.onFieldsChange} id="myForm">
      <Box title='Đơn vị được điều tra'
           boxActions={this.props.myInfoResponse.role === CONSTANTS.ADMIN ?<Button key="submit" htmlType="submit" form="myForm" icon={<SaveOutlined/>} size='small'
           type="primary">Lưu dữ liệu</Button> : ''}>
        <Row gutter={10}>
          <Col sm={24}>
            <Form.Item label={<b>Loại phiếu</b>} name="loaiphieu_id"
                       validateTrigger={['onChange', 'onBlur']}
                       rules={[{ required: true, message: 'Loại phiếu không được để trống' }]}>
              <Select placeholder='Chọn loại phiếu' disabled={_id ? true : false} dropdownClassName='small' showSearch
                      filterOption={(input, option) => {
                        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                      }}>
                {loaiphieu.map(data => {
                  return <Select.Option key={data._id} value={data._id}>
                    {data.tenphieu}
                  </Select.Option>;
                })}
              </Select>

            </Form.Item>
          </Col>

          <Col sm={12}>
            <Form.Item label={<b>Tên cơ sở</b>} name="tencoso" validateTrigger={['onChange', 'onBlur']}
                       rules={[{ required: true, message: 'Tên cơ sở không được để trống' }]}>
              <Input placeholder='Tên cơ sở' disabled={loading}/>
            </Form.Item>
          </Col>

          {
            arrThongTin.indexOf('CHUNGUONTHAI') !== -1 && <Col sm={12}>
              <Form.Item label={<b>Tên chủ nguồn thải</b>} name="chunguonthai"
                         validateTrigger={['onChange', 'onBlur']}
              >
                <Input placeholder='Tên chủ nguồn thải' disabled={loading}/>
              </Form.Item>
            </Col>
          }
        </Row>
        <Row gutter={10}>
          <Col sm={12}>
            <Row gutter={10}>
              <Col sm={24}><strong>Địa chỉ trụ sở</strong></Col>
              <Col {...layoutCol1}>
                <Form.Item label="Tỉnh" name="tinhthanhtruso_id" validateTrigger={['onChange', 'onBlur']}
                           rules={[{ required: true, message: 'Tỉnh không được để trống' }]}>
                  <Select placeholder='Chọn tỉnh thành' disabled={loading} dropdownClassName='small' showSearch
                          filterOption={(input, option) => {
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                          }}>
                    {tinhthanh.map(data => {
                      return <Select.Option key={data._id} value={data._id}>
                        {data.tentinh}
                      </Select.Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col {...layoutCol1}>
                <Form.Item label="Quận huyện" name="quanhuyentruso_id"
                           validateTrigger={['onChange', 'onBlur']}
                           rules={[{ required: true, message: 'Huyện không được để trống' }]}>
                  <Select placeholder='Chọn quận huyện' disabled={loading} dropdownClassName='small' showSearch
                          filterOption={(input, option) => {
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                          }}>
                    {quanhuyen.map(data => {
                      return <Select.Option key={data._id} value={data._id}>
                        {data.tenqh}
                      </Select.Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col {...layoutCol1}>
                <Form.Item label="Xã phường" name="phuongxatruso_id"
                           validateTrigger={['onChange', 'onBlur']}
                           rules={[{ required: true, message: 'Xã không được để trống' }]}>
                  <Select placeholder='Chọn xã phường' disabled={loading} dropdownClassName='small' showSearch
                          filterOption={(input, option) => {
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                          }}>
                    {xaphuong.map(data => {
                      return <Select.Option key={data._id} value={data._id}>
                        {data.tenphuongxa}
                      </Select.Option>;
                      ``;
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col sm={12}>
            <Row gutter={10}>
              <Col sm={24}><strong>Địa điểm hoạt động</strong></Col>

              <Col {...layoutCol1}>
                <Form.Item label="Tỉnh" name="tinhthanhhoatdong_id"
                           validateTrigger={['onChange', 'onBlur']}
                           rules={[{ required: true, message: 'Tỉnh không được để trống' }]}>
                  <Select placeholder='Chọn tỉnh thành' disabled={loading} dropdownClassName='small' showSearch
                          filterOption={(input, option) => {
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                          }}>
                    {tinhthanh.map(data => {
                      return <Select.Option key={data._id} value={data._id}>
                        {data.tentinh}
                      </Select.Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col {...layoutCol1}>
                <Form.Item label="Quận huyện" name="quanhuyenhoatdong_id"
                           validateTrigger={['onChange', 'onBlur']}
                           rules={[{ required: true, message: 'HUyện không được để trống' }]}>
                  <Select placeholder='Chọn quận huyện' disabled={loading} dropdownClassName='small' showSearch
                          filterOption={(input, option) => {
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                          }}>
                    {quanhuyenhoatdong.map(data => {
                      return <Select.Option key={data._id} value={data._id}>
                        {data.tenqh}
                      </Select.Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col {...layoutCol1}>
                <Form.Item label="Xã phường" name="phuongxahoatdong_id"
                           validateTrigger={['onChange', 'onBlur']}
                           rules={[{ required: true, message: 'Xã không được để trống' }]}>
                  <Select placeholder='Chọn xã phường' disabled={loading} dropdownClassName='small' showSearch
                          filterOption={(input, option) => {
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                          }}>
                    {xaphuonghoatdong.map(data => {
                      return <Select.Option key={data._id} value={data._id}>
                        {data.tenphuongxa}
                      </Select.Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col sm={24} xl={16}>
            <Row gutter={10}>
              <Col sm={24}>
                <strong>Người đại điện pháp luật</strong>
              </Col>

              <Col {...layoutCol2}>
                <Form.Item label="Họ tên" name="nguoidaidien"
                           validateTrigger={['onChange', 'onBlur']}
                           rules={[{ required: true, message: 'Họ và tên người đại diện không được để trống' }]}>
                  <Input placeholder='Họ tên' disabled={loading}/>
                </Form.Item>
              </Col>
              <Col {...layoutCol2}>
                <Form.Item label="Điện thoại" name="dienthoai" rules={[RULE.PHONE]}>
                  <Input placeholder='Điện thoại' disabled={loading}/>
                </Form.Item>
              </Col>
              <Col {...layoutCol2}>
                <Form.Item label="Fax" name="fax">
                  <Input placeholder='Fax' disabled={loading}/>
                </Form.Item>
              </Col>
              <Col {...layoutCol2}>
                <Form.Item label="Email" name="email"  rules={[RULE.EMAIL]}>
                  <Input placeholder='Email' disabled={loading}/>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          {arrThongTin.indexOf('TOADO') !== -1 && <Col sm={24} xl={8}>
            <Row gutter={10}>
              <Col sm={24}>
                <strong>Tọa độ</strong>
              </Col>
              <Col {...layoutCol3}>
                <Form.Item label="Kinh độ" name="kinhdo">
                  <Input placeholder='Kinh độ' disabled={loading}/>
                </Form.Item>
              </Col>
              <Col {...layoutCol3}>
                <Form.Item label="Vĩ độ" name="vido">
                  <Input placeholder='Vĩ độ' disabled={loading}/>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          }

        </Row>
        <Row gutter={10}>
          {
            arrThongTin.indexOf('THUOCKKT') !== -1 && <Col {...layoutCol1}>
              <Form.Item label={<b>Thuộc KKT/KCN/CCN</b>} name="khukinhte">
                <Input placeholder='Thuộc KKT/KCN/CCN' disabled={loading}/>
              </Form.Item>
            </Col>
          }

          <Col {...layoutCol}>
            <Form.Item label={<b>Năm hoạt động</b> } name="namhoatdong" rules={[RULE.NUMBER]}> 
              <Input placeholder='Năm hoạt động' disabled={loading}/>
            </Form.Item>
          </Col>

          <Col {...layoutCol}>
            <Form.Item label={<b>Diện tích mặt bằng (m2)</b>} name="dientichmatbang" rules={[RULE.NUMBER]}>
              <Input placeholder='Diện tích mặt bằng' disabled={loading}/>
            </Form.Item>
          </Col>

          {
            arrThongTin.indexOf('SONHANVIEN') !== -1 && <Col {...layoutCol} >
              <Form.Item label={<b>Tổng số nhân viên</b>} name="sonhanvien" rules={[RULE.NUMBER]}>
                <Input placeholder='Tổng số nhân viên' disabled={loading}/>
              </Form.Item>
            </Col>
          }

          {
            arrThongTin.indexOf('WEBSITE') !== -1 && <Col {...layoutCol}>
              <Form.Item label={<b>Địa chỉ website</b>} name="website">
                <Input placeholder='Địa chỉ website' disabled={loading}/>
              </Form.Item>
            </Col>
          }

          {
            arrThongTin.indexOf('NGHEUUTIEN') !== -1 && <Col {...layoutCol4}>
              <Form.Item label={<b>Ngành nghề ưu tiên đầu tư vào KKT, KCN, CCN : (theo Hệ thống ngành kinh tế Việt Nam năm 2007):</b>} name="ngheuutien">
                <Input placeholder='Ngành nghề ưu tiên' disabled={loading}/>
              </Form.Item>
            </Col>
          }

          {
            arrThongTin.indexOf('LANGNGHE') !== -1 && <Col {...layoutCol1}>
              <Form.Item label={<b>Thuộc làng nghề</b>} name="langnghe">
                <Input placeholder='Thuộc làng nghề' disabled={loading}/>
              </Form.Item>
            </Col>
          }

          {arrThongTin.indexOf('LOAIHINHXULY') !== -1 && <Col xs={24}>
            <Form.Item label={<b>Loại hình thực hiện xử lý</b>} name="loaihinhxuly">
              <Checkbox.Group className="w-full">
                <Row>
                  {
                    this.renderLoaiHinhXuLy()
                  }
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>

          }
          {arrThongTin.indexOf('LOAIHINHKINHTE') !== -1 && <Col {...layoutCol2}>
            <Form.Item label={<b>Loại hình kinh tế</b>} name="loaihinhkinhte">
              <Radio.Group className="w-full">
                <Row>
                  {
                    this.renderLoaiHinhKinhTe()
                  }
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
          }

          {
            arrThongTin.indexOf('XEPHANGCOSO') !== -1 && <Col xs={20}>
              <Form.Item label={<b>Xếp hạng cơ sở</b>} name="xephangcoso">
                <Radio.Group className="w-full">
                  <Row>
                    {
                      this.renderXepHangCoSo()
                    }
                  </Row>
                </Radio.Group>
              </Form.Item>
            </Col>
          }

          {arrThongTin.indexOf('XEPHANGCOSO') !== -1 && <Col xs={4}>
            <Form.Item label="Xếp hạng" name="xephang">
              <InputNumber placeholder='Xếp hạng' disabled={loading}/>
            </Form.Item>
          </Col>
          }
        </Row>
      </Box>
    </Form>;
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
  myInfoResponse: makeGetMyInfo(),

});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, withLoaiPhieu, withTinhThanh, withSetting)(DonViDuocDieuTra);


