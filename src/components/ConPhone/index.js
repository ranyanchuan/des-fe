/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;


@Form.create()

class ConPhone extends React.Component {
  render() {


    const {
      formItemLayout = {
        labelCol: { sm: { span: 6 } },
        wrapperCol: { sm: { span: 18 } },
      },
      defValue = '',
      type,
      disabled,
      form,
      required = false,
      label,
      id,
      message="请输入正确的手机号",
      placeholder="请输入手机号",
    } = this.props;
    const { getFieldDecorator } = form;


    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
        >
          {getFieldDecorator(id, {
            rules: [{ required, message, pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,}],
            initialValue: defValue,
          })(
            <Input addonBefore={prefixSelector} placeholder={placeholder} disabled={disabled} type={type}/>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConPhone;
