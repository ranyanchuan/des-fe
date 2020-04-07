import React from 'react';
import { Popover } from 'antd';

import styles from './index.less';

class ConTablePopover extends React.Component {
  render() {

    const { text, width = 200 } = this.props;

    let content = <div style={{ width }}>{text}</div>;
    let htmlContent = <div style={{ width }} className={styles.conTablePopover}>{text}</div>;

    return (
      <Popover
        content={content}
        trigger="hover">
        {htmlContent}
      </Popover>
    );
  }
}

export default ConTablePopover;
