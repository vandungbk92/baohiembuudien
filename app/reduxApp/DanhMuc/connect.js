import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useInjectSaga } from "@utils/injectSaga";
import { useInjectReducer } from "@utils/injectReducer";

import saga from "./saga";
import reducer from "./reducer";

import { fetchTinhThanh } from "./actions";
import { selectTinhThanh } from "./selectors";

export function useDanhMuc() {
  useInjectReducer({ key: "danhmuc", reducer });
  useInjectSaga({ key: "danhmuc", saga });

  const tinhthanh = useSelector(selectTinhThanh);

  const dispatch = useDispatch();


  React.useEffect(() => {
    if (!tinhthanh || !tinhthanh.length) {
      dispatch(fetchTinhThanh());
    }
  }, []);

  return { tinhthanh };
}

export function withDanhMuc(WrappedComponent) {
  return function(props) {
    const { tinhthanh } = useDanhMuc();
    
    return (
      <WrappedComponent
        {...props}
        tinhthanh={tinhthanh}
      />
    );
  };
}
