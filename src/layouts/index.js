import React from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import {Layout, Menu, Divider, Icon, Dropdown, BackTop, ConfigProvider} from 'antd';
import {tree2Map} from 'utils';
import zhCN from 'antd/es/locale/zh_CN';
import UpdPassModel from 'components/UpdPassModel';
import LoginModal from 'components/LoginModal';
import RegisterModal from 'components/RegisterModal';

import styles from './index.less';

const {Header, Content, Footer, Sider,} = Layout;

@connect((state) => ({
  commonModel: state.commonModel,
}))

class BasicLayout extends React.Component {

  state = {
    collapsed: false,
    menuInitArray: [],
    updPassModalVis: false, // 修改密码弹框
    loginModalVis: false, // 登录弹框
    registerModalVis: false, // 注册弹框
  }


  componentDidMount() {

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
          router.push('/find');
        }
      },
    });
  };


  // 显示弹框
  onShowModal = (key) => {
    this.setState({[key]: true});

  };
  // 隐藏弹框
  onHideModal = (key) => {
    this.setState({[key]: false});
  };


  render() {

    const {updPassModalVis, loginModalVis, registerModalVis} = this.state;
    const userCode = localStorage.getItem("userCode");
    // 用户信息
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.onShowPassModal}>
          <Icon type="lock"/>&nbsp;&nbsp;修改密码&nbsp;&nbsp;&nbsp;&nbsp;
        </Menu.Item>
        <Menu.Item key="3" onClick={this.onLogout}>
          <Icon type="logout"/>&nbsp;&nbsp;退出登录&nbsp;&nbsp;&nbsp;&nbsp;
        </Menu.Item>
      </Menu>
    );


    return (
      <ConfigProvider locale={zhCN}>
        <div className={styles.basicLayout}>

          {/*右边内容*/}
          <Layout>
            <Header className={styles.header}>
              <div>
                <Menu
                  // theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['xx']}
                  selectedKeys={['xx']}
                  style={{lineHeight: '64px'}}
                  // onClick={this.onClickNavMenu}
                >

                  <Menu.Item key='find' style={{padding: 0}}>
                    首页
                  </Menu.Item>
                  <Menu.Item key='home' style={{padding: 0}}>
                    用户信息
                  </Menu.Item>
                </Menu>
              </div>

              <div className={styles.right}>
                {/*登录态*/}
                {userCode &&
                <Menu
                  // theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['xx']}
                  selectedKeys={['xx']}
                  style={{lineHeight: '64px'}}
                  // onClick={this.onClickNavMenu}
                >

                  <Menu.Item key='user' style={{padding: 0}}>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <span>
                          <Icon type="user"/>{localStorage.getItem('loginName')}
                        </span>
                    </Dropdown>
                  </Menu.Item>
                </Menu>
                }

                {/*未登录态*/}
                {!userCode &&
                <div>
                  <span className={styles.login} onClick={this.onShowModal.bind(this, 'login')}>登录</span>
                  <Divider type="vertical"/>
                  <span className={styles.login} onClick={this.onShowModal.bind(this, 'register')}>注册</span>
                </div>
                }
              </div>
            </Header>

            {/*内容*/}
            <Content>
              <div className={styles.tabContent}>
                {this.props.children}
                <BackTop visibilityHeight={50}/>
              </div>

            </Content>
            <Footer style={{textAlign: 'center'}}>北京信息科技大学 ©2020 Created by yyan</Footer>
          </Layout>


          {/*修改密码*/}
          <UpdPassModel
            visible={updPassModalVis}
            onClose={this.onHideModal}
          />

          {/*登录弹框*/}
          <LoginModal
            visible={updPassModalVis}
            onClose={this.onHideModal}

          />

          {/*注册弹框*/}
          <RegisterModal
            visible={updPassModalVis}
            onClose={this.onHideModal}
          />


        </div>
      </ConfigProvider>

    );
  }
}

export default BasicLayout;


