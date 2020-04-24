/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2019-12-10 09:34:13
 * @LastEditTime: 2020-04-24 18:17:34
 */
import request from '@/utils/request';

export async function saveOrUpdateArticle(params) {
  return request('/empty-item/article/saveOrUpdateArticle', {
    method: 'POST',
    data: params,
  });
}

export async function getArticle(params) {
  return request('/empty-item/article/articleList', {
    method: 'POST',
    data: params,
  });
}

export async function deleteArticle(params) {
  return request('/empty-item/article/deleteArticle', {
    method: 'POST',
    data: params,
  });
}

export async function getArticleDetail(params) {
  return request('/empty-item/article/detail', {
    method: 'POST',
    data: params,
  });
}
