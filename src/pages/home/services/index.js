import {request,requestJson} from 'utils/request';
import {formData} from 'utils/index';

const api = {
  getBlock: '/api/block/get', // 添加区块
  addBlock: '/api/block/add', // 添加区块
};

// 查询 区块
export async function getBlock(payload) {
  return requestJson(api.getBlock, {
    method: 'POST',
    body: formData(payload),
  });
}

// 添加区块
export async function addBlock(payload) {
  debugger
  return requestJson(api.addBlock, {
    method: 'POST',
    body:JSON.stringify(payload),
  });
}
