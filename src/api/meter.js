import http from './http'

// 仪表配置相关API
export const meterConfigApi = {
  // 分页查询仪表配置
  getPage(params) {
    return http.get('/meterConfig/page', { params })
  },
  
  // 搜索仪表配置信息
  search(params) {
    return http.get('/meterConfig/search', { params })
  },
  
  // 根据ID查询仪表配置
  getById(id) {
    return http.get(`/meterConfig/${id}`)
  },
  
  // 新增仪表配置
  create(data) {
    return http.post('/meterConfig', data)
  },
  
  // 修改仪表配置
  update(data) {
    return http.put('/meterConfig', data)
  },
  
  // 删除仪表配置
  delete(id) {
    return http.delete(`/meterConfig/${id}`)
  }
}

// 仪表信息相关API
export const meterInfoApi = {
  // 分页查询仪表信息
  getPage(params) {
    return http.get('/meterInfo/page', { params })
  },
  
  // 搜索仪表信息
  search(params) {
    return http.get('/meterInfo/search', { params })
  },
  
  // 根据ID查询仪表信息
  getById(id) {
    return http.get(`/meterInfo/${id}`)
  },
  
  // 根据仪表信息ID查询仪表配置信息和所属的房屋信息或楼栋信息
  getDetailsById(meterId) {
    return http.get(`/complex/meterInfo/${meterId}/details`)
  },
  
  // 新增仪表信息
  create(data) {
    return http.post('/meterInfo', data)
  },
  
  // 修改仪表信息
  update(data) {
    return http.put('/meterInfo', data)
  },
  
  // 删除仪表信息
  delete(id) {
    return http.delete(`/meterInfo/${id}`)
  }
}

// 业主仪表信息相关API
export const ownerMeterApi = {
  // 根据业主ID查询仪表信息和配置信息
  getByOwnerId(ownerId) {
    return http.get(`/complex/owner/${ownerId}/meters`)
  }
}

// 抄表记录相关API
export const meterReadingApi = {
  // 分页查询抄表记录
  getPage(params) {
    return http.get('/meterReading/page', { params })
  },
  
  // 搜索抄表记录信息
  search(params) {
    return http.get('/meterReading/search', { params })
  },
  
  // 根据ID查询抄表记录
  getById(id) {
    return http.get(`/meterReading/${id}`)
  },
  
  // 根据抄表记录ID查询详情（包括物业和业主信息）
  getDetailsById(readingId) {
    return http.get(`/complex/meterReading/${readingId}/details`)
  },
  
  // 根据抄表记录中的仪表ID查询仪表信息和配置信息
  getMeterDetailsByMeterId(meterId) {
    return http.get(`/complex/meterReading/meter/${meterId}/details`)
  },
  
  // 新增抄表记录
  create(data) {
    return http.post('/meterReading', data)
  },
  
  // 修改抄表记录
  update(data) {
    return http.put('/meterReading', data)
  },
  
  // 删除抄表记录
  delete(id) {
    return http.delete(`/meterReading/${id}`)
  }
}