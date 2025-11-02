
<template>
  <div class="department-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>部门信息管理</span>
          <el-button type="primary" @click="handleCreate" style="float: right;">新增部门</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="departmentApi.getPage"
        :search-api-function="departmentApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="部门名称">
              <el-input v-model="searchForm.departmentName" placeholder="请输入部门名称" />
            </el-form-item>
            <el-form-item label="部门编码">
              <el-input v-model="searchForm.departmentCode" placeholder="请输入部门编码" />
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
        
        <el-table-column prop="departmentName" label="部门名称" width="150" sortable />
        <el-table-column prop="departmentCode" label="部门编码" width="120" sortable />
        <el-table-column prop="parentId" label="父部门ID" width="100" sortable />
        <el-table-column prop="departmentLevel" label="部门层级" width="100" sortable />
        <el-table-column prop="sortOrder" label="排序" width="80" sortable />
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
        <el-form-item label="部门名称" prop="departmentName">
          <el-input v-model="formData.departmentName" />
        </el-form-item>
        <el-form-item label="部门编码" prop="departmentCode">
          <el-input v-model="formData.departmentCode" />
        </el-form-item>
        <el-form-item label="父部门ID" prop="parentId">
          <el-input-number v-model="formData.parentId" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="部门层级" prop="departmentLevel">
          <el-input-number v-model="formData.departmentLevel" :min="1" style="width: 100%" />
        </el-form-item>
        <el-form-item label="排序" prop="sortOrder">
          <el-input-number v-model="formData.sortOrder" :min="0" style="width: 100%" />
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
import { departmentApi } from '@/api/person'

export default {
  name: 'DepartmentList',
  components: {
    PaginationTable
  },
  setup() {
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      departmentName: '',
      departmentCode: '',
      status: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      departmentName: '',
      parentId: 0,
      departmentCode: '',
      departmentLevel: 1,
      sortOrder: 0,
      status: '启用',
      description: ''
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增部门' : '编辑部门'
    })
    
    // 表单验证规则
    const formRules = {
      departmentName: [
        { required: true, message: '请输入部门名称', trigger: 'blur' }
      ],
      departmentCode: [
        { required: true, message: '请输入部门编码', trigger: 'blur' }
      ]
    }
    
    // 处理新增
    const handleCreate = () => {
      dialogType.value = 'create'
      dialogVisible.value = true
      // 重置表单数据
      Object.keys(formData).forEach(key => {
        if (key === 'parentId') {
          formData[key] = 0;
        } else if (key === 'departmentLevel') {
          formData[key] = 1;
        } else if (key === 'sortOrder') {
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
      ElMessageBox.confirm('确认删除该部门信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await departmentApi.delete(row.id)
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
          await departmentApi.create(formData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await departmentApi.update(formData)
          ElMessage.success('编辑成功')
        }
        
        dialogVisible.value = false
        tableRef.value.fetchData()
      } catch (error) {
        console.error('保存失败:', error)
      }
    }
    
    return {
      departmentApi,
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