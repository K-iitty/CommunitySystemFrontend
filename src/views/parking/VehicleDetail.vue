<template>
  <div class="vehicle-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>车辆信息详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="车辆信息" name="vehicle">
          <div v-if="vehicleData.vehicle">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">车辆ID：</span>
                  <span class="info-value">{{ vehicleData.vehicle.id }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">车主ID：</span>
                  <span class="info-value">{{ vehicleData.vehicle.ownerId }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">车牌号：</span>
                  <span class="info-value">{{ vehicleData.vehicle.plateNumber }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">车辆类型：</span>
                  <span class="info-value">{{ vehicleData.vehicle.vehicleType }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">品牌：</span>
                  <span class="info-value">{{ vehicleData.vehicle.brand }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">型号：</span>
                  <span class="info-value">{{ vehicleData.vehicle.model }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">颜色：</span>
                  <span class="info-value">{{ vehicleData.vehicle.color }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">固定车位ID：</span>
                  <span class="info-value">{{ vehicleData.vehicle.fixedSpaceId }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">车辆登记证号：</span>
                  <span class="info-value">{{ vehicleData.vehicle.vehicleLicenseNo }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">发动机号：</span>
                  <span class="info-value">{{ vehicleData.vehicle.engineNo }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">状态：</span>
                  <span class="info-value">{{ vehicleData.vehicle.status }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">注册日期：</span>
                  <span class="info-value">{{ vehicleData.vehicle.registerDate }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="info-item">
                  <span class="info-label">备注：</span>
                  <span class="info-value">{{ vehicleData.vehicle.remark }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">创建时间：</span>
                  <span class="info-value">{{ vehicleData.vehicle.createdAt }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">更新时间：</span>
                  <span class="info-value">{{ vehicleData.vehicle.updatedAt }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-empty description="暂无车辆信息" v-else />
        </el-tab-pane>
        
        <el-tab-pane label="车辆图片" name="images">
          <div v-if="vehicleData.vehicle">
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="info-item">
                  <span class="info-label">驾照照片：</span>
                  <div class="image-gallery-container">
                    <ImageGallery :image-data="vehicleData.vehicle.driverLicenseImage" size="default" />
                  </div>
                  <div class="image-upload-container">
                    <el-upload
                      :action="getUploadUrl('driver-license')"
                      :headers="uploadHeaders"
                      :on-success="(response) => handleUploadSuccess(response, 'driverLicenseImage')"
                      :on-error="handleUploadError"
                      :before-upload="beforeUpload"
                      :file-list="driverLicenseImageFileList"
                      list-type="picture-card"
                    >
                      <el-icon><Plus /></el-icon>
                      <div class="el-upload__text">点击上传驾照照片</div>
                    </el-upload>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="info-item">
                  <span class="info-label">车辆信息照片：</span>
                  <div class="image-gallery-container">
                    <ImageGallery :image-data="vehicleData.vehicle.vehicleImages" size="default" />
                  </div>
                  <div class="image-upload-container">
                    <el-upload
                      :action="getUploadUrl('vehicle-images')"
                      :headers="uploadHeaders"
                      :on-success="(response) => handleUploadSuccess(response, 'vehicleImages')"
                      :on-error="handleUploadError"
                      :before-upload="beforeUpload"
                      multiple
                      :file-list="vehicleImagesFileList"
                      list-type="picture-card"
                    >
                      <el-icon><Plus /></el-icon>
                      <div class="el-upload__text">点击上传车辆信息照片</div>
                    </el-upload>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-empty description="暂无车辆信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="业主信息" name="owner">
          <el-descriptions :column="2" border v-if="vehicleData.owner">
            <el-descriptions-item label="业主ID">{{ vehicleData.owner.id }}</el-descriptions-item>
            <el-descriptions-item label="用户名">{{ vehicleData.owner.username }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ vehicleData.owner.name }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ vehicleData.owner.phone }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ vehicleData.owner.idCard }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ vehicleData.owner.gender }}</el-descriptions-item>
            <el-descriptions-item label="业主类型">{{ vehicleData.owner.ownerType }}</el-descriptions-item>
            <el-descriptions-item label="民族">{{ vehicleData.owner.nationality }}</el-descriptions-item>
            <el-descriptions-item label="当前地址">{{ vehicleData.owner.currentAddress }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ vehicleData.owner.status }}</el-descriptions-item>
            <el-descriptions-item label="认证状态">{{ vehicleData.owner.verifyStatus }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ vehicleData.owner.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ vehicleData.owner.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ vehicleData.owner.updatedAt }}</el-descriptions-item>
          </el-descriptions>
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
import { vehicleApi } from '@/api/parking'
import ImageGallery from '@/components/ImageGallery.vue'
import { Plus } from '@element-plus/icons-vue'

export default {
  name: 'VehicleDetail',
  components: {
    ImageGallery,
    Plus
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('vehicle')

    const vehicleData = reactive({
      vehicle: null,
      owner: null
    })

    // 上传相关
    const driverLicenseImageFileList = ref([])
    const vehicleImagesFileList = ref([])
    const uploadHeaders = {
      'Authorization': localStorage.getItem('token') || ''
    }
    
    // 获取上传URL
    const getUploadUrl = (type) => {
      switch (type) {
        case 'driver-license':
          return `/api/vehicle/${vehicleData.vehicle?.id}/driver-license-image`
        case 'vehicle-images':
          return `/api/vehicle/${vehicleData.vehicle?.id}/vehicle-images`
        default:
          return ''
      }
    }
    
    // 上传成功处理
    const handleUploadSuccess = async (response, fieldName) => {
      if (response && response.data) {
        // 更新车辆信息
        try {
          // 获取最新的车辆信息
          const res = await vehicleApi.getDetailsById(vehicleData.vehicle.id)
          Object.assign(vehicleData, res.data)
          ElMessage.success('图片上传成功')
        } catch (error) {
          ElMessage.error('获取更新后的信息失败')
          console.error(error)
        }
      } else {
        ElMessage.error('图片上传失败')
      }
    }
    
    // 上传失败处理
    const handleUploadError = (error) => {
      ElMessage.error('图片上传失败: ' + error.message)
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

    // 获取车辆详情
    const fetchVehicleDetail = async (vehicleId) => {
      try {
        const res = await vehicleApi.getDetailsById(vehicleId)
        Object.assign(vehicleData, res.data)
      } catch (error) {
        ElMessage.error('获取车辆详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const vehicleId = route.params.id
      if (vehicleId) {
        fetchVehicleDetail(vehicleId)
      }
    })

    return {
      activeTab,
      vehicleData,
      driverLicenseImageFileList,
      vehicleImagesFileList,
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

.vehicle-detail {
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

.info-value {
  flex: 1;
  color: #303133;
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