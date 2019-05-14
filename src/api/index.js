import http from './public'

//登录
export const login = (params) => {
  return http.fetchPost('/api/login',params)
}
//登出
export const logoutApi = (params) => {
  return http.fetchPost('/api/logout',params)
}
//注册
export const register = (params) => {
  return http.fetchPost('/api/register',params)
}
//申请状态
export const applyAdd = (params) => {
  return http.fetchPost('/api/apply/add',params)
}
//申请状态
export const applyDetail = (params) => {
  return http.fetchPost('/api/apply/detail',params)
}
// 个人基本信息
export const baseInformation = (params) => {
  return http.fetchQuickSearch('/api/information/base',params)
}
// 修改基本信息
export const updateInformation = (params) => {
  return http.fetchPost('/api/information/update',params)
}

//添加资助政策信息
export const addPolicy = (params) => {
  return http.fetchPost('/api/ueditor/content',params)
}

//查询学院 专业 班级 
export const getCollegeList = () => {
  return http.fetchQuickSearch('/api/college/list')
}