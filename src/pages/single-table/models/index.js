import * as services from '../services';

export default {
  namespace: 'productAppModel',

  state: {

    appData: {
      rows: [],
      pageNumber: 0,
      total: 0,
      pageSize: 20,

    },
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

    //  分页查询
    * getApp({ payload, callback }, { call, put, select }) {
      const { data } = yield call(services.getApp, payload);
      if (data) {
        yield put({ type: 'updateState', res: { appData: data } });
      }
      if (callback) {
        callback(data);
      }
    },

    // 添加App
    * addApp({ payload, callback }, { call, put, select }) {
      const data = yield call(services.addApp, payload);
      if (callback) {
        callback(data);
      }
    },


    // 删除App
    * delApp({ payload, callback }, { call, put, select }) {
      const data = yield call(services.delApp, payload);
      if (callback) {
        callback(data);
      }
    },


    // 获取App信息
    * getAppInfo({ payload, callback }, { call, put, select }) {
      const data = yield call(services.getAppInfo, payload);
      if (callback) {
        callback(data);
      }
    },

  },


};

