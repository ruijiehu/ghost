import axios from '@/libs/api.request'
// apiPreFix 只是为了让请求地址看上去短小精悍
// post 请求 - 传给 axios.request 应以 data 为名，数据会加入 req body
// get 请求 - 传给 axios.request 应以 params 为名，数据会加入 req url(query)
// 若post请求希望数据加入 req url ，则传 params 即可
const apiPreFix = ''
// 获取周期数据
export const getPeriodData = (params) =>
  axios.request({
    url: `${apiPreFix}/home/period-data`,
    params,
    method: 'get'
  })
// 获取四色评估详细地图列表数据
export const getMapListData = (params, cancelToken) => axios.request({
  url: `${apiPreFix}/colour-evaluate/colour-evaluate-map-list`,
  params,
  method: 'get',
  cancelToken
})
// 获取四色评估总体数据
export const getSummaryData = (params, cancelToken) => axios.request({
  url: `${apiPreFix}/colour-evaluate/colour-evaluate-summarization`,
  params,
  method: 'get',
  cancelToken
})
// 获取四色评估详细列表数据
export const getItemList = (params, cancelToken) => axios.request({
  url: `${apiPreFix}/colour-evaluate/colour-evaluate-item`,
  params,
  cancelToken,
  method: 'get'
})
