import React, { Component, Fragment } from "react";
import { ROLE_OPTIONS, RULE } from '@constants';
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
import { CONSTANTS } from "@constants";
import { uploadImages } from "@services/uploadServices";
import { add,updateById,delById,getById,getAll } from "@services/quanlylichsangolf/lichsangolfService";
import { createStructuredSelector } from "reselect";
import { makeGetLoading } from "@containers/App/AppProvider/selectors";
import { makeGetMyInfo } from "../../../../Layout/HeaderComponent/HeaderProvider/selectors";
import { connect } from "react-redux";
import axios from "axios";
import { URL } from "@url";
import Box from "@containers/Box";
import { number } from "prop-types";
import moment from 'moment';
import { API } from '@api';
import {getAll as getALLKhungGio } from "@services/quanlylichsangolf/khunggiosangolfService";

const layoutCol = { xl: 8, md: 24, lg: 24, xs: 24, sm: 24 };
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
import {dateFormatter, dateFormatYMD} from '@commons/dateFormat';
import { getAll as getAllTT } from '@services/quanlycaddy/trangthaicaddyService';

class ThemMoiLich extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "top",
      dsKhungGio: [],
      avatarUpload: [],
      value: moment("2017-01-25"),
      selectedValue: moment("2017-01-25"),
      dataRes : '',
      endTime : '',
      _id: this.props.match.params.id,

    };
    this.formRefLichLamViec = React.createRef();
  }
  async componentDidMount() {
    let apiRequest = [getALLKhungGio(1, 0)];
    let apiResponse = await axios.all(apiRequest).then(
      axios.spread(function(dsKhungGio) {
        return {
          dsKhungGio: dsKhungGio
        };
      })
    );
    let dsKhungGio = apiResponse.dsKhungGio ? apiResponse.dsKhungGio.docs : this.state.dsKhungGio;
    console.log(dsKhungGio,'dsKuhngGio');
    this.setState({ dsKhungGio });
    if (this.state._id){
      let dataRes = await  getById(this.state._id)
      console.log(dataRes,'dataResdataResdataRes');
      this.setState({dataRes :  dataRes})
    }
    this.state.dataRes.tungay = this.state.dataRes.tungay ? moment(this.state.dataRes.tungay) : null;
    this.state.dataRes.denngay = this.state.dataRes.denngay ? moment(this.state.dataRes.denngay) : null;
    console.log(this.state.dataRes.thu2,'111111111');

    this.state.dataRes.thu2 = this.state.dataRes.thu2.map(data=> {
      return data._id
    })
    console.log(this.state.dataRes.thu2,'22222');
    this.state.dataRes.thu3 = this.state.dataRes.thu3.map(data=> {
      return data._id
    })
    this.state.dataRes.thu4 = this.state.dataRes.thu4.map(data=> {
      return data._id
    })
    this.state.dataRes.thu5 = this.state.dataRes.thu5.map(data=> {
      return data._id
    })
    this.state.dataRes.thu6 = this.state.dataRes.thu6.map(data=> {
      return data._id
    })
    this.state.dataRes.thu7 = this.state.dataRes.thu7.map(data=> {
      return data._id
    })
    this.state.dataRes.chunhat = this.state.dataRes.chunhat.map(data=> {
      return data._id
    })
    this.formRefLichLamViec.current.setFieldsValue(this.state.dataRes);
  }
  componentDidUpdate(prevProps, prevState){
  }
  handleModeChange = e => {
    const mode = e.target.value;
    this.setState({ mode });
  };

  onFinish = async values => {
      values.tungay = values.tungay ? values.tungay.format('YYYY-MM-DD HH:mm:ss') : '';
      values.denngay = values.denngay ? values.denngay.format('YYYY-MM-DD HH:mm:ss') : '';
      let getTungay = dateFormatYMD(values.tungay)
      let getDenngay = dateFormatYMD(values.denngay)
      let getEndtime = dateFormatYMD(this.state.endTime)
      let ssTuNgay, ssEndTime, ssDenngay
      ssTuNgay = new Date(getTungay)
      ssEndTime = new Date(getEndtime)
      ssDenngay = new Date (getDenngay)
    if(this.state._id){
      if (ssTuNgay < ssEndTime) {
        message.error("Lịch làm việc cũ chưa kết thúc");
        return
      }
    }
      if (ssTuNgay > ssDenngay) {
        message.error("Ngày bắt đầu không được lớn hơn ngày kết thúc");
        return
      }
      // let casang = [];
      // let cachieu = [];
      // let cangay = [];
      // let nghi = [];
      //
      // values.thu2 === 'SANG' ? casang.push(0) : values.thu2 === 'CHIEU'
      //   ? cachieu.push(0) : values.thu2 === 'CANGAY' ? cangay.push(0)  : nghi.push(0)
      // values.thu3 === 'SANG' ? casang.push(1) : values.thu3 === 'CHIEU'
      //   ? cachieu.push(1) : values.thu3 === 'CANGAY' ? cangay.push(1)  : nghi.push(1)
      // values.thu4 === 'SANG' ? casang.push(2) : values.thu4 === 'CHIEU'
      //   ? cachieu.push(2) : values.thu4 === 'CANGAY' ? cangay.push(2)  : nghi.push(2)
      // values.thu5 === 'SANG' ? casang.push(3) : values.thu5 === 'CHIEU'
      //   ? cachieu.push(3) : values.thu5 === 'CANGAY' ? cangay.push(3)  : nghi.push(3)
      // values.thu6 === 'SANG' ? casang.push(4) : values.thu6 === 'CHIEU'
      //   ? cachieu.push(4) : values.thu6 === 'CANGAY' ? cangay.push(4)  : nghi.push(4)
      // values.thu7 === 'SANG' ? casang.push(5) : values.thu7 === 'CHIEU'
      //   ? cachieu.push(5) : values.thu7 === 'CANGAY' ? cangay.push(5)  : nghi.push(5)
      // values.chunhat === 'SANG' ? casang.push(6) : values.chunhat === 'CHIEU'
      //   ? cachieu.push(6) : values.chunhat === 'CANGAY' ? cangay.push(6)  : nghi.push(6)
      // values.casang = casang
      // values.cachieu = cachieu
      // values.nghi = nghi
      // values.cangay = cangay
    if(!this.state._id){
      const lichsangolfRes = await add(values);
      if (lichsangolfRes) {
        message.success("Thêm dữ liệu thành công");
      }
    }else {
      const lichsangolfRes = await updateById(this.state._id, values);
      if (lichsangolfRes) {
        message.success(" Update dữ liệu thành công");
      }
    }
  }

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

  callbackFunction = (key,activetab)  => {
    this.setState({
      stt: key,
      activeTab :  activetab
    })
  };
  onChange = e => {
    setValue(e.target.value);
  };

  changeTab = activeKey => {
    this.setState({
      activeTab: activeKey
    });
  };


  render() {
    const { loading } = this.props;
    const { _id, dsKhungGio, mode, value, selectedValue } = this.state;
    return (
      <div>
            <Form
              ref={this.formRefLichLamViec}
              layout="vertical"
              size="small"
              autoComplete="off"
              onFinish={this.onFinish}
              onValuesChange={this.onFieldsChange}
            >
              <Box
                title="Lịch làm việc của sân golf"
                boxActions={
                   (
                    <Button key="submit" htmlType="submit" icon={<SaveOutlined />} size="small" type="primary">
                      Lưu dữ liệu
                    </Button>
                    )
                }
              >
                <Row>
                  <Col sm={24} lg={6} xl={6}>
                    <Form.Item
                      label={<b>Thời gian bắt đầu </b>}
                      name= 'tungay'
                      rules={[{ required: true, message: "Thời gian không được để trống" }]}
                    >
                      <DatePicker/>
                    </Form.Item>
                  </Col>
                  <Col  sm={24} lg={6} xl={6}>
                    <Form.Item
                      name= 'denngay'
                      rules={[{ required: false, message: "Thời gian không được để trống" }]}
                      label={<b>Thời gian kết thúc</b>}>
                      <DatePicker/>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col sm={24}  lg={6} xl={6}>
                    <Form.Item
                      name= 'laplai'
                      rules={[{ required: false, message: "Lặp lại không được để trống" }]}
                      label={<b>Lặp lại </b>}>
                      <Select defaultValue="THEOTHANG" style={{ width: 120 }}>
                        <Option value="THEOTUAN">Theo tuần</Option>
                        <Option value="THEOTHANG">Theo tháng</Option>
                        <Option value="KHONG">Không lặp lại</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={6} xl={6}>
                    <Form.Item
                      name= 'thu2'
                      rules={[{ required: true, message: "Thời gian làm việc là bắt buộc chọn" }]}
                      label={<b>Thứ 2 </b>}
                    >
                      <Select mode="multiple" style={{ width: 120 }} disabled={loading}>
                        {dsKhungGio.map(data => {
                          return <Select.Option key={data._id} value={data._id}>
                            {data.khunggio}
                          </Select.Option>;
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={6} xl={6}>

                    <Form.Item
                      name= 'thu3'
                      rules={[{ required: true, message: "Thời gian làm việc là bắt buộc chọn" }]}
                      label={<b>Thứ 3 </b>}>
                      <Select mode="multiple" style={{ width: 120 }} disabled={loading}>
                        {dsKhungGio.map(data => {
                          return <Select.Option key={data._id} value={data._id}>
                            {data.khunggio}
                          </Select.Option>;
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={6} xl={6}>

                    <Form.Item
                      name= 'thu4'
                      rules={[{ required: true, message: "Thời gian làm việc là bắt buộc chọn" }]}label={<b>Thứ 4 </b>}>
                      <Select mode="multiple" style={{ width: 120 }} disabled={loading}>
                        {dsKhungGio.map(data => {
                          return <Select.Option key={data._id} value={data._id}>
                            {data.khunggio}
                          </Select.Option>;
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>


                <Row>
                  <Col sm={24} lg={6} xl={6}>
                    <Form.Item
                      name= 'thu5'
                      rules={[{ required: true, message: "Thời gian làm việc là bắt buộc chọn" }]}
                      label={<b>Thứ 5 </b>}>
                      <Select mode="multiple" style={{ width: 120 }} disabled={loading}>
                        {dsKhungGio.map(data => {
                          return <Select.Option key={data._id} value={data._id}>
                            {data.khunggio}
                          </Select.Option>;
                        })}
                      </Select>
                    </Form.Item>

                  </Col>
                  <Col sm={24} lg={6} xl={6}>

                    <Form.Item
                      name= 'thu6'
                      rules={[{ required: true, message: "Thời gian làm việc là bắt buộc chọn" }]}label={<b>Thứ 6 </b>}>
                      <Select mode="multiple" style={{ width: 120 }} disabled={loading}>
                        {dsKhungGio.map(data => {
                          return <Select.Option key={data._id} value={data._id}>
                            {data.khunggio}
                          </Select.Option>;
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={6} xl={6}>
                    <Form.Item
                      name= 'thu7'
                      rules={[{ required: true, message: "Thời gian làm việc là bắt buộc chọn" }]}label={<b>Thứ 7 </b>}>
                      <Select mode="multiple" style={{ width: 120 }} disabled={loading}>
                        {dsKhungGio.map(data => {
                          return <Select.Option key={data._id} value={data._id}>
                            {data.khunggio}
                          </Select.Option>;
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={6} xl={6}>
                    <Form.Item
                      name= 'chunhat'
                      rules={[{ required: true, message: "Thời gian làm việc là bắt buộc chọn" }]}label={<b>Chủ nhật </b>}>
                      <Select mode="multiple" style={{ width: 120 }} disabled={loading}>
                        {dsKhungGio.map(data => {
                          return <Select.Option key={data._id} value={data._id}>
                            {data.khunggio}
                          </Select.Option>;
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col sm={24} lg={12} xl={12}>
                    <Form.Item
                      name= 'ghichu'
                      rules={[{ required: false, message: "Thời gian làm việc là bắt buộc chọn" }]}label={<b>Ghi chú</b>}>
                      <Input placeholder="Ghi chú" />
                    </Form.Item>
                  </Col>
                </Row>
              </Box>
            </Form>

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
  myInfoResponse: makeGetMyInfo()
});

const withConnect = connect(mapStateToProps);

export default withConnect(ThemMoiLich);
