/* eslint-disable import/first */
import React from 'react';
import {Form, Icon, Input, Button, Spin, Checkbox, message, Radio} from 'antd';
import {connect} from 'dva';
import {checkError} from 'utils';
import AgreeModal from './agreeModal';

import styles from './register.less';

@Form.create()

@connect((state) => ({
  commonModel: state.commonModel,
}))

class Index extends React.Component {

  state = {
    spinning: false,
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

    const {codeNum, form, showRegister} = this.props;
    const {getFieldDecorator} = form;
    const {spinning, agreeStatus, isCountdown, onShowAgree} = this.state;


    return (

      <div className={styles.register}>

        <Spin spinning={spinning}>

          {showRegister &&
          <Form className="login-form">
            {/*验证手机*/}
            <Form.Item>
              {getFieldDecorator('staffCode', {
                // trigger: 'onBlur',
                rules: [{
                  required: true,
                  pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                  message: '请输入正确的手机号',
                }],

              })(
                <Input
                  size="large"
                  prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  placeholder="手机号"
                />,
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {required: true, message: '密码'},
                  {
                    min: 6,
                    message: '密码不能少于6个字符',
                  },
                ],
              })(
                <Input.Password size="large"
                                type="password"
                                placeholder="登录密码"/>,
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                size="large"
                onClick={this.onRegister}>注册</Button>
            </Form.Item>
          </Form>
          }

        </Spin>

      </div>

    );
  }
}

export default Index;
