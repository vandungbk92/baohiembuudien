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
import { add, getById, updateById } from '@services/cuahangdungcu/proshopService';
import {  CONSTANTS } from '@constants';
import {getAll as getAllDVT} from '@services/cuahangdungcu/donvitinhService'
import {getAll as getAllTT} from '@services/cuahangdungcu/trangthaiService'
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { makeGetMyInfo } from '../../../../Layout/HeaderComponent/HeaderProvider/selectors';
import { connect } from 'react-redux';
import axios from 'axios';
import { URL } from '@url';
import Box from '@containers/Box';




class ProShop extends Component {

  constructor(props) {
    super(props);
    this.state = {
        
        dsTrangThai: [],
        dsDonViTinh: [],
        _id: this.props.match.params.id,

    };
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    let apiRequest = [
        getAllDVT(1, 0),
        getAllTT(1, 0)
      ];

      let apiResponse = await axios.all(apiRequest).then(axios.spread(function( dsDonViTinh,dsTrangThai) {
        return {
            dsTrangThai: dsTrangThai,
            dsDonViTinh: dsDonViTinh
        };
      }));

      let dsTrangThai = apiResponse.dsTrangThai ? apiResponse.dsTrangThai.docs : this.state.dsTrangThai;
      let dsDonViTinh = apiResponse.dsDonViTinh ? apiResponse.dsDonViTinh.docs : this.state.dsDonViTinh;
          
      this.setState({ dsDonViTinh,dsTrangThai});
      if(this.state._id){
       
        let dataRes = await getById(this.state._id)
        console.log(dataRes);
        this.formRef.current.setFieldsValue({
          tenhang: dataRes.tenhang, 
          soluong: dataRes.soluong, 
          dongia:dataRes.dongia, 
          donvitinh_id : dataRes.donvitinh_id._id,
          trangthai_id : dataRes.trangthai_id._id,
        })
     
        // set form
      }
  }


 


  onFinish = async (values) => {
    console.log(values, "aaa");
    if (this.state._id) {
      const mathangRes = await updateById(this.state._id, values);
      
      if (mathangRes) {
        message.success("Cập nhật dữ liệu thành công");

      }
    } else {
      const mathangRes = await add(values);

      if (mathangRes) {
        message.success("Thêm dữ liệu thành công");
        this.props.history.push(URL.PROSHOP_ID.format(mathangRes._id));
      }
    }
 
  };

  onFieldsChange = async (changedValues, allValues) => {
    console.log(changedValues, "changedValues");
  }

 

  render() {
    
    const { loading} = this.props;
    const { _id,  dsTrangThai, dsDonViTinh } = this.state;
    console.log(dsTrangThai,"tt");
    console.log(dsDonViTinh, "dvt")
    
    return <Form ref={this.formRef} layout='vertical' size='small' autoComplete='off' onFinish={this.onFinish} onValuesChange={this.onFieldsChange}>
      <Box title='Mặt hàng ProShop'
            boxActions={this.props.myInfoResponse.role === CONSTANTS.ADMIN ?<Button  key="submit" htmlType="submit"  icon={<SaveOutlined/>} size='small'
            type="primary">Lưu dữ liệu</Button> : ''}>
        <Row gutter={10}>
          <Col sm={24}>
            <Form.Item label={<b>Tên hàng</b>} name="tenhang" validateTrigger={['onChange', 'onBlur']}
                       rules={[{ required: true, message: 'Tên hàng không được để trống' }]}>
              <Input placeholder='tenhang' disabled={loading}/>
            </Form.Item>
            </Col>
            <Col sm={6}>
            <Form.Item label={<b>Số lượng</b>} name="soluong" validateTrigger={['onChange', 'onBlur']}
                       rules={[{ required: true, message: 'Số lượng không được để trống' }]}>
              <Input placeholder='soluong' disabled={loading} type= 'number'/>
            </Form.Item>
            </Col>
            <Col sm={6}>
            <Form.Item label={<b>Đơn giá</b>} name="dongia" validateTrigger={['onChange', 'onBlur']}
                       rules={[{ required: true, message: 'Đơn giá không được để trống' }]}>
              <Input placeholder='dongia' disabled={loading} type= 'number'/>
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

                <Col sm={6  }>
                <Form.Item label="Đơn vị tính" name="donvitinh_id" validateTrigger={['onChange', 'onBlur']}
                           rules={[{ required: true, message: 'Đơn vị tính không được để trống' }]}>
                  <Select placeholder='Chọn đơn vị tính' disabled={loading} dropdownClassName='small' showSearch
                          filterOption={(input, option) => {
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                          }}>
                    {dsDonViTinh.map(data => {
                      return <Select.Option key={data._id} value={data._id}>
                        {data.tendonvi}
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



export default withConnect(ProShop);
