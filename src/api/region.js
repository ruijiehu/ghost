import axios from '@/libs/api.request'
// apiPreFix 只是为了让请求地址看上去短小精悍
// post 请求 - 传给 axios.request 应以 data 为名，数据会加入 req body
// get 请求 - 传给 axios.request 应以 params 为名，数据会加入 req url(query)
// 若post请求希望数据加入 req url ，则传 params 即可
const apiPreFix = 'region-dept'
export const getSubRegionDept = (params) =>
  axios.request({
    url: `${apiPreFix}/child-region-dept`,
    params,
    method: 'get'
  })
export const getDept = (params) =>
  axios.request({
    url: `${apiPreFix}/name-region-dept`,
    params,
    method: 'get'
  })
// 获取区域部门明细
export const getDeptDetail = (uuid) =>
  axios.request({
    url: `${apiPreFix}/${uuid}`,
    method: 'get'
  })
