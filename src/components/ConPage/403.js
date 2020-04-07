/* eslint-disable import/first */

import React from 'react';
import { Button,Result } from 'antd';
class LayoutSystem extends React.Component {
  render() {
    // 判断404
    return (
        <Result
          status="403"
          title="403"
          subTitle="抱歉, 您没有权限访问改页面"
          extra={<Button type="primary">&nbsp;&nbsp;返回&nbsp;&nbsp;</Button>}
        />
    );
  }
}

export default LayoutSystem;
