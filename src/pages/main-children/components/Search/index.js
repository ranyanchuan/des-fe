import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import ConAutoEmail from 'components/ConAutoEmail';
import ConInput from 'components/ConInput';
import ConSelect from 'components/ConSelect';
import styles from './index.less';

@Form.create()
class Search extends React.Component {
  state = {
    expand: false,
  };

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
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { sm: { span: 8 } },
      wrapperCol: { sm: { span: 16 } },
    };
    return (
      <div className="search-body">
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>
            <Col span={8}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="mingcheng"
                label="姓名"
                placeholder="请输入姓名"
              />
            </Col>
            <Col span={8}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="dianhua"
                label="联系电话"
                placeholder="请输入联系电话"
              />
            </Col>
            <Col span={8}>
              <ConAutoEmail
                form={form}
                formItemLayout={formItemLayout}
                id="email"
                label="邮箱"
                placeholder="请输入邮箱"
              />
            </Col>

            <Col span={8}>
              <ConSelect
                form={form}
                formItemLayout={formItemLayout}
                id="state"
                label="状态"
                placeholder="请选择状态"
                data={['审核通过', '已驳回', '未提交', '审核中']}
              />
            </Col>

          </Row>
          <Row>
            <Col span={24} className="search-footer">
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Search;
