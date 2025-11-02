<template>
  <div class="knowledge-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>知识库管理</span>
          <el-button type="primary" @click="handleUpload">上传文档</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="knowledgeApi.getPage"
        :search-api-function="knowledgeApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="标题">
              <el-input v-model="searchForm.title" placeholder="请输入标题" />
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="知识库ID" width="80" />
        <el-table-column prop="title" label="标题" width="150" />
        <el-table-column prop="category" label="分类" width="120" />
        <el-table-column prop="description" label="描述" width="150" />
        <el-table-column prop="fileName" label="文件名" width="150" />
        <el-table-column prop="fileType" label="文件类型" width="100" />
        <el-table-column prop="fileSize" label="文件大小(B)" width="120">
          <template #default="scope">
            <span v-if="scope.row.fileSize">{{ (scope.row.fileSize / 1024).toFixed(2) }} KB</span>
            <span v-else>N/A</span>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="120">
          <template #default="scope">
            <span v-if="scope.row.tags">{{ scope.row.tags }}</span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="scope">
            <el-tag v-if="scope.row.status === '启用'" type="success">启用</el-tag>
            <el-tag v-else type="info">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="viewCount" label="查看次数" width="100">
          <template #default="scope">
            <span>{{ scope.row.viewCount || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="downloadCount" label="下载次数" width="100">
          <template #default="scope">
            <span>{{ scope.row.downloadCount || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" />
      </pagination-table>
    </el-card>
    
    <!-- 上传/编辑文档对话框 -->
    <el-dialog
      :title="dialogType === 'upload' ? '上传文档' : '编辑文档'"
      v-model="uploadDialogVisible"
      width="600px"
      @close="handleUploadDialogClose"
    >
      <el-form
        ref="uploadFormRef"
        :model="uploadFormData"
        :rules="uploadFormRules"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="uploadFormData.title" placeholder="请输入文档标题" />
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="uploadFormData.category" placeholder="请选择分类" style="width: 100%">
            <el-option label="常见问题" value="常见问题" />
            <el-option label="操作指南" value="操作指南" />
            <el-option label="政策法规" value="政策法规" />
            <el-option label="物业服务" value="物业服务" />
            <el-option label="安全管理" value="安全管理" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="uploadFormData.description" type="textarea" placeholder="请输入文档描述" />
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-input v-model="uploadFormData.tags" placeholder="请输入标签（以逗号分隔）" />
        </el-form-item>
        <el-form-item label="排序" prop="sortOrder">
          <el-input-number v-model="uploadFormData.sortOrder" :min="0" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="uploadFormData.status" placeholder="请选择状态" style="width: 100%">
            <el-option label="启用" value="启用" />
            <el-option label="禁用" value="禁用" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogType === 'upload'" label="文档">
          <el-upload
            :before-upload="beforeUpload"
            :on-change="handleFileChange"
            :file-list="fileList"
            :limit="1"
            :auto-upload="false"
            ref="uploadRef"
            action="/api/smartQaKnowledge/upload"
            :headers="uploadHeaders"
            :data="uploadFormData"
            @success="handleUploadSuccess"
            @error="handleUploadError"
          >
            <template #trigger>
              <el-button size="small" type="primary">选取文件</el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip">只能上传doc/docx/pdf文件，且不超过10MB</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <el-button @click="uploadDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitUpload">{{ dialogType === 'upload' ? '上传' : '保存' }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, onMounted, provide, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import PaginationTable from '@/components/PaginationTable.vue'
import { knowledgeApi } from '@/api/knowledge'

export default {
  name: 'KnowledgeList',
  components: {
    PaginationTable
  },
  setup() {
    const tableRef = ref()
    const uploadDialogVisible = ref(false)
    const uploadFormRef = ref()
    const uploadRef = ref()
    const dialogType = ref('upload') // upload 或 edit
    
    // 搜索表单
    const searchForm = reactive({
      title: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    const uploadFormData = reactive({
      id: undefined,
      title: '',
      category: '',
      description: '',
      tags: '',
      sortOrder: 0,
      status: '启用',
      file: null
    })
    
    const fileList = ref([])
    
    const uploadFormRules = {
      title: [
        { required: true, message: '请输入标题', trigger: 'blur' }
      ],
      category: [
        { required: true, message: '请选择分类', trigger: 'change' }
      ]
    }
    
    // 处理打开上传对话框
    const handleUpload = () => {
      dialogType.value = 'upload'
      uploadDialogVisible.value = true
    }
    
    // 处理编辑
    const handleEdit = (row) => {
      dialogType.value = 'edit'
      // 填充表单数据
      Object.assign(uploadFormData, {
        id: row.id,
        title: row.title || '',
        category: row.category || '',
        description: row.description || '',
        tags: row.tags || '',
        sortOrder: row.sortOrder || 0,
        status: row.status || '启用',
        file: null
      })
      fileList.value = []
      uploadDialogVisible.value = true
    }
    
    // 上传前检查
    const beforeUpload = (file) => {
      const isDoc = file.type === 'application/msword' || 
                   file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                   file.type === 'application/pdf'
      const isLt10M = file.size / 1024 / 1024 < 10
      
      if (!isDoc) {
        ElMessage.error('上传文档只能是 DOC/DOCX/PDF 格式!')
      }
      if (!isLt10M) {
        ElMessage.error('上传文档大小不能超过 10MB!')
      }
      return isDoc && isLt10M
    }
    
    // 处理文件变化
    const handleFileChange = (file, fileListParam) => {
      if (fileListParam && fileListParam.length > 0) {
        uploadFormData.file = fileListParam[0].raw || fileListParam[0]
      } else {
        uploadFormData.file = null
      }
    }

    // 处理上传成功
    const handleUploadSuccess = (response, file, fileList) => {
      if (response.code === 200) {
        ElMessage.success('文档上传成功')
        uploadDialogVisible.value = false
        fileList.value = []
        tableRef.value.pagination.pageNum = 1
        tableRef.value.fetchData()
      } else {
        ElMessage.error('文档上传失败: ' + response.message)
      }
    }

    // 处理上传失败
    const handleUploadError = (err, file, fileList) => {
      ElMessage.error('文档上传失败: ' + err)
    }
    
    // 提交上传或编辑
    const submitUpload = async () => {
      try {
        if (dialogType.value === 'upload') {
          // 直接调用 el-upload 的 submit 方法
          uploadRef.value.submit()
        } else {
          // 编辑模式
          const submitData = {
            id: uploadFormData.id,
            title: uploadFormData.title,
            category: uploadFormData.category,
            description: uploadFormData.description,
            tags: uploadFormData.tags,
            sortOrder: uploadFormData.sortOrder,
            status: uploadFormData.status
          }
          await knowledgeApi.update(submitData)
          ElMessage.success('编辑成功')
          uploadDialogVisible.value = false
          tableRef.value.pagination.pageNum = 1
          tableRef.value.fetchData()
        }
      } catch (error) {
        console.error('操作失败:', error)
      }
    }
    
    // 处理上传对话框关闭
    const handleUploadDialogClose = () => {
      uploadFormRef.value.resetFields()
      fileList.value = []
      // 重置表单数据
      Object.assign(uploadFormData, {
        id: undefined,
        title: '',
        category: '',
        description: '',
        tags: '',
        sortOrder: 0,
        status: '启用',
        file: null
      })
      dialogType.value = 'upload'
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该文档吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await knowledgeApi.delete(row.id)
          ElMessage.success('删除成功')
          tableRef.value.pagination.pageNum = 1
          tableRef.value.fetchData()
        } catch (error) {
          ElMessage.error('删除失败')
          console.error(error)
        }
      }).catch(() => {
        // 取消删除
      })
    }

    // 计算属性：上传表单的 headers
    const uploadHeaders = computed(() => {
      return {
        'Authorization': 'Bearer ' + (localStorage.getItem('adminToken') || '')
      }
    })
    
    return {
      knowledgeApi,
      tableRef,
      dialogType,
      uploadDialogVisible,
      uploadFormRef,
      uploadRef,
      searchForm,
      uploadFormData,
      fileList,
      uploadFormRules,
      handleUpload,
      handleEdit,
      beforeUpload,
      handleFileChange,
      handleUploadSuccess,
      handleUploadError,
      submitUpload,
      handleUploadDialogClose,
      handleDelete,
      uploadHeaders
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

.knowledge-list {
  padding: 20px;
}
</style>