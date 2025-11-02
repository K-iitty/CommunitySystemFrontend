<template>
  <div class="community-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>社区详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>
      
      <el-tabs v-model="activeTab">
        <el-tab-pane label="社区基本信息" name="basic">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="社区ID">{{ communityData.id }}</el-descriptions-item>
            <el-descriptions-item label="社区名称">{{ communityData.communityName }}</el-descriptions-item>
            <el-descriptions-item label="社区编码">{{ communityData.communityCode }}</el-descriptions-item>
            <el-descriptions-item label="省份">{{ communityData.province }}</el-descriptions-item>
            <el-descriptions-item label="城市">{{ communityData.city }}</el-descriptions-item>
            <el-descriptions-item label="区县">{{ communityData.district }}</el-descriptions-item>
            <el-descriptions-item label="详细地址">{{ communityData.detailAddress }}</el-descriptions-item>
            <el-descriptions-item label="物业公司">{{ communityData.propertyCompany }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ communityData.contactPhone }}</el-descriptions-item>
            <el-descriptions-item label="楼栋总数">{{ communityData.totalBuildings }}</el-descriptions-item>
            <el-descriptions-item label="住户总数">{{ communityData.totalHouseholds }}</el-descriptions-item>
            <el-descriptions-item label="总面积">{{ communityData.totalArea }}㎡</el-descriptions-item>
            <el-descriptions-item label="建筑面积">{{ communityData.buildingArea }}㎡</el-descriptions-item>
            <el-descriptions-item label="停车场面积">{{ communityData.parkingArea }}㎡</el-descriptions-item>
            <el-descriptions-item label="绿化面积">{{ communityData.greenArea }}㎡</el-descriptions-item>
            <el-descriptions-item label="公共设施面积">{{ communityData.publicArea }}㎡</el-descriptions-item>
            <el-descriptions-item label="建成年份">{{ communityData.builtYear }}</el-descriptions-item>
            <el-descriptions-item label="入住率">{{ communityData.occupancyRate }}%</el-descriptions-item>
            <el-descriptions-item label="状态">{{ communityData.status }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ communityData.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ communityData.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ communityData.updatedAt }}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        
        <el-tab-pane label="社区图片" name="images">
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="info-item">
                <span class="info-label">社区图片:</span>
                <div class="image-gallery-container">
                  <ImageGallery :image-data="communityData.communityImages" size="default" />
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { communityApi } from '@/api/community'
import ImageGallery from '@/components/ImageGallery.vue'
import { Plus } from '@element-plus/icons-vue'

export default {
  name: 'CommunityDetail',
  components: {
    ImageGallery,
    Plus
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('basic')
    
    const communityData = reactive({
      id: null,
      communityName: '',
      communityCode: '',
      province: '',
      city: '',
      district: '',
      detailAddress: '',
      propertyCompany: '',
      contactPhone: '',
      totalBuildings: 0,
      totalHouseholds: 0,
      totalArea: 0,
      buildingArea: 0,
      parkingArea: 0,
      greenArea: 0,
      publicArea: 0,
      builtYear: 0,
      occupancyRate: 0,
      communityImages: [],
      status: '',
      remark: '',
      createdAt: '',
      updatedAt: ''
    })
    
    // 上传相关
    const communityImagesFileList = ref([])
    const uploadHeaders = {
      'Authorization': localStorage.getItem('token') || ''
    }
    
    // 获取上传URL
    const getUploadUrl = (type) => {
      switch (type) {
        case 'community-images':
          return `/api/communityInfo/${communityData.id}/images`
        default:
          return ''
      }
    }
    
    // 上传成功处理
    const handleUploadSuccess = async (response, fieldName) => {
      if (response && response.data) {
        // 更新社区信息
        try {
          // 获取最新的社区信息
          const res = await communityApi.getById(communityData.id)
          Object.assign(communityData, res.data)
          ElMessage.success('社区图片上传成功')
        } catch (error) {
          ElMessage.error('获取更新后的信息失败')
          console.error(error)
        }
      } else {
        ElMessage.error('社区图片上传失败')
      }
    }
    
    // 上传失败处理
    const handleUploadError = (error) => {
      ElMessage.error('社区图片上传失败: ' + error.message)
    }
    
    // 上传前检查
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

    // 获取社区详情
    const fetchCommunityDetail = async (id) => {
      try {
        const res = await communityApi.getById(id)
        Object.assign(communityData, res.data)
      } catch (error) {
        ElMessage.error('获取社区详情失败')
        console.error(error)
      }
    }
    
    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }
    
    onMounted(() => {
      const communityId = route.params.id
      if (communityId) {
        fetchCommunityDetail(communityId)
      }
    })
    
    return {
      activeTab,
      communityData,
      communityImagesFileList,
      uploadHeaders,
      getUploadUrl,
      handleUploadSuccess,
      handleUploadError,
      beforeUpload,
      goBack
    }
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.community-detail {
  padding: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 4px;
  background-color: #f5f7fa;
}

.info-label {
  font-weight: bold;
  color: #606266;
  margin-bottom: 5px;
}

.image-gallery-container {
  margin-bottom: 10px;
}

.image-upload-container {
  margin-top: 10px;
}

.el-upload__text {
  margin-top: 5px;
  font-size: 12px;
  color: #606266;
}
</style>