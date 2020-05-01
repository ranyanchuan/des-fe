import * as services from '../services';

export default {
  namespace: 'homeModel',

  state: {

    appData: {
      rows: [],
      pageNumber: 1,
      total: 0,
      pageSize: 20,

    },
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

    //  获取区块
    * getData({payload, callback}, {call, put, select}) {
      const { data } = yield call(services.getBlock, payload);
      if (data) {
        yield put({type: 'updateState', res: {appData: data}});
      }
      if (callback) {
        callback(data);
      }
    },


    // 添加区块
    * addData({payload, callback}, {call, put, select}) {
      const data = yield call(services.addBlock, payload);
      if (callback) {
        callback(data);
      }
    },

  },


};

