import React from 'react';
import {Form, Modal, Row, Col, Spin} from 'antd';

import ConInput from 'components/ConInput';
import ConSelect from 'components/ConSelect';
import ConWebsite from 'components/ConWebsite';

import {footer} from 'utils';

const titleObj = {
  add: '添加APP版本管理信息',
  edit: '编辑APP版本管理信息',
  desc: '查看APP版本管理信息',
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
        this.props.onSave(fieldsValue, this.hideModal);
      }
    });
  };

  render() {
    const {loading} = this.state;
    const {visible, form, status, basicData = {}} = this.props;
    const disabled = (status === 'desc') ? true : false;




    return (
      <Modal
        title={titleObj[status]}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}
        maskClosable={false}
        confirmLoading={loading}
        okText="确认"
        cancelText="取消"
        {...footer(disabled)}
        width="900px"
      >
        <Spin spinning={loading}>
          <Form onSubmit={this.handleSubmit}>
            <Row>

              <Col span={12}>
                <ConInput
                  form={form}
                  id="version"
                  label="版本号"
                  placeholder="请输入版本号"
                  defValue={basicData.version}
                  required={true}
                  disabled={disabled}
                  message={'请输入版本号'}
                />
              </Col>

              <Col span={12}>
                <ConWebsite
                  form={form}
                  id="url"
                  label="URL"
                  placeholder="请输入URL"
                  defValue={basicData.url}
                  required={true}
                  disabled={disabled}
                  message={'请输入URL'}
                />
              </Col>
              <Col span={12}>
                <ConSelect
                  form={form}
                  id="type"
                  label="类型"
                  placeholder="请选择类型"
                  data={['IOS', 'ANDROID']}
                  required={true}
                  disabled={disabled}
                  defValue={basicData.type}
                />
              </Col>
              <Col span={12}>
                <ConSelect
                  form={form}
                  id="isupdate"
                  label="强制更新"
                  placeholder="请选择是否强制更新"
                  data={['否', '是']}
                  disabled={disabled}
                  defValue={basicData.isupdate}
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
