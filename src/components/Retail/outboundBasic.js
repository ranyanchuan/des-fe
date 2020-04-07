import React from 'react';
import moment from 'moment';

import { Form, Modal, Row, Col, Button } from 'antd';
import ConInput from 'components/ConInput';
import ConInputNumber from 'components/ConInputNumber';
import ConAutoSelect from 'components/ConAutoSelect';

import { dataTown, dataVillage, dataGroup } from 'utils/mockData';



@Form.create()

class outboundBasic extends React.Component {
  state = {
    status: '',
    fileList: [],
  };


  componentWillReceiveProps(nextProps) {
    const { basicDataObj } = nextProps;
    const { list = [] } = basicDataObj || {};
    if (list.length > 0 && this.props.basicDataObj !== basicDataObj) {
      this.setState({ selectedRowObj: list[0] });
    }
  }


  // 关闭添加信息弹框
  hideModal = () => {
    this.props.onClose();
    this.props.form.resetFields();
  };


  //  提交form信息弹框
  handleSubmit = (e) => {
    // this.props.hideModal();
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.props.onSave(fieldsValue);
        this.hideModal();
      }
    });
  };


  render() {

    const { visible, form, basicData = {} } = this.props;


    const formItemLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 16 } },
    };


    return (
      <div>

        <Modal
          title={'购买'}
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          width="960px"
          okText="确认"
          cancelText="取消"
        >
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={24}>


              <Col span={8}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="code"
                  label="编码"
                  disabled={true}
                  defValue={basicData._id}
                />
              </Col>


              <Col span={8}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="domain"
                  label="种类"
                  disabled={true}
                  defValue={basicData.domain}
                />
              </Col>


              <Col span={8}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="brand"
                  label="品牌"
                  disabled={true}
                  defValue={basicData.brand}
                />
              </Col>


              <Col span={8}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="title"
                  label="名称"
                  disabled={true}
                  defValue={basicData.title}
                />
              </Col>


              <Col span={8}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="model"
                  label="型号"
                  disabled={true}
                  defValue={basicData.model}
                />
              </Col>

              <Col span={8}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="stock"
                  label="库存"
                  disabled={true}
                  defValue={basicData.stock}
                />
              </Col>


              <Col span={8}>

                <ConInputNumber
                  form={form}
                  formItemLayout={formItemLayout}
                  id="number"
                  label="数量"
                  placeholder="请输入或者选择数量"
                  min={1}
                  max={basicData.stock}
                  defValue={1}
                  required={true}
                />

              </Col>

              <Col span={8}>
                <ConInputNumber
                  form={form}
                  formItemLayout={formItemLayout}
                  id="price"
                  label="价格"
                  placeholder="请输入或者选择价格"
                  min={0}
                  required={true}
                  message="请输入或者选择价格"
                />

              </Col>


              <Col span={8}>
                <ConAutoSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="remark"
                  label="备注"
                  placeholder="请输入备注"

                />
              </Col>

            </Row>

            <Row gutter={24}>

              <Col span={8}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="name"
                  label="名字"
                  placeholder="请选输入名字"
                  required={true}
                  message="请选输入名字"
                />
              </Col>


              <Col span={8}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="phone"
                  label="手机号"
                  placeholder="请输入手机号"
                  required={true}
                  message="请输入手机号"

                />
              </Col>

              <Col span={8}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="card"
                  label="身份证号"
                  placeholder="请输入身份证号"
                  // required={true}
                  message="请输入身份证号"

                />
              </Col>


              <Col span={8}>
                <ConAutoSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="town"
                  label="居住镇"
                  placeholder="请输入居住镇"
                  data={dataTown}
                  defValue={'客田镇'}
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
                  defValue={'客田村'}
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
                />
              </Col>

            </Row>

          </Form>


        </Modal>

      </div>
    );
  }
}

export default outboundBasic;
