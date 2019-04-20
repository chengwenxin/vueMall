import http from './public'
// 获取资助政策
export const getScholarList = () => {
  return http.fetchQuickSearch('/api/scholar/policy')
}
//获取资助政策详情
export const getScholarDetail = (params) => {
  return http.fetchGet('/api/scholar/policy/detail',params)
}
//统计文章阅读次数
export const setReadingTimes = (params) => {
  return http.fetchGet('/api/scholar/readingtimes',params)
}
// 获取通知公告
export const getAnnouncementList = () => {
  return http.fetchQuickSearch('/api/scholar/announcement')
}
//获取通知公告详情
export const getAnnouncementListDetail = (params) => {
  return http.fetchGet('/api/scholar/announcement/detail',params)
}
// 获取工作动态
export const getWorkingtList = () => {
  return http.fetchQuickSearch('/api/scholar/working')
}
//获取工作动态详情
export const getWorkingtDetail = (params) => {
  return http.fetchGet('/api/scholar/working/detail',params)
}