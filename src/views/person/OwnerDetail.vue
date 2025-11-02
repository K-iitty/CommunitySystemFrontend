<template>
  <div class="owner-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>业主详情</span>
          <div>
            <el-button @click="viewOwnerMeterInfo" style="margin-right: 10px;">查看仪表信息</el-button>
            <el-button @click="goBack">返回</el-button>
          </div>
        </div>
      </template>
      
      <el-tabs v-model="activeTab">
        <el-tab-pane label="业主基本信息" name="basic">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">用户名：</span>
                <span class="info-value">{{ ownerData.username }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">姓名：</span>
                <span class="info-value">{{ ownerData.name }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">手机号：</span>
                <span class="info-value">{{ ownerData.phone }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">身份证号：</span>
                <span class="info-value">{{ ownerData.idCard }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">性别：</span>
                <span class="info-value">{{ ownerData.gender }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">出生日期：</span>
                <span class="info-value">{{ ownerData.birthDate }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">业主类型：</span>
                <span class="info-value">{{ ownerData.ownerType }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">民族：</span>
                <span class="info-value">{{ ownerData.nationality }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">政治面貌：</span>
                <span class="info-value">{{ ownerData.politicalStatus }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">婚姻状况：</span>
                <span class="info-value">{{ ownerData.maritalStatus }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">户籍类型：</span>
                <span class="info-value">{{ ownerData.householdType }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">户籍地址：</span>
                <span class="info-value">{{ ownerData.censusRegister }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">状态：</span>
                <span class="info-value">
                  <el-tag v-if="ownerData.status === '正常'" type="success">正常</el-tag>
                  <el-tag v-else type="info">注销</el-tag>
                </span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">认证状态：</span>
                <span class="info-value">
                  <el-tag v-if="ownerData.verifyStatus === '已认证'" type="success">已认证</el-tag>
                  <el-tag v-else-if="ownerData.verifyStatus === '未认证'" type="warning">未认证</el-tag>
                  <el-tag v-else type="info">{{ ownerData.verifyStatus }}</el-tag>
                </span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="info-item">
                <span class="info-label">备注：</span>
                <span class="info-value">{{ ownerData.remark }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">创建时间：</span>
                <span class="info-value">{{ ownerData.createdAt }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">更新时间：</span>
                <span class="info-value">{{ ownerData.updatedAt }}</span>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        
        <el-tab-pane label="居住信息" name="residence">
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="info-item">
                <span class="info-label">现住址：</span>
                <span class="info-value">{{ ownerData.currentAddress }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">居住类型：</span>
                <span class="info-value">{{ ownerData.residenceType }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">暂住证号：</span>
                <span class="info-value">{{ ownerData.temporaryResidentNo }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">入住日期：</span>
                <span class="info-value">{{ ownerData.moveInDate }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">迁出日期：</span>
                <span class="info-value">{{ ownerData.moveOutDate }}</span>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        
        <el-tab-pane label="联系信息" name="contact">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">紧急联系人：</span>
                <span class="info-value">{{ ownerData.emergencyContactName }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">与本人关系：</span>
                <span class="info-value">{{ ownerData.emergencyContactRelation }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-label">紧急联系电话：</span>
                <span class="info-value">{{ ownerData.emergencyContactPhone }}</span>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        
        <el-tab-pane label="证件图片" name="images">
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="info-item">
                <span class="info-label">门禁照片：</span>
                <div class="image-gallery-container">
                  <ImageGallery :image-data="ownerData.accessControlPhotos" size="default" />
                </div>
                <div class="image-upload-container">
                  <el-upload
                    :action="getUploadUrl('access-control')"
                    :headers="uploadHeaders"
                    :on-success="(response) => handleUploadSuccess(response, 'accessControlPhotos')"
                    :on-error="handleUploadError"
                    :before-upload="beforeUpload"
                    multiple
                    :file-list="accessControlPhotosFileList"
                    list-type="picture-card"
                  >
                    <el-icon><Plus /></el-icon>
                    <div class="el-upload__text">点击上传门禁照片</div>
                  </el-upload>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="info-item">
                <span class="info-label">身份证照片：</span>
                <div class="image-gallery-container">
                  <ImageGallery :image-data="ownerData.idCardPhotos" size="default" />
                </div>
                <div class="image-upload-container">
                  <el-upload
                    :action="getUploadUrl('id-card')"
                    :headers="uploadHeaders"
                    :on-success="(response) => handleUploadSuccess(response, 'idCardPhotos')"
                    :on-error="handleUploadError"
                    :before-upload="beforeUpload"
                    multiple
                    :file-list="idCardPhotosFileList"
                    list-type="picture-card"
                    :limit="2"
                    :on-exceed="() => handleExceed(2)"
                  >
                    <el-icon><Plus /></el-icon>
                    <div class="el-upload__text">点击上传身份证照片</div>
                  </el-upload>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        
        <el-tab-pane label="房屋信息" name="houses">
          <el-table :data="ownerHouses" style="width: 100%" v-if="ownerHouses.length > 0">
            <el-table-column prop="house.houseCode" label="房屋编码" width="150">
              <template #default="scope">
                <el-link type="primary" @click="viewHouseDetail(scope.row.house.id)">
                  {{ scope.row.house.houseCode }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="house.fullRoomNo" label="完整房号" width="150" />
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
          <el-empty description="暂无房屋信息" v-else />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ownerApi } from '@/api/person'
import { houseOwnerApi } from '@/api/person'
import { createFileFormData } from '@/utils/fileUpload'
import ImageGallery from '@/components/ImageGallery.vue'
import { Plus } from '@element-plus/icons-vue'

export default {
  name: 'OwnerDetail',
  components: {
    ImageGallery,
    Plus
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('basic')
    
    const ownerData = reactive({
      id: null,
      username: '',
      name: '',
      phone: '',
      idCard: '',
      gender: '',
      birthDate: '',
      ownerType: '',
      nationality: '',
      politicalStatus: '',
      maritalStatus: '',
      householdType: '',
      censusRegister: '',
      temporaryResidentNo: '',
      currentAddress: '',
      emergencyContactName: '',
      emergencyContactRelation: '',
      emergencyContactPhone: '',
      residenceType: '',
      moveInDate: '',
      moveOutDate: '',
      status: '',
      verifyStatus: '',
      remark: '',
      accessControlPhotos: [],
      idCardPhotos: [],
      createdAt: '',
      updatedAt: ''
    })
    
    const ownerHouses = ref([])
    
    // 上传相关
    const accessControlPhotosFileList = ref([])
    const idCardPhotosFileList = ref([])
    const uploadHeaders = {
      'Authorization': localStorage.getItem('token') || ''
    }
    
    // 获取上传URL
    const getUploadUrl = (type) => {
      switch (type) {
        case 'access-control':
          return `/api/owner/${ownerData.id}/access-control-photos`
        case 'id-card':
          return `/api/owner/${ownerData.id}/id-card-photos`
        default:
          return ''
      }
    }
    
    // 上传成功处理
    const handleUploadSuccess = async (response, fieldName) => {
      if (response && response.data) {
        // 更新业主信息
        try {
          // 获取最新的业主信息
          const res = await ownerApi.getById(ownerData.id)
          Object.assign(ownerData, res.data)
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
    
    // 超出限制处理
    const handleExceed = (limit) => {
      ElMessage.warning(`最多只能上传 ${limit} 张图片`)
    }
    
    // 获取业主详情
    const fetchOwnerDetail = async (id) => {
      try {
        const res = await ownerApi.getById(id)
        Object.assign(ownerData, res.data)
      } catch (error) {
        ElMessage.error('获取业主详情失败')
        console.error(error)
      }
    }
    
    // 获取业主房屋关联信息
    const fetchOwnerHouses = async (ownerId) => {
      try {
        const res = await houseOwnerApi.searchDetail({ ownerId })
        ownerHouses.value = res.data.records || []
      } catch (error) {
        ElMessage.error('获取业主房屋信息失败')
        console.error(error)
      }
    }
    
    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }
    
    // 查看房屋详情
    const viewHouseDetail = (houseId) => {
      router.push(`/house-detail/${houseId}`)
    }
    
    // 查看业主仪表信息
    const viewOwnerMeterInfo = () => {
      router.push(`/owner-meter-info/${ownerData.id}`)
    }
    
    onMounted(() => {
      const ownerId = route.params.id
      if (ownerId) {
        fetchOwnerDetail(ownerId)
        fetchOwnerHouses(ownerId)
      }
    })
    
    return {
      activeTab,
      ownerData,
      ownerHouses,
      accessControlPhotosFileList,
      idCardPhotosFileList,
      uploadHeaders,
      getUploadUrl,
      handleUploadSuccess,
      handleUploadError,
      beforeUpload,
      handleExceed,
      goBack,
      viewHouseDetail,
      viewOwnerMeterInfo
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

.owner-detail {
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