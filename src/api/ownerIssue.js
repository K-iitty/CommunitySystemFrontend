import http from './http'

// 业主问题管理相关API
export const ownerIssueApi = {
  // 分页查询业主问题
  getPage(params) {
    return http.get('/ownerIssue/page', { params })
  },
  
  // 搜索业主问题
  search(params) {
    return http.get('/ownerIssue/search', { params })
  },

  // 根据ID查询业主问题
  getById(id) {
    return http.get(`/ownerIssue/${id}`)
  },
  
  // 根据问题ID查询业主信息、房屋信息、社区信息
  getDetailsById(issueId) {
    return http.get(`/complex/ownerIssue/${issueId}/details`)
  },

  // 新增业主问题
  create(data) {
    const formData = new FormData()
    
    // 添加所有文本字段（排除 issueImages 和 additionalImages）
    Object.keys(data).forEach(key => {
      if (key !== 'issueImages' && key !== 'additionalImages' && key !== 'id' && data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key])
      }
    })
    
    // 处理问题图片 - 单张模式
    if (data.issueImages) {
      let imageFile = null
      
      if (data.issueImages.raw && data.issueImages.raw instanceof File) {
        imageFile = data.issueImages.raw
      } else if (data.issueImages instanceof File) {
        imageFile = data.issueImages
      } else if (typeof data.issueImages === 'string' && data.issueImages.trim()) {
        formData.append('issueImages', data.issueImages)
      }
      
      if (imageFile) {
        formData.append('issueImages', imageFile)
      }
    }
    
    // 处理问题描述图片 - 单张模式
    if (data.additionalImages) {
      let imageFile = null
      
      if (data.additionalImages.raw && data.additionalImages.raw instanceof File) {
        imageFile = data.additionalImages.raw
      } else if (data.additionalImages instanceof File) {
        imageFile = data.additionalImages
      } else if (typeof data.additionalImages === 'string' && data.additionalImages.trim()) {
        formData.append('additionalImages', data.additionalImages)
      }
      
      if (imageFile) {
        formData.append('additionalImages', imageFile)
      }
    }
    
    return http.post('/ownerIssue', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // 修改业主问题
  update(data) {
    const formData = new FormData()
    
    // 添加所有文本字段（排除 issueImages 和 additionalImages）
    Object.keys(data).forEach(key => {
      if (key !== 'issueImages' && key !== 'additionalImages' && data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key])
      }
    })
    
    // 处理问题图片 - 单张模式
    if (data.issueImages) {
      let imageFile = null
      let existingUrl = null
      
      if (data.issueImages.raw && data.issueImages.raw instanceof File) {
        imageFile = data.issueImages.raw
      } else if (data.issueImages instanceof File) {
        imageFile = data.issueImages
      } else if (data.issueImages.url && typeof data.issueImages.url === 'string') {
        existingUrl = data.issueImages.url
      } else if (typeof data.issueImages === 'string' && data.issueImages.trim()) {
        existingUrl = data.issueImages
      }
      
      if (imageFile) {
        formData.append('issueImages', imageFile)
      }
      
      if (existingUrl) {
        formData.append('issueImages', existingUrl)
      }
    }
    
    // 处理问题描述图片 - 单张模式
    if (data.additionalImages) {
      let imageFile = null
      let existingUrl = null
      
      if (data.additionalImages.raw && data.additionalImages.raw instanceof File) {
        imageFile = data.additionalImages.raw
      } else if (data.additionalImages instanceof File) {
        imageFile = data.additionalImages
      } else if (data.additionalImages.url && typeof data.additionalImages.url === 'string') {
        existingUrl = data.additionalImages.url
      } else if (typeof data.additionalImages === 'string' && data.additionalImages.trim()) {
        existingUrl = data.additionalImages
      }
      
      if (imageFile) {
        formData.append('additionalImages', imageFile)
      }
      
      if (existingUrl) {
        formData.append('additionalImages', existingUrl)
      }
    }
    
    return http.put(`/ownerIssue/${data.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // 删除业主问题
  delete(id) {
    return http.delete(`/ownerIssue/${id}`)
  },
  
  // 上传问题描述图片
  uploadAdditionalImages(id, formData) {
    return http.post(`/ownerIssue/${id}/additional-images`, formData)
  },
  
  // 获取问题描述图片
  getAdditionalImages(id) {
    return http.get(`/ownerIssue/${id}/additional-images`)
  }
}