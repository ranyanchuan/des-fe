import React from 'react';

import { Form, Row, Col, Input, Button, Select } from 'antd';

import Domain from 'components/Domain';
import Category from 'components/Category';
import Tag from 'components/Tag/news';
import DateCon from 'components/DateCon';
import ConInput from 'components/ConInput';
import ConSelect from 'components/ConSelect';
import ConRangePicker from 'components/ConRangePicker';

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
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 19 } },
    };


    return (
      <div className={styles.newSearch}>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >

          <Row gutter={24}>


            <Col span={8}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="ip"
                label="ip"
                placeholder="ip"
              />

            </Col>

            <Col span={8}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="ip"
                label="用户id"
                placeholder="请输入用户id"
              />
            </Col>


            <Col span={8}>
              <ConSelect
                form={form}
                formItemLayout={formItemLayout}
                id="category"
                label="类型"
                placeholder="请选择类型"
                data={[
                  { id: '0', value: '待处理' },
                  { id: '1', value: '已封停' },
                  { id: '2', value: '已解封' },
                  { id: '3', value: '不处理' },
                ]}
                optionKey={"id"}
                optionValue={"value"}
              />
            </Col>




            <Col span={8}>
              <ConRangePicker
                form={form}
                formItemLayout={formItemLayout}
                id="date"
                label="创建时间"
                // placeholder="请输入创建时间"
              />
            </Col>


          </Row>


          {/*<Row>*/}
          {/*<Col span={8}>*/}
          {/*<Form.Item*/}
          {/*{...formItemLayout}*/}
          {/*label="标题"*/}
          {/*>*/}
          {/*{getFieldDecorator('title')(*/}
          {/*<Input placeholder="请输入标题"/>,*/}
          {/*)}*/}
          {/*</Form.Item>*/}
          {/*</Col>*/}
          {/*<Col span={8}>*/}
          {/*<DateCon formItemLayout={formItemLayout} form={form}/>*/}
          {/*</Col>*/}

          {/*<Col span={8}>*/}
          {/*<Tag formItemLayout={formItemLayout} form={form}/>*/}
          {/*</Col>*/}
          {/*</Row>*/}


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

export default Search;
