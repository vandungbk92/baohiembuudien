import React, { Component, Fragment } from "react";
import { RULE } from "@constants";
import {
  Switch ,  Tabs,
  Calendar,
  Alert,
  Input,
  InputNumber,
  Button,
  Form,
  message,
  Row,
  Col,
  Select,
  Radio,
  Checkbox,
  Upload
} from "antd";
import { UploadOutlined, SaveOutlined, BellOutlined, UserOutlined, CheckOutlined , CloseOutlined  } from "@ant-design/icons";
import { add, getById, updateById } from "@services/quanlycaddy/caddyService";
import { CONSTANTS } from "@constants";
import { uploadImages } from "@services/uploadServices";
import { getAll as getAllTT } from "@services/quanlycaddy/trangthaicaddyService";
import { createStructuredSelector } from "reselect";
import { makeGetLoading } from "@containers/App/AppProvider/selectors";
import { makeGetMyInfo } from "../../../../Layout/HeaderComponent/HeaderProvider/selectors";
import { connect } from "react-redux";
import axios from "axios";
import { URL } from "@url";
import Box from "@containers/Box";
import { number } from "prop-types";
import moment from "moment";
import { API } from '@api';
import LichLamViec from 'Pages/QuanLyCaddy/Caddy/LichLamViec/LichLamViec';
import LichHenVoiKhach from 'Pages/QuanLyCaddy/Caddy/LichLamViec/LichHenVoiKhach';
const layoutCol = { xl: 8, md: 24, lg: 24, xs: 24, sm: 24 };
const { TabPane } = Tabs;
class CaddyChiTiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      mode: "top",
      dsTrangThai: [],
      avatarUpload: [],
      value: moment("2017-01-25"),
      selectedValue: moment("2017-01-25"),
      _id: this.props.match.params.id
    };
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    // let apiRequest = [getAllTT(1, 0)];
    // let apiResponse = await axios.all(apiRequest).then(
    //   axios.spread(function(dsTrangThai) {
    //     return {
    //       dsTrangThai: dsTrangThai
    //     };
    //   })
    // );
    // console.log(this.props.match.params,'this.props.match.params');
    // let dsTrangThai = apiResponse.dsTrangThai ? apiResponse.dsTrangThai.docs : this.state.dsTrangThai;
    // this.setState({ dsTrangThai });
    if (this.state._id) {
      let dataRes = await getById(this.state._id);
      this.setState({ avatarUpload: [{ url: API.FILES.format(dataRes.avatar) }] });
      this.formRef.current.setFieldsValue({
        id: dataRes.id,
        taikhoan: dataRes.taikhoan,
        matkhau: dataRes.matkhau,
        hoten: dataRes.hoten,
        diachi: dataRes.diachi,
        sdt: dataRes.sdt,
        email: dataRes.email,
        macaddy: dataRes.macaddy,
        kinhnghiem: dataRes.kinhnghiem,
        trangthailamviec: dataRes.trangthailamviec,
        avatar:dataRes.avatar,
        active: dataRes.active
      });
    }
  }
  handleModeChange = e => {
    const mode = e.target.value;
    this.setState({ mode });
  };
  onFinish = async values => {
    if (this.state.avatarUpload[0]?.originFileObj) {
      const fileUpload = this.state.avatarUpload.map(data => data.originFileObj);
      const files = await uploadImages(fileUpload);
      if (files?.length) {
        values.avatar = files[0];
      }
    }
    if (this.state._id) {
      const caddyRes = await updateById(this.state._id, values);
      if (caddyRes) {
        message.success("Cập nhật dữ liệu thành công");
        if (caddyRes.avatar) this.setState({ avatarUpload: [{ url: API.FILES.format(caddyRes.avatar)}]});
      }
    } else {
      const caddyRes = await add(values);
      if (caddyRes) {
        message.success("Thêm dữ liệu thành công");
        this.props.history.push(URL.CADDY_ID.format(caddyRes._id));
      }
    }
  };

  // onFieldsChange = async (changedValues, allValues) => {
  //   //console.log(changedValues, "changedValues");
  // };


  onValuesChange = (changedValues, allValues) => {
    this.setState(changedValues)
  }

  onSelect = async value => {
    this.setState({
      value,
      selectedValue: value
    });
  };

  onPanelChange = async value => {
    this.setState({ value });
  };

  render() {
    const { loading } = this.props;
    const { _id, dsTrangThai, mode, value, selectedValue } = this.state;
    return (
      <div>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Thông tin Caddy" key="1">
            <Form
              ref={this.formRef}
              layout="vertical"
              size="small"
              autoComplete="off"
              onFinish={this.onFinish}
              onValuesChange={this.onValuesChange}
            >
              <Box
                title="Thông tin Caddy"
                boxActions={
                  this.props.myInfoResponse.role === CONSTANTS.ADMIN ? (
                    <Button key="submit" htmlType="submit" icon={<SaveOutlined />} size="small" type="primary">
                      Lưu dữ liệu
                    </Button>
                  ) : (
                    ""
                  )
                }
              >
                <Row>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} >
                    <Form.Item
                      name="avatar"
                      labelCol={layoutCol}
                      label="Ảnh đại diện"
                      rules={[{ required: true, message: "Hình ảnh đại diện là bắt buộc" }]}
                    >
                      <div  >
                        <Upload

                          action={false}
                          accept="image/*"
                          listType="picture-card"
                          fileList={this.state.avatarUpload}
                          onChange={({ file, fileList }) => {
                            if (file.status === "removed") {
                              this.setState({ avatarUpload: [] });
                              this.formRef.current.setFieldsValue({ avatar: "" });
                            } else {
                              this.setState({ avatarUpload: [fileList.pop()] });
                            }
                          }}
                          beforeUpload={() => false}
                          showUploadList={{
                            showPreviewIcon: false,
                            showRemoveIcon: true
                          }}
                          disabled={this.props.loading}
                        >
                          <Button icon={<UploadOutlined style={{borderRadius:'6px'}}  />}>Chọn ảnh</Button>
                        </Upload>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col sm={6}>
                    <Form.Item
                      label={<b>Tài khoản đăng nhập</b>}
                      name="taikhoan"
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, message: "Tài khoản không được để trống" }]}
                    >
                      <Input placeholder="Tài khoản đăng nhập" disabled={loading} />
                    </Form.Item>
                  </Col>
                  <Col sm={6}>
                    <Form.Item
                      label={<b>Mật khẩu</b>}
                      name="matkhau"
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, message: "Mật khẩu không được để trống" }]}
                    >
                      <Input placeholder="Mật khẩu" disabled={loading} />
                    </Form.Item>
                  </Col>
                  <Col sm={6}>
                    <Form.Item
                      label={<b>Họ và tên</b>}
                      name="hoten"
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, message: "Họ và tên không được để trống" }]}
                    >
                      <Input placeholder="Họ và tên" disabled={loading} />
                    </Form.Item>
                  </Col>

                  <Col sm={6}>
                    <Form.Item
                      label={<b>Địa chỉ</b>}
                      name="diachi"
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, message: "địa chỉ không được để trống" }]}
                    >
                      <Input placeholder="địa chỉ" disabled={loading} />
                    </Form.Item>
                  </Col>
                  <Col sm={6}>
                    <Form.Item
                      label={<b>Số điện thoại</b>}
                      name="sdt"
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, message: "số điện thoại không được để trống" }]}
                    >
                      <Input placeholder="số điện thoại" disabled={loading} type="number" />
                    </Form.Item>
                  </Col>
                  <Col sm={6}>
                    <Form.Item
                      label={<b>Email</b>}
                      name="email"
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, message: "email không được để trống" }]}
                    >
                      <Input placeholder="email" type="email" disabled={loading} />
                    </Form.Item>
                  </Col>
                  <Col sm={6}>
                    <Form.Item
                      label="Trạng thái"
                      name="trangthailamviec"
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, message: "trạng thái không được để trống" }]}
                    >
                      <Select defaultValue= {0}>
                        <Option value={0}>Chưa có lịch hẹn</Option>
                        <Option value= {1}>Đã có lịch hẹn</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={6}>
                    <Form.Item
                      label={<b>Mã caddy</b>}
                      name="macaddy"
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, message: "Mã caddy không được để trống" }]}
                    >
                      <Input placeholder="Mã caddy " disabled={loading} />
                    </Form.Item>
                  </Col>
                  <Col xs={12}>
                    <Form.Item label="Trạng thái tài khoản" name="active" >
                      <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        checked={this.state.active}
                      />
                    </Form.Item>
                  </Col>
                  {/*<Col sm={12}>*/}
                  {/*  <Form.Item*/}
                  {/*    label={<b>Kinh nghiệm</b>}*/}
                  {/*    name="kinhnghiem"*/}
                  {/*    validateTrigger={["onChange", "onBlur"]}*/}
                  {/*    ules={[{ required: true, message: "Kinh nghiệm không được để trống" }]}*/}
                  {/*  >*/}
                  {/*    <Input placeholder="Kinh nghiệm" disabled={loading} />*/}
                  {/*  </Form.Item>*/}
                  {/*</Col>*/}
                </Row>
              </Box>
            </Form>
            ;
          </TabPane>
          <TabPane tab="Lịch làm việc" key="2">
            <LichLamViec caddy_id = {this.state._id} ></LichLamViec>
          </TabPane>
          <TabPane tab="Lịch với khách hàng" key="3">
            <LichHenVoiKhach caddy_id = {this.state._id} ></LichHenVoiKhach>
          </TabPane>
          <TabPane tab="Thống kê ngày nghỉ" key="4">
            <Form>
              <Box
                title="Lịch làm việc của Caddy"
                boxActions={
                  this.props.myInfoResponse.role === CONSTANTS.ADMIN ? (
                    <Button key="submit" htmlType="submit" icon={<SaveOutlined />} size="small" type="primary">
                      Lưu dữ liệu
                    </Button>
                  ) : (
                    ""
                  )
                }
              >
                <Alert message={`You selected date: ${selectedValue && selectedValue.format("YYYY-MM-DD")}`} />
                <Calendar value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />

              </Box>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
  myInfoResponse: makeGetMyInfo()
});

const withConnect = connect(mapStateToProps);

export default withConnect(CaddyChiTiet);
