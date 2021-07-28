import axios from '@/libs/api.request'
const apiPreFix = 'evaluate-process'
export const getDeductRectify = (params) =>
  axios.request({
    url: `${apiPreFix}/deduct-rectify/${params}`,
    method: 'get'
  })

export const commitRectify = (data) =>
  axios.request({
    url: `${apiPreFix}/deduct-rectify/commit`,
    data,
    method: 'post'
  })

export const auditRectify = (data) =>
  axios.request({
    url: `${apiPreFix}/deduct-rectify/examine`,
    data,
    method: 'post'
  })

export const recommitRectify = (data) =>
  axios.request({
    url: `${apiPreFix}/deduct-rectify`,
    data,
    method: 'put'
  })
// 新增扣分
export const addDeduction = (data) =>
  axios.request({
    url: `${apiPreFix}/deduct`,
    data,
    method: 'post'
  })
  // 修改扣分
export const modifyDeduction = (data) =>
  axios.request({
    url: `${apiPreFix}/deduct`,
    data,
    method: 'put'
  })
// 获取扣分规则
export const getDeductionRules = (params) =>
  axios.request({
    url: `${apiPreFix}/deduct-item`,
    params,
    method: 'get'
  })
// 获取扣分记录
export const getDeductionDetail = (uuid) =>
  axios.request({
    url: `${apiPreFix}/deduct/${uuid}`,
    uuid,
    method: 'get'
  })
export const deleteDeducted = (params) =>
  axios.request({
    url: `${apiPreFix}/deduct/${params}`,
    method: 'delete'
  })
