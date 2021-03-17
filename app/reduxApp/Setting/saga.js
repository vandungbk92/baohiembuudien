import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_SETTING } from './constants';
import { getSettingSuccess, getSettingError } from './actions';
import { getSetting } from '@services/settingService';

export function* getSettingDonViDieuTra() {
  const response = yield call(() => getSetting());
  if (response) {
    yield put(getSettingSuccess(response));
  } else {
    yield put(getSettingError());
  }
}
export default function* sagaGetSetting() {
  yield takeLatest(GET_SETTING, getSettingDonViDieuTra)
}
