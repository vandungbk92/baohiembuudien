import {
  GET_SETTING,
  GET_SETTING_SUCCESS,
  GET_SETTING_ERROR
} from './constants';

function getReducer(state = [], action) {
  switch (action.type) {
    case GET_SETTING:
      return state;
    case GET_SETTING_SUCCESS:
      return action.data
    case GET_SETTING_ERROR:
      return state;
    default:
      return state;
  }
}

export default getReducer;
