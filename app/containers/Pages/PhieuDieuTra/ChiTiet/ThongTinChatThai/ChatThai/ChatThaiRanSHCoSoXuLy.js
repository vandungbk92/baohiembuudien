import React, { Component } from 'react';
import {
  Input,
  Form,
  Button,
  message,
  Row,
  Col,
  Select,
  Divider,
  Radio
} from 'antd';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import { getAllPhuongXaById } from '@services/danhmuc/quanhuyenService';
import { compose } from 'redux';


const layoutCol = { 'xs': 24, 'sm': 24, 'md': 24, 'lg': 8, 'xl': 8, 'xxl': 8 };
const layoutCol2 = { 'xs': 24, 'sm': 12, 'md': 12, 'lg': 8, 'xl': 6, 'xxl': 4 };

class ChatThaiRanSHCoSoXuLy extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quanhuyen: this.props.quanhuyen,
      xaphuong: [],
      arrThongTin: [],
    };
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    try {
      if(this.props.data){
        this.formRef.current.setFieldsValue(this.props.data);
      }
      if(this.props.data && this.props.data.quanhuyentiepnhan_id){
        let xaphuong = await getAllPhuongXaById(this.props.data.quanhuyentiepnhan_id)
        if(xaphuong){
          this.setState({xaphuong})
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    let {data} = this.props
    if(data !== prevProps.data){
      this.formRef.current?.setFieldsValue(this.props.data);
    }
  }

  onFieldsChange = async (changedValues, allValues) => {
    if (changedValues.hasOwnProperty('quanhuyentiepnhan_id')) {
      this.formRef.current.setFieldsValue({ phuongxatiepnhan_id: '' });
      const xaphuong = await getAllPhuongXaById(changedValues['quanhuyentiepnhan_id']);
      if (xaphuong) {
        this.setState({ xaphuong });
      }
    } 
};

  render() {
    const { loading } = this.props;
    const { quanhuyen, xaphuong } = this.state;
    return <Form ref={this.formRef} name="form_chatthaisinhhoat" layout='vertical' size='small' autoComplete='off'
                 onValuesChange={this.onFieldsChange}>
      <Form.Item label="" name="_id" hidden={true}>
        <Input/>
      </Form.Item>
      <Divider orientation="left">1. Chất thải rắn sinh hoạt</Divider>
      <Row gutter={10}>
        <Col {...layoutCol}>
          <Form.Item label={<b>a. Tổng khối lượng thu gom</b>} name="klthugom"
                     validateTrigger={['onChange', 'onBlur']}
          >
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>

      </Row>
      <Col sm={24}><strong>b. Công nghệ xử lý chất thải (Lựa chọn 1 hoặc nhiều phương án) (tấn/năm)</strong></Col>
      <Row gutter={10}>
        <Col {...layoutCol2}>
          <Form.Item label='Chôn lấp' name="klchonlap" validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol2}>
          <Form.Item label='Thu gom nước rỉ rác' name="thugomrirac">
            <Radio.Group className="w-full">
              <Radio value='co'>Có</Radio>
              <Radio value='khong'>Không</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...layoutCol2}>
          <Form.Item label='Công nghệ xử lý nước rỉ rác: ' name="congnghexlrirac"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input  disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col {...layoutCol2}>
          <Form.Item label='Đốt' name="kldot" validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol2}>
          <Form.Item label='Xử lý khí thải' name="xulykhithai">
            <Radio.Group className="w-full">
              <Radio value='co'>Có</Radio>
              <Radio value='khong'>Không</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...layoutCol2}>
          <Form.Item label='Khối lượng xỉ' name="klxi" validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol2}>
          <Form.Item label='Vị trí đổ xỉ: ' name="vitridoxi"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input  disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col {...layoutCol2}>
          <Form.Item label='Tái chế' name="kltaiche" validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol2}>
        <Form.Item label='Chế biến thành phân hữu cơ' name="klchebien"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol2}>
          <Form.Item label='Khác' name="klkhac"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>

    </Form>
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ChatThaiRanSHCoSoXuLy);


