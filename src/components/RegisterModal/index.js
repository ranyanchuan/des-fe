/* eslint-disable import/first */
import React from 'react';
import {Form, Icon, Input, Button, Spin, Checkbox, message, Radio, Modal, Row, Col} from 'antd';
import {connect} from 'dva';
import {checkError} from 'utils';
import ConPassword from 'components/ConPassword';
import ConAutoEmail from 'components/ConAutoEmail';

import styles from './index.less';

@Form.create()

@connect((state) => ({
  commonModel: state.commonModel,
}))

class Index extends React.Component {

  state = {
    loading: false,
  };


  // 登录
  onRegister = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.onSave(values);
      }
    });
  };


  onSave = (payload, callback) => {
    this.props.dispatch({
      type: 'commonModel/addUser',
      payload: values,
      callback: (param) => {
        const temp = {spinning: false};
        if (checkError(param)) {
          //  todo  直接登录
          const {userCode, username, userRoleId} = param.data;
          localStorage.setItem('userCode', userCode);
          localStorage.setItem('loginName', username);
          localStorage.setItem('userRoleId', userRoleId);
          this.props.onCancel();

        }
        this.setState(temp);
      },
    });

  };


  // 登录
  onAddUser = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.onSave(values);
      }
    });
  };


  render() {

    const {visible, form, showRegister} = this.props;
    const {loading} = this.state;

    return (

      <Modal
        title="用户注册"
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}
        maskClosable={false}
        okText="确认"
        cancelText="取消"
        // bodyStyle={{ paddingBottom: 0 }}
        width="400px"
        footer={null}
      >

        <div className={styles.register}>
          <Spin spinning={loading}>
            <Form onSubmit={this.handleSubmit}>
              <Row>

                <Col span={24}>
                  <ConAutoEmail
                    form={form}
                    id="email"
                    label="邮箱"
                    placeholder="请输入登录邮箱"
                    required={true}
                  />
                </Col>

                <Col span={24}>
                  <ConPassword
                    form={form}
                    id="password"
                    label="设置密码"
                    placeholder="请输入设置密码"
                    message="请输入设置密码"
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

                <Form.Item>
                  <Button
                    type='primary'
                    size="large"
                    onClick={this.onRegister}>注册</Button>
                </Form.Item>
              </Row>
            </Form>
          </Spin>

        </div>
      </Modal>

    );
  }
}

export default Index;
