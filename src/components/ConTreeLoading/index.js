/* eslint-disable import/first */
import React from 'react';

import { Tree, Modal, Spin } from 'antd';
import { request } from 'utils/request';
import { formData, connectTree } from 'utils/index';
import styles from './index.less';

const { TreeNode } = Tree;

class ConTreeLoading extends React.Component {

  state = {
    loading: false,
    treeData: [],
    selectedKeys: [],
  };


  async componentDidMount() {

    const { onRef, treeId, onSelect } = this.props;
    this.setState({ loading: true });
    let { data = [] } = await this.treeService();
    let temp = { loading: false };

    let treeData = Array.isArray(data) ? data : data.rows;
    temp.treeData = treeData;
    if ( Array.isArray(treeData) && treeData.length > 0) {
      temp.selectedKeys = [treeData[0][treeId]];
    }
    if (onSelect) { // 选中事件
      this.props.onSelect([treeData[0]]);
    }
    if (onRef) { // 是否父调用子
      this.props.onRef(this);
    }
    this.setState(temp);
  }


  // 获取
  treeService = async (payload) => {
    const { url } = this.props;
    this.isLoading(true);
    const result = await request(url, {
      method: 'POST',
      body: formData(payload),
    });
    this.isLoading(false);
    return result;
  };

  // 更新 树节点
  updateLoad = async (param) => {
    this.setState({ loading: true });
    let { data } = await this.treeService(param);
    let { treeData } = this.state;
    this.setState({
      treeData: [...connectTree(treeData, data, param.pid)], loading: false,
    });
  };

  onLoadData = treeNode =>
    new Promise(async resolve => {
      const { id } = treeNode.props ? treeNode.props.dataref : {};
      this.setState({ loading: true });
      const { data } = await this.treeService({ pid: id });
      const { treeData } = this.state;
      this.setState({
        treeData: [...connectTree(treeData, data, id)], loading: false,
      });
      resolve();
    });

  onSelectTree = (selectedKeys, param) => {

    const { selectedNodes } = param;
    if (selectedKeys.length > 0) { // 第二次点击不让取消
      this.setState({ selectedKeys });
    }

    const { onSelect } = this.props;
    if (onSelect) {
      let selectResult = selectedNodes.map((item) => {
        return item.props ? item.props.dataref : {};
      });
      this.props.onSelect(selectResult);
    }

  };


  isLoading = (loading) => {
    const { onLoading } = this.props;
    if (onLoading) {
      onLoading(loading);
    }
  };


  renderTreeNodes = (data) => {
    const { treeTitle, treeId } = this.props;

    return data.map(item => {
      // let item = { ...treeItem };
      if (item.hasChild || (item.children && item.children.length > 0)) {
        item.children = item.children ? item.children : [];
        return (
          <TreeNode title={item[treeTitle]} key={item[treeId]} dataref={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item[treeTitle]} key={item[treeId]} isLeaf={true} dataref={item}/>;
    });
  };


  render() {

    const { loading, treeData, selectedKeys } = this.state;
    const { onLoading } = this.props;
    return (
      <div>
        <Spin spinning={onLoading ? false : loading}>
          <div style={{ width: '100%', minHeight: 500 }}>
            {treeData && treeData.length > 0 &&
            <Tree loadData={this.onLoadData}
                  showLine
                  selectedKeys={selectedKeys}
                  onSelect={this.onSelectTree}
            >{this.renderTreeNodes([...treeData])}</Tree>
            }
          </div>
        </Spin>
      </div>

    );
  }
}

export default ConTreeLoading;
