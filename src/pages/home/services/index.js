import {request} from 'utils/request';
import {formData} from 'utils/index';

const api = {
  getBlock: '/block/get', // 添加区块
  addBlock: '/block/add', // 添加区块
};

// 查询 区块
export async function getBlock(payload) {
  return request(api.getBlock, {
    method: 'POST',
    body: formData(payload),
  });
}

// 添加区块
export async function addBlock(payload) {
  return request(api.addBlock, {
    method: 'POST',
    body: formData(payload),
  });
}
