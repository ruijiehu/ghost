/** 一些常用模板过滤器 */
import config from './index'
import momnet from 'moment'

/** 将颜色英文值转化为颜色名称 */
const color2name = (value) => {
  return config.COLORORM[value]
}

const formatDate = (value) => {
  return momnet(value).format('YYYY年MM月DD日 HH:mm')
}
// 阿拉伯数字转化为中文数字
const arab2Chinese = (value) => {
  const map = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  const t = parseInt(value / 10)
  const y = value % 10
  let result
  if (t === 1) {
    result = '十' + map[y]
  } else if (t > 1) {
    result = map[t] + '十' + map[y]
  } else {
    result = map[y]
  }
  return result
}
export { color2name, formatDate, arab2Chinese }
