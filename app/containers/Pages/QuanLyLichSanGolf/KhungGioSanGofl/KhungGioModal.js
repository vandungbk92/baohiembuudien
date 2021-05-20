import React, { Component } from 'react';
import { Input, Button, Form, message, Modal, InputNumber, TimePicker } from "antd";
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { add, updateById } from '@services/quanlylichsangolf/khunggiosangolfService';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import moment from 'moment';

class KhungGioSanGolfModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.formRef = React.createRef();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let {showModal, data} = this.props;
    if(showModal !== prevProps.showModal){
      await this.setState({showModal: true});
      if(data){
        console.log(data,'dataaaaa');
        data.khunggio = data.khunggio ? moment(data.khunggio) : null;
        console.log( data.khunggio,' data.khunggio');
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
    console.log(dataForm.khunggio,'dataForm.khunggiodataForm.khunggiodataForm.khunggiodataForm.khunggio');
    dataForm.khunggio = dataForm.khunggio ? dataForm.khunggio.format('HH:mm') : '';
    const { data } = this.props;
    if (data) {
      // edit
      const apiResponse = await updateById(data._id, dataForm);
      if(apiResponse){
        if(this.props.getDataAfterSave) this.props.getDataAfterSave(apiResponse, 'UPDATE')
        this.setState({ showModal: false });
        message.success('Chỉnh sửa khung giờ');
      }
    } else {
      // create
      const apiResponse = await add(dataForm);
      if (apiResponse) {
        if(this.props.getDataAfterSave) this.props.getDataAfterSave(apiResponse, 'ADD')
        this.setState({ showModal: false });
        message.success('Thêm mới khung giờ');
      }
    }
  }

  onValuesChange = (changedValues, allValues) => {
    this.setState(changedValues)
  }

  onChange = (time, timeString) => {
    this.setState({
      khunggio : timeString
    })
    console.log(time, timeString);
  }

  render() {
    let {data, loading} = this.props;
    return <Modal title={data ? 'Chỉnh sửa khung giờ' : 'Thêm mới đơn khung giờ'}
                  visible={this.state.showModal}
                  onCancel={loading ? () => null : this.toggleModal}
                  footer={[
                    <Button key={1} size="small" onClick={this.toggleModal} disabled={loading} type="danger" icon={<CloseOutlined />}>Huỷ</Button>,
                    <Button key={2} size="small" type="primary" htmlType="submit" form="formModalKhungGio" loading={loading} icon={<SaveOutlined />}>
                      {data ? 'Lưu' : 'Thêm'}
                    </Button>,
                  ]}>
      <Form ref={this.formRef} id="formModalKhungGio" name='formModalKhungGio' autoComplete='off'
            onValuesChange= {this.onValuesChange} onFinish={this.handleSaveData} labelAlign="right">
        <Form.Item label="Khung giờ" name="khunggio" hasFeedback labelCol={{ span: 8 }} validateTrigger={['onChange', 'onBlur']}
                   rules={[{ required: true, message: 'Khung giờ không được để trống' }]}>
          <TimePicker format = 'HH:mm' disabled={loading} />
        </Form.Item>
        <Form.Item label="Giá tiền " name="giatien" hasFeedback labelCol={{ span: 8 }} validateTrigger={['onChange', 'onBlur']}
                   rules={[{ required: true, whitespace: true, message: 'Giá tiền không được để trống' }]}>
          <Input placeholder='Giá tiền' disabled={loading} type='number'/>
        </Form.Item>
        <Form.Item label="Mô tả" name="mota" hasFeedback labelCol={{ span: 8 }} validateTrigger={['onChange', 'onBlur']}
                   rules={[{ required: false, whitespace: true }]}>
          <Input placeholder='Mô tả' disabled={loading}/>
        </Form.Item>
        <Form.Item label="Thứ tự" name="thutu" hatype='number'sFeedback labelCol={{ span: 8 }} validateTrigger={['onChange', 'onBlur']}
                   rules={[{ required: false, whitespace: true }]}>
          <Input placeholder='Thứ tự' disabled={loading} />
        </Form.Item>
      </Form>
    </Modal>;
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(KhungGioSanGolfModal);
