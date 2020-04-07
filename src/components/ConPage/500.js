/* eslint-disable import/first */

import React from 'react';
import { Button, Input, Layout, Menu, Icon, Result } from 'antd';
import Header from 'components/header/';
import Footer from 'components/footer';
import styles from './index.less';
import router from 'umi/router';

class LayoutSystem extends React.Component {

  state = {};

  render() {
    // 判断404
    return (

      <Result
        status="500"
        title="500"
        subTitle="抱歉, 服务端出错"
        extra={<Button type="primary">&nbsp;&nbsp;返回&nbsp;&nbsp;</Button>}
      />
    );
  }
}

export default LayoutSystem;
