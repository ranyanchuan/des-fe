import {requestJson} from 'utils/request';

const api = {
  getBlock: '/api/block/self/select', // 添加区块
  addBlock: '/api/block/insert', // 添加区块
};

// 查询 区块
export async function getBlock(payload) {
  return requestJson(api.getBlock, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// 添加区块
export async function addBlock(payload) {
  return requestJson(api.addBlock, {
    method: 'POST',
    body:JSON.stringify(payload),
  });
}
