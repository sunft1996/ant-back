import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage, getLocale } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import { menu } from '../defaultSettings';
import menuDatas from '../../config/router.config';
import { notification } from 'antd';
import {
  queryMenus,
  updateMenus,
  queryAllMenus,
  addMenu,
  deleteMenus,
  getMenuButtonList,
} from '@/services/menu';

const { check } = Authorized;

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  if (!data) {
    return undefined;
  }
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      // 改了这里
      // if (parentName && parentName !== '/') {
      //   locale = `${parentName}.${item.name}`;
      // } else {
      //   locale = `menu.${item.name}`;
      // }
      locale = item.name;

      // if enableMenuLocale use item.name,
      // close menu international
      const name = menu.disableLocal
        ? item.name
        : formatMessage({ id: locale, defaultMessage: item.name });
      const result = {
        ...item,
        name,
        locale,
        authority: item.authority || parentAuthority,
      };

      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children), // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => check(item.authority, getSubMenu(item)))
    .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  if (!menuData) {
    return {};
  }
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export default {
  namespace: 'menu',

  state: {
    menuData: [],
    routerData: [],
    breadcrumbNameMap: {},
    pagePermissions: [],
  },

  effects: {
    *getMenuData({ payload }, { call, put }) {
      const lang = getLocale();
      const menus = JSON.parse(localStorage.getItem('menu'));
      const { routes, authority, path } = menuDatas[1];
      // const { routes, authority, path } = test;
      const originalMenuData = memoizeOneFormatter(routes, authority, path);
      const menuData = filterMenuData(originalMenuData);
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap, routerData: routes },
      });
    },
    *fetchAll(_, { call, put }) {
      const response = yield call(queryAllMenus);
      yield put({
        type: 'save',
        payload: { allmenus: response },
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMenus, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addMenu, payload);
      if (response.code === 'SUCCESS') {
        const newFetch = yield call(queryMenus, {
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
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(deleteMenus, payload);
      if (response.code === 'SUCCESS') {
        const newFetch = yield call(queryMenus, {
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
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateMenus, payload);
      if (response.code === 'SUCCESS') {
        const newFetch = yield call(queryMenus, {
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
      if (callback) callback();
    },

    // 查询当前页面权限
    *fetchButton({ payload }, { call, put }) {
      // yield put({
      //   type: 'loading',
      // });
      // const response = yield call(getMenuButtonList, payload);
      // yield put({
      //   type: 'pageAuth',
      //   payload: response.data,
      // });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    pageAuth(state, action) {
      return {
        ...state,
        pagePermissions: action.payload,
        loading: false,
      };
    },
  },
};
