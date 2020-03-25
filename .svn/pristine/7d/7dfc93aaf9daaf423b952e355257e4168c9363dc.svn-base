import request from '@/utils/request';

export async function queryAllMenus() {
  return request('/empty-item/sysMenu/menuAllList');
}

export async function queryMenuItem(params, lang) {
  const id = encodeURIComponent(params);
  const language = encodeURIComponent(lang);
  return request(`/empty-item/sysUser/toMenuItemInfo?id=${id}&lang=${language}`);
}

export async function queryMenus(params) {
  return request('/empty-item/sysMenu/menuList', {
    method: 'POST',
    data: params,
  });
}

export async function updateMenus(params) {
  return request('/empty-item/sysMenu/saveOrUpdateMenu', {
    method: 'POST',
    data: params,
  });
}

export async function deleteMenus(params) {
  return request('/empty-item/sysMenu/deleteByMenu', {
    method: 'POST',
    data: params,
  });
}

export async function addMenu(params) {
  return request('/empty-item/sysMenu/saveOrUpdateMenu', {
    method: 'POST',
    data: params,
  });
}
export async function getMenuButtonList() {
  return request('/empty-item/sysMenu/getMenuButtonList', {
    method: 'POST',
  });
}
