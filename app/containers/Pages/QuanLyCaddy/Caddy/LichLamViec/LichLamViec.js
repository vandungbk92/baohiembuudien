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
  Upload,
  DatePicker,
  Divider
} from "antd";
import { UploadOutlined, SaveOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";
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
const layoutCol = { xl: 8, md: 24, lg: 24, xs: 24, sm: 24 };
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

class LichLamViec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "top",
      dsTrangThai: [],
      avatarUpload: [],
      value: moment("2017-01-25"),
      selectedValue: moment("2017-01-25"),
      // _id: this.props.match.params.id
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
      this.setState({ avatarUpload: [{ url: API.FILES.format(dataRes.avatar) }] });
      this.formRef.current.setFieldsValue({
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

   onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  render() {
    const { loading } = this.props;
    const { _id, dsTrangThai, mode, value, selectedValue } = this.state;
    return (
      <div>
        {/*<Divider/>*/}
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Cập nhật lịch" key="1">
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
                <Form.Item label={<b>Thời gian làm việc </b>}>
                  <RangePicker />
                </Form.Item>
                <Col sm={6}>
                <Form.Item label={<b>Thứ 2 </b>}>
                  <Select defaultValue="lucy" style={{ width: 120 }}>
                    <Option value="jack">Buổi sáng</Option>
                    <Option value="lucy">Buổi chiều</Option>
                    <Option value="disabled"> Cả ngày</Option>
                    <Option value="Yiminghe">Nghỉ làm</Option>
                  </Select>
                </Form.Item>
                </Col>
                <Col sm={6}>

                <Form.Item label={<b>Thứ 3 </b>}>
                  <Select defaultValue="lucy" style={{ width: 120 }}>
                    <Option value="jack">Buổi sáng</Option>
                    <Option value="lucy">Buổi chiều</Option>
                    <Option value="disabled"> Cả ngày</Option>
                    <Option value="Yiminghe">Nghỉ làm</Option>
                  </Select>
                </Form.Item>
                </Col>
                <Col sm={6}>

                <Form.Item label={<b>Thứ 4 </b>}>
                  <Select defaultValue="lucy" style={{ width: 120 }}>
                    <Option value="jack">Buổi sáng</Option>
                    <Option value="lucy">Buổi chiều</Option>
                    <Option value="disabled"> Cả ngày</Option>
                    <Option value="Yiminghe">Nghỉ làm</Option>
                  </Select>
                </Form.Item>
                </Col>
                <Col sm={6}>
                <Form.Item label={<b>Thứ 5 </b>}>
                  <Select defaultValue="lucy" style={{ width: 120 }}>
                    <Option value="jack">Buổi sáng</Option>
                    <Option value="lucy">Buổi chiều</Option>
                    <Option value="disabled"> Cả ngày</Option>
                    <Option value="Yiminghe">Nghỉ làm</Option>
                  </Select>
                </Form.Item>

                </Col>
                <Col sm={6}>

                <Form.Item label={<b>Thứ 6 </b>}>
                  <Select defaultValue="lucy" style={{ width: 120 }}>
                    <Option value="jack">Buổi sáng</Option>
                    <Option value="lucy">Buổi chiều</Option>
                    <Option value="disabled"> Cả ngày</Option>
                    <Option value="Yiminghe">Nghỉ làm</Option>
                  </Select>
                </Form.Item>
                </Col>
                <Col sm={6}>
                <Form.Item label={<b>Thứ 7 </b>}>
                  <Select defaultValue="lucy" style={{ width: 120 }}>
                    <Option value="jack">Buổi sáng</Option>
                    <Option value="lucy">Buổi chiều</Option>
                    <Option value="disabled"> Cả ngày</Option>
                    <Option value="Yiminghe">Nghỉ làm</Option>
                  </Select>
                </Form.Item>
              </Col>
                <Col sm={6}>
                <Form.Item label={<b>Chủ nhật </b>}>
                  <Select defaultValue="lucy" style={{ width: 120 }}>
                    <Option value="jack">Buổi sáng</Option>
                    <Option value="lucy">Buổi chiều</Option>
                    <Option value="disabled"> Cả ngày</Option>
                    <Option value="Yiminghe">Nghỉ làm</Option>
                  </Select>
                </Form.Item>
                </Col>

              </Box>
            </Form>

            {/*<Form>*/}
            {/*  <Box*/}
            {/*    title="Lịch làm việc của Caddy"*/}
            {/*    boxActions={*/}
            {/*      this.props.myInfoResponse.role === CONSTANTS.ADMIN ? (*/}
            {/*        <Button key="submit" htmlType="submit" icon={<SaveOutlined />} size="small" type="primary">*/}
            {/*          Lưu dữ liệu*/}
            {/*        </Button>*/}
            {/*      ) : (*/}
            {/*        ""*/}
            {/*      )*/}
            {/*    }*/}
            {/*  >*/}
            {/*    <Form.Item label={<b>Thời gian làm việc </b>}>*/}
            {/*      <RangePicker />*/}
            {/*    </Form.Item>*/}
            {/*    <Form.Item label={<b>Thứ 2 </b>}>*/}
            {/*      <Radio.Group onChange={this.onChange} value={value}>*/}
            {/*        <Radio value={1}>Cả ngày</Radio>*/}
            {/*        <Radio value={2}>Buổi sáng</Radio>*/}
            {/*        <Radio value={3}>Buổi chiều</Radio>*/}
            {/*        <Radio value={4}> Nghỉ làm</Radio>*/}
            {/*      </Radio.Group>*/}
            {/*    </Form.Item>*/}
            {/*    <Form.Item label={<b>Thứ 3 </b>}>*/}
            {/*      <Radio.Group onChange={this.onChange} value={value}>*/}
            {/*        <Radio value={1}>Cả ngày</Radio>*/}
            {/*        <Radio value={2}>Buổi sáng</Radio>*/}
            {/*        <Radio value={3}>Buổi chiều</Radio>*/}
            {/*        <Radio value={4}> Nghỉ làm</Radio>*/}
            {/*      </Radio.Group>*/}
            {/*    </Form.Item>*/}
            {/*    <Form.Item label={<b>Thứ 4 </b>}>*/}
            {/*      <Radio.Group onChange={this.onChange} value={value}>*/}
            {/*        <Radio value={1}>Cả ngày</Radio>*/}
            {/*        <Radio value={2}>Buổi sáng</Radio>*/}
            {/*        <Radio value={3}>Buổi chiều</Radio>*/}
            {/*        <Radio value={4}> Nghỉ làm</Radio>*/}
            {/*      </Radio.Group>*/}
            {/*    </Form.Item>*/}
            {/*    <Form.Item label={<b>Thứ 5 </b>}>*/}
            {/*      <Radio.Group onChange={this.onChange} value={value}>*/}
            {/*        <Radio value={1}>Cả ngày</Radio>*/}
            {/*        <Radio value={2}>Buổi sáng</Radio>*/}
            {/*        <Radio value={3}>Buổi chiều</Radio>*/}
            {/*        <Radio value={4}> Nghỉ làm</Radio>*/}
            {/*      </Radio.Group>*/}
            {/*    </Form.Item>*/}
            {/*    <Form.Item label={<b>Thứ 6 </b>}>*/}
            {/*      <Radio.Group onChange={this.onChange} value={value}>*/}
            {/*        <Radio value={1}>Cả ngày</Radio>*/}
            {/*        <Radio value={2}>Buổi sáng</Radio>*/}
            {/*        <Radio value={3}>Buổi chiều</Radio>*/}
            {/*        <Radio value={4}> Nghỉ làm</Radio>*/}
            {/*      </Radio.Group>*/}
            {/*    </Form.Item>*/}
            {/*    <Form.Item label={<b>Thứ 7 </b>}>*/}
            {/*      <Radio.Group onChange={this.onChange} value={value}>*/}
            {/*        <Radio value={1}>Cả ngày</Radio>*/}
            {/*        <Radio value={2}>Buổi sáng</Radio>*/}
            {/*        <Radio value={3}>Buổi chiều</Radio>*/}
            {/*        <Radio value={4}> Nghỉ làm</Radio>*/}
            {/*      </Radio.Group>*/}
            {/*    </Form.Item>*/}
            {/*    <Form.Item label={<b>Chủ nhật </b>}>*/}
            {/*      <Radio.Group onChange={this.onChange} value={value}>*/}
            {/*        <Radio value={1}>Cả ngày</Radio>*/}
            {/*        <Radio value={2}>Buổi sáng</Radio>*/}
            {/*        <Radio value={3}>Buổi chiều</Radio>*/}
            {/*        <Radio value={4}> Nghỉ làm</Radio>*/}
            {/*      </Radio.Group>*/}
            {/*    </Form.Item>*/}
            {/*  </Box>*/}
            {/*</Form>*/}
          </TabPane>
          <TabPane tab="Chi tiết lịch" key="2">
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

export default withConnect(LichLamViec);
