import React from 'react';
import {connect} from 'dva';
import {Input, Table} from 'antd';
import {checkError, checkEdit, getPageParam} from 'utils';
import moment from 'moment';

const ruleDate = 'YYYY-MM-DD HH:mm:ss';
import styles from './index.less';


const {Search} = Input;

@connect((state) => ({
  findModel: state.findModel,
}))

class ProductApp extends React.Component {

  state = {
    loading: false,
    visible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
  };

  componentDidMount() {
    this.getBlockData();
  }

  // 获取数据
  getBlockData = (payload) => {
    this.setState({loading: true});
    const _this = this;
    this.props.dispatch({
      type: 'findModel/getData',
      payload,
      callback: (data) => {
        let stateTemp = {loading: false};
        _this.setState(stateTemp);
      },
    });
  };


  // 搜索面板值
  onSearchPannel = (param) => {
    this.getBlockData({...param});
  };




  // 修改分页
  onChangePage = (data) => {
    const searchObj = this.child.getSearchValue();
    // 获取分页数据
    this.getBlockData({...getPageParam(data), ...searchObj});
  };



  columns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
      render: (text, record, index) => {
        return index + 1;
      },
    },
    // {
    //   title: '存证人',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: '存证人',
      dataIndex: 'userName',
      key: 'userName',
    },

    // {
    //   title: '存证数量',
    //   dataIndex: 'cunzhengshuliang',
    //   key: 'cunzhengshuliang'
    // },

    {
      title: '存证类型',
      dataIndex: 'category',
      key: 'category'
    },

    {
      title: '存证时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },

    {
      title: '区块高度',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: '存证哈希值',
      dataIndex: 'hash',
      key: 'hash',
    },

    {
      title: '文件',
      dataIndex: 'fileUrl',
      key: 'fileUrl',
      render: (text) => {
        return <a href="http://www.baidu.com">存证下载</a>
      },
    },

    // {
    //   title: '操作',
    //   dataIndex: 'action',
    //   key: 'action',
    //   render: (text, record) => (
    //     <span>
    //        <a onClick={this.onShowModal.bind(this, 'edit', record)}>查看</a>
    //       {/*<Divider type="vertical"/>*/}
    //       {/*<a onClick={this.showDelCon.bind(this, record)}>删除</a>*/}
    //    </span>
    //   ),
    // },

  ];



  render() {

    const {blockData} = this.props.findModel;
    const {pageIndex, total, pageSize} = blockData;



    return (
      <div>
        {/*<Spin spinning={false}>*/}
        <div className={styles.find}>
          <div className={styles.content}>
            <div className={styles.total}>
              存证数量 『 664344 』
            </div>

            <Search
              placeholder="请输入存证人进行搜索"
              // enterButton="查询"
              size="large"
              style={{width: '500px'}}
              onSearch={this.onSearchPannel}
            />
          </div>
        </div>


        <div style={{
          // background: '#f7f9fd'
        }}>
          <Table
            className={styles.table}
            rowKey={record => record.id.toString()}
            columns={this.columns}
            size="small"
            dataSource={blockData.rows}
            pagination={{
              current: pageIndex,
              total,
              pageSize,
            }}
            // loading={loading}
            onChange={this.onChangePage}
          />
        </div>
        {/*</Spin>*/}
      </div>
    );
  }
}

export default ProductApp;
