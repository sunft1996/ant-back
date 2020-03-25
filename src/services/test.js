import request from '@/utils/request';

export async function saveOrUpdNotice(params) {
  return request('/empty-item/notice/saveOrUpdNotice', {
    method: 'POST',
    data: params,
  });
}
export async function getNotice(params) {
  return request('/empty-item/notice/noticeList', {
    method: 'POST',
    data: params,
  });
}
export async function getNoticeDetail(params) {
  return request('/empty-item/notice/getNotice', {
    method: 'POST',
    data: params,
  });
}
export async function deleteNotice(params) {
  return request('/empty-item/notice/deleteNotice', {
    method: 'POST',
    data: params,
  });
}
export async function topNotice(params) {
  return request('/empty-item/notice/topNotice', {
    method: 'POST',
    data: params,
  });
}
export async function uploadUserImg(params) {
  return request('/empty-item/notice/uploadUserImg', {
    method: 'POST',
    data: params,
  });
}
