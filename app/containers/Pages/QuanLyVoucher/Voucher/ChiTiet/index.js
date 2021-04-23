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
import { SaveOutlined,UserOutlined } from '@ant-design/icons';
import { add, getById, updateById } from '@services/quanlyvoucher/voucherService';
import {  CONSTANTS } from '@constants';

import {getAll as getAllTT} from '@services/quanlyvoucher/trangthaivoucherService'
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { makeGetMyInfo } from '../../../../Layout/HeaderComponent/HeaderProvider/selectors';
import { connect } from 'react-redux';
import axios from 'axios';
import { URL } from '@url';
import Box from '@containers/Box';
import { number } from 'prop-types';

import { DatePicker, Space } from 'antd';
import moment from 'moment';


class VoucherChiTiet extends Component {

  constructor(props) {
    super(props);
    this.state = {
        
        dsTrangThai: [],

        _id: this.props.match.params.id,

    };
    const { RangePicker } = DatePicker;
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    let apiRequest = [
      
        getAllTT(1, 0)
      ];

      let apiResponse = await axios.all(apiRequest).then(axios.spread(function( dsTrangThai) {
        return {
            dsTrangThai: dsTrangThai,
          
        };
      }));

      let dsTrangThai = apiResponse.dsTrangThai ? apiResponse.dsTrangThai.docs : this.state.dsTrangThai;
   
          
      this.setState({ dsTrangThai});
      if(this.state._id){
       
        let dataRes = await getById(this.state._id)
        console.log(dataRes);
        dataRes.tgbatdau = moment(dataRes.tgbatdau);
        dataRes.tgketthuc = moment(dataRes.tgketthuc);
        this.formRef.current.setFieldsValue({
          id: dataRes.id, 
          tenvoucher: dataRes.tenvoucher, 
          mota: dataRes.mota, 
          muchoivien: dataRes.muchoivien, 
          diemtichluy: dataRes.diemtichluy, 
          tgbatdau: dataRes.tgbatdau, 
          tgketthuc: dataRes.tgketthuc,
          soluongvoucher: dataRes.soluongvoucher, 
          trangthai_id : dataRes.trangthai_id.tentrangthai,
        })
     
        // set form
      }
  }


 


  onFinish = async (values) => {
    console.log(values, "aaa");
    values.tgbatdau = values.tgbatdau.format('YYYY-MM-DD');
    values.tgketthuc = values.tgketthuc.format('YYYY-MM-DD');
    if (this.state._id) {
      const voucherRes = await updateById(this.state._id, values);
      
      if (voucherRes) {
        message.success("Cập nhật dữ liệu thành công");

      }
    } else {
      const voucherRes = await add(values);

      if (voucherRes) {
        message.success("Thêm dữ liệu thành công");
        this.props.history.push(URL.VOUCHER_ID.format(voucherRes._id));
      }
    }
 
  };

  onFieldsChange = async (changedValues, allValues) => {
    console.log(changedValues, "changedValues");
  }

 

  render() {
    
    const { loading} = this.props;
    const { _id,  dsTrangThai, tgbatdau, tgketthuc } = this.state;
    console.log(dsTrangThai,"tt");
    
    
    return <Form ref={this.formRef} layout='vertical' size='small' autoComplete='off' onFinish={this.onFinish} onValuesChange={this.onFieldsChange}>
      <Box title='Chi tiết Voucher'
            boxActions={this.props.myInfoResponse.role === CONSTANTS.ADMIN ?<Button  key="submit" htmlType="submit"  icon={<SaveOutlined/>} size='small'
            type="primary">Lưu dữ liệu</Button> : ''}>
        <Row gutter={10}>
          <Col sm={6}>
            <Form.Item label={<b>ID</b>} name="id" validateTrigger={['onChange', 'onBlur']}
                       rules={[{ required: true, message: 'ID không được để trống' }]}>
              <Input placeholder='ID' disabled={loading}/>
            </Form.Item>
            </Col>
            <Col sm={6}>
            <Form.Item label={<b>Tên voucher</b>} name="tenvoucher" validateTrigger={['onChange', 'onBlur']}
                       rules={[{ required: true, message: 'tên voucher không được để trống' }]}>
              <Input placeholder='Tên voucher' disabled={loading}/>
            </Form.Item>
            </Col>
            <Col sm={6}>
            <Form.Item label={<b>Mô tả</b>} name="mota" validateTrigger={['onChange', 'onBlur']}
                >
              <Input placeholder='Mô tả'  disabled={loading}/>
            </Form.Item>
            </Col>
            <Col sm={6}>
              <Form.Item label="Trạng thái" name="trangthai_id" validateTrigger={['onChange', 'onBlur']}
                           rules={[{ required: true, message: 'trạng thái không được để trống' }]}>
                  <Select placeholder='Chọn trạng thái' disabled={loading} dropdownClassName='small' showSearch
                          filterOption={(input, option) => {
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                          }}>
                    {dsTrangThai.map(data => {
                      return <Select.Option key={data._id} value={data._id}>
                        {data.tentrangthai}
                      </Select.Option>;
                    })}
                  </Select>
                </Form.Item>



            </Col>
            <Col sm={6}>
            <Form.Item label={<b>Mức hội viên yêu cầu</b>} name="muchoivien" validateTrigger={['onChange', 'onBlur']}
                       rules={[{ required: true, message: 'Mức hội viên yêu cầu được để trống' }]}>
              <Input placeholder='Mức hội viên yêu cầu' disabled={loading}/>
            </Form.Item>
            </Col>
            <Col sm={6}>
            <Form.Item label={<b>Điểm tích lũy yêu cầu</b>} name="diemtichluy" validateTrigger={['onChange', 'onBlur']}
                       >
              <Input placeholder='Điểm tích lũy yêu cầu' disabled={loading}/>
            </Form.Item>
            </Col>
            <Col sm={6}>        
            <Form.Item label={<b>Thời gian bắt đầu</b>} name="tgbatdau" validateTrigger={['onChange', 'onBlur']}
                         rules={[{ required: true, message: 'Thời gian bắt đầu không được để trống' }]}>
                <DatePicker showTime format="DD-MM-YYYY" disabled={loading} className="w-full"/>
              </Form.Item>
              </Col>
            <Col sm={6}>
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



export default withConnect(VoucherChiTiet);
