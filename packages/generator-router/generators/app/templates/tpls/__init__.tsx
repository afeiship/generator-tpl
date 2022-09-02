import { Breadcrumb } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default () => {
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Options</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Outlet />
      </div>
    </>
  );
};
