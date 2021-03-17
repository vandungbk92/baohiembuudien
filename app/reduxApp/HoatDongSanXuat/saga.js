import { call, put, select, takeLatest, takeLeading } from "redux-saga/effects";

import { getAll as getLoaiHoatDongAll } from "@services/danhmuc/loaihoatdongService";
import { getAll as getCongNgheSXAll } from "@services/danhmuc/congnghesanxuatService";
import { getAll as getHoaChatAll } from "@services/danhmuc/hoachatsudungService";
import { getAll as getNguyenVatLieuAll } from "@services/danhmuc/dmnguyenvatlieuService";
import { getAll as getSanPhamAll } from "@services/danhmuc/sanphamService";
import { getAll as getDonViAll } from "@services/danhmuc/donviService";
import { getAll as getNhienLieuAll } from "@services/danhmuc/nhienlieutieuthuService";
import { getAll as getAllThongTinHoatDong } from "@services/danhmuc/thongtinhoatdongService";



import {
  FETCH_SANPHAM,
  FETCH_LOAIHOATDONG,
  FETCH_NHIENLIEU,
  FETCH_CONGNGHESANXUAT,
  FETCH_NGUYENVATLIEU,
  FETCH_HOACHAT,
  FETCH_DONVI,
  FETCH_THONGTINHOATDONG,
} from './constants';
import {
  fetchSanPhamSuccess,
  fetchSanPhamError,
  fetchLoaiHoatDongSuccess,
  fetchLoaiHoatDongError,
  fetchCongNgheSanXuatSuccess,
  fetchCongNgheSanXuatError,
  fetchNguyenVatLieuSuccess,
  fetchNguyenVatLieuError,
  fetchHoaChatSuccess,
  fetchHoaChatError,
  fetchDonViSuccess,
  fetchDonViError,
  fetchNhienLieuError,
  fetchNhienLieuSuccess,
  fetchThongTinHoatDongSuccess,
  fetchThongTinHoatDongError
} from "./actions";
import { getAll } from '@services/danhmucloaiphieuService';

export function* fetchCongNgheSX() {
  try {
    const congnghesxRes = yield call(getCongNgheSXAll, 1, 0);
    if (congnghesxRes && congnghesxRes.docs) {
      yield put(fetchCongNgheSanXuatSuccess(congnghesxRes.docs));
    } else {
      yield put(fetchCongNgheSanXuatError());
    }
  } catch (error) {
    yield put(fetchCongNgheSanXuatError(error));
  }
}

export function* fetchSanPham() {
  try {
    const sanphamRes = yield call(getSanPhamAll, 1, 0);
    if (sanphamRes && sanphamRes.docs) {
      yield put(fetchSanPhamSuccess(sanphamRes.docs));
    } else {
      yield put(fetchSanPhamError());
    }
  } catch (error) {
    yield put(fetchSanPhamError(error));
  }
}

export function* fetchLoaiHoatDong() {
  try {
    const loaihoatdongRes = yield call(getLoaiHoatDongAll, 1, 0);
    if (loaihoatdongRes && loaihoatdongRes.docs) {
      yield put(fetchLoaiHoatDongSuccess(loaihoatdongRes.docs));
    } else {
      yield put(fetchLoaiHoatDongError());
    }
  } catch (error) {
    yield put(fetchLoaiHoatDongError(error));
  }
}

export function* fetchNhienLieu() {
  try {
    const nhienlieuRes = yield call(getNhienLieuAll, 1, 0);
    if (nhienlieuRes && nhienlieuRes.docs) {
      yield put(fetchNhienLieuSuccess(nhienlieuRes.docs));
    } else {
      yield put(fetchNhienLieuError());
    }
  } catch (error) {
    yield put(fetchNhienLieuError(error));
  }
}

export function* fetchDonVi() {
  try {
    const donviRes = yield call(getDonViAll, 1, 0);
    if (donviRes && donviRes.docs) {
      yield put(fetchDonViSuccess(donviRes.docs));
    } else {
      yield put(fetchDonViError());
    }
  } catch (error) {
    yield put(fetchDonViError(error));
  }
}

export function* fetchNguyenVatLieu() {
  try {
    const nguyenvatlieuRes = yield call(getNguyenVatLieuAll, 1, 0);
    if (nguyenvatlieuRes && nguyenvatlieuRes.docs) {
      yield put(fetchNguyenVatLieuSuccess(nguyenvatlieuRes.docs));
    } else {
      yield put(fetchNguyenVatLieuError());
    }
  } catch (error) {
    yield put(fetchNguyenVatLieuError(error));
  }
}

export function* fetchHoaChat() {
  try {
    const hoachatRes = yield call(getHoaChatAll, 1, 0);
    if (hoachatRes && hoachatRes.docs) {
      yield put(fetchHoaChatSuccess(hoachatRes.docs));
    } else {
      yield put(fetchHoaChatError());
    }
  } catch (error) {
    yield put(fetchHoaChatError(error));
  }
}

export function* fetchThongTinHoatDong() {
  try {
    const thongtinRes = yield call(() => getAllThongTinHoatDong());
    if (thongtinRes) {
      yield put(fetchThongTinHoatDongSuccess(thongtinRes));
    } else {
      yield put(fetchThongTinHoatDongError());
    }
  } catch (error) {
    yield put(fetchThongTinHoatDongError(error));
  }
}

export default function* hoatdongsanxuatSaga() {
  yield takeLeading(FETCH_HOACHAT, fetchHoaChat);
  yield takeLeading(FETCH_SANPHAM, fetchSanPham);
  yield takeLeading(FETCH_LOAIHOATDONG, fetchLoaiHoatDong);
  yield takeLeading(FETCH_CONGNGHESANXUAT, fetchCongNgheSX);
  yield takeLeading(FETCH_NGUYENVATLIEU, fetchNguyenVatLieu);
  yield takeLeading(FETCH_DONVI, fetchDonVi);
  yield takeLeading(FETCH_NHIENLIEU, fetchNhienLieu);
  yield takeLeading(FETCH_THONGTINHOATDONG, fetchThongTinHoatDong);
}
