<template>
  <div class="access-device-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>门禁设备管理</span>
          <el-button type="primary" @click="handleCreate" style="float: right;">新增设备</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="accessDeviceApi.getPage"
        :search-api-function="accessDeviceApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="设备名称">
              <el-input v-model="searchForm.deviceName" placeholder="请输入设备名称" />
            </el-form-item>
            <el-form-item label="设备类型">
              <el-input v-model="searchForm.deviceType" placeholder="请输入设备类型" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
                <el-option label="启用" value="启用" />
                <el-option label="停用" value="停用" />
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="设备ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewAccessDeviceDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="communityId" label="社区ID" width="80" sortable />
        <el-table-column prop="buildingId" label="楼栋ID" width="80" sortable />
        <el-table-column prop="deviceName" label="设备名称" width="150" sortable />
        <el-table-column prop="deviceType" label="设备类型" width="120" sortable />
        <el-table-column prop="deviceCode" label="设备编码" width="130" sortable />
        <el-table-column prop="deviceSn" label="序列号" width="130" sortable />
        <el-table-column prop="installLocation" label="安装位置" width="150" sortable />
        <el-table-column prop="installDate" label="安装日期" width="120" sortable />
        <el-table-column prop="supportFace" label="人脸识别" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.supportFace ? 'success' : 'info'">{{ scope.row.supportFace ? '支持' : '不支持' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="supportFingerprint" label="指纹识别" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.supportFingerprint ? 'success' : 'info'">{{ scope.row.supportFingerprint ? '支持' : '不支持' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="supportCard" label="刷卡" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.supportCard ? 'success' : 'info'">{{ scope.row.supportCard ? '支持' : '不支持' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="supportQrcode" label="二维码" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.supportQrcode ? 'success' : 'info'">{{ scope.row.supportQrcode ? '支持' : '不支持' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="arrearsbanEnabled" label="欠费禁入" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.arrearsbanEnabled ? 'success' : 'info'">{{ scope.row.arrearsbanEnabled ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="visitorApprovalEnabled" label="访客审核" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.visitorApprovalEnabled ? 'success' : 'info'">{{ scope.row.visitorApprovalEnabled ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="openDuration" label="开门时长(秒)" width="130" sortable />
        <el-table-column prop="deviceStatus" label="设备状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.deviceStatus === '启用'" type="success">启用</el-tag>
            <el-tag v-else-if="scope.row.deviceStatus === '禁用'" type="info">禁用</el-tag>
            <el-tag v-else-if="scope.row.deviceStatus === '故障'" type="danger">故障</el-tag>
            <el-tag v-else type="warning">{{ scope.row.deviceStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="onlineStatus" label="在线状态" width="100" sortable>
          <template #default="scope">
            <el-tag :type="scope.row.onlineStatus ? 'success' : 'danger'">{{ scope.row.onlineStatus ? '在线' : '离线' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastHeartbeat" label="最后心跳" width="180" sortable />
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
            <el-form-item label="设备名称" prop="deviceName">
              <el-input v-model="formData.deviceName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型" prop="deviceType">
              <el-select v-model="formData.deviceType" placeholder="请选择设备类型" style="width: 100%">
                <el-option label="人脸识别" value="人脸识别" />
                <el-option label="指纹识别" value="指纹识别" />
                <el-option label="刷卡" value="刷卡" />
                <el-option label="二维码" value="二维码" />
                <el-option label="混合型" value="混合型" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备编码" prop="deviceCode">
              <el-input v-model="formData.deviceCode" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备序列号" prop="deviceSn">
              <el-input v-model="formData.deviceSn" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="安装位置" prop="installLocation">
          <el-input v-model="formData.installLocation" />
        </el-form-item>
        
        <el-form-item label="安装日期" prop="installDate">
          <el-date-picker 
            v-model="formData.installDate" 
            type="date" 
            placeholder="请选择安装日期" 
            style="width: 100%"
            value-format="YYYY-MM-DD" />
        </el-form-item>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备状态" prop="deviceStatus">
              <el-select v-model="formData.deviceStatus" placeholder="请选择设备状态" style="width: 100%">
                <el-option label="启用" value="启用" />
                <el-option label="停用" value="停用" />
              </el-select>
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
            <el-form-item label="支持人脸" prop="supportFace">
              <el-select v-model="formData.supportFace" placeholder="请选择" style="width: 100%">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支持指纹" prop="supportFingerprint">
              <el-select v-model="formData.supportFingerprint" placeholder="请选择" style="width: 100%">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="支持刷卡" prop="supportCard">
              <el-select v-model="formData.supportCard" placeholder="请选择" style="width: 100%">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支持二维码" prop="supportQrcode">
              <el-select v-model="formData.supportQrcode" placeholder="请选择" style="width: 100%">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="欠费禁用" prop="arrearsBanEnabled">
              <el-select v-model="formData.arrearsBanEnabled" placeholder="请选择" style="width: 100%">
                <el-option label="启用" :value="1" />
                <el-option label="禁用" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="访客审批" prop="visitorApprovalEnabled">
              <el-select v-model="formData.visitorApprovalEnabled" placeholder="请选择" style="width: 100%">
                <el-option label="启用" :value="1" />
                <el-option label="禁用" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="开门时长(秒)" prop="openDuration">
          <el-input-number v-model="formData.openDuration" :min="1" :max="60" style="width: 100%" />
        </el-form-item>
        
        <el-form-item label="最后心跳时间" prop="lastHeartbeat">
          <el-date-picker 
            v-model="formData.lastHeartbeat" 
            type="datetime" 
            placeholder="请选择最后心跳时间" 
            style="width: 100%"
            value-format="YYYY-MM-DD HH:mm:ss" />
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
import { accessDeviceApi } from '@/api/access'

export default {
  name: 'AccessDeviceList',
  components: {
    PaginationTable
  },
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const formRef = ref()
    
    // 搜索表单
    const searchForm = reactive({
      deviceName: '',
      deviceCode: ''
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
      deviceName: '',
      deviceType: '人脸识别',
      deviceCode: '',
      deviceSn: '',
      installLocation: '',
      installDate: '',
      deviceStatus: '启用',
      onlineStatus: 0,
      supportFace: 0,
      supportFingerprint: 0,
      supportCard: 0,
      supportQrcode: 0,
      arrearsBanEnabled: 0,
      visitorApprovalEnabled: 0,
      openDuration: 10,
      lastHeartbeat: '',
      remark: ''
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增设备' : '编辑设备'
    })
    
    // 表单验证规则
    const formRules = {
      deviceName: [
        { required: true, message: '请输入设备名称', trigger: 'blur' }
      ],
      deviceCode: [
        { required: true, message: '请输入设备编码', trigger: 'blur' }
      ],
      communityId: [
        { required: true, message: '请输入社区ID', trigger: 'blur' }
      ],
      buildingId: [
        { required: true, message: '请输入楼栋ID', trigger: 'blur' }
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
        deviceName: '',
        deviceType: '人脸识别',
        deviceCode: '',
        deviceSn: '',
        installLocation: '',
        installDate: '',
        deviceStatus: '启用',
        onlineStatus: 0,
        supportFace: 0,
        supportFingerprint: 0,
        supportCard: 0,
        supportQrcode: 0,
        arrearsBanEnabled: 0,
        visitorApprovalEnabled: 0,
        openDuration: 10,
        lastHeartbeat: '',
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
      ElMessageBox.confirm('确认删除该门禁设备吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await accessDeviceApi.delete(row.id)
          ElMessage.success('删除成功')
          tableRef.value.fetchData()
        } catch (error) {
          console.error('删除失败:', error)
        }
      }).catch(() => {
        // 取消删除
      })
    }
    
    // 查看门禁设备详情
    const viewAccessDeviceDetail = (deviceId) => {
      router.push(`/access-device-detail/${deviceId}`)
    }
    
    // 处理提交
    const handleSubmit = async () => {
      try {
        await formRef.value.validate()
        
        if (dialogType.value === 'create') {
          // 新增
          await accessDeviceApi.create(formData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await accessDeviceApi.update(formData)
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
      accessDeviceApi,
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
      handleSubmit,
      viewAccessDeviceDetail
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