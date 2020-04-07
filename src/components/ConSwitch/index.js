/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Switch } from 'antd';

@Form.create()

class ConSwitch extends React.Component {
  render() {
    const {
      formItemLayout = {
        labelCol: { sm: { span: 6 } },
        wrapperCol: { sm: { span: 18 } },
      },
      defValue = false,
      disabled,
      form,
      required = false,
      label,
      id,
      message,
      checkedChildren = '开',
      unCheckedChildren = '关',
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
            valuePropName: 'checked',
          })(
            <Switch
              disabled={disabled}
              checkedChildren={checkedChildren}
              unCheckedChildren={unCheckedChildren}
              checked={defValue}/>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConSwitch;
