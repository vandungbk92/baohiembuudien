import { GET_DU_LIEU, GET_DU_LIEU_SUCCESS, GET_DU_LIEU_ERROR } from './constants';

export function getDuLieu() {
  return {
    type: GET_DU_LIEU
  };
}

export function getDuLieuSuccess(data) {
  return {
    type: GET_DU_LIEU_SUCCESS,
    data
  };
}

export function getDuLieuError(error) {
  return {
    type: GET_DU_LIEU_ERROR,
    error,
  };
}
