import React from 'react';
import { Form, Divider } from 'antd';

@Form.create()

class ConCTableStateAction extends React.Component {

  render() {
    const { record, field = 'state', onShowModal } = this.props;
    const textObj = ['已驳回', '未提交'];

    return (
      <span>
          {textObj.includes(record[field]) ? <a onClick={() => onShowModal('edit', record)}>编辑</a> : '编辑'}
        <Divider type="vertical"/>
          <a onClick={() => onShowModal('desc', record)}>查看</a>
        </span>
    );

  }
}

export default ConCTableStateAction;
