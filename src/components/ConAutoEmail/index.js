/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, AutoComplete, Input } from 'antd';

import styles from './index.less';

const { Option } = AutoComplete;


@Form.create()

class ConAutoEmail extends React.Component {


  state = {
    result: [],
  };

  handleSearch = value => {
    let result;
    if (!value || value.indexOf('@') >= 0) {
      result = [];
    } else {
      result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    }
    this.setState({ result });
  };

  render() {
    const {
      formItemLayout = {
        labelCol: { sm: { span: 6 } },
        wrapperCol: { sm: { span: 18 } },
      },
      id,
      label,
      form,
      defValue,
      disabled = false,
      required,
      placeholder,
      message,
    } = this.props;
    const { getFieldDecorator } = form;
    const { result } = this.state;
    const children = result.map(email => <Option key={email}>{email}</Option>);


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
              onSearch={this.handleSearch}
              style={{ width: '100%' }}
            >
              {children}
            </AutoComplete>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConAutoEmail;
