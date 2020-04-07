import React from 'react';
import { Form, Modal, Row, Col } from 'antd';

import ConSelect from 'components/ConSelect';
import ConTextArea from 'components/ConTextArea';

import styles from './index.less';


@Form.create()

class ActionModal extends React.Component {


  state = {
    confirmLoading: false,
  };
  //  关闭添加信息弹框
  hideModal = (status) => {
    if (status) {
      this.props.onClose();
      this.props.form.resetFields();
    }
    this.setState({ confirmLoading: false });

  };

  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.setState({ confirmLoading: true });
        this.props.onSave(fieldsValue, this.hideModal);
      }
    });
  };


  render() {
    const { visible, form, status } = this.props;
    const { confirmLoading } = this.state;
    let formItemLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 18 } },
    };

    return (
      <Modal
        title={'审核信息'}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}
        confirmLoading={confirmLoading}
        maskClosable={false}
        okText="确认"
        cancelText="取消"
        width="400px"
      >
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={24}>
              <ConSelect
                form={form}
                id="state"
                label="审核结果"
                defValue="审核通过"
                placeholder="请选择审核结果"
                data={['审核通过', '已驳回']}
                required={true}
              />
            </Col>

            <Col span={24}>
              <ConTextArea
                formItemLayout={formItemLayout}
                form={form}
                id="piyu"
                label="批语"
                placeholder="请输入批语"
                height={120}
              />
            </Col>
          </Row>
        </Form>

      </Modal>
    );
  }
}

export default ActionModal;
