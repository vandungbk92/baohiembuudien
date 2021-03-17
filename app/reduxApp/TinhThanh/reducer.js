import {
  GET_DU_LIEU,
  GET_DU_LIEU_SUCCESS,
  GET_DU_LIEU_ERROR
} from './constants';

function getReducer(state = [], action) {
  switch (action.type) {
    case GET_DU_LIEU:
      return state;
    case GET_DU_LIEU_SUCCESS:
      return action.data
    case GET_DU_LIEU_ERROR:
      return state;
    default:
      return state;
  }
}

export default getReducer;
