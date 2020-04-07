import React from 'react';
import { Form, Modal, Row, Col, Spin } from 'antd';

import ConInput from 'components/ConInput';
import { footer, changeSelectVal } from 'utils';

import styles from './index.less';
import { connect } from 'dva';

const titleObj = {
  add: '添加商品分类',
  edit: '编辑商品分类',
};

@Form.create()

@connect((state) => ({
  treeCardModel: state.treeCardModel,
}))

class ActionModal extends React.Component {

  state = {
    confirmLoading: false,
  };

  //  关闭添加信息弹框
  hideModal = (status) => {
    if (status) {
      this.props.form.resetFields();
      this.props.onClose();
    }
    this.setState({ confirmLoading: false });
  };

  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.setState({ loading: true });
        this.props.onSave(fieldsValue, this.hideModal);
      }
    });
  };



  render() {
    const { visible, form, status,basicData={}} = this.props;
    const formItemLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 18 } },
    };

    const { confirmLoading } = this.state;
    const disabled = (status === 'desc') ? true : false;
    return (
      <Modal
        title={titleObj[status]}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}
        confirmLoading={confirmLoading}
        maskClosable={false}
        okText="确认"
        cancelText="取消"
        {...footer(disabled)}
        width="400px"
      >
        <Spin spinning={confirmLoading}>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={24}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="mingcheng"
                  defValue={basicData.dtpname}
                  label="名称"
                  placeholder="请输入名称"
                  required={true}
                  disabled={disabled}
                  message={'请输入名称'}
                />
              </Col>
              <Col span={24}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="dtpcode"
                  defValue={basicData.dtpcode}
                  label="名称"
                  placeholder="请输入编码"
                  required={true}
                  disabled={disabled}
                  message={'请输入编码'}
                />
              </Col>


              <Col span={24}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="dtptype"
                  defValue={basicData.dtptype}
                  label="类型"
                  placeholder="请输入类型"
                  required={true}
                  disabled={disabled}
                  message={'请输入类型'}
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
