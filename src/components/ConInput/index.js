/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Input } from 'antd';

@Form.create()

class ConInput extends React.Component {


  onChange = (event) => {

    const { onChange, otherSelectData } = this.props; //otherData 用于解决表格行编辑带上其他参数
    if (onChange) {
      this.props.onChange(event.target.value, otherSelectData);
    }
  };


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
            <Input placeholder={placeholder} disabled={disabled} type={type}/>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConInput;
