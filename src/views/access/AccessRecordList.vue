<template>
  <div class="access-record-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>门禁记录管理</span>
        </div>
      </template>
      
      <pagination-table
        :api-function="accessRecordApi.getPage"
        :search-api-function="accessRecordApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
        :show-actions="false"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="设备ID">
              <el-input v-model="searchForm.deviceId" placeholder="请输入设备ID" />
            </el-form-item>
            <el-form-item label="人员姓名">
              <el-input v-model="searchForm.personName" placeholder="请输入人员姓名" />
            </el-form-item>
            <el-form-item label="通行方向">
              <el-select v-model="searchForm.direction" placeholder="请选择通行方向" clearable>
                <el-option label="进" value="进" />
                <el-option label="出" value="出" />
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="记录ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewAccessRecordDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="communityId" label="社区ID" width="80" sortable />
        <el-table-column prop="deviceId" label="设备ID" width="80" sortable />
        <el-table-column prop="personId" label="人员ID" width="80" sortable />
        <el-table-column prop="personType" label="人员类型" width="100" sortable />
        <el-table-column prop="personName" label="人员姓名" width="120" sortable />
        <el-table-column prop="personPhone" label="手机号" width="120" sortable />
        <el-table-column prop="idCard" label="身份证号" width="150" sortable />
        <el-table-column prop="accessType" label="通行类型" width="100" sortable />
        <el-table-column prop="accessMethod" label="通行方式" width="120" sortable />
        <el-table-column prop="permissionType" label="权限类型" width="120" sortable />
        <el-table-column prop="validStartTime" label="权限开始" width="180" sortable />
        <el-table-column prop="accessTime" label="通行时间" width="180" sortable />
        <el-table-column prop="gateName" label="闸机名称" width="120" sortable />
        <el-table-column prop="locationInfo" label="位置信息" width="150" sortable />
        <el-table-column prop="verifyResult" label="验证结果" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.verifyResult === '成功'" type="success">成功</el-tag>
            <el-tag v-else-if="scope.row.verifyResult === '失败'" type="danger">失败</el-tag>
            <el-tag v-else type="warning">{{ scope.row.verifyResult }}</el-tag>
          </template>
        </el-table-column>
      </pagination-table>
    </el-card>
    
    <!-- 新增/编辑对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="设备ID">
          <el-input v-model="form.deviceId" placeholder="请输入设备ID" />
        </el-form-item>
        <el-form-item label="人员ID">
          <el-input v-model="form.personId" placeholder="请输入人员ID" />
        </el-form-item>
        <el-form-item label="人员姓名">
          <el-input v-model="form.personName" placeholder="请输入人员姓名" />
        </el-form-item>
        <el-form-item label="通行方向">
          <el-select v-model="form.direction" placeholder="请选择通行方向" clearable>
            <el-option label="进" value="进" />
            <el-option label="出" value="出" />
          </el-select>
        </el-form-item>
        <el-form-item label="通行时间">
          <el-date-picker
            v-model="form.accessTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="认证状态">
          <el-select v-model="form.authStatus" placeholder="请选择认证状态" clearable>
            <el-option label="已认证" value="已认证" />
            <el-option label="未认证" value="未认证" />
          </el-select>
        </el-form-item>
        <el-form-item label="通行结果">
          <el-select v-model="form.accessResult" placeholder="请选择通行结果" clearable>
            <el-option label="成功" value="成功" />
            <el-option label="失败" value="失败" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, provide } from 'vue'
import { useRouter } from 'vue-router'
import PaginationTable from '@/components/PaginationTable.vue'
import { accessRecordApi } from '@/api/access'

export default {
  name: 'AccessRecordList',
  components: {
    PaginationTable
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      deviceId: '',
      personName: '',
      direction: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 新增/编辑表单
    const form = reactive({
      id: '',
      deviceId: '',
      personId: '',
      personName: '',
      direction: '',
      accessTime: '',
      authStatus: '',
      accessResult: ''
    })
    
    // 对话框标题
    const dialogTitle = ref('')
    // 对话框显示状态
    const dialogVisible = ref(false)
    
    // 查看门禁记录详情
    const viewAccessRecordDetail = (recordId) => {
      router.push(`/access-record-detail/${recordId}`)
    }
    
    // 处理新增/编辑
    const handleEdit = (row) => {
      Object.assign(form, row)
      dialogTitle.value = '编辑门禁记录'
      dialogVisible.value = true
    }
    
    // 处理删除
    const handleDelete = (row) => {
      accessRecordApi.delete(row.id).then(() => {
        tableRef.value.fetchData()
      })
    }
    
    // 处理对话框关闭
    const handleDialogClose = () => {
      Object.assign(form, {
        id: '',
        deviceId: '',
        personId: '',
        personName: '',
        direction: '',
        accessTime: '',
        authStatus: '',
        accessResult: ''
      })
    }
    
    // 处理提交
    const handleSubmit = () => {
      if (form.id) {
        accessRecordApi.update(form).then(() => {
          tableRef.value.fetchData()
          dialogVisible.value = false
        })
      } else {
        accessRecordApi.create(form).then(() => {
          tableRef.value.fetchData()
          dialogVisible.value = false
        })
      }
    }
    
    return {
      accessRecordApi,
      tableRef,
      searchForm,
      form,
      dialogTitle,
      dialogVisible,
      handleEdit,
      handleDelete,
      handleDialogClose,
      handleSubmit,
      viewAccessRecordDetail
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