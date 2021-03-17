import { createSelector } from "reselect";

import { initialState } from "./reducer";

const selectHoatDongSanXuat = state => state.hoatdongsanxuat || initialState;

export const getSelectHoatDongSanXuat = () =>
  createSelector(selectHoatDongSanXuat, appState => {
    return appState
  });

export const selectHoaChat = createSelector(
  [selectHoatDongSanXuat],
  hoatdongsanxuatState => hoatdongsanxuatState.hoachat
);

export const selectNguyenVatLieu = createSelector(
  [selectHoatDongSanXuat],
  hoatdongsanxuatState => hoatdongsanxuatState.nguyenvatlieu
);

export const selectCongNgheSX = createSelector(
  [selectHoatDongSanXuat],
  hoatdongsanxuatState => hoatdongsanxuatState.congnghesanxuat
);

export const selectSanPham = createSelector(
  [selectHoatDongSanXuat],
  hoatdongsanxuatState => hoatdongsanxuatState.sanpham
);

export const selectDonVi = createSelector(
  [selectHoatDongSanXuat],
  hoatdongsanxuatState => hoatdongsanxuatState.donvi
);

export const selectNhienLieu = createSelector(
  [selectHoatDongSanXuat],
  hoatdongsanxuatState => hoatdongsanxuatState.nhienlieu
);

export const selectLoaiHoatDong = createSelector(
  [selectHoatDongSanXuat],
  hoatdongsanxuatState => hoatdongsanxuatState.loaihoatdong
);

