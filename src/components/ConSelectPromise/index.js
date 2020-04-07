/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import {Form, Select, Spin} from 'antd';
import {request} from 'utils/request';
import {formData, uuid} from 'utils/index';

const Option = Select.Option;

@Form.create()

class ConSelectPromise extends React.Component {

  state = {
    defValue: '',
    loading: false,
    tableData: [],
  };

  async componentDidMount() {
    const {defValue, onRef, payload} = this.props;
    this.setState({defValue});
    if (onRef) {
      this.props.onRef(this);
    }
    let {data} = await this.tableService(payload);
    let tableData = [];
    // let tableData = [
    //   {id: '1', title: '111111'},
    //   {id: '2', title: '222222'},
    //   {id: '3', title: '333333'},
    //   {id: '4', title: '444444'},
    //   {id: '5', title: '555555'},
    // ];
    // 兼容接口
    if (data) {
      tableData = Array.isArray(data) ? data : data.rows;
    }
    this.setState({tableData});
  }


  async componentWillReceiveProps(nextProps) {
    const {defValue, isLoadingData, payload, form, id} = nextProps;
    if (isLoadingData && payload && (JSON.stringify(payload) !== JSON.stringify(this.props.payload))) {
      let {data} = await this.tableService(payload);
      // 兼容接口
      let tableData = Array.isArray(data) ? data : data.rows;
      // let tableData = [
      //   {id: '1', title: '111111'},
      //   {id: '2', title: '222222'},
      //   {id: '3', title: '333333'},
      //   {id: '4', title: '444444'},
      //   {id: '5', title: '555555'},
      // ];
      this.setState({tableData});
    }
    if (defValue && defValue !== this.props.defValue) { // 参照级联
      this.setState({defValue});
      form.setFieldsValue({[id]: defValue.split(',')});
    }
  }


  // 获取
  tableService = (payload = {}) => {
    const {url} = this.props;
    return request(url, {
      method: 'POST',
      body: formData(payload),
    });

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


  getTableSearchData = async (value) => {
    const {
      isSearchBe = true, // 是否后端搜索
      payload,
      optionTitle,
    } = this.props;

    if (isSearchBe) {
      this.setState({loading: true});
      let {data} = await this.tableService({...payload, [optionTitle]: value});
      let tableData = [];
      if (data) {
        tableData = Array.isArray(data) ? data : data.rows;       // 兼容接口
      // let  tableData = [
      //     // {id: '1', title: '111111'},
      //     // {id: '2', title: '222222'},
      //     {id: '3', title: '333333'},
      //     {id: '4', title: '444444'},
      //     {id: '5', title: '555555'},
      //   ];
      }
      this.setState({tableData, loading: false});
    }
  };

  onSearchTable = (value) => {
    let debounceAjax = this.debounce(this.getTableSearchData, 500);
    debounceAjax(value);
  };

  onChangeTable = (keys, nodes) => {
    this.setState({ defValue: keys ? keys.toString() : '' });
  };

  getTreeSelect = () => {
    return this.state.defValue;
  };

  onSelectTable = (selectedKeys, param) => {
    const {onSelect} = this.props;
    if (param.props && onSelect) {
      const {dataref} = param.props;
      this.props.onSelect(dataref);
    }
  };


  render() {

    const {loading, tableData} = this.state;
    const {
      formItemLayout = {
        labelCol: {sm: {span: 6}},
        wrapperCol: {sm: {span: 18}},
      },
      defValue,
      disabled,
      form,
      required = false,
      label,
      id,
      message,
      placeholder,
      mode,
      optionId = 'id',
      optionTitle = 'title',
      allowClear = true,
      showSearch = true,
      filterOption = false,
      formItemStyle,
      formItemClass,
    } = this.props;
    const {getFieldDecorator} = form;

    return (

      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
          style={formItemStyle}
          className={formItemClass}
        >
          {getFieldDecorator(id, {
            rules: [{required, message}],
            initialValue: defValue ? defValue.split(',') : [],
          })(
            <Select placeholder={placeholder}
                    disabled={disabled}
                    mode={mode}
                    showSearch={showSearch}
                    allowClear={allowClear}
                    filterOption={filterOption}
                    onSearch={this.onSearchTable}
                    onChange={this.onChangeTable}
                    onSelect={this.onSelectTable}
                    notFoundContent={loading ? <Spin size="small"/> : null}
                    style={{width: '100%'}}
            >
              {tableData && tableData.map(item => {
                  return <Option key={item.id} value={item[optionId]} dataref={item}>{item[optionTitle]}</Option>;
                },
              )}
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConSelectPromise;
