import http from './http'

// 停车场相关API
export const parkingLotApi = {
  // 分页查询停车场
  getPage(params) {
    return http.get('/parkingLot/page', { params })
  },
  
  // 搜索停车场信息
  search(params) {
    return http.get('/parkingLot/search', { params })
  },
  
  // 根据ID查询停车场
  getById(id) {
    return http.get(`/parkingLot/${id}`)
  },
  
  // 根据停车场ID查询停车场信息和社区信息
  getDetailsById(parkingLotId) {
    return http.get(`/complex/parkingLot/${parkingLotId}/detail`)
  },
  
  // 新增停车场
  create(data) {
    return http.post('/parkingLot', data)
  },
  
  // 修改停车场
  update(data) {
    return http.put('/parkingLot', data)
  },
  
  // 删除停车场
  delete(id) {
    return http.delete(`/parkingLot/${id}`)
  }
}

// 车位信息相关API
export const parkingSpaceApi = {
  // 分页查询车位信息
  getPage(params) {
    return http.get('/parkingSpace/page', { params })
  },
  
  // 搜索车位信息
  search(params) {
    return http.get('/parkingSpace/search', { params })
  },
  
  // 根据ID查询车位信息
  getById(id) {
    return http.get(`/parkingSpace/${id}`)
  },
  
  // 根据车位ID查询车位信息和停车场信息
  getDetailsById(parkingSpaceId) {
    return http.get(`/complex/parkingSpace/${parkingSpaceId}/detail`)
  },
  
  // 新增车位信息
  create(data) {
    return http.post('/parkingSpace', data)
  },
  
  // 修改车位信息
  update(data) {
    return http.put('/parkingSpace', data)
  },
  
  // 删除车位信息
  delete(id) {
    return http.delete(`/parkingSpace/${id}`)
  }
}

// 车辆信息相关API
export const vehicleApi = {
  // 分页查询车辆信息
  getPage(params) {
    return http.get('/vehicle/page', { params })
  },
  
  // 搜索车辆信息
  search(params) {
    return http.get('/vehicle/search', { params })
  },
  
  // 根据ID查询车辆信息
  getById(id) {
    return http.get(`/vehicle/${id}`)
  },
  
  // 根据车辆ID查询车辆信息和业主信息
  getDetailsById(vehicleId) {
    return http.get(`/complex/vehicle/${vehicleId}/details`)
  },
  
  // 新增车辆信息
  create(data) {
    const formData = new FormData()
    
    // 添加所有文本字段（排除 driverLicenseImageFile 和 vehicleImageFiles）
    Object.keys(data).forEach(key => {
      if (key !== 'driverLicenseImageFile' && key !== 'vehicleImageFiles' && key !== 'id' && data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key])
      }
    })
    
    // 处理驾照照片 - 单张模式
    if (data.driverLicenseImageFile) {
      let imageFile = null
      
      if (data.driverLicenseImageFile.raw && data.driverLicenseImageFile.raw instanceof File) {
        imageFile = data.driverLicenseImageFile.raw
      } else if (data.driverLicenseImageFile instanceof File) {
        imageFile = data.driverLicenseImageFile
      } else if (typeof data.driverLicenseImageFile === 'string' && data.driverLicenseImageFile.trim()) {
        formData.append('driverLicenseImageFile', data.driverLicenseImageFile)
      }
      
      if (imageFile) {
        formData.append('driverLicenseImageFile', imageFile)
      }
    }
    
    // 处理车辆照片 - 单张模式
    if (data.vehicleImageFiles) {
      let imageFile = null
      
      if (data.vehicleImageFiles.raw && data.vehicleImageFiles.raw instanceof File) {
        imageFile = data.vehicleImageFiles.raw
      } else if (data.vehicleImageFiles instanceof File) {
        imageFile = data.vehicleImageFiles
      } else if (typeof data.vehicleImageFiles === 'string' && data.vehicleImageFiles.trim()) {
        formData.append('vehicleImageFiles', data.vehicleImageFiles)
      }
      
      if (imageFile) {
        formData.append('vehicleImageFiles', imageFile)
      }
    }
    
    return http.post('/vehicle', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  // 修改车辆信息
  update(data) {
    const formData = new FormData()
    
    // 添加所有文本字段（排除 driverLicenseImageFile 和 vehicleImageFiles）
    Object.keys(data).forEach(key => {
      if (key !== 'driverLicenseImageFile' && key !== 'vehicleImageFiles' && data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key])
      }
    })
    
    // 处理驾照照片 - 单张模式
    if (data.driverLicenseImageFile) {
      let imageFile = null
      let existingUrl = null
      
      if (data.driverLicenseImageFile.raw && data.driverLicenseImageFile.raw instanceof File) {
        imageFile = data.driverLicenseImageFile.raw
      } else if (data.driverLicenseImageFile instanceof File) {
        imageFile = data.driverLicenseImageFile
      } else if (data.driverLicenseImageFile.url && typeof data.driverLicenseImageFile.url === 'string') {
        existingUrl = data.driverLicenseImageFile.url
      } else if (typeof data.driverLicenseImageFile === 'string' && data.driverLicenseImageFile.trim()) {
        existingUrl = data.driverLicenseImageFile
      }
      
      if (imageFile) {
        formData.append('driverLicenseImageFile', imageFile)
      }
      
      if (existingUrl) {
        formData.append('driverLicenseImageFile', existingUrl)
      }
    }
    
    // 处理车辆照片 - 单张模式
    if (data.vehicleImageFiles) {
      let imageFile = null
      let existingUrl = null
      
      if (data.vehicleImageFiles.raw && data.vehicleImageFiles.raw instanceof File) {
        imageFile = data.vehicleImageFiles.raw
      } else if (data.vehicleImageFiles instanceof File) {
        imageFile = data.vehicleImageFiles
      } else if (data.vehicleImageFiles.url && typeof data.vehicleImageFiles.url === 'string') {
        existingUrl = data.vehicleImageFiles.url
      } else if (typeof data.vehicleImageFiles === 'string' && data.vehicleImageFiles.trim()) {
        existingUrl = data.vehicleImageFiles
      }
      
      if (imageFile) {
        formData.append('vehicleImageFiles', imageFile)
      }
      
      if (existingUrl) {
        formData.append('vehicleImageFiles', existingUrl)
      }
    }
    
    return http.put(`/vehicle/${data.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  // 删除车辆信息
  delete(id) {
    return http.delete(`/vehicle/${id}`)
  },
  
  // 上传车辆驾照照片
  uploadDriverLicenseImage(id, formData) {
    return http.post(`/vehicle/${id}/driver-license-image`, formData)
  },
  
  // 获取车辆驾照照片
  getDriverLicenseImage(id) {
    return http.get(`/vehicle/${id}/driver-license-image`)
  },
  
  // 上传车辆信息照片
  uploadVehicleImages(id, formData) {
    return http.post(`/vehicle/${id}/vehicle-images`, formData)
  },
  
  // 获取车辆信息照片
  getVehicleImages(id) {
    return http.get(`/vehicle/${id}/vehicle-images`)
  }
}