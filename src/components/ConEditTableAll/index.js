import React from 'react';
import { Table, Popconfirm, Form, Divider, message, Button, Spin, Modal } from 'antd';
import { Resizable } from 'react-resizable';

import ConInput from 'components/ConInput';
import ConSelect from 'components/ConSelect';
import ConDate from 'components/ConDate';
import ConTime from 'components/ConTime';
import ConTextArea from 'components/ConTextArea';
import ConInputNumber from 'components/ConInputNumber';
import ConSelectPromise from 'components/ConSelectPromise';
import ConInputTreeSelectPromise from 'components/ConInputTreeSelectPromise';
import ConInputNumberMoney from 'components/ConInputNumberMoney';
import UploadFile from 'components/UploadFile';


import { formatFormDate, uuid, downloadFile, deepCopy } from 'utils';

import styles from './index.less';

const confirm = Modal.confirm;


// 表头拖拽
const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }


  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};


const EditableContext = React.createContext();


class EditableCell extends React.Component {

  renderCell = (form) => {
    let {
      editing,
      dataIndex: id,
      title,
      inputType = 'Input',
      ruleDate = 'YYYY-MM-DD HH:mm:ss',
      ruleTime = 'HH:mm:ss',
      record,
      index,
      children,
      placeholder,
      rowKey, // 当前行的主键
      conAttr = {}, // 参照属性
      ...restProps
    } = this.props;

    let dataIndex = id + '_' + rowKey;

    let componentObj = null;
    if (editing) {
      componentObj = {
        'Input': (
          <ConInput
            {...conAttr}
            form={form}
            id={dataIndex}
            defValue={record[id]}
            formItemClass={styles.editFromCon}
            placeholder={placeholder}
            otherSelectData={{ record, index, rowKey, id }}
          />),


        'InputNumber': (
          <ConInputNumber
            {...conAttr}
            form={form}
            id={dataIndex}
            defValue={record[id]}
            formItemClass={styles.editFromCon}
            otherSelectData={{ record, index, rowKey, id }}
          />),

        'InputNumberMoney': (
          <ConInputNumberMoney
            {...conAttr}
            form={form}
            id={dataIndex}
            defValue={record[id]}
            formItemClass={styles.editFromCon}
            otherSelectData={{ record, index, rowKey, id }}
          />),


        'Select': (
          <ConSelect
            {...conAttr}
            form={form}
            id={dataIndex}
            defValue={record[id]}
            formItemClass={styles.editFromCon}
            otherSelectData={{ record, index, rowKey, id }}

          />
        ),
        'Date': (
          <ConDate
            {...conAttr}
            form={form}
            id={dataIndex}
            defValue={record[id]}
            formItemClass={styles.editFromCon}
            ruleDate={ruleDate}
            otherSelectData={{ record, index, rowKey, id }}
          />
        ),
        'TimePicker': (
          <ConTime
            {...conAttr}
            form={form}
            id={dataIndex}
            defValue={record[id]}
            formItemClass={styles.editFromCon}
            ruleTime={ruleTime}
            otherSelectData={{ record, index, rowKey, id }}

          />
        ),
        'TextArea': (
          <ConTextArea
            {...conAttr}
            form={form}
            id={dataIndex}
            defValue={record[id]}
            formItemClass={styles.editFromCon}
            otherSelectData={{ record, index, rowKey, id }}

          />
        ),
        'ConSelectPromise': (
          <ConSelectPromise
            {...conAttr}
            form={form}
            isLoadingData={true}
            id={dataIndex}
            defValue={record[id]}
            formItemClass={styles.editFromCon}
            otherSelectData={{ record, index, rowKey, id }}
          />
        ),
        'ConInputTreeSelectPromise': (
          <ConInputTreeSelectPromise
            {...conAttr}
            form={form}
            isLoadingData={true}
            id={dataIndex}
            defValue={record[id]}
            formItemClass={styles.editFromCon}
            otherSelectData={{ record, index, rowKey, id }}
          />
        ),

      };
    }

    return (
      <td {...restProps}>
        {editing ? componentObj[inputType] : children}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}


const initSelect = {
  selectedRowKeys: [], // 多选框选中 下标
  selectedRowObj: [], // 多选框选中 对象
};


class EditableTableAll extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...initSelect,
      cacheDelData: [],
      data: [],
      columns: [], // 表格
      tableStatus: 'view', // 表格状态 view  add  edit
      editingKeys: [],

    };
  }

  componentDidMount() {
    const { dataSource, columns, onRef } = this.props;
    this.setState({ data: dataSource, columns });

    // 在父组件上绑定子组件方法
    if (onRef) {
      onRef(this);
    }

  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps;
    if (JSON.stringify(dataSource) !== JSON.stringify(this.props.dataSource)) {
      const temp = {
        cacheDelData: [],
        tableStatus: 'view', // 表格状态 view  add  edit
        editingKeys: [],
      };
      this.setState({ data: dataSource, ...initSelect, ...temp });
    }
  }


  // 判断当前行为行编辑
  isEditing = (record) => {
    const { rowKey = 'id' } = this.props;
    const { editingKeys } = this.state;
    return editingKeys.includes(record[rowKey]);
  };

  // 更新当前表格行数据， 一般用于参照 editingKey 必须传值
  updateRowData = (index, row) => {
    let data = [...this.state.data];
    data[index] = row;
    this.setState({ data });
  };

  // 获取指定字段的值
  getFieldValue = (key) => {
    return this.props.form.getFieldValue(key);
  };

  // 设置字段的值
  setFieldsValue = (data) => {
    return this.props.form.setFieldsValue(data);
  };

  // 获取子表状态
  getTableStatus = (key) => {
    return this.state[key];
  };


  // 添加行
  onAdd = () => {
    const id = uuid();
    const { onAddRecord, rowKey = 'id' } = this.props;
    let record = { [rowKey]: id, _add_tag: true }; // _add_tag 添加标签
    if (onAddRecord) { // 是否添加行回调
      record = onAddRecord();
    }
    const { data, editingKeys } = this.state;
    this.setState({ data: [record, ...data], editingKeys: [id, ...editingKeys], tableStatus: 'add', ...initSelect });
  };


  // 批量修改
  onEdit = () => {
    const { rowKey = 'id' } = this.props;
    const { data, editingKeys } = this.state;

    // 展示编辑态
    const keys = data.map(item => item[rowKey]);
    const newKeys = Array.from(new Set([...editingKeys, ...keys]));

    // 更新 表单
    const editKeyArr = [];
    for (let item of this.state.columns) { // 获取 dataIndex
      if (item.editable) {
        editKeyArr.push(item.dataIndex);
      }
    }
    this.setState({ editingKeys: newKeys, ...initSelect, tableStatus: 'edit' });

  };


  // 前端数据删除
  onDel = () => {

    const { rowKey = 'id' } = this.props;
    const { cacheDelData, selectedRowKeys, selectedRowObj, data, tableStatus } = this.state;
    if (selectedRowKeys.length > 0) {
      const newData = data.filter((item, index) => !selectedRowKeys.includes(item[rowKey]));
      this.setState({ // 删除数据缓存
        cacheDelData: [...cacheDelData, ...selectedRowObj],
        data: newData,
        ...initSelect,
        tableStatus: tableStatus === 'edit' ? 'edit' : 'add',
      });

      //


    } else {
      message.warning('未选中数据');
    }
  };


  // 导出
  onExpdp = () => {
    const { exportUrl, exportTitle } = this.props;
    downloadFile(exportTitle, exportUrl);
  };


  // 多选框操作
  onSelectChange = (selectedRowKeys, selectedRowObj) => {
    this.setState({ selectedRowKeys, selectedRowObj });
  };


  // 取消
  onReload = () => {
    const { dataSource } = this.props;
    const temp = {
      cacheDelData: [],
      tableStatus: 'view', // 表格状态 view  add  edit
      editingKeys: [],
    };

    this.setState({ data: dataSource, ...initSelect, ...temp });
  };


  // 取消操作弹框确认，重新获取数据
  onCancel = () => {
    const _this = this;
    confirm({
      title: '数据为保存，你确定离开吗',
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        // 重新加载数据
        _this.onReload();
      },
      onCancel() {
        console.log('取消');
      },
    });
  };


  // 保存
  onSubmit = () => {

    const { data, cacheDelData } = this.state;
    const { rowKey, onSave } = this.props;
    let newData = null;

    this.props.form.validateFields((error, row) => {
      if (error) {
        message.error('请正确录入信息');
        return;
      }
      newData = [];


      // 将要更新的数据
      newData = deepCopy(data).map((item) => {
        if (item._add_tag) {
          delete item[rowKey];
        }
        return item;
      });

      // 将要删除的数据
      for (const item of cacheDelData) {
        if (!item._add_tag) {
          item.dr = 1;
          newData.push(item);
        }
      }

      if (onSave) { // 保存
        onSave(newData);
        return;
      }
    });

    return newData;
  };

  //-------表头拖拽
  handleResize = index => (e, { size }) => {
    const minWidth = 60;
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width > minWidth ? size.width : minWidth,
      };
      return { columns: nextColumns };
    });
  };

  render() {

    const { data, tableStatus, selectedRowKeys } = this.state;
    const {
      rowKey = 'id',
      pagination,
      scroll = { x: 'max-content' },
      disabled, // 按钮 status
      uploadAction = '',// 文件上传 url
      uploadData, // 文件上传其他参数
      uploadAddSuccess,
      addBtnShow = true,  // 添加按钮
      delBtnShow = true,  // 删除按钮
      updBtnShow = true,  // 更新按钮
      uplBtnShow = true,  // 上传按钮
      saveBtnShow = true,  // 上传按钮
      canBtnShow = true,  // 取消按钮
      expBtnShow = true, // 导出按钮
      allBtnShow = true, // 所有按钮
      onChange,// 表格分页


    } = this.props;


    const rowSelection = {
      ...this.props.rowSelection,
      selectedRowKeys,
      onChange: this.onSelectChange,
    };


    const components = {
      body: {  // 表格行编辑
        cell: EditableCell,
      },
      header: { // 表头拖拽
        cell: ResizeableTitle,
      },
    };


    let columns = this.state.columns.map((col, index) => {
      // if (!col.editable) {
      //   return col;
      // }
      return {
        ...col,
        // ellipsis,
        onCell: (record, rowIndex) => {
          let temp = { // 表体Cell
            ...col,
            record,
          };

          if (col.editable) { // 行编辑参数
            temp.editing = this.isEditing(record);
          }

          temp.index = rowIndex; // 被编辑的行参数
          temp.rowKey = data[rowIndex][rowKey]; // 编辑行的主键
          return temp;
        },
        onHeaderCell: column => ({ // 表头Cell
          width: column.width || 100,
          onResize: this.handleResize(index),
        }),
      };
    });

    return (

      <div>
        <div className="table-operations">

          {addBtnShow && allBtnShow &&
          <Button
            disabled={disabled}
            onClick={this.onAdd}>添加</Button>
          }

          {updBtnShow && allBtnShow &&
          <Button
            disabled={data.length < 1 || disabled}
            onClick={this.onEdit}>修改</Button>
          }

          {delBtnShow && allBtnShow &&
          <Button
            onClick={this.onDel}
            disabled={data.length < 1 || disabled}
          >删除</Button>
          }

          {expBtnShow && allBtnShow &&
          <Button onClick={this.onExpdp}>下载模板</Button>
          }


          {uplBtnShow && allBtnShow &&
          <UploadFile
            title={'导入'}
            data={uploadData} // 二外上传的数据
            action={uploadAction}
            accept={'.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'}
            addSuccess={uploadAddSuccess}
            disabled={tableStatus !== 'view' || disabled}
          />
          }


          {tableStatus !== 'view' && saveBtnShow && allBtnShow &&
          <Button
            // disabled={!pid || actionStatus || isView}
            style={{ marginLeft: 8 }}
            onClick={this.onSubmit}>保存</Button>
          }

          {tableStatus !== 'view' && canBtnShow && allBtnShow &&
          <Button
            // disabled={!pid || actionStatus || isView}
            onClick={this.onCancel}>取消</Button>
          }

        </div>


        <EditableContext.Provider value={this.props.form}>
          <Table
            rowKey={record => {
              return record[rowKey].toString();
            }}
            components={components}
            bordered
            dataSource={data}
            columns={columns}
            rowClassName="editable-row"
            pagination={{
              disabled: tableStatus !== 'view',
              ...pagination,
            }}
            rowSelection={rowSelection}
            size={'small'}
            // scroll={{x: 'max-content'}}
            scroll={scroll}
            onChange={onChange}
          />
        </EditableContext.Provider>
      </div>
    );
  }
}

export default Form.create()(EditableTableAll);
