import React from 'react';
import { Form, TreeSelect, Spin } from 'antd';
import { request } from 'utils/request';
import { formData } from 'utils/index';

const { SHOW_PARENT, SHOW_ALL } = TreeSelect;


@Form.create()

class ConTreeSelectPromise extends React.Component {

  state = {
    defValue: '',
    defId: '',
    loading: false,
    treeData: [],
  };

  async componentDidMount() {
    const { defValue, defId, onRef, payload } = this.props;
    this.setState({ defValue, defId });

    if (onRef) {
      this.props.onRef(this);
    }

    let { data } = await this.treeService(payload);
    let treeData = [];
    // 兼容接口
    if (data) {
      treeData = Array.isArray(data) ? data : data.rows;
    }
    this.setState({ treeData });

  }


  async componentWillReceiveProps(nextProps) {
    const { defValue, defId, isLoadingData, payload, form, id } = nextProps;
    if (isLoadingData && payload && (JSON.stringify(payload) !== JSON.stringify(this.props.payload))) {
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
  treeService = (payload = {}) => {
    const { url } = this.props;
    return request(url, {
      method: 'POST',
      body: formData(payload),
    });
  };


  onFocus = () => {
    console.log('onFocusddd');
  };

  //onChange
  onChange = (keys, values, nodes) => {
    this.setState({ defValue: values.toString() });
  };

  debounce = (fn, delay = 3000) => {
    //期间间隔执行 节流
    return (...rest) => { //箭头函数是没有arguments的 所以用...rest 来代替
      let args = rest;
      if (this.state.timerId) clearTimeout(this.state.timerId);//要用this.timerId 而不能直接定义var timerId=null;
      this.state.timerId = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  };

  getTreeSearchData = async (value) => {
    const {
      isSearchBe = true, // 是否后端搜索
      payload,
      treeOptionTitle,
    } = this.props;

    if (isSearchBe) {
      this.setState({ loading: true });
      let { data } = await this.treeService({ ...payload, [treeOptionTitle]: value });
      let treeData = [];
      if (data) {
        treeData = Array.isArray(data) ? data : data.rows;       // 兼容接口
      }
      this.setState({ treeData, loading: false });
    }
  };


  onSearchTree = (value) => {
    let debounceAjax = this.debounce(this.getTreeSearchData, 500);
    debounceAjax(value);
  };


  onSelectTree = (selectedKeys, param) => {

    const { selectedNodes, props } = param;
    if (selectedKeys.length > 0) { // 第二次点击不让取消
      this.setState({ selectedKeys });
    }

    const { onSelect } = this.props;
    if (onSelect) {
      let selectResult = [];
      if (selectedNodes) {
        selectResult = selectedNodes.map((item) => {
          return item.props ? item.props.dataref : {};
        });
      } else {
        selectResult.push(props.dataref);
      }
      this.props.onSelect(selectResult);
    }

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
      map[`${item[key]}(${item[code]})`] = item;
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

    let selectData = setDefValue ? setDefValue.split(',').map(item => obj[item]) : [];
    const { treeOptionOther, treeOptionTitle } = this.props;


    let isFindValue = true; // 防止没有找到key
    for (let item of selectData) {
      if (!item) {
        isFindValue = false;
        break;
      }
    }

    if (isFindValue) { // 如果用户选择了参照才会触发
      const id = [];
      const title = [];
      const other = {};
      // 构造其他字段
      if (treeOptionOther && treeOptionOther.length > 0) {
        for (let item of treeOptionOther) {
          other[item] = [];
        }
      }

      for (let item of selectData) {
        id.push(item.id);
        title.push(item[treeOptionTitle]);
        let arr = Object.keys(other);
        if (arr.length > 0) {
          for (let oth in other) {
            other[oth].push(item[oth]);
          }
        }
      }

      let result = { id: id.toString(), title: title.toString() };
      if (treeOptionOther && Object.keys(other).length > 0) {
        for (let oth in other) {
          result[oth] = other[oth].toString();
        }
      }
      return result;
    } else {
      return { defValue, defId };
    }
  };


  changeTreeData = (data) => {

    const { treeOptionId = 'id', treeOptionTitle = 'title', treeOptionCode = 'code' } = this.props;

    if (!Array.isArray(data)) {
      return data;
    }
    return data.map(item => {
      let { children } = item;
      // let result = { ...item };
      let result = {};
      if (children && Array.isArray(children) && children.length > 0) {
        result.children = this.changeTreeData(children);
      }
      result.value = `${item[treeOptionTitle]}(${ item[treeOptionCode]})`;
      result.key = item[treeOptionId].toString();
      result.title = `${item[treeOptionTitle]}(${ item[treeOptionCode]})`;
      result.dataref = item;
      return result;
    });
  };

  // 去除相同key
  clearEqualKey = (data) => {
    const set = new Set(data.split(','));
    return Array.from(set);
  };


  render() {

    const { treeData, loading } = this.state;
    const formatData = this.changeTreeData(treeData);
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
      placeholder,
      treeCheckable = true,
      autoClearSearchValue = true,
      multiple = false,
      allowClear = true,
    } = this.props;
    const { getFieldDecorator } = form;
    const notFoundContent = loading ? <Spin size="small"/> : null;

    const tProps = {
      ...this.props,
      treeData: formatData,
      // treeData,
      onChange: this.onChange,
      onSelect: this.onSelectTree,
      onSearch: this.onSearchTree,
      treeCheckable,
      focus: this.onFocus,
      multiple,
      showCheckedStrategy: SHOW_ALL,
      searchPlaceholder: placeholder,
      allowClear,
      autoClearSearchValue,
      style: {
        width: '100%',
      },
      notFoundContent,
      dropdownStyle: { maxHeight: 200 },
    };
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
        >
          {getFieldDecorator(id, {
            rules: [{ required, message }],
            initialValue: defValue ? this.clearEqualKey(defValue) : [],
          })(
            <TreeSelect
              {...tProps}
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConTreeSelectPromise;
