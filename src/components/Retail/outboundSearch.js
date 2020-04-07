import React from 'react';

import { Form, Row, Col, Input, Button } from 'antd';
import ConSelect from 'components/ConSelect';
import ConDate from 'components/ConDate';
import ConInputNumber from 'components/ConInputNumber';
import ConInput from 'components/ConInput';
import ConTextArea from 'components/ConTextArea';


import styles from './index.less';


@Form.create()


class OutboundSearch extends React.Component {

  componentDidMount() {
    // 在父组件上绑定子组件方法
    this.props.onRef(this);
  }


  handleSearch = (e) => {
    e.preventDefault();
    const param = this.getSearchValue();
    this.props.onSearch(param);
  };


  // 获取表单内容
  getSearchValue = () => {
    const param = {};
    this.props.form.validateFields((err, values) => {
      for (const key in values) {
        if (values[key] && Array.isArray(values[key]) && values[key].length === 0) {
          break;
        }

        if (values[key]) {
          param[key] = values[key];
        }
      }
    });
    return param;
  };


  handleReset = () => {
    this.props.form.resetFields();
  };


  render() {
    const { form } = this.props;
    const formItemLayout = {
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 19 } },
    };
    const { getFieldDecorator } = form;
    return (
      <div className={styles.basketballSearch}>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>

            <Col span={12}>
              <ConSelect
                form={form}
                formItemLayout={formItemLayout}
                id="domain"
                label="种类"
                placeholder="请选择种类"
                data={["电视机",'洗衣机','冰箱']}
              />
            </Col>


            <Col span={12}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="code"
                label="编号"
                placeholder="请输入编号"
              />
            </Col>


            <Col span={12}>
              <ConDate
                id="date"
                label="出库日期"
                placeholder="请选择入库日期"
                form={form}
                formItemLayout={formItemLayout}
              />
            </Col>

            <ConSelect
              form={form}
              formItemLayout={formItemLayout}
              id="town"
              label="镇"
              placeholder="请选择镇"
              data={["客填镇",'新景乡']}
            />

            <ConSelect
              form={form}
              formItemLayout={formItemLayout}
              id="village"
              label="村"
              placeholder="请选择村"
              data={["客填村",'冯家村']}
            />

            <ConSelect
              form={form}
              formItemLayout={formItemLayout}
              id="group"
              label="组"
              placeholder="请选择组"
              data={["客填村",'冯家村']}
            />


          </Row>


          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default OutboundSearch;
