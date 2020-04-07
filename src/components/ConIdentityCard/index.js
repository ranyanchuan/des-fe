/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Input } from 'antd';

@Form.create()

class ConIdentityCard extends React.Component {


  checkLength = (rule, value, callback) => {
    if (this.checkIDCard(value)) {
      callback();
    } else {
      callback('请输入正确的身份证号码');
    }
  };

  checkIDCard = (value) => {
    // 加权因子
    const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验码
    const check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    const code = value + '';
    const last = value[17];

    const seventeen = code.substring(0, 17);

    // ISO 7064:1983.MOD 11-2
    // 判断最后一位校验码是否正确
    const arr = seventeen.split('');
    const len = arr.length;
    let num = 0;
    for (let i = 0; i < len; i += 1) {
      num += (arr[i] * weight_factor[i]);
    }

    // 获取余数
    const resisue = num % 11;
    const last_no = check_code[resisue];

    // 格式的正则
    // 正则思路
    /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
    const idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

    // 判断格式是否正确
    const format = idcard_patter.test(value);

    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
    return last === last_no && format;
  };


  render() {
    const {
      formItemLayout = {
        labelCol: { sm: { span: 6 } },
        wrapperCol: { sm: { span: 18 } },
      },
      defValue = null,
      type,
      disabled,
      form,
      required = false,
      label = '身份证号',
      id,
      message = '请输入身份证号',
      placeholder = '请输入身份证号',
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
        >
          {getFieldDecorator(id, {
            rules: [
              {
                required,
                message,
                validator: this.checkLength,
              },
            ],
            initialValue: defValue,
            validateTrigger: 'onBlur',
          })(
            <Input placeholder={placeholder} disabled={disabled} type={type}/>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConIdentityCard;
