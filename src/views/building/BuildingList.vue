<template>
  <div class="building-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>楼栋信息管理</span>
          <el-button type="primary" @click="handleCreate">新增楼栋</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="buildingApi.getPage"
        :search-api-function="buildingApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="社区ID">
              <el-input v-model="searchForm.communityId" placeholder="请输入社区ID" />
            </el-form-item>
            <el-form-item label="楼栋编号">
              <el-input v-model="searchForm.buildingNo" placeholder="请输入楼栋编号" />
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
        
        <el-table-column prop="id" label="楼栋ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewBuildingDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="communityId" label="社区ID" width="80" sortable />
        <el-table-column prop="buildingNo" label="楼栋编号" width="100" sortable />
        <el-table-column prop="buildingName" label="楼栋名称" width="120" sortable />
        <el-table-column prop="buildingAlias" label="楼栋别名" width="120" sortable />
        <el-table-column prop="buildingType" label="楼栋类型" width="100" sortable />
        <el-table-column prop="buildingStructure" label="建筑结构" width="110" sortable />
        <el-table-column prop="buildingPurpose" label="建筑用途" width="110" sortable />
        <el-table-column prop="totalUnits" label="单元数" width="80" sortable />
        <el-table-column prop="totalFloors" label="地上层数" width="100" sortable />
        <el-table-column prop="undergroundFloors" label="地下层数" width="100" sortable />
        <el-table-column prop="totalHouseholds" label="房屋总数" width="100" sortable />
        <el-table-column prop="buildingArea" label="建筑面积(㎡)" width="130" sortable />
        <el-table-column prop="usableArea" label="使用面积(㎡)" width="130" sortable />
        <el-table-column prop="publicArea" label="公摊面积(㎡)" width="130" sortable />
        <el-table-column prop="builtDate" label="建成日期" width="120" sortable />
        <el-table-column prop="acceptanceDate" label="验收日期" width="120" sortable />
        <el-table-column prop="hasElevator" label="有无电梯" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.hasElevator ? 'success' : 'info'">{{ scope.row.hasElevator ? '有' : '无' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="elevatorCount" label="电梯数" width="80" sortable />
        <el-table-column prop="stairCount" label="楼梯数" width="80" sortable />
        <el-table-column prop="status" label="状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.status === '正常'" type="success">正常</el-tag>
            <el-tag v-else-if="scope.row.status === '维修中'" type="warning">维修中</el-tag>
            <el-tag v-else-if="scope.row.status === '停用'" type="info">停用</el-tag>
            <el-tag v-else type="warning">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="buildingGrade" label="楼栋等级" width="100" sortable />
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
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="楼栋编号" prop="buildingNo">
              <el-input v-model="formData.buildingNo" placeholder="请输入楼栋编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼栋名称" prop="buildingName">
              <el-input v-model="formData.buildingName" placeholder="请输入楼栋名称" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="楼栋别名" prop="buildingAlias">
              <el-input v-model="formData.buildingAlias" placeholder="请输入楼栋别名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单元号" prop="unitNo">
              <el-input v-model="formData.unitNo" placeholder="请输入单元号" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单元名称" prop="unitName">
              <el-input v-model="formData.unitName" placeholder="请输入单元名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼栋类型" prop="buildingType">
              <el-select v-model="formData.buildingType" placeholder="请选择楼栋类型" style="width: 100%">
                <el-option label="住宅" value="住宅" />
                <el-option label="商业" value="商业" />
                <el-option label="办公" value="办公" />
                <el-option label="综合" value="综合" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="建筑结构" prop="buildingStructure">
              <el-input v-model="formData.buildingStructure" placeholder="请输入建筑结构" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼栋用途" prop="buildingPurpose">
              <el-input v-model="formData.buildingPurpose" placeholder="请输入楼栋用途" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单元数" prop="totalUnits">
              <el-input-number v-model="formData.totalUnits" :min="1" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地上层数" prop="totalFloors">
              <el-input-number v-model="formData.totalFloors" :min="1" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="地下层数" prop="undergroundFloors">
              <el-input-number v-model="formData.undergroundFloors" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋总数" prop="totalHouseholds">
              <el-input-number v-model="formData.totalHouseholds" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="建筑面积(㎡)" prop="buildingArea">
              <el-input-number v-model="formData.buildingArea" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用面积(㎡)" prop="usableArea">
              <el-input-number v-model="formData.usableArea" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="公摊面积(㎡)" prop="publicArea">
              <el-input-number v-model="formData.publicArea" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建成日期" prop="builtDate">
              <el-date-picker v-model="formData.builtDate" type="date" value-format="YYYY-MM-DD" placeholder="请选择建成日期" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="验收日期" prop="acceptanceDate">
              <el-date-picker v-model="formData.acceptanceDate" type="date" value-format="YYYY-MM-DD" placeholder="请选择验收日期" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有无电梯" prop="hasElevator">
              <el-select v-model="formData.hasElevator" placeholder="请选择是否有电梯" style="width: 100%">
                <el-option label="有" :value="1" />
                <el-option label="无" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="电梯数" prop="elevatorCount">
              <el-input-number v-model="formData.elevatorCount" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼梯数" prop="stairCount">
              <el-input-number v-model="formData.stairCount" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="formData.status" placeholder="请选择状态" style="width: 100%">
                <el-option label="正常" value="正常" />
                <el-option label="维修中" value="维修中" />
                <el-option label="停用" value="停用" />
                <el-option label="拆除" value="拆除" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼栋等级" prop="buildingGrade">
              <el-input v-model="formData.buildingGrade" placeholder="请输入楼栋等级" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入备注信息" />
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
import { buildingApi } from '@/api/community'

export default {
  name: 'BuildingList',
  components: {
    PaginationTable
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      communityId: '',
      buildingName: '',
      buildingNo: '',
      status: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      communityId: 1,
      buildingNo: '',
      buildingName: '',
      buildingAlias: '',
      unitNo: '',
      unitName: '',
      buildingType: '住宅',
      buildingStructure: '',
      buildingPurpose: '',
      totalUnits: 1,
      totalFloors: 1,
      undergroundFloors: 0,
      totalHouseholds: 0,
      householdsPerFloor: null,
      buildingArea: 0,
      usableArea: 0,
      publicArea: 0,
      builtDate: '',
      acceptanceDate: '',
      deliveryDate: '',
      longitude: null,
      latitude: null,
      buildingAddress: '',
      orientation: '',
      hasElevator: 0,
      elevatorCount: 0,
      stairCount: 0,
      hasUndergroundParking: 0,
      hasRooftop: 0,
      status: '正常',
      buildingGrade: '',
      remark: ''
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增楼栋' : '编辑楼栋'
    })
    
    // 表单验证规则
    const formRules = {
      buildingNo: [
        { required: true, message: '请输入楼栋编号', trigger: 'blur' }
      ],
      buildingName: [
        { required: true, message: '请输入楼栋名称', trigger: 'blur' }
      ],
      buildingType: [
        { required: true, message: '请选择建筑类型', trigger: 'blur' }
      ],
      buildingStructure: [
        { required: true, message: '请输入建筑结构', trigger: 'blur' }
      ],
      totalFloors: [
        { required: true, message: '请输入总层数', trigger: 'blur' }
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
        buildingNo: '',
        buildingName: '',
        buildingAlias: '',
        unitNo: '',
        unitName: '',
        buildingType: '住宅',
        buildingStructure: '',
        buildingPurpose: '',
        totalUnits: 1,
        totalFloors: 1,
        undergroundFloors: 0,
        totalHouseholds: 0,
        householdsPerFloor: null,
        buildingArea: 0,
        usableArea: 0,
        publicArea: 0,
        builtDate: '',
        acceptanceDate: '',
        deliveryDate: '',
        longitude: null,
        latitude: null,
        buildingAddress: '',
        orientation: '',
        hasElevator: 0,
        elevatorCount: 0,
        stairCount: 0,
        hasUndergroundParking: 0,
        hasRooftop: 0,
        status: '正常',
        buildingGrade: '',
        remark: ''
      })
    }
    
    // 处理编辑
    const handleEdit = (row) => {
      dialogType.value = 'edit'
      dialogVisible.value = true
      // 填充表单数据 - 自动填充所有字段
      Object.keys(formData).forEach(key => {
        if (row[key] !== null && row[key] !== undefined) {
          formData[key] = row[key]
        } else if (typeof formData[key] === 'number') {
          formData[key] = 0
        } else if (typeof formData[key] === 'boolean') {
          formData[key] = false
        } else {
          formData[key] = ''
        }
      })
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该楼栋信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await buildingApi.delete(row.id)
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
          await buildingApi.create(formData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await buildingApi.update(formData)
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
    
    // 查看楼栋详情
    const viewBuildingDetail = (buildingId) => {
      router.push(`/building-detail/${buildingId}`)
    }
    
    return {
      buildingApi,
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
      viewBuildingDetail
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