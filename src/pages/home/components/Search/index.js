import React from 'react';

import {Form, Row, Col, Input, Button, Select} from 'antd';
import {formatFormDateRange} from 'utils';
import ConInput from 'components/ConInput';
import ConSelect from 'components/ConSelect';
import ConRangePicker from 'components/ConRangePicker';

import styles from './index.less';

@Form.create()

class Search extends React.Component {
  state = {};

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
    let param = {};
    this.props.form.validateFields((err, values) => {
      for (const key in values) {
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

    const {form} = this.props;

    const formItemLayout = {
      labelCol: {sm: {span: 8}},
      wrapperCol: {sm: {span: 16}},
    };

    return (
      <div className="search-body">
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >

          <Row gutter={24}>
            <Col span={6}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="hash"
                label="存证哈希值"
                placeholder="存证哈希值"
              />
            </Col>
            <Col span={6}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="category"
                label="区块类型"
                placeholder="区块类型"
              />
            </Col>
            <Col span={8}>
              <ConRangePicker
                form={form}
                formItemLayout={formItemLayout}
                id="createTime"
                label="存证时间"
                placeholder="存证时间"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="search-footer">
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{marginLeft: 8}} onClick={this.handleReset}>清空</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Search;
