import * as services from '../services';

export default {
  namespace: 'findModel',

  state: {

    blockData: {
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

    //  分页查询
    * getData({payload, callback}, {call, put, select}) {
      // const { data } = yield call(services.getBlock, payload);

      const data = {
        rows: [
          {
            "id": "c391c2a2-7a70-11ea-aacc-e6acab52990c",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "2",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "3",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "4",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "5",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "6",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "7",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "8",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "9",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "10",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "11",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "12",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "13",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "14",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "15",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "16",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "17",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "18",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "19",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "20",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "21",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "22",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "23",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "24",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },
          {
            "id": "25",
            "userName": "韩红",
            "cunzhengshuliang": 2,
            "category": "租房合同",
            "createTime": "2020-04-07 11:55:43",
            "height": "#179236",
            "hash": "42ed34f1488d25879cd737ad69be4af0193b908ff31f6eaca290b5e02b702832"
          },

        ],
        pageNumber: 1,
        total: 20,
        pageSize: 20,

      };


      if (data) {
        yield put({type: 'updateState', res: {blockData: data}});
      }
      if (callback) {
        callback(data);
      }
    },

  },


};

