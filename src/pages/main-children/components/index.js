import React from 'react';
import { connect } from 'dva';
import { Button, Modal, Table, message, Divider, Tabs, Spin } from 'antd';
import Search from './Search';
import ActionModal from './Modal';
import { checkError, delMore, checkEdit } from 'utils';
import Attchment from 'components/Attchment';


const confirm = Modal.confirm;
const { TabPane } = Tabs;


@connect((state) => ({
  operationZhuanjiaModel: state.operationZhuanjiaModel,
}))

class OperationZhuanjia extends React.Component {
  state = {
    selectedRowKeys: [], //
    selectedRowObj: [],
    loading: false,
    visible: false,
    rowId:'',
    modalDataObj: {}, //  弹框数据
  };

  componentDidMount() {
    this.getZhuanjiaData();
  }

  // 获取数据
  getZhuanjiaData = (payload) => {
    this.setState({ loading: true,rowId:'' });
    this.props.dispatch({
      type: 'operationZhuanjiaModel/getZhuanjia',
      payload,
      callback: (data) => {
        const { rows } = data;
        let stateTemp = { loading: false };
        if (rows.length > 0) {
          stateTemp.rowId = rows[0].id;
        }
        this.setState(stateTemp);
      },
    });
  };
  // 删除表格数据
  delZhuanjiaData = (payload) => {
    this.props.dispatch({
      type: 'operationZhuanjiaModel/delZhuanjia',
      payload: delMore(payload),
      callback: (value) => {
        if (checkError(value)) {
          this.getZhuanjiaData();
        }
      },
    });
  };

  //添加表格数据
  addZhuanjiaData = (payload, callClose) => {

    const { status, modalDataObj } = this.state;
    this.props.dispatch({
      type: 'operationZhuanjiaModel/addZhuanjia',
      payload: checkEdit(status, modalDataObj, payload),
      callback: (value) => {
        let isCloseStatus = false;
        if (checkError(value)) {
          this.getZhuanjiaData();
          this.onClickClose();
          isCloseStatus = true;
        }
        callClose(isCloseStatus);

      },
    });
  };

  // 搜索面板值
  onSearchPannel = (param) => {
    this.getZhuanjiaData({ ...param });
  };

  // 展示弹框
  onShowModal = (status, record) => {
    this.setState({ visible: true, status, modalDataObj: record });
  };

  // 修改分页
  onChangePage = (data) => {
    const { current, pageSize } = data;
    const param = {
      pageIndex: current,
      size: pageSize,
    };

    const searchObj = this.child.getSearchValue();
    // 获取分页数据
    this.getZhuanjiaData({ ...param, ...searchObj });
  };

  // 删除弹框确认
  showDelCon = () => {
    const _this = this;

    const { selectedRowObj } = this.state;
    if (selectedRowObj.length === 0) {
      message.warning('未选中数据');
      return;
    }
    confirm({
      title: '您确定要删除吗',
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        // 删除数据
        _this.delZhuanjiaData(selectedRowObj);
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
      fixed: 'left',
      width: 50,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: '姓名',
      dataIndex: 'mingcheng',
      key: 'mingcheng',
      width: 120,
    },
    {
      title: '职务',
      dataIndex: 'zhiwu',
      key: 'zhiwu',
      width: 120,
    },
    {
      title: '联系电话',
      dataIndex: 'dianhua',
      key: 'dianhua',
      width: 120,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 180,
    },
    {
      title: '备用电话',
      dataIndex: 'dianhua2',
      key: 'dianhua2',
      width: 120,
    },
    {
      title: '身份证号',
      dataIndex: 'shenfenzheng',
      key: 'shenfenzheng',
      width: 180,
    },
    {
      title: '工作单位',
      dataIndex: 'danwei',
      key: 'danwei',
      width: 120,
    },
    {
      title: '职称',
      dataIndex: 'zhicheng',
      key: 'zhicheng',
      width: 80,
    },
    {
      title: '最高学历',
      dataIndex: 'xueli',
      key: 'xueli',
      width: 120,
    },
    {
      title: '专业',
      dataIndex: 'zhuanye',
      key: 'zhuanye',
      width: 80,
    },
    {
      title: '研究方向',
      dataIndex: 'yanjiufangxiang',
      key: 'yanjiufangxiang',
      width: 120,
    },

    {
      title: '专家简介',
      dataIndex: 'jianjie',
      key: 'jianjie',
      width: 250,
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      width: 80,
      fixed: 'right',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <span>
           <a onClick={this.onShowModal.bind(this, 'edit', record)}>编辑</a>
          <Divider type="vertical"/>
          <a onClick={this.onShowModal.bind(this, 'desc', record)}>查看</a>

      </span>
      ),
    },
  ];

  // 关闭弹框
  onClickClose = () => {
    this.setState({ visible: false, status: 'add' });
  };
  // 单选框操作
  onSelectChange = (selectedRowKeys, selectedRowObj) => {
    this.setState({ selectedRowKeys, selectedRowObj });
  };
  // 展示弹框
  onShowModal = (status, record) => {
    this.setState({ visible: true, status, modalDataObj: record });
  };

  // 选中行
  onClickRow = (record, index) => {
    return {
      onClick: () => {
        this.setState({
          rowId: record.id,
          selectedRowObj: [record],
          modalDataObj:record
        });

      },
    };
  };


  setRowClassName = (record) => {
    return record.id === this.state.rowId ? 'clickRowStyl' : '';
  };


  render() {
    const { loading, visible, status, modalDataObj, rowId } = this.state;


    const { zhuanjiaData } = this.props.operationZhuanjiaModel;
    const { pageIndex, total, pageSize, rows } = zhuanjiaData;

    const textObj = ['已驳回', '未提交'];
    const actionState = textObj.includes(modalDataObj.state) ? false : true;

    return (
      <div>
        <Spin spinning={loading}>
          <Search
            onSearch={this.onSearchPannel}
            // 设置ref属性
            onRef={(ref) => {
              this.child = ref;
            }}
          />
          <div className="table-operations">
            <Button onClick={this.onShowModal.bind(this, 'add')}>添加</Button>
            <Button onClick={this.showDelCon}>删除</Button>
          </div>

          {/*弹框*/}
          <ActionModal
            visible={visible}
            onSave={this.addZhuanjiaData}
            status={status}
            onClose={this.onClickClose}
            basicData={status !== 'add' ? modalDataObj : {}}
          />

          <Table
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
            onChange={this.onChangePage}
            scroll={{ x: 'max-content' }}
            rowClassName={this.setRowClassName}
            onRow={this.onClickRow}
          />


          <Tabs
            defaultActiveKey="1"
            activeKey={'1'}
            // onTabClick={this.onTabClick}
            // tabPosition='bottom'
          >
            <TabPane tab="附件管理" key="1"/>
          </Tabs>

          <Attchment pid={rowId} actionStatus={actionState}/>
        </Spin>

      </div>
    );
  }
}

export default OperationZhuanjia;
