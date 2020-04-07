/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { DatePicker, Form } from 'antd';
import moment from 'moment';

import styles from './index.less';

@Form.create()

class ConDate extends React.Component {


  onChange = (date) => {
    const {
      onChange,
      otherSelectData,
      ruleDate = 'YYYY-MM-DD HH:mm:ss',
    } = this.props; //otherData 用于解决表格行编辑带上其他参数

    if (onChange) {
      const data = date ? date.format(ruleDate) : '';
      this.props.onChange(data, otherSelectData);
    }
  };


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
      label = '',
      id = 'date',
      message = '请选择日期',
      placeholder = '请选择日期',
      validator,
      disabledDate,
      disabledTime,
      formItemStyle,
      formItemClass,
    } = this.props;

    let rules = [
      { required, message },
    ];
    if (validator) {
      rules.push({ validator });
    }


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
            initialValue: defValue ? moment(defValue) : null,
            rules,
            onChange: this.onChange,
          })(
            <DatePicker
              disabled={disabled}
              style={{ width: '100%' }}
              placeholder={placeholder}
              disabledDate={disabledDate}
              disabledTime={disabledTime}
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConDate;
