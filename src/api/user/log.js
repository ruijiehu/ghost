import axios from '@/libs/api.request'
// const apiPreFix = 'political-eco'
export const getOperateLog = (params) =>
  axios.request({
    url: 'operate-log',
    params,
    method: 'get'
  })

export const getOperateLogTypes = () =>
  axios.request({
    url: 'operate-log/types',
    method: 'get'
  })
