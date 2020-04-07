import React from 'react';
import { Form, AutoComplete } from 'antd';

const AutoCompleteOption = AutoComplete.Option;

@Form.create()

class ConWebsite extends React.Component {

  state = {
    autoCompleteResult: [],
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net', '.cn'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
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
    } = this.props;
    const { autoCompleteResult } = this.state;
    const { getFieldDecorator } = form;

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
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
              disabled={disabled}
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder={placeholder}
            >
              {/*<Input placeholder/>*/}
            </AutoComplete>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConWebsite;
