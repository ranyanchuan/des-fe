import {request} from 'utils/request';
import {formData} from 'utils/index';

const api = {
  getBlock: '/admin/block/get', // 查询区块
};

// 查询 区块
export async function getBlock(payload) {
  return request(api.getBlock, {
    method: 'POST',
    body: formData(payload),
  });
}
