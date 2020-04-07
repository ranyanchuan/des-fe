import * as commonService from '../services/commonService';


const initTable = {
  rows: [],
  pageIndex: 0,
  total: 0,
  pageSize: 20,
}

export default {
  namespace: 'commonModel',

  state: {
    menuData: null,
    fileData: { // 文件列表
      ...initTable
    },
    message: 0,
  },


  reducers: {

    updateState(state, {res}) { //更新state
      return {
        ...state,
        ...res,
      };
    },
  },


  effects: {

    // 获取菜单
    * getMenuTree({payload, callback}, {call, put, select}) {

      let {data} = yield call(commonService.getCommonMenuAll, payload);
      let home = {
        id: 'home',
        fileUrl: 'home',
        dirName: '首页',
        dirIcon: 'home',
        closable: false
      };
      yield put({type: 'updateState', res: {menuData: [home, ...data]}});

      if (callback) {
        callback([home, ...data]);
      }

    },

    // 获取菜单
    * getAllMenu({payload, callback}, {call, put, select}) {
      const {data} = yield call(commonService.getCommonMenuAll, payload);
      if (callback) {
        callback(data);
      }
    },

    // 用户退出
    * logout({payload, callback}, {call, put, select}) {
      const data = yield call(commonService.logout, payload);
      if (callback) {
        callback(data);
      }
    },

    // 自动登陆
    * needfileUrl(payload, {call, put, select}) {
      return yield call(commonService.needfileUrl, payload);
    },

    // 保存文件
    * addAttchment({payload, callback}, {call, put, select}) {
      const {data} = yield call(commonService.addAttchment, payload);
      if (callback) {
        callback(data);
      }
    },

    //  分页查询附件
    * getAttchment({payload, callback}, {call, put, select}) {
      const {data} = yield call(commonService.getAttchment, payload);
      console.log("datadata", data);

      let fileData = data ? data : initTable;
      yield put({type: 'updateState', res: {fileData}});
      if (callback) {
        callback(data);
      }
    },

    // 删除文件
    * delAttchment({payload, callback}, {call, put, select}) {
      const {data} = yield call(commonService.delAttchment, payload);
      if (callback) {
        callback(data);
      }
    },

    // 更新用户信息
    * updUser({payload, callback}, {call, put, select}) {
      const data = yield call(commonService.updUser, payload);
      if (callback) {
        callback(data);
      }
    },


    // 获取菜单
    * getMessage({payload, callback}, {call, put, select}) {
      const {data} = yield call(commonService.getMessage, payload);
      yield put({type: 'updateState', res: {message: data}});
      if (callback) {
        callback(data);
      }
    },

    // 获取短信验证码
    * getfileUrl({payload, callback}, {call, put, select}) {
      const data = yield call(commonService.getfileUrl, payload);
      callback(data);
    },


  },

};

