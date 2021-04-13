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
import { add, getById, updateById } from '@services/mucthanhvienService';
import {  CONSTANTS } from '@constants';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { makeGetMyInfo } from '../../../Layout/HeaderComponent/HeaderProvider/selectors';
import { connect } from 'react-redux';
import axios from 'axios';
import { URL } from '@url';
import Box from '@containers/Box';
import { DatePicker, Space } from 'antd';
import moment from 'moment';



class MucThanhVienChiTiet extends Component {

  constructor(props) {
    super(props);
    this.state = {
        
        _id: this.props.match.params.id,

    };
    const { RangePicker } = DatePicker;
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    
      if(this.state._id){
      
        let dataRes = await getById(this.state._id);
        dataRes.tgbatdau = moment(dataRes.tgbatdau);
        dataRes.tgketthuc = moment(dataRes.tgketthuc);
        console.log(dataRes);
        this.formRef.current.setFieldsValue({
            id:dataRes.id,
          tenmuc: dataRes.tenmuc, 
          mota: dataRes.mota, 
          dongia:dataRes.dongia, 
          uudai: dataRes.uudai,
          tgbatdau: dataRes.tgbatdau,
          tgketthuc: dataRes.tgketthuc,
          trangthai: dataRes.trangthai
        })
     
        // set form
      }
  }


 


  onFinish = async (values) => {
    values.tgbatdau = values.tgbatdau.format('YYYY-MM-DD');
    values.tgketthuc = values.tgketthuc.format('YYYY-MM-DD');
    if (this.state._id) {
      const mucthanhvienRes = await updateById(this.state._id, values);
      
      if (mucthanhvienRes) {
        message.success("Cập nhật dữ liệu thành công");

      }
    } else {
      const mucthanhvienRes = await add(values);

      if (mucthanhvienRes) {
        message.success("Thêm dữ liệu thành công");
        this.props.history.push(URL.MUC_THANH_VIEN_ID.format(mucthanhvienRes._id));
      }
    }
 
  };



  onFieldsChange = async (changedValues, allValues) => {
    console.log(changedValues, "changedValues");
   
  }

 

  render() {
    
    const { loading} = this.props;
    const { _id, tgbatdau, tgketthuc } = this.state;
   console.log(tgbatdau, "tg")
    
    
    return <Form ref={this.formRef} layout='vertical' size='small' autoComplete='off' onFinish={this.onFinish} onValuesChange={this.onFieldsChange}>
      <Box title='Mặt hàng ProShop'
            boxActions={this.props.myInfoResponse.role === CONSTANTS.ADMIN ?<Button  key="submit" htmlType="submit"  icon={<SaveOutlined/>} size='small'
            type="primary">Lưu dữ liệu</Button> : ''}>
        <Row gutter={10}>
          <Col sm={8}>
          <Form.Item label={<b>ID</b>} name="id" validateTrigger={['onChange', 'onBlur']}
                       rules={[{ required: true, message: 'ID không được để trống' }]}>
              <Input placeholder='id' disabled={loading}/>
            </Form.Item>
            </Col><Col sm={8}>

            <Form.Item label={<b>Tên mức thành viên</b>} name="tenmuc" validateTrigger={['onChange', 'onBlur']}
                       rules={[{ required: true, message: 'Tên mức thành viên không được để trống' }]}>
              <Input placeholder='Tên mức thành viên' disabled={loading}/>
            </Form.Item>
            </Col><Col sm={8}>

            <Form.Item label={<b>Mô tả</b>} name="mota" validateTrigger={['onChange', 'onBlur']}
                      >
              <Input placeholder='Mô tả' disabled={loading} />
            </Form.Item>
            </Col><Col sm={6}>

            <Form.Item label={<b>% Ưu đãi</b>} name="uudai" validateTrigger={['onChange', 'onBlur']}
                      >
              <Input placeholder='% Ưu đãi' disabled={loading} type= 'number'/>
            </Form.Item>
            </Col>
<Col sm={6}>
            <Form.Item label={<b>Đơn giá</b>} name="dongia" validateTrigger={['onChange', 'onBlur']}
                       rules={[{ required: true, message: 'Đơn giá không được để trống' }]}>
              <Input placeholder='Đơn giá' disabled={loading} type= 'number'/>
            </Form.Item>
            </Col>
            <Col sm={6}>
            <Form.Item label={<b>Trạng thái</b>} name="trangthai" validateTrigger={['onChange', 'onBlur']}
                      >
              <Input placeholder='Trạng thái' disabled={loading} />
            </Form.Item>
            </Col>  
            <Col sm={3}>
            <Form.Item label={<b>Thời gian bắt đầu</b>} name="tgbatdau" validateTrigger={['onChange', 'onBlur']}
                         rules={[{ required: true, message: 'Thời gian bắt đầu không được để trống' }]}>
                <DatePicker showTime format="DD-MM-YYYY" disabled={loading} className="w-full"/>
              </Form.Item>
              </Col>  
              <Col sm={3}>
              <Form.Item label={<b>Thời gian kết thúc</b>} name="tgketthuc" validateTrigger={['onChange', 'onBlur']}
                         rules={[{ required: true, message: 'Thời gian kết thúc không được để trống' }]}>
                <DatePicker showTime format="DD-MM-YYYY" disabled={loading} className="w-full"/>
              </Form.Item>
                  
         
                </Col>  
             
              

      
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



export default withConnect(MucThanhVienChiTiet);
