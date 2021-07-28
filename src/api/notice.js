import axios from '@/libs/api.request'
// apiPreFix 只是为了让请求地址看上去短小精悍
// post 请求 - 传给 axios.request 应以 data 为名，数据会加入 req body
// get 请求 - 传给 axios.request 应以 params 为名，数据会加入 req url(query)
// 若post请求希望数据加入 req url ，则传 params 即可
// const apiPreFix = 'political-eco'

// 通知公告列表
export const getNoticeListData = params =>
  axios.request({
    url: 'notice/all',
    params,
    method: 'get'
  })

// 获取通告详情
export const getNoticeDetail = params =>
  axios.request({
    url: 'notice/one',
    params,
    method: 'get'
  })

// 新增提交
export const postNoticeData = params =>
  axios.request({
    url: 'notice/insert',
    data: params,
    method: 'post'
  })

// 删除通告
export const removeNoticeItem = params =>
  axios.request({
    url: '/notice/delete',
    params,
    method: 'put'
  })

// 预览通告
// export const browserNoticePdf = params =>
//   axios.request({
//     url: '/notice/preview',
//     params,
//     method: 'get'
//   })
