import React from 'react';
import {Form, Divider} from 'antd';

@Form.create()

class ConTableStateAction extends React.Component {

  render() {

    const {record, field = 'state', onShowModal, showDelCon, isState = true} = this.props;
    const textObj = ['已驳回', '未提交'];

    return (
      <span>
          {textObj.includes(record[field]) || (!isState) ? <a onClick={() => onShowModal('edit', record)}>编辑</a> : '编辑'}
        <Divider type="vertical"/>
          <a onClick={() => onShowModal('desc', record)}>查看</a>
          <Divider type="vertical"/>
        {textObj.includes(record[field]) || (!isState) ? <a onClick={() => showDelCon(record)}>删除</a> : '删除'}
        </span>
    );

  }
}

export default ConTableStateAction;
