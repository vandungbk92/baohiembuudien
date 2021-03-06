import React, { Component, Fragment } from "react";
import { RULE } from "@constants";
import {
  Tabs,
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
  Upload,Table
} from "antd";
import { UploadOutlined, SaveOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";
import { add, getById, updateById } from "@services/job/jobService";
import { CONSTANTS } from "@constants";
import { uploadImages } from "@services/uploadServices";
import { getAll as getAllTT } from "@services/job/trangThaiJobService";
import { createStructuredSelector } from "reselect";
import { makeGetLoading } from "@containers/App/AppProvider/selectors";
import { makeGetMyInfo } from "../../../Layout/HeaderComponent/HeaderProvider/selectors";
import { connect } from "react-redux";
import axios from "axios";
import { URL } from "@url";
import Box from "@containers/Box";
import { number } from "prop-types";
import moment from "moment";
import { API } from '@api';
const layoutCol = { xl: 8, md: 24, lg: 24, xs: 24, sm: 24 };
const { TabPane } = Tabs;
class JobChiTiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    let apiRequest = [getAllTT(1, 0)];

    let apiResponse = await axios.all(apiRequest).then(
      axios.spread(function(dsTrangThai) {
        return {
          dsTrangThai: dsTrangThai
        };
      })
    );

    let dsTrangThai = apiResponse.dsTrangThai ? apiResponse.dsTrangThai.docs : this.state.dsTrangThai;

    this.setState({ dsTrangThai });
    if (this.state._id) {
      let dataRes = await getById(this.state._id);
      //console.log("rress",dataRes);
      this.setState({ avatarUpload: [{ url: API.FILES.format(dataRes.avatar) }] });
      this.formRef.current.setFieldsValue({
        id: dataRes.id,
        taikhoan: dataRes.taikhoan,
        matkhau: dataRes.matkhau,
        hoten: dataRes.hoten,
        diachi: dataRes.diachi,
        sdt: dataRes.sdt,
        email: dataRes.email,
        trinhdohocvan: dataRes.trinhdohocvan,
        kinhnghiem: dataRes.kinhnghiem,
        trangthai_id: dataRes.trangthai_id._id,
        avatar:dataRes.avatar,
      
      });

      // set form
    }
  }

  handleModeChange = e => {
    const mode = e.target.value;
    this.setState({ mode });
  };

  onFinish = async values => {
    console.log(values,'values');
    console.log(this.state.avatarUpload,'this.state.avatarUpload');
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

  onFieldsChange = async (changedValues, allValues) => {
    //console.log(changedValues, "changedValues");
  };

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
    console.log(dsTrangThai, "tt");

    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Thông tin hành chính" key="1">
            <Form
              ref={this.formRef}
              layout="vertical"
              size="small"
              autoComplete="off"
              onFinish={this.onFinish}
              onValuesChange={this.onFieldsChange}
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
                      label={<b>ID</b>}
                      name="id"
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, message: "ID không được để trống" }]}
                    >
                      <Input placeholder="ID" disabled={loading} />
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
                      name="trangthai_id"
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, message: "trạng thái không được để trống" }]}
                    >
                      <Select
                        placeholder="Chọn trạng thái"
                        disabled={loading}
                        dropdownClassName="small"
                        showSearch
                        filterOption={(input, option) => {
                          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }}
                      >
                        {dsTrangThai.map(data => {
                          return (
                            <Select.Option key={data._id} value={data._id}>
                              {data.tentrangthai}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={12}>
                    <Form.Item
                      label={<b>Trình độ học vấn</b>}
                      name="trinhdohocvan"
                      validateTrigger={["onChange", "onBlur"]}
                      ules={[{ required: true, message: "Trình độ học vấn không được để trống" }]}
                    >
                      <Input placeholder="Trình độ học vấn" disabled={loading} />
                    </Form.Item>
                  </Col>
                  <Col sm={12}>
                    <Form.Item
                      label={<b>Kinh nghiệm</b>}
                      name="kinhnghiem"
                      validateTrigger={["onChange", "onBlur"]}
                      ules={[{ required: true, message: "Kinh nghiệm không được để trống" }]}
                    >
                      <Input placeholder="Kinh nghiệm" disabled={loading} />
                    </Form.Item>
                  </Col>
                </Row>
              </Box>
            </Form>
            ;
          </TabPane>
          <TabPane tab="Thông tin tài khoản" key="2">
            <Form
              ref={this.formRef}
              layout="vertical"
              size="small"
              autoComplete="off"
              onFinish={this.onFinish}
              onValuesChange={this.onFieldsChange}
            >
              <Box
                title="cập nhật mật khẩu"
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
                <Row gutter={10}>
                  <Col sm={6}>
                    <Form.Item
                      label={<b>Tài khoản</b>}
                      name="taikhoan"
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, message: "Tài khoản không được để trống" }]}
                    >
                      <Input
                        placeholder="tài khoản"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        disabled={loading}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={6}>
                    <Form.Item
                      label={<b>Mật khẩu</b>}
                      name="matkhau"
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, message: "Mật khẩu không được để trống" }]}
                    >
                      <Input.Password placeholder="mật khẩu" disabled={loading} />
                    </Form.Item>
                  </Col>
                </Row>
              </Box>
            </Form>
            ;
          </TabPane>
          <TabPane tab="Lịch làm việc" key="3">
            <Alert message={`You selected date: ${selectedValue && selectedValue.format("YYYY-MM-DD")}`} />
            <Calendar value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
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

export default withConnect(JobChiTiet);
