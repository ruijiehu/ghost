import axios from '@/libs/api.request'
const apiPreFix = ''
// 四色评估详情
export const getFourColorDetail = (params) =>
  axios.request({
    url: `${apiPreFix}/home/colour-evaluate-detail`,
    params,
    method: 'get'
  })
// 四色评估
export const getFourColorSumm = (params) =>
  axios.request({
    url: `${apiPreFix}/home/colour-evaluate-summ`,
    params,
    method: 'get'
  })
// 获取某一区域指标扣分情况
export const getDeduct = (params) =>
  axios.request({
    url: `${apiPreFix}/home/deduct-index-score`,
    params,
    method: 'get'
  })
// 首页历史分（图表）
export const getScroeHistory = (params) =>
  axios.request({
    url: `${apiPreFix}/home/history`,
    params,
    method: 'get'
  })
// 获取问题清单
export const getIssuesList = (params) =>
  axios.request({
    url: `${apiPreFix}/home/issus-list`,
    params,
    method: 'get'
  })
export const getNoticeData = () =>
  axios.request({
    url: `${apiPreFix}/home/notice-data`,
    method: 'get'
  })
export const getPeriod = (params) =>
  axios.request({
    url: `${apiPreFix}/home/period-data`,
    params,
    method: 'get'
  })
export const getRegionScore = (params) =>
  axios.request({
    url: `${apiPreFix}/home/region-dept-score`,
    params,
    method: 'get'
  })
export const getWaitAudit = (params) =>
  axios.request({
    url: `${apiPreFix}/home/wait-audit-data`,
    params,
    method: 'get'
  })
export const getPermission = (type) =>
  axios.request({
    url: `${apiPreFix}/home/permission/${type}`,
    method: 'get'
  })

// 体检表
export const getPeTable = (params) =>
  axios.request({
    url: `${apiPreFix}/report/health`,
    params,
    method: 'get'
  })
// 体检表指标体系
export const getPeQuote = (params) =>
  axios.request({
    url: `${apiPreFix}/report/health/index`,
    params,
    method: 'get'
  })
// 体检表总分排名
export const getPeRank = (params) =>
  axios.request({
    url: `${apiPreFix}/report/health/rank`,
    params,
    method: 'get'
  })
// 体检表问题列表
export const getPeIssue = (params) =>
  axios.request({
    url: `${apiPreFix}/report/health/questions`,
    params,
    method: 'get'
  })
// 体检表小结字段列表
export const getHotWordsList = () =>
  axios.request({
    url: `${apiPreFix}/report/health/conclusion/fields`,
    method: 'get'
  })
// 更新体检表小结
export const updatePeSummary = (data) =>
  axios.request({
    url: `${apiPreFix}/report/health/conclusion`,
    data,
    method: 'put'
  })
