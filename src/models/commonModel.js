import * as commonService from '../services/commonService';

export default {
  namespace: 'commonModel',
  state: {},


  reducers: {

    updateState(state, {res}) { //更新state
      return {
        ...state,
        ...res,
      };
    },
  },


  effects: {

    // 添加用户
    * addUser({payload, callback}, {call, put, select}) {
      const {data} = yield call(commonService.addUser, payload);
      if (callback) {
        callback(data);
      }
    },

    // 修改密码
    * updUser({payload, callback}, {call, put, select}) {
      const {data} = yield call(commonService.updUser, payload);
      if (callback) {
        callback(data);
      }
    },

    // 用户登录
    * login({payload, callback}, {call, put, select}) {
      const data= yield call(commonService.login, payload);
      if (callback) {
        callback(data);
      }
    },
    // 用户退出
    * logout({payload, callback}, {call, put, select}) {
      const {data} = yield call(commonService.logout, payload);
      if (callback) {
        callback(data);
      }
    },
  },

};

