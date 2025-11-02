<template>
  <div class="parking-record-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>停车记录管理</span>
        </div>
      </template>
      
      <pagination-table
        :api-function="parkingRecordApi.getPage"
        :search-api-function="parkingRecordApi.search"
        :show-actions="false"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="车位ID">
              <el-input v-model="searchForm.parkingSpaceId" placeholder="请输入车位ID" />
            </el-form-item>
            <el-form-item label="车牌号">
              <el-input v-model="searchForm.plateNumber" placeholder="请输入车牌号" />
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewParkingRecordDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="parkingLotId" label="停车场ID" width="100" sortable />
        <el-table-column prop="parkingSpaceId" label="车位ID" width="100" sortable />
        <el-table-column prop="vehicleId" label="车辆ID" width="80" sortable />
        <el-table-column prop="plateNumber" label="车牌号" width="120" sortable />
        <el-table-column prop="vehicleType" label="车辆类型" width="100" sortable />
        <el-table-column prop="ownerId" label="车主ID" width="80" sortable />
        <el-table-column prop="ownerName" label="车主姓名" width="100" sortable />
        <el-table-column prop="ownerPhone" label="车主电话" width="120" sortable />
        <el-table-column prop="gateNo" label="闸机号" width="100" sortable />
        <el-table-column prop="entryTime" label="入场时间" width="180" sortable />
        <el-table-column prop="exitTime" label="出场时间" width="180" sortable />
        <el-table-column prop="payTime" label="支付时间" width="180" sortable />
        <el-table-column prop="durationMinutes" label="停车时长(分钟)" width="140" sortable />
        <el-table-column prop="parkingFee" label="停车费用" width="100" sortable />
        <el-table-column prop="actualFee" label="实收费用" width="100" sortable />
        <el-table-column prop="paymentMethod" label="支付方式" width="100" sortable />
        <el-table-column prop="paymentStatus" label="支付状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.paymentStatus === '已支付'" type="success">已支付</el-tag>
            <el-tag v-else-if="scope.row.paymentStatus === '未支付'" type="warning">未支付</el-tag>
            <el-tag v-else type="info">{{ scope.row.paymentStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="transactionNo" label="交易流水号" width="150" sortable />
        <el-table-column prop="createdAt" label="创建时间" width="180" sortable />
      </pagination-table>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, provide, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import PaginationTable from '@/components/PaginationTable.vue'
import { parkingRecordApi } from '@/api/parkingRecord.js'

export default {
  name: 'ParkingRecordList',
  components: {
    PaginationTable
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      parkingSpaceId: '',
      plateNumber: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 查看停车记录详情
    const viewParkingRecordDetail = (recordId) => {
      router.push(`/parking-record-detail/${recordId}`)
    }
    
    // 组件挂载时的调试信息
    onMounted(() => {
      console.log('ParkingRecordList component mounted')
    })
    
    return {
      tableRef,
      searchForm,
      viewParkingRecordDetail,
      parkingRecordApi
    }
  }
}
</script>
