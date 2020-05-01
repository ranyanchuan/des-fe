import React from 'react';
import {connect} from 'dva';
import {Button, Modal, Table, Divider, Spin} from 'antd';
import {checkError, checkEdit, getPageParam} from 'utils';
import ActionModal from './Modal';
import moment from 'moment';
import router from "umi/router";

import Search from './Search';

const ruleDate = 'YYYY-MM-DD HH:mm:ss';
const confirm = Modal.confirm;
import styles from './index.less';



@connect((state) => ({
  homeModel: state.homeModel,
}))

class ProductApp extends React.Component {

  state = {
    loading: false,
    visible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
  };

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    if (userId) {
      this.getData();
    } else {
      router.push('/403');
    }

  }

  // 获取数据
  getData = (payload={}) => {
    this.setState({loading: true});
    const _this = this;
    this.props.dispatch({
      type: 'homeModel/getData',
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
      type: 'homeModel/delApp',
      payload,
      callback: (value) => {
        if (checkError(value)) {
          this.getData();
        }
      },
    });
  };

  //添加表格数据
  addData = (payload, callback) => {
    this.props.dispatch({
      type: 'homeModel/addData',
      payload,
      callback: (value) => {
        let temp = false;
        if (checkError(value)) {
          temp = true;
          this.getData();
        }
        callback(temp);
      },
    });
  };


  // 搜索面板值
  onSearchPannel = (param) => {
    this.getData({...param});
  };

  // 展示弹框
  onShowModal = (status, record) => {
    this.setState({visible: true, status, modalDataObj: record});
  };

  // 修改分页
  onChangePage = (data) => {
    const searchObj = this.child.getSearchValue();
    // 获取分页数据
    this.getData({...getPageParam(data), ...searchObj});
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
        return <a target="_blank" href={`http://127.0.0.1:8080/images/${text}`}>存证下载</a>
      },
    },

  ];

  // 关闭弹框
  onClickClose = () => {
    this.setState({visible: false, status: 'add'});
  };

  // 搜索面板值
  onSearchPannel = (param) => {
    this.getData({...param});
  };

  // 展示弹框
  onShowModal = (status, record) => {
    this.setState({visible: true, status, modalDataObj: record});
  };

  // 修改分页
  onChangePage = (data) => {
    const searchObj = this.child.getSearchValue();
    // 获取分页数据
    this.getBd_diquData({...getPageParam(data), ...searchObj});
  };


  render() {
    const {status, visible, modalDataObj} = this.state;

    const {appData} = this.props.homeModel;
    const {pageIndex, total, pageSize, rows} = appData;
    return (
      <div className={styles.home}>
        <Spin spinning={false}>

          <Search
            onSearch={this.onSearchPannel}
            onRef={(value) => this.childSearch = value}
          />
          <div className="table-operations">
            <Button type={"primary"} onClick={this.onShowModal.bind(this, 'add')}>添加</Button>
          </div>

          {/*添加表单*/}
          <ActionModal
            visible={visible}
            onSave={this.addData}
            status={status}
            onClose={this.onClickClose}
            basicData={status !== 'add' ? modalDataObj : {}}
          />

          <div style={{
            // background: '#f7f9fd'
          }}>
            <Table
              className={styles.table}
              rowKey={record => record.id.toString()}
              // rowSelection={rowSelection}
              columns={this.columns}
              size="small"
              dataSource={rows}
              pagination={{
                current: pageIndex,
                total,
                pageSize,
              }}
              // loading={loading}
              onChange={this.onChangePage}
            />
          </div>
        </Spin>
      </div>
    );
  }
}

export default ProductApp;
