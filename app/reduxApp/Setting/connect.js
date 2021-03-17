import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInjectSaga } from "@utils/injectSaga";
import { useInjectReducer } from "@utils/injectReducer";
import { getSetting } from "./actions";
import { makeGetSetting } from "./selectors";

import saga from "./saga";
import reducer from "./reducer";

export function useSetting() {

  useInjectReducer({ key: "setting", reducer });
  useInjectSaga({ key: "setting", saga });

  const dispatch = useDispatch();
  
  const setting = useSelector(makeGetSetting());

  React.useEffect(() => {
    if (!setting || !setting.length) {
      dispatch(getSetting());
    }
  }, []);

  return setting;
}

export function withSetting(WrappedComponent) {
  return function(props) {
    const setting = useSetting();
    
    return (
      <WrappedComponent
        {...props}
        setting={setting}
      />
    );
  };
}
