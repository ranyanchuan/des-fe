import moment from 'moment';
import { message } from 'antd';


/**
 /**
 * 生成唯一字符串
 */
export function uuid() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = '-';
  s[13] = '-';
  s[18] = '-';
  s[23] = '-';
  return s.join('');
}

export const setCookie = (name, value, options) => {

  options = options || {};
  if (value === null) {
    value = '';
    options.expires = -1;
  }
  let expires = '';
  if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
    let date;
    if (typeof options.expires == 'number') {
      date = new Date();
      date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
    } else {
      date = options.expires;
    }
    expires = '; expires=' + date.toUTCString();
  }
  let path = options.path ? '; path=' + options.path : '';
  let domain = options.domain ? '; domain=' + options.domain : '';
  let s = [cookie, expires, path, domain, secure].join('');
  let secure = options.secure ? '; secure' : '';
  let c = [name, '=', encodeURIComponent(value)].join('');
  let cookie = [c, expires, path, domain, secure].join('');
  document.cookie = cookie;

};


export const getCookie = (name) => {

  let cookieValue = null;
  if (document.cookie && document.cookie != '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export function randomObjArray(obj, len) {
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(obj);
  }
  return arr;
}


// 添加 status 和  uid
export function addUidList(fileUrlList) {
  if (!fileUrlList || !Array.isArray(fileUrlList)) {
    return fileUrlList
  }
  const filesUrl = fileUrlList.map((item, index) => {
    return {status: 'done', uid: index, url: item};
  });
  return filesUrl;
};


export function randomNum(m, n) {
  return Math.floor(Math.random() * (m - n) + n);
}

//  验证是否为编辑态
export function checkEdit(status, obj, payload) {

  if (status === 'edit') {
    const { id, ts } = obj;
    payload = { ...payload, id, ts };
  }
  return payload;
}


// 获取树选中的值
export function tree2Map(data, key) {
  let map = {};
  treeMap(data, map, key);
  return map;
}


export function treeMap(data, map, key) {

  if (!Array.isArray(data)) {
    return data;
  }

  for (let item of data) {
    let {children} = item;
    map[item[key]] = item;
    if (children) {
      treeMap(children, map, key);
    }
  }
  return map;
}

export function string2Moment(text, ruleDate = 'YYYY-MM-DD HH:mm') {
  return text ? moment(text).format(ruleDate) : '';
}


// 判断是否要显示弹框底部按钮
export function footer(disabled) {
  let result = null;
  if (disabled) {
    result = { footer: null };
  }
  return result;
}

// json 数据转换成表单格式
export function formData(payload) {
  let data = new FormData();
  for (let key in payload) {   // 转换表单
    data.append(key, payload[key]);
  }
  return data;
}



export function converFileSize(limit) {
  let size = '';
  if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B
    size = limit.toFixed(2) + 'B';
  } else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB
    size = (limit / 1024).toFixed(2) + 'KB';
  } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + 'MB';
  } else { //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  }

  let sizestr = size + '';
  let len = sizestr.indexOf('\.');
  let dec = sizestr.substr(len + 1, 2);
  if (dec == '00') {//当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}

export function connectTree(source, data, pid) {

  if (!Array.isArray(data)) {
    return data;
  }

  for (let index in source) {
    const { id, children = [] } = source[index];
    if (pid === id) {
      source[index].children = data;
      break;
    }

    if (children.length > 0) {
      connectTree(children, data, pid);
    }
  }
  return source;
}


// 批量删除
export function delMore(payload) {

  let idArray = [];
  let tsArray = [];

  for (let item of payload) {
    const { id, ts } = item;
    idArray.push(id);
    tsArray.push(ts);
  }
  return { id: idArray.toString(), ts: tsArray.toString() };
}


/**
 * 表单日期格式化
 * @param fieldArray 待格式化的字段数组
 * @param formData 表单数据
 * @param formatRule 格式化规则
 */
export function formatFormDate(formData, fieldArray, formatRule = 'YYYY-MM-DD HH:mm:ss') {

  if (!Array.isArray(fieldArray)) {
    return formData;
  }

  for (const field of fieldArray) {
    if (formData[field]) {
      formData[field] = formData[field].format(formatRule);
    }
  }
  return formData;
}


export function formatFormDateRange(formData, fieldArray, formatRule = 'YYYY-MM-DD HH:mm:ss') {

  if (!Array.isArray(fieldArray)) {
    return formData;
  }

  for (const field of fieldArray) {
    if (formData[field]) {
      formData[field] = formData[field].map((item) => {
        return item.format(formatRule);
      }).toString();
    }
  }
  return formData;
}


// 请求放回错误处理
export function checkError(value) {
  const { code, info } = value;
  if (code == -1) { // 请求错误
    message.error(info);
    return false;
  }
  message.success(info);
  return true;
}


export function getPageParam(data) {
  const { current, pageSize } = data;
  return {
    pageIndex: current,
    pageSize,
  };
}

export function changeSelectVal(left, right) {
  if (left && right) {
    return left + '(' + right + ')';
  } else {
    return '';
  }

};


/**
 数字保留有效数数字
 */
export function numFixed(text, index = 2) {
  return (text || text==0)   ? parseInt(text).toFixed(index) : null;
}

export function deepCopy(obj) {
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopy(obj[key]); // 递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

