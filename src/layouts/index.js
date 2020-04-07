import React from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import {Layout, Menu, Tabs, Affix, Icon, Badge, Dropdown, Avatar, BackTop, ConfigProvider} from 'antd';
import {tree2Map} from 'utils';
import zhCN from 'antd/es/locale/zh_CN';
import UpdPhoneModal from 'components/UpdPhoneModal';
import UpdPassModel from 'components/UpdPassModel';

import styles from './index.less';

const {Header, Content, Footer, Sider,} = Layout;
const {SubMenu} = Menu;
const {TabPane} = Tabs;

@connect((state) => ({
  commonModel: state.commonModel,
}))

class BasicLayout extends React.Component {

  state = {
    collapsed: false,
    activeKey: 'home',
    top: 0,
    panes: {
      home: {
        id: 'home',
        fileUrl: 'home',
        dirName: '首页',
        dirIcon: 'home',
        closable: false
      }
    },
    menuInitArray: [],
    updPhoneModalVis: false, // 修改手机号弹框
    updPassModalVis: false, // 修改手机号弹框
  }

  menuMap = null;


  componentDidMount() {
    if (this.props.location.pathname !== '/sign-in') {
      this.getInitInfo();
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  componentWillReceiveProps(nextProps) {
    // 登录页跳转
    if (this.menuMap === null && nextProps.location.pathname !== this.props.location.pathname && nextProps.location.pathname === '/home') {
      this.getInitInfo();
    }
  }


  getInitInfo = () => {
    this.getMenu();
    this.getMessage();
    this.timer = setInterval(
      () => this.getMessage(),
      500000,
    );
  }


  // 获取菜单
  getMenu = (payload = {}) => {
    this.props.dispatch({
      type: 'commonModel/getMenuTree',
      payload,
      callback: (menuInitArray) => {
        // todo 获取菜单
        this.setState({menuInitArray});
        this.menuMap = tree2Map(menuInitArray, 'fileUrl');

        // 打开默认标签
        const {pathname} = this.props.location;
        const url = pathname.replace('/', '');
        let activeKey = url ? url : 'home';
        this.openTab(activeKey, this.menuMap[activeKey]);

      },
    });
  }

  // 获取站内信息
  getMessage = () => {
    this.props.dispatch({
      type: 'commonModel/getMessage',
    });
  };


  onCollapse = collapsed => {
    this.setState({collapsed});
  };

  onChangeTab = (activeKey) => {
    this.setState({activeKey});
    this.goRouter(activeKey); // 路由跳转
  }

  goRouter = (activeKey) => {
    const url = activeKey !== 'home' ? activeKey : 'home';
    router.push(`/${url}`);
  }


  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };


  onClickLeftMenu = (data) => {
    const {key, item} = data;
    if (item.props) {
      const {dataref} = item.props;
      this.openTab(key, dataref)
    }
  }

  openTab = (key, item) => {
    let result = {activeKey: key};
    let {panes} = this.state;
    panes[key] = item;
    result.panes = panes;
    this.setState(result);
    this.goRouter(key);
  }

  remove = targetKey => {
    let {panes} = this.state;
    if (targetKey !== 'home') {
      let proCode = 'home';
      let isFound = false;

      for (let index in panes) {
        const {fileUrl} = panes[index];
        if (isFound) {
          proCode = fileUrl;
          isFound = false;
          break;
        }
        if (fileUrl === targetKey) {
          isFound = true;
        }
        if (!isFound) {
          proCode = fileUrl;
        }
      }

      delete  panes[targetKey];
      this.setState({panes, activeKey: proCode});
      this.goRouter(proCode); // 路由跳转
    }

  };


  // 构建左边menu
  renderMenu = (menuInitArray) => {
    return menuInitArray.map(item => {
      const {fileUrl, children, dirName, dirIcon} = item;
      if (children && children.length > 0) {
        return (
          <SubMenu
            key={fileUrl}
            title={
              <span>
                  <Icon type={dirIcon}/>
                  <span>{dirName}</span>
              </span>
            }
          >
            {this.renderMenu(children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={fileUrl} dataref={item}>
            <Icon type={dirIcon}/>
            <span>{dirName}</span>
          </Menu.Item>
        )
      }
    })
  }

  //
  getTabPane = (panes) => {
    let result = [];
    for (let index in panes) {
      if (panes[index]) {
        const {closable, dirName, fileUrl} = panes[index];
        let tabTiltle = <span style={{marginRight: 5}}>{dirName}</span>
        result.push(
          <TabPane tab={tabTiltle} key={fileUrl} closable={closable}/>)
      }
    }
    return result;
  }


  // 退出
  onLogout = () => {
    this.props.dispatch({
      type: 'commonModel/logout',
      callback: (data) => {
        const {code, info} = data;
        if (code == 200) {
          this.setState({isLogin: true});
          localStorage.clear();
          router.push('/sign-in');
        }
      },
    });
  };


  // 跳转 信息
  onLinkMessage = () => {
    this.setState({pid: 'zhanneixin', menuFileUrl: 'zhanneixin', menuArray: []});
    router.push('/zhanneixin');
  };


  // 更新密码
  onShowPassModal = () => {
    this.setState({updPassModalVis: true});

  };
  // 更新密码
  onHidePassModal = () => {
    this.setState({updPassModalVis: false});
  };

  // 更新手机
  onShowPhoneModal = () => {
    this.setState({updPhoneModalVis: true});
  };

  onHidePhoneModal = () => {
    this.setState({updPhoneModalVis: false});
  };


  render() {

    const {collapsed, activeKey, panes, menuInitArray, updPhoneModalVis, updPassModalVis} = this.state;

    let {message} = this.props.commonModel;


    // 用户信息
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.onShowPassModal}>
          <Icon type="lock"/>&nbsp;&nbsp;修改密码&nbsp;&nbsp;&nbsp;&nbsp;
        </Menu.Item>
        <Menu.Item key="2" onClick={this.onShowPhoneModal}>
          <Icon type="mobile"/>&nbsp;&nbsp;修改手机&nbsp;&nbsp;&nbsp;&nbsp;
        </Menu.Item>
        <Menu.Item key="3" onClick={this.onLogout}>
          <Icon type="logout"/>&nbsp;&nbsp;退出登录&nbsp;&nbsp;&nbsp;&nbsp;
        </Menu.Item>
      </Menu>
    );

    if (this.props.location.pathname === '/sign-in') {
      return <div>{this.props.children}</div>
    }


    return (
      <ConfigProvider locale={zhCN}>
        <div className={styles.basicLayout}>

          <Layout style={{minHeight: '100vh'}}>
            {/*左边菜单*/}
            {/*<Sider*/}
              {/*collapsible*/}
              {/*collapsed={collapsed}*/}
              {/*onCollapse={this.onCollapse}*/}
              {/*className={styles.sider}*/}
            {/*>*/}
              {/*<div className={styles.logo}>*/}
                {/*<a href="">*/}
                  {/*<img*/}
                    {/*src="http://design.yonyoucloud.com/static/tinper-bee/images/favicon.png"*/}
                    {/*alt="logo"/>*/}
                  {/*{!collapsed && <h1>用友网络</h1>}*/}

                {/*</a>*/}
              {/*</div>*/}
              {/*<Menu*/}
                {/*theme="dark"*/}
                {/*defaultSelectedKeys={[activeKey]}*/}
                {/*selectedKeys={[activeKey]}*/}
                {/*onClick={this.onClickLeftMenu}*/}
                {/*mode="inline">*/}
                {/*{this.renderMenu(menuInitArray)}*/}
              {/*</Menu>*/}
            {/*</Sider>*/}


            {/*右边内容*/}
            <Layout>
              <Header className={styles.header}>
                <div>
                  <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={() => {
                      this.setState({
                        collapsed: !collapsed,
                      })
                    }}
                  />
                </div>
                <div className={styles.right}>
                  <Menu
                    // theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['xx']}
                    selectedKeys={['xx']}
                    style={{lineHeight: '64px'}}
                    // onClick={this.onClickNavMenu}
                  >
                    <Menu.Item key='bell'>
                      <Badge count={message} onClick={this.onLinkMessage}>
                        <Icon type="bell" className={styles.message}/>
                      </Badge>
                    </Menu.Item>
                    <Menu.Item key='user' style={{padding: 0}}>
                      <Dropdown overlay={menu} placement="bottomCenter">
                    <span>
                    <Icon type="user"/>{localStorage.getItem('loginName')}
                    </span>
                      </Dropdown>
                    </Menu.Item>
                  </Menu>
                </div>
              </Header>

              {/*内容*/}
              <Content>

                {/*<Affix offsetTop={this.state.top}>*/}
                  {/*<Tabs*/}
                    {/*hideAdd*/}
                    {/*onChange={this.onChangeTab}*/}
                    {/*activeKey={this.state.activeKey}*/}
                    {/*type="editable-card"*/}
                    {/*onEdit={this.onEdit}*/}
                    {/*// style={{height:38}}*/}
                    {/*className={styles.tabPage}*/}
                    {/*// size="small"*/}
                  {/*>*/}
                    {/*{panes && this.getTabPane(panes)}*/}
                  {/*</Tabs>*/}
                {/*</Affix>*/}
                <div className={styles.tabContent}>
                  {this.props.children}
                  <BackTop visibilityHeight={50}/>
                </div>

              </Content>
              <Footer style={{textAlign: 'center'}}>用友网络 ©2018 Created by yonyou</Footer>
            </Layout>
          </Layout>


          {/*修改手机*/}
          <UpdPhoneModal
            visible={updPhoneModalVis}
            onClose={this.onHidePhoneModal}

          />

          <UpdPassModel
            visible={updPassModalVis}
            onClose={this.onHidePassModal}
          />

        </div>
      </ConfigProvider>

    );
  }
}

export default BasicLayout;


