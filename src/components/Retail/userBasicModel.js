import React from 'react';
import moment from 'moment';

import { Form, Modal, Row, Col } from 'antd';
import ConInput from 'components/ConInput';
import ConAutoSelect from 'components/ConAutoSelect';

import { api } from 'utils/config';
import { uuid, addUidList } from 'utils';
import { dataTown, dataVillage, dataGroup } from 'utils/mockData';


@Form.create()

class UserBasicModel extends React.Component {
  state = {
    status: '',
    fileList: [],
  };


  componentWillReceiveProps(nextProps) {
    const { basicDataObj } = nextProps;
    const { list = [] } = basicDataObj || {};
    if (list.length > 0 && this.props.basicDataObj !== basicDataObj) {
      const { _id, fileList } = list[0];
      this.setState({ selectedRowKeys: [_id], selectedRowObj: list[0], fileList });
    }
  }


  // 关闭添加信息弹框
  hideModal = () => {
    this.setState({ fileList: [] });
    this.props.onClose();
    this.props.form.resetFields();
  };


  //  提交form信息弹框
  handleSubmit = (e) => {
    // this.props.hideModal();
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {

      if (!err) {
        const { status } = this.props;
        if (status === 'desc') {
          this.onClickClose();
          return;
        }
        if (!err) {

          delete fieldsValue.createTime;
          this.props.onSave(fieldsValue);
          this.hideModal();
        }
      }
    });
  };


  // 标题对象
  titleObj = {
    add: '添加商品数据',
    edit: '编辑商品数据',
    desc: '查看商品数据',
  };


  render() {

    const { visible, form, status, basicData = {} } = this.props;


    const formItemLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 16 } },
    };


    const formItemLayoutLine = {
      labelCol: { sm: { span: 3 } },
      wrapperCol: { sm: { span: 20 } },
    };


    const disabled = status === 'desc' ? true : false;


    return (
      <div>

        <Modal
          title={this.titleObj[status]}
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          width="960px"
          okText="确认"
          cancelText="取消"
        >
          <Form onSubmit={this.handleSubmit}>
            <Row>

              <Col span={8}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="name"
                  label="名字"
                  placeholder="请输入名字"
                  message="请输入名字"

                  required={true}
                  defValue={basicData.name}
                  disabled={disabled}


                />
              </Col>

              <Col span={8}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="phone"
                  label="手机号"
                  placeholder="请输入手机号"
                  message="请输入手机号"
                  required={true}
                  defValue={basicData.phone}
                  disabled={disabled}
                />
              </Col>

              <Col span={8}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="card"
                  label="身份证"
                  placeholder="请输入身份证"
                  message="请输入身份证"
                  required={true}
                  defValue={basicData.card}
                  disabled={disabled}
                />
              </Col>

            </Row>

            <Row>
              <Col span={8}>
                <ConAutoSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="town"
                  label="居住镇"
                  placeholder="请输入居住镇"
                  data={dataTown}
                  defValue={basicData.town}
                  disabled={disabled}
                />
              </Col>
              <Col span={8}>
                <ConAutoSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="village"
                  label="居住村"
                  placeholder="请选择居住村"
                  data={dataVillage}
                  defValue={basicData.village}
                  disabled={disabled}
                />
              </Col>

              <Col span={8}>
                <ConAutoSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="group"
                  label="居住组"
                  placeholder="请选择居住组"
                  data={dataGroup}
                  defValue={basicData.group}
                  disabled={disabled}

                />
              </Col>
            </Row>

          </Form>

        </Modal>

      </div>
    );
  }
}

export default UserBasicModel;
