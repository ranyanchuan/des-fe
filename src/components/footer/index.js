/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import {  Icon, Input, Button,BackTop } from 'antd';
import styles from './index.less';
class Footer extends React.Component {
  render() {
    return (
      <div className={styles.footer}>
          <div className={styles.copyright}>
            Copyright @ 2019 All Rights Reserved.版权所有：客田镇TCL王牌专卖店
          </div>
      </div>
    );
  }
}
export default Footer;
