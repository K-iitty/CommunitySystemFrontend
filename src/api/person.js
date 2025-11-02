import http from './http'

// 员工信息相关API
export const staffApi = {
  // 分页查询员工信息
  getPage(params) {
    return http.get('/staff/page', { params })
  },
  
  // 搜索员工信息
  search(params) {
    return http.get('/staff/search', { params })
  },

  // 根据ID查询员工信息
  getById(id) {
    return http.get(`/staff/${id}`)
  },
  
  // 根据员工ID查询员工信息和部门信息
  getDetailsById(staffId) {
    return http.get(`/complex/staff/${staffId}/details`)
  },

  // 新增员工信息
  create(data) {
    // 如果data已经是FormData（包含文件）则直接提交
    if (data instanceof FormData) {
      return http.post('/staff', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }
    return http.post('/staff', data)
  },

  // 修改员工信息
  update(data) {
    // 如果data已经是FormData（包含文件）则直接提交
    if (data instanceof FormData) {
      return http.put('/staff', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }
    return http.put('/staff', data)
  },

  // 删除员工信息
  delete(id) {
    return http.delete(`/staff/${id}`)
  },
  
  // 上传员工身份证照片
  uploadIdCardPhotos(id, formData) {
    return http.post(`/staff/${id}/id-card-photos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  // 获取员工身份证照片
  getIdCardPhotos(id) {
    return http.get(`/staff/${id}/id-card-photos`)
  },
  
  // 上传员工证件照
  uploadCertificatePhotos(id, formData) {
    return http.post(`/staff/${id}/certificate-photos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  // 获取员工证件照
  getCertificatePhotos(id) {
    return http.get(`/staff/${id}/certificate-photos`)
  }
}

// 业主信息相关API
export const ownerApi = {
  // 分页查询业主信息
  getPage(params) {
    return http.get('/owner/page', { params })
  },
  
  // 搜索业主信息
  search(params) {
    return http.get('/owner/search', { params })
  },

  // 根据ID查询业主信息
  getById(id) {
    return http.get(`/owner/${id}`)
  },
  
  // 根据业主ID查询业主基本信息、房屋拥有信息、车位所属信息、车辆所属信息
  getAllDetailsById(ownerId) {
    return http.get(`/complex/owner/${ownerId}/allDetails`)
  },

  // 按创建时间倒序分页查询最新业主（工作台使用）
  latestPage(params) {
    return http.get('/owner/latest/page', { params })
  },

  // 新增业主信息
  create(data) {
    // 如果data已经是FormData（包含文件）则直接提交
    if (data instanceof FormData) {
      return http.post('/owner', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }
    return http.post('/owner', data)
  },

  // 修改业主信息
  update(data) {
    // 如果data已经是FormData（包含文件）则直接提交
    if (data instanceof FormData) {
      return http.put('/owner', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }
    return http.put('/owner', data)
  },

  // 删除业主信息
  delete(id) {
    return http.delete(`/owner/${id}`)
  },
  
  // 上传业主门禁照片
  uploadAccessControlPhotos(id, formData) {
    return http.post(`/owner/${id}/access-control-photos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  // 获取业主门禁照片
  getAccessControlPhotos(id) {
    return http.get(`/owner/${id}/access-control-photos`)
  },
  
  // 上传业主身份证照片
  uploadOwnerIdCardPhotos(id, formData) {
    return http.post(`/owner/${id}/id-card-photos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  // 获取业主身份证照片
  getOwnerIdCardPhotos(id) {
    return http.get(`/owner/${id}/id-card-photos`)
  }
}

// 部门信息相关API
export const departmentApi = {
  // 分页查询部门信息
  getPage(params) {
    return http.get('/department/page', { params })
  },
  
  // 搜索部门信息
  search(params) {
    return http.get('/department/search', { params })
  },

  // 根据ID查询部门信息
  getById(id) {
    return http.get(`/department/${id}`)
  },

  // 新增部门信息
  create(data) {
    return http.post('/department', data)
  },

  // 修改部门信息
  update(data) {
    return http.put('/department', data)
  },

  // 删除部门信息
  delete(id) {
    return http.delete(`/department/${id}`)
  }
}

// 角色信息相关API
export const roleApi = {
  // 分页查询角色信息
  getPage(params) {
    return http.get('/role/page', { params })
  },
  
  // 搜索角色信息
  search(params) {
    return http.get('/role/search', { params })
  },

  // 根据ID查询角色信息
  getById(id) {
    return http.get(`/role/${id}`)
  },

  // 新增角色信息
  create(data) {
    return http.post('/role', data)
  },

  // 修改角色信息
  update(data) {
    return http.put('/role', data)
  },

  // 删除角色信息
  delete(id) {
    return http.delete(`/role/${id}`)
  }
}

// 房屋业主关联信息相关API
export const houseOwnerApi = {
  // 分页查询房屋业主关联详细信息
  getPageDetail(params) {
    return http.get('/houseOwner/pageDetail', { params })
  },
  
  // 搜索房屋业主关联详细信息
  searchDetail(params) {
    return http.get('/houseOwner/pageDetail', { params })
  },

  // 根据ID查询房屋业主关联详细信息
  getDetailById(id) {
    return http.get(`/houseOwner/detail/${id}`)
  }
}