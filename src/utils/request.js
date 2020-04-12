import {message} from 'antd';
import fetch from 'dva/fetch';
import router from 'umi/router';

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
export function request(url, options) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("token"),
  };

  const credentials = {credentials: 'include'};
  return fetch(url, options, headers, credentials)
  // return fetch(url, options, headers)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      // todo 权限管理
      if (code == 104) { // 无权限
        message.error(info);
        router.push('/403');
      }

      return data;
    })
    .catch(err => ({err}));
}

export function requestRaw(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      return data;
    })
    .catch(err => ({err}));
}


export function requestJson(url, options) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("token"),
  };

  return fetch(url, {
    headers: headers,
    ...options

  })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      return data;
    })
    .catch(err => ({err}));
}


