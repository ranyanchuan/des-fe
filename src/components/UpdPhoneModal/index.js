import React from 'react';
import { Form, Modal, Row, Col, Spin } from 'antd';
import { connect } from 'dva';
import { checkError } from 'utils';


import ConInput from 'components/ConInput';
import ConInputYz from 'components/ConInputYz';
import ConInputSms from 'components/ConInputSms';

import styles from './index.less';

@Form.create()
@connect((state) => ({
  commonModel: state.commonModel,
}))

class PhoneModal extends React.Component {

  state = {
    loading: false,
    showYzCode: true,
  };
  //  关闭添加信息弹框
  hideModal = () => {
    this.props.onClose();
    this.props.form.resetFields();
  };

  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        fieldsValue.mobile = fieldsValue.staffCode;
        delete fieldsValue.codeTxt;
        delete fieldsValue.staffCode;
        this.updUserPhone(fieldsValue);
      }
    });
  };

  updUserPhone = (payload) => {
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'commonModel/updUser',
      payload,
      callback: (value) => {
        if (checkError(value)) {
          this.hideModal();
          //  todo 重新登录
          console.log('重新登录');
        } else {
          this.msm.initMsm();
        }
        this.setState({ loading: false });
      },
    });
  };

  //
  onBlurStaffCode = () => {
    this.msm.initMsm();
  };

  // 获取手机号
  getPhone = () => {
    let result = null;
    this.props.form.validateFields(['staffCode', 'codeTxt'], (errors, payload) => {
      if (!errors) {
        result = payload;
      }
    });
    return result;
  };


  sendCode = (showYzCode) => {
    this.setState({ showYzCode });
  };


  render() {
    const { visible, form } = this.props;
    const { loading, showYzCode } = this.state;

    return (
      <Modal
        title="更新手机号"
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}
        maskClosable={false}
        bodyStyle={{ paddingBottom: 0, marginBottom: -18 }}
        okText="确认" cancelText="取消"
        cancelText="取消"
        width="400px"
        confirmLoading={loading}
      >
        <Spin spinning={loading}>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={24}>
                <ConInput
                  form={form}
                  id="staffCode"
                  label="手机号"
                  placeholder="请输入手机号"
                  message="请正确输入手机号"
                  required={true}
                  onBlur={this.onBlurStaffCode}
                />
              </Col>
              {showYzCode &&
              <Col span={24}>
                <ConInputYz
                  form={form}
                  required={true}
                  id="codeTxt"
                />
              </Col>
              }

              <Col span={24}>
                <ConInputSms
                  form={form}
                  required={true}
                  getPhone={this.getPhone}
                  id="smscode"
                  sendCode={this.sendCode}
                  onRef={value => this.msm = value}
                />
              </Col>
            </Row>
          </Form>
        </Spin>

      </Modal>
    );
  }
}

export default PhoneModal;
