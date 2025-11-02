<template>
  <div class="system-admin-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>系统管理员管理</span>
          <el-button type="primary" @click="handleCreate" style="float: right;">新增管理员</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="systemAdminApi.getPage"
        :search-api-function="systemAdminApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="用户名">
              <el-input v-model="searchForm.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input v-model="searchForm.realName" placeholder="请输入真实姓名" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
                <el-option label="正常" value="正常" />
                <el-option label="停用" value="停用" />
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="realName" label="真实姓名" width="120" />
        <el-table-column prop="email" label="邮箱" width="150" />
        <el-table-column prop="roleType" label="角色类型" width="120" />
        <el-table-column prop="status" label="状态" width="100" />
        <el-table-column prop="createdAt" label="创建时间" width="180" />
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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item v-if="!formData.id" label="密码" prop="password">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="formData.realName" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="角色类型" prop="roleType">
          <el-input v-model="formData.roleType" placeholder="请输入角色类型" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择状态">
            <el-option label="正常" value="正常" />
            <el-option label="停用" value="停用" />
          </el-select>
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
import { systemAdminApi } from '@/api/systemAdmin.js'

export default {
  name: 'SystemAdminList',
  components: {
    PaginationTable
  },
  setup() {
    // 添加调试信息
    console.log('systemAdminApi:', systemAdminApi)
    
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      username: '',
      realName: '',
      status: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      username: undefined,
      password: undefined,
      email: undefined,
      realName: undefined,
      roleType: undefined,
      status: undefined
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增系统管理员' : '编辑系统管理员'
    })
    
    // 表单验证规则
    const formRules = {
      username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '密码不能为空', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '邮箱不能为空', trigger: 'blur' }
      ],
      realName: [
        { required: true, message: '真实姓名不能为空', trigger: 'blur' }
      ],
      roleType: [
        { required: true, message: '角色类型不能为空', trigger: 'blur' }
      ],
      status: [
        { required: true, message: '状态不能为空', trigger: 'blur' }
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
        `确定删除系统管理员【${row.id}】吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        try {
          await systemAdminApi.delete(row.id)
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
              await systemAdminApi.create(formData)
              ElMessage.success('新增成功')
            } else {
              await systemAdminApi.update(formData)
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
      console.log('SystemAdminList component mounted')
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
      systemAdminApi
    }
  }
}
</script>