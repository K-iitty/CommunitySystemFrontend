<template>
  <div class="notice-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>社区公告详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="公告信息" name="communityNotice">
          <div v-if="noticeData.communityNotice">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">公告ID：</span>
                  <span class="info-value">{{ noticeData.communityNotice.id }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">社区ID：</span>
                  <span class="info-value">{{ noticeData.communityNotice.communityId }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">创建人ID：</span>
                  <span class="info-value">{{ noticeData.communityNotice.createdBy }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">公告标题：</span>
                  <span class="info-value">{{ noticeData.communityNotice.title }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="info-item">
                  <span class="info-label">公告内容：</span>
                  <span class="info-value">{{ noticeData.communityNotice.content }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">公告类型：</span>
                  <span class="info-value">{{ noticeData.communityNotice.noticeType }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">活动日期：</span>
                  <span class="info-value">{{ noticeData.communityNotice.activityDate }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">活动时间：</span>
                  <span class="info-value">{{ noticeData.communityNotice.activityTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">活动地点：</span>
                  <span class="info-value">{{ noticeData.communityNotice.activityLocation }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">活动组织者：</span>
                  <span class="info-value">{{ noticeData.communityNotice.activityOrganizer }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">活动联系人：</span>
                  <span class="info-value">{{ noticeData.communityNotice.activityContact }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">联系人电话：</span>
                  <span class="info-value">{{ noticeData.communityNotice.activityContactPhone }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">目标受众：</span>
                  <span class="info-value">{{ noticeData.communityNotice.targetAudience }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">目标楼栋：</span>
                  <span class="info-value">{{ noticeData.communityNotice.targetBuildings }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">目标业主类型：</span>
                  <span class="info-value">{{ noticeData.communityNotice.targetOwnerTypes }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">发布时间：</span>
                  <span class="info-value">{{ noticeData.communityNotice.publishTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">开始时间：</span>
                  <span class="info-value">{{ noticeData.communityNotice.startTime }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">结束时间：</span>
                  <span class="info-value">{{ noticeData.communityNotice.endTime }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">是否紧急：</span>
                  <span class="info-value">
                    <el-tag v-if="noticeData.communityNotice.isUrgent === 1" type="success">是</el-tag>
                    <el-tag v-else type="info">否</el-tag>
                  </span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">是否置顶：</span>
                  <span class="info-value">
                    <el-tag v-if="noticeData.communityNotice.isTop === 1" type="success">是</el-tag>
                    <el-tag v-else type="info">否</el-tag>
                  </span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">置顶结束时间：</span>
                  <span class="info-value">{{ noticeData.communityNotice.topEndTime }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">阅读次数：</span>
                  <span class="info-value">{{ noticeData.communityNotice.readCount }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">附件：</span>
                  <span class="info-value">{{ noticeData.communityNotice.attachments }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">状态：</span>
                  <span class="info-value">{{ noticeData.communityNotice.status }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">审批状态：</span>
                  <span class="info-value">{{ noticeData.communityNotice.approvalStatus }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">审批人：</span>
                  <span class="info-value">{{ noticeData.communityNotice.approvedBy }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">审批时间：</span>
                  <span class="info-value">{{ noticeData.communityNotice.approvedAt }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="info-item">
                  <span class="info-label">备注：</span>
                  <span class="info-value">{{ noticeData.communityNotice.remark }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">创建时间：</span>
                  <span class="info-value">{{ noticeData.communityNotice.createdAt }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <span class="info-label">更新时间：</span>
                  <span class="info-value">{{ noticeData.communityNotice.updatedAt }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-empty description="暂无公告信息" v-else />
        </el-tab-pane>
        
        <el-tab-pane label="公告图片" name="images">
          <div v-if="noticeData.communityNotice">
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="info-item">
                  <span class="info-label">公告图片：</span>
                  <div class="image-gallery-container">
                    <ImageGallery :image-data="noticeData.communityNotice.noticeImages" size="default" />
                  </div>
                  <div class="image-upload-container">
                    <el-upload
                      :action="getUploadUrl('notice-images')"
                      :headers="uploadHeaders"
                      :on-success="(response) => handleUploadSuccess(response, 'noticeImages')"
                      :on-error="handleUploadError"
                      :before-upload="beforeUpload"
                      multiple
                      :file-list="noticeImagesFileList"
                      list-type="picture-card"
                    >
                      <el-icon><Plus /></el-icon>
                      <div class="el-upload__text">点击上传公告图片</div>
                    </el-upload>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-empty description="暂无公告信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="社区信息" name="communityInfo">
          <el-descriptions :column="2" border v-if="noticeData.communityInfo">
            <el-descriptions-item label="社区ID">{{ noticeData.communityInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="社区名称">{{ noticeData.communityInfo.communityName }}</el-descriptions-item>
            <el-descriptions-item label="社区编码">{{ noticeData.communityInfo.communityCode }}</el-descriptions-item>
            <el-descriptions-item label="省份">{{ noticeData.communityInfo.province }}</el-descriptions-item>
            <el-descriptions-item label="城市">{{ noticeData.communityInfo.city }}</el-descriptions-item>
            <el-descriptions-item label="区县">{{ noticeData.communityInfo.district }}</el-descriptions-item>
            <el-descriptions-item label="区域编码">{{ noticeData.communityInfo.areaCode }}</el-descriptions-item>
            <el-descriptions-item label="详细地址">{{ noticeData.communityInfo.detailAddress }}</el-descriptions-item>
            <el-descriptions-item label="总楼栋数">{{ noticeData.communityInfo.totalBuildings }}</el-descriptions-item>
            <el-descriptions-item label="总户数">{{ noticeData.communityInfo.totalHouseholds }}</el-descriptions-item>
            <el-descriptions-item label="总面积">{{ noticeData.communityInfo.totalArea }}</el-descriptions-item>
            <el-descriptions-item label="建筑面积">{{ noticeData.communityInfo.buildingArea }}</el-descriptions-item>
            <el-descriptions-item label="停车面积">{{ noticeData.communityInfo.parkingArea }}</el-descriptions-item>
            <el-descriptions-item label="绿化面积">{{ noticeData.communityInfo.greenArea }}</el-descriptions-item>
            <el-descriptions-item label="公摊面积">{{ noticeData.communityInfo.publicArea }}</el-descriptions-item>
            <el-descriptions-item label="物业经理ID">{{ noticeData.communityInfo.managerStaffId }}</el-descriptions-item>
            <el-descriptions-item label="物业经理姓名">{{ noticeData.communityInfo.managerName }}</el-descriptions-item>
            <el-descriptions-item label="物业经理电话">{{ noticeData.communityInfo.managerPhone }}</el-descriptions-item>
            <el-descriptions-item label="物业经理备注">{{ noticeData.communityInfo.managerRemark }}</el-descriptions-item>
            <el-descriptions-item label="物业公司">{{ noticeData.communityInfo.propertyCompany }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ noticeData.communityInfo.contactPhone }}</el-descriptions-item>
            <el-descriptions-item label="建成年份">{{ noticeData.communityInfo.builtYear }}</el-descriptions-item>
            <el-descriptions-item label="入住率">{{ noticeData.communityInfo.occupancyRate }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ noticeData.communityInfo.status }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ noticeData.communityInfo.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ noticeData.communityInfo.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ noticeData.communityInfo.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无社区信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="发布人信息" name="publisher">
          <el-descriptions :column="2" border v-if="noticeData.publisher">
            <el-descriptions-item label="发布人ID">{{ noticeData.publisher.id }}</el-descriptions-item>
            <el-descriptions-item label="用户名">{{ noticeData.publisher.username }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ noticeData.publisher.email }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ noticeData.publisher.phone }}</el-descriptions-item>
            <el-descriptions-item label="真实姓名">{{ noticeData.publisher.realName }}</el-descriptions-item>
            <el-descriptions-item label="昵称">{{ noticeData.publisher.nickname }}</el-descriptions-item>
            <el-descriptions-item label="头像">{{ noticeData.publisher.avatar }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ noticeData.publisher.gender }}</el-descriptions-item>
            <el-descriptions-item label="出生日期">{{ noticeData.publisher.birthDate }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ noticeData.publisher.idCard }}</el-descriptions-item>
            <el-descriptions-item label="角色类型">{{ noticeData.publisher.roleType }}</el-descriptions-item>
            <el-descriptions-item label="权限">{{ noticeData.publisher.permissions }}</el-descriptions-item>
            <el-descriptions-item label="部门">{{ noticeData.publisher.department }}</el-descriptions-item>
            <el-descriptions-item label="职位">{{ noticeData.publisher.position }}</el-descriptions-item>
            <el-descriptions-item label="微信">{{ noticeData.publisher.wechat }}</el-descriptions-item>
            <el-descriptions-item label="QQ">{{ noticeData.publisher.qq }}</el-descriptions-item>
            <el-descriptions-item label="地址">{{ noticeData.publisher.address }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系人">{{ noticeData.publisher.emergencyContact }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系电话">{{ noticeData.publisher.emergencyPhone }}</el-descriptions-item>
            <el-descriptions-item label="最后登录时间">{{ noticeData.publisher.lastLoginTime }}</el-descriptions-item>
            <el-descriptions-item label="最后登录IP">{{ noticeData.publisher.lastLoginIp }}</el-descriptions-item>
            <el-descriptions-item label="登录次数">{{ noticeData.publisher.loginCount }}</el-descriptions-item>
            <el-descriptions-item label="登录失败次数">{{ noticeData.publisher.failedLoginCount }}</el-descriptions-item>
            <el-descriptions-item label="账户是否锁定">
              <el-tag v-if="noticeData.publisher.accountLocked === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="锁定截止时间">{{ noticeData.publisher.lockUntilTime }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ noticeData.publisher.status }}</el-descriptions-item>
            <el-descriptions-item label="邮箱是否验证">
              <el-tag v-if="noticeData.publisher.emailVerified === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="电话是否验证">
              <el-tag v-if="noticeData.publisher.phoneVerified === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="创建人">{{ noticeData.publisher.createdBy }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ noticeData.publisher.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ noticeData.publisher.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ noticeData.publisher.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无发布人信息" v-else />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { noticeApi } from '@/api/notice.js'
import ImageGallery from '@/components/ImageGallery.vue'
import { Plus } from '@element-plus/icons-vue'

export default {
  name: 'NoticeDetail',
  components: {
    ImageGallery,
    Plus
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('communityNotice')

    const noticeData = reactive({
      communityNotice: null,
      communityInfo: null,
      publisher: null
    })

    // 上传相关
    const noticeImagesFileList = ref([])
    const uploadHeaders = {
      'Authorization': localStorage.getItem('token') || ''
    }
    
    // 获取上传URL
    const getUploadUrl = (type) => {
      switch (type) {
        case 'notice-images':
          return `/api/communityNotice/${noticeData.communityNotice?.id}/images`
        default:
          return ''
      }
    }
    
    // 上传成功处理
    const handleUploadSuccess = async (response, fieldName) => {
      if (response && response.data) {
        // 更新公告信息
        try {
          // 获取最新的公告信息
          const res = await noticeApi.getDetailsById(noticeData.communityNotice.id)
          Object.assign(noticeData, res.data)
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

    // 获取社区公告详情
    const fetchNoticeDetail = async (noticeId) => {
      try {
        const res = await noticeApi.getDetailsById(noticeId)
        Object.assign(noticeData, res.data)
      } catch (error) {
        ElMessage.error('获取社区公告详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const noticeId = route.params.id
      if (noticeId) {
        fetchNoticeDetail(noticeId)
      }
    })

    return {
      activeTab,
      noticeData,
      noticeImagesFileList,
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

.notice-detail {
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