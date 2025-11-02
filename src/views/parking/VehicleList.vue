<template>
  <div class="vehicle-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>车辆信息管理</span>
          <el-button type="primary" @click="handleCreate">新增车辆</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="vehicleApi.getPage"
        :search-api-function="vehicleApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="车牌号">
              <el-input v-model="searchForm.plateNumber" placeholder="请输入车牌号" />
            </el-form-item>
            <el-form-item label="车主ID">
              <el-input v-model="searchForm.ownerId" placeholder="请输入车主ID" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="请选择状态" style="width: 100px;">
                <el-option label="全部" value="" />
                <el-option label="正常" value="正常" />
                <el-option label="注销" value="注销" />
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="车辆ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewVehicleDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="ownerId" label="车主ID" width="80" sortable />
        <el-table-column prop="plateNumber" label="车牌号" width="120" sortable />
        <el-table-column prop="vehicleType" label="车辆类型" width="100" sortable />
        <el-table-column prop="brand" label="品牌" width="100" sortable />
        <el-table-column prop="model" label="型号" width="100" sortable />
        <el-table-column prop="color" label="颜色" width="80" sortable />
        <el-table-column prop="vehicleLicenseNo" label="行驶证号" width="130" sortable />
        <el-table-column prop="engineNo" label="发动机号" width="130" sortable />
        <el-table-column prop="fixedSpaceId" label="固定车位ID" width="110" sortable />
        <el-table-column prop="registerDate" label="登记日期" width="120" sortable />
        <el-table-column prop="status" label="状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.status === '正常'" type="success">正常</el-tag>
            <el-tag v-else-if="scope.row.status === '冻结'" type="warning">冻结</el-tag>
            <el-tag v-else-if="scope.row.status === '黑名单'" type="danger">黑名单</el-tag>
            <el-tag v-else type="warning">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="驾照照片" width="150">
          <template #default="scope">
            <ImageGallery :image-data="scope.row.driverLicenseImage" size="tiny" />
          </template>
        </el-table-column>
        <el-table-column label="车辆图片" width="150">
          <template #default="scope">
            <ImageGallery :image-data="scope.row.vehicleImages" size="tiny" />
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
        label-width="120px"
      >
        <el-form-item label="车主ID" prop="ownerId">
          <el-input-number v-model="formData.ownerId" :min="1" />
        </el-form-item>
        <el-form-item label="车牌号" prop="plateNumber">
          <el-input v-model="formData.plateNumber" />
        </el-form-item>
        <el-form-item label="车辆类型" prop="vehicleType">
          <el-input v-model="formData.vehicleType" />
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="formData.brand" />
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="formData.model" />
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-input v-model="formData.color" />
        </el-form-item>
        <el-form-item label="固定车位ID" prop="fixedSpaceId">
          <el-input-number v-model="formData.fixedSpaceId" :min="0" />
        </el-form-item>
        <el-form-item label="车辆登记证号" prop="vehicleLicenseNo">
          <el-input v-model="formData.vehicleLicenseNo" />
        </el-form-item>
        <el-form-item label="发动机号" prop="engineNo">
          <el-input v-model="formData.engineNo" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择状态">
            <el-option label="正常" value="正常" />
            <el-option label="冻结" value="冻结" />
            <el-option label="黑名单" value="黑名单" />
          </el-select>
        </el-form-item>
        <el-form-item label="注册日期" prop="registerDate">
          <el-date-picker
            v-model="formData.registerDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择注册日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" />
        </el-form-item>
        <el-form-item label="驾照照片">
          <ImageUpload v-model="formData.driverLicenseImageFile" :max-count="1" />
        </el-form-item>
        <el-form-item label="车辆照片">
          <ImageUpload v-model="formData.vehicleImageFiles" :max-count="1" />
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
import ImageGallery from '@/components/ImageGallery.vue'
import ImageUpload from '@/components/ImageUpload.vue' // Added ImageUpload import
import { vehicleApi } from '@/api/parking'

export default {
  name: 'VehicleList',
  components: {
    PaginationTable,
    ImageGallery,
    ImageUpload // Added ImageUpload component
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      plateNumber: '',
      ownerId: '',
      status: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      ownerId: null,
      plateNumber: '',
      vehicleType: '',
      brand: '',
      model: '',
      color: '',
      fixedSpaceId: null,
      vehicleLicenseNo: '',
      engineNo: '',
      driverLicenseImageFile: null,
      vehicleImageFiles: null,
      status: '正常',
      registerDate: '',
      remark: '',
      createdAt: '',
      updatedAt: ''
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增车辆' : '编辑车辆'
    })
    
    // 表单验证规则
    const formRules = {
      ownerId: [
        { required: true, message: '请输入车主ID', trigger: 'blur' }
      ],
      plateNumber: [
        { required: true, message: '请输入车牌号', trigger: 'blur' }
      ]
    }
    
    // 查看车辆详情
    const viewVehicleDetail = (vehicleId) => {
      router.push(`/vehicle-detail/${vehicleId}`)
    }
    
    // 处理新增
    const handleCreate = () => {
      dialogType.value = 'create'
      dialogVisible.value = true
      // 重置表单数据
      Object.assign(formData, {
        id: undefined,
        ownerId: null,
        plateNumber: '',
        vehicleType: '',
        brand: '',
        model: '',
        color: '',
        fixedSpaceId: null,
        vehicleLicenseNo: '',
        engineNo: '',
        driverLicenseImageFile: null,
        vehicleImageFiles: null,
        status: '正常',
        registerDate: '',
        remark: '',
        createdAt: '',
        updatedAt: ''
      })
    }
    
    // 处理编辑
    const handleEdit = (row) => {
      dialogType.value = 'edit'
      dialogVisible.value = true
      // 填充表单数据
      Object.keys(formData).forEach(key => {
        if (key === 'vehicleImageFiles' || key === 'driverLicenseImageFile') {
          // 处理图片字段 - 单张模式
          let imageValue = row[key]
          if (typeof imageValue === 'string') {
            // 如果是字符串URL，直接使用
            formData[key] = imageValue
          } else if (Array.isArray(imageValue) && imageValue.length > 0) {
            // 如果是数组，取第一个元素
            formData[key] = imageValue[0]
          } else {
            // 其他情况设为 null
            formData[key] = null
          }
        } else {
          formData[key] = row[key] !== null && row[key] !== undefined ? row[key] : ''
        }
      })
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该车辆信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await vehicleApi.delete(row.id)
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
      // 完全重置 formData 对象
      Object.assign(formData, {
        id: undefined,
        ownerId: null,
        plateNumber: '',
        vehicleType: '',
        brand: '',
        model: '',
        color: '',
        fixedSpaceId: null,
        vehicleLicenseNo: '',
        engineNo: '',
        driverLicenseImageFile: null,
        vehicleImageFiles: null,
        status: '正常',
        registerDate: '',
        remark: '',
        createdAt: '',
        updatedAt: ''
      })
    }
    
    // 处理提交
    const handleSubmit = async () => {
      try {
        await formRef.value.validate()
        
        if (dialogType.value === 'create') {
          // 新增
          await vehicleApi.create(formData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await vehicleApi.update(formData)
          ElMessage.success('编辑成功')
        }
        
        dialogVisible.value = false
        // 完全重置 formData
        Object.assign(formData, {
          id: undefined,
          ownerId: null,
          plateNumber: '',
          vehicleType: '',
          brand: '',
          model: '',
          color: '',
          fixedSpaceId: null,
          vehicleLicenseNo: '',
          engineNo: '',
          driverLicenseImageFile: null,
          vehicleImageFiles: null,
          status: '正常',
          registerDate: '',
          remark: '',
          createdAt: '',
          updatedAt: ''
        })
        // 重置分页到第一页并刷新表格数据
        tableRef.value.pagination.pageNum = 1
        tableRef.value.fetchData()
      } catch (error) {
        ElMessage.error('保存失败: ' + (error.message || '未知错误'))
        console.error('保存失败:', error)
      }
    }
    
    return {
      vehicleApi,
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
      viewVehicleDetail
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