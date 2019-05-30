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

//添加奖助学金项目信息
export const addPolicy = (params) => {
  return http.fetchPost('/api/ueditor/content',params)
}
//查询获奖学号
export const queryAnnouncementTable = (params) => {
  return http.fetchPost('/api/announcement/table/query',params)
}
//查询单挑奖助学金信息
export const getScholarship = (params) => {
  return http.fetchPost('/api/scholarship/detail',params)
}
//查询学院 专业 班级 
export const getCollegeList = () => {
  return http.fetchQuickSearch('/api/college/list')
}
//查发布模板
export const queryTemplate = () => {
  return http.fetchQuickSearch('/api/template/query')
}

//查询 用户表
export const queryTemplateList = (params) => {
  return http.fetchPost('/api/template/list',params)
}
//查询 用户表
export const userList = (params) => {
  return http.fetchPost('/api/user/list',params)
}

//update  用户表
export const userUpdate = (params) => {
  return http.fetchPost('/api/user/update',params)
}
//delete  用户表
export const userDelete = (params) => {
  return http.fetchPost('/api/user/delete',params)
}
//修改密码
export const modifyPassword = (params) => {
  return http.fetchPost('/api/modifypassword',params)
}
//修改密码
export const exportExcel = (params) => {
  return http.fetchPost('/api/export',params)
}
//不解释了
export const applyDetailList = (params) => {
  return http.fetchPost('/api/apply/detail/list',params)
}
//查审核名单
export const queryAuditList = (params) => {
  return http.fetchPost('/api/audit/query',params)
}
//提交初审名单到教务处
export const firstFinish = (params) => {
  return http.fetchPost('/api/first/finish',params)
}

//备份数据库
export const backup = () => {
  return http.fetchQuickSearch('/api/backup')
}
//恢复数据库
export const recover = () => {
  return http.fetchQuickSearch('/api/recover')
}