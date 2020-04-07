/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Input } from 'antd';

@Form.create()

class ConPassword extends React.Component {
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
      message,
      placeholder,
      validateFirst = false,
      addonAfter,
      validator,

    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
        >
          {getFieldDecorator(id, {
            rules: [
              { required, message },
              { validator },
              {
                min: 6,
                message: '密码不能少于6个字符',
              },
            ],
            initialValue: defValue,
            validateFirst,
          })(
            <Input.Password
              placeholder={placeholder}
              disabled={disabled}
              type={type}
              addonAfter={addonAfter}
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConPassword;
