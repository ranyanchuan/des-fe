import {request, requestJson} from 'utils/request';
import {formData} from 'utils/index';
import querystring from 'querystring';

const api = {
  addUser: '/api/user/add', // 添加用户
  updUser: '/api/user/upd', // 修改密码
  logout: '/api/user/logout', // 用户退出
  login: '/api/user/login', // 用户登录
};

// 添加用户
export async function addUser(payload) {
  return request(api.addUser, {
    method: 'POST',
    body: formData(payload),
  });
}

// 修改密码
export async function updUser(payload) {
  return request(api.updUser, {
    method: 'POST',
    body: formData(payload),
  });
}

// 用户退出
export async function logout(payload) {
  return request(api.logout, {
    method: 'POST',
    body: formData(payload),
  });
}


// 用户登录
export async function login(payload) {
  return requestJson(api.login + "?" + querystring.stringify(payload), {
    method: 'GET',
  });
}
