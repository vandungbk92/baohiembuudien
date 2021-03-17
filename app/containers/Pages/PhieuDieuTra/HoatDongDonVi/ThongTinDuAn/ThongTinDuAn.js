import React, { Component } from 'react';
import { Button, Card, Popconfirm, Table, Row, message, Input, InputNumber, Form, Col } from 'antd';
import { SaveOutlined, EditOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { getThongTinDuAn } from '@services/phieudieutra/phieudieutraService';
import { delById, updateById, add } from '@services/phieudieutra/thongtinduanService';
import { URL } from '@url';
const layoutCol = { 'xs': 24, 'sm': 24, 'md': 24, 'lg': 12, 'xl': 12, 'xxl': 12 };

class ThongTinDuAn extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      _id: ''
    };
    this.formRef = React.createRef();
  }



  async componentDidMount() {
    let {match} = this.props;
    let {id} = match.params;
    if(id){
      let dataSource = await getThongTinDuAn(id);
      if(dataSource){
        this.formRef.current?.setFieldsValue(dataSource);
      }
    }
  }

  onFinish = async (values) => {
    // thêm mới hay cập nhật
    let _id = values._id
    delete values._id

    if (_id) {
      let apiRes = await updateById(_id, values);
      if (apiRes) {
        message.success('Cập nhật dữ liệu thành công.');
      }
    } else {
      let {match} = this.props
      values.phieudieutra_id = match.params.id
      let apiRes = await add(values);
      if (apiRes) {
        message.success('Thêm dữ liệu thành công.');
        this.formRef.current?.setFieldsValue(apiRes);
      }
    }
  }

  render() {
    return <Form ref={this.formRef} layout='vertical' size='small' autoComplete='off' onFinish={this.onFinish}
           name="form_thongtinduan">
      <Card size="small" md="24" extra={<Button size='small' type="primary" icon={<SaveOutlined/>} htmlType="submit">Lưu</Button>}>
        <Row gutter={10}>
          <Form.Item name="_id" hidden={true}>
            <Input placeholder='Số lượng dự án đầu tư KKT, KCN và CCN'/>
          </Form.Item>
          <Col {...layoutCol}>
            <Form.Item label={<b>1.Số lượng dự án đầu tư KKT, KCN và CCN: </b>} name="duandautu">
              <Input.TextArea rows={2} placeholder='Số lượng dự án đầu tư KKT, KCN và CCN'/>
            </Form.Item>
          </Col>
          <Col {...layoutCol}>
            <Form.Item label={<b>2. Số lượng dự án hoạt động trong KKT, KCN và CCN:</b>} name="duanhoatdong">
              <Input.TextArea rows={2} placeholder='Số lượng dự án đầu tư KKT, KCN và CCN'/>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <b>3. Diện tích các KKT, KCN và CNN:</b>
          </Col>
          <Col {...layoutCol}>
            <Form.Item label="Tổng diện tích đất" name="dientichdat">
              <Input placeholder='Tổng diện tích đất'/>
            </Form.Item>
          </Col>
          <Col {...layoutCol}>
            <Form.Item label="Diện tích đất đã được lấp đầy" name="dientichdatlapday">
              <Input placeholder='Diện tích đất đã được lấp đầy'/>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  }
}

export default withRouter(ThongTinDuAn);

