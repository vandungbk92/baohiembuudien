import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useInjectSaga } from "@utils/injectSaga";
import { useInjectReducer } from "@utils/injectReducer";

import saga from "./saga";
import reducer from "./reducer";

import { fetchSanPham, fetchLoaiHoatDong,  fetchCongNgheSanXuat, fetchNguyenVatLieu, fetchHoaChat, fetchDonVi, fetchNhienLieu, fetchThongTinHoatDong } from "./actions";
import { selectHoaChat, selectLoaiHoatDong,  selectNguyenVatLieu, selectCongNgheSX, selectSanPham, selectDonVi , selectNhienLieu,
  getSelectHoatDongSanXuat } from "./selectors";

export function useHoatDongSanXuat() {

  useInjectReducer({ key: "hoatdongsanxuat", reducer });
  useInjectSaga({ key: "hoatdongsanxuat", saga });

  let hoatdongsanxuat = useSelector(getSelectHoatDongSanXuat());

  /*const sanpham = useSelector(selectSanPham);
  const donvi = useSelector(selectDonVi);
  const hoachat = useSelector(selectHoaChat);
  const nguyenvatlieu = useSelector(selectNguyenVatLieu);
  const congnghesanxuat = useSelector(selectCongNgheSX);
  const nhienlieu = useSelector(selectNhienLieu);*/

  let {nhienlieu,loaihoatdong, sanpham, hoachat, nguyenvatlieu, congnghesanxuat, donvi } = hoatdongsanxuat
  const dispatch = useDispatch();

  React.useEffect(() => {
    if(!nhienlieu.length && !loaihoatdong.length && !sanpham.length && !hoachat.length &&
      !nguyenvatlieu.length && !congnghesanxuat.length && !donvi.length){
      dispatch(fetchThongTinHoatDong());
    }
  }, []);
  return {nhienlieu,loaihoatdong, sanpham, hoachat, nguyenvatlieu, congnghesanxuat, donvi }
}

export function withHoatDongSX(WrappedComponent) {
  return function(props) {
    const {nhienlieu, sanpham, loaihoatdong, hoachat, nguyenvatlieu, congnghesanxuat, donvi } = useHoatDongSanXuat();
    return (
      <WrappedComponent
        {...props}
      />
    );
  };
}
