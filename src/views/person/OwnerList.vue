<template>
  <div class="owner-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>业主信息管理</span>
          <el-button type="primary" @click="handleCreate">新增业主</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="ownerApi.getPage"
        :search-api-function="ownerApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="姓名">
              <el-input v-model="searchForm.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="searchForm.phone" placeholder="请输入手机号" />
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
        
        <el-table-column prop="id" label="业主ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewOwnerAllDetails(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="120" sortable />
        <el-table-column prop="name" label="姓名" width="100" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewOwnerDetail(scope.row.id)">{{ scope.row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120" sortable />
        <el-table-column prop="idCard" label="身份证号" width="150" sortable />
        <el-table-column prop="gender" label="性别" width="60" sortable />
        <el-table-column prop="birthDate" label="出生日期" width="120" sortable />
        <el-table-column prop="ownerType" label="业主类型" width="100" sortable />
        <el-table-column prop="politicalStatus" label="政治面貌" width="100" sortable />
        <el-table-column prop="maritalStatus" label="婚姻状况" width="100" sortable />
        <el-table-column prop="nationality" label="民族" width="80" sortable />
        <el-table-column prop="householdType" label="户口类型" width="100" sortable />
        <el-table-column prop="censusRegister" label="户籍所在地" width="150" sortable />
        <el-table-column prop="currentAddress" label="现住地址" width="180" sortable />
        <el-table-column prop="emergencyContactName" label="紧急联系人" width="120" sortable />
        <el-table-column prop="emergencyContactRelation" label="关系" width="80" sortable />
        <el-table-column prop="emergencyContactPhone" label="紧急电话" width="120" sortable />
        <el-table-column prop="residenceType" label="居住类型" width="100" sortable />
        <el-table-column prop="moveInDate" label="入住日期" width="120" sortable />
        <el-table-column prop="moveOutDate" label="迁出日期" width="120" sortable />
        <el-table-column prop="status" label="状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.status === '正常'" type="success">正常</el-tag>
            <el-tag v-else-if="scope.row.status === '冻结'" type="warning">冻结</el-tag>
            <el-tag v-else-if="scope.row.status === '迁出'" type="info">迁出</el-tag>
            <el-tag v-else type="warning">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="verifyStatus" label="认证状态" width="100" sortable />
        <el-table-column label="门禁照片" width="150">
          <template #default="scope">
            <ImageGallery :image-data="scope.row.accessControlPhotos" size="tiny" />
          </template>
        </el-table-column>
        <el-table-column label="身份证照片" width="150">
          <template #default="scope">
            <ImageGallery :image-data="scope.row.idCardPhotos" size="tiny" />
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
        label-width="130px"
      >
        <el-tabs v-model="activeTab">
          <el-tab-pane label="基本信息" name="basic">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="formData.username" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="formData.name" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="formData.phone" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号" prop="idCard">
                  <el-input v-model="formData.idCard" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="性别" prop="gender">
                  <el-select v-model="formData.gender" placeholder="请选择性别" style="width: 100%">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出生日期" prop="birthDate">
                  <el-date-picker
                    v-model="formData.birthDate"
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择出生日期"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="业主类型" prop="ownerType">
                  <el-select v-model="formData.ownerType" placeholder="请选择业主类型" style="width: 100%">
                    <el-option label="业主" value="业主" />
                    <el-option label="租户" value="租户" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="民族" prop="nationality">
                  <el-input v-model="formData.nationality" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="政治面貌" prop="politicalStatus">
                  <el-input v-model="formData.politicalStatus" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="婚姻状况" prop="maritalStatus">
                  <el-input v-model="formData.maritalStatus" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-form-item label="户籍类型" prop="householdType">
              <el-input v-model="formData.householdType" />
            </el-form-item>
            
            <el-form-item label="户籍地址" prop="censusRegister">
              <el-input v-model="formData.censusRegister" />
            </el-form-item>
          </el-tab-pane>
          
          <el-tab-pane label="居住信息" name="residence">
            <el-form-item label="现住址" prop="currentAddress">
              <el-input v-model="formData.currentAddress" type="textarea" />
            </el-form-item>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="居住类型" prop="residenceType">
                  <el-input v-model="formData.residenceType" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="暂住证号" prop="temporaryResidentNo">
                  <el-input v-model="formData.temporaryResidentNo" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="入住日期" prop="moveInDate">
                  <el-date-picker
                    v-model="formData.moveInDate"
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择入住日期"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="迁出日期" prop="moveOutDate">
                  <el-date-picker
                    v-model="formData.moveOutDate"
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择迁出日期"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          
          <el-tab-pane label="联系信息" name="contact">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="紧急联系人" prop="emergencyContactName">
                  <el-input v-model="formData.emergencyContactName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="与本人关系" prop="emergencyContactRelation">
                  <el-input v-model="formData.emergencyContactRelation" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-form-item label="紧急联系电话" prop="emergencyContactPhone">
              <el-input v-model="formData.emergencyContactPhone" />
            </el-form-item>
          </el-tab-pane>
          
          <el-tab-pane label="状态信息" name="status">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="状态" prop="status">
                  <el-select v-model="formData.status" placeholder="请选择状态" style="width: 100%">
                    <el-option label="正常" value="正常" />
                    <el-option label="冻结" value="冻结" />
                    <el-option label="迁出" value="迁出" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="认证状态" prop="verifyStatus">
                  <el-select v-model="formData.verifyStatus" placeholder="请选择认证状态" style="width: 100%">
                    <el-option label="已认证" value="已认证" />
                    <el-option label="未认证" value="未认证" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" type="textarea" />
            </el-form-item>
            
            <el-form-item label="门禁照片">
              <ImageUpload v-model="formData.accessControlPhotos" :max-count="5" />
            </el-form-item>
            
            <el-form-item label="身份证照片">
              <ImageUpload v-model="formData.idCardPhotos" :max-count="2" />
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
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
import { ownerApi } from '@/api/person'

export default {
  name: 'OwnerList',
  components: {
    PaginationTable,
    ImageGallery,
    ImageUpload
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const formRef = ref()
    const activeTab = ref('basic')
    
    // 搜索表单
    const searchForm = reactive({
      name: '',
      phone: '',
      ownerType: '',
      status: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      username: '',
      password: '',
      name: '',
      phone: '',
      idCard: '',
      gender: '男',
      birthDate: '',
      ownerType: '业主',
      politicalStatus: '',
      maritalStatus: '',
      nationality: '汉族',
      householdType: '',
      censusRegister: '',
      temporaryResidentNo: '',
      currentAddress: '',
      emergencyContactName: '',
      emergencyContactRelation: '',
      emergencyContactPhone: '',
      residenceType: '',
      moveInDate: '',
      moveOutDate: '',
      accessControlPhotos: [],
      idCardPhotos: [],
      status: '正常',
      verifyStatus: '未认证',
      remark: ''
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增业主' : '编辑业主'
    })
    
    // 表单验证规则
    const formRules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      name: [
        { required: true, message: '请输入业主姓名', trigger: 'blur' }
      ],
      phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' }
      ]
    }
    
    // 处理新增
    const handleCreate = () => {
      dialogType.value = 'create'
      dialogVisible.value = true
      activeTab.value = 'basic'
      // 重置表单数据
      Object.assign(formData, {
        id: undefined,
        username: '',
        password: '',
        name: '',
        phone: '',
        idCard: '',
        gender: '男',
        birthDate: '',
        ownerType: '业主',
        politicalStatus: '',
        maritalStatus: '',
        nationality: '汉族',
        householdType: '',
        censusRegister: '',
        temporaryResidentNo: '',
        currentAddress: '',
        emergencyContactName: '',
        emergencyContactRelation: '',
        emergencyContactPhone: '',
        residenceType: '',
        moveInDate: '',
        moveOutDate: '',
        accessControlPhotos: [],
        idCardPhotos: [],
        status: '正常',
        verifyStatus: '未认证',
        remark: ''
      })
    }
    
    // 处理编辑
    const handleEdit = (row) => {
      dialogType.value = 'edit'
      dialogVisible.value = true
      activeTab.value = 'basic'
      // 填充表单数据
      Object.keys(formData).forEach(key => {
        if (key === 'accessControlPhotos') {
          // 门禁照片 - 多张模式（最多5张）
          let photos = row[key];
          if (!photos) {
            formData[key] = [];
          } else if (typeof photos === 'string') {
            // 如果是JSON数组字符串，尝试解析
            try {
              const parsed = JSON.parse(photos);
              formData[key] = Array.isArray(parsed) ? parsed : [];
            } catch (e) {
              // 否则作为单个URL处理
              formData[key] = [photos];
            }
          } else if (Array.isArray(photos)) {
            // 如果已经是数组，保留原值
            formData[key] = photos;
          } else {
            formData[key] = [];
          }
        } else if (key === 'idCardPhotos') {
          // 身份证照片 - 多张模式（最多2张）
          let photos = row[key];
          if (!photos) {
            formData[key] = [];
          } else if (typeof photos === 'string') {
            // 如果是JSON数组字符串，尝试解析
            try {
              const parsed = JSON.parse(photos);
              formData[key] = Array.isArray(parsed) ? parsed : [];
            } catch (e) {
              // 否则作为单个URL处理
              formData[key] = [photos];
            }
          } else if (Array.isArray(photos)) {
            // 如果已经是数组，保留原值
            formData[key] = photos;
          } else {
            formData[key] = [];
          }
        } else {
          formData[key] = row[key] !== null && row[key] !== undefined ? row[key] : '';
        }
      })
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该业主信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await ownerApi.delete(row.id)
          ElMessage.success('删除成功')
          tableRef.value.fetchData()
        } catch (error) {
          console.error('删除失败:', error)
        }
      }).catch(() => {
        // 取消删除
      })
    }
    
    // 查看业主详情（使用综合详情接口）
    const viewOwnerDetail = (ownerId) => {
      router.push(`/owner-all-details/${ownerId}`)
    }
    
    // 查看业主综合详情（别名）
    const viewOwnerAllDetails = (ownerId) => {
      router.push(`/owner-all-details/${ownerId}`)
    }
    
    // 处理对话框关闭
    const handleDialogClose = () => {
      formRef.value.resetFields()
    }
    
    // 处理提交
    const handleSubmit = async () => {
      try {
        await formRef.value.validate()
        
        // 构建FormData来处理文件上传和表单数据
        const submitFormData = new FormData()
        
        // 添加所有文本字段（排除图片字段）
        Object.keys(formData).forEach(key => {
          if (key !== 'accessControlPhotos' && key !== 'idCardPhotos' && formData[key] !== null && formData[key] !== undefined) {
            submitFormData.append(key, formData[key])
          }
        })
        
        // 处理门禁照片 - 多张模式，需要保留已有的URL
        if (formData.accessControlPhotos && Array.isArray(formData.accessControlPhotos)) {
          const existingUrls = [];
          formData.accessControlPhotos.forEach((photo) => {
            if (photo) {
              // 新上传的文件
              if (photo.raw && photo.raw instanceof File) {
                submitFormData.append('accessControlPhotos', photo.raw)
              } else if (photo instanceof File) {
                submitFormData.append('accessControlPhotos', photo)
              }
              // 已有的URL
              else if (typeof photo === 'string') {
                existingUrls.push(photo)
              } else if (photo.url && typeof photo.url === 'string') {
                existingUrls.push(photo.url)
              }
            }
          })
          // 如果有已存在的URL，作为JSON字符串提交
          if (existingUrls.length > 0) {
            submitFormData.append('accessControlPhotos', JSON.stringify(existingUrls))
          }
        }
        
        // 处理身份证照片 - 多张模式，需要保留已有的URL
        if (formData.idCardPhotos && Array.isArray(formData.idCardPhotos)) {
          const existingUrls = [];
          formData.idCardPhotos.forEach((photo) => {
            if (photo) {
              // 新上传的文件
              if (photo.raw && photo.raw instanceof File) {
                submitFormData.append('idCardPhotos', photo.raw)
              } else if (photo instanceof File) {
                submitFormData.append('idCardPhotos', photo)
              }
              // 已有的URL
              else if (typeof photo === 'string') {
                existingUrls.push(photo)
              } else if (photo.url && typeof photo.url === 'string') {
                existingUrls.push(photo.url)
              }
            }
          })
          // 如果有已存在的URL，作为JSON字符串提交
          if (existingUrls.length > 0) {
            submitFormData.append('idCardPhotos', JSON.stringify(existingUrls))
          }
        }
        
        if (dialogType.value === 'create') {
          // 新增
          await ownerApi.create(submitFormData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await ownerApi.update(submitFormData)
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
    
    return {
      ownerApi,
      tableRef,
      formRef,
      activeTab,
      searchForm,
      dialogVisible,
      dialogTitle,
      formData,
      formRules,
      handleCreate,
      handleEdit,
      handleDelete,
      viewOwnerDetail,
      viewOwnerAllDetails,
      handleDialogClose,
      handleSubmit
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