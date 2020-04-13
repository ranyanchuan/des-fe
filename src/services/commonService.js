import {requestJson} from 'utils/request';
import querystring from 'querystring';

const api = {
  addUser: '/api/user/insert', // 添加用户
  updUser: '/api/user/update', // 修改密码
  logout: '/api/user/logout', // 用户退出
  login: '/api/user/login', // 用户登录
};

// 添加用户
export async function addUser(payload) {
  return requestJson(api.addUser, {
    method: 'POST',
    body:JSON.stringify(payload),

  });
}

// 修改密码
export async function updUser(payload) {
  return requestJson(api.updUser, {
    method: 'POST',
    body:JSON.stringify(payload),

  });
}

// 用户退出
export async function logout(payload) {
  return requestJson(api.logout, {
    method: 'POST',
    body:JSON.stringify(payload),
  });
}


// 用户登录
export async function login(payload) {
  return requestJson(api.login + "?" + querystring.stringify(payload), {
    method: 'GET',
  });
}
