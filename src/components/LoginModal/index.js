import React from 'react';
import {Form, Icon, Input, Button, Modal} from 'antd';

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


  hideModal = (status) => {
    if (status) {
      this.props.onCancel();
    }
    this.setState({loading: false});
  }


  onClickLogin = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading: true});
        this.props.onSave(values, this.hideModal);
      }
    });
  }

  render() {

    const {visible} = this.props;
    const {getFieldDecorator} = this.props.form;
    const {loading} = this.state;

    return (

      <Modal
        title="用户登录"
        visible={visible}
        onOk={this.onClickLogin}
        onCancel={this.hideModal}
        maskClosable={false}
        okText="确认"
        cancelText="取消"
        // bodyStyle={{ paddingBottom: 0 }}
        width="400px"
        footer={null}
      >
        <div className={styles.login}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('email', {
                // trigger: 'onBlur',
                rules: [{required: true, message: '用户账号'}],

              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  placeholder="邮箱/手机号"
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
              <Button type="primary" htmlType="submit" size="large" loading={loading}
                      onClick={this.onClickLogin}>登录</Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>


    );
  }
}

export default Index;
