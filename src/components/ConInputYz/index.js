/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Input } from 'antd';
import styles from './index.less';

@Form.create()

class ConInputYz extends React.Component {

  state = {
    codeNum: 0,
  };

  // 获取验证数据
  getyz = () => {
    const { codeNum } = this.state;
    this.setState({ codeNum: codeNum + 1 });
  };

  render() {

    const {
      formItemLayout = {
        labelCol: { sm: { span: 6 } },
        wrapperCol: { sm: { span: 18 } },
      },
      defValue = '',
      form,
      size,
      required = true,
      label='验证码',
      id = 'codeTxt',
      message = '请输入验证码',
      placeholder = '请输入验证码',
    } = this.props;

    const { codeNum } = this.state;

    const { getFieldDecorator } = form;
    return (
      <div>

        <Form.Item
          {...formItemLayout}
          label={label}>
          {getFieldDecorator(id, {
            rules: [{ required, message }],
            initialValue: defValue,
          })(
            <Input size={size}
                   suffix={<img className={styles.identityImg} src={`login/getyz?name=${codeNum + 1}`}
                                alt="验证码"
                                onClick={this.getyz}/>}
                   placeholder={placeholder}/>,
          )}
        </Form.Item>

      </div>
    );
  }
}

export default ConInputYz;
