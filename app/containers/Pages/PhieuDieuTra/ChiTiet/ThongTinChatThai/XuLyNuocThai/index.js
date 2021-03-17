import React, { Component } from 'react';
import {
  Input,
  Button,
  Form,
  message,
  Row,
  Col,
  Radio,
  Divider
} from 'antd';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';


const layoutCol = { 'xs': 24, 'sm': 24, 'md': 12, 'lg': 12, 'xl': 12, 'xxl': 12 };
const layoutCol1 = { 'xs': 24, 'sm': 24, 'md': 24, 'lg': 8, 'xl': 8, 'xxl': 8 };
const layoutCol2 = { 'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 4, 'xxl': 4 };
const layoutCol3 = { 'xs': 24, 'sm': 24, 'md': 12, 'lg': 12, 'xl': 12, 'xxl': 12 };
const layoutCol4 = { 'xs': 24, 'sm': 12, 'md': 6, 'lg': 6, 'xl': 3, 'xxl': 3 };
const layoutCol5 = { 'xs': 24, 'sm': 12, 'md': 6, 'lg': 6, 'xl': 4, 'xxl': 4 };
const layoutCol6 = { 'xs': 24, 'sm': 12, 'md': 6, 'lg': 6, 'xl': 8, 'xxl': 8 };

class XuLyNuocThai extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    try {
      if (this.props.data) {
        this.formRef.current?.setFieldsValue(this.props.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { data } = this.props;
    if (data !== prevProps.data) {
      this.formRef.current?.setFieldsValue(this.props.data);
    }
  }

  onFieldsChange = (changedValues, allValues) => {
  };

  render() {

    const { loading } = this.props;
    return <Form ref={this.formRef} layout='vertical' size='small' autoComplete='off' onFinish={this.onFinish}
                 onValuesChange={this.onFieldsChange} name="form_chatthaixulynuoc">
      <Form.Item label="" name="_id" hidden={true}>
        <Input/>
      </Form.Item>
      <Divider orientation="left">3. Xử lý nước thải</Divider>

      <Row gutter={10}>
        <Col {...layoutCol}>
          <Form.Item label={<b>a. Hệ thống thu gom nước thải</b>} name="hethongthugom"
                     validateTrigger={['onChange', 'onBlur']}
                     rules={[{ required: true, message: 'Hệ thống thu gom nước thải' }]}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Phân dòng:' name="phandong">
            <Radio.Group className="w-full">
              <Radio value='DAPHANDONG'>Đã phân dòng</Radio>
              <Radio value='CHUAPHANDONG'>Chưa phân dòng</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col {...layoutCol1}>
          <Form.Item label={<b>b. Khu xử lý nước thải tập trung</b>} name="khuxuly">
            <Radio.Group className="w-full">
              <Radio value='DAXAYDUNG'>Đã xây dựng</Radio>
              <Radio value='CHUAXAYDUNG'>Chưa xây dựng</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Công suất trạm xử lý:' name="congsuattram" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Công nghệ xử lý:' name="congnghexuly" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col sm={24}><strong>c. Vị trí xả thải</strong></Col>
        <Col {...layoutCol2}>
          <Form.Item label='Tọa độ: Kinh độ' name="kinhdo" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol2}>
          <Form.Item label='Vỹ độ' name="vydo" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>

        <Col {...layoutCol3}>
          <Form.Item label='Nơi tiếp nhận' name="noitiepnhan">
            <Radio.Group className="w-full">
              <Radio value='htnttaptrung'>Hệ thống nước thải tập trung </Radio>
              <Radio value='kenhrach'>Kênh, rạch, sông, suối</Radio>
              <Radio value='htthoatnuocchung'>Hệ thống thoát nước chung</Radio>

            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...layoutCol2}>
          <Form.Item label='Tên nơi tiếp nhận' name="tennoitiepnhan" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col {...layoutCol3}>
          <Form.Item label={<b>d. Nhân lực vận hành</b>} name="nhanlucvanhanh">
            <Radio.Group className="w-full">
              <Radio value='1'>Đã đào tạo</Radio>
              <Radio value='0'>Chưa đào tạo</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Col sm={24}><strong>e. Kết quả xử lý</strong></Col>
      <Row gutter={10}>
        <Col sm={24}><strong>1. Trước HTXLNT tập trung</strong></Col>

        <Col {...layoutCol4}>
          <Form.Item label='pH' name="phtruoctaptrung" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol4}>
          <Form.Item label={<p>B0D <sub>5</sub></p>} name="bodtruoctaptrung" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol4}>
          <Form.Item label='TSS' name="tsstruoctaptrung" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol4}>
          <Form.Item label={<p>NH <sub>4</sub> +</p>} name="nh4truoctaptrung" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol4}>
          <Form.Item label={<p>N0 <sub>3</sub> -</p>} name="no3truoctaptrung" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol4}>
          <Form.Item label={<p>PO <sub>4</sub> <sup>3</sup>-</p>} name="po4truoctaptrung"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol4}>
          <Form.Item label='Dầu mỡ ' name="daumotruoctaptrung" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol4}>
          <Form.Item label='Coliform' name="coliformtruoctaptrung" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col sm={24}><strong>2. Sau HTXLNT tập trung</strong></Col>

        <Col {...layoutCol4}>
          <Form.Item label='pH' name="phsautaptrung" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol4}>
          <Form.Item label={<p>B0D <sub>5</sub></p>} name="bodsautaptrung" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol4}>
          <Form.Item label='TSS' name="tsssautaptrung" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol4}>
          <Form.Item label={<p>NH <sub>4</sub> +</p>} name="nh4sautaptrung" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol4}>
          <Form.Item label={<p>N0 <sub>3</sub> -</p>} name="no3sautaptrung" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol4}>
          <Form.Item label={<p>PO <sub>4</sub> <sup>3</sup>-</p>} name="po4sautaptrung"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol4}>
          <Form.Item label='Dầu mỡ ' name="daumosautaptrung" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol4}>
          <Form.Item label='Coliform' name="coliformsautaptrung" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col sm={24}><strong>f. Bảo trì, bảo dưỡng định kỳ Hệ thống xử lý:</strong></Col>

        <Col {...layoutCol5}>
          <Form.Item label='Bảo trì' name="baotrihethong">
            <Radio.Group className="w-full">
              <Radio value='co'>Có</Radio>
              <Radio value='khong'>Không</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col {...layoutCol5}>
          <Form.Item label='Số lần bảo trì' name="solanbaotri" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol6}>
          <Form.Item label='  ' name="baotri">
            <Radio.Group className="w-full">
              <Radio value='tubaotri'>Tự bảo trì, bảo dưỡng</Radio>
              <Radio value='thuedonvingoai'>Thuê đơn vị ngoài: </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col {...layoutCol6}>
          <Form.Item label='Đơn vị bảo trì' name="donvibaotri" validateTrigger={['onChange', 'onBlur']}>
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

export default compose(withConnect)(XuLyNuocThai);


