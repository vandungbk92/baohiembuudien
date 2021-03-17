import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInjectSaga } from "@utils/injectSaga";
import { useInjectReducer } from "@utils/injectReducer";
import { getDuLieu } from "./actions";
import { makeGetDuLieu } from "./selectors";

import saga from "./saga";
import reducer from "./reducer";

export function useTinhThanh() {

  useInjectReducer({ key: "tinhthanh", reducer });
  useInjectSaga({ key: "tinhthanh", saga });

  const dispatch = useDispatch();
  
  const dulieu = useSelector(makeGetDuLieu());

  React.useEffect(() => {
    if (!dulieu || !dulieu.length) {
      dispatch(getDuLieu());
    }
  }, []);

  return dulieu;
}

export function withTinhThanh(WrappedComponent) {
  return function(props) {
    const tinhthanh = useTinhThanh();
    
    return (
      <WrappedComponent
        {...props}
        tinhthanh={tinhthanh}
      />
    );
  };
}
