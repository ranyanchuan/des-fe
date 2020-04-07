import {Table} from 'antd';
import React from "react";
import {Resizable} from 'react-resizable';

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

class conTableResizable extends React.Component {
  state = {
    columns: [],
  };

  components = {
    header: {
      cell: ResizeableTitle,
    },
  };


  componentDidMount() {
    const {columns} = this.props;
    this.setState({columns});
  }

  // componentWillReceiveProps(nextProps) {
  //   const {columns} = nextProps;
  //   if (columns && columns !== this.props.columns) {
  //     this.setState({columns});
  //   }
  // }


  handleResize = index => (e, {size}) => {

    const minWidth = 80;
    this.setState(({columns}) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width > minWidth ? size.width : minWidth,
      };
      return {columns: nextColumns};
    });

  };

  render() {

    const {columns} = this.state;
    const tabCols = columns.map((col, index) => ({
      ...col,
      ellipsis: (col.ellipsis !== false ? true : false),
      onHeaderCell: column => ({
        width: column.width || 100,
        onResize: this.handleResize(index),
      }),
    }));

    return (<Table
      bordered
      {...this.props}
      components={this.components}
      columns={tabCols}
    />);
  }
}


export default conTableResizable;
