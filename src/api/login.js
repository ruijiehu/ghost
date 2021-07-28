import axios from '@/libs/api.request'
/* eslint-disable */
const apiPreFix = ''
export const login = (params) =>
  axios.request({
    url: `${apiPreFix}/login`,
    params,
    method: 'post',
  })
export const logout = () =>
  axios.request({
    url: `${apiPreFix}/logout`,
    method: 'post',
  })

