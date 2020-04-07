import React from "react";
import {Table, Popconfirm, Form, Divider,} from 'antd';
import {Resizable} from 'react-resizable';

import ConInput from 'components/ConInput';
import ConSelect from 'components/ConSelect';
import ConDate from 'components/ConDate';
import ConTime from 'components/ConTime';
import ConTextArea from 'components/ConTextArea';
import ConInputNumber from 'components/ConInputNumber';
import ConSelectPromise from 'components/ConSelectPromise';
import {formatFormDate} from 'utils';

import styles from './index.less';

let formatRule = 'YYYY-MM-DD HH:mm:ss';
let timeRule = 'HH:mm:ss';

// 表头拖拽
const ResizeableTitle = props => {
  const {onResize, width, ...restProps} = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{enableUserSelectHack: false}}
    >
      <th {...restProps} />
    </Resizable>
  );
};


const EditableContext = React.createContext();


class EditableCell extends React.Component {

  renderCell = (form) => {
    const {
      editing,
      dataIndex,
      title,
      inputType = 'Input',
      record,
      index,
      children,
      placeholder,
      conAttr = {}, // 参照属性
      ...restProps
    } = this.props;


    let componentObj = null;
    if (editing) {
      componentObj = {
        'Input': (
          <ConInput
            {...conAttr}
            form={form}
            id={dataIndex}
            defValue={record[dataIndex]}
            formItemClass={styles.editFromCon}
            placeholder={placeholder}
          />),
        'InputNumber': (
          <ConInputNumber
            {...conAttr}
            form={form}
            id={dataIndex}
            defValue={record[dataIndex]}
            formItemClass={styles.editFromCon}
          />),
        "Select": (
          <ConSelect
            {...conAttr}
            form={form}
            id={dataIndex}
            defValue={record[dataIndex]}
            formItemClass={styles.editFromCon}
          />
        ),
        "Date": (
          <ConDate
            {...conAttr}
            form={form}
            id={dataIndex}
            defValue={record[dataIndex]}
            formItemClass={styles.editFromCon}
          />
        ),
        "TimePicker": (
          <ConTime
            {...conAttr}
            form={form}
            id={dataIndex}
            defValue={record[dataIndex]}
            formItemClass={styles.editFromCon}
          />
        ),
        "TextArea": (
          <ConTextArea
            {...conAttr}
            form={form}
            id={dataIndex}
            defValue={record[dataIndex]}
            formItemClass={styles.editFromCon}
          />
        ),
        "ConSelectPromise": (
          <ConSelectPromise
            {...conAttr}
            form={form}
            isLoadingData={true}
            id={dataIndex}
            defValue={record[dataIndex]}
            formItemClass={styles.editFromCon}
          />
        ),

      }
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


class EditableTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editingKey: '',
      columns: [], // 表格李
    };
  }

  componentDidMount() {
    const {dataSource, columns} = this.props;
    this.setState({data: dataSource, columns});
  }

  componentWillReceiveProps(nextProps) {
    const {dataSource} = nextProps;
    if (JSON.stringify(dataSource) !== JSON.stringify(this.props.dataSource)) {
      this.setState({data: dataSource});
    }
  }

  action = {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record) => {

      const {rowKey = 'id'} = this.props;

      const {editingKey} = this.state;
      const editable = this.isEditing(record);

      return editable ? (
        <span>
              <EditableContext.Consumer>
                {form => (
                  <a onClick={() => this.save(form, record[rowKey])}>保存</a>
                )}
              </EditableContext.Consumer>
               <Divider type="vertical"/>
              <Popconfirm
                title="确定取消吗?"
                okText="确定"
                cancelText="取消"
                onConfirm={() => this.cancel(record[rowKey])}
              >
                <a>取消</a>
              </Popconfirm>
            </span>
      ) : (
        <span>
            <a disabled={editingKey !== ''} onClick={() => this.edit(record[rowKey])}>编辑</a>
            <Divider type="vertical"/>
            <a disabled={editingKey !== ''} onClick={() => this.edit(record[rowKey])}>删除</a>
            </span>
      );
    },
  }

  // 判断当前行为行编辑
  isEditing = (record) => {
    const {rowKey = 'id'} = this.props;
    return record[rowKey] === this.state.editingKey
  };

  cancel = () => {
    this.setState({editingKey: ''});
  };

  save(form, key) {

    const {rowKey = 'id', columns, onSave} = this.props;

    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      let newRow = {...row};
      //  参照和日期处理
      for (let col of columns) {
        const {dataIndex, inputType} = col;
        if (['ConSelectPromise'].includes(inputType)) { // 参照处理
          newRow[dataIndex] = row[dataIndex].toString();
        }

        if (['Date'].includes(inputType)) { // 日期
          newRow[dataIndex] = row[dataIndex] ? row[dataIndex].format(formatRule) : '';
        }
        if (['TimePicker'].includes(inputType)) { // 时间
          newRow[dataIndex] = row[dataIndex] ? row[dataIndex].format(timeRule) : '';
        }
      }

      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item[rowKey]);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...newRow,
        });
        this.setState({data: newData, editingKey: ''});
      } else {
        newData.push(newRow);
        this.setState({data: newData, editingKey: ''});
      }

      // todo 走后端 api
      if (onSave) {
        onSave(newData[index]);
      }

    });
  }

  edit(key) {
    this.setState({editingKey: key});
  }

  //-------表头拖拽
  handleResize = index => (e, {size}) => {
    const minWidth = 60;
    this.setState(({columns}) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width > minWidth ? size.width : minWidth,
      };
      return {columns: nextColumns};
    });
  };

  components = {
    header: {
      cell: ResizeableTitle,
    },
  };


  render() {

    const {data} = this.state;
    const components = {
      body: {  // 表格行编辑
        cell: EditableCell,
      },
      header: { // 表头拖拽
        cell: ResizeableTitle,
      },
    };

    let columns = this.state.columns.map((col, index) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        ellipsis: (col.ellipsis !== false ? true : false),
        onCell: record => ({ // 表体Cell
          ...col,
          record,
          editing: this.isEditing(record),
        }),
        onHeaderCell: column => ({ // 表头Cell
          width: column.width || 100,
          onResize: this.handleResize(index),
        }),
      };
    });

    columns.push(this.action);
    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
          size={'small'}
          scroll={{x: 'max-content'}}
          // scroll={{x: '130%'}}

        />
      </EditableContext.Provider>
    );
  }
}

export default Form.create()(EditableTable);
