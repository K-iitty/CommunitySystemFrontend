<template>
  <div class="admin-log-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>管理员操作日志</span>
        </div>
      </template>
      
      <pagination-table
        :api-function="adminLogApi.getPage"
        :search-api-function="adminLogApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
        :show-actions="false"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="管理员ID">
              <el-input v-model="searchForm.adminId" placeholder="请输入管理员ID" />
            </el-form-item>
            <el-form-item label="操作类型">
              <el-input v-model="searchForm.operationType" placeholder="请输入操作类型" />
            </el-form-item>
            <el-form-item label="操作描述">
              <el-input v-model="searchForm.operationDescription" placeholder="请输入操作描述" />
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="ID" width="80" sortable />
        <el-table-column prop="adminId" label="管理员ID" width="100" sortable />
        <el-table-column prop="adminName" label="管理员姓名" width="120" sortable />
        <el-table-column prop="operationType" label="操作类型" width="120" sortable />
        <el-table-column prop="operationDesc" label="操作描述" width="200" sortable />
        <el-table-column prop="operationTime" label="操作时间" width="180" sortable />
        <el-table-column prop="ipAddress" label="IP地址" width="150" sortable />
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
        <el-form-item label="管理员ID" prop="adminId">
          <el-input v-model="formData.adminId" placeholder="请输入管理员ID" />
        </el-form-item>
        <el-form-item label="管理员姓名" prop="adminName">
          <el-input v-model="formData.adminName" placeholder="请输入管理员姓名" />
        </el-form-item>
        <el-form-item label="操作类型" prop="operationType">
          <el-input v-model="formData.operationType" placeholder="请输入操作类型" />
        </el-form-item>
        <el-form-item label="操作描述" prop="operationDesc">
          <el-input v-model="formData.operationDesc" placeholder="请输入操作描述" />
        </el-form-item>
        <el-form-item label="操作时间" prop="operationTime">
          <el-date-picker
            v-model="formData.operationTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择操作时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="IP地址" prop="ipAddress">
          <el-input v-model="formData.ipAddress" placeholder="请输入IP地址" />
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
import PaginationTable from '@/components/PaginationTable.vue'
import { adminLogApi } from '@/api/adminLog.js'

export default {
  name: 'AdminLogList',
  components: {
    PaginationTable
  },
  setup() {
    // 添加调试信息
    console.log('adminLogApi:', adminLogApi)
    
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      adminId: '',
      operationType: '',
      operationDescription: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      adminId: undefined,
      adminName: undefined,
      operationType: undefined,
      operationDesc: undefined,
      operationTime: undefined,
      ipAddress: undefined
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增管理员操作日志' : '编辑管理员操作日志'
    })
    
    // 表单验证规则
    const formRules = {
      adminId: [
        { required: true, message: '管理员ID不能为空', trigger: 'blur' }
      ],
      adminName: [
        { required: true, message: '管理员姓名不能为空', trigger: 'blur' }
      ],
      operationType: [
        { required: true, message: '操作类型不能为空', trigger: 'blur' }
      ],
      operationDesc: [
        { required: true, message: '操作描述不能为空', trigger: 'blur' }
      ],
      operationTime: [
        { required: true, message: '操作时间不能为空', trigger: 'blur' }
      ]
    }
    
    // 处理新增
    const handleCreate = () => {
      dialogType.value = 'create'
      dialogVisible.value = true
    }
    
    // 处理编辑
    const handleEdit = (row) => {
      dialogType.value = 'edit'
      // 深拷贝数据
      Object.assign(formData, row)
      dialogVisible.value = true
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm(
        `确定删除管理员操作日志【${row.id}】吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        try {
          await adminLogApi.delete(row.id)
          ElMessage.success('删除成功')
          tableRef.value.fetchData()
        } catch (error) {
          ElMessage.error('删除失败')
        }
      })
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
              await adminLogApi.create(formData)
              ElMessage.success('新增成功')
            } else {
              await adminLogApi.update(formData)
              ElMessage.success('修改成功')
            }
            dialogVisible.value = false
            tableRef.value.fetchData()
          } catch (error) {
            ElMessage.error('操作失败')
          }
        }
      })
    }
    
    // 组件挂载时的调试信息
    onMounted(() => {
      console.log('AdminLogList component mounted')
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
      adminLogApi
    }
  }
}
</script>