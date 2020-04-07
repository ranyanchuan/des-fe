import React from 'react';
import { Form, InputNumber } from 'antd';

@Form.create()

class ConInputNumberMoney extends React.Component {

  // inputNumber 输入框 onChange 事件
  onChange = (data) => {
    const { onChange, otherSelectData } = this.props; //otherData 用于解决表格行编辑带上其他参数
    if (onChange) {
      this.props.onChange(data, otherSelectData);
    }
  };


  render() {
    const {
      formItemLayout = {
        labelCol: { sm: { span: 6 } },
        wrapperCol: { sm: { span: 18 } },
      },
      defValue = null,
      disabled,
      form,
      required = false,
      label,
      id,
      message,
      placeholder,
      min,
      max,
      formatter = /\B(?=(\d{3})+(?!\d))/g,
      parser = /￥\s?|(,*)/g,
      precision,
      formItemStyle,
      formItemClass,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
          style={formItemStyle}
          className={formItemClass}
        >
          {getFieldDecorator(id, {
            rules: [{ required, message }],
            initialValue: defValue,
            onChange: this.onChange,
          })(
            <InputNumber
              placeholder={placeholder}
              disabled={disabled}
              min={min}
              max={max}
              precision={precision}
              formatter={value => `￥ ${value}`.replace(formatter, ',')}
              parser={value => value.replace(parser, '')}
              style={{ width: '100%' }}
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConInputNumberMoney;
