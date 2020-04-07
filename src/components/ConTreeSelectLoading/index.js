import React from 'react';
import { Col, Form, TreeSelect } from 'antd';
import { request } from 'utils/request';
import { formData, connectTree } from 'utils/index';

@Form.create()

class ConTreeSelectLoading extends React.Component {

  state = {
    defValue: '',
    defId: '',
    treeData: [],
  };

  async componentDidMount() {
    const { defValue, defId, onRef, payload } = this.props;
    this.setState({ defValue, defId });
    if (onRef) {
      this.props.onRef(this);
    }

    let { data } = await this.treeService(payload);
    // 兼容接口
    if (data) {
      let treeData = Array.isArray(data) ? data : data.rows;
      this.setState({ treeData });
    }

  }

  async componentWillReceiveProps(nextProps) {

    const { defValue, defId, payload, url, isLoading, form, id } = nextProps;
    if (isLoading && payload && (JSON.stringify(payload) !== JSON.stringify(this.props.payload))) {
      this.setState({ treeData: [] });
      let { data } = await this.treeService(payload);
      // 兼容接口
      let treeData = Array.isArray(data) ? data : data.rows;
      this.setState({ treeData });
    }
    if (defId && defId !== this.props.defId) { // 参照级联
      this.setState({ defValue, defId });
      form.setFieldsValue({ [id]: defValue });
    }
  }


  // 获取
  treeService = async (payload = {}) => {
    const { url } = this.props;
    return request(url, {
      method: 'POST',
      body: formData(payload),
    });
  };

  //onChange
  onChange = (keys, values, nodes) => {
    this.setState({ defValue: values.toString() });
  };


  tree2Map = (data) => {
    const { treeOptionId = 'id', treeOptionTitle = 'title', treeOptionCode = 'code' } = this.props;
    let map = {};
    this.treeMap(data, map, treeOptionTitle, treeOptionId, treeOptionCode);
    return map;
  };


  treeMap = (data, map, key, value, code) => {
    if (!Array.isArray(data)) {
      return data;
    }
    for (let item of data) {
      let { children } = item;
      map[`${item[key]}(${item[code]})`] = item[value];
      if (children) {
        this.treeMap(children, map, key, value, code);
      }
    }
    return map;
  };

  getTreeSelect = () => {

    const { treeData, defValue, defId } = this.state;
    let obj = this.tree2Map(treeData);
    const set = new Set(defValue.split(','));
    let setDefValue = (Array.from(set)).toString();

    let id = setDefValue ? setDefValue.split(',').map(item => obj[item]).toString() : '';
    if (id) {
      return { id: id, title: setDefValue };
    }
    return { id: defId, title: defValue };

  };

  onSelectTree = (selectedKeys, param) => {
    const { selectedNodes } = param;
    const { onSelect } = this.props;

    if (onSelect && param.props) {
      const { dataref } = param.props;
      this.props.onSelect(dataref);
    }

  };


  onLoadData = treeNode =>
    new Promise(async resolve => {
      const { payload } = this.props;
      const { id } = treeNode.props;
      const { data } = await this.treeService({ pid: id, ...payload });
      const { treeData } = this.state;
      this.setState({
        treeData: [...connectTree(treeData, data, id)],
      });
      resolve();
    });


  changeTreeData = (data) => {

    const { treeOptionPid = 'pid', treeOptionId = 'id', treeOptionTitle = 'title', treeOptionCode = 'code' } = this.props;

    if (!Array.isArray(data)) {
      return data;
    }
    return data.map(item => {
      let { children, hasChild } = item;
      // let result = { ...item };
      let result = {};
      if (children && Array.isArray(children) && children.length > 0) {
        result.children = this.changeTreeData(children);
      }
      if (!hasChild) {
        result.isLeaf = true;
      }
      result.value = `${item[treeOptionTitle]}(${ item[treeOptionCode]})`;
      result.id = item[treeOptionId].toString();
      result.pid = item[treeOptionPid].toString();
      result.title = `${item[treeOptionTitle]}(${ item[treeOptionCode]})`;
      result.dataref = item;
      return result;
    });
  };

  render() {
    const {
      formItemLayout = {
        labelCol: { sm: { span: 6 } },
        wrapperCol: { sm: { span: 18 } },
      },
      defValue,
      form,
      required = false,
      label,
      id,
      message,
      disabled,
      placeholder = '请选择',
      allowClear = true,
    } = this.props;
    const { getFieldDecorator } = form;
    const { treeData } = this.state;
    const formatData = this.changeTreeData(treeData);

    return (
      <div>

        <Form.Item
          {...formItemLayout}
          label={label}
        >
          {getFieldDecorator(id, {
            rules: [{ required, message }],
            initialValue: defValue ? defValue.split(',') : [],

          })(
            <TreeSelect
              treeDataSimpleMode
              style={{ width: '100%' }}
              // value={defValue}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder={placeholder}
              loadData={this.onLoadData}
              treeData={formatData}
              allowClear={allowClear}
              onChange={this.onChange}
              onSelect={this.onSelectTree}
              disabled={disabled}

            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConTreeSelectLoading;
