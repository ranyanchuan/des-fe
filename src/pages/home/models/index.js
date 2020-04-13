import * as services from '../services';

export default {
  namespace: 'homeModel',

  state: {

    appData: {
      rows: [],
      pageNumber: 0,
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
      // const { data } = yield call(services.getBlock, payload);

      const data = {
        rows: [
          {
            "id": "1",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "2",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "3",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "4",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "5",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "6",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "7",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "8",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "9",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "10",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "11",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "12",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "13",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "14",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "15",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "16",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "17",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "18",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "19",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "20",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "21",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "22",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "23",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "24",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "25",
            "cunzhengren": "韩红",
            "cunzhengshuliang": 2,
            "cunzhengleixing": "租房合同",
            "cunzhengshijian": "2020-04-07 11:55:43",
            "qukuaigaodu": "#179236",
            "cunzhenghaxi": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },

        ],
        pageNumber: 1,
        total: 20,
        pageSize: 20,

      };

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

