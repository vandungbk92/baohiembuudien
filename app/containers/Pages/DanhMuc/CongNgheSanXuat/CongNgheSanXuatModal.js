import React, { Component } from 'react';
import { Input, Button, Form, message, Modal, InputNumber} from "antd";
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { add, updateById } from '@services/danhmuc/congnghesanxuatService';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import { fetchCongNgheSanXuat } from '@reduxApp/HoatDongSanXuat/actions';

class CongNgheSanXuatModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.formRefCongNghe = React.createRef();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let {showModal, data} = this.props;
    if(showModal !== prevProps.showModal){
      await this.setState({showModal: true});
      if(data){
        this.formRefCongNghe?.current?.setFieldsValue(data);
      }else{
        this.formRefCongNghe?.current?.resetFields();
      }
    }
  }

  toggleModal = async () => {
    const { showModal } = this.state;
    await this.setState({ showModal: !showModal });
    this.formRefCongNghe?.current.resetFields();
  }

  handleSaveData = async (dataForm) => {
    let tencongnghesx = dataForm.tencongnghesx
    dataForm.tencongnghesx = tencongnghesx.trim()
    if (!tencongnghesx.trim()) {
      this.formRefCongNghe.current.setFieldsValue({ tencongnghesx: '' });
      this.formRefCongNghe.current.validateFields();
      return;
    }
    const { data } = this.props;
    if (data) {
      // edit
      const apiResponse = await updateById(data._id, dataForm);
      if(apiResponse){
        if(this.props.getDataAfterSave) this.props.getDataAfterSave(apiResponse, 'UPDATE')
        this.setState({ showModal: false });
        this.props.dispatch(fetchCongNgheSanXuat());
        message.success('Chỉnh sửa công nghệ sản xuất thành công');
      }
    } else {
      // create
      const apiResponse = await add(dataForm);
      if (apiResponse) {
        if(this.props.getDataAfterSave) this.props.getDataAfterSave(apiResponse, 'ADD')
        this.setState({ showModal: false });
        this.props.dispatch(fetchCongNgheSanXuat());
        message.success('Thêm mới công nghệ sản xuất thành công');
      }
    }
  }

  render() {
    let {data, loading} = this.props;
    return <Modal title={data ? 'Chỉnh sửa công nghệ sản xuất' : 'Thêm mới công nghệ sản xuất'}
                  visible={this.state.showModal}
                  onCancel={loading ? () => null : this.toggleModal}
                  footer={[
                    <Button key={1} size="small" onClick={this.toggleModal} disabled={loading} type="danger" icon={<CloseOutlined />}>Huỷ</Button>,
                    <Button key={2} size="small" type="primary" htmlType="submit" form="formModalCongNghe" loading={loading} icon={<SaveOutlined />}>
                      {data ? 'Lưu' : 'Thêm'}
                    </Button>,
                  ]}>
      <Form ref={this.formRefCongNghe} id="formModalCongNghe" name='formModalCongNghe' autoComplete='off'
            onFinish={this.handleSaveData} labelAlign="right">
        <Form.Item label="Công nghệ sản xuất" name="tencongnghesx" hasFeedback labelCol={{ span: 8 }} validateTrigger={['onChange', 'onBlur']}
                   rules={[{ required: true, whitespace: true, message: 'Công nghệ sản xuất không được để trống' }]}>
          <Input placeholder='Công nghệ sản xuất' disabled={loading}/>
        </Form.Item>
        <Form.Item label="Thứ tự" name="thutu" labelCol={{ span: 8 }}
                   hasFeedback>
          <InputNumber placeholder='Thứ tự' disabled={loading}/>
        </Form.Item>
      </Form>
    </Modal>;
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(CongNgheSanXuatModal);
