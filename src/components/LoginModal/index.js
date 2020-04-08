/* eslint-disable import/first */
import React from 'react';
import {Form, Icon, Input, Button, message, Row, Col, Spin} from 'antd';

import {connect} from 'dva';
import {checkError} from 'utils';

import styles from './index.less';


@Form.create()

@connect((state) => ({
  commonModel: state.commonModel,
}))

class Index extends React.Component {

  state = {
    loading: false,
  };

  onClickLogin = () => {
    const _this = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading: true});
        this.props.dispatch({
          type: 'commonModel/addLogin',
          payload: values,
          callback: (value) => {
            const {info, data} = value;
            let temp = {loading: false};
            if (checkError(value)) {
              // todo token 信息
              const {userCode, username} = data;
              sessionStorage.setItem('userCode', userCode);
              sessionStorage.setItem('loginName', username);
              _this.props.onCancel();

            }

          },
        });

      }
    });
  };


  render() {

    const {getFieldDecorator} = this.props.form;
    const {loading} = this.state;

    return (

      <div className={styles.login}>
        <Spin spinning={loading}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('staffCode', {
                // trigger: 'onBlur',
                rules: [{required: true, message: '用户账号'}],

              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  placeholder="用户账号/手机号"
                  onBlur={this.onBlurUser}

                />,
              )}
            </Form.Item>


            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '密码'}],
              })(
                <Input size="large"
                       prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       type="password"
                       placeholder="登录密码"/>,
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" onClick={this.onClickLogin}>登录</Button>
            </Form.Item>
          </Form>
        </Spin>


      </div>


    );
  }
}

export default Index;
