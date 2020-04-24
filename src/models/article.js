/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2019-12-18 16:59:47
 * @LastEditTime: 2020-04-24 18:21:11
 */
import {
  getArticle,deleteArticle,saveOrUpdateArticle,getArticleDetail
} from '@/services/article';
import { notification } from 'antd';

export default {
  namespace: 'article',
  state: {
    list: [],
    current: {
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'loading',
      });
      const response = yield call(getArticle, payload);
      if(response.code === 'SUCCESS'){
        yield put({
          type: 'save',
          payload: response.data,
        });
      }else{
        notification.error({
          message: response.code,
          description: response.msg,
        });
      }
 
    },
    *details({ payload }, { call, put }) {
      const response = yield call(getArticleDetail, payload);
      yield put({
        type: 'savedetails',
        payload: response.data,
      });
    },
    *saveOrUpdate({ payload }, { call, put }) {
      yield put({
        type: 'loading',
      });
      const response = yield call(saveOrUpdateArticle, payload);
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
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteArticle, payload);
      if (response.code === 'SUCCESS') {
        const newFetch = yield call(getArticle, {});
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
    
  },
  reducers: {
    loading(state) {
      return {
        ...state,
        loading: true,
      };
    },
    save(state, action) {
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    },
    savedetails(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
  },
};
