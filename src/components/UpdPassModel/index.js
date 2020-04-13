import React from 'react';
import { Form, Modal, Row, Col, Spin } from 'antd';
import ConPassword from 'components/ConPassword';
import { connect } from 'dva';
import { checkError } from 'utils';

@Form.create()

@connect((state) => ({
  commonModel: state.commonModel,
}))

class ResetPassModal extends React.Component {

  state={
    loading:false
  }
  //  关闭添加信息弹框
  hideModal = (status) => {
    if (status) {
      this.props.onCancel();
      this.props.form.resetFields();
    }
    this.setState({loading: false});
  }

  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        delete fieldsValue.okPass; // 去掉确认密码
        this.setState({ loading:false});
        this.props.onSave(fieldsValue,this.hideModal);
      }
    });
  };





  //新密码一致校验
  handleCheckPwd = (rules, value, callback) => {
    let cfmPwd = this.props.form.getFieldValue('okPass');
    if (cfmPwd && cfmPwd !== value) {
      callback(new Error('两次密码输入不一致'));
    } else {
      // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
      callback();
    }
  };

  //确认密码校验一致
  handleCfmPwd = (rules, value, callback) => {
    let loginpass = this.props.form.getFieldValue('password');
    if (loginpass && loginpass !== value) {
      callback(new Error('两次密码输入不一致'));
    } else {
      // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
      callback();
    }
  };


  render() {
    const { visible, form } = this.props;
    const { loading } = this.state;
    return (
      <Modal
        title="重置密码"
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}
        maskClosable={false}
        okText="确认"
        cancelText="取消"
        // bodyStyle={{ paddingBottom: 0 }}
        width="400px"
        confirmLoading={loading}
      >
        <Spin spinning={loading}>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              {/*<Col span={24}>*/}
                {/*<ConPassword*/}
                  {/*form={form}*/}
                  {/*id="oldpassword"*/}
                  {/*label="旧密码"*/}
                  {/*placeholder="请输入登录密码"*/}
                  {/*required={true}*/}
                {/*/>*/}
              {/*</Col>*/}

              <Col span={24}>
                <ConPassword
                  form={form}
                  id="password"
                  label="新密码"
                  placeholder="请输入新密码"
                  message="请输入新密码"
                  required={true}
                  validator={this.handleCheckPwd}
                  validateFirst={true}
                />
              </Col>

              <Col span={24}>
                <ConPassword
                  form={form}
                  id="okPass"
                  label="确认密码"
                  placeholder="请输入确认密码"
                  message="请输入确认密码"
                  required={true}
                  validator={this.handleCfmPwd}
                  validateFirst={true}
                />
              </Col>
            </Row>
          </Form>
        </Spin>

      </Modal>
    );
  }
}

export default ResetPassModal;
