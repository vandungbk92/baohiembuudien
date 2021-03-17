import { GET_LOAI_PHIEU, GET_LOAI_PHIEU_SUCCESS, GET_LOAI_PHIEU_ERROR } from './constants';

export function getLoaiPhieu() {
  return {
    type: GET_LOAI_PHIEU
  };
}

export function getLoaiPhieuSuccess(data) {
  return {
    type: GET_LOAI_PHIEU_SUCCESS,
    data
  };
}

export function getLoaiPhieuError(error) {
  return {
    type: GET_LOAI_PHIEU_ERROR,
    error,
  };
}
