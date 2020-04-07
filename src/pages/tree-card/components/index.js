/* eslint-disable import/first */
import React from 'react';
import {connect} from 'dva';
import {Form, Spin, Row, Col, Button, Modal} from 'antd';
import {checkError, checkEdit, delMore, getPageParam} from 'utils';
import ConInput from 'components/ConInput';
import ConTreeLoading from 'components/ConTreeLoading';
import ActionModal from './Modal';


import styles from './index.less';

const confirm = Modal.confirm;

@Form.create()
@connect((state) => ({
  treeCardModel: state.treeCardModel,
}))

class TreeCard extends React.Component {

  state = {
    modalDataObj: {}, //  弹框数据
    loading: false,
    visible: false,
    status: 'add',

  };

  onSelectTree = (data) => {
    this.setState({modalDataObj: data[0]});
  };

  onLoading = (loading) => {
    this.setState({loading});
  };

  // 展示弹框
  onShowModal = (status) => {
    this.setState({visible: true, status});
  };

  // 关闭弹框
  onClickClose = () => {
    this.setState({visible: false, status: 'add'});
  };


  //添加表格数据
  onSave = (payload, callback) => {
    const {status, modalDataObj} = this.state;
    const _this = this;
    this.props.dispatch({
      type: 'treeCardModel/add',
      payload: checkEdit(status, modalDataObj, payload),
      callback: (value) => {
        let success = false;
        if (checkError(value)) {
          _this.cTree.updateLoad({pid: modalDataObj.pid});
          success = true;
        }
        callback(success);
      },
    });

  };


  // 删除表格数据
  delData = () => {
    const { modalDataObj} = this.state;
    const _this = this;
    this.props.dispatch({
      type: 'treeCardModel/del',
      payload: delMore([modalDataObj]),
      callback: (value) => {
        if (checkError(value)) {
          _this.cTree.updateLoad({pid: modalDataObj.pid});
        }
      },
    });
  };

  // 删除弹框确认
  onClickDel = () => {
    // todo 判断是否根节点
    const _this = this;
    confirm({
      title: '您确定要删除吗',
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        // 删除数据
        _this.delData();
      },
      onCancel() {
        console.log('取消删除');
      },
    });
  };


  render() {

    const {loading, modalDataObj={}, status, visible} = this.state;

    const {form} = this.props;

    const formItemLayout = {
      labelCol: {sm: {span: 10}, xs: {span: 10}, md: {span: 5}},
      wrapperCol: {sm: {span: 14}, xs: {span: 10}, md: {span: 19}},
    };

    return (
      <Spin spinning={loading}>

        <div className="tree-card-action">
          <Button onClick={this.onShowModal.bind(this, 'add')}>添加</Button>
          <Button onClick={this.onShowModal.bind(this, 'edit')}>修改</Button>
          <Button onClick={this.onClickDel}>删除</Button>
        </div>

        {/*弹框*/}
        <ActionModal
          visible={visible}
          onSave={this.onSave}
          status={status}
          onClose={this.onClickClose}
          basicData={status !== 'add' ? modalDataObj : {}}
        />


        <div className="tree-card">
          <div className="left-tree">
            <ConTreeLoading
              url='/admin/department/getByPid'
              treeTitle='dtpname'
              treeCode='dtpcode'
              treeId='id'
              onRef={ref => this.cTree = ref}
              onSelect={this.onSelectTree}
              onLoading={this.onLoading}
            />
          </div>

          <Form
            className="right-card"
          >
            <Row gutter={24}>
              <Col xs={24} sm={24} md={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="dtpname"
                  label="组织"
                  defValue={modalDataObj.dtpname}
                  disabled={true}
                />

              </Col>

              <Col xs={24} sm={24} md={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="dtpcode"
                  label="编码"
                  defValue={modalDataObj.dtpcode}
                  disabled={true}
                />

              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} sm={24} md={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="dtptype"
                  label="类型"
                  defValue={modalDataObj.dtptype}
                  disabled={true}
                />
              </Col>
            </Row>
          </Form>
        </div>
      </Spin>

    );
  }
}

export default TreeCard;
