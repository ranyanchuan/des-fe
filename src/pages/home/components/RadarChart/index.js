/* eslint-disable import/first */
import React from 'react';
import {connect} from 'dva';
import {Button, Modal, Table, Divider, Spin, Badge} from 'antd';
import {checkError, checkEdit, getPageParam, string2Moment} from 'utils';

const echarts = require('echarts');

import styles from './index.less';


@connect((state) => ({
  commonModel: state.commonModel,
}))

class Index extends React.Component {

  state = {
    loading: true,
  };

  componentDidMount() {
    this.initChart();
  }

  // componentWillReceiveProps(nextProps) {
  //   this.initChart();
  // }

  initChart = () => {
    let myChart = echarts.init(document.getElementById('radarChart'),'light');
    let option  = {
      title: {
        text: '基础雷达图'
      },
      tooltip: {},
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: '销售（sales）', max: 6500},
          { name: '管理（Administration）', max: 16000},
          { name: '信息技术（Information Techology）', max: 30000},
          { name: '客服（Customer Support）', max: 38000},
          { name: '研发（Development）', max: 52000},
          { name: '市场（Marketing）', max: 25000}
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: '预算分配（Allocated Budget）'
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: '实际开销（Actual Spending）'
          }
        ]
      }]
    };
    myChart.setOption(option);
  };


  render() {
    const {loading} = this.state;

    return (
      <div>
        {/*<Spin spinning={loading}>*/}
          {/*<div className="table-operations">*/}
          {/*<Button onClick={this.onShowModal.bind(this, 'add')}>编辑</Button>*/}
          {/*<Button onClick={this.onShowModal.bind(this, 'add')}>删除</Button>*/}
          {/*</div>*/}
          <div id="radarChart" className={styles.relationContent}></div>
        {/*</Spin>*/}
      </div>
    );
  }
}

export default Index;
