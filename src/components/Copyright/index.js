import React from 'react';
import { Icon } from 'antd';

import styles from './index.less';


class Copyright extends React.Component {
  render() {
    return (
      <div className={styles.copyright}>
        <div className={styles.companyInfo}>
          <h5><Icon type="bank"/><span>公司名称</span></h5>
          <h5><Icon type="phone"/><span>400-XXXX-XXXX</span></h5>
          <h5><Icon type="mail"/><span>400-XXXX-XXXX</span></h5>
          <h5><Icon type="environment"/><span>XX省XXX市XXX路XX号XXX</span></h5>
        </div>
        <p>Copyright © 2019 北京IUAP有限公司 版权所有</p>
      </div>
    );
  }
}

export default Copyright;
