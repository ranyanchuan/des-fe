import React from 'react';
import { Form, Modal, Row, Col, Spin } from 'antd';

import ConInput from 'components/ConInput';
import ConTextArea from 'components/ConTextArea';
import ConAutoEmail from 'components/ConAutoEmail';
import ConPhone from 'components/ConPhone';
import ConIdentityCard from 'components/ConIdentityCard';
import ConEducationSelect from 'components/ConEducationSelect';

import styles from './index.less';
import { footer } from 'utils';

const titleObj = {
  add: '添加专家',
  edit: '编辑专家',
  desc: '查看专家',
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
    this.setState({ loading: false });
  };

  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.setState({ loading: true });
        this.props.onSave(fieldsValue, this.hideModal);
      }
    });
  };

  render() {
    const { loading } = this.state;

    const { visible, form, status, basicData = {} } = this.props;

    const disabled = (status === 'desc') ? true : false;
    const addDisabled = (status === 'add') ? false : true;


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
                  id="mingcheng"
                  defValue={basicData.mingcheng}
                  label="姓名"
                  placeholder="请输入姓名"
                  required={true}
                  disabled={disabled}
                  message={'请输入姓名'}
                />
              </Col>

              <Col span={12}>
                <ConInput
                  form={form}
                  id="zhiwu"
                  defValue={basicData.zhiwu}
                  label="职务"
                  placeholder="请输入职务"
                  required={true}
                  disabled={disabled}
                  message={'请输入职务'}
                />
              </Col>

            </Row>
            <Row>

              <Col span={12}>
                <ConPhone
                  form={form}
                  id="dianhua"
                  defValue={basicData.dianhua}
                  label="联系电话"
                  placeholder="请输入联系电话"
                  required={true}
                  disabled={addDisabled}
                  message={'请输入联系电话'}
                />
              </Col>
              <Col span={12}>
                <ConAutoEmail
                  form={form}
                  id="email"
                  defValue={basicData.email}
                  label="邮箱"
                  placeholder="请输入邮箱"
                  required={true}
                  disabled={disabled}
                  message={'请输入邮箱'}
                />
              </Col>

            </Row>
            <Row>
              <Col span={12}>
                <ConPhone
                  form={form}
                  id="dianhua2"
                  defValue={basicData.dianhua2}
                  label="备用电话"
                  placeholder="请输入备用电话"
                  required={false}
                  disabled={disabled}
                  message={'请输入备用电话'}
                />
              </Col>
              <Col span={12}>
                <ConIdentityCard
                  form={form}
                  id="shenfenzheng"
                  defValue={basicData.shenfenzheng}
                  required={true}
                  disabled={disabled}
                />
              </Col>

            </Row>
            <Row>
              <Col span={12}>
                <ConInput
                  form={form}
                  id="danwei"
                  defValue={basicData.danwei}
                  label="工作单位"
                  placeholder="请输入工作单位"
                  required={true}
                  disabled={disabled}
                  message={'请输入工作单位'}
                />
              </Col>
              <Col span={12}>
                <ConInput
                  form={form}
                  id="zhicheng"
                  defValue={basicData.zhicheng}
                  label="职称"
                  placeholder="请输入职称"
                  required={true}
                  disabled={disabled}
                  message={'请输入职称'}
                />
              </Col>

            </Row>
            <Row>

              <Col span={12}>
                <ConEducationSelect
                  form={form}
                  id="xueli"
                  defValue={basicData.xueli}
                  label="最高学历"
                  placeholder="请输入最高学历"
                  required={true}
                  disabled={disabled}
                  message={'请输入最高学历'}
                />
              </Col>
              <Col span={12}>
                <ConInput
                  form={form}
                  id="zhuanye"
                  defValue={basicData.zhuanye}
                  label="专业"
                  placeholder="请输入专业"
                  required={true}
                  disabled={disabled}
                  message={'请输入专业'}
                />
              </Col>


            </Row>
            <Row>

              <Col span={12}>
                <ConInput
                  form={form}
                  id="yanjiufangxiang"
                  defValue={basicData.yanjiufangxiang}
                  label="研究方向"
                  placeholder="请输入研究方向"
                  required={true}
                  disabled={disabled}
                  message={'请输入研究方向'}
                />
              </Col>

            </Row>
            <Row>

              <Col span={24}>
                <ConTextArea
                  form={form}
                  id="jianjie"
                  defValue={basicData.jianjie}
                  label="专家简介"
                  placeholder="请输入专家简介"
                  required={true}
                  disabled={disabled}
                  message={'请输入专家简介'}
                  height={80}
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
