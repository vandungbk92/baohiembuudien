import { all, call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { GET_DU_LIEU } from './constants';
import { getDuLieuSuccess, getDuLieuError } from './actions';
import { getAll } from '@services/danhmuc/tinhthanhService';

export function* getDanhSach() {
  const response = yield call(() => getAll(1, 0));
  if (response) {
    yield put(getDuLieuSuccess(response.docs));
  } else {
    yield put(getDuLieuError());
  }
}
export default function* sagaGetDuLieu() {
  yield takeLeading(GET_DU_LIEU, getDanhSach)
}
