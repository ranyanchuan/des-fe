/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Select } from 'antd';
import { uuid } from 'utils';


const Option = Select.Option;

@Form.create()

class ConSelect extends React.Component {
  render() {
    const {
      formItemLayout = {
        labelCol: { sm: { span: 6 } },
        wrapperCol: { sm: { span: 18 } },
      },
      defValue,
      disabled,
      form,
      required = false,
      label,
      id,
      message,
      placeholder,
      data = [],
      mode,
      optionKey = 'id',
      optionValue = 'value',
      allowClear=true,
      formItemStyle,
      formItemClass,
    } = this.props;
    const { getFieldDecorator } = form;

    const children = [];
    for (const item of data) {
      if (item[optionValue]) {
        children.push(<Option key={uuid()} value={item[optionKey]}>{item[optionValue]}</Option>);
      } else {
        children.push(<Option key={uuid()} value={item}>{item}</Option>);
      }

    }


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
          })(
            <Select placeholder={placeholder}
                    disabled={disabled}
                    mode={mode}
                    allowClear={allowClear}
                    style={{ width: '100%' }}
            >
              {children}
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConSelect;
