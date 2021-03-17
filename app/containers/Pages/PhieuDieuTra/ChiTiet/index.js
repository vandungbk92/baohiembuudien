import React, { Component, Fragment } from 'react';
import {
  Tabs,
  Col,
  Row,
  message,
  Button
} from 'antd';
import { DownloadOutlined} from '@ant-design/icons';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import { makeGetMyInfo } from '../../../Layout/HeaderComponent/HeaderProvider/selectors';
import Box from '@containers/Box';
import { withLoaiPhieu } from '@reduxApp/LoaiPhieu/connect';
import DonViDuocDieuTra from './DonViDuocDieuTra' ;
import ThongTinChatThai from './ThongTinChatThai/ThongTinChatThai';
import HoatDongDonVi from '../HoatDongDonVi' ;
import { getById } from '@services/phieudieutra/phieudieutraService';
import { getDataPhieu } from '@services/phieudieutra/inphieuService';
import HoSoMoiTruong from '../ThongTinThuTuc/HoSoMoiTruong/HoSoMoiTruong' ;
import KetLuanThanhTra from '../ThongTinThuTuc/KetLuanThanhTra/Loadable' ;
import { makeGetSetting } from '@reduxApp/Setting/selectors';
import { getAllQuanHuyenById } from '@services/danhmuc/tinhthanhService';
import {generateDocument} from './TaiPhieu/TaiPhieu'

const { TabPane } = Tabs;

class PhieuDieuTraChiTiet extends Component {
  constructor(props) {
    super(props);
    let {loaiphieu, match} = props;
    let loaiphieu_id = null;
    let _id = match.params.id
    if(!_id){
      loaiphieu.forEach(curr => {
        if(curr.link + '/add' === match.url){
          loaiphieu_id = {
            _id: curr._id,
            tenphieu: curr.tenphieu,
            mota: curr.mota,
            maphieu: curr.maphieu,
            thongtindonvi: curr.thongtindonvi,
            thongtinchatthai: curr.thongtinchatthai,
            hoatdongdonvi: curr.hoatdongdonvi,
            label_hoatdong: curr.label_hoatdong,
            ketluanthanhtra: curr.ketluanthanhtra,
          }
        }
      })
    }
    this.state = {
      activeKey: "1",
      _id,
      loaiphieu_id: loaiphieu_id,
      quanhuyen: []
    };
  }

  async componentDidMount() {
    try {
      if(this.state._id){
        let phieudieutra = await getById(this.state._id);
        if(phieudieutra){
          this.setState({loaiphieu_id: phieudieutra.loaiphieu_id, donviduocdieutra: phieudieutra,})
        }
      }
      let {setting} = this.props;
      if(setting.tinhdieutra_id){
        const quanhuyen = await getAllQuanHuyenById(setting.tinhdieutra_id);
        this.setState({quanhuyen})
      }
    } catch (e) {
      console.log(e);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    let {loaiphieu, match} = this.props;
    if(loaiphieu !== prevProps.loaiphieu && !match.params.id){
      let loaiphieu_id = null
      loaiphieu.forEach(curr => {
        if(curr.link + '/add' === match.url){
          loaiphieu_id = {
            _id: curr._id,
            tenphieu: curr.tenphieu,
            mota: curr.mota,
            maphieu: curr.maphieu,
            thongtindonvi: curr.thongtindonvi,
            thongtinchatthai: curr.thongtinchatthai,
            hoatdongdonvi: curr.hoatdongdonvi,
            label_hoatdong: curr.label_hoatdong,
            ketluanthanhtra: curr.ketluanthanhtra,
          }
        }
      })

      this.setState({loaiphieu_id})
    }
  }

  downloadPhieu = async () => {
    let {_id, loaiphieu_id} = this.state
    let apiRes = await getDataPhieu(_id)
    if(apiRes){
      generateDocument(apiRes,loaiphieu_id)
    }
  }

  onChangeTabs = (activeKey) => {
    if(this.state._id){
      this.setState({ activeKey });
    }else{
      message.warning('Vui lòng lưu dữ liệu đơn vị được điều tra');
    }
  };

  render() {
    const { loading } = this.props;
    let {loaiphieu_id} = this.state;
    if(!loaiphieu_id) return null;
    return <Box title='LOẠI PHIẾU'
    boxActions={ this.state._id ? <Button onClick={this.downloadPhieu} icon={<DownloadOutlined/>} size='small'
                                 type="primary">Tải phiếu</Button> : ''}>
      <Row>
        <Col sm={24}>Tên phiếu: <i>{this.state.loaiphieu_id?.tenphieu}</i></Col>
      </Row>
      <Row gutter={10}>
        <Tabs type='card' size='small' activeKey={this.state.activeKey} onChange={this.onChangeTabs} className="w-full">
          <TabPane tab="A. Thông tin đơn vị được điều tra" key="1">
            <DonViDuocDieuTra loaiphieu_id={loaiphieu_id} _id={this.state._id} donviduocdieutra={this.state.donviduocdieutra}/>
          </TabPane>
          <TabPane tab={loaiphieu_id.label_hoatdong} key="2">
            <HoatDongDonVi loaiphieu_id={loaiphieu_id}/>
          </TabPane>
          <TabPane tab="C. Thông tin chất thải" key="3">
            <ThongTinChatThai loaiphieu_id={loaiphieu_id} quanhuyen={this.state.quanhuyen}/>
          </TabPane>
          <TabPane tab="D. Thông tin thủ tục hành chính" key="4">
            <HoSoMoiTruong/>
            <KetLuanThanhTra loaiphieu_id={loaiphieu_id}/>
          </TabPane>
        </Tabs>
      </Row>
    </Box>;
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
  myInfoResponse: makeGetMyInfo(),
  setting: makeGetSetting()
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, withLoaiPhieu)(PhieuDieuTraChiTiet);
