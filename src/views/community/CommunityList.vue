<template>
  <div class="community-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>社区信息管理</span>
          <el-button type="primary" @click="handleCreate">新增社区</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="communityApi.getPage"
        :search-api-function="communityApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="社区名称">
              <el-input v-model="searchForm.communityName" placeholder="请输入社区名称" />
            </el-form-item>
            <el-form-item label="社区编码">
              <el-input v-model="searchForm.communityCode" placeholder="请输入社区编码" />
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
        
        <el-table-column prop="id" label="社区ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewCommunityDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="communityName" label="社区名称" width="150" sortable />
        <el-table-column prop="communityCode" label="社区编码" width="120" sortable />
        <el-table-column prop="detailAddress" label="详细地址" width="200" sortable />
        <el-table-column prop="totalBuildings" label="楼栋数" width="90" sortable />
        <el-table-column prop="totalHouseholds" label="住户数" width="90" sortable />
        <el-table-column prop="totalArea" label="占地面积(㎡)" width="120" sortable />
        <el-table-column prop="buildingArea" label="建筑面积(㎡)" width="130" sortable />
        <el-table-column prop="parkingArea" label="车位面积(㎡)" width="130" sortable />
        <el-table-column prop="greenArea" label="绿化面积(㎡)" width="130" sortable />
        <el-table-column prop="publicArea" label="公共面积(㎡)" width="130" sortable />
        <el-table-column prop="managerName" label="负责人" width="100" sortable />
        <el-table-column prop="managerPhone" label="负责人电话" width="130" sortable />
        <el-table-column prop="propertyCompany" label="物业公司" width="150" sortable />
        <el-table-column prop="contactPhone" label="物业电话" width="130" sortable />
        <el-table-column prop="builtYear" label="建成年份" width="100" sortable />
        <el-table-column prop="occupancyRate" label="入住率(%)" width="110" sortable />
        <el-table-column prop="status" label="状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.status === '正常'" type="success">正常</el-tag>
            <el-tag v-else-if="scope.row.status === '停用'" type="info">停用</el-tag>
            <el-tag v-else type="warning">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" sortable />
        <el-table-column label="社区图片" width="150">
          <template #default="scope">
            <ImageGallery :image-data="scope.row.communityImages" size="tiny" />
          </template>
        </el-table-column>
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
        <el-form-item label="社区名称" prop="communityName">
          <el-input v-model="formData.communityName" />
        </el-form-item>
        <el-form-item label="社区编码" prop="communityCode">
          <el-input v-model="formData.communityCode" />
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="formData.province" />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="formData.city" />
        </el-form-item>
        <el-form-item label="区域" prop="district">
          <el-input v-model="formData.district" />
        </el-form-item>
        <el-form-item label="详细地址" prop="detailAddress">
          <el-input v-model="formData.detailAddress" />
        </el-form-item>
        <el-form-item label="物业公司" prop="propertyCompany">
          <el-input v-model="formData.propertyCompany" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="formData.contactPhone" />
        </el-form-item>
        <el-form-item label="负责人名称" prop="managerName">
          <el-input v-model="formData.managerName" placeholder="请输入负责人名称" />
        </el-form-item>
        <el-form-item label="负责人电话" prop="managerPhone">
          <el-input v-model="formData.managerPhone" placeholder="请输入负责人电话" />
        </el-form-item>
        <el-form-item label="楼栋总数" prop="totalBuildings">
          <el-input-number v-model="formData.totalBuildings" :min="0" />
        </el-form-item>
        <el-form-item label="住户总数" prop="totalHouseholds">
          <el-input-number v-model="formData.totalHouseholds" :min="0" />
        </el-form-item>
        <el-form-item label="总面积(㎡)" prop="totalArea">
          <el-input-number v-model="formData.totalArea" :min="0" />
        </el-form-item>
        <el-form-item label="建筑面积(㎡)" prop="buildingArea">
          <el-input-number v-model="formData.buildingArea" :min="0" />
        </el-form-item>
        <el-form-item label="停车场面积(㎡)" prop="parkingArea">
          <el-input-number v-model="formData.parkingArea" :min="0" />
        </el-form-item>
        <el-form-item label="绿化面积(㎡)" prop="greenArea">
          <el-input-number v-model="formData.greenArea" :min="0" />
        </el-form-item>
        <el-form-item label="公共设施面积(㎡)" prop="publicArea">
          <el-input-number v-model="formData.publicArea" :min="0" />
        </el-form-item>
        <el-form-item label="建成年份" prop="builtYear">
          <el-input-number v-model="formData.builtYear" :min="1900" :max="2100" />
        </el-form-item>
        <el-form-item label="入住率(%)" prop="occupancyRate">
          <el-input-number v-model="formData.occupancyRate" :min="0" :max="100" :step="0.1" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择状态">
            <el-option label="正常" value="正常" />
            <el-option label="停用" value="停用" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="社区图片">
          <ImageUpload 
            v-model="formData.communityImages" 
            :auto-upload="false"
            :show-file-list="true"
            :max-count="1"
            :upload-headers="uploadHeaders"
          />
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
import ImageUpload from '@/components/ImageUpload.vue'
import { communityApi } from '@/api/community'

export default {
  name: 'CommunityList',
  components: {
    PaginationTable,
    ImageGallery,
    ImageUpload
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      communityName: '',
      detailAddress: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const communityUploadUrl = '/api/community/upload' // 默认上传地址，实际会在提交时处理
    const uploadHeaders = {
      'Authorization': localStorage.getItem('token') || ''
    }
    
    const formData = reactive({
      id: undefined,
      communityName: '',
      communityCode: '',
      province: '',
      city: '',
      district: '',
      detailAddress: '',
      propertyCompany: '',
      contactPhone: '',
      managerName: '', // 新增负责人名称
      managerPhone: '', // 新增负责人电话
      totalBuildings: 0,
      totalHouseholds: 0,
      totalArea: 0,
      buildingArea: 0,
      parkingArea: 0,
      greenArea: 0,
      publicArea: 0,
      builtYear: new Date().getFullYear(),
      occupancyRate: 0,
      communityImages: null,
      status: '正常'
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增社区' : '编辑社区'
    })
    
    // 表单验证规则
    const formRules = {
      communityName: [
        { required: true, message: '请输入社区名称', trigger: 'blur' }
      ],
      communityCode: [
        { required: true, message: '请输入社区编码', trigger: 'blur' }
      ],
      detailAddress: [
        { required: true, message: '请输入详细地址', trigger: 'blur' }
      ],
      propertyCompany: [
        { required: true, message: '请输入物业公司', trigger: 'blur' }
      ],
      contactPhone: [
        { required: true, message: '请输入联系电话', trigger: 'blur' }
      ]
    }
    
    // 查看社区详情
    const viewCommunityDetail = (communityId) => {
      router.push(`/community-detail/${communityId}`)
    }
    
    // 处理新增
    const handleCreate = () => {
      dialogType.value = 'create'
      dialogVisible.value = true
      // 重置表单数据
      Object.keys(formData).forEach(key => {
        if (typeof formData[key] === 'number') {
          formData[key] = 0;
        } else if (key === 'status') {
          formData[key] = '正常';
        } else if (key === 'builtYear') {
          formData[key] = new Date().getFullYear();
        } else if (key === 'communityImages') {
          formData[key] = null;
        } else if (key === 'managerName' || key === 'managerPhone') {
          formData[key] = '';
        } else {
          formData[key] = '';
        }
      })
    }
    
    // 处理编辑
    const handleEdit = (row) => {
      dialogType.value = 'edit'
      dialogVisible.value = true
      // 填充表单数据
      Object.keys(formData).forEach(key => {
        if (key === 'communityImages') {
          // 处理图片字段 - 单张图片模式
          let images = row[key];
          if (!images) {
            formData[key] = null;
          } else if (typeof images === 'string') {
            // 如果是JSON字符串，尝试解析
            try {
              const parsed = JSON.parse(images);
              if (Array.isArray(parsed) && parsed.length > 0) {
                formData[key] = parsed[0];
              } else if (typeof parsed === 'string') {
                formData[key] = parsed;
              } else {
                formData[key] = null;
              }
            } catch (e) {
              // 如果解析失败，当作单个URL处理
              formData[key] = images;
            }
          } else if (Array.isArray(images)) {
            // 如果已是数组，取第一个
            formData[key] = images.length > 0 ? images[0] : null;
          } else {
            formData[key] = null;
          }
        } else {
          formData[key] = row[key] !== null ? row[key] : (typeof formData[key] === 'number' ? 0 : '');
        }
      })
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该社区信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await communityApi.delete(row.id)
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
    
    // 处理图片变化
    const handleImageChange = (file, fileList) => {
      // 确保 formData.communityImages 与 fileList 同步
      formData.communityImages = fileList;
    }
    
    // 处理提交
    const handleSubmit = async () => {
      try {
        await formRef.value.validate()
        
        // 处理表单数据，确保数字字段正确
        const submitData = { ...formData };
        
        // 确保数字字段是数字类型
        const numberFields = [
          'totalBuildings', 'totalHouseholds', 'totalArea', 'buildingArea',
          'parkingArea', 'greenArea', 'publicArea', 'builtYear', 'occupancyRate'
        ];
        
        numberFields.forEach(field => {
          if (submitData[field] !== null && submitData[field] !== undefined && submitData[field] !== '') {
            submitData[field] = Number(submitData[field]);
          } else {
            submitData[field] = null;
          }
        });
        
        // 特别处理图片数据 - 单张图片模式
        if (submitData.communityImages) {
          // 如果是对象且有raw属性（新上传的文件）
          if (typeof submitData.communityImages === 'object' && submitData.communityImages.raw) {
            // 保持不变，API会正确处理
          }
          // 如果是对象且有url属性（已存在的图片）
          else if (typeof submitData.communityImages === 'object' && submitData.communityImages.url) {
            // 提取URL
            submitData.communityImages = submitData.communityImages.url;
          }
          // 如果是字符串且非空
          else if (typeof submitData.communityImages === 'string' && submitData.communityImages.trim()) {
            // 保持不变
          }
          // 其他情况设为null
          else {
            submitData.communityImages = null;
          }
        }
        
        console.log('提交的数据:', submitData); // 调试信息
        console.log('图片数据:', submitData.communityImages); // 调试信息
        
        if (dialogType.value === 'create') {
          // 新增
          await communityApi.create(submitData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await communityApi.update(submitData)
          ElMessage.success('编辑成功')
        }
        
        dialogVisible.value = false
        // 重置分页到第一页并刷新表格数据
        tableRef.value.pagination.pageNum = 1
        tableRef.value.fetchData()
      } catch (error) {
        ElMessage.error('保存失败: ' + (error.message || '未知错误'))
        console.error('保存失败:', error)
      }
    }
    
    return {
      communityApi,
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
      viewCommunityDetail
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