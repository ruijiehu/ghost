import axios from '@/libs/api.request'
// apiPreFix 只是为了让请求地址看上去短小精悍
// post 请求 - 传给 axios.request 应以 data 为名，数据会加入 req body
// get 请求 - 传给 axios.request 应以 params 为名，数据会加入 req url(query)
// 若post请求希望数据加入 req url ，则传 params 即可
// const apiPreFix = 'political-eco'
export const getPeriodListData = params =>
  axios.request({
    url: 'period-manage',
    params,
    method: 'get'
  })

export const getPeriodModuleList = params =>
  axios.request({
    url: `period-manage/template/list/${params.periodId}`,
    method: 'get'
  })

export const getPeriodModuleSetList = params =>
  axios.request({
    url: 'period-manage/template/item/',
    params,
    method: 'get'
  })
  // 获取周期设置总指标
export const getPeriodTotalIndex = params =>
  axios.request({
    url: '/period-manage/template/index',
    params,
    method: 'get'
  })

export const postPeriodSet = params =>
  axios.request({
    url: 'period-manage',
    params,
    method: 'put'
  })

// 预警设置保存
export const postPeriodWarningSet = params =>
  axios.request({
    url: 'period-manage/warning-threshold',
    data: params,
    method: 'put'
  })
  // 总指标设置保存
export const postTotalIndexSet = params =>
  axios.request({
    url: '/period-manage/template/index',
    data: params,
    method: 'put'
  })
  // 删除扣分选项接口
export const removePointsDeductedItem = params =>
  axios.request({
    url: `/period-manage/template/item/${params.uuid}`,
    method: 'delete'
  })
  // 周期管理->模板设置-编辑扣分保存
export const postPointsDeductedForm = (params, method) =>
  axios.request({
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: '/period-manage/template/item',
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    method
  })

export const getPeriodWarningContent = params =>
  axios.request({
    url: `period-manage/warning-threshold/${params.periodId}`,
    method: 'get'
  })

// 获取扣分项
export const getPointsDeductedItem = params =>
  axios.request({
    url: `period-manage/template/item/${params.uuid}`,
    method: 'get'
  })
