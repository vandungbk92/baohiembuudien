import {
  FETCH_SANPHAM,
  FETCH_SANPHAM_SUCCESS,
  FETCH_SANPHAM_ERROR,

  FETCH_CONGNGHESANXUAT,
  FETCH_CONGNGHESANXUAT_SUCCESS,
  FETCH_CONGNGHESANXUAT_ERROR,

  FETCH_NGUYENVATLIEU,
  FETCH_NGUYENVATLIEU_SUCCESS,
  FETCH_NGUYENVATLIEU_ERROR,

  FETCH_HOACHAT,
  FETCH_HOACHAT_SUCCESS,
  FETCH_HOACHAT_ERROR,

  FETCH_DONVI,
  FETCH_DONVI_SUCCESS,
  FETCH_DONVI_ERROR,

  FETCH_NHIENLIEU,
  FETCH_NHIENLIEU_SUCCESS,
  FETCH_NHIENLIEU_ERROR,

  FETCH_THONGTINHOATDONG,
  FETCH_THONGTINHOATDONG_SUCCESS,
  FETCH_THONGTINHOATDONG_ERROR,

  FETCH_LOAIHOATDONG,
  FETCH_LOAIHOATDONG_SUCCESS,
  FETCH_LOAIHOATDONG_ERROR,
} from "./constants";

export function fetchThongTinHoatDong() {
  return {
    type: FETCH_THONGTINHOATDONG
  };
}

export function fetchThongTinHoatDongSuccess(data) {
  return {
    type: FETCH_THONGTINHOATDONG_SUCCESS,
    data
  };
}

export function fetchThongTinHoatDongError(error) {
  return {
    type: FETCH_THONGTINHOATDONG_ERROR,
    error
  };
}

export function fetchSanPham() {
  return {
    type: FETCH_SANPHAM
  };
}

export function fetchSanPhamSuccess(data) {
  return {
    type: FETCH_SANPHAM_SUCCESS,
    data
  };
}

export function fetchSanPhamError(error) {
  return {
    type: FETCH_SANPHAM_ERROR,
    error
  };
}

export function fetchNhienLieu() {
  return {
    type: FETCH_NHIENLIEU
  };
}

export function fetchNhienLieuSuccess(data) {
  return {
    type: FETCH_NHIENLIEU_SUCCESS,
    data
  };
}

export function fetchNhienLieuError(error) {
  return {
    type: FETCH_NHIENLIEU_ERROR,
    error
  };
}

export function fetchDonVi() {
  return {
    type: FETCH_DONVI
  };
}

export function fetchDonViSuccess(data) {
  return {
    type: FETCH_DONVI_SUCCESS,
    data
  };
}

export function fetchDonViError(error) {
  return {
    type: FETCH_DONVI_ERROR,
    error
  };
}

export function fetchCongNgheSanXuat() {
  return {
    type: FETCH_CONGNGHESANXUAT
  };
}

export function fetchCongNgheSanXuatSuccess(data) {
  return {
    type: FETCH_CONGNGHESANXUAT_SUCCESS,
    data
  };
}

export function fetchCongNgheSanXuatError(error) {
  return {
    type: FETCH_CONGNGHESANXUAT_ERROR,
    error
  };
}

export function fetchNguyenVatLieu() {
  return {
    type: FETCH_NGUYENVATLIEU
  };
}

export function fetchNguyenVatLieuSuccess(data) {
  return {
    type: FETCH_NGUYENVATLIEU_SUCCESS,
    data
  };
}

export function fetchNguyenVatLieuError(error) {
  return {
    type: FETCH_NGUYENVATLIEU_ERROR,
    error
  };
}

export function fetchHoaChat() {
  return {
    type: FETCH_HOACHAT
  };
}

export function fetchHoaChatSuccess(data) {
  return {
    type: FETCH_HOACHAT_SUCCESS,
    data
  };
}

export function fetchHoaChatError(error) {
  return {
    type: FETCH_HOACHAT_ERROR,
    error
  };
}

export function fetchLoaiHoatDong() {
  return {
    type: FETCH_LOAIHOATDONG
  };
}

export function fetchLoaiHoatDongSuccess(data) {
  return {
    type: FETCH_LOAIHOATDONG_SUCCESS,
    data
  };
}

export function fetchLoaiHoatDongError(error) {
  return {
    type: FETCH_LOAIHOATDONG_ERROR,
    error
  };
}