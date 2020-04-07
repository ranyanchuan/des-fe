import { request } from 'utils/request';

import { formData } from 'utils/index';
import { stringify } from 'qs';

const api = {
  getCommonMenuTree: '/admin/directory/getRectories', // 获取菜单
  getCommonMenuAll: '/admin/directory/queryDirectoryInfoListForTreeGrid', // 获取所有菜单
  addAttchment: '/admin/fujian/save', // 附件保存
  getAttchment: '/admin/fujian/page', // 获取附件
  delAttchment: '/admin/fujian/delete', // 获取附件

  updUser: '/work/user/save', // 更新用户信息
  getMessage: '/work/zhanneixin/getWD', // 获取站内信息


  getyz: '/login/getyz', // 获取验证码
  addLogin: '/dologin', // 登录
  logout: '/login/logout', // 退出
  needCode: '/login/needCode', // 是否需要登陆
  getCode: '/login/getCode', // 获取短信

  getBpm: '/admin/BpmProcInfo/page', // 分页查询
  addBpm: '/admin/BpmProcInfo/save', // 保存流程
  delBpm: '/admin/BpmProcInfo/delete', // 删除流程
  getBpmInfo: '/admin/BpmProcInfo/queryInfo', // 获取流程信息
  deployBpm: '/admin/BpmProcInfo/deployProcDefinition', // 发布流程信息
};


// 获取公共菜单树
export async function getMenuTree(payload) {
  // todo
  let url = api.getCommonMenuTree + '?' + stringify(payload);
  return request(url, {
    method: 'POST',
    // body: formData(payload),
  });
}


// 获取所有
export async function getCommonMenuAll(payload) {
  return request(api.getCommonMenuAll, {
    method: 'POST',
    // body: formData(payload),
  });
}


// 用户退出
export async function logout(payload) {
  return request(api.logout, {
    method: 'POST',
    body: formData(payload),
  });
}

// 用户退出
export async function needCode(payload) {
  let url = api.needCode + '?' + stringify(payload);
  return request(url, {
    method: 'POST',
    // body: formData(payload),
  });
}

// 获取短信验证码
export async function getCode(payload) {
  return request(api.getCode, {
    method: 'POST',
    body: formData(payload),
  });
}


// 流程分页查询
export async function getBpm(payload) {
  return request(api.getBpm, {
    method: 'POST',
    body: formData(payload),
  });
}

// 流程保存
export async function addBpm(payload) {
  return request(api.addBpm, {
    method: 'POST',
    body: formData(payload),
  });
}

// 流程删除
export async function delBpm(payload) {
  return request(api.delBpm, {
    method: 'POST',
    body: formData(payload),
  });
}

// 获取流程信息
export async function getBpmInfo(payload) {
  return request(api.getBpmInfo, {
    method: 'POST',
    body: formData(payload),
  });
}

// 发布流程信息
export async function deployBpm(payload) {
  return request(api.deployBpm, {
    method: 'POST',
    body: formData(payload),
  });
}

// 保存文件
export async function addAttchment(payload) {
  return request(api.addAttchment, {
    method: 'POST',
    body: formData(payload),
  });
}

// 获取文件
export async function getAttchment(payload) {
  return request(api.getAttchment, {
    method: 'POST',
    body: formData(payload),
  });
}

// 删除文件
export async function delAttchment(payload) {
  return request(api.delAttchment, {
    method: 'POST',
    body: formData(payload),
  });
}

// 更新用户信息
export async function updUser(payload) {
  return request(api.updUser, {
    method: 'POST',
    body: formData(payload),
  });
}


// 获取站内信息
export async function getMessage(payload) {
  return request(api.getMessage, {
    method: 'POST',
    body: formData(payload),
  });
}
