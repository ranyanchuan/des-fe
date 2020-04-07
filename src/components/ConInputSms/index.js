/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Form, Input, message } from 'antd';
import { checkError } from 'utils';


import styles from './index.less';

@Form.create()
@connect((state) => ({
  commonModel: state.commonModel,
}))


class ConInputSms extends React.Component {

  state = {
    isCountdown: 0,
  };


  componentDidMount() {
    // 在父组件上绑定子组件方法
    this.props.onRef(this);
  }


  initMsm = () => {
    clearInterval(this.timer);
    this.setState({ isCountdown: 0 });
    this.props.sendCode(true);
  };

  // 获取短信验证码
  getCode = () => {

    const { getPhone } = this.props;
    const payload = getPhone();
    if (payload && payload.staffCode && payload.codeTxt) {
      this.setState({ spinning: true, isCountdown: 60 });
      // 倒计时
      this.countFun();

      this.props.dispatch({
        type: 'commonModel/getCode',
        payload,
        callback: (data) => {
          const temp = { spinning: false };
          if (checkError(data)) {
            // temp.isCountdown = 5;
            console.log('验证码发送成功');
          }
          this.setState(temp);
        },
      });
    }
  };


  countFun = () => {
    this.timer = setInterval(() => {
      const { isCountdown } = this.state;
      //防止倒计时出现负数
      if (isCountdown > 0) {
        this.setState({ isCountdown: isCountdown - 1 });
        this.props.sendCode(false);
      } else {
        // clearInterval(this.timer);
        // this.setState({ isCountdown: 0 });
        // this.props.sendCode(true);
        this.initMsm();
        //倒计时结束时触发父组件的方法
      }
    }, 1000);
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
      required = false,
      label = '短信验证',
      id = 'smscode',
      message = '请输入短信验证码',
      placeholder = '请输入短信验证码',
    } = this.props;

    const { isCountdown } = this.state;

    const { getFieldDecorator } = form;

    const codeInfo = isCountdown ? isCountdown + 's 后重新获取' :
      <span onClick={this.getCode} className={styles.reGetCode}>获取验证码</span>;


    return (
      <div>

        <Form.Item
          {...formItemLayout}
          label={label}>
          {getFieldDecorator(id, {
            rules: [{ required, message }],
            initialValue: defValue,
          })(
            <Form.Item>
              {getFieldDecorator(id, {
                rules: [{ required: true, message }],
              })(<Input size={size} placeholder={placeholder} suffix={codeInfo}/>)}

            </Form.Item>,
          )}
        </Form.Item>

      </div>
    );
  }
}

export default ConInputSms;
