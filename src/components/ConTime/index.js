/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, TimePicker } from 'antd';
import moment from 'moment';

const ruleTime = 'HH:mm';

@Form.create()

class ConTime extends React.Component {


  onChange = (date) => {
    const {
      onChange,
      otherSelectData,
      ruleTime = 'HH:mm:ss',
    } = this.props; //otherData 用于解决表格行编辑带上其他参数

    if (onChange) {
      const time = date ? date.format(ruleTime) : '';
      this.props.onChange(time, otherSelectData);
    }
  };


  render() {
    const { formItemLayout, defValue, disabled, form, required = false, label = '时间', id = 'time', message = '请选择时间', placeholder = '请选择时间' } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
        >
          {getFieldDecorator(id, {
            initialValue: defValue ? moment(defValue) : null,
            rules: [{ required, message }],
            onChange: this.onChange,
          })(
            <TimePicker placeholder={placeholder} disabled={disabled} format={ruleTime} style={{ width: '100%' }}/>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConTime;
