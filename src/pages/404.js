/* eslint-disable import/first */

import React from 'react';

class Page404 extends React.Component {
  render() {
    // 判断404
    return (
      <Result
        status="404"
        title="404"
        subTitle="抱歉, 您访问的页面不存在"
        extra={<Button type="primary">&nbsp;&nbsp;返回&nbsp;&nbsp;</Button>}
      />
    );
  }
}

export default Page404;
