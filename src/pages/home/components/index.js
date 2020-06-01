import React from 'react';
import {connect} from 'dva';
import {Table, Spin, message} from 'antd';
import {checkError, checkEdit, getPageParam} from 'utils';
import ActionModal from './Modal';
import DModal from "./DModal";

import moment from 'moment';
import router from "umi/router";
import ConRadioGroup from "components/ConRadioGroup";

import Search from './Search';

const ruleDate = 'YYYY-MM-DD HH:mm:ss';
import styles from './index.less';


@connect((state) => ({
  homeModel: state.homeModel,
}))

class ProductApp extends React.Component {

  state = {
    loading: false,
    visible: false,
    dVisible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
    record: '', // 下载url
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
  getData = (payload = {}) => {
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
  onShowModal = () => {
    this.setState({visible: true, status: 'add'});
  };

  // 修改分页
  onChangePage = (data) => {
    const searchObj = this.child.getSearchValue();
    // 获取分页数据
    this.getData({...getPageParam(data), ...searchObj});
  };


  // 关闭弹框
  onClickClose = () => {
    this.setState({visible: false, status: 'add'});
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
      render: (text,record) => {
        return <a onClick={this.onClickConfirm.bind(this, record)}>存证下载</a>
      },
    },

  ];


  onClickConfirm = (param) => {
    this.setState({dVisible: true, record: param});
  }


  onClickCloseDown = () => {
    this.setState({dVisible: false,});
  }

  addDataDown = (data,callback) => {
    const {hash} = data;
    const {record} = this.state;
    if (hash === record.hash) {
      window.open(`http://127.0.0.1:8080/images/${record.fileUrl}`);
      callback(true);
    }else{
      message.error("hash 值不匹配");
      callback(false);
    }
  }




  render() {
    const {status, visible,dVisible, loading} = this.state;

    const {appData} = this.props.homeModel;
    const {pageNumber, total, pageSize, rows} = appData;
    return (
      <div className={styles.home}>
        <Spin spinning={loading}>

          <Search
            onSearch={this.onSearchPannel}
            onRef={(value) => this.child = value}
          />

          <ConRadioGroup
            defaultValue={'add'}
            onClickAdd={this.onShowModal}
          />

          {/*添加表单*/}
          <ActionModal
            visible={visible}
            onSave={this.addData}
            status={status}
            onClose={this.onClickClose}
            basicData={{}}
          />

          {/*添加表单*/}
          <DModal
            visible={dVisible}
            onSave={this.addDataDown}
            status={"add"}
            onClose={this.onClickCloseDown}
            basicData={{}}
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
                showSizeChanger: true,
                defaultPageSize: pageSize,
                pageSizeOptions: ['10', '20', '50', '100', '500'],
                current: pageNumber + 1,
                total,
                pageSize: pageSize,
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
