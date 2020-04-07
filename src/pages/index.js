/* eslint-disable import/first */

import React from 'react';
import { Icon, Result } from 'antd';

class Home extends React.Component {

  state = {

  };

  render() {
    // 判断404
    return (
      <Result
        style={{ paddingTop: 100,backgroundColor: '#fff' }}
        icon={<Icon type="smile" theme="twoTone"/>}
        title="Great, we have done all the operations!"
      />

    );
  }
}

export default Home;
