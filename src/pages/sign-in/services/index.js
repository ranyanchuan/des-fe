import { request } from 'utils/request';
import { stringify } from 'qs';

import { formData } from 'utils/index';


const api = {
  getyz: '/login/getyz', // 获取验证码
  addLogin: '/login/dologin', // 登录
  needCode: '/login/needCode', // 是否需要登陆
  getCode: '/login/getCode', // 获取短信
};


export async function getyz(payload) {
  return request(`${api.getyz}?${stringify(payload)}`, {
    method: 'GET',
  });
}


export async function addLogin(payload) {
  return request(api.addLogin, {
    method: 'POST',
    body: formData(payload),
  });
}

// 登录验证
export async function needCode(payload) {
  return request(api.needCode, {
    method: 'POST',
    body: formData(payload),
  });
}


// 获取短信验证码
export async function getCode(payload) {
  return request(api.getCode, {
    method: 'POST',
    body: formData(payload),
  });
}


