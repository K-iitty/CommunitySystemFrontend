import http from './http'

// 社区信息相关API
export const communityApi = {
  // 分页查询社区信息
  getPage(params) {
    return http.get('/community/page', { params })
  },
  
  // 搜索社区信息
  search(params) {
    return http.get('/community/search', { params })
  },

  // 根据ID查询社区信息
  getById(id) {
    return http.get(`/community/${id}`)
  },

  // 新增社区信息（支持上传图片）
  create(data) {
    const formData = new FormData();
    
    // 添加所有文本字段（排除id和communityImages）
    Object.keys(data).forEach(key => {
      if (key !== 'communityImages' && key !== 'id' && data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    // 添加图片文件
    if (data.communityImages) {
      let imageFile = null;
      
      // 处理不同类型的图片数据
      if (data.communityImages.raw) {
        // Element Plus Upload 组件中的文件对象
        imageFile = data.communityImages.raw;
      } else if (data.communityImages.file) {
        imageFile = data.communityImages.file;
      } else if (data.communityImages instanceof File) {
        imageFile = data.communityImages;
      } else if (data.communityImages.originFileObj) {
        // 支持 ant-design-vue 文件对象
        imageFile = data.communityImages.originFileObj;
      } else if (typeof data.communityImages === 'string' && data.communityImages.trim()) {
        // 如果是URL字符串，作为文件参数直接提交
        formData.append('communityImages', data.communityImages);
      }
      
      if (imageFile) {
        formData.append('files', imageFile);
      }
    }
    
    console.log('发送的FormData内容:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
    return http.post('/community', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  // 修改社区信息（支持上传图片）
  update(data) {
    const formData = new FormData();
    
    // 添加所有文本字段（排除communityImages）
    Object.keys(data).forEach(key => {
      if (key !== 'communityImages' && data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    // 处理图片数据
    if (data.communityImages) {
      let imageFile = null;
      let existingUrl = null;
      
      // 处理不同类型的图片数据
      if (data.communityImages.raw) {
        // 新上传的文件
        imageFile = data.communityImages.raw;
      } else if (data.communityImages.file) {
        imageFile = data.communityImages.file;
      } else if (data.communityImages instanceof File) {
        imageFile = data.communityImages;
      } else if (data.communityImages.originFileObj) {
        imageFile = data.communityImages.originFileObj;
      } else if (data.communityImages.url) {
        // 已存在的图片URL
        existingUrl = data.communityImages.url;
      } else if (typeof data.communityImages === 'string' && data.communityImages.trim()) {
        // URL字符串
        existingUrl = data.communityImages;
      }
      
      // 上传新文件
      if (imageFile) {
        formData.append('files', imageFile);
      }
      
      // 保留已存在的URL
      if (existingUrl) {
        formData.append('communityImages', existingUrl);
      }
    }
    
    console.log('发送的FormData内容:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
    return http.put(`/community/${data.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  // 删除社区信息
  delete(id) {
    return http.delete(`/community/${id}`)
  },
  
  // 上传社区图片
  uploadCommunityImages(id, formData) {
    return http.post(`/communityInfo/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  // 获取社区图片
  getCommunityImages(id) {
    return http.get(`/communityInfo/${id}/images`)
  }
}

// 楼栋信息相关API
export const buildingApi = {
  // 分页查询楼栋信息
  getPage(params) {
    return http.get('/building/page', { params })
  },
  
  // 搜索楼栋信息
  search(params) {
    return http.get('/building/search', { params })
  },

  // 根据ID查询楼栋信息
  getById(id) {
    return http.get(`/building/${id}`)
  },
  
  // 根据楼栋ID查询楼栋信息和社区信息
  getDetailsById(buildingId) {
    return http.get(`/complex/building/${buildingId}/details`)
  },

  // 新增楼栋信息
  create(data) {
    // 排除id字段，避免自增主键冲突
    const submitData = {};
    Object.keys(data).forEach(key => {
      if (key !== 'id') {
        submitData[key] = data[key];
      }
    });
    return http.post('/building', submitData)
  },

  // 修改楼栋信息
  update(data) {
    return http.put('/building', data)
  },

  // 删除楼栋信息
  delete(id) {
    return http.delete(`/building/${id}`)
  }
}

// 房屋信息相关API
export const houseApi = {
  // 分页查询房屋信息
  getPage(params) {
    return http.get('/house/page', { params })
  },
  
  // 搜索房屋信息
  search(params) {
    return http.get('/house/search', { params })
  },

  // 根据ID查询房屋信息
  getById(id) {
    return http.get(`/house/${id}`)
  },
  
  // 根据房屋ID查询房屋信息、楼栋信息和社区信息
  getDetailsById(houseId) {
    return http.get(`/complex/house/${houseId}/details`)
  },

  // 新增房屋信息（支持同时上传户型图）
  create(data) {
    const formData = new FormData();
    
    // 添加所有文本字段（排除id和floorPlanImage）
    Object.keys(data).forEach(key => {
      if (key !== 'floorPlanImage' && key !== 'id' && data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    // 添加户型图文件
    if (data.floorPlanImage && data.floorPlanImage instanceof File) {
      formData.append('file', data.floorPlanImage);
    } else if (data.floorPlanImage && typeof data.floorPlanImage === 'string' && data.floorPlanImage.trim()) {
      // 如果是URL字符串，直接添加到formData
      formData.append('floorPlanImage', data.floorPlanImage);
    }
    
    console.log('发送的FormData内容:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
    return http.post('/house', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  // 修改房屋信息（支持同时上传户型图）
  update(data) {
    const formData = new FormData();
    
    // 添加所有文本字段（排除floorPlanImage）
    Object.keys(data).forEach(key => {
      if (key !== 'floorPlanImage' && data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    // 处理户型图数据
    if (data.floorPlanImage) {
      // 如果是File对象，说明是新上传的文件
      if (data.floorPlanImage instanceof File) {
        formData.append('file', data.floorPlanImage);
      } else if (typeof data.floorPlanImage === 'string' && data.floorPlanImage.trim()) {
        // 如果是URL字符串，直接作为参数提交
        formData.append('floorPlanImage', data.floorPlanImage);
      }
    }
    
    console.log('发送的FormData内容:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
    return http.put(`/house/${data.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  // 删除房屋信息
  delete(id) {
    return http.delete(`/house/${id}`)
  },
  
  // 上传户型图
  uploadFloorPlanImage(id, formData) {
    return http.post(`/house/${id}/floor-plan-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  // 获取户型图
  getFloorPlanImage(id) {
    return http.get(`/house/${id}/floor-plan-image`)
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
  },
  
  // 修改房屋业主关联信息
  update(data) {
    return http.put('/houseOwner', data)
  },
  
  // 删除房屋业主关联信息
  delete(id) {
    return http.delete(`/houseOwner/${id}`)
  },
  
  // 批量删除房屋业主关联信息
  batchDelete(ids) {
    return http.delete('/houseOwner/batch', { data: ids })
  }
}