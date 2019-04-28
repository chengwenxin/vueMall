import http from './public'

//登录
export const login = (params) => {
  return http.fetchPost('/api/login',params)
}
//注册
export const register = (params) => {
  return http.fetchPost('/api/register',params)
}
//申请状态
export const profileApplyList = (params) => {
  return http.fetchQuickSearch('/api/apply/list',params)
}
// 个人基本信息
export const baseInformation = (params) => {
  return http.fetchQuickSearch('/api/information/base',params)
}

//添加资助政策信息
export const addPolicy = (params) => {
  return http.fetchPost('/api/ueditor/content',params)
}
