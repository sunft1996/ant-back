import { queryBasicProfile } from './service';

const Model = {
  namespace: 'profileBasic',
  state: {
    basicGoods: [],
  },
  effects: {
    *fetchBasic(_, { call, put }) {
      const response = yield call(queryBasicProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },
  reducers: {
    show(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
