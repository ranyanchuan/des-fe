import {request} from 'utils/request';
import {formData} from 'utils/index';

const api = {
  addBlock: '/admin/block/add', // 添加区块
  getBlock: '/admin/block/get', // 查询区块
};

// 查询 区块
export async function getBlock(payload) {
  return request(api.getBlock, {
    method: 'POST',
    body: formData(payload),
  });
}
// 添加 区块
export async function addBlock(payload) {
  return request(api.addBlock, {
    method: 'POST',
    body: formData(payload),
  });
}
