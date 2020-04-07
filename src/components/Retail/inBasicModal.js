import React from 'react';
import { Form, Modal, Row, Col } from 'antd';
import ConInput from 'components/ConInput';
import ConDate from 'components/ConDate';
import ConUploadMore from 'components/ConUploadMore';
import ConInputNumber from 'components/ConInputNumber';
import ConAutoSelect from 'components/ConAutoSelect';

import { api } from 'utils/config';
import { uuid, addUidList } from 'utils';
import { dataDomain, dataBrand, dataSource } from 'utils/mockData';


@Form.create()

class InBasicModel extends React.Component {
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

    const fileList = this.child.getFileList();

    this.props.form.validateFields((err, fieldsValue) => {

      if (!err) {
        const { status } = this.props;
        if (status === 'desc') {
          this.onClickClose();
          return;
        }
        if (!err) {
          // 添加图片url
          if (fileList) {
            fieldsValue.fileList = fileList;
          }
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

    console.log('basicData', basicData);


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
              <Col span={12}>
                <ConAutoSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="domain"
                  label="种类"
                  required={true}
                  placeholder="请选择种类"
                  data={dataDomain}
                  defValue={basicData.domain}
                  disabled={disabled}
                  message="请选择种类"
                />
              </Col>
              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="title"
                  label="名称"
                  placeholder="请输入名称"
                  message="请输入名称"
                  required={true}
                  defValue={basicData.title}
                  disabled={disabled}

                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConAutoSelect
                  form={form}
                  formItemLayout={formItemLayout}
                  id="brand"
                  label="品牌"
                  placeholder="请输入品牌"
                  data={dataBrand}
                  defValue={basicData.brand}
                  disabled={disabled}
                  required={true}
                />
              </Col>
              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="model"
                  label="型号"
                  placeholder="请输入型号"
                  defValue={basicData.model}
                  disabled={disabled}
                  required={true}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConInputNumber
                  form={form}
                  formItemLayout={formItemLayout}
                  id="total"
                  label="进货数量"
                  placeholder="请选择进货数量"
                  min={0}
                  defValue={basicData.total}
                  disabled={disabled}
                  required={true}
                />
              </Col>
              <Col span={12}>
                <ConInputNumber
                  form={form}
                  formItemLayout={formItemLayout}
                  id="stock"
                  label="库存数量"
                  placeholder="请选择库存数量"
                  min={0}
                  defValue={basicData.stock}
                  disabled={disabled}
                  required={true}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <ConDate
                  id="createTime"
                  label="入库日期"
                  placeholder="入库日期"
                  form={form}
                  formItemLayout={formItemLayout}
                  defValue={basicData.createTime}
                />
              </Col>

              <Col span={12}>
                <ConAutoSelect
                  id="source"
                  label="进货地址"
                  placeholder="请输入进货地址"
                  form={form}
                  formItemLayout={formItemLayout}
                  data={dataSource}
                  defValue={basicData.source}
                  disabled={disabled}
                />
              </Col>

            </Row>

            <Row>

              <Col span={12}>
                <ConInputNumber
                  id="price"
                  label="单价"
                  placeholder="请输入单价"
                  message="请输入单价"
                  form={form}
                  formItemLayout={formItemLayout}
                  min={0}
                  defValue={basicData.price}
                  disabled={disabled}
                  required={true}
                />
              </Col>

              <Col span={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="remark"
                  label="备注"
                  placeholder="请输入备注"
                  disabled={disabled}
                  defValue={basicData.remark}
                />
              </Col>


            </Row>

            <Row>
              <Col span={24}>
                <ConUploadMore
                  // 设置ref属性
                  onRef={(ref) => {
                    this.child = ref;
                  }}
                  title="上传图片"
                  formItemLayout={formItemLayoutLine}
                  fileList={addUidList(basicData.fileList)}
                  disabled={disabled}
                  label="图片"
                />
              </Col>
            </Row>
          </Form>

        </Modal>

      </div>
    );
  }
}

export default InBasicModel;
