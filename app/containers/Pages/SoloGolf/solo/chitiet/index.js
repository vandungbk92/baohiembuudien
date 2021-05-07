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
import { add, getById, updateById } from '@services/quanlysologolf/soloService';
import {  CONSTANTS } from '@constants';

import {getAll as getAllTT} from '@services/quanlysologolf/trangthaisologolfService'
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


class SoloChiTiet extends Component {

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
        
        this.formRef.current.setFieldsValue({
          id: dataRes.id,          
          mota: dataRes.mota,           
          trangthai_id : dataRes.trangthai_id.tentrangthai,
          solo:dataRes.solo,
        })
     
        // set form
      }
  }


 


  onFinish = async (values) => {
    console.log(values, "aaa");
    
    if (this.state._id) {
      const voucherRes = await updateById(this.state._id, values);
      
      if (voucherRes) {
        message.success("Cập nhật dữ liệu thành công");

      }
    } else {
      const voucherRes = await add(values);

      if (voucherRes) {
        message.success("Thêm dữ liệu thành công");
        this.props.history.push(URL.SOLO_ID.format(voucherRes._id));
      }
    }
 
  };

  onFieldsChange = async (changedValues, allValues) => {
    console.log(changedValues, "changedValues");
  }

 

  render() {
    
    const { loading} = this.props;
    const { _id,  dsTrangThai,  } = this.state;
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
            <Form.Item label={<b>Số lỗ</b>} name="solo" validateTrigger={['onChange', 'onBlur']}
               rules={[{ required: true, message: 'số lỗ không được để trống' }]} >
              <Input placeholder='số lố' type='number' min={1}  disabled={loading}/>
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



export default withConnect(SoloChiTiet);
