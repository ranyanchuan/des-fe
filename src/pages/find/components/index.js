import React from 'react';
import {connect} from 'dva';
import {Input, Modal, Table, Divider, Spin} from 'antd';
import {checkError, checkEdit, getPageParam} from 'utils';


import ActionModal from './Modal';

import moment from 'moment';

const ruleDate = 'YYYY-MM-DD HH:mm:ss';
const confirm = Modal.confirm;
import styles from './index.less';


const {Search} = Input;

@connect((state) => ({
  productAppModel: state.productAppModel,
}))

class ProductApp extends React.Component {

  state = {
    loading: false,
    visible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
  };

  componentDidMount() {
    this.getAppData();
  }

  // 获取数据
  getAppData = (payload) => {
    this.setState({loading: true});
    const _this = this;
    this.props.dispatch({
      type: 'productAppModel/getApp',
      payload,
      callback: (data) => {
        let stateTemp = {loading: false};
        _this.setState(stateTemp);
      },
    });
  };


  // 删除表格数据
  delAppData = (payload) => {
    this.props.dispatch({
      type: 'productAppModel/delApp',
      payload,
      callback: (value) => {
        if (checkError(value)) {
          this.getAppData();
        }
      },
    });
  };

  //添加表格数据
  addAppData = (payload) => {
    this.onClickClose();
    const {status, modalDataObj} = this.state;

    this.props.dispatch({
      type: 'productAppModel/addApp',
      payload: checkEdit(status, modalDataObj, payload),
      callback: (value) => {
        if (checkError(value)) {
          this.getAppData();
        }
      },
    });
  };


  // 搜索面板值
  onSearchPannel = (param) => {
    this.getAppData({...param});
  };


  // 展示弹框
  onShowModal = (status, record) => {
    this.setState({visible: true, status, modalDataObj: record});
  };


  // 修改分页
  onChangePage = (data) => {
    const searchObj = this.child.getSearchValue();
    // 获取分页数据
    this.getAppData({...getPageParam(data), ...searchObj});
  };

  // 删除弹框确认
  showDelCon = (payload) => {
    const _this = this;
    confirm({
      title: '您确定要删除吗',
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        // 删除数据
        _this.delAppData(payload);
      },
      onCancel() {
        console.log('取消删除');
      },
    });
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
    {
      title: '存证人',
      dataIndex: 'cunzhengren',
      key: 'cunzhengren',
    },
    {
      title: '存证数量',
      dataIndex: 'cunzhengshuliang',
      key: 'cunzhengshuliang'
    },
    {
      title: '存证类型',
      dataIndex: 'cunzhengleixing',
      key: 'cunzhengleixing'
    },

    {
      title: '存证时间',
      dataIndex: 'cunzhengshijian',
      key: 'cunzhengshijian',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },

    {
      title: '区块高度',
      dataIndex: 'qukuaigaodu',
      key: 'qukuaigaodu',
    },
    {
      title: '存证哈希值',
      dataIndex: 'cunzhenghaxi',
      key: 'cunzhenghaxi',
    },

    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
           <a onClick={this.onShowModal.bind(this, 'edit', record)}>编辑</a>
           <Divider type="vertical"/>
           <a onClick={this.showDelCon.bind(this, record)}>删除</a>
       </span>
      ),
    },

  ];

  // 关闭弹框
  onClickClose = () => {
    this.setState({visible: false, status: 'add'});
  };

  render() {
    const {status, loading, selectedRowObj, visible, modalDataObj} = this.state;

    const {appData} = this.props.productAppModel;
    const {pageIndex, total, pageSize, rows} = appData;

    console.log("appData.rows",appData.rows,this.props.productAppModel);




    return (
      <div>
        {/*<Spin spinning={false}>*/}


        <div className={styles.find}>
          <div className={styles.content}>
            <div className={styles.total}>
              存证数量 『 664344 』
            </div>
            <Search
              placeholder="请输入存证人、存证号进行搜索"
              // enterButton="查询"
              size="large"
              style={{width: '500px'}}
              onSearch={value => console.log(value)}
            />
          </div>
        </div>


        <div style={{
          // background: '#f7f9fd'
        }}>
          <Table
            className={styles.table}
            rowKey={record => record.id.toString()}
            // rowSelection={rowSelection}
            columns={this.columns}
            size="small"
            dataSource={appData.rows}
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
