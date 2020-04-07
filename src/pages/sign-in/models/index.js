import * as loginService from '../services';

export default {
  namespace: 'loginModel',

  state: {
    identityUrl: '',
  },


  reducers: {

    updateState(state, { res }) { //更新state
      return {
        ...state,
        ...res,
      };
    },
  },


  effects: {


    * getyz({ payload, callback }, { call, put, select }) {
      const identityUrl = yield call(loginService.getyz, payload);
      callback(identityUrl);

    },

    * addLogin({ payload, callback }, { call, put, select }) {
      const data = yield call(loginService.addLogin, payload);
      if (callback) callback(data);
      // yield put({ type: 'updateState', res: { identityUrl } });

    },

    // 自动登陆
    * needCode({ payload, callback }, { call, put, select }) {
      const data = yield call(loginService.needCode, payload);
      callback(data);
    },

    // 获取短信验证码
    * getCode({ payload, callback }, { call, put, select }) {
      const data = yield call(loginService.getCode, payload);
      callback(data);
    },


  },


};

