import React from 'react';
import {Form, Modal, Row, Col, Spin} from 'antd';

import ConInput from 'components/ConInput';
import ConUploadOneForm from 'components/ConUploadOneForm';

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
        width="400px"
      >
        <Spin spinning={loading}>
          <Form onSubmit={this.handleSubmit}>
            <Row>

              <Col span={24}>
                <ConInput
                  form={form}
                  id="category"
                  label="存证类型"
                  placeholder="请输入存证类型"
                  message='请输入存证类型'
                  required={true}
                  disabled={disabled}
                  defValue={basicData.category}
                />
              </Col>

              <Col span={24}>
                <ConUploadOneForm
                  formItemLayout = {{
                    labelCol: {sm: {span: 6}},
                    wrapperCol: {sm: {span: 18}},
                  }}
                  form={form}
                  id="fileUrl"
                  defValue={basicData.fileUrl}
                  disabled={disabled}
                  label="文件"
                  title="上传文件"
                  message='请上传文件'
                  required={true}
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
