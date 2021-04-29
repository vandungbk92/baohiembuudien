import React from "react";
import { Menu, Tabs, Layout } from "antd";

import Basic from "./Basic";
import ThongTinUngDung from "./thongtinungdung";
import './thongtinchung.scss';

export default function Profile() {

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
        <Tabs.TabPane key="basic" tab="Cài đặt ứng dụng" className="pr-4">
          <Basic />
        </Tabs.TabPane>
        <Tabs.TabPane key="security" tab="Thông tin giới thiệu" className="pr-4">
          <ThongTinUngDung />
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}
