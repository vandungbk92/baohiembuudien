import React from "react";
import { Menu, Tabs, Layout } from "antd";

import saga from "@containers/Layout/HeaderComponent/HeaderProvider/saga";
import reducer from "@containers/Layout/HeaderComponent/HeaderProvider/reducer";

import { useInjectSaga } from "@utils/injectSaga";
import { useInjectReducer } from "@utils/injectReducer";

import DonViDieuTra from "./DonViDieuTra";
import Security from "./Security";
import DownloadFile from "./DownloadFile";

export default function Setting() {
  useInjectReducer({ key: "HeaderComponent", reducer });
  useInjectSaga({ key: "HeaderComponent", saga });

  return (
    <Layout className="py-2 bg-white">
      <Tabs
        tabPosition="left"
        renderTabBar={({ panes, activeKey, onTabClick }) => (
          <Menu
            mode="inline"
            style={{ width: 250 }}
            onSelect={({ key, domEvent }) => onTabClick(key, domEvent)}
            defaultSelectedKeys={[activeKey]}
          >
            {panes.map(({ key, props: { tab } }) => (
              <Menu.Item key={key}>{tab}</Menu.Item>
            ))}
          </Menu>
        )}
      >
        {/*<Tabs.TabPane key="security1" tab="DownloadFile" className="pr-4">
          <DownloadFile />
        </Tabs.TabPane>*/}
        <Tabs.TabPane key="basic" tab=" Đại chỉ sân golf" className="pr-4">
          <DonViDieuTra />
        </Tabs.TabPane>
        <Tabs.TabPane key="security" tab="Cài đặt bảo mật" className="pr-4">
          <Security />
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}
