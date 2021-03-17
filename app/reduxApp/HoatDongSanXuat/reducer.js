import produce from "immer";

import { FETCH_SANPHAM_SUCCESS, FETCH_LOAIHOATDONG_SUCCESS, FETCH_THONGTINHOATDONG_SUCCESS, FETCH_NHIENLIEU_SUCCESS,  FETCH_DONVI_SUCCESS, FETCH_CONGNGHESANXUAT_SUCCESS, FETCH_NGUYENVATLIEU_SUCCESS, FETCH_HOACHAT_SUCCESS } from "./constants";

export const initialState = {
  sanpham: [],
  congnghesanxuat: [],
  nguyenvatlieu: [],
  hoachat: [],
  donvi: [],
  nhienlieu: [],
  loaihoatdong :[]
};

const hoatdongsanxuatReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_THONGTINHOATDONG_SUCCESS:
        Object.assign(draft, action.data);
        /*draft.sanpham = action.data.sanpham
        draft.congnghesanxuat = action.data.congnghesanxuat
        draft.donvi = action.data.donvi
        draft.nguyenvatlieu = action.data.nguyenvatlieu
        draft.hoachat = action.data.hoachat
        draft.nhienlieu = action.data.nhienlieu*/
        break;
      case FETCH_SANPHAM_SUCCESS:
        draft.sanpham = action.data;
        break;
      case FETCH_CONGNGHESANXUAT_SUCCESS:
        draft.congnghesanxuat = action.data;
        break;
      case FETCH_DONVI_SUCCESS:
        draft.donvi = action.data;
        break;
      case FETCH_NGUYENVATLIEU_SUCCESS:
        draft.nguyenvatlieu = action.data;
        break;
      case FETCH_HOACHAT_SUCCESS:
        draft.hoachat = action.data;
        break;
      case FETCH_NHIENLIEU_SUCCESS:
        draft.nhienlieu = action.data;
        break;
      case FETCH_LOAIHOATDONG_SUCCESS:
        draft.loaihoatdong = action.data;
        break;
    }
  });
export default hoatdongsanxuatReducer;
