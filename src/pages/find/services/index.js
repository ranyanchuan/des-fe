import { request } from 'utils/request';

import { formData } from 'utils/index';

const api = {
  getApp: '/admin/apppackage/page', // 分页查询
  addApp: '/admin/apppackage/save', // 保存 app
  delApp: '/admin/apppackage/delete', // 删除 app
  getAppInfo: '/admin/apppackage/queryInfo', // 获取信息
};

// 分页查询
export async function getApp(payload) {
  return request(api.getApp, {
    method: 'POST',
    body: formData(payload),
  });
}


// 保存App信息
export async function addApp(payload) {
  return request(api.addApp, {
    method: 'POST',
    body: formData(payload),
  });
}


// 删除App信息
export async function delApp(payload) {
  return request(api.delApp, {
    method: 'POST',
    body: formData(payload),
  });
}


// 获取App信息
export async function getAppInfo(payload) {
  return request(api.getAppInfo, {
    method: 'POST',
    body: formData(payload),
  });
}


// 为App授权角色
export async function addGrantUser(payload) {
  return request(api.addGrantUser, {
    method: 'POST',
    body: formData(payload),
  });
}

