/* eslint-disable import/first */
import React from 'react';
import {Form, Icon, Input, Button, Avatar, message, Spin, Row, Col} from 'antd';
import {connect} from 'dva';
import router from "umi/router";
import Copyright from 'components/Copyright';

import styles from './index.less';

@Form.create()

@connect((state) => ({
  loginModal: state.loginModal,
}))

class SignIn extends React.Component {

  state = {
    name: 0, // 获取验证码次数
    info: '',
    loading: false,
    yzShow: false,
    isPhone: false,
    isCountdown: 0,
  };

  componentDidMount() {
    // localStorage.clear(); // 清空缓存

    // 判断是否直接登录
    // this.getyz();
    this.getNeedCode();

  }


  //组件卸载取消倒计时
  componentWillUnmount() {
    clearInterval(this.timer);
  }


  // 获取验证数据
  getyz = () => {
    const {name} = this.state;
    this.setState({name: name + 1});

  };

  // 判断是否登陆 staffCode
  getNeedCode = (payload) => {
    this.props.dispatch({
      type: 'loginModel/needCode',
      payload,
      callback: (param) => {
        const {data} = param;
        if (data === 'needCode') {
          this.setState({yzShow: true});
          this.getyz();
        } else {
          this.setState({yzShow: false});
        }
      },
    });
  };


  onClickLogin = () => {
    const _this = this;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading: true});
        this.props.dispatch({
          type: 'loginModel/addLogin',
          payload: values,
          callback: (value) => {
            const {code, info, data} = value;
            if (code === '200') {
              const {username, userCode} = data;
              localStorage.setItem('loginName', username);
              localStorage.setItem('userCode', userCode);
              router.push(`/home`);
            } else {
              message.error(info);
              let temp = {loading: false};
              if (info === '请输入验证码') {
                this.setState({yzShow: true});
                temp.yzShow = true;
              }
              _this.setState(temp);
            }
            this.getyz();
          },
        });

      }
    });
  };


  // 判断当前用户是否需要登录
  onBlurUser = () => {
    const staffCode = this.props.form.getFieldValue('staffCode');
    this.getNeedCode({staffCode});
  };

  // 手机登录
  onClickPhone = () => {
    // 清空密码
    this.props.form.setFieldsValue({staffCode: '', password: ''});
    this.setState({isPhone: true, yzShow: true});
  };

  // 账号登录
  onClickUserName = () => {
    this.props.form.setFieldsValue({staffCode: '', password: ''});
    this.setState({isPhone: false, yzShow: true});
  };


  // 发送验证
  onClickCode = () => {

    this.props.form.validateFields(['staffCode', 'codeTxt'], (errors, payload) => {
      if (!errors) {
        const {staffCode, codeTxt} = payload;
        if (staffCode && codeTxt) {
          this.props.dispatch({
            type: 'loginModel/getCode',
            payload,
            callback: (param) => {
              const {info, code} = param;
              if (code == '200') {
                this.setState({isCountdown: 60});
                this.countFun(); // 倒计时
              } else {
                message.error(info);
              }
            },
          });
        }
      }
    });

  };


  countFun = () => {

    this.timer = setInterval(() => {
      const {isCountdown} = this.state;
      //防止倒计时出现负数
      if (isCountdown > 0) {
        this.setState({isCountdown: isCountdown - 1});
      } else {
        clearInterval(this.timer);
        this.setState({isCountdown: 0});
        //倒计时结束时触发父组件的方法
      }
    }, 1000);
  };


  render() {

    const {getFieldDecorator} = this.props.form;
    const {name, loading, yzShow, isPhone, isCountdown} = this.state;

    return (

      <div className={styles.login}>

        <div className={styles.loginPage}>

          <div className={styles.container}>

            <Spin spinning={loading}>
              <Form onSubmit={this.handleSubmit} className="login-form">

                <div className={styles.avatar}>
                  <Avatar size={100} icon="user"/>
                </div>
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

                {!isPhone &&
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
                }


                {(yzShow || isPhone) &&
                <Form.Item>
                  {getFieldDecorator('codeTxt', {
                    rules: [{required: true, message: '请输入验证码'}],
                  })(
                    <Input size="large"
                           suffix={<img className={styles.identityImg} src={`login/getyz?name=${name + 1}`}
                                        alt="验证码"
                                        onClick={this.getyz}/>}
                           placeholder="请输入验证码"/>,
                  )}
                </Form.Item>
                }


                {isPhone &&
                <Form.Item>
                  <Row gutter={8}>
                    <Col span={14}>
                      {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入短信验证码'}],
                      })(<Input size="large" prefix={<Icon type="mobile"/>}/>)}
                    </Col>
                    <Col span={10}>
                      <Button size="large"
                              onClick={this.onClickCode}>{isCountdown ? isCountdown + 's 后重新获取' : '获取验证码'}</Button>
                    </Col>
                  </Row>
                </Form.Item>
                }


                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" onClick={this.onClickLogin}>登录</Button>
                </Form.Item>

                <div className={styles.aHref}>
                  {!isPhone &&
                  <span className={styles.loginFormPhone} onClick={this.onClickPhone}>手机登录</span>
                  }
                  {isPhone &&
                  <span className={styles.loginFormPhone} onClick={this.onClickUserName}>账号登录</span>
                  }
                  {/*<span className={styles.loginFormForget}>忘记密码</span>*/}
                  {/*<span className={styles.loginFormPhone}>立刻注册</span>*/}
                </div>

              </Form>
            </Spin>
          </div>
        </div>
        <div className={styles.copyRightContent}>
          <Copyright/>
        </div>

      </div>

    );
  }
}

export default SignIn;
