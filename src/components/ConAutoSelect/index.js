/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, AutoComplete, Select, Input } from 'antd';

import styles from './index.less';

@Form.create()

class ConAutoSelect extends React.Component {
  render() {
    const { formItemLayout,id,label, form, defValue, disabled = false, required, placeholder, message,data } = this.props;
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
            <AutoComplete
              placeholder={placeholder}
              disabled={disabled}
              style={{ width: '100%' }}
              dataSource={data}
              filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConAutoSelect;
