<template>
  <div class="house-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>房屋信息管理</span>
          <el-button type="primary" @click="handleCreate">新增房屋</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="houseApi.getPage"
        :search-api-function="houseApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="楼栋ID">
              <el-input v-model="searchForm.buildingId" placeholder="请输入楼栋ID" />
            </el-form-item>
            <el-form-item label="房屋编码">
              <el-input v-model="searchForm.houseCode" placeholder="请输入房屋编码" />
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
        
        <el-table-column prop="id" label="房屋ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewHouseComplexDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="communityId" label="社区ID" width="80" sortable />
        <el-table-column prop="buildingId" label="楼栋ID" width="80" sortable />
        <el-table-column prop="houseCode" label="房屋编码" width="120" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewHouseDetail(scope.row.id)">{{ scope.row.houseCode }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="fullRoomNo" label="完整房号" width="130" sortable />
        <el-table-column prop="roomNo" label="房间号" width="100" sortable />
        <el-table-column prop="floorLevel" label="楼层" width="80" sortable />
        <el-table-column prop="houseType" label="房屋类型" width="100" sortable />
        <el-table-column prop="houseLayout" label="户型" width="100" sortable />
        <el-table-column prop="houseOrientation" label="朝向" width="80" sortable />
        <el-table-column prop="buildingArea" label="建筑面积(㎡)" width="130" sortable />
        <el-table-column prop="usableArea" label="使用面积(㎡)" width="130" sortable />
        <el-table-column prop="sharedArea" label="公摊面积(㎡)" width="130" sortable />
        <el-table-column prop="houseStatus" label="房屋状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.houseStatus === '已售'" type="success">已售</el-tag>
            <el-tag v-else-if="scope.row.houseStatus === '已租'" type="warning">已租</el-tag>
            <el-tag v-else-if="scope.row.houseStatus === '装修中'" type="info">装修中</el-tag>
            <el-tag v-else type="info">{{ scope.row.houseStatus || '空置' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="decorationStatus" label="装修状态" width="100" sortable />
        <el-table-column prop="hasBalcony" label="有无阳台" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.hasBalcony ? 'success' : 'info'">{{ scope.row.hasBalcony ? '有' : '无' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="hasGarden" label="有无花园" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.hasGarden ? 'success' : 'info'">{{ scope.row.hasGarden ? '有' : '无' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="floorPlanImage" label="房屋户型图" width="150">
          <template #default="scope">
            <el-image
              v-if="scope.row.floorPlanImage"
              :src="scope.row.floorPlanImage"
              fit="cover"
              style="width: 100px; height: 100px; cursor: pointer;"
              preview-teleported
              :preview-src-list="[scope.row.floorPlanImage]"
            />
            <span v-else style="color: #ccc;">暂无图片</span>
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
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="社区ID" prop="communityId">
              <el-input-number v-model="formData.communityId" :min="1" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼栋ID" prop="buildingId">
              <el-input-number v-model="formData.buildingId" :min="1" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="房间号" prop="roomNo">
              <el-input v-model="formData.roomNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="完整房号" prop="fullRoomNo">
              <el-input v-model="formData.fullRoomNo" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="房屋编码" prop="houseCode">
          <el-input v-model="formData.houseCode" />
        </el-form-item>
        
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
        
        <el-form-item label="公摊面积(㎡)" prop="sharedArea">
          <el-input-number v-model="formData.sharedArea" :min="0" :precision="2" style="width: 100%" />
        </el-form-item>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="房屋类型" prop="houseType">
              <el-select v-model="formData.houseType" placeholder="请选择房屋类型" style="width: 100%">
                <el-option label="住宅" value="住宅" />
                <el-option label="商业" value="商业" />
                <el-option label="办公" value="办公" />
                <el-option label="其他" value="其他" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="户型" prop="houseLayout">
              <el-input v-model="formData.houseLayout" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="朝向" prop="houseOrientation">
              <el-input v-model="formData.houseOrientation" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋状态" prop="houseStatus">
              <el-select v-model="formData.houseStatus" placeholder="请选择房屋状态" style="width: 100%">
                <el-option label="已售" value="已售" />
                <el-option label="未售" value="未售" />
                <el-option label="已租" value="已租" />
                <el-option label="空置" value="空置" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="装修状态" prop="decorationStatus">
              <el-select v-model="formData.decorationStatus" placeholder="请选择装修状态" style="width: 100%">
                <el-option label="未装修" value="未装修" />
                <el-option label="装修中" value="装修中" />
                <el-option label="已完工" value="已完工" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼层" prop="floorLevel">
              <el-input-number v-model="formData.floorLevel" :min="1" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否有阳台" prop="hasBalcony">
              <el-select v-model="formData.hasBalcony" placeholder="请选择" style="width: 100%">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否有花园" prop="hasGarden">
              <el-select v-model="formData.hasGarden" placeholder="请选择" style="width: 100%">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="车位号" prop="parkingSpaceNo">
          <el-input v-model="formData.parkingSpaceNo" />
        </el-form-item>
        
        <el-form-item label="车位类型" prop="parkingType">
          <el-input v-model="formData.parkingType" />
        </el-form-item>
        
        <el-form-item label="房屋户型图" prop="floorPlanImage">
          <el-upload
            :before-upload="beforeFloorPlanImageUpload"
            :file-list="floorPlanImageFileList"
            list-type="picture-card"
            :limit="1"
            :on-change="handleFloorPlanImageChange"
            :on-remove="handleFloorPlanImageRemove"
            :auto-upload="false"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
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
import { houseApi } from '@/api/community'

export default {
  name: 'HouseList',
  components: {
    PaginationTable
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      houseCode: '',
      fullRoomNo: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      communityId: 1,
      buildingId: 1,
      roomNo: '',
      fullRoomNo: '',
      houseCode: '',
      buildingArea: 0,
      usableArea: 0,
      sharedArea: 0,
      houseType: '住宅',
      houseLayout: '',
      houseOrientation: '',
      parkingSpaceNo: '',
      parkingType: '',
      houseStatus: '未售',
      decorationStatus: '',
      floorLevel: '',
      hasBalcony: 0,
      hasGarden: 0,
      floorPlanImage: '', // 新增房屋户型图字段
      remark: ''
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增房屋' : '编辑房屋'
    })
    
    // 表单验证规则
    const formRules = {
      houseCode: [
        { required: true, message: '请输入房屋编码', trigger: 'blur' }
      ],
      fullRoomNo: [
        { required: true, message: '请输入完整房号', trigger: 'blur' }
      ],
      buildingId: [
        { required: true, message: '请输入楼栋ID', trigger: 'blur' }
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
        buildingId: 1,
        roomNo: '',
        fullRoomNo: '',
        houseCode: '',
        buildingArea: 0,
        usableArea: 0,
        sharedArea: 0,
        houseType: '住宅',
        houseLayout: '',
        houseOrientation: '',
        parkingSpaceNo: '',
        parkingType: '',
        houseStatus: '空置',
        decorationStatus: '',
        floorLevel: null,
        hasBalcony: 0,
        hasGarden: 0,
        floorPlanImage: '', // 新增房屋户型图字段
        remark: ''
      })
      // 重置户型图文件列表
      floorPlanImageFileList.value = []
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
      // 处理户型图文件列表，如果存在则填充
      if (row.floorPlanImage) {
        floorPlanImageFileList.value = [{
          name: 'floorPlanImage',
          url: row.floorPlanImage
        }]
      } else {
        floorPlanImageFileList.value = []
      }
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该房屋信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await houseApi.delete(row.id)
          ElMessage.success('删除成功')
          tableRef.value.fetchData()
        } catch (error) {
          console.error('删除失败:', error)
        }
      }).catch(() => {
        // 取消删除
      })
    }
    
    // 查看房屋详情
    const viewHouseDetail = (houseId) => {
      router.push(`/house-detail/${houseId}`)
    }
    
    // 查看房屋综合详情（包含房屋、楼栋和社区信息）
    const viewHouseComplexDetail = (houseId) => {
      router.push(`/house-complex-detail/${houseId}`)
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
          await houseApi.create(formData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await houseApi.update(formData)
          ElMessage.success('编辑成功')
        }
        
        dialogVisible.value = false
        // 重置分页到第一页并刷新表格数据
        tableRef.value.pagination.pageNum = 1
        tableRef.value.fetchData()
      } catch (error) {
        console.error('保存失败:', error)
        ElMessage.error('保存失败: ' + (error.message || '请检查输入'))
      }
    }

    // 房屋户型图上传相关
    const floorPlanImageFileList = ref([])

    const beforeFloorPlanImageUpload = (rawFile) => {
      const isJPGPNG = rawFile.type === 'image/jpeg' || rawFile.type === 'image/png'
      const isLt2M = rawFile.size / 1024 / 1024 < 2

      if (!isJPGPNG) {
        ElMessage.error('图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        ElMessage.error('图片大小不能超过 2MB!')
      }
      return isJPGPNG && isLt2M
    }

    const handleFloorPlanImageRemove = () => {
      formData.floorPlanImage = ''
      floorPlanImageFileList.value = []
    }

    const handleFloorPlanImageChange = (uploadFile, uploadFiles) => {
      // 保存File对象到formData，与其他字段一起提交
      if (uploadFile && uploadFile.raw) {
        formData.floorPlanImage = uploadFile.raw
        floorPlanImageFileList.value = uploadFiles
      }
    }
    
    return {
      houseApi,
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
      viewHouseDetail,
      viewHouseComplexDetail,
      handleDialogClose,
      handleSubmit,
      floorPlanImageFileList,
      beforeFloorPlanImageUpload,
      handleFloorPlanImageRemove,
      handleFloorPlanImageChange
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