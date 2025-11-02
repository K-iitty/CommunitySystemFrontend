import http from './http'

// 管理员操作日志管理相关API
export const adminLogApi = {
  // 分页查询操作日志
  getPage(params) {
    return http.get('/adminOperationLog/page', { params })
  },
  
  // 搜索操作日志
  search(params) {
    return http.get('/adminOperationLog/search', { params })
  },

  // 根据ID查询操作日志
  getById(id) {
    return http.get(`/adminOperationLog/${id}`)
  },

  // 新增操作日志
  create(data) {
    return http.post('/adminOperationLog', data)
  },

  // 修改操作日志
  update(data) {
    return http.put('/adminOperationLog', data)
  },

  // 删除操作日志
  delete(id) {
    return http.delete(`/adminOperationLog/${id}`)
  }
}