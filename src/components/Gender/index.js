/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Form, Select } from 'antd';
import { uuid } from 'utils';

const Option = Select.Option;


@Form.create()

class Gender extends React.Component {
  render() {
    const { formItemLayout, form, required = false } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label="性别"
        >
          {getFieldDecorator('gender',
            { rules: [{ required, message: '请选择性别' }] },
          )(
            <Select placeholder="请选择性别">
              <Option value="">请选择</Option>
              <Option value="male">男</Option>
              <Option value="female">女</Option>
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default Gender;
