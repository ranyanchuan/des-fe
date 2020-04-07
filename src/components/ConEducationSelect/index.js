/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Select } from 'antd';
import { uuid } from 'utils';

const Option = Select.Option;

@Form.create()

class ConEducationSelect extends React.Component {
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
      label='学历',
      id,
      message="请选择学历",
      placeholder = '请选择学历',
      mode,
    } = this.props;
    const { getFieldDecorator } = form;

    const data = ['专科及以下', '本科', '硕士研究生', '博士研究生', '博士后', '院士'];

    const children = [];
    for (const item of data) {
      children.push(<Option key={uuid()} value={item}>{item}</Option>);
    }

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
            <Select placeholder={placeholder}
                    disabled={disabled}
                    mode={mode}
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

export default ConEducationSelect;
