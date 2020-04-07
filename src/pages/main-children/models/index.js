import * as services from '../services';
export default {
  namespace: 'operationZhuanjiaModel',
  state: {
    zhuanjiaData: {
      rows: [],
      pageIndex: 0,
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
    * getZhuanjia({ payload, callback }, { call, put, select }) {
      const { data } = yield call(services.getZhuanjia, payload);
      if (data) {
        yield put({ type: 'updateState', res: { zhuanjiaData: data } });
      }
      if (callback) {
        callback(data);
      }
    },

    // 添加Zhuanjia
    * addZhuanjia({ payload, callback }, { call, put, select }) {
      const data = yield call(services.addZhuanjia, payload);
      if (callback) {
        callback(data);
      }
    },

    // 删除Zhuanjia
    * delZhuanjia({ payload, callback }, { call, put, select }) {
      const data = yield call(services.delZhuanjia, payload);
      if (callback) {
        callback(data);
      }
    },

    // 获取Zhuanjia信息
    * getZhuanjiaInfo({ payload, callback }, { call, put, select }) {
      const data = yield call(services.getZhuanjiaInfo, payload);
      if (callback) {
        callback(data);
      }
    },
  },

};
