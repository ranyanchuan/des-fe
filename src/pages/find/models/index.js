import * as services from '../services';

export default {
  namespace: 'findModel',

  state: {

    blockData: {
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

    //  分页查询
    * getData({payload, callback}, {call, put, select}) {
      const {data} = yield call(services.getBlock, payload);
      if (data) {
        yield put({type: 'updateState', res: {blockData: data}});
      }
      if (callback) {
        callback(data);
      }
    },

  },


};

