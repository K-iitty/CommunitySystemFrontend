<template>
  <div class="house-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>房屋详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>
      
      <el-tabs v-model="activeTab">
        <el-tab-pane label="房屋基本信息" name="basic">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="房屋编码">{{ houseData.houseCode }}</el-descriptions-item>
            <el-descriptions-item label="完整房号">{{ houseData.fullRoomNo }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ houseData.communityId }}</el-descriptions-item>
            <el-descriptions-item label="楼栋ID">{{ houseData.buildingId }}</el-descriptions-item>
            <el-descriptions-item label="房间号">{{ houseData.roomNo }}</el-descriptions-item>
            <el-descriptions-item label="建筑面积">{{ houseData.buildingArea }}㎡</el-descriptions-item>
            <el-descriptions-item label="使用面积">{{ houseData.usableArea }}㎡</el-descriptions-item>
            <el-descriptions-item label="公摊面积">{{ houseData.sharedArea }}㎡</el-descriptions-item>
            <el-descriptions-item label="房屋类型">{{ houseData.houseType }}</el-descriptions-item>
            <el-descriptions-item label="户型">{{ houseData.houseLayout }}</el-descriptions-item>
            <el-descriptions-item label="朝向">{{ houseData.houseOrientation }}</el-descriptions-item>
            <el-descriptions-item label="房屋状态">{{ houseData.houseStatus }}</el-descriptions-item>
            <el-descriptions-item label="装修状态">{{ houseData.decorationStatus }}</el-descriptions-item>
            <el-descriptions-item label="楼层">{{ houseData.floorLevel }}</el-descriptions-item>
            <el-descriptions-item label="是否有阳台">{{ houseData.hasBalcony === 1 ? '是' : '否' }}</el-descriptions-item>
            <el-descriptions-item label="是否有花园">{{ houseData.hasGarden === 1 ? '是' : '否' }}</el-descriptions-item>
            <el-descriptions-item label="车位号">{{ houseData.parkingSpaceNo }}</el-descriptions-item>
            <el-descriptions-item label="车位类型">{{ houseData.parkingType }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ houseData.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ houseData.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ houseData.updatedAt }}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        
        <el-tab-pane label="户型图" name="floorPlan">
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="info-item">
                <span class="info-label">户型图:</span>
                <div class="image-gallery-container">
                  <ImageGallery :image-data="houseData.floorPlanImage" size="default" />
                </div>
                <div class="image-upload-container">
                  <el-upload
                    :action="getUploadUrl('floor-plan')"
                    :headers="uploadHeaders"
                    :on-success="(response) => handleUploadSuccess(response, 'floorPlanImage')"
                    :on-error="handleUploadError"
                    :before-upload="beforeUpload"
                    :file-list="floorPlanImageFileList"
                    list-type="picture-card"
                  >
                    <el-icon><Plus /></el-icon>
                    <div class="el-upload__text">点击上传户型图</div>
                  </el-upload>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        
        <el-tab-pane label="业主信息" name="owners">
          <el-table :data="houseOwners" style="width: 100%" v-if="houseOwners.length > 0">
            <el-table-column prop="owner.name" label="业主姓名" width="120">
              <template #default="scope">
                <el-link type="primary" @click="viewOwnerDetail(scope.row.owner.id)">
                  {{ scope.row.owner.name }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="owner.phone" label="联系电话" width="120" />
            <el-table-column prop="houseOwner.relationship" label="关系" width="100" />
            <el-table-column prop="houseOwner.isPrimary" label="是否主要" width="100">
              <template #default="scope">
                <el-tag v-if="scope.row.houseOwner.isPrimary === 1" type="success">是</el-tag>
                <el-tag v-else type="info">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="houseOwner.status" label="状态" width="80" />
            <el-table-column prop="houseOwner.startDate" label="开始日期" width="120" />
            <el-table-column prop="houseOwner.createdAt" label="关联时间" width="180" />
          </el-table>
          <el-empty description="暂无业主信息" v-else />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { houseApi, houseOwnerApi } from '@/api/community'
import ImageGallery from '@/components/ImageGallery.vue'
import { Plus } from '@element-plus/icons-vue'

export default {
  name: 'HouseDetail',
  components: {
    ImageGallery,
    Plus
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('basic')
    
    const houseData = reactive({
      id: null,
      houseCode: '',
      fullRoomNo: '',
      communityId: '',
      buildingId: '',
      roomNo: '',
      buildingArea: 0,
      usableArea: 0,
      sharedArea: 0,
      houseType: '',
      houseLayout: '',
      houseOrientation: '',
      houseStatus: '',
      decorationStatus: '',
      floorLevel: '',
      hasBalcony: 0,
      hasGarden: 0,
      parkingSpaceNo: '',
      parkingType: '',
      floorPlanImage: '',
      remark: '',
      createdAt: '',
      updatedAt: ''
    })
    
    const houseOwners = ref([])
    
    // 上传相关
    const floorPlanImageFileList = ref([])
    const uploadHeaders = {
      'Authorization': localStorage.getItem('token') || ''
    }
    
    // 获取上传URL
    const getUploadUrl = (type) => {
      switch (type) {
        case 'floor-plan':
          return `/api/house/${houseData.id}/floor-plan-image`
        default:
          return ''
      }
    }
    
    // 上传成功处理
    const handleUploadSuccess = async (response, fieldName) => {
      if (response && response.data) {
        // 更新房屋信息
        try {
          // 获取最新的房屋信息
          const res = await houseApi.getById(houseData.id)
          Object.assign(houseData, res.data)
          ElMessage.success('户型图上传成功')
        } catch (error) {
          ElMessage.error('获取更新后的信息失败')
          console.error(error)
        }
      } else {
        ElMessage.error('户型图上传失败')
      }
    }
    
    // 上传失败处理
    const handleUploadError = (error) => {
      ElMessage.error('户型图上传失败: ' + error.message)
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

    // 获取房屋详情
    const fetchHouseDetail = async (id) => {
      try {
        const res = await houseApi.getById(id)
        Object.assign(houseData, res.data)
      } catch (error) {
        ElMessage.error('获取房屋详情失败')
        console.error(error)
      }
    }
    
    // 获取房屋业主关联信息
    const fetchHouseOwners = async (houseId) => {
      try {
        const res = await houseOwnerApi.searchDetail({ houseId })
        houseOwners.value = res.data.records || []
      } catch (error) {
        ElMessage.error('获取房屋业主信息失败')
        console.error(error)
      }
    }
    
    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }
    
    // 查看业主详情
    const viewOwnerDetail = (ownerId) => {
      router.push(`/owner-detail/${ownerId}`)
    }
    
    onMounted(() => {
      const houseId = route.params.id
      if (houseId) {
        fetchHouseDetail(houseId)
        fetchHouseOwners(houseId)
      }
    })
    
    return {
      activeTab,
      houseData,
      houseOwners,
      floorPlanImageFileList,
      uploadHeaders,
      getUploadUrl,
      handleUploadSuccess,
      handleUploadError,
      beforeUpload,
      goBack,
      viewOwnerDetail
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

.house-detail {
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