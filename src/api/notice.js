import http from './http'

// 社区公告管理相关API
export const noticeApi = {
  // 分页查询社区公告
  getPage(params) {
    return http.get('/communityNotice/page', { params })
  },
  
  // 搜索社区公告
  search(params) {
    return http.get('/communityNotice/search', { params })
  },

  // 根据ID查询社区公告
  getById(id) {
    return http.get(`/communityNotice/${id}`)
  },
  
  // 根据社区公告ID查询社区公告信息和社区信息
  getDetailsById(noticeId) {
    return http.get(`/complex/communityNotice/${noticeId}/details`)
  },

  // 新增社区公告
  create(data) {
    // 如果data已经是FormData（包含文件）则直接提交
    if (data instanceof FormData) {
      return http.post('/communityNotice', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }
    return http.post('/communityNotice', data)
  },

  // 修改社区公告
  update(data, id) {
    // 如果data已经是FormData（包含文件）则直接提交
    if (data instanceof FormData) {
      const updateId = id;
      return http.put(`/communityNotice/${updateId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }
    return http.put(`/communityNotice/${data.id}`, data)
  },

  // 删除社区公告
  delete(id) {
    return http.delete(`/communityNotice/${id}`)
  },
  
  // 上传公告图片
  uploadNoticeImages(id, formData) {
    return http.post(`/communityNotice/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  // 获取公告图片
  getNoticeImages(id) {
    return http.get(`/communityNotice/${id}/images`)
  }
}