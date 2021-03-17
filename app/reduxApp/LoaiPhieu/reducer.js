import {
  GET_LOAI_PHIEU,
  GET_LOAI_PHIEU_SUCCESS,
  GET_LOAI_PHIEU_ERROR
} from './constants';

function getReducer(state = [], action) {
  switch (action.type) {
    case GET_LOAI_PHIEU:
      return state;
    case GET_LOAI_PHIEU_SUCCESS:
      return action.data
    case GET_LOAI_PHIEU_ERROR:
      return state;
    default:
      return state;
  }
}

export default getReducer;
