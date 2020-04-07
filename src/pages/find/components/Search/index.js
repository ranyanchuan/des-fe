import React from 'react';
import {Form, Row, Col, Button} from 'antd';
import ConSelect from 'components/ConSelect';
import ConInput from 'components/ConInput';
import ConRangePicker from 'components/ConRangePicker';




const ruleDate = 'YYYY-MM-DD HH:mm:ss';


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

        if (key === 'createtime' && values[key]) {  // 日期处理
          param[key] = values[key].map(item => item.format(ruleDate)).toString();
          continue;
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

    const {form} = this.props;
    const formItemLayout = {
      labelCol: {sm: {span: 7}},
      wrapperCol: {sm: {span: 17}},
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
                id="version"
                label="版本号"
                placeholder="请输入版本号"
              />
            </Col>

            <Col span={6}>
              <ConSelect
                form={form}
                formItemLayout={formItemLayout}
                id="type"
                label="APP类型"
                placeholder="请选择属性"
                data={[
                  {id: '0', value: 'IOS'},
                  {id: '1', value: 'ANDROID'},
                ]}
              />
            </Col>
            <Col span={6}>
              <ConSelect
                form={form}
                formItemLayout={formItemLayout}
                id="isupdate"
                label="强制更新"
                placeholder="请选择是否更新"
                data={[
                  {id: '0', value: '否'},
                  {id: '1', value: '是'},
                ]}
              />
            </Col>

            <Col span={6}>
              <ConRangePicker
                form={form}
                formItemLayout={formItemLayout}
                id="createtime"
                label="添加时间"
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
