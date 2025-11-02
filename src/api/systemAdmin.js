import http from './http'

// 系统管理员管理相关API
export const systemAdminApi = {
  // 分页查询管理员
  getPage(params) {
    return http.get('/systemAdmin/page', { params })
  },
  
  // 搜索管理员
  search(params) {
    return http.get('/systemAdmin/search', { params })
  },

  // 根据ID查询管理员
  getById(id) {
    return http.get(`/systemAdmin/${id}`)
  },

  // 新增管理员
  create(data) {
    return http.post('/systemAdmin', data)
  },

  // 修改管理员
  update(data) {
    return http.put('/systemAdmin', data)
  },

  // 删除管理员
  delete(id) {
    return http.delete(`/systemAdmin/${id}`)
  },
  
  // 管理员登录
  login(data) {
    return http.post('/systemAdmin/login', data)
  },
  
  // 获取当前登录管理员信息
  getInfo() {
    return http.get('/systemAdmin/info')
  },
  
  // 管理员退出登录
  logout() {
    return http.post('/systemAdmin/logout')
  }
}