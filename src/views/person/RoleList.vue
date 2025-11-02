<template>
  <div class="role-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>角色信息管理</span>
          <el-button type="primary" @click="handleCreate">新增角色</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="roleApi.getPage"
        :search-api-function="roleApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="角色名称">
              <el-input v-model="searchForm.roleName" placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item label="角色编码">
              <el-input v-model="searchForm.roleCode" placeholder="请输入角色编码" />
            </el-form-item>
            <el-form-item label="角色类型">
              <el-input v-model="searchForm.roleType" placeholder="请输入角色类型" />
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
        
        <el-table-column prop="roleName" label="角色名称" width="150" sortable />
        <el-table-column prop="roleCode" label="角色编码" width="120" sortable />
        <el-table-column prop="roleType" label="角色类型" width="120" sortable />
        <el-table-column prop="memberCount" label="成员数" width="100" sortable />
        <el-table-column prop="status" label="状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.status === '启用'" type="success">启用</el-tag>
            <el-tag v-else type="info">停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" width="200" sortable />
        <el-table-column prop="createdAt" label="创建时间" width="180" sortable />
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
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="formData.roleName" />
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input v-model="formData.roleCode" />
        </el-form-item>
        <el-form-item label="角色类型" prop="roleType">
          <el-input v-model="formData.roleType" />
        </el-form-item>
        <el-form-item label="成员数" prop="memberCount">
          <el-input-number v-model="formData.memberCount" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择状态" style="width: 100%">
            <el-option label="启用" value="启用" />
            <el-option label="停用" value="停用" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formData.description" type="textarea" />
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
          <el-input v-model="formData.permissions" type="textarea" :rows="4" />
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
import PaginationTable from '@/components/PaginationTable.vue'
import { roleApi } from '@/api/person'

export default {
  name: 'RoleList',
  components: {
    PaginationTable
  },
  setup() {
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      roleName: '',
      roleCode: '',
      roleType: '',
      status: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      roleName: '',
      roleCode: '',
      roleType: '',
      description: '',
      memberCount: 0,
      status: '启用',
      permissions: ''
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增角色' : '编辑角色'
    })
    
    // 表单验证规则
    const formRules = {
      roleName: [
        { required: true, message: '请输入角色名称', trigger: 'blur' }
      ],
      roleCode: [
        { required: true, message: '请输入角色编码', trigger: 'blur' }
      ],
      roleType: [
        { required: true, message: '请输入角色类型', trigger: 'blur' }
      ]
    }
    
    // 处理新增
    const handleCreate = () => {
      dialogType.value = 'create'
      dialogVisible.value = true
      // 重置表单数据
      Object.keys(formData).forEach(key => {
        if (key === 'memberCount') {
          formData[key] = 0;
        } else if (key === 'status') {
          formData[key] = '启用';
        } else {
          formData[key] = '';
        }
      })
    }
    
    // 处理编辑
    const handleEdit = (row) => {
      dialogType.value = 'edit'
      dialogVisible.value = true
      // 填充表单数据
      Object.keys(formData).forEach(key => {
        formData[key] = row[key] !== null ? row[key] : (typeof formData[key] === 'number' ? 0 : '');
      })
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该角色信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await roleApi.delete(row.id)
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
        
        if (dialogType.value === 'create') {
          // 新增
          await roleApi.create(formData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await roleApi.update(formData)
          ElMessage.success('编辑成功')
        }
        
        dialogVisible.value = false
        tableRef.value.fetchData()
      } catch (error) {
        console.error('保存失败:', error)
      }
    }
    
    return {
      roleApi,
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
      handleSubmit
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