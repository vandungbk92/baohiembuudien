import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInjectSaga } from "@utils/injectSaga";
import { useInjectReducer } from "@utils/injectReducer";
import { getLoaiPhieu } from "./actions";
import { makeGetLoaiPhieu } from "./selectors";

import saga from "./saga";
import reducer from "./reducer";

export function useLoaiPhieu() {

  useInjectReducer({ key: "loaiphieu", reducer });
  useInjectSaga({ key: "loaiphieu", saga });

  const dispatch = useDispatch();
  
  const loaiphieu = useSelector(makeGetLoaiPhieu());

  React.useEffect(() => {
    if (!loaiphieu || !loaiphieu.length) {
      dispatch(getLoaiPhieu());
    }
  }, []);

  return loaiphieu;
}

export function withLoaiPhieu(WrappedComponent) {
  return function(props) {
    const loaiphieu = useLoaiPhieu();
    
    return (
      <WrappedComponent
        {...props}
        loaiphieu={loaiphieu}
      />
    );
  };
}
