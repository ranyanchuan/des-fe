import React from 'react';
import { Form, Badge, message, Spin } from 'antd';
import { request } from 'utils/request';
import { formData } from 'utils/index';


import styles from './index.less';


@Form.create()

class ConTableState extends React.Component {
  // const {onClick}=

  state = {
    loading: false,
  };

  // 获取
  updStateService = (payload) => {
    const { url } = this.props;
    return request(url, {
      method: 'POST',
      body: formData(payload),
    });
  };

  onUpdState = async () => {
    let { record, onSuccess, field } = this.props;
    let payload = { ...record };
    payload[field] = record[field] === '禁用' ? '启用' : '禁用';
    this.setState({ loading: true });
    let { code, data, info } = await this.updStateService(payload);
    this.setState({ loading: false });
    if (code == '200') {
      onSuccess();
      message.success(info);
    } else {
      message.error(info);
    }
  };


  render() {
    const { loading } = this.state;
    const { record, field = 'state' } = this.props;
    let red = <Badge color="red" text="禁用" className={styles.badge} onClick={this.onUpdState}/>;
    let green = <Badge color="green" text="启用" className={styles.badge} onClick={this.onUpdState}/>;
    return <Spin size="small" spinning={loading}>{record[field] === '禁用' ? red : green}</Spin>;
    // todo
    // return record[field];

  }
}

export default ConTableState;
