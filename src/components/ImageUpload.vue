<template>
  <div class="image-upload">
    <el-upload
      :action="uploadUrl"
      :headers="uploadHeaders"
      v-model:file-list="fileList"
      :limit="maxCount === 0 ? 1 : maxCount"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :auto-upload="false"
      list-type="picture-card"
      accept="image/*"
    >
      <el-icon><Plus /></el-icon>
      <template #file="{ file }">
        <div class="el-upload-list__item-wrapper">
          <img 
            class="el-upload-list__item-thumbnail" 
            :src="getImageSrc(file)" 
            alt="图片预览"
            @error="handleImageError"
          />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
              <el-icon><zoom-in /></el-icon>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemoveClick(file)">
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    
    <el-dialog v-model="dialogVisible" :title="previewTitle">
      <img :src="dialogImageUrl" alt="Preview Image" style="width: 100%; max-height: 70vh;" />
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue'

export default {
  name: 'ImageUpload',
  components: {
    Plus,
    ZoomIn,
    Delete
  },
  props: {
    modelValue: {
      type: [String, Array, Object],
      default: () => []
    },
    maxCount: {
      type: Number,
      default: 1
    },
    uploadUrl: {
      type: String,
      default: '/api/upload/image'
    },
    uploadHeaders: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const previewTitle = ref('')
    const fileList = ref([])
    const objectUrls = ref(new Map())
    
    // 获取图片源
    const getImageSrc = (file) => {
      // 如果有URL，直接使用
      if (file.url) {
        return file.url
      }
      // 如果有raw属性（新选择的文件），创建对象URL
      if (file.raw) {
        // 检查是否已经创建过这个文件的URL
        const fileKey = `${file.name}_${file.size}_${file.lastModified}`
        if (!objectUrls.value.has(fileKey)) {
          const url = URL.createObjectURL(file.raw)
          objectUrls.value.set(fileKey, url)
        }
        return objectUrls.value.get(fileKey)
      }
      return ''
    }
    
    // 监听modelValue变化，更新fileList
    watch(() => props.modelValue, (newVal) => {
      if (!newVal) {
        fileList.value = []
        return
      }
      
      let imageUrl = null
      
      // 单张图片模式
      if (props.maxCount === 1) {
        if (typeof newVal === 'string' && newVal.trim()) {
          imageUrl = newVal
        } else if (typeof newVal === 'object' && newVal.url) {
          imageUrl = newVal.url
        } else if (newVal instanceof File) {
          // 如果是File对象，直接添加
          fileList.value = [{
            name: newVal.name,
            raw: newVal,
            size: newVal.size
          }]
          return
        }
      } else if (Array.isArray(newVal)) {
        // 多张图片模式
        fileList.value = newVal.map((item, index) => {
          if (typeof item === 'string') {
            return { name: `image_${index}`, url: item }
          } else if (item instanceof File) {
            return { name: item.name, raw: item }
          } else {
            return item
          }
        })
        return
      }
      
      // 单张图片模式的处理
      if (imageUrl) {
        fileList.value = [{
          name: 'image',
          url: imageUrl,
          status: 'success'
        }]
      } else {
        fileList.value = []
      }
    }, { immediate: true, deep: true })
    
    // 处理上传成功
    const handleSuccess = (response, file, fileListData) => {
      if (response && response.data && response.data.url) {
        if (props.maxCount === 1) {
          emit('update:modelValue', response.data.url)
        } else {
          const urls = fileListData.map(item => item.response?.data?.url || item.url)
          emit('update:modelValue', urls)
        }
      } else {
        ElMessage.error('图片上传失败')
      }
    }
    
    // 处理文件移除
    const handleRemove = (file, fileListData) => {
      if (props.maxCount === 1) {
        emit('update:modelValue', null)
      } else {
        const urls = fileListData.map(item => item.url)
        emit('update:modelValue', urls)
      }
    }
    
    // 处理移除点击
    const handleRemoveClick = (file) => {
      const index = fileList.value.indexOf(file)
      if (index !== -1) {
        fileList.value.splice(index, 1)
        handleRemove(file, fileList.value)
      }
    }
    
    // 处理文件选择变化
    const handleChange = (uploadFile, fileListData) => {
      if (props.maxCount === 1 && fileListData.length > 0) {
        // 单张图片模式，只保留最后一个文件
        const lastFile = fileListData[fileListData.length - 1]
        if (lastFile.raw) {
          emit('update:modelValue', lastFile)
        } else if (lastFile.url) {
          emit('update:modelValue', { url: lastFile.url, name: lastFile.name })
        }
      } else if (Array.isArray(fileListData)) {
        // 多张图片模式
        const images = fileListData.map(item => {
          if (item.raw) {
            return item
          } else if (item.url) {
            return { url: item.url, name: item.name }
          }
          return item
        })
        emit('update:modelValue', images)
      }
    }
    
    // 文件超出限制
    const handleExceed = (files, fileListData) => {
      ElMessage.warning(`当前最多只能上传 ${props.maxCount} 张图片`)
    }
    
    // 上传前的钩子
    const beforeUpload = (file) => {
      const isImage = file.type.startsWith('image/')
      const isLt2M = file.size / 1024 / 1024 < 2
      
      if (!isImage) {
        ElMessage.error('上传图片只能是图片格式!')
      }
      if (!isLt2M) {
        ElMessage.error('上传图片大小不能超过 2MB!')
      }
      return isImage && isLt2M
    }
    
    // 点击预览
    const handlePictureCardPreview = (file) => {
      dialogImageUrl.value = getImageSrc(file)
      dialogVisible.value = true
      previewTitle.value = '图片预览'
    }
    
    // 处理图片加载失败
    const handleImageError = (e) => {
      console.error('图片加载失败:', e)
    }
    
    return {
      dialogImageUrl,
      dialogVisible,
      previewTitle,
      fileList,
      getImageSrc,
      handleSuccess,
      handleRemove,
      handleRemoveClick,
      handleExceed,
      beforeUpload,
      handlePictureCardPreview,
      handleChange,
      handleImageError
    }
  }
}
</script>

<style scoped>
.image-upload :deep(.el-upload--picture-card) {
  width: 120px;
  height: 120px;
}

.image-upload :deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 120px;
  height: 120px;
  margin: 0;
}

.el-upload-list__item-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.el-upload-list__item-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}

.image-upload :deep(.el-upload-list__item-actions) {
  display: flex;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px 8px;
  border-radius: 4px;
}

.image-upload :deep(.el-upload-list__item:hover .el-upload-list__item-actions) {
  opacity: 1;
}

.image-upload :deep(.el-upload-list__item-preview),
.image-upload :deep(.el-upload-list__item-delete) {
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  font-size: 14px;
}

.image-upload :deep(.el-upload-list__item-preview:hover),
.image-upload :deep(.el-upload-list__item-delete:hover) {
  transform: scale(1.2);
}
</style>