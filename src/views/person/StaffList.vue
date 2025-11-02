<template>
  <div class="staff-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>员工信息管理</span>
          <el-button type="primary" @click="handleCreate">新增员工</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="staffApi.getPage"
        :search-api-function="staffApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="员工姓名">
              <el-input v-model="searchForm.name" placeholder="请输入员工姓名" />
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="searchForm.phone" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="工号">
              <el-input v-model="searchForm.workNo" placeholder="请输入工号" />
            </el-form-item>
            <el-form-item label="工作状态">
              <el-select v-model="searchForm.workStatus" placeholder="请选择工作状态" style="width: 120px;">
                <el-option label="全部" value="" />
                <el-option label="在职" value="在职" />
                <el-option label="离职" value="离职" />
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="员工ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewStaffDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="workNo" label="工号" width="100" sortable />
        <el-table-column prop="name" label="员工姓名" width="100" sortable />
        <el-table-column prop="gender" label="性别" width="60" sortable />
        <el-table-column prop="phone" label="手机号" width="120" sortable />
        <el-table-column prop="idCard" label="身份证号" width="150" sortable />
        <el-table-column prop="birthDate" label="出生日期" width="120" sortable />
        <el-table-column prop="email" label="邮箱" width="150" sortable />
        <el-table-column prop="wechat" label="微信账号" width="120" sortable />
        <el-table-column prop="departmentId" label="部门ID" width="80" sortable />
        <el-table-column prop="position" label="职位" width="120" sortable />
        <el-table-column prop="jobTitle" label="职称" width="120" sortable />
        <el-table-column prop="roleId" label="角色ID" width="80" sortable />
        <el-table-column prop="hireDate" label="入职日期" width="120" sortable />
        <el-table-column prop="graduationDate" label="毕业日期" width="120" sortable />
        <el-table-column prop="educationLevel" label="学历" width="80" sortable />
        <el-table-column prop="major" label="专业" width="100" sortable />
        <el-table-column prop="emergencyContact" label="紧急联系人" width="120" sortable />
        <el-table-column prop="emergencyPhone" label="紧急电话" width="120" sortable />
        <el-table-column prop="workStatus" label="工作状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.workStatus === '在职'" type="success">在职</el-tag>
            <el-tag v-else-if="scope.row.workStatus === '休假'" type="warning">休假</el-tag>
            <el-tag v-else-if="scope.row.workStatus === '离职'" type="info">离职</el-tag>
            <el-tag v-else type="warning">{{ scope.row.workStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="accountStatus" label="账户状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.accountStatus === '正常'" type="success">正常</el-tag>
            <el-tag v-else-if="scope.row.accountStatus === '禁用'" type="warning">禁用</el-tag>
            <el-tag v-else-if="scope.row.accountStatus === '锁定'" type="danger">锁定</el-tag>
            <el-tag v-else type="warning">{{ scope.row.accountStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isManager" label="可担任负责人" width="120" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.isManager ? 'success' : 'info'">{{ scope.row.isManager ? '是' : '否' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="身份证照片" width="150">
          <template #default="scope">
            <ImageGallery :image-data="scope.row.idCardPhotos" size="tiny" />
          </template>
        </el-table-column>
        <el-table-column label="证件照" width="150">
          <template #default="scope">
            <ImageGallery :image-data="scope.row.certificatePhotos" size="tiny" />
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
        <el-tabs v-model="activeTab">
          <el-tab-pane label="基本信息" name="basic">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="formData.username" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工号" prop="workNo">
                  <el-input v-model="formData.workNo" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="formData.name" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别" prop="gender">
                  <el-select v-model="formData.gender" placeholder="请选择性别" style="width: 100%">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                  </el-select>
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
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="formData.email" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="微信号" prop="wechat">
                  <el-input v-model="formData.wechat" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-form-item label="头像" prop="avatar">
              <el-input v-model="formData.avatar" />
            </el-form-item>
          </el-tab-pane>
          
          <el-tab-pane label="工作信息" name="work">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="部门ID" prop="departmentId">
                  <el-input-number v-model="formData.departmentId" :min="0" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="角色ID" prop="roleId">
                  <el-input-number v-model="formData.roleId" :min="0" style="width: 100%" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="职位" prop="position">
                  <el-input v-model="formData.position" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职称" prop="jobTitle">
                  <el-input v-model="formData.jobTitle" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="入职日期" prop="hireDate">
                  <el-date-picker
                    v-model="formData.hireDate"
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择入职日期"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作状态" prop="workStatus">
                  <el-select v-model="formData.workStatus" placeholder="请选择工作状态" style="width: 100%">
                    <el-option label="在职" value="在职" />
                    <el-option label="离职" value="离职" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-form-item label="是否管理员" prop="isManager">
              <el-select v-model="formData.isManager" placeholder="请选择" style="width: 100%">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-tab-pane>
          
          <el-tab-pane label="其他信息" name="other">
            <el-row :gutter="20">
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
              <el-col :span="12">
                <el-form-item label="籍贯" prop="nativePlace">
                  <el-input v-model="formData.nativePlace" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="毕业院校" prop="graduateSchool">
                  <el-input v-model="formData.graduateSchool" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="毕业日期" prop="graduationDate">
                  <el-date-picker
                    v-model="formData.graduationDate"
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择毕业日期"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="学历" prop="educationLevel">
                  <el-input v-model="formData.educationLevel" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专业" prop="major">
                  <el-input v-model="formData.major" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="紧急联系人" prop="emergencyContact">
                  <el-input v-model="formData.emergencyContact" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="紧急联系电话" prop="emergencyPhone">
                  <el-input v-model="formData.emergencyPhone" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-form-item label="座机区号" prop="telephoneAreaCode">
              <el-input v-model="formData.telephoneAreaCode" />
            </el-form-item>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="座机号码" prop="telephoneNumber">
                  <el-input v-model="formData.telephoneNumber" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分机号" prop="telephoneExtension">
                  <el-input v-model="formData.telephoneExtension" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-form-item label="账户状态" prop="accountStatus">
              <el-select v-model="formData.accountStatus" placeholder="请选择账户状态" style="width: 100%">
                <el-option label="正常" value="正常" />
                <el-option label="停用" value="停用" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" type="textarea" />
            </el-form-item>
            
            <el-form-item label="身份证照片">
              <ImageUpload v-model="formData.idCardPhotos" :max-count="2" />
            </el-form-item>
            
            <el-form-item label="证件照等">
              <ImageUpload v-model="formData.certificatePhotos" :max-count="1" />
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
import { staffApi } from '@/api/person'

export default {
  name: 'StaffList',
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
      workNo: '',
      workStatus: ''
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
      workNo: '',
      gender: '男',
      birthDate: '',
      avatar: '',
      email: '',
      wechat: '',
      telephoneAreaCode: '',
      telephoneNumber: '',
      telephoneExtension: '',
      emergencyContact: '',
      emergencyPhone: '',
      graduateSchool: '',
      graduationDate: '',
      educationLevel: '',
      major: '',
      departmentId: 0,
      roleId: 0,
      position: '',
      jobTitle: '',
      hireDate: '',
      workStatus: '在职',
      isManager: 0,
      nativePlace: '',
      accountStatus: '正常',
      onlineStatus: 0,
      lastLoginTime: '',
      lastLoginIp: '',
      loginCount: 0,
      idCardPhotos: [],
      certificatePhotos: null,
      remark: ''
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增员工' : '编辑员工'
    })
    
    // 表单验证规则
    const formRules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      name: [
        { required: true, message: '请输入员工姓名', trigger: 'blur' }
      ],
      phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' }
      ],
      workNo: [
        { required: true, message: '请输入工号', trigger: 'blur' }
      ]
    }
    
    // 查看员工详情
    const viewStaffDetail = (staffId) => {
      router.push(`/staff-detail/${staffId}`)
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
        workNo: '',
        gender: '男',
        birthDate: '',
        avatar: '',
        email: '',
        wechat: '',
        telephoneAreaCode: '',
        telephoneNumber: '',
        telephoneExtension: '',
        emergencyContact: '',
        emergencyPhone: '',
        graduateSchool: '',
        graduationDate: '',
        educationLevel: '',
        major: '',
        departmentId: 0,
        roleId: 0,
        position: '',
        jobTitle: '',
        hireDate: '',
        workStatus: '在职',
        isManager: 0,
        nativePlace: '',
        accountStatus: '正常',
        onlineStatus: 0,
        lastLoginTime: '',
        lastLoginIp: '',
        loginCount: 0,
        idCardPhotos: [],
        certificatePhotos: null,
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
        if (key === 'idCardPhotos') {
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
        } else if (key === 'certificatePhotos') {
          // 证件照 - 单张模式
          let photos = row[key];
          if (!photos) {
            formData[key] = null;
          } else if (typeof photos === 'string') {
            // 如果是JSON数组字符串，尝试解析
            try {
              const parsed = JSON.parse(photos);
              if (Array.isArray(parsed) && parsed.length > 0) {
                formData[key] = parsed[0];
              } else if (typeof parsed === 'string') {
                formData[key] = parsed;
              } else {
                formData[key] = null;
              }
            } catch (e) {
              // 否则作为单个URL处理
              formData[key] = photos;
            }
          } else if (Array.isArray(photos)) {
            // 如果是数组，取第一个
            formData[key] = photos.length > 0 ? photos[0] : null;
          } else {
            formData[key] = null;
          }
        } else {
          formData[key] = row[key] !== null && row[key] !== undefined ? row[key] : '';
        }
      })
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该员工信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await staffApi.delete(row.id)
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
        
        // 构建FormData来处理文件上传和表单数据
        const submitFormData = new FormData()
        
        // 添加所有文本字段（排除图片字段）
        Object.keys(formData).forEach(key => {
          if (key !== 'idCardPhotos' && key !== 'certificatePhotos' && formData[key] !== null && formData[key] !== undefined) {
            submitFormData.append(key, formData[key])
          }
        })
        
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
        
        // 处理证件照 - 单张模式
        if (formData.certificatePhotos) {
          if (formData.certificatePhotos.raw && formData.certificatePhotos.raw instanceof File) {
            // 新上传的文件
            submitFormData.append('certificatePhotos', formData.certificatePhotos.raw)
          } else if (formData.certificatePhotos instanceof File) {
            submitFormData.append('certificatePhotos', formData.certificatePhotos)
          } else if (typeof formData.certificatePhotos === 'string') {
            // 已有的URL
            submitFormData.append('certificatePhotos', formData.certificatePhotos)
          } else if (formData.certificatePhotos.url && typeof formData.certificatePhotos.url === 'string') {
            // 对象格式的URL
            submitFormData.append('certificatePhotos', formData.certificatePhotos.url)
          }
        }
        
        if (dialogType.value === 'create') {
          // 新增
          await staffApi.create(submitFormData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await staffApi.update(submitFormData)
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
      staffApi,
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
      handleDialogClose,
      handleSubmit,
      viewStaffDetail
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