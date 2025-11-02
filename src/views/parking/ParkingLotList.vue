<template>
  <div class="parking-lot-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>停车场信息管理</span>
          <el-button type="primary" @click="handleCreate" style="float: right;">新增停车场</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="parkingLotApi.getPage"
        :search-api-function="parkingLotApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="停车场名称">
              <el-input v-model="searchForm.lotName" placeholder="请输入停车场名称" />
            </el-form-item>
            <el-form-item label="停车场编号">
              <el-input v-model="searchForm.lotNo" placeholder="请输入停车场编号" />
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="停车场ID" width="100" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewParkingLotDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="communityId" label="社区ID" width="80" sortable />
        <el-table-column prop="lotName" label="停车场名称" width="150" sortable />
        <el-table-column prop="lotCode" label="停车场编码" width="120" sortable />
        <el-table-column prop="lotCategory" label="车库类别" width="100" sortable />
        <el-table-column prop="zoneName" label="区域名称" width="120" sortable />
        <el-table-column prop="zoneCode" label="区域编码" width="100" sortable />
        <el-table-column prop="contactPerson" label="联系人" width="100" sortable />
        <el-table-column prop="contactPhone" label="联系电话" width="120" sortable />
        <el-table-column prop="address" label="地址" width="150" sortable />
        <el-table-column prop="detailAddress" label="详细地址" width="180" sortable />
        <el-table-column prop="totalSpaces" label="总车位数" width="100" sortable />
        <el-table-column prop="fixedSpaces" label="固定车位数" width="110" sortable />
        <el-table-column prop="tempSpaces" label="临时车位数" width="110" sortable />
        <el-table-column prop="startNo" label="起始编号" width="100" sortable />
        <el-table-column prop="endNo" label="结束编号" width="100" sortable />
        <el-table-column prop="floorLevel" label="楼层" width="80" sortable />
        <el-table-column prop="businessHours" label="营业时间" width="150" sortable />
        <el-table-column prop="isAllowForeign" label="允许外来车辆" width="120" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.isAllowForeign ? 'success' : 'info'">{{ scope.row.isAllowForeign ? '允许' : '不允许' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="chargeMethod" label="计费方式" width="100" sortable />
        <el-table-column prop="chargeStandard" label="收费标准" width="120" sortable />
        <el-table-column prop="monthlyFee" label="月租费用" width="100" sortable />
        <el-table-column prop="status" label="状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.status === '启用'" type="success">启用</el-tag>
            <el-tag v-else-if="scope.row.status === '停用'" type="info">停用</el-tag>
            <el-tag v-else-if="scope.row.status === '维修'" type="warning">维修</el-tag>
            <el-tag v-else type="warning">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
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
        label-width="130px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="社区ID" prop="communityId">
              <el-input-number v-model="formData.communityId" :min="1" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="停车场名称" prop="lotName">
              <el-input v-model="formData.lotName" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="停车场编号" prop="lotNo">
              <el-input v-model="formData.lotNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="停车场类别" prop="lotCategory">
              <el-select v-model="formData.lotCategory" placeholder="请选择类别" style="width: 100%">
                <el-option label="普通" value="普通" />
                <el-option label="机械" value="机械" />
                <el-option label="立体" value="立体" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="总车位数" prop="totalSpaces">
              <el-input-number v-model="formData.totalSpaces" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="固定车位数" prop="fixedSpaces">
              <el-input-number v-model="formData.fixedSpaces" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="临时车位数" prop="tempSpaces">
              <el-input-number v-model="formData.tempSpaces" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="允许外来车辆" prop="isAllowForeign">
              <el-select v-model="formData.isAllowForeign" placeholder="请选择" style="width: 100%">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="免费时长(分钟)" prop="freeDuration">
              <el-input-number v-model="formData.freeDuration" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="formData.status" placeholder="请选择状态" style="width: 100%">
                <el-option label="启用" value="启用" />
                <el-option label="停用" value="停用" />
                <el-option label="维修" value="维修" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="联系人" prop="contactPerson">
          <el-input v-model="formData.contactPerson" />
        </el-form-item>
        
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="formData.contactPhone" />
        </el-form-item>
        
        <el-form-item label="区域名称" prop="zoneName">
          <el-input v-model="formData.zoneName" />
        </el-form-item>
        
        <el-form-item label="区域编码" prop="zoneCode">
          <el-input v-model="formData.zoneCode" />
        </el-form-item>
        
        <el-form-item label="详细地址" prop="detailAddress">
          <el-input v-model="formData.detailAddress" type="textarea" />
        </el-form-item>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="formData.longitude" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纬度" prop="latitude">
              <el-input v-model="formData.latitude" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="营业时间" prop="businessHours">
          <el-input v-model="formData.businessHours" />
        </el-form-item>
        
        <el-form-item label="收费方式" prop="chargeMethod">
          <el-input v-model="formData.chargeMethod" />
        </el-form-item>
        
        <el-form-item label="收费标准" prop="chargeStandard">
          <el-input v-model="formData.chargeStandard" type="textarea" />
        </el-form-item>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="首段时间(分钟)" prop="firstDuration">
              <el-input-number v-model="formData.firstDuration" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首段费用" prop="firstFee">
              <el-input-number v-model="formData.firstFee" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单位时长(分钟)" prop="unitDuration">
              <el-input-number v-model="formData.unitDuration" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位费用" prop="unitFee">
              <el-input-number v-model="formData.unitFee" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="每日最高费用" prop="dailyMaxFee">
              <el-input-number v-model="formData.dailyMaxFee" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="月费" prop="monthlyFee">
              <el-input-number v-model="formData.monthlyFee" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        
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
import { parkingLotApi } from '@/api/parking'

export default {
  name: 'ParkingLotList',
  components: {
    PaginationTable
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      lotName: '',
      lotNo: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      communityId: 1,
      lotName: '',
      lotNo: '',
      lotCategory: '普通',
      zoneName: '',
      zoneCode: '',
      contactPerson: '',
      contactPhone: '',
      address: '',
      detailAddress: '',
      longitude: '',
      latitude: '',
      totalSpaces: 0,
      fixedSpaces: 0,
      tempSpaces: 0,
      startNo: '',
      endNo: '',
      floorLevel: '',
      businessHours: '',
      isAllowForeign: 1,
      chargeMethod: '',
      chargeStandard: '',
      firstDuration: 0,
      firstFee: 0,
      unitDuration: 0,
      unitFee: 0,
      dailyMaxFee: 0,
      monthlyFee: 0,
      freeDuration: 15,
      status: '启用',
      remark: ''
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增停车场' : '编辑停车场'
    })
    
    // 表单验证规则
    const formRules = {
      lotName: [
        { required: true, message: '请输入停车场名称', trigger: 'blur' }
      ],
      lotNo: [
        { required: true, message: '请输入停车场编号', trigger: 'blur' }
      ],
      communityId: [
        { required: true, message: '请输入社区ID', trigger: 'blur' }
      ]
    }
    
    // 处理新增
    const handleCreate = () => {
      dialogType.value = 'create'
      dialogVisible.value = true
      // 重置表单数据
      Object.assign(formData, {
        id: undefined,
        communityId: 1,
        lotName: '',
        lotNo: '',
        lotCategory: '普通',
        zoneName: '',
        zoneCode: '',
        contactPerson: '',
        contactPhone: '',
        address: '',
        detailAddress: '',
        longitude: '',
        latitude: '',
        totalSpaces: 0,
        fixedSpaces: 0,
        tempSpaces: 0,
        startNo: '',
        endNo: '',
        floorLevel: '',
        businessHours: '',
        isAllowForeign: 1,
        chargeMethod: '',
        chargeStandard: '',
        firstDuration: 0,
        firstFee: 0,
        unitDuration: 0,
        unitFee: 0,
        dailyMaxFee: 0,
        monthlyFee: 0,
        freeDuration: 15,
        status: '启用',
        remark: ''
      })
    }
    
    // 处理编辑
    const handleEdit = (row) => {
      dialogType.value = 'edit'
      dialogVisible.value = true
      // 填充表单数据
      Object.assign(formData, row)
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该停车场信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await parkingLotApi.delete(row.id)
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
          await parkingLotApi.create(formData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await parkingLotApi.update(formData)
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
    
    // 查看停车场详情
    const viewParkingLotDetail = (parkingLotId) => {
      router.push(`/parking-lot-detail/${parkingLotId}`)
    }
    
    return {
      parkingLotApi,
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
      viewParkingLotDetail
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