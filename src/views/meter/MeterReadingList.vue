<template>
  <div class="meter-reading-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>抄表记录管理</span>
          <el-button type="primary" @click="handleCreate" style="float: right;">新增记录</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="meterReadingApi.getPage"
        :search-api-function="meterReadingApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="仪表ID">
              <el-input v-model="searchForm.meterId" placeholder="请输入仪表ID" />
            </el-form-item>
            <el-form-item label="抄表员">
              <el-input v-model="searchForm.readerName" placeholder="请输入抄表员" />
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="记录ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewReadingDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="meterId" label="仪表ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewMeterDetail(scope.row.meterId)">{{ scope.row.meterId }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="categoryName" label="分类名称" width="100" sortable />
        <el-table-column prop="previousReading" label="上次读数" width="110" sortable />
        <el-table-column prop="currentReading" label="本次读数" width="110" sortable />
        <el-table-column prop="usageAmount" label="用量" width="100" sortable />
        <el-table-column prop="unit" label="单位" width="80" sortable />
        <el-table-column prop="readingDate" label="抄表日期" width="120" sortable />
        <el-table-column prop="readingTime" label="抄表时间" width="180" sortable />
        <el-table-column prop="readerName" label="抄表人" width="100" sortable />
        <el-table-column prop="readerId" label="抄表人ID" width="100" sortable />
        <el-table-column prop="readingType" label="抄表类型" width="100" sortable />
        <el-table-column prop="readingStatus" label="抄表状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.readingStatus === '正常'" type="success">正常</el-tag>
            <el-tag v-else-if="scope.row.readingStatus === '异常'" type="warning">异常</el-tag>
            <el-tag v-else type="warning">{{ scope.row.readingStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="abnormalReason" label="异常原因" width="150" sortable />
        <el-table-column prop="processed" label="是否处理" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.processed ? 'success' : 'info'">{{ scope.row.processed ? '已处理' : '未处理' }}</el-tag>
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
            <el-form-item label="仪表ID" prop="meterId">
              <el-input-number v-model="formData.meterId" :min="1" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="仪表分类" prop="categoryName">
              <el-input v-model="formData.categoryName" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="上次读数" prop="previousReading">
              <el-input-number v-model="formData.previousReading" :min="0" :precision="2" style="width: 100%" />
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
            <el-form-item label="用量" prop="usageAmount">
              <el-input-number v-model="formData.usageAmount" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="unit">
              <el-input v-model="formData.unit" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="抄表日期" prop="readingDate">
              <el-date-picker
                v-model="formData.readingDate"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择抄表日期"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="抄表时间" prop="readingTime">
              <el-date-picker
                v-model="formData.readingTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择抄表时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="抄表人ID" prop="readerId">
              <el-input-number v-model="formData.readerId" :min="1" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="抄表人" prop="readerName">
              <el-input v-model="formData.readerName" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="抄表类型" prop="readingType">
              <el-select v-model="formData.readingType" placeholder="请选择抄表类型" style="width: 100%">
                <el-option label="手动" value="手动" />
                <el-option label="自动" value="自动" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="抄表状态" prop="readingStatus">
              <el-select v-model="formData.readingStatus" placeholder="请选择抄表状态" style="width: 100%">
                <el-option label="正常" value="正常" />
                <el-option label="异常" value="异常" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="是否处理" prop="processed">
          <el-select v-model="formData.processed" placeholder="请选择处理状态" style="width: 100%">
            <el-option label="未处理" :value="0" />
            <el-option label="已处理" :value="1" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="异常原因" prop="abnormalReason">
          <el-input v-model="formData.abnormalReason" />
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
import { meterReadingApi } from '@/api/meter'

export default {
  name: 'MeterReadingList',
  components: {
    PaginationTable
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      meterId: '',
      readerName: '',
      readingType: '',
      readingStatus: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      meterId: undefined,
      previousReading: 0.00,
      currentReading: 0.00,
      usageAmount: 0.00,
      unit: '',
      readingDate: '',
      readingTime: '',
      readerId: undefined,
      readerName: '',
      categoryName: '',
      readingType: '手动',
      readingStatus: '正常',
      abnormalReason: '',
      processed: 0,
      remark: ''
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增抄表记录' : '编辑抄表记录'
    })
    
    // 表单验证规则
    const formRules = {
      meterId: [
        { required: true, message: '请输入仪表ID', trigger: 'blur' }
      ],
      currentReading: [
        { required: true, message: '请输入当前读数', trigger: 'blur' }
      ],
      readerId: [
        { required: true, message: '请输入抄表人ID', trigger: 'blur' }
      ],
      readingDate: [
        { required: true, message: '请选择抄表日期', trigger: 'blur' }
      ]
    }
    
    // 处理新增
    const handleCreate = () => {
      dialogType.value = 'create'
      dialogVisible.value = true
      // 重置表单数据
      Object.assign(formData, {
        id: undefined,
        meterId: undefined,
        previousReading: 0.00,
        currentReading: 0.00,
        usageAmount: 0.00,
        unit: '',
        readingDate: '',
        readingTime: '',
        readerId: undefined,
        readerName: '',
        categoryName: '',
        readingType: '手动',
        readingStatus: '正常',
        abnormalReason: '',
        processed: 0,
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
      ElMessageBox.confirm('确认删除该抄表记录吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await meterReadingApi.delete(row.id)
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
          await meterReadingApi.create(formData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await meterReadingApi.update(formData)
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
    
    // 查看抄表记录详情
    const viewReadingDetail = (readingId) => {
      router.push(`/meter-reading-detail/${readingId}`)
    }
    
    // 查看仪表详情
    const viewMeterDetail = (meterId) => {
      router.push(`/meter-reading-meter-detail/${meterId}`)
    }
    
    return {
      meterReadingApi,
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
      viewReadingDetail,
      viewMeterDetail
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