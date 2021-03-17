import React, { Component, Fragment } from 'react';
import {Col, Row, Select, Input, Button, Form, Table, Popconfirm, message, Modal, InputNumber, Card, Tooltip, Typography } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, UnorderedListOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { getSetting, updateById } from '@services/settingService';
import { PAGINATION_CONFIG, RULE } from '@constants';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import { withTinhThanh } from "@reduxApp/TinhThanh/connect";
import { compose } from 'redux';

class DonViDieuTra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRes: [],
      page: 1,
      limit: 10,
      totalDocs: 0,
    };
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    const apiResponse = await getSetting();
    if (apiResponse) {
      this.setState({
          _id: apiResponse._id,
      });
      this.formRef.current.resetFields();
      this.formRef.current.setFieldsValue(apiResponse);
    }
  }

  handleSaveData = async (data) => {
    const { _id } = this.state;
    if (_id) {
      const apiResponse = await updateById(_id, data);
      if(apiResponse){
        const dataRes = this.state.dataRes.map(data => {
          if (data._id === apiResponse._id) {
            return apiResponse
          }
          return data;
        });
        message.success('Chỉnh sửa thành công');
        this.formRef.current.resetFields();
        this.formRef.current.setFieldsValue(data);
      }
    } 
  }

  render() {
    const { loading, tinhthanh } = this.props;

    return <div>
    <Typography.Title level={4}>Thông tin đơn vị điều tra</Typography.Title>
      <Form ref={this.formRef} size="small" layout="vertical" onFinish={this.handleSaveData} >
        <Row>
          <Col xl={16}>
            <Row gutter={[24, 0]}>
              
              <Col xs={24} lg={24}>
                <Form.Item name="tendonvi" label="Tên đơn vị điều tra" rules={[RULE.REQUIRED]} hasFeedback>
                  <Input placeholder="Tên đơn vị điều tra" disabled={loading} />
                </Form.Item>
              </Col>

              <Col xs={24} lg={12}>
                <Form.Item
                  name="daidien"
                  label="Đại diện"
                  rules={[RULE.REQUIRED]}
                  hasFeedback
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input placeholder="Đại diện" disabled={loading} />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  name="chucvu"
                  label="Chức vụ"
                  rules={[RULE.REQUIRED]}
                  hasFeedback
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input placeholder="Chức vụ" disabled={loading} />
                </Form.Item>
              </Col>
              <Col xs={24} lg={24}>
                <Form.Item
                  name="diachi"
                  label="Địa chỉ"
                  rules={[RULE.REQUIRED]}
                  hasFeedback
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input placeholder="Địa chỉ" disabled={loading} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col sm={24}><strong>Tỉnh điều tra</strong></Col>
          <Col xs={24} lg={6}>
          <Form.Item label= {<b> Chọn tỉnh</b>} name="tinhdieutra_id"
                           validateTrigger={['onChange', 'onBlur']}
                           rules={[{ required: true, message: 'Tỉnh không được để trống' }]}>
                  <Select placeholder='Chọn tỉnh thành' disabled={loading} dropdownClassName='small' showSearch
                          filterOption={(input, option) => {
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                          }}>
                    {tinhthanh.map(data => {
                      return <Select.Option key={data._id} value={data._id}>
                        {data.tentinh}
                      </Select.Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>


          <Col xs={24}>
            <Form.Item>
              <Button   type="primary" htmlType="submit" icon={<SaveOutlined />} >
                Lưu
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

    </div>;
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, withTinhThanh)(DonViDieuTra);
