import { request, requestRaw } from 'utils/request';
import { formData } from 'utils/index';

const api = {
  getZhuanjia: '/admin/zhuanjia/page', // 分页查询专家
  addZhuanjia: '/admin/zhuanjia/save', // 保存
  delZhuanjia: '/admin/zhuanjia/delete', // 删除
  getZhuanjiaInfo: '/admin/zhuanjia/queryInfo', // 获取信息
};

// 分页查询
export async function getZhuanjia(payload) {
  return request(api.getZhuanjia, {
    method: 'POST',
    body: formData(payload),
  });
}


// 保存信息
export async function addZhuanjia(payload) {
  return requestRaw(api.addZhuanjia, {
    method: 'POST',
    body: formData(payload),
  });
}


// 删除信息
export async function delZhuanjia(payload) {
  return requestRaw(api.delZhuanjia, {
    method: 'POST',
    body: formData(payload),
  });
}


// 获取信息
export async function getZhuanjiaInfo(payload) {
  return requestRaw(api.getZhuanjiaInfo, {
    method: 'POST',
    body: formData(payload),
  });
}
