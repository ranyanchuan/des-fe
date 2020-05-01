import { message } from 'antd';
import fetch from 'dva/fetch';
import router from 'umi/router';
import querystring from 'querystring';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export function requestJson(url, options) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token'),
  };
  let newUrl = url;
  const { payload, method } = options;
  if (method.toUpperCase() == 'GET' && payload) { // get 请求
    newUrl += '?' + querystring.stringify(payload);
  } else {
    options.body = JSON.stringify(payload); // post 请求
  }

  return fetch(newUrl, {
    headers: headers,
    ...options,
  })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const { code, info } = data;
      // todo 权限管理
      if (code == 104) { // 无权限
        message.error(info);
        router.push('/403');
      }
      return data;
    })
    .catch(err => ({ err }));
}


