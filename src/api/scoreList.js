import axios from '@/libs/api.request'
// apiPreFix 只是为了让请求地址看上去短小精悍
// post 请求 - 传给 axios.request 应以 data 为名，数据会加入 req body
// get 请求 - 传给 axios.request 应以 params 为名，数据会加入 req url(query)
// 若post请求希望数据加入 req url ，则传 params 即可
// const apiPreFix = 'political-eco'
export const getSummaryListData = params =>
  axios.request({
    url: 'evaluate',
    params,
    method: 'get'
  })

// 导出得分
export const exportSummaryListData = params =>
  axios.request({
    url: '/evaluate/export',
    params,
    method: 'get'
  })
