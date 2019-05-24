import http from './public'



// 获取资助政策
export const getScholarList = (params={pageSize:10000,currentPage:1}) => {
  return http.fetchGet('/api/scholar/policy',{params})
}
//获取资助政策详情
export const getScholarDetail = (params) => {
  return http.fetchGet('/api/scholar/policy/detail',params)
}
// 更新资助政策
export const updatePolicy = (params) => {
  return http.fetchPost('/api/scholar/policy/update',params)
}
// 更新通知公告
export const updateAnnouncement = (params) => {
  return http.fetchPost('/api/scholar/announcement/update',params)
}
// 更新工作动态
export const updateWorking= (params) => {
  return http.fetchPost('/api/scholar/working/update',params)
}
// 更新中心简介
export const updateIntroduction = (params) => {
  return http.fetchPost('/api/scholar/introduction/update',params)
}
// 删除通知公告
export const deleteAnnouncement = (params) => {
  return http.fetchPost('/api/scholar/announcement/delete',params)
}

// 删除资助政策
export const deletePolicy = (params) => {
  return http.fetchPost('/api/scholar/policy/delete',params)
}
// 删除工作动态
export const deleteWorking = (params) => {
  return http.fetchPost('/api/scholar/working/delete',params)
}
//统计文章阅读次数
export const setReadingTimes = (params) => {
  return http.fetchGet('/api/scholar/readingtimes',params)
}
// 获取通知公告
export const getAnnouncementList = (params={pageSize:10000,currentPage:1}) => {
return http.fetchGet('/api/scholar/announcement',{params})
}
//获取通知公告详情
export const getAnnouncementListDetail = (params) => {
  return http.fetchGet('/api/scholar/announcement/detail',params)
}
//添加获奖名单
export const addAnnouncementTable = (params) => {
  return http.fetchPost('/api/scholar/announcement/table/add',params)
}

// 获取工作动态
export const getWorkingtList = (params={pageSize:10000,currentPage:1}) => {
  return http.fetchGet('/api/scholar/working',{params})
}
//获取工作动态详情
export const getWorkingtDetail = (params) => {
  return http.fetchGet('/api/scholar/working/detail',params)
}
//获取中心简介
export const getIntroductionDetail = (params) => {
  return http.fetchGet('/api/scholar/introduction',params)
}

//新增申请记录
export const auditInsert = (params) => {
  return http.fetchPost('/api/audit/insert',params)
}
//查询申请记录
export const auditList = (params) => {
  return http.fetchPost('/api/audit/list',params)
}
//修改申请记录
export const auditUpdate = (params) => {
  return http.fetchPost('/api/audit/update',params)
}
//删除申请记录
export const auditDelete = (params) => {
  return http.fetchPost('/api/audit/delete',params)
}

//查询申请信息 第一次到申请页面是填充表单  
export const getApplyList = (params) => {
  return http.fetchPost('/api/apply/list',params)
}
//初审
export const firstAuditReplace = (params) => {
  return http.fetchPost('/api/audit/first/replace',params)
} 
// 复审
export const secondAuditReplace = (params) => {
  return http.fetchPost('/api/audit/second/replace',params)
}
//查询所有院系
export const getCollegeEnum = () => {
  return http.fetchQuickSearch('/api/enum/college')
}