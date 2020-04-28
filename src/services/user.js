/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2019-12-18 16:59:47
 * @LastEditTime: 2020-04-27 13:36:56
 */
import request from '@/utils/request';

export async function query(params) {
  return request('/empty-item/sysUser/userList', {
    method: 'POST',
    data: params,
  });
}
export async function queryDetail(params) {
  return request(`/empty-item/sysUser/userDetail?id=${params.id}`);
}
export async function queryCurrent() {
  return request(`/empty-item/sysUser/toUserDetails`);
}

export async function resetUserPwd(params) {
  const id = encodeURIComponent(params.id);
  return request(`/empty-item/sysUser/resetPassword?id=${id}`);
}
export async function addUser(params) {
  return request('/empty-item/sysUser/saveOrUpdateUser', {
    method: 'POST',
    data: params,
  });
}
export async function deleteUser(params) {
  return request('/empty-item/sysUser/deleteByUser', {
    method: 'POST',
    data: params,
  });
}
export async function updateUser(params) {
  return request('/empty-item/sysUser/saveOrUpdateUser', {
    method: 'POST',
    data: params,
  });
}

export async function editPassword(params) {
  return request('/empty-item/sysUser/editPassword', {
    method: 'POST',
    data: params,
  });
}
