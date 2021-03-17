import React, { Component } from 'react';
import { Input, Button, Form, message, Modal, InputNumber} from "antd";
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { add, updateById } from '@services/danhmuc/loaihinhchannuoiService';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
//import { fetchLoaiHinhChanNuoi } from '@reduxApp/HoatDongSanXuat/actions';

class LoaiHinhChanNuoiModal extends Component {

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
    let tenloaihinh = dataForm.tenloaihinh
    if (!tenloaihinh.trim()) {
      this.formRef.current.setFieldsValue({ tenloaihinh: '' });
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
        //this.props.dispatch(fetchLoaiHinhChanNuoi());
        message.success('Chỉnh sửa loại hình chăn nuôi thành công');
      }
    } else {
      // create
      const apiResponse = await add(dataForm);
      if (apiResponse) {
        if(this.props.getDataAfterSave) this.props.getDataAfterSave(apiResponse, 'ADD')
        this.setState({ showModal: false });
        //this.props.dispatch(fetchLoaiHinhChanNuoi());
        message.success('Thêm mới loại hình chăn nuôi thành công');
      }
    }
  }

  render() {
    let {data, loading} = this.props;
    return <Modal title={data ? 'Chỉnh sửa loại hình chăn nuôi' : 'Thêm mới loại hình chăn nuôi'}
                  visible={this.state.showModal}
                  onCancel={loading ? () => null : this.toggleModal}
                  footer={[
                    <Button key={1} size="small" onClick={this.toggleModal} disabled={loading} type="danger" icon={<CloseOutlined />}>Huỷ</Button>,
                    <Button key={2} size="small" type="primary" htmlType="submit" form="formModal" loading={loading} icon={<SaveOutlined />}>
                      {data ? 'Lưu' : 'Thêm'}
                    </Button>,
                  ]}>
      <Form ref={this.formRef} id="formModal" name='formModal' autoComplete='off'
            onFinish={this.handleSaveData} labelAlign="right">
        <Form.Item label="Loại hình chăn nuôi" name="tenloaihinh" hasFeedback labelCol={{ span: 8 }} validateTrigger={['onChange', 'onBlur']}
                   rules={[{ required: true, whitespace: true, message: 'Loại hình chăn nuôi không được để trống' }]}>
          <Input placeholder='Loại hình chăn nuôi' disabled={loading}/>
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

export default withConnect(LoaiHinhChanNuoiModal);
