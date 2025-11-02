<template>
  <div class="staff-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>员工信息详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="员工信息" name="staff">
          <div v-if="staffData.staff">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">员工ID：</span>
                  <span class="info-value">{{ staffData.staff.id }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">用户名：</span>
                  <span class="info-value">{{ staffData.staff.username }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">姓名：</span>
                  <span class="info-value">{{ staffData.staff.name }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">手机号：</span>
                  <span class="info-value">{{ staffData.staff.phone }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">身份证号：</span>
                  <span class="info-value">{{ staffData.staff.idCard }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">工号：</span>
                  <span class="info-value">{{ staffData.staff.workNo }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">性别：</span>
                  <span class="info-value">{{ staffData.staff.gender }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">出生日期：</span>
                  <span class="info-value">{{ staffData.staff.birthDate }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">头像：</span>
                  <span class="info-value">{{ staffData.staff.avatar }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">邮箱：</span>
                  <span class="info-value">{{ staffData.staff.email }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">微信号：</span>
                  <span class="info-value">{{ staffData.staff.wechat }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">座机区号：</span>
                  <span class="info-value">{{ staffData.staff.telephoneAreaCode }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">座机号码：</span>
                  <span class="info-value">{{ staffData.staff.telephoneNumber }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">分机号：</span>
                  <span class="info-value">{{ staffData.staff.telephoneExtension }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">紧急联系人：</span>
                  <span class="info-value">{{ staffData.staff.emergencyContact }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">紧急联系电话：</span>
                  <span class="info-value">{{ staffData.staff.emergencyPhone }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">毕业院校：</span>
                  <span class="info-value">{{ staffData.staff.graduateSchool }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">毕业日期：</span>
                  <span class="info-value">{{ staffData.staff.graduationDate }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">学历：</span>
                  <span class="info-value">{{ staffData.staff.educationLevel }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">专业：</span>
                  <span class="info-value">{{ staffData.staff.major }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">部门ID：</span>
                  <span class="info-value">{{ staffData.staff.departmentId }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">角色ID：</span>
                  <span class="info-value">{{ staffData.staff.roleId }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">职位：</span>
                  <span class="info-value">{{ staffData.staff.position }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">职称：</span>
                  <span class="info-value">{{ staffData.staff.jobTitle }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">入职日期：</span>
                  <span class="info-value">{{ staffData.staff.hireDate }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">工作状态：</span>
                  <span class="info-value">{{ staffData.staff.workStatus }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">是否管理员：</span>
                  <span class="info-value">
                    <el-tag v-if="staffData.staff.isManager === 1" type="success">是</el-tag>
                    <el-tag v-else type="info">否</el-tag>
                  </span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">籍贯：</span>
                  <span class="info-value">{{ staffData.staff.nativePlace }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">账户状态：</span>
                  <span class="info-value">{{ staffData.staff.accountStatus }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">在线状态：</span>
                  <span class="info-value">
                    <el-tag v-if="staffData.staff.onlineStatus === 1" type="success">在线</el-tag>
                    <el-tag v-else type="info">离线</el-tag>
                  </span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">最后登录时间：</span>
                  <span class="info-value">{{ staffData.staff.lastLoginTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">最后登录IP：</span>
                  <span class="info-value">{{ staffData.staff.lastLoginIp }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">登录次数：</span>
                  <span class="info-value">{{ staffData.staff.loginCount }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">备注：</span>
                  <span class="info-value">{{ staffData.staff.remark }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">创建人：</span>
                  <span class="info-value">{{ staffData.staff.createdBy }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">创建时间：</span>
                  <span class="info-value">{{ staffData.staff.createdAt }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">更新时间：</span>
                  <span class="info-value">{{ staffData.staff.updatedAt }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-empty description="暂无员工信息" v-else />
        </el-tab-pane>
        
        <el-tab-pane label="证件图片" name="images">
          <div v-if="staffData.staff">
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="info-item">
                  <span class="info-label">身份证照片：</span>
                  <div class="image-gallery-container">
                    <ImageGallery :image-data="staffData.staff.idCardPhotos" size="default" />
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
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="info-item">
                  <span class="info-label">证件照等：</span>
                  <div class="image-gallery-container">
                    <ImageGallery :image-data="staffData.staff.certificatePhotos" size="default" />
                  </div>
                  <div class="image-upload-container">
                    <el-upload
                      :action="getUploadUrl('certificate')"
                      :headers="uploadHeaders"
                      :on-success="(response) => handleUploadSuccess(response, 'certificatePhotos')"
                      :on-error="handleUploadError"
                      :before-upload="beforeUpload"
                      multiple
                      :file-list="certificatePhotosFileList"
                      list-type="picture-card"
                    >
                      <el-icon><Plus /></el-icon>
                      <div class="el-upload__text">点击上传证件照</div>
                    </el-upload>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-empty description="暂无员工信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="部门信息" name="department">
          <el-descriptions :column="2" border v-if="staffData.department">
            <el-descriptions-item label="部门ID">{{ staffData.department.id }}</el-descriptions-item>
            <el-descriptions-item label="部门名称">{{ staffData.department.departmentName }}</el-descriptions-item>
            <el-descriptions-item label="父级部门ID">{{ staffData.department.parentId }}</el-descriptions-item>
            <el-descriptions-item label="部门编码">{{ staffData.department.departmentCode }}</el-descriptions-item>
            <el-descriptions-item label="部门层级">{{ staffData.department.departmentLevel }}</el-descriptions-item>
            <el-descriptions-item label="排序">{{ staffData.department.sortOrder }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ staffData.department.status }}</el-descriptions-item>
            <el-descriptions-item label="描述">{{ staffData.department.description }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ staffData.department.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ staffData.department.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无部门信息" v-else />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { staffApi } from '@/api/person'
import ImageGallery from '@/components/ImageGallery.vue'
import { Plus } from '@element-plus/icons-vue'

export default {
  name: 'StaffDetail',
  components: {
    ImageGallery,
    Plus
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('staff')

    const staffData = reactive({
      staff: null,
      department: null
    })

    // 上传相关
    const idCardPhotosFileList = ref([])
    const certificatePhotosFileList = ref([])
    const uploadHeaders = {
      'Authorization': localStorage.getItem('token') || ''
    }
    
    // 获取上传URL
    const getUploadUrl = (type) => {
      switch (type) {
        case 'id-card':
          return `/api/staff/${staffData.staff?.id}/id-card-photos`
        case 'certificate':
          return `/api/staff/${staffData.staff?.id}/certificate-photos`
        default:
          return ''
      }
    }
    
    // 上传成功处理
    const handleUploadSuccess = async (response, fieldName) => {
      if (response && response.data) {
        // 更新员工信息
        try {
          // 获取最新的员工信息
          const res = await staffApi.getDetailsById(staffData.staff.id)
          Object.assign(staffData, res.data)
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

    // 获取员工详情
    const fetchStaffDetail = async (staffId) => {
      try {
        const res = await staffApi.getDetailsById(staffId)
        Object.assign(staffData, res.data)
      } catch (error) {
        ElMessage.error('获取员工详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const staffId = route.params.id
      if (staffId) {
        fetchStaffDetail(staffId)
      }
    })

    return {
      activeTab,
      staffData,
      idCardPhotosFileList,
      certificatePhotosFileList,
      uploadHeaders,
      getUploadUrl,
      handleUploadSuccess,
      handleUploadError,
      beforeUpload,
      handleExceed,
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

.staff-detail {
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