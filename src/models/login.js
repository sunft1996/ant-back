import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { AccountLogin, AccountLogOut, getCaptcha } from '@/services/api';
import { notification } from 'antd';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(AccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.code === 'SUCCESS') {
        reloadAuthorized(response.data.roleCode);
        yield put(routerRedux.replace('/'));
        const menu = JSON.stringify(response.data.menuItem);
        localStorage.setItem('menu', menu);
        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        // let { redirect } = params;
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);
        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     redirect = null;
        //   }
        // }
        // yield put(routerRedux.replace(redirect || '/'));
      } else {
        notification.error({
          message: response.code,
          description: response.msg,
        });
      }
      return response;
    },

    *getCaptcha({ payload }, { call }) {
      const response = yield call(getCaptcha, payload);
      if (response.code == 'FAILED') {
        // 失败提示
        notification.error({
          message: response.code,
          description: response.msg,
        });
      }
      return response;
    },

    *logout(_, { call, put }) {
      yield call(AccountLogOut);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            // search: stringify({
            //   redirect: window.location.href,
            // }),
          })
        );
      }
    },
    //  登陆到期
    *loginExpire(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const role = payload.currentAuthority ? payload.currentAuthority : payload.data.roleCode;
      // setAuthority(role);
      if (role === 'guest') {
        localStorage.clear();
      } else {
        // localStorage.setItem('token', payload.data.token);
        localStorage.setItem('id', payload.data.id);
        localStorage.setItem('auth', role);
      }
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
