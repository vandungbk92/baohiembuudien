import React, { Component } from 'react';
import { Row, Col, Divider } from 'antd';
import QuyMoHoatDong from './QuyMoHoatDong/QuyMoHoatDong';
import LuongNuocSuDung from './LuongNuocSuDung/LuongNuocSuDung';
import ThongTinDuAn from './ThongTinDuAn/ThongTinDuAn';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { makeGetMyInfo } from '@containers/Layout/HeaderComponent/HeaderProvider/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withHoatDongSX } from '@reduxApp/HoatDongSanXuat/connect';
import NguyenVatLieu from './NguyenVatLieu/NguyenVatLieu';
import HoaChat from './HoaChat/HoaChat';
import NhienLieu from './NhienLieu/NhienLieu';
import QuyMoChanNuoi from './QuyMoChanNuoi/QuyMoChanNuoi';
import QuyMoBenhVien from './QuyMoBenhVien/QuyMoBenhVien';
import QuyMoHoatDongXuLy from './QuyMoHoatDongXuLy/QuyMoHoatDongXuLy';

class HoatDongDonVi extends Component {

  render() {
    let {loaiphieu_id} = this.props;
    if(!loaiphieu_id) return null;
    let hoatdongdonvi = loaiphieu_id.hoatdongdonvi
    return (
      <Row className="w-full" gutter={15}>
        <Col xs={24} lg={12}>
          {
            hoatdongdonvi.indexOf('QUYMOHOATDONG') !== -1 && <><QuyMoHoatDong/><Divider dashed/></>
          }
          {
            hoatdongdonvi.indexOf('QUYMOHOATDONGCOSOXULY') !== -1 && <><QuyMoHoatDongXuLy/><Divider dashed/></>
          }
          {
            hoatdongdonvi.indexOf('QUYMOCHANNUOI') !== -1 && <><QuyMoChanNuoi/><Divider dashed/></>
          }
          {
            hoatdongdonvi.indexOf('QUYMOBENHVIEN') !== -1 && <><QuyMoBenhVien/><Divider dashed/></>
          }

          {
            hoatdongdonvi.indexOf('NGUYENVATLIEU') !== -1 && <><NguyenVatLieu/><Divider dashed/></>
          }
        </Col>
        <Col xs={24} lg={12}>
          {
            hoatdongdonvi.indexOf('HOACHAT') !== -1 && <><HoaChat /><Divider dashed/></>
          }
          {
            hoatdongdonvi.indexOf('NHIENLIEUTIEUTHU') !== -1 && <><NhienLieu /><Divider dashed/></>
          }
        </Col>
        {
          hoatdongdonvi.indexOf('LUONGNUOC') !== -1 && <Col xs={24}><LuongNuocSuDung /></Col>
        }
        {
          hoatdongdonvi.indexOf('THONGTINDUAN') !== -1 && <Col xs={24}><ThongTinDuAn /></Col>
        }
      </Row>
      
    );
  }
}
const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
  myInfoResponse: makeGetMyInfo()
});
const withConnect = connect(mapStateToProps);
export default compose(withConnect, withHoatDongSX)(HoatDongDonVi);

