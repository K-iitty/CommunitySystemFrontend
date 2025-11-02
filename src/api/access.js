import http from './http'

// 门禁设备相关API
export const accessDeviceApi = {
  // 分页查询门禁设备
  getPage(params) {
    return http.get('/accessControlDevice/page', { params })
  },
  
  // 搜索门禁设备信息
  search(params) {
    return http.get('/accessControlDevice/search', { params })
  },
  
  // 根据ID查询门禁设备
  getById(id) {
    return http.get(`/accessControlDevice/${id}`)
  },
  
  // 根据门禁设备ID查询楼栋信息、社区信息和门禁设备信息
  getDetailsById(deviceId) {
    return http.get(`/complex/accessControlDevice/${deviceId}/details`)
  },
  
  // 新增门禁设备
  create(data) {
    return http.post('/accessControlDevice', data)
  },
  
  // 修改门禁设备
  update(data) {
    return http.put('/accessControlDevice', data)
  },
  
  // 删除门禁设备
  delete(id) {
    return http.delete(`/accessControlDevice/${id}`)
  }
}

// 门禁记录相关API
export const accessRecordApi = {
  // 分页查询门禁记录
  getPage(params) {
    return http.get('/accessControlRecord/page', { params })
  },
  
  // 搜索门禁记录信息
  search(params) {
    return http.get('/accessControlRecord/search', { params })
  },
  
  // 根据ID查询门禁记录
  getById(id) {
    return http.get(`/accessControlRecord/${id}`)
  },
  
  // 根据门禁记录ID查询人员信息和门禁设备信息
  getDetailsById(recordId) {
    return http.get(`/complex/accessControlRecord/${recordId}/details`)
  },
  
  // 新增门禁记录
  create(data) {
    return http.post('/accessControlRecord', data)
  },
  
  // 修改门禁记录
  update(data) {
    return http.put('/accessControlRecord', data)
  },
  
  // 删除门禁记录
  delete(id) {
    return http.delete(`/accessControlRecord/${id}`)
  }
}