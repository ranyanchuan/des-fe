import React from 'react';
import { connect } from 'dva';

import { Form, Modal, Row, Col, Table, Button, Divider, message, Spin } from 'antd';
import { checkError, delMore, checkEdit, downloadFile,converFileSize } from 'utils';

import ConInput from 'components/ConInput';
import ConUploadOne from 'components/ConUploadOne';

import styles from './index.less';


import { footer } from 'utils';

const titleObj = {
  add: '添加文件信息',
  edit: '编辑文件信息',
};
const confirm = Modal.confirm;


@Form.create()
@connect((state) => ({
  commonModel: state.commonModel,
}))

class Attchment extends React.Component {

  state = {
    visible: false,
    pid: null,
    modalDataObj: {},
    confirmLoading: false,
  };

  componentDidMount() {
    const { pid } = this.props;
    if (pid) {
      this.setState({ pid });
      this.getAttchmentData({ pid });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { pid } = nextProps;
    if (pid !== this.props.pid) {
      this.setState({ pid });
      this.getAttchmentData({ pid });
    }
  }


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
      title: '附件名称',
      dataIndex: 'filename',
      key: 'filename',
    },
    {
      title: '文件类型',
      dataIndex: 'leixing',
      key: 'leixing',
    },
    {
      title: '文件大小',
      dataIndex: 'filesize',
      key: 'filesize',
    },
    {
      title: '上传人',
      dataIndex: 'creatorname',
      key: 'creatorname',
    },
    {
      title: '上传时间',
      dataIndex: 'createtime',
      key: 'createtime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        const { actionStatus } = this.props;
        const active = (<span>
           <a onClick={this.onShowModal.bind(this, 'edit', record)}>编辑</a>
           <Divider type="vertical"/>
           <a onClick={() => {
             downloadFile(record.filename, record.filepath);
           }}>下载</a>
          </span>);
        const defaultVal = (
          <span>
            <span>编辑</span>
            <Divider type="vertical"/>
           <a onClick={() => {
             downloadFile(record.filename, record.filepath);
           }}>下载</a>
          </span>
        );
        return actionStatus ? defaultVal : active;
      },
    },
  ];

  //  关闭添加信息弹框
  hideModal = () => {
    this.props.form.resetFields();
    this.setState({ visible: false });
  };

  // 展示弹框
  onShowModal = (status, record) => {
    this.setState({ visible: true, status, modalDataObj: record });
  };

  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {

        const { filepath, pid } = this.state;
        fieldsValue.filepath = filepath;
        fieldsValue.pid = pid;
        this.addAttchment(fieldsValue);
      }
    });
  };

  //添加表格数据
  addAttchment = (payload) => {
    const { status, modalDataObj } = this.state;
    this.setState({ confirmLoading: true });
    this.props.dispatch({
      type: 'commonModel/addAttchment',
      payload: checkEdit(status, modalDataObj, payload),
      callback: (value) => {
        this.setState({ confirmLoading: false });
        if (checkError(value)) {
          this.hideModal();
          this.getAttchmentData({pid: this.props.pid});
        }
      },
    });
  };


  // 获取数据
  getAttchmentData = (payload = {}) => {
    this.setState({ loading: true });

    this.props.dispatch({
      type: 'commonModel/getAttchment',
      payload,
      callback: (data) => {
        let stateTemp = { loading: false };
        this.setState(stateTemp);
      },
    });
  };


  // 删除表格数据
  delAttchmentData = (payload) => {
    this.props.dispatch({
      type: 'commonModel/delAttchment',
      payload: delMore(payload),
      callback: (value) => {
        if (checkError(value)) {
          this.getAttchmentData({pid: this.props.pid});
        }
      },
    });
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
        _this.delAttchmentData(selectedRowObj);
      },
      onCancel() {
        console.log('取消删除');
      },
    });
  };


  // 单选框操作
  onSelectChange = (selectedRowKeys, selectedRowObj) => {
    this.setState({ selectedRowKeys, selectedRowObj });
  };


  // 修改分页
  onChangePage = (data) => {
    const { current, pageSize } = data;
    const param = {
      pageIndex: current,
      size: pageSize,
    };

    // 获取分页数据
    this.getAttchmentData({ ...param});
  };

  render() {
    const { form, actionStatus } = this.props;
    const { loading, visible, status, modalDataObj, confirmLoading } = this.state;

    const { fileData } = this.props.commonModel;
    const { pageIndex, total, pageSize, rows } = fileData;

    const rowSelection = {
      onChange: this.onSelectChange,
    };

    const formItemLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 18 } },
    };


    const disabled = (status === 'desc') ? true : false;


    return (
      <div className={styles.attchment}>

        <div className="table-operations">
          <Button disabled={actionStatus} onClick={this.onShowModal.bind(this, 'add')}>添加</Button>
          <Button onClick={this.showDelCon} disabled={actionStatus || !(rows && rows.length > 0)}>删除</Button>
        </div>

        {/*<div className="child-table">*/}
        <Table
          rowKey={record => record.id.toString()}
          rowSelection={rowSelection}
          columns={this.columns}
          size="small"
          dataSource={rows}
          pagination={{
            current: pageIndex,
            total,
            pageSize,
          }}
          loading={loading}
          onChange={this.onChangePage}
          // scroll={{ x: 1700 }}
        />
        {/*</div>*/}


        <Modal
          title={titleObj[status]}
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          confirmLoading={confirmLoading}
          maskClosable={false}
          bodyStyle={{ paddingBottom: 0 }}
          okText="确认" cancelText="取消"
          {...footer(disabled)}
          width="400px"
        >
          <Spin spinning={false}>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col span={24}>
                  <ConUploadOne
                    title="上传文件"
                    formItemLayout={formItemLayout}
                    imageUrl={modalDataObj.filepath}
                    disabled={disabled}
                    required={true}
                    label="文件"
                    updatePicture={(filepath, info) => {
                      const { name, size } = info;
                      this.props.form.setFieldsValue({
                        leixing: name.split('.')[1],
                        filename: name.split('.')[0],
                        filesize: converFileSize(size),
                      });
                      this.setState({ filepath });
                    }}
                  />
                </Col>

                <Col span={24} style={{ marginTop: -20 }}>
                  <ConInput
                    form={form}
                    id="filename"
                    label="文件名"
                    defValue={modalDataObj.filename}
                    required={true}
                    disabled={disabled}
                    message={'文件名不能为空'}
                    placeholder={'文件名不能为空'}
                  />
                </Col>

                <Col span={24}>
                  <ConInput
                    form={form}
                    id="leixing"
                    label="文件类型"
                    message="文件类型不能为空"
                    placeholder="文件类型不能为空"
                    defValue={modalDataObj.leixing}
                    required={true}
                    disabled={true}
                  />
                </Col>

                <Col span={24}>
                  <ConInput
                    form={form}
                    id="filesize"
                    label="文件大小"
                    defValue={modalDataObj.filesize}
                    required={true}
                    disabled={true}
                    message="文件大小不能为空"
                    placeholder="文件大小不能为空"
                  />
                </Col>
              </Row>

            </Form>
          </Spin>

        </Modal>
      </div>
    );
  }
}

export default Attchment;
