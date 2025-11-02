import http from './http'

// 停车记录管理相关API
export const parkingRecordApi = {
  // 分页查询停车记录
  getPage(params) {
    return http.get('/parkingRecord/page', { params })
  },
  
  // 搜索停车记录
  search(params) {
    return http.get('/parkingRecord/search', { params })
  },

  // 根据ID查询停车记录
  getById(id) {
    return http.get(`/parkingRecord/${id}`)
  },
  
  // 根据停车记录ID查询车辆信息、业主信息、停车位信息和停车场信息
  getDetailsById(recordId) {
    return http.get(`/complex/parkingRecord/${recordId}/details`)
  },

  // 新增停车记录
  create(data) {
    return http.post('/parkingRecord', data)
  },

  // 修改停车记录
  update(data) {
    return http.put('/parkingRecord', data)
  },

  // 删除停车记录
  delete(id) {
    return http.delete(`/parkingRecord/${id}`)
  }
}