<template>
  <div class="meter-info-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>仪表信息管理</span>
          <el-button type="primary" @click="handleCreate" style="float: right;">新增仪表</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="meterInfoApi.getPage"
        :search-api-function="meterInfoApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="仪表编号">
              <el-input v-model="searchForm.meterNo" placeholder="请输入仪表编号" />
            </el-form-item>
            <el-form-item label="房屋ID">
              <el-input v-model="searchForm.houseId" placeholder="请输入房屋ID" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
                <el-option label="正常" value="正常" />
                <el-option label="停用" value="停用" />
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="仪表ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewMeterComplexDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="communityId" label="社区ID" width="80" sortable />
        <el-table-column prop="meterName" label="仪表名称" width="120" sortable />
        <el-table-column prop="meterCode" label="仪表编码" width="120" sortable />
        <el-table-column prop="categoryName" label="分类名称" width="100" sortable />
        <el-table-column prop="meterType" label="仪表种类" width="100" sortable />
        <el-table-column prop="meterSn" label="仪表序列号" width="130" sortable />
        <el-table-column prop="houseId" label="房屋ID" width="80" sortable />
        <el-table-column prop="buildingId" label="楼栋ID" width="80" sortable />
        <el-table-column prop="configId" label="配置ID" width="80" sortable />
        <el-table-column prop="locationType" label="位置类型" width="100" sortable />
        <el-table-column prop="installLocation" label="安装位置" width="150" sortable />
        <el-table-column prop="installDate" label="安装日期" width="120" sortable />
        <el-table-column prop="initialReading" label="起始读数" width="110" sortable />
        <el-table-column prop="currentReading" label="当前读数" width="110" sortable />
        <el-table-column prop="maxReading" label="最大读数" width="110" sortable />
        <el-table-column prop="totalUsage" label="总用量" width="100" sortable />
        <el-table-column prop="unit" label="计量单位" width="100" sortable />
        <el-table-column prop="onlineStatus" label="在线状态" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.onlineStatus ? 'success' : 'info'">{{ scope.row.onlineStatus ? '在线' : '离线' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="powerStatus" label="通电状态" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.powerStatus ? 'success' : 'danger'">{{ scope.row.powerStatus ? '通电' : '断电' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="meterStatus" label="仪表状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.meterStatus === '正常'" type="success">正常</el-tag>
            <el-tag v-else-if="scope.row.meterStatus === '故障'" type="danger">故障</el-tag>
            <el-tag v-else-if="scope.row.meterStatus === '停用'" type="info">停用</el-tag>
            <el-tag v-else type="warning">{{ scope.row.meterStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" sortable />
      </pagination-table>
    </el-card>
    
    <!-- 新增/编辑对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="700px"
      @close="handleDialogClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="社区ID" prop="communityId">
              <el-input-number v-model="formData.communityId" :min="1" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋ID" prop="houseId">
              <el-input-number v-model="formData.houseId" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="配置ID" prop="configId">
              <el-input-number v-model="formData.configId" :min="1" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="仪表名称" prop="meterName">
              <el-input v-model="formData.meterName" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="分类名称" prop="categoryName">
              <el-input v-model="formData.categoryName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="仪表类型" prop="meterType">
              <el-input v-model="formData.meterType" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="仪表编码" prop="meterCode">
              <el-input v-model="formData.meterCode" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="仪表序列号" prop="meterSn">
              <el-input v-model="formData.meterSn" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="位置类型" prop="locationType">
              <el-select v-model="formData.locationType" placeholder="请选择位置类型" style="width: 100%">
                <el-option label="房间表" value="房间表" />
                <el-option label="公共表" value="公共表" />
                <el-option label="总表" value="总表" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安装位置" prop="installLocation">
              <el-input v-model="formData.installLocation" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="安装日期" prop="installDate">
          <el-date-picker
            v-model="formData.installDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择安装日期"
            style="width: 100%"
          />
        </el-form-item>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="初始读数" prop="initialReading">
              <el-input-number v-model="formData.initialReading" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前读数" prop="currentReading">
              <el-input-number v-model="formData.currentReading" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="总用量" prop="totalUsage">
              <el-input-number v-model="formData.totalUsage" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最大读数" prop="maxReading">
              <el-input-number v-model="formData.maxReading" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单位" prop="unit">
              <el-input v-model="formData.unit" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="在线状态" prop="onlineStatus">
              <el-select v-model="formData.onlineStatus" placeholder="请选择在线状态" style="width: 100%">
                <el-option label="在线" :value="1" />
                <el-option label="离线" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="电源状态" prop="powerStatus">
              <el-select v-model="formData.powerStatus" placeholder="请选择电源状态" style="width: 100%">
                <el-option label="供电" :value="1" />
                <el-option label="断电" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="仪表状态" prop="meterStatus">
              <el-select v-model="formData.meterStatus" placeholder="请选择仪表状态" style="width: 100%">
                <el-option label="正常" value="正常" />
                <el-option label="故障" value="故障" />
                <el-option label="停用" value="停用" />
              </el-select>
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
import { meterInfoApi } from '@/api/meter'

export default {
  name: 'MeterInfoList',
  components: {
    PaginationTable
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      meterCode: '',
      meterName: '',
      locationType: '',
      meterStatus: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      communityId: 1,
      houseId: 0,
      buildingId: null,
      configId: undefined,
      meterName: '',
      categoryName: '',
      meterType: '',
      meterCode: '',
      meterSn: '',
      locationType: '房间表',
      installLocation: '',
      installDate: '',
      initialReading: 0.00,
      currentReading: 0.00,
      maxReading: null,
      totalUsage: 0.00,
      unit: '',
      chargeStandard: '',
      onlineStatus: 0,
      powerStatus: 0,
      meterStatus: '正常',
      commAddress: '',
      lastCommTime: '',
      remark: ''
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增仪表' : '编辑仪表'
    })
    
    // 表单验证规则
    const formRules = {
      meterName: [
        { required: true, message: '请输入仪表名称', trigger: 'blur' }
      ],
      meterCode: [
        { required: true, message: '请输入仪表编码', trigger: 'blur' }
      ],
      configId: [
        { required: true, message: '请输入配置ID', trigger: 'blur' }
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
        houseId: 0,
        buildingId: null,
        configId: undefined,
        meterName: '',
        categoryName: '',
        meterType: '',
        meterCode: '',
        meterSn: '',
        locationType: '房间表',
        installLocation: '',
        installDate: '',
        initialReading: 0.00,
        currentReading: 0.00,
        maxReading: null,
        totalUsage: 0.00,
        unit: '',
        chargeStandard: '',
        onlineStatus: 0,
        powerStatus: 0,
        meterStatus: '正常',
        commAddress: '',
        lastCommTime: '',
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
      ElMessageBox.confirm('确认删除该仪表信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await meterInfoApi.delete(row.id)
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
          await meterInfoApi.create(formData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await meterInfoApi.update(formData)
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
    
    // 查看仪表详情
    const viewMeterDetail = (meterId) => {
      router.push(`/meter-info-detail/${meterId}`)
    }
    
    // 查看仪表详情（复杂详情）
    const viewMeterComplexDetail = (meterId) => {
      router.push(`/meter-info-complex-detail/${meterId}`)
    }
    
    return {
      meterInfoApi,
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
      viewMeterDetail,
      viewMeterComplexDetail
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