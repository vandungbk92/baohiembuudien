import { GET_SETTING, GET_SETTING_SUCCESS, GET_SETTING_ERROR } from './constants';

export function getSetting() {
  return {
    type: GET_SETTING
  };
}

export function getSettingSuccess(data) {
  return {
    type: GET_SETTING_SUCCESS,
    data
  };
}

export function getSettingError(error) {
  return {
    type: GET_SETTING_ERROR,
    error,
  };
}
