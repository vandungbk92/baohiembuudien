// khi gọi action thì sẽ tìm kiếm ở saga thực hiện các hàm gọi api

import { call, put, select, takeLatest } from "redux-saga/effects";

import { getAll as getAllTinThanh } from "@services/danhmuc/tinhthanhService";

import {  FETCH_TINHTHANH } from "./constants";
import {
  fetchTinhThanhSuccess,
  fetchTinhThanhError,
} from "./actions";


export function* fetchTinhThanh() {
  try {
    const tinhthanhRes = yield call(getAllTinThanh, 1, 0);
    if (tinhthanhRes && tinhthanhRes.docs) {
      yield put(fetchTinhThanhSuccess(tinhthanhRes.docs));
    } else {
      yield put(fetchTinhThanhError());
    }
  } catch (error) {
    yield put(fetchTinhThanhError(error));
  }
}

export default function* danhmucSaga() {
  yield takeLatest(FETCH_TINHTHANH, fetchTinhThanh);
}
