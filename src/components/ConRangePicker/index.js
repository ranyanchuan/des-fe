
import React from 'react';
import { DatePicker, Form } from 'antd';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';


import styles from './index.less';


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


@Form.create()

class ConDate extends React.Component {

  render() {
    const { formItemLayout, defValue, disabled, form, required = false, label = '日期', id = 'date', message = '请选择日期', placeholder = '请选择日期' } = this.props;
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
          })(
            <RangePicker disabled={disabled} style={{ width: '100%' }} locale={locale}/>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConDate;
