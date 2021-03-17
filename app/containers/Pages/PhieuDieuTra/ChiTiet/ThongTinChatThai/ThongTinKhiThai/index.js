import React, { Component } from 'react';
import {
  Input,
  Form,
  Button,
  message,
  Row,
  Col,
  Radio,
} from 'antd';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';

const layoutCol = { 'xs': 24, 'sm': 12, 'md': 12, 'lg': 6, 'xl': 6, 'xxl': 6 };
const layoutCol1 = { 'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 12, 'xxl': 12 };
const layoutCol2 = { 'xs': 24, 'sm': 24, 'md': 12, 'lg': 6, 'xl': 6, 'xxl': 6 };
const layoutCol3 = { 'xs': 24, 'sm': 12, 'md': 12, 'lg': 6, 'xl': 6, 'xxl': 6 };
const layoutCol7 = { 'xs': 24, 'sm': 12, 'md': 6, 'lg': 6 , 'xl': 3, 'xxl': 3};

class ThongTinKhiThai extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    try {
      if(this.props.data){
        this.formRef.current?.setFieldsValue(this.props.data);
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

  render() {

    const { loading} = this.props;
    return <Form ref={this.formRef} name="form_chatthaikhithai" layout='vertical' size='small' autoComplete='off'>
      <Form.Item label="" name="_id" hidden={true}>
        <Input/>
      </Form.Item>
      <Row gutter={10}>
        <Col sm={24}><strong>1. Thông tin nguồn thải (Khí thải)</strong></Col>
        <Col sm={24}><strong>Khối lượng khí thải phát sinh</strong></Col>
        <Col {...layoutCol1}>
          <Form.Item label='Khối lượng khí thải (m3/ngày):' name="klkhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="m3/ngày"disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Số lượng nguồn thải (khí thải): ' name="soluongnguonthai" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col sm={24}><strong>2. Thông tin về xử lý khí thải</strong></Col>
        <Col sm={24}><strong>a. Kết nối quan trắc khí thải tự động</strong></Col>

        <Col {...layoutCol2}>
          <Form.Item label='Có quan trắc khí thải tự động không:' name="quantrackhithai">
            <Radio.Group className="w-full">
              <Radio value='co'>Có</Radio>
              <Radio value='khong'>Không</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...layoutCol2}>
          <Form.Item label='Tình trạng kết nối truyền dữ liệu: ' name="ketnoitruyendulieu">
            <Radio.Group className="w-full">
              <Radio value='dangketnoi'>Đang kết nối</Radio>
              <Radio value='dadung'>Đã dừng</Radio>
              <Radio value='khac'>Khác</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...layoutCol2}>
          <Form.Item label='Nơi kết nối thông tin: ' name="noiketnoithongtin">
            <Radio.Group className="w-full">
              <Radio value='botnmt'>Bộ TNMT</Radio>
              <Radio value='sotnmt'>Sở TNMT</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

      </Row>
      <Row gutter={10}>
        <Col sm={24}><strong>b.Hệ thống xử lý khí thải</strong></Col>
        <Col {...layoutCol}>
          <Form.Item label='Đơn vị có hệ thống xử lý::' name="hethongxuly">
            <Radio.Group className="w-full">
              <Radio value='co'>Có</Radio>
              <Radio value='khong'>Không</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Công suất xử lý: ' name="congsuatxuly" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="m3/ngày" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Hiệu suất xử lý: ' name="hieusuatxuly" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="%" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Công nghệ xử lý: ' name="congnghexuly" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>

      </Row>
      <Col sm={24}><strong>d. Vị trí xả thải (Định vị vệ tinh)</strong></Col>
      <Row gutter={10}>
        <Col {...layoutCol3}>
          <Form.Item label='Tọa độ xả thải 1: Kinh độ' name="kinhdo1" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol3}>
          <Form.Item label='Vỹ độ' name="vydo1" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol3}>
          <Form.Item label='Tọa độ xả thải 2: Kinh độ' name="kinhdo2" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol3}>
          <Form.Item label='Vỹ độ' name="vydo2" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col {...layoutCol3}>
          <Form.Item label='Tọa độ xả thải 3: Kinh độ' name="kinhdo3" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol3}>
          <Form.Item label='Vỹ độ' name="vydo3" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol3}>
          <Form.Item label='Tọa độ xả thải 4: Kinh độ' name="kinhdo4" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol3}>
          <Form.Item label='Vỹ độ' name="vydo4" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>
      <Col sm={24}><strong>d. Kết quả xử lý khí thải công nghiệp của sản phẩm chính (Theo Báo cáo kết quả GSMT định kỳ của năm gần nhất (nếu có)):</strong></Col>
      <Row gutter={10}>
        <Col sm={24}><strong>1. Trước HTXL khí thải</strong></Col>

        <Col {...layoutCol7}>
          <Form.Item label='Bụi tổng' name="buitongtruockhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/Nm3" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={ <p>SO <sub>2</sub></p>} name="so2truockhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/Nm3" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={ <p>NO <sub>2</sub></p>} name="no2truockhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/Nm3" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={ <p>CO</p>} name="cotruockhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/Nm3" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={ <p>Hơi axit</p>} name="hoiaxittruockhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/Nm3" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='Pb' name="pbtruockhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/Nm3" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='Cd' name="cdtruockhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/Nm3" disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col sm={24}><strong>2. Sau HTXL khí thải</strong></Col>

        <Col {...layoutCol7}>
          <Form.Item label='Bụi tổng' name="buitongsaukhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/Nm3" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={ <p>SO <sub>2</sub></p>} name="so2saukhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/Nm3" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={ <p>NO <sub>2</sub></p>} name="no2saukhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/Nm3" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={ <p>CO</p>} name="cosaukhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/Nm3" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={ <p>Hơi axit</p>} name="hoiaxitsaukhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/Nm3" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='Pb' name="pbsaukhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/Nm3" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='Cd' name="cdsaukhithai" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading} suffix="mg/Nm3"/>
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

export default compose(withConnect)(ThongTinKhiThai);


