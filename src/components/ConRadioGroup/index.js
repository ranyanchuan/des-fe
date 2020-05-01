
import React from 'react';
import { Radio } from 'antd';

class ConRadioGroup extends React.Component {


  render() {
    const {
      onClickAdd,
      onClickRefresh,
      onClickDel,
      onClickExport,
      onClickSet,
      defaultValue = 'add',
    } = this.props;

    // todo 添加按钮权限

    return (
      <div className="table-header-btn">
        <Radio.Group value={defaultValue}>
          {onClickAdd &&
          <Radio.Button value="add" onClick={() => onClickAdd()}>添加</Radio.Button>
          }
          {onClickDel &&
          <Radio.Button value="del" onClick={() => onClickDel()}>删除</Radio.Button>
          }
          {onClickRefresh &&
          <Radio.Button value="refresh" onClick={() => onClickRefresh()}>刷新</Radio.Button>
          }
          {onClickExport &&
          <Radio.Button value="export" onClick={() => onClickExport()}>导出</Radio.Button>
          }
          {onClickSet &&
          <Radio.Button value="set" onClick={() => onClickSet()}>设置</Radio.Button>
          }

        </Radio.Group>
      </div>
    );
  }
}

export default ConRadioGroup;
