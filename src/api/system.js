import http from './http'

// 系统管理员相关API
export const systemAdminApi = {
  // 管理员登录
  login(data) {
    // 使用 URLSearchParams 格式发送数据
    const params = new URLSearchParams();
    params.append('username', data.username);
    params.append('password', data.password);
    
    return http.post('/systemAdmin/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  
  // 获取当前登录管理员信息
  getInfo() {
    return http.get('/systemAdmin/info')
  },
  
  // 管理员退出登录
  logout() {
    return http.post('/systemAdmin/logout')
  },
  
  // 管理员注册
  register(data) {
    return http.post('/systemAdmin/register', data)
  },
  
  // 分页查询管理员
  getPage(params) {
    return http.get('/systemAdmin/page', { params })
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
  }
}

// 智能问答知识库相关API
export const smartQaKnowledgeApi = {
  // 分页查询知识库
  getPage(params) {
    return http.get('/smartQaKnowledge/page', { params })
  },
  
  // 根据ID查询知识库
  getById(id) {
    return http.get(`/smartQaKnowledge/${id}`)
  },
  
  // 新增知识库
  create(data) {
    return http.post('/smartQaKnowledge', data)
  },
  
  // 修改知识库
  update(data) {
    return http.put('/smartQaKnowledge', data)
  },
  
  // 删除知识库
  delete(id) {
    return http.delete(`/smartQaKnowledge/${id}`)
  },
  
  // 上传知识库文档
  upload(data) {
    return http.post('/smartQaKnowledge/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}