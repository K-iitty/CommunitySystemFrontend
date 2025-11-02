import http from './http'

// 问题跟进管理相关API
export const issueFollowUpApi = {
  // 分页查询问题跟进
  getPage(params) {
    return http.get('/issueFollowUp/page', { params })
  },
  
  // 搜索问题跟进
  search(params) {
    return http.get('/issueFollowUp/search', { params })
  },

  // 根据ID查询问题跟进
  getById(id) {
    return http.get(`/issueFollowUp/${id}`)
  },
  
  // 根据问题跟进ID获取对应的问题信息、跟进人（物业）信息、业主信息
  getDetailsById(followUpId) {
    return http.get(`/complex/issueFollowUp/${followUpId}/details`)
  },

  // 新增问题跟进
  create(data) {
    const formData = new FormData()
    
    // 添加所有字段到 FormData
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
        formData.append(key, data[key])
      }
    })
    
    return http.post('/issueFollowUp', formData)
  },

  // 修改问题跟进
  update(data) {
    const formData = new FormData()
    
    // 添加所有字段到 FormData
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
        formData.append(key, data[key])
      }
    })
    
    return http.put('/issueFollowUp', formData)
  },

  // 删除问题跟进
  delete(id) {
    return http.delete(`/issueFollowUp/${id}`)
  }
}