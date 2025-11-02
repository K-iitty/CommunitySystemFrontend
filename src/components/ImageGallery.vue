<template>
  <div class="image-gallery">
    <div v-if="images && images.length > 0" class="image-container">
      <el-image
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        :preview-src-list="images"
        :initial-index="index"
        :style="{ width: imageSize.width, height: imageSize.height }"
        fit="cover"
        class="image-item"
        loading="lazy"
      />
    </div>
    <el-empty v-else :image-size="emptyImageSize" description="暂无图片" />
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ImageGallery',
  props: {
    // 图片数据，可以是JSON字符串或数组
    imageData: {
      type: [String, Array],
      default: () => []
    },
    // 图片显示尺寸
    size: {
      type: String,
      default: 'default', // small, default, large, tiny
      validator: (value) => ['tiny', 'small', 'default', 'large'].includes(value)
    }
  },
  setup(props) {
    // 解析图片数据
    const images = computed(() => {
      if (!props.imageData) return []
      
      if (Array.isArray(props.imageData)) {
        return props.imageData
      }
      
      if (typeof props.imageData === 'string') {
        try {
          const parsed = JSON.parse(props.imageData)
          return Array.isArray(parsed) ? parsed : []
        } catch (e) {
          // 如果不是有效的JSON，可能是一个单独的URL
          return props.imageData ? [props.imageData] : []
        }
      }
      
      return []
    })
    
    // 根据size属性确定图片尺寸
    const imageSize = computed(() => {
      switch (props.size) {
        case 'tiny':
          return { width: '50px', height: '50px' }
        case 'small':
          return { width: '80px', height: '80px' }
        case 'large':
          return { width: '200px', height: '200px' }
        default:
          return { width: '120px', height: '120px' }
      }
    })
    
    // 根据size属性确定空图片占位符尺寸
    const emptyImageSize = computed(() => {
      switch (props.size) {
        case 'tiny':
          return 30
        case 'small':
          return 50
        case 'large':
          return 80
        default:
          return 60
      }
    })
    
    return {
      images,
      imageSize,
      emptyImageSize
    }
  }
}
</script>

<style scoped>
.image-gallery {
  width: 100%;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-item {
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.image-item:hover {
  transform: scale(1.05);
}
</style>