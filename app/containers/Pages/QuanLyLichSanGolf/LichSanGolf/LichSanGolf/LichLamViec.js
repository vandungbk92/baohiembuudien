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
import { CONSTANTS } from "@constants";
import { uploadImages } from "@services/uploadServices";
import { add,updateById,delById,getById,getAll } from "@services/quanlycaddy/lichlamvieccaddyService";
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
import ChiTietLich from 'Pages/QuanLyCaddy/Caddy/LichLamViec/ChiTietLich';
const layoutCol = { xl: 8, md: 24, lg: 24, xs: 24, sm: 24 };
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
import LichSuLichLamViec from 'Pages/QuanLyCaddy/Caddy/LichLamViec/LichSuLichLamViec';
import { getAllDslichByCaddy } from '@services/quanlycaddy/caddyService';
import {dateFormatter, dateFormatYMD} from '@commons/dateFormat';
import ThemMoiLich from 'Pages/QuanLyCaddy/Caddy/LichLamViec/ThemMoiLich';
class LichLamViec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "top",
      dsTrangThai: [],
      avatarUpload: [],
      propChild : "",
      activeTab : '1',
      value: moment("2017-01-25"),
      selectedValue: moment("2017-01-25"),
      caddy_id: this.props.caddy_id,
      dataRes : [],
      endTime : '',
      stt : null
    };
    this.formRefLichLamViec = React.createRef();
  }
  async componentDidMount() {
    let dataRes = await getAllDslichByCaddy(this.state.caddy_id)
    console.log(dataRes,'dataResdataResdataRes');
    if(dataRes){
      this.setState({endTime : dataRes[0].denngay})
    }
    if (this.state.stt !== null){
      this.formRefLichLamViec.current.setFieldsValue(this.state.stt);
    }

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
    if (ssTuNgay < ssEndTime) {
      message.error("Lịch làm việc cũ chưa kết thúc");
      return
    }
    if (ssTuNgay > ssDenngay) {
      message.error("Ngày bắt đầu không được lớn hơn ngày kết thúc");
      return
    }
    let casang = [];
    let cachieu = [];
    let cangay = [];
    let nghi = [];

    values.thu2 === 'SANG' ? casang.push(0) : values.thu2 === 'CHIEU'
      ? cachieu.push(0) : values.thu2 === 'CANGAY' ? cangay.push(0)  : nghi.push(0)
    values.thu3 === 'SANG' ? casang.push(1) : values.thu3 === 'CHIEU'
      ? cachieu.push(1) : values.thu3 === 'CANGAY' ? cangay.push(1)  : nghi.push(1)
    values.thu4 === 'SANG' ? casang.push(2) : values.thu4 === 'CHIEU'
      ? cachieu.push(2) : values.thu4 === 'CANGAY' ? cangay.push(2)  : nghi.push(2)
    values.thu5 === 'SANG' ? casang.push(3) : values.thu5 === 'CHIEU'
      ? cachieu.push(3) : values.thu5 === 'CANGAY' ? cangay.push(3)  : nghi.push(3)
    values.thu6 === 'SANG' ? casang.push(4) : values.thu6 === 'CHIEU'
      ? cachieu.push(4) : values.thu6 === 'CANGAY' ? cangay.push(4)  : nghi.push(4)
    values.thu7 === 'SANG' ? casang.push(5) : values.thu7 === 'CHIEU'
      ? cachieu.push(5) : values.thu7 === 'CANGAY' ? cangay.push(5)  : nghi.push(5)
    values.chunhat === 'SANG' ? casang.push(6) : values.chunhat === 'CHIEU'
      ? cachieu.push(6) : values.chunhat === 'CANGAY' ? cangay.push(6)  : nghi.push(6)
    values.caddy_id = this.state.caddy_id
    values.casang = casang
    values.cachieu = cachieu
    values.nghi = nghi
    values.cangay = cangay
    const lichcaddyRes = await add(values);
      if (lichcaddyRes) {
        message.success("Thêm dữ liệu thành công");
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
    const { _id, dsTrangThai, mode, value, selectedValue } = this.state;
    return (
      <div>
        {/*<Divider/>*/}
        <Tabs activeKey={this.state.activeTab } onChange={this.changeTab}>
          <TabPane tab="Danh sách lịch làm việc" key="1">
            <LichSuLichLamViec parentCallback={this.callbackFunction} caddy_id = {this.state.caddy_id}/>
          </TabPane>
          <TabPane tab="Cập nhật lịch" key="2">
            <ThemMoiLich caddy_id = {this.state.caddy_id} stt ={this.state.stt}/>
          </TabPane>
          <TabPane tab="Lịch trong tuần" key="3">
            <ChiTietLich caddy_id = {this.state.caddy_id}/>
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
