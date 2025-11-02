<template>
  <div class="parking-space-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>车位信息管理</span>
          <el-button type="primary" @click="handleCreate" style="float: right;">新增车位</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="parkingSpaceApi.getPage"
        :search-api-function="parkingSpaceApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="车位编号">
              <el-input v-model="searchForm.spaceNo" placeholder="请输入车位编号" />
            </el-form-item>
            <el-form-item label="完整车位号">
              <el-input v-model="searchForm.fullSpaceNo" placeholder="请输入完整车位号" />
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="车位ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewParkingSpaceDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="parkingLotId" label="停车场ID" width="100" sortable />
        <el-table-column prop="spaceNo" label="车位编号" width="120" sortable />
        <el-table-column prop="fullSpaceNo" label="完整车位号" width="150" sortable />
        <el-table-column prop="spaceType" label="车位类型" width="100" sortable />
        <el-table-column prop="spaceArea" label="车位面积(㎡)" width="120" sortable />
        <el-table-column prop="spaceStatus" label="车位状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.spaceStatus === '空闲'" type="success">空闲</el-tag>
            <el-tag v-else-if="scope.row.spaceStatus === '已租'" type="warning">已租</el-tag>
            <el-tag v-else-if="scope.row.spaceStatus === '占用'" type="info">占用</el-tag>
            <el-tag v-else-if="scope.row.spaceStatus === '维修'" type="warning">维修</el-tag>
            <el-tag v-else type="warning">{{ scope.row.spaceStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ownerId" label="业主ID" width="100" sortable />
        <el-table-column prop="vehicleId" label="车辆ID" width="100" sortable />
        <el-table-column prop="monthlyFee" label="月租费用" width="100" sortable />
        <el-table-column prop="remark" label="备注" width="150" sortable />
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
        <el-form-item label="停车场ID" prop="parkingLotId">
          <el-input-number v-model="formData.parkingLotId" :min="1" style="width: 100%" />
        </el-form-item>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车位编号" prop="spaceNo">
              <el-input v-model="formData.spaceNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="完整车位号" prop="fullSpaceNo">
              <el-input v-model="formData.fullSpaceNo" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车位类型" prop="spaceType">
              <el-select v-model="formData.spaceType" placeholder="请选择车位类型" style="width: 100%">
                <el-option label="固定" value="固定" />
                <el-option label="临时" value="临时" />
                <el-option label="访客车位" value="访客车位" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车位面积(㎡)" prop="spaceArea">
              <el-input-number v-model="formData.spaceArea" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车位状态" prop="spaceStatus">
              <el-select v-model="formData.spaceStatus" placeholder="请选择车位状态" style="width: 100%">
                <el-option label="空闲" value="空闲" />
                <el-option label="已租" value="已租" />
                <el-option label="已售" value="已售" />
                <el-option label="维修中" value="维修中" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业主ID" prop="ownerId">
              <el-input-number v-model="formData.ownerId" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车辆ID" prop="vehicleId">
              <el-input-number v-model="formData.vehicleId" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="月租金" prop="monthlyFee">
          <el-input-number v-model="formData.monthlyFee" :min="0" :precision="2" style="width: 100%" />
        </el-form-item>
        
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" />
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
import { parkingSpaceApi } from '@/api/parking'

export default {
  name: 'ParkingSpaceList',
  components: {
    PaginationTable
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      spaceNo: '',
      fullSpaceNo: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      parkingLotId: undefined,
      spaceNo: '',
      fullSpaceNo: '',
      spaceType: '固定',
      spaceArea: null,
      spaceStatus: '空闲',
      ownerId: 0,
      vehicleId: null,
      monthlyFee: 0,
      remark: ''
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增车位' : '编辑车位'
    })
    
    // 表单验证规则
    const formRules = {
      spaceNo: [
        { required: true, message: '请输入车位编号', trigger: 'blur' }
      ],
      parkingLotId: [
        { required: true, message: '请输入停车场ID', trigger: 'blur' }
      ]
    }
    
    // 处理新增
    const handleCreate = () => {
      dialogType.value = 'create'
      dialogVisible.value = true
      // 重置表单数据
      Object.assign(formData, {
        id: undefined,
        parkingLotId: undefined,
        spaceNo: '',
        fullSpaceNo: '',
        spaceType: '固定',
        spaceArea: null,
        spaceStatus: '空闲',
        ownerId: 0,
        vehicleId: null,
        monthlyFee: 0,
        remark: ''
      })
    }
    
    // 处理编辑
    const handleEdit = (row) => {
      dialogType.value = 'edit'
      dialogVisible.value = true
      // 填充表单数据
      Object.keys(formData).forEach(key => {
        formData[key] = row[key] !== null && row[key] !== undefined ? row[key] : '';
      })
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该车位信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await parkingSpaceApi.delete(row.id)
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
          await parkingSpaceApi.create(formData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await parkingSpaceApi.update(formData)
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
    
    // 查看车位详情
    const viewParkingSpaceDetail = (parkingSpaceId) => {
      router.push(`/parking-space-detail/${parkingSpaceId}`)
    }
    
    return {
      parkingSpaceApi,
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
      viewParkingSpaceDetail
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