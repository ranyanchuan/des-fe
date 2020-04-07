import * as services from '../services';

export default {
  namespace: 'treeCardModel',
  state: {
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
    // 添加
    * add({ payload, callback }, { call, put, select }) {
      const data = yield call(services.add, payload);
      if (callback) {
        callback(data);
      }
    },

    // 删除
    * del({ payload, callback }, { call, put, select }) {
      const data = yield call(services.del, payload);
      if (callback) {
        callback(data);
      }
    },

  },

};
