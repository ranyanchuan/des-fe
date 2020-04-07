/* eslint-disable import/first */

import React from 'react';
import { Result, Icon } from 'antd';

class Great extends React.Component {
  render() {
    // 判断404
    return (
      <div style={{ marginTop: '120px' }}>
        <Result
          icon={<Icon type="smile" theme="twoTone"/>}
          title="Great, we have done all the operations!"
        />
      </div>
    );
  }
}

export default Great;
