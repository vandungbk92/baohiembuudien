import { all, call, put, takeLeading } from 'redux-saga/effects';
import { GET_LOAI_PHIEU } from './constants';
import { getLoaiPhieuSuccess, getLoaiPhieuError } from './actions';
import { getAll } from '@services/danhmucloaiphieuService';

export function* getDanhSach() {
  const response = yield call(() => getAll(1, 0));
  if (response) {
    yield put(getLoaiPhieuSuccess(response.docs));
  } else {
    yield put(getLoaiPhieuError());
  }
}
export default function* sagaGetLoaiPhieu() {
  yield takeLeading(GET_LOAI_PHIEU, getDanhSach)
}
