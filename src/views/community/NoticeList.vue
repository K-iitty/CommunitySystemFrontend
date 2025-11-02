<template>
  <div class="notice-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>社区公告管理</span>
          <el-button type="primary" @click="handleCreate">新增公告</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="noticeApi.getPage"
        :search-api-function="noticeApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="公告标题">
              <el-input v-model="searchForm.title" placeholder="请输入公告标题" />
            </el-form-item>
            <el-form-item label="创建人">
              <el-input v-model="searchForm.createdBy" placeholder="请输入创建人" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="请选择状态" style="width: 100px;">
                <el-option label="全部" value="" />
                <el-option label="启用" value="启用" />
                <el-option label="停用" value="停用" />
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="公告ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewNoticeDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="communityId" label="社区ID" width="80" sortable />
        <el-table-column prop="title" label="公告标题" width="180" sortable />
        <el-table-column prop="noticeType" label="公告类型" width="120" sortable />
        <el-table-column prop="createdByName" label="发布人" width="100" sortable />
        <el-table-column prop="targetAudience" label="目标受众" width="100" sortable />
        <el-table-column prop="isUrgent" label="是否紧急" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.isUrgent ? 'danger' : 'info'">{{ scope.row.isUrgent ? '紧急' : '普通' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isTop" label="是否置顶" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.isTop ? 'warning' : 'info'">{{ scope.row.isTop ? '置顶' : '否' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="activityDate" label="活动日期" width="120" sortable />
        <el-table-column prop="activityTime" label="活动时间" width="120" sortable />
        <el-table-column prop="activityLocation" label="活动地点" width="150" sortable />
        <el-table-column prop="activityOrganizer" label="活动组织者" width="120" sortable />
        <el-table-column prop="readCount" label="阅读次数" width="100" sortable />
        <el-table-column prop="publishTime" label="发布时间" width="180" sortable />
        <el-table-column prop="startTime" label="生效时间" width="180" sortable />
        <el-table-column prop="endTime" label="失效时间" width="180" sortable />
        <el-table-column prop="approvalStatus" label="审核状态" width="100" sortable />
        <el-table-column prop="status" label="发布状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.status === '已发布'" type="success">已发布</el-tag>
            <el-tag v-else-if="scope.row.status === '草稿'" type="info">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === '已撤回'" type="warning">已撤回</el-tag>
            <el-tag v-else-if="scope.row.status === '已过期'" type="warning">已过期</el-tag>
            <el-tag v-else type="warning">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" sortable />
        <el-table-column label="公告图片" width="150">
          <template #default="scope">
            <ImageGallery :image-data="scope.row.noticeImages" size="tiny" />
          </template>
        </el-table-column>
      </pagination-table>
    </el-card>
    
    <!-- 新增/编辑对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="600px"
      @close="handleDialogClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="120px"
      >
        <el-form-item label="社区ID" prop="communityId">
          <el-input-number v-model="formData.communityId" :min="1" />
        </el-form-item>
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="formData.title" />
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input v-model="formData.content" type="textarea" />
        </el-form-item>
        <el-form-item label="公告类型" prop="noticeType">
          <el-input v-model="formData.noticeType" />
        </el-form-item>
        <el-form-item label="活动日期" prop="activityDate">
          <el-date-picker
            v-model="formData.activityDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择活动日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="活动时间" prop="activityTime">
          <el-time-picker
            v-model="formData.activityTime"
            value-format="HH:mm:ss"
            placeholder="请选择活动时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="活动地点" prop="activityLocation">
          <el-input v-model="formData.activityLocation" />
        </el-form-item>
        <el-form-item label="活动组织者" prop="activityOrganizer">
          <el-input v-model="formData.activityOrganizer" />
        </el-form-item>
        <el-form-item label="活动联系人" prop="activityContact">
          <el-input v-model="formData.activityContact" />
        </el-form-item>
        <el-form-item label="联系人电话" prop="activityContactPhone">
          <el-input v-model="formData.activityContactPhone" />
        </el-form-item>
        <el-form-item label="目标受众" prop="targetAudience">
          <el-input v-model="formData.targetAudience" />
        </el-form-item>
        <el-form-item label="目标楼栋" prop="targetBuildings">
          <el-input v-model="formData.targetBuildings" />
        </el-form-item>
        <el-form-item label="目标业主类型" prop="targetOwnerTypes">
          <el-input v-model="formData.targetOwnerTypes" />
        </el-form-item>
        <el-form-item label="发布时间" prop="publishTime">
          <el-date-picker
            v-model="formData.publishTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择发布时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="formData.startTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择开始时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="formData.endTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择结束时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="是否紧急" prop="isUrgent">
          <el-select v-model="formData.isUrgent" placeholder="请选择">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否置顶" prop="isTop">
          <el-select v-model="formData.isTop" placeholder="请选择">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="置顶结束时间" prop="topEndTime">
          <el-date-picker
            v-model="formData.topEndTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择置顶结束时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择状态">
            <el-option label="启用" value="启用" />
            <el-option label="停用" value="停用" />
          </el-select>
        </el-form-item>
        <el-form-item label="审批状态" prop="approvalStatus">
          <el-input v-model="formData.approvalStatus" />
        </el-form-item>
        <el-form-item label="公告图片">
          <ImageUpload v-model="formData.noticeImages" :max-count="0" />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, computed, provide } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import PaginationTable from '@/components/PaginationTable.vue'
import ImageGallery from '@/components/ImageGallery.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import { noticeApi } from '@/api/notice'
import { formatDateTimeForDisplay, formatDateTimeForSubmit } from '@/utils/fileUpload'

export default {
  name: 'NoticeList',
  components: {
    PaginationTable,
    ImageGallery,
    ImageUpload
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      title: '',
      createdBy: '',
      status: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      communityId: null,
      createdBy: '',
      title: '',
      content: '',
      noticeType: '',
      activityDate: '',
      activityTime: '',
      activityLocation: '',
      activityOrganizer: '',
      activityContact: '',
      activityContactPhone: '',
      targetAudience: '',
      targetBuildings: '',
      targetOwnerTypes: '',
      publishTime: '',
      startTime: '',
      endTime: '',
      isUrgent: 0,
      isTop: 0,
      topEndTime: '',
      readCount: 0,
      attachments: '',
      status: '启用',
      approvalStatus: '',
      approvedBy: '',
      approvedAt: '',
      remark: '',
      noticeImages: []
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增公告' : '编辑公告'
    })
    
    // 表单验证规则
    const formRules = {
      communityId: [
        { required: true, message: '请输入社区ID', trigger: 'blur' }
      ],
      title: [
        { required: true, message: '请输入公告标题', trigger: 'blur' }
      ],
      content: [
        { required: true, message: '请输入公告内容', trigger: 'blur' }
      ]
    }
    
    // 查看公告详情
    const viewNoticeDetail = (noticeId) => {
      router.push(`/notice-detail/${noticeId}`)
    }
    
    // 处理新增
    const handleCreate = () => {
      dialogType.value = 'create'
      dialogVisible.value = true
      // 重置表单数据
      Object.assign(formData, {
        id: undefined,
        communityId: null,
        createdBy: '',
        title: '',
        content: '',
        noticeType: '',
        activityDate: '',
        activityTime: '',
        activityLocation: '',
        activityOrganizer: '',
        activityContact: '',
        activityContactPhone: '',
        targetAudience: '',
        targetBuildings: '',
        targetOwnerTypes: '',
        publishTime: '',
        startTime: '',
        endTime: '',
        isUrgent: 0,
        isTop: 0,
        topEndTime: '',
        readCount: 0,
        attachments: '',
        status: '启用',
        approvalStatus: '',
        approvedBy: '',
        approvedAt: '',
        remark: '',
        noticeImages: []
      })
    }
    
    // 处理编辑
    const handleEdit = (row) => {
      dialogType.value = 'edit'
      dialogVisible.value = true
      // 填充表单数据
      Object.keys(formData).forEach(key => {
        if (key === 'noticeImages') {
          // 处理图片字段 - 多张模式
          let images = row[key];
          if (!images) {
            formData[key] = [];
          } else if (typeof images === 'string') {
            // 如果是JSON数组字符串，尝试解析
            try {
              const parsed = JSON.parse(images);
              formData[key] = Array.isArray(parsed) ? parsed : [];
            } catch (e) {
              // 否则作为单个URL处理
              formData[key] = [images];
            }
          } else if (Array.isArray(images)) {
            // 如果已经是数组，保留原值
            formData[key] = images;
          } else {
            formData[key] = [];
          }
        } else if (['publishTime', 'startTime', 'endTime', 'topEndTime', 'approvedAt'].includes(key)) {
          // 处理时间字段 - 转换格式（从带T转换为无T）
          const value = row[key];
          formData[key] = formatDateTimeForDisplay(value);
        } else {
          formData[key] = row[key] !== null && row[key] !== undefined ? row[key] : '';
        }
      })
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该公告吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await noticeApi.delete(row.id)
          ElMessage.success('删除成功')
          tableRef.value.fetchData()
        } catch (error) {
          console.error('删除失败:', error)
        }
      }).catch(() => {
        // 取消删除
      })
    }
    
    // 处理对话框关闭
    const handleDialogClose = () => {
      formRef.value.resetFields()
    }
    
    // 处理提交
    const handleSubmit = async () => {
      try {
        await formRef.value.validate()
        
        // 构建FormData来处理文件上传和表单数据
        const submitFormData = new FormData()
        
        // 添加所有文本字段（排除图片字段）
        Object.keys(formData).forEach(key => {
          if (key !== 'noticeImages' && formData[key] !== null && formData[key] !== undefined) {
            // 对时间字段进行格式转换（从无T转换为带T）
            if (['publishTime', 'startTime', 'endTime', 'topEndTime', 'approvedAt'].includes(key)) {
              const formattedValue = formatDateTimeForSubmit(formData[key])
              submitFormData.append(key, formattedValue)
            } else {
              submitFormData.append(key, formData[key])
            }
          }
        })
        
        // 处理公告图片 - 多张模式，需要保留已有的URL
        if (formData.noticeImages && Array.isArray(formData.noticeImages)) {
          const existingUrls = [];
          formData.noticeImages.forEach((photo) => {
            if (photo) {
              // 新上传的文件
              if (photo.raw && photo.raw instanceof File) {
                submitFormData.append('noticeImages', photo.raw)
              } else if (photo instanceof File) {
                submitFormData.append('noticeImages', photo)
              }
              // 已有的URL
              else if (typeof photo === 'string') {
                existingUrls.push(photo)
              } else if (photo.url && typeof photo.url === 'string') {
                existingUrls.push(photo.url)
              }
            }
          })
          // 如果有已存在的URL，作为JSON字符串提交
          if (existingUrls.length > 0) {
            submitFormData.append('noticeImages', JSON.stringify(existingUrls))
          }
        }
        
        if (dialogType.value === 'create') {
          // 新增
          await noticeApi.create(submitFormData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await noticeApi.update(submitFormData, formData.id)
          ElMessage.success('编辑成功')
        }
        
        dialogVisible.value = false
        // 重置分页到第一页并刷新表格数据
        tableRef.value.pagination.pageNum = 1
        tableRef.value.fetchData()
      } catch (error) {
        console.error('保存失败:', error)
      }
    }
    
    return {
      noticeApi,
      tableRef,
      formRef,
      searchForm,
      dialogVisible,
      dialogTitle,
      formData,
      formRules,
      handleCreate,
      handleEdit,
      handleDelete,
      handleDialogClose,
      handleSubmit,
      viewNoticeDetail
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
</style>