import { request, requestRaw } from 'utils/request';
import { formData } from 'utils/index';

const api = {
  add: '/admin/department/save', // 保存
  del: '/admin/department/delete', // 删除
};


// 保存信息
export async function add(payload) {
  return requestRaw(api.add, {
    method: 'POST',
    body: formData(payload),
  });
}


// 删除信息
export async function del(payload) {
  return requestRaw(api.del, {
    method: 'POST',
    body: formData(payload),
  });
}


