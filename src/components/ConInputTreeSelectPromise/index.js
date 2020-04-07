import React from 'react';
import { Form, TreeSelect, Spin, Select } from 'antd';
import { request } from 'utils/request';
import { formData ,connectTree} from 'utils/index';

const { SHOW_PARENT, SHOW_ALL } = TreeSelect;


@Form.create()

class ConInputTreeSelectPromise extends React.Component {

  state = {
    defValue: '',
    loading: false,
    treeData: [],
  };

  // todo 默认值没有找到， 会一直往下找
  async componentDidMount() {
    const { defValue, onRef, payload } = this.props;
    this.setState({ defValue });

    if (onRef) {
      this.props.onRef(this);
    }
    this.setState({ loading: true });
    let { data } = await this.treeService(payload);
    let treeData = [];
    // 兼容接口
    if (data) {
      treeData = Array.isArray(data) ? data : data.rows;
    }
    this.setState({ treeData, loading: false });
  }


  async componentWillReceiveProps(nextProps) {
    const { defValue, isLoadingData, payload, form, id } = nextProps;
    if (isLoadingData && payload && (JSON.stringify(payload) !== JSON.stringify(this.props.payload))) {
      this.setState({ loading: true });
      let { data } = await this.treeService(payload);
      // 兼容接口
      let treeData = Array.isArray(data) ? data : data.rows;
      this.setState({ treeData, loading: false });
    }
    if (defValue && defValue !== this.props.defValue) { // 参照级联
      this.setState({ defValue });
      form.setFieldsValue({ [id]: defValue.split(',') });
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
    this.setState({ defValue: keys ? keys.toString() : '' });
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
          return item.props ? item.props.dataRef : {};
        });
      } else {
        selectResult.push(props.dataRef);
      }
      this.props.onSelect(selectResult);
    }
  };

  getTreeSelect = () => {
    return this.state.defValue;

  };


  changeTreeData = (data) => {

    const { treeOptionId = 'id', treeOptionTitle = 'title' } = this.props;

    if (!Array.isArray(data)) {
      return data;
    }
    return data.map(item => {
      let { children, hasChild } = item;

      let result = {};

      if (children && Array.isArray(children) && children.length > 0) {
        result.children = this.changeTreeData(children);
      }

      //  todo 优化
      if (hasChild) {
        result.isLeaf = false;
      }
      result.value = item[treeOptionId];
      result.key = item[treeOptionId].toString();
      result.title = item[treeOptionTitle];
      result.dataRef = item;
      return result;
    });
  };


  onLoadData = async (treeNode) => {

    if (treeNode && treeNode.props && treeNode.props.value) {
      this.setState({ loading: true });
      const id= treeNode.props.value;
      let { data } = await this.treeService({ pid:id});
      // 兼容接口
      let newData = Array.isArray(data) ? data : data.rows;
      const { treeData } = this.state;

      this.setState({
        treeData: [...connectTree(treeData, newData, id)],
        loading: false
      });
    }

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
      autoClearSearchValue = true,
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
      loadData: this.onLoadData,
      focus: this.onFocus,
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
            initialValue: defValue ? defValue.split(',') : [],
          })(
            <TreeSelect
              notFoundContent={loading ? <Spin size="small"/> : null}
              {...tProps}
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConInputTreeSelectPromise;
