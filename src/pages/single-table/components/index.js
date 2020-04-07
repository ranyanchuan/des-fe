import React from 'react';
import { connect } from 'dva';
import { Button, Modal, Table, Divider, Spin } from 'antd';
import { checkError, checkEdit, getPageParam } from 'utils';

import Search from './Search';
import ActionModal from './Modal';

import moment from 'moment';

const ruleDate = 'YYYY-MM-DD HH:mm:ss';
const confirm = Modal.confirm;


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
    this.setState({ loading: true });
    const _this = this;
    this.props.dispatch({
      type: 'productAppModel/getApp',
      payload,
      callback: (data) => {
        let stateTemp = { loading: false };
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
    const { status, modalDataObj } = this.state;

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
    this.getAppData({ ...param });
  };


  // 展示弹框
  onShowModal = (status, record) => {
    this.setState({ visible: true, status, modalDataObj: record });
  };


  // 修改分页
  onChangePage = (data) => {
    const searchObj = this.child.getSearchValue();
    // 获取分页数据
    this.getAppData({ ...getPageParam(data), ...searchObj });
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
      title: '版本号',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (text, record, index) => {
        return text ? <a href={text} target="_blank">下载地址</a> : null;
      },
    },
    {
      title: 'APP类型 ',
      dataIndex: 'type',
      key: 'type',
      render: (text) => {
        const statusObj = {
          '0': 'IOS',
          '1': 'ANDROID',
        };
        return text ? statusObj[text.toString()] : text;
      },

    },
    {
      title: '强制更新',
      dataIndex: 'isupdate',
      key: 'isupdate',
      render: (text) => {
        const statusObj = {
          '0': '否',
          '1': '是',
        };
        return text ? statusObj[text.toString()] : text;
      },
    },

    {
      title: '添加时间',
      dataIndex: 'createtime',
      key: 'createtime',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },

    {
      title: '操作人',
      dataIndex: 'creatorname',
      key: 'creatorname',
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
    this.setState({ visible: false, status: 'add' });
  };

  render() {
    const { status, loading, selectedRowObj, visible, modalDataObj } = this.state;

    const { appData } = this.props.productAppModel;
    const {pageIndex, total, pageSize, rows}=appData;


    return (
      <div>
        <Spin spinning={false}>
        <Search
          onSearch={this.onSearchPannel}
          // 设置ref属性
          onRef={(ref) => {
            this.child = ref;
          }}
        />
        <div className="table-operations">
          <Button onClick={this.onShowModal.bind(this, 'add')}>添加</Button>
        </div>

        {/*弹框*/}
        <ActionModal
          visible={visible}
          onSave={this.addAppData}
          status={status}
          onClose={this.onClickClose}
          basicData={status !== 'add' ? modalDataObj : {}}
        />

        <Table
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
        </Spin>
      </div>
    );
  }
}
export default ProductApp;
