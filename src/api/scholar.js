import http from './public'
// 获取首页数据
export const getScholarList = () => {
  return http.fetchQuickSearch('/api/scholar/')
}