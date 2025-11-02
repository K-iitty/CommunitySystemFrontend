<template>
  <div class="issue-follow-up-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>问题跟进管理</span>
          <el-button type="primary" @click="handleCreate" style="float: right;">新增跟进</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="issueFollowUpApi.getPage"
        :search-api-function="issueFollowUpApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="问题ID">
              <el-input v-model="searchForm.issueId" placeholder="请输入问题ID" />
            </el-form-item>
            <el-form-item label="跟进人">
              <el-input v-model="searchForm.operatorName" placeholder="请输入跟进人" />
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="跟进ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewFollowUpDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="issueId" label="问题ID" width="100" sortable />
        <el-table-column prop="followUpType" label="跟进类型" width="140" sortable />
        <el-table-column prop="operatorType" label="操作人类型" width="120" sortable />
        <el-table-column prop="operatorId" label="操作人ID" width="100" sortable />
        <el-table-column prop="operatorName" label="操作人姓名" width="120" sortable />
        <el-table-column prop="followUpContent" label="跟进内容" width="250" sortable />
        <el-table-column label="附件信息" width="150">
          <template #default="scope">
            <ImageGallery :image-data="scope.row.attachmentImages" size="tiny" />
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" sortable />
      </pagination-table>
    </el-card>
    
    <!-- 新增/编辑对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="问题ID" prop="issueId">
          <el-input v-model="formData.issueId" placeholder="请输入问题ID" />
        </el-form-item>
        <el-form-item label="跟进类型" prop="followUpType">
          <el-input v-model="formData.followUpType" placeholder="请输入跟进类型" />
        </el-form-item>
        <el-form-item label="跟进内容" prop="followUpContent">
          <el-input v-model="formData.followUpContent" type="textarea" placeholder="请输入跟进内容" />
        </el-form-item>
        <el-form-item label="操作人类型" prop="operatorType">
          <el-select v-model="formData.operatorType" placeholder="请选择操作人类型" style="width: 100%">
            <el-option label="物业人员" value="物业人员" />
            <el-option label="管理员" value="管理员" />
            <el-option label="业主" value="业主" />
          </el-select>
        </el-form-item>
        <el-form-item label="操作人ID" prop="operatorId">
          <el-input-number v-model="formData.operatorId" :min="1" style="width: 100%" />
        </el-form-item>
        <el-form-item label="附件信息" prop="attachments">
          <el-input v-model="formData.attachments" type="textarea" placeholder="请输入附件信息（JSON格式）" />
        </el-form-item>
        <el-form-item label="跟进人" prop="operatorName">
          <el-input v-model="formData.operatorName" placeholder="请输入跟进人" />
        </el-form-item>
        <el-form-item label="内部备注" prop="internalNote">
          <el-input v-model="formData.internalNote" type="textarea" placeholder="请输入内部备注" />
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
import { ref, reactive, computed, provide, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import PaginationTable from '@/components/PaginationTable.vue'
import { issueFollowUpApi } from '@/api/issueFollowUp.js'

export default {
  name: 'IssueFollowUpList',
  components: {
    PaginationTable
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      issueId: '',
      operatorName: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      issueId: undefined,
      followUpType: undefined,
      followUpContent: undefined,
      operatorType: undefined,
      operatorId: undefined,
      operatorName: undefined,
      attachments: undefined,
      internalNote: undefined
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增问题跟进' : '编辑问题跟进'
    })
    
    // 表单验证规则
    const formRules = {
      issueId: [
        { required: true, message: '问题ID不能为空', trigger: 'blur' }
      ],
      followUpType: [
        { required: true, message: '跟进类型不能为空', trigger: 'blur' }
      ],
      followUpContent: [
        { required: true, message: '跟进内容不能为空', trigger: 'blur' }
      ],
      operatorType: [
        { required: true, message: '操作人类型不能为空', trigger: 'change' }
      ],
      operatorName: [
        { required: true, message: '跟进人不能为空', trigger: 'blur' }
      ]
    }
    
    // 处理新增
    const handleCreate = () => {
      dialogType.value = 'create'
      dialogVisible.value = true
      // 重置表单数据
      Object.assign(formData, {
        id: undefined,
        issueId: undefined,
        followUpType: undefined,
        followUpContent: undefined,
        operatorType: undefined,
        operatorId: undefined,
        operatorName: undefined,
        attachments: undefined,
        internalNote: undefined
      })
    }
    
    // 处理编辑
    const handleEdit = (row) => {
      dialogType.value = 'edit'
      // 填充表单数据
      Object.keys(formData).forEach(key => {
        formData[key] = row[key] !== null && row[key] !== undefined ? row[key] : '';
      })
      dialogVisible.value = true
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm(
        `确定删除问题跟进【${row.id}】吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        try {
          await issueFollowUpApi.delete(row.id)
          ElMessage.success('删除成功')
          tableRef.value.fetchData()
        } catch (error) {
          ElMessage.error('删除失败')
        }
      })
    }
    
    // 查看跟进详情
    const viewFollowUpDetail = (followUpId) => {
      router.push(`/issue-follow-up-detail/${followUpId}`)
    }
    
    // 处理对话框关闭
    const handleDialogClose = () => {
      formRef.value.resetFields()
      // 重置表单数据
      Object.keys(formData).forEach(key => {
        formData[key] = undefined
      })
    }
    
    // 处理提交
    const handleSubmit = () => {
      formRef.value.validate(async (valid) => {
        if (valid) {
          try {
            if (dialogType.value === 'create') {
              await issueFollowUpApi.create(formData)
              ElMessage.success('新增成功')
            } else {
              await issueFollowUpApi.update(formData)
              ElMessage.success('修改成功')
            }
            dialogVisible.value = false
            // 重置分页到第一页并刷新表格数据
            tableRef.value.pagination.pageNum = 1
            tableRef.value.fetchData()
          } catch (error) {
            ElMessage.error('操作失败')
          }
        }
      })
    }
    
    // 组件挂载时的调试信息
    onMounted(() => {
      console.log('IssueFollowUpList component mounted')
    })
    
    return {
      tableRef,
      formRef,
      searchForm,
      dialogVisible,
      dialogType,
      formData,
      dialogTitle,
      formRules,
      handleCreate,
      handleEdit,
      handleDelete,
      handleDialogClose,
      handleSubmit,
      issueFollowUpApi,
      viewFollowUpDetail
    }
  }
}
</script>