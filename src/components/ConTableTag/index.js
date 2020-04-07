import React from 'react';
import {Tag} from 'antd';

import styles from './index.less';

class ConTableTag extends React.Component {
  render() {
    const {data = ''} = this.props;
    return (
      <span>
       {data.split(',').map((item) => {
         return <Tag>{item}</Tag>
       })}
     </span>
    );
  }
}

export default ConTableTag;
