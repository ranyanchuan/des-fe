import {requestJson} from 'utils/request';

const api = {
  getBlock: '/api/block/select', // 查询区块
};

// 查询 区块
export async function getBlock(payload) {
  return requestJson(api.getBlock, {
    method: 'POST',
    payload
  });
}
