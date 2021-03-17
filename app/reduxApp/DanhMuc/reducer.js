import produce from "immer";

import { FETCH_TINHTHANH_SUCCESS } from "./constants";

export const initialState = {
  tinhthanh: [],
};

const danhmucReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_TINHTHANH_SUCCESS:
        draft.tinhthanh = action.data;
        break;
    }
  });

export default danhmucReducer;
