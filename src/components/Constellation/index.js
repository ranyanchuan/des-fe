/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Select } from 'antd';

const Option = Select.Option;

@Form.create()

class Constellation extends React.Component {
  render() {
    const { formItemLayout, defValue,disabled, form, required = false } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label="星座"
        >
          {getFieldDecorator('constellation',

            {
              rules: [{ required, message: '请选择星座' }],
              initialValue: defValue,
            },
          )(
            <Select placeholder="请选择星座" disabled={disabled}>
              <Option value="白羊座">白羊座</Option>
              <Option value="金牛座">金牛座</Option>
              <Option value="双子座">双子座</Option>
              <Option value="巨蟹座">巨蟹座</Option>
              <Option value="狮子座">狮子座</Option>
              <Option value="处女座">处女座</Option>
              <Option value="天秤座">天秤座</Option>
              <Option value="天蝎座">天蝎座</Option>
              <Option value="人马座">人马座</Option>
              <Option value="山羊座">山羊座</Option>
              <Option value="水瓶座">水瓶座</Option>
              <Option value="双鱼座">双鱼座</Option>
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default Constellation;
