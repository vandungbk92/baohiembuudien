import React, { Component } from 'react';
import {
  Input,
  Button,
  Form,
  message,
  Row,
  Col,
  Select,
  Radio,
} from 'antd';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';

const layoutCol = { 'xs': 24, 'sm': 12, 'md': 12, 'lg': 6, 'xl': 6, 'xxl': 6 };
const layoutCol1 = { 'xs': 24, 'sm': 6, 'md': 6, 'lg': 3, 'xl': 3, 'xxl': 3 };
const layoutCol2 = { 'xs': 24, 'sm': 8, 'md': 6, 'lg': 6, 'xl': 6, 'xxl': 6 };
const layoutCol3 = { 'xs': 24, 'sm': 24, 'md': 24, 'lg': 12, 'xl': 12, 'xxl': 12 };
const layoutCol4 = { 'xs': 24, 'sm': 24, 'md': 24, 'lg': 8, 'xl': 8, 'xxl': 8 };
const layoutCol5 = { 'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 4, 'xxl': 4 };
const layoutCol6 = { 'xs': 24, 'sm': 24, 'md': 12, 'lg': 12, 'xl': 12, 'xxl': 12 };
const layoutCol7 = { 'xs': 24, 'sm': 12, 'md': 6, 'lg': 6, 'xl': 3, 'xxl': 3 };

class NuocThaiCoSoXuLy extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quanhuyen: [],
      xaphuong: [],
      // _id: this.props.match.params.id,
      arrThongTin: [],
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

    const { loading } = this.props;
    const { quanhuyen, xaphuong } = this.state;
    return <Form ref={this.formRef} name="form_chatthainuocthaicosoxuly" layout='vertical' size='small' autoComplete='off'>
      <Form.Item label="" name="_id" hidden={true}>
        <Input/>
      </Form.Item>
      <Row gutter={10}>
        <Col sm={24}><strong>II. Nước thải</strong></Col>
        <Col sm={24}><strong>1. Nước thải sinh hoạt  </strong></Col>
        <Col {...layoutCol}>
          <Form.Item label='Khối lượng nước thải sinh hoạt tiếp nhận:' name="klnuocthaisinhhoat"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Công suất xử lý: ' name="congsuatxuly_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Hiệu suất xử lý: ' name="hieusuatxuly_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Công nghệ xử lý:' name="congnghexuly_ntsh"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col sm={24}><strong>2. Nước thải công nghiệp  </strong></Col>
        <Col {...layoutCol}>
          <Form.Item label='Khối lượng nước thải công nghiệp tiếp nhận:' name="klnuocthaicongnghiep"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Công suất xử lý: ' name="congsuatxuly_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Hiệu suất xử lý: ' name="hieusuatxuly_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Công nghệ xử lý:' name="congnghexuly_ntcn"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col sm={24}><strong>d. Vị trí xả thải (Định vị vệ tinh)</strong></Col>
        <Col sm={24}>Vị trí xả thải 1</Col>

        <Col {...layoutCol5}>
          <Form.Item label='Tọa độ: Kinh độ' name="kinhdo1" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol5}>
          <Form.Item label='Vỹ độ' name="vydo1" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>

        <Col {...layoutCol6}>
          <Form.Item label='Nơi tiếp nhận' name="noitiepnhan1">
            <Radio.Group className="w-full">
              <Radio value='htnttaptrung'>Hệ thống nước thải tập trung </Radio>
              <Radio value='kenhrach'>Kênh, rạch, sông, suối</Radio>
              <Radio value='htthoatnuocchung'>Hệ thống thoát nước chung</Radio>

            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...layoutCol5}>
          <Form.Item label='Tên nơi tiếp nhận' name="tennoitiepnhan1" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col sm={24}>Vị trí xả thải 2</Col>

        <Col {...layoutCol5}>
          <Form.Item label='Tọa độ: Kinh độ' name="kinhdo2" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol5}>
          <Form.Item label='Vỹ độ' name="vydo2" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>

        <Col {...layoutCol6}>
          <Form.Item label='Nơi tiếp nhận' name="noitiepnhan2">
            <Radio.Group className="w-full">
              <Radio value='htnttaptrung'>Hệ thống nước thải tập trung </Radio>
              <Radio value='kenhrach'>Kênh, rạch, sông, suối</Radio>
              <Radio value='htthoatnuocchung'>Hệ thống thoát nước chung</Radio>

            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...layoutCol5}>
          <Form.Item label='Tên nơi tiếp nhận' name="tennoitiepnhan2" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>

      {/* PHIẾU 1,2*/}
      <Col sm={24}><strong> e. Kết quả xử lý nước thải sinh hoạt: (Theo Báo cáo kết quả GSMT định kỳ của năm gần nhất (nếucó)):</strong></Col>
      <Row gutter={10}>
        <Col sm={24}><strong>1. Trước HTXLNT tập trung</strong></Col>

        <Col {...layoutCol7}>
          <Form.Item label='pH' name="phtruoctaptrung_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={<p>B0D <sub>5</sub></p>} name="bodtruoctaptrung_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='TSS' name="tsstruoctaptrung_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={<p>NH <sub>4</sub> +</p>} name="nh4truoctaptrung_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={<p>N03</p>} name="no3truoctaptrung_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='P04' name="po4truoctaptrung_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='Coliform' name="coliformtruoctaptrung_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col sm={24}><strong>2. Sau HTXLNT tập trung</strong></Col>

        <Col {...layoutCol7}>
          <Form.Item label='pH' name="phsautaptrung_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={<p>B0D <sub>5</sub></p>} name="bodsautaptrung_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='TSS' name="tsssautaptrung_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={<p>NH <sub>4</sub> +</p>} name="nh4sautaptrung_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={<p>N03</p>} name="no3sautaptrung_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='P04' name="po4sautaptrung_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='Coliform' name="coliformsautaptrung_ntsh" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>
      <Col sm={24}><strong> f. Kết quả xử lý nước thải công nghiệp: (Theo Báo cáo kết quả GSMT định kỳ của năm gần nhất (nếucó)):</strong></Col>
      <Row gutter={10}>
        <Col sm={24}><strong>1. Trước HTXLNT tập trung</strong></Col>

        <Col {...layoutCol7}>
          <Form.Item label='pH' name="phtruoctaptrung_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={<p>B0D <sub>5</sub></p>} name="bodtruoctaptrung_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='TSS' name="tsstruoctaptrung_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={<p>NH <sub>4</sub> +</p>} name="nh4truoctaptrung_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={<p>Tổng P</p>} name="tongptruoctaptrung_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='Dầu mỡ khoáng' name="daumotruoctaptrung_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='Coliform' name="coliformtruoctaptrung_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        </Row>
        <Row gutter={10}>
        <Col sm={24}><strong>2. Sau HTXLNT tập trung</strong></Col>

        <Col {...layoutCol7}>
          <Form.Item label='pH' name="phsautaptrung_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={<p>B0D <sub>5</sub></p>} name="bodsautaptrung_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='TSS' name="tsssautaptrung_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={<p>NH <sub>4</sub> +</p>} name="nh4sautaptrung_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label={<p>Tổng P</p>} name="tongpsautaptrung_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='Dầu mỡ khoáng' name="daumosautaptrung_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol7}>
          <Form.Item label='Coliform' name="coliformsautaptrung_ntcn" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        </Row>

      <Row gutter={10}>
        <Col sm={24}><strong>f. Bảo trì, bảo dưỡng định kỳ Hệ thống xử lý:</strong></Col>

        <Col {...layoutCol}>
          <Form.Item label='Bảo trì' name="baotrihethong">
            <Radio.Group className="w-full">
              <Radio value='co'>Có</Radio>
              <Radio value='khong'>Không</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col {...layoutCol}>
          <Form.Item label='Số lần bảo trì' name="solanbaotri" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        </Row>
    </Form>;
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(NuocThaiCoSoXuLy);


