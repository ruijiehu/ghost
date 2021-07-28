import axios from '@/libs/api.request'
// const apiPreFix = 'political-eco'
export const getRegionDept = (params) =>
  axios.request({
    url: 'region-dept',
    params,
    method: 'get'
  })

export const postRegionDept = (params) =>
  axios.request({
    url: 'region-dept',
    data: params,
    method: 'post'
  })

export const putRegionDept = (params) =>
  axios.request({
    url: 'region-dept',
    data: params,
    method: 'put'
  })

export const deleteRegionDept = (params) =>
  axios.request({
    url: `region-dept/${params}`,
    method: 'delete'
  })
