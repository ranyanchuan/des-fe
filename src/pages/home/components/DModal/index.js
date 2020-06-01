import React from 'react';
import {Form, Modal, Row, Col, Spin} from 'antd';

import ConInput from 'components/ConInput';

import {footer} from 'utils';

const titleObj = {
  add: '添加存证信息',
  edit: '编辑存证信息',
  desc: '查看存证信息',
};

@Form.create()

class ActionModal extends React.Component {

  state = {
    loading: false,
  };


  //  关闭添加信息弹框
  hideModal = (status) => {
    if (status) {
      this.props.onClose();
      this.props.form.resetFields();
    }
    this.setState({loading: false});
  };
  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.setState({loading: true});
        this.props.onSave(fieldsValue, this.hideModal);
      }
    });
  };


  onChange = (link, value) => {
    this.fileUrl = link;
  }


  render() {
    const {loading} = this.state;
    const {visible, form, status, basicData = {}} = this.props;
    const disabled = (status === 'desc') ? true : false;
    return (
      <Modal
        title={"请输入存证 hash"}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}
        maskClosable={false}
        confirmLoading={loading}
        okText="确认"
        cancelText="取消"
        {...footer(disabled)}
        width="400px"
      >
        <Spin spinning={loading} tip="正在挖矿...">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={24}>
                <ConInput
                  form={form}
                  id="hash"
                  label="存证hash"
                  placeholder="请输入存证hash"
                  message='请输入存证hash'
                  required={true}
                  disabled={disabled}
                  defValue={""}
                />
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

export default ActionModal;
