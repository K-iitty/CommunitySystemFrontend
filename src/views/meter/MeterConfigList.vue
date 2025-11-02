<template>
  <div class="meter-config-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>仪表配置管理</span>
          <el-button type="primary" @click="handleCreate" style="float: right;">新增配置</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="meterConfigApi.getPage"
        :search-api-function="meterConfigApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="仪表类型">
              <el-input v-model="searchForm.meterType" placeholder="请输入仪表类型" />
            </el-form-item>
            <el-form-item label="倍率">
              <el-input v-model="searchForm.ratio" placeholder="请输入倍率" />
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="配置ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewConfigDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="categoryName" label="分类名称" width="120" sortable />
        <el-table-column prop="meterType" label="仪表种类" width="120" sortable />
        <el-table-column prop="productId" label="产品ID" width="100" sortable />
        <el-table-column prop="unit" label="计量单位" width="100" sortable />
        <el-table-column prop="decimalPlaces" label="小数位数" width="100" sortable />
        <el-table-column prop="maxValue" label="最大值" width="100" sortable />
        <el-table-column prop="minValue" label="最小值" width="100" sortable />
        <el-table-column prop="chargeStandard" label="收费标准" width="120" sortable />
        <el-table-column prop="unitPrice" label="单价" width="100" sortable />
        <el-table-column prop="calculationMethod" label="计算方式" width="120" sortable />
        <el-table-column prop="commProtocol" label="通信协议" width="120" sortable />
        <el-table-column prop="status" label="状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.status === '启用'" type="success">启用</el-tag>
            <el-tag v-else-if="scope.row.status === '禁用'" type="info">禁用</el-tag>
            <el-tag v-else type="warning">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isDefault" label="是否默认" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.isDefault ? 'success' : 'info'">{{ scope.row.isDefault ? '是' : '否' }}</el-tag>
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
            <el-form-item label="单位" prop="unit">
              <el-input v-model="formData.unit" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="小数位数" prop="decimalPlaces">
              <el-input-number v-model="formData.decimalPlaces" :min="0" :max="10" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="最小值" prop="minValue">
              <el-input-number v-model="formData.minValue" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最大值" prop="maxValue">
              <el-input-number v-model="formData.maxValue" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单价" prop="unitPrice">
              <el-input-number v-model="formData.unitPrice" :min="0" :precision="4" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收费方式" prop="chargeStandard">
              <el-input v-model="formData.chargeStandard" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="产品ID" prop="productId">
          <el-input v-model="formData.productId" />
        </el-form-item>
        
        <el-form-item label="配置参数" prop="configParams">
          <el-input v-model="formData.configParams" type="textarea" />
        </el-form-item>
        
        <el-form-item label="计算方式" prop="calculationMethod">
          <el-input v-model="formData.calculationMethod" />
        </el-form-item>
        
        <el-form-item label="通讯协议" prop="commProtocol">
          <el-input v-model="formData.commProtocol" />
        </el-form-item>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="formData.status" placeholder="请选择状态" style="width: 100%">
                <el-option label="启用" value="启用" />
                <el-option label="停用" value="停用" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否默认" prop="isDefault">
              <el-select v-model="formData.isDefault" placeholder="请选择" style="width: 100%">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
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
import { meterConfigApi } from '@/api/meter'

export default {
  name: 'MeterConfigList',
  components: {
    PaginationTable
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      categoryName: '',
      meterType: '',
      status: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      categoryName: '',
      meterType: '',
      productId: '',
      configParams: '',
      unit: '',
      decimalPlaces: 2,
      maxValue: null,
      minValue: 0,
      chargeStandard: '',
      unitPrice: 0,
      calculationMethod: '',
      commProtocol: '',
      status: '启用',
      isDefault: 0,
      remark: ''
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增配置' : '编辑配置'
    })
    
    // 表单验证规则
    const formRules = {
      categoryName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' }
      ],
      meterType: [
        { required: true, message: '请输入仪表类型', trigger: 'blur' }
      ],
      unit: [
        { required: true, message: '请输入单位', trigger: 'blur' }
      ]
    }
    
    // 处理新增
    const handleCreate = () => {
      dialogType.value = 'create'
      dialogVisible.value = true
      // 重置表单数据
      Object.assign(formData, {
        id: undefined,
        categoryName: '',
        meterType: '',
        productId: '',
        configParams: '',
        unit: '',
        decimalPlaces: 2,
        maxValue: null,
        minValue: 0,
        chargeStandard: '',
        unitPrice: 0,
        calculationMethod: '',
        commProtocol: '',
        status: '启用',
        isDefault: 0,
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
      ElMessageBox.confirm('确认删除该仪表配置吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await meterConfigApi.delete(row.id)
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
          await meterConfigApi.create(formData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await meterConfigApi.update(formData)
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
    
    // 查看配置详情
    const viewConfigDetail = (configId) => {
      router.push(`/meter-config-detail/${configId}`)
    }
    
    return {
      meterConfigApi,
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
      viewConfigDetail
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