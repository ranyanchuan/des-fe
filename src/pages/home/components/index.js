/* eslint-disable import/first */

import React from 'react';
import {Icon, Result} from 'antd';
import BarChart from './BarChart';
import RadarChart from './RadarChart';
import ScatterChart from './ScatterChart';
import styles from './index.less';


class Home extends React.Component {

  state = {};


// {/*<Result*/}
// {/*style={{ paddingTop: 100,backgroundColor: '#fff' }}*/}
// {/*icon={<Icon type="smile" theme="twoTone"/>}*/}
// {/*title="Great, we have done all the operations!"*/}
// {/*/>*/}
  render() {
    // 判断404
    return (
      <div className={styles.home}>
        <div className={styles.bar}>
          <BarChart/>
        </div>
        <div className={styles.chart}>
          <ScatterChart/>
        </div>
      </div>

    );
  }
}

export default Home;
