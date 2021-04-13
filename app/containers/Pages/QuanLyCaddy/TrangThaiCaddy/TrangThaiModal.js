import React, { Component } from 'react';
import { Input, Button, Form, message, Modal, InputNumber} from "antd";
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { add, updateById } from '@services/quanlycaddy/trangthaicaddyService';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';


class TrangThaiCaddyhModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.formRef = React.createRef();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let {showModal, data} = this.props;
    if(showModal !== prevProps.showModal){
      await this.setState({showModal: true});
      if(data){
        this.formRef?.current?.setFieldsValue(data);
      }else{
        this.formRef?.current?.resetFields();
      }
    }
  }

  toggleModal = async () => {
    const { showModal } = this.state;
    await this.setState({ showModal: !showModal });
    this.formRef?.current.resetFields();
  }

  handleSaveData = async (dataForm) => {
    let tentrangthai = dataForm.tentrangthai
    dataForm.tentrangthai = tentrangthai.trim()
    if (!tentrangthai.trim()) {
      this.formRef.current.setFieldsValue({ tentrangthai: '' });
      this.formRef.current.validateFields();
      return;
    }
    const { data } = this.props;
    if (data) {
      // edit
      const apiResponse = await updateById(data._id, dataForm);
      if(apiResponse){
        if(this.props.getDataAfterSave) this.props.getDataAfterSave(apiResponse, 'UPDATE')
        this.setState({ showModal: false });
        this.props.dispatch(fetchTrangThaiCaddy());
        message.success('Chỉnh sửa trạng thái');
      }
    } else {
      // create
      const apiResponse = await add(dataForm);
      if (apiResponse) {
        if(this.props.getDataAfterSave) this.props.getDataAfterSave(apiResponse, 'ADD')
        this.setState({ showModal: false });
        this.props.dispatch(fetchTrangThaiCaddy());
        message.success('Thêm mới trạng thái');
      }
    }
  }

  render() {
    let {data, loading} = this.props;
    return <Modal title={data ? 'Chỉnh sửa trạng thái' : 'Thêm mới đơn trạng thái'}
                  visible={this.state.showModal}
                  onCancel={loading ? () => null : this.toggleModal}
                  footer={[
                    <Button key={1} size="small" onClick={this.toggleModal} disabled={loading} type="danger" icon={<CloseOutlined />}>Huỷ</Button>,
                    <Button key={2} size="small" type="primary" htmlType="submit" form="formModalTrangThai" loading={loading} icon={<SaveOutlined />}>
                      {data ? 'Lưu' : 'Thêm'}
                    </Button>,
                  ]}>
      <Form ref={this.formRef} id="formModalTrangThai" name='formModalTrangThai' autoComplete='off'
            onFinish={this.handleSaveData} labelAlign="right">
        <Form.Item label="Trạng thái" name="tentrangthai" hasFeedback labelCol={{ span: 8 }} validateTrigger={['onChange', 'onBlur']}
                   rules={[{ required: true, whitespace: true, message: 'Trạng thái không được để trống' }]}>
          <Input placeholder='Trạng thái' disabled={loading}/>
        </Form.Item>
        <Form.Item label="Mô tả" name="mota" hasFeedback labelCol={{ span: 8 }} validateTrigger={['onChange', 'onBlur']}
                   rules={[{ required: false, whitespace: true }]}>
          <Input placeholder='Mô tả' disabled={loading}/>
        </Form.Item>
        <Form.Item label="Thứ tự" name="thutu" hasFeedback labelCol={{ span: 8 }} validateTrigger={['onChange', 'onBlur']}
                   rules={[{ required: false, whitespace: true }]}>
          <Input placeholder='Thứ tự' disabled={loading}/>
        </Form.Item>
      </Form>
    </Modal>;
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(TrangThaiCaddyhModal);
