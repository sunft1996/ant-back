import {
  query as queryUsers,
  queryCurrent,
  queryDetail,
  addUser,
  resetUserPwd,
  updateUser,
  deleteUser,
  editPassword
} from '@/services/user';
import { notification } from 'antd';
import router from 'umi/router';

export default {
  namespace: 'user',

  state: {
    list: {
      rows:[]
    },
    currentUser: {},
    Authority: {},
    avatar: {},
    loading: true,
    detail:{}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUsers, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'loading',
        payload: false,
      });
    },
    *fetchDetail({payload}, { call, put }) {
      const response = yield call(queryDetail,payload);
      yield put({
        type: 'saveDetail',
        payload: response.data,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
      if (response.data.passwordStatus === '0') {
        notification.info({
          message: '首次登陆，请修改登陆密码！',
        });
        router.push('/EditPassword');
      }
    },
    *resetPassword({ payload }, { call }) {
      const response = yield call(resetUserPwd, payload);
      if (response.code === 'SUCCESS') {
        notification.success({
          message: response.code,
          description: response.msg,
        });
      } else {
        notification.error({
          message: response.code,
          description: response.msg,
        });
      }
    },
    *add({ payload }, { call, put }) {
      yield put({
        type: 'loading',
        payload: true,
      });
      const response = yield call(addUser, payload);
      if (response.code === 'SUCCESS') {
        const newFetch = yield call(queryUsers, {
          pageNo: 1,
          pageSize: 10,
        });
        yield put({
          type: 'save',
          payload: newFetch,
        });
        notification.success({
          message: response.code,
          description: response.msg,
        });
      } else {
        notification.error({
          message: response.code,
          description: response.msg,
        });
      }
      yield put({
        type: 'loading',
        payload: false,
      });
      return response;
    },

    *remove({ payload, callback }, { call, put }) {
      const response = yield call(deleteUser, payload);
      if (response.code === 'SUCCESS') {
        const newFetch = yield call(queryUsers, {
          pageNo: 1,
          pageSize: 10,
        });
        yield put({
          type: 'save',
          payload: newFetch,
        });
        notification.success({
          message: response.code,
          description: response.msg,
        });
        if (callback) callback();

      } else {
        notification.error({
          message: response.code,
          description: response.msg,
        });
      }
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateUser, payload);
      if (response.code === 'SUCCESS') {
        const newFetch = yield call(queryUsers, {
          pageNo: 1,
          pageSize: 10,
        });
        yield put({
          type: 'save',
          payload: newFetch,
        });
        notification.success({
          message: response.code,
          description: response.msg,
        });
      } else {
        notification.error({
          message: response.code,
          description: response.msg,
        });
      }
      yield put({
        type: 'loading',
        payload: false,
      });
      if (callback) callback();
    },

    *editPassword({ payload, callback }, { call, put }) {
      yield put({
        type: 'loading',
        payload: true,
      });
      const response = yield call(editPassword, payload);
      if (response.code === 'SUCCESS') {
        notification.success({
          message: response.code,
          description: response.msg,
        });
      } else {
        notification.error({
          message: response.code,
          description: response.msg,
        });
      }
      yield put({
        type: 'loading',
        payload: false,
      });
      return response;
    },

  },

  reducers: {
    loading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },

    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    saveDetail(state, action) {
      return {
        ...state,
        detail: action.payload,
      };
    },
  },
};
