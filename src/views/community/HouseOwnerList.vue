<template>
  <div class="house-owner-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>房屋业主关联信息</span>
          <el-button type="primary" @click="handleCreate">新增关联</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="houseOwnerApi.getPageDetail"
        :search-api-function="houseOwnerApi.searchDetail"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="房屋ID">
              <el-input v-model="searchForm.houseId" placeholder="请输入房屋ID" />
            </el-form-item>
            <el-form-item label="业主ID">
              <el-input v-model="searchForm.ownerId" placeholder="请输入业主ID" />
            </el-form-item>
            <el-form-item label="关系">
              <el-input v-model="searchForm.relationship" placeholder="请输入关系" />
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="houseOwner.id" label="关联ID" width="80" sortable />
        <el-table-column prop="houseOwner.houseId" label="房屋ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewHouseDetail(scope.row.houseOwner.houseId)">{{ scope.row.houseOwner.houseId }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="house.houseCode" label="房屋编码" width="120" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewHouseDetail(scope.row.houseOwner.houseId)">{{ scope.row.house.houseCode }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="houseOwner.ownerId" label="业主ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewOwnerDetail(scope.row.houseOwner.ownerId)">{{ scope.row.houseOwner.ownerId }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="owner.name" label="业主姓名" width="100" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewOwnerDetail(scope.row.houseOwner.ownerId)">{{ scope.row.owner.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="houseOwner.relationship" label="关系" width="100" sortable />
        <el-table-column prop="houseOwner.isPrimary" label="是否主要" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.houseOwner.isPrimary === 1" type="success">是</el-tag>
            <el-tag v-else type="info">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="houseOwner.status" label="状态" width="80" sortable />
        <el-table-column prop="houseOwner.startDate" label="开始日期" width="120" sortable />
        <el-table-column prop="houseOwner.endDate" label="结束日期" width="120" sortable />
        <el-table-column prop="houseOwner.createdAt" label="创建时间" width="180" sortable />
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
        label-width="120px"
      >
        <el-form-item label="房屋ID" prop="houseId">
          <el-input v-model.number="formData.houseId" disabled />
        </el-form-item>
        <el-form-item label="业主ID" prop="ownerId">
          <el-input v-model.number="formData.ownerId" disabled />
        </el-form-item>
        <el-form-item label="关系类型" prop="relationship">
          <el-input v-model="formData.relationship" />
        </el-form-item>
        <el-form-item label="是否主要" prop="isPrimary">
          <el-select v-model="formData.isPrimary" placeholder="请选择">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否认证" prop="isVerified">
          <el-select v-model="formData.isVerified" placeholder="请选择">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" prop="startDate">
          <el-date-picker
            v-model="formData.startDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择开始日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="结束日期" prop="endDate">
          <el-date-picker
            v-model="formData.endDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择结束日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="租金" prop="rentAmount">
          <el-input-number v-model="formData.rentAmount" :min="0" controls-position="right" style="width: 100%" />
        </el-form-item>
        <el-form-item label="租金支付周期" prop="rentPayCycle">
          <el-input v-model="formData.rentPayCycle" />
        </el-form-item>
        <el-form-item label="押金" prop="depositAmount">
          <el-input-number v-model="formData.depositAmount" :min="0" controls-position="right" style="width: 100%" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择状态">
            <el-option label="正常" value="正常" />
            <el-option label="注销" value="注销" />
          </el-select>
        </el-form-item>
        <el-form-item label="认证人" prop="verifiedBy">
          <el-input v-model="formData.verifiedBy" />
        </el-form-item>
        <el-form-item label="认证时间" prop="verifiedAt">
          <el-date-picker
            v-model="formData.verifiedAt"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择认证时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="认证备注" prop="verifyRemark">
          <el-input v-model="formData.verifyRemark" type="textarea" />
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
import { houseOwnerApi } from '@/api/community'

export default {
  name: 'HouseOwnerList',
  components: {
    PaginationTable
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      houseId: '',
      ownerId: '',
      relationship: '',
      status: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('edit') // 只支持编辑
    const formData = reactive({
      id: undefined,
      houseId: undefined,
      ownerId: undefined,
      relationship: '',
      isPrimary: 0,
      isVerified: 0,
      startDate: '',
      endDate: '',
      rentAmount: 0,
      rentPayCycle: '',
      depositAmount: 0,
      status: '正常',
      verifiedBy: '',
      verifiedAt: '',
      verifyRemark: ''
    })
    
    const dialogTitle = computed(() => {
      return '编辑房屋业主关联信息'
    })
    
    // 表单验证规则
    const formRules = {
      relationship: [
        { required: true, message: '请输入关系类型', trigger: 'blur' }
      ],
      isPrimary: [
        { required: true, message: '请选择是否主要', trigger: 'change' }
      ],
      status: [
        { required: true, message: '请选择状态', trigger: 'change' }
      ]
    }
    
    // 多选操作
    const multipleSelection = ref([])
    
    // 处理编辑
    const handleEdit = (row) => {
      dialogType.value = 'edit'
      dialogVisible.value = true
      // 填充表单数据
      const data = row.houseOwner
      Object.keys(formData).forEach(key => {
        if (key === 'houseId') {
          formData[key] = row.house.id
        } else if (key === 'ownerId') {
          formData[key] = row.owner.id
        } else {
          formData[key] = data[key] !== null ? data[key] : (typeof formData[key] === 'number' ? 0 : '')
        }
      })
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm(`确认删除关联信息【${row.house.houseCode} - ${row.owner.name}】吗？`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await houseOwnerApi.delete(row.houseOwner.id)
          ElMessage.success('删除成功')
          tableRef.value.fetchData()
        } catch (error) {
          console.error('删除失败:', error)
          ElMessage.error('删除失败')
        }
      }).catch(() => {
        // 取消删除
      })
    }
    
    // 批量删除
    const handleBatchDelete = () => {
      if (multipleSelection.value.length === 0) {
        ElMessage.warning('请先选择要删除的数据')
        return
      }
      
      ElMessageBox.confirm(`确认删除选中的 ${multipleSelection.value.length} 条关联信息吗？`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const ids = multipleSelection.value.map(item => item.houseOwner.id)
          await houseOwnerApi.batchDelete(ids)
          ElMessage.success('批量删除成功')
          tableRef.value.fetchData()
        } catch (error) {
          console.error('批量删除失败:', error)
          ElMessage.error('批量删除失败')
        }
      }).catch(() => {
        // 取消删除
      })
    }
    
    // 查看房屋详情
    const viewHouseDetail = (houseId) => {
      router.push(`/house-detail/${houseId}`)
    }
    
    // 查看业主详情
    const viewOwnerDetail = (ownerId) => {
      router.push(`/owner-detail/${ownerId}`)
    }
    
    // 处理对话框关闭
    const handleDialogClose = () => {
      formRef.value.resetFields()
    }
    
    // 处理提交
    const handleSubmit = async () => {
      try {
        await formRef.value.validate()
        
        // 编辑
        const submitData = { ...formData }
        // 删除只读字段
        delete submitData.houseId
        delete submitData.ownerId
        
        await houseOwnerApi.update(submitData)
        ElMessage.success('编辑成功')
        
        dialogVisible.value = false
        tableRef.value.fetchData()
      } catch (error) {
        console.error('保存失败:', error)
        ElMessage.error('保存失败')
      }
    }
    
    return {
      houseOwnerApi,
      tableRef,
      formRef,
      searchForm,
      dialogVisible,
      dialogTitle,
      formData,
      formRules,
      multipleSelection,
      handleEdit,
      handleDelete,
      handleBatchDelete,
      viewHouseDetail,
      viewOwnerDetail,
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