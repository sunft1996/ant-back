/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2019-12-18 16:59:47
 * @LastEditTime: 2020-04-27 11:33:24
 */
import { queryRoles, saveOrUpdateRoles, removeRoles, queryNotRootRoles } from '@/services/role';
import { notification } from 'antd';

export default {
  namespace: 'role',

  state: {
    list: [{
      menuId: ''
    }],
    loading: true
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryRoles);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'loading',
        payload: false
      });
    },
    *add({ payload }, { call, put }) {
      yield put({
        type: 'loading',
        payload: true
      });
      const response = yield call(saveOrUpdateRoles, payload);
      if (response.code === 'SUCCESS') {
        const newFetch = yield call(queryRoles, {});
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
        payload: false
      });
      return response;
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRoles, payload);
      if (response.code === 'SUCCESS') {
        const newFetch = yield call(queryRoles, {});
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
      yield put({
        type: 'loading',
        payload: true
      });
      const response = yield call(saveOrUpdateRoles, payload);
      if (response.code === 'SUCCESS') {
        const newFetch = yield call(queryRoles, {});
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
        payload: false
      });
      if (callback) callback();
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
  },
};
