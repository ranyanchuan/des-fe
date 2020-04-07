import React from 'react';
import { Form, InputNumber } from 'antd';

@Form.create()

class ConInputNumberPercent extends React.Component {
  render() {
    const {
      formItemLayout = {
        labelCol: { sm: { span: 6 } },
        wrapperCol: { sm: { span: 18 } },
      },
      defValue=null,
      disabled,
      form,
      required = false,
      label,
      id,
      message,
      placeholder,
      min,
      max,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
        >
          {getFieldDecorator(id, {
            rules: [{ required, message }],
            initialValue: defValue,
          })(
            <InputNumber
              placeholder={placeholder}
              disabled={disabled}
              min={min}
              max={max}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              style={{ width: '100%' }}
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConInputNumberPercent;
