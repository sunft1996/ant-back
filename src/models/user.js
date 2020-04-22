import {
  query as queryUsers,
  queryCurrent,
  queryAuthority,
  addUser,
  updatePwd,
  queryMsg,
  resetUserPwd,
  updateUser,
  deleteUser,
} from '@/services/user';
import { notification } from 'antd';
import router from 'umi/router';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    Authority: {},
    avatar: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUsers, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent({ payload }, { call, put }) {
      const response = yield call(queryCurrent, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
      if (response.data.passwordStatus === '0') {
        notification.info({
          message: '首次登陆，请修改登陆密码！',
        });
        router.push('/EditPassword');
      }
    },
    *fetchAuthority({ payload }, { call, put }) {
      const response = yield call(queryAuthority, payload);
      yield put({
        type: 'saveAuthority',
        payload: response,
      });
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
      return response;
    },
    *sendMsg({ payload, callback }, { call }) {
      const response = yield call(queryMsg, payload.mobile);
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
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      if (callback) callback();
    },
    *changePwd({ payload }, { call, put }) {
      const response = yield call(updatePwd, payload);
      if (response.code === 'SUCCESS') {
        yield put({
          type: 'save',
          payload: response.data,
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
    },

    *remove({ payload }, { call, put }) {
      const response = yield call(deleteUser,  payload);
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
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateUser, payload);
      if (response.code === 'SUCCESS') {
        // 判断是否是用户详情页触发的修改信息
        if (payload.notDetail) {
          const newFetch = yield call(queryUsers, {
            pageNo: 1,
            pageSize: 10,
          });
          yield put({
            type: 'save',
            payload: newFetch,
          });
        } else {
          const newFetch = yield call(queryCurrent, payload.encryptionId);
          yield put({
            type: 'saveCurrentUser',
            payload: newFetch,
          });
        }
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
      if (callback) callback();
    },
    *avatar({ payload, callback }, { put }) {
      yield put({
        type: 'saveAvatar',
        payload,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveAvatar(state, action) {
      return {
        ...state,
        avatar: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload.data || {},
      };
    },
    saveAuthority(state, action) {
      return {
        ...state,
        Authority: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
