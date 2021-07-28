import axios from '@/libs/api.request'
// const apiPreFix = 'political-eco'
export const getUser = (params) =>
  axios.request({
    url: 'user',
    params,
    method: 'get'
  })

export const addUser = (data) =>
  axios.request({
    url: 'user',
    data,
    method: 'post'
  })

export const editUser = (data) =>
  axios.request({
    url: 'user',
    data,
    method: 'put'
  })

export const toggleUserStatus = (data) =>
  axios.request({
    url: 'user/status',
    data,
    method: 'put'
  })

export const resetPassword = (data) =>
  axios.request({
    url: 'user/password/reset',
    data,
    method: 'put'
  })
// 修改用户密码
export const changePassword = (data) =>
  axios.request({
    url: '/user/password',
    data,
    method: 'put'
  })
// 获取用户修改密码次数
export const pwdUpdateCount = (params) => axios.request({
  url: '/system/pwd-update-count',
  data: params,
  method: 'get'
})
