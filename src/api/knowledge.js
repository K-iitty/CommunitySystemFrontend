import http from './http'

// 知识库管理相关API
export const knowledgeApi = {
  // 分页查询知识库
  getPage(params) {
    return http.get('/smartQaKnowledge/page', { params })
  },
  
  // 搜索知识库
  search(params) {
    return http.get('/smartQaKnowledge/search', { params })
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
  uploadDocument(formData) {
    return http.post('/smartQaKnowledge/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}