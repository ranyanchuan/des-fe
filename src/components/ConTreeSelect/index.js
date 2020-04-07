import React from 'react';
import { Form, TreeSelect } from 'antd';

const { SHOW_PARENT, SHOW_ALL } = TreeSelect;


@Form.create()

class ConTreeSelect extends React.Component {





  render() {
    
    const {
      formItemLayout = {
        labelCol: { sm: { span: 6 } },
        wrapperCol: { sm: { span: 18 } },
      },
      defValue,
      data = [],
      form,
      required = false,
      label,
      id,
      message,
      placeholder,
      onChange,
      treeCheckable = true,
      autoClearSearchValue = true,
      multiple = false,
      allowClear=false,
    } = this.props;
    const { getFieldDecorator } = form;

    const tProps = {
      ...this.props,
      treeData: data,
      onChange,
      treeCheckable,
      multiple,
      showCheckedStrategy: SHOW_ALL,
      searchPlaceholder: placeholder,
      allowClear,
      autoClearSearchValue,
      style: {
        width: '100%',
      },
    };
    return (
      <div>

        <Form.Item
          {...formItemLayout}
          label={label}
        >
          {getFieldDecorator(id, {
            rules: [{ required, message }],
            initialValue: defValue ? defValue.split(',') : [],

          })(
            <TreeSelect
              {...tProps}
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConTreeSelect;
