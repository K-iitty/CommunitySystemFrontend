<template>
  <div class="owner-issue-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>业主问题管理</span>
          <el-button type="primary" @click="handleCreate">新增问题</el-button>
        </div>
      </template>
      
      <pagination-table
        :api-function="ownerIssueApi.getPage"
        :search-api-function="ownerIssueApi.search"
        @edit="handleEdit"
        @delete="handleDelete"
        ref="tableRef"
      >
        <template #filter>
          <el-form :model="searchForm" inline>
            <el-form-item label="问题标题">
              <el-input v-model="searchForm.issueTitle" placeholder="请输入问题标题" />
            </el-form-item>
            <el-form-item label="问题类型">
              <el-input v-model="searchForm.issueType" placeholder="请输入问题类型" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="searchForm.issueStatus" placeholder="请选择状态" style="width: 100px;">
                <el-option label="全部" value="" />
                <el-option label="待处理" value="待处理" />
                <el-option label="处理中" value="处理中" />
                <el-option label="已完成" value="已完成" />
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        
        <el-table-column prop="id" label="问题ID" width="80" sortable>
          <template #default="scope">
            <el-link type="primary" @click="viewIssueDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="communityId" label="社区ID" width="80" sortable />
        <el-table-column prop="ownerId" label="业主ID" width="80" sortable />
        <el-table-column prop="houseId" label="房屋ID" width="80" sortable />
        <el-table-column prop="issueTitle" label="问题标题" width="150" sortable />
        <el-table-column prop="issueType" label="问题类型" width="120" sortable />
        <el-table-column prop="subType" label="问题子类型" width="120" sortable />
        <el-table-column prop="locationType" label="位置类型" width="100" sortable />
        <el-table-column prop="specificLocation" label="具体位置" width="150" sortable />
        <el-table-column prop="contactName" label="联系人" width="100" sortable />
        <el-table-column prop="contactPhone" label="联系电话" width="120" sortable />
        <el-table-column prop="bestContactTime" label="最佳联系时间" width="140" sortable />
        <el-table-column prop="urgencyLevel" label="紧急程度" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.urgencyLevel === '紧急'" type="danger">紧急</el-tag>
            <el-tag v-else-if="scope.row.urgencyLevel === '高'" type="warning">高</el-tag>
            <el-tag v-else-if="scope.row.urgencyLevel === '一般'" type="info">一般</el-tag>
            <el-tag v-else type="info">低</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="assignedStaffId" label="指派人员ID" width="110" sortable />
        <el-table-column prop="assignedStaffName" label="指派人员" width="100" sortable />
        <el-table-column prop="processorStaffName" label="处理人员" width="100" sortable />
        <el-table-column prop="issueStatus" label="问题状态" width="100" sortable>
          <template #default="scope">
            <el-tag v-if="scope.row.issueStatus === '待处理'" type="info">待处理</el-tag>
            <el-tag v-else-if="scope.row.issueStatus === '处理中'" type="warning">处理中</el-tag>
            <el-tag v-else-if="scope.row.issueStatus === '已完成'" type="success">已完成</el-tag>
            <el-tag v-else type="danger">{{ scope.row.issueStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="workStatus" label="工单状态" width="100" sortable />
        <el-table-column prop="satisfactionLevel" label="满意度" width="100" sortable />
        <el-table-column prop="reportedTime" label="上报时间" width="180" sortable />
        <el-table-column prop="expectedResolveTime" label="期望解决时间" width="180" sortable />
        <el-table-column prop="actualCompleteTime" label="实际完成时间" width="180" sortable />
        <el-table-column prop="createdAt" label="创建时间" width="180" sortable />
        <el-table-column label="问题图片" width="150">
          <template #default="scope">
            <ImageGallery :image-data="scope.row.additionalImages" size="tiny" />
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
        <el-form-item label="社区ID" prop="communityId">
          <el-input-number v-model="formData.communityId" :min="1" />
        </el-form-item>
        <el-form-item label="业主ID" prop="ownerId">
          <el-input-number v-model="formData.ownerId" :min="1" />
        </el-form-item>
        <el-form-item label="房屋ID" prop="houseId">
          <el-input-number v-model="formData.houseId" :min="1" />
        </el-form-item>
        <el-form-item label="问题标题" prop="issueTitle">
          <el-input v-model="formData.issueTitle" />
        </el-form-item>
        <el-form-item label="问题内容" prop="issueContent">
          <el-input v-model="formData.issueContent" type="textarea" />
        </el-form-item>
        <el-form-item label="问题类型" prop="issueType">
          <el-input v-model="formData.issueType" />
        </el-form-item>
        <el-form-item label="子类型" prop="subType">
          <el-input v-model="formData.subType" />
        </el-form-item>
        <el-form-item label="位置类型" prop="locationType">
          <el-input v-model="formData.locationType" />
        </el-form-item>
        <el-form-item label="具体位置" prop="specificLocation">
          <el-input v-model="formData.specificLocation" />
        </el-form-item>
        <el-form-item label="联系人姓名" prop="contactName">
          <el-input v-model="formData.contactName" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="formData.contactPhone" />
        </el-form-item>
        <el-form-item label="最佳联系时间" prop="bestContactTime">
          <el-input v-model="formData.bestContactTime" />
        </el-form-item>
        <el-form-item label="紧急程度" prop="urgencyLevel">
          <el-select v-model="formData.urgencyLevel" placeholder="请选择紧急程度">
            <el-option label="一般" value="一般" />
            <el-option label="重要" value="重要" />
            <el-option label="紧急" value="紧急" />
          </el-select>
        </el-form-item>
        <el-form-item label="预计解决时间" prop="expectedResolveTime">
          <el-date-picker
            v-model="formData.expectedResolveTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择预计解决时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="问题状态" prop="issueStatus">
          <el-select v-model="formData.issueStatus" placeholder="请选择问题状态">
            <el-option label="待处理" value="待处理" />
            <el-option label="处理中" value="处理中" />
            <el-option label="已完成" value="已完成" />
          </el-select>
        </el-form-item>
        <el-form-item label="工作状态" prop="workStatus">
          <el-input v-model="formData.workStatus" />
        </el-form-item>
        <!-- <el-form-item label="问题照片">
          <ImageUpload v-model="formData.issueImages" :max-count="1" />
        </el-form-item> -->
        <el-form-item label="问题图片">
          <ImageUpload v-model="formData.additionalImages" :max-count="1" />
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
import { ownerIssueApi } from '@/api/ownerIssue'

export default {
  name: 'OwnerIssueList',
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
      issueTitle: '',
      issueType: '',
      issueStatus: ''
    })
    
    // 提供搜索表单给子组件
    provide('searchForm', searchForm)
    
    // 对话框相关
    const dialogVisible = ref(false)
    const dialogType = ref('create') // create 或 edit
    const formData = reactive({
      id: undefined,
      communityId: null,
      ownerId: null,
      houseId: null,
      issueTitle: '',
      issueContent: '',
      issueType: '',
      subType: '',
      locationType: '',
      specificLocation: '',
      contactName: '',
      contactPhone: '',
      bestContactTime: '',
      urgencyLevel: '一般',
      expectedResolveTime: '',
      assignedStaffId: null,
      assignedDepartmentId: null,
      assignedTime: '',
      assignedRemark: '',
      processorStaffId: null,
      processPlan: '',
      processResult: '',
      processStartTime: '',
      processEndTime: '',
      actualHours: 0,
      hasCost: 0,
      materialCost: 0,
      laborCost: 0,
      totalCost: 0,
      costPaymentStatus: '',
      issueStatus: '待处理',
      workStatus: '',
      satisfactionLevel: '',
      satisfactionFeedback: '',
      issueImages: null,
      processImages: [],
      resultImages: [],
      additionalImages: null,
      reportedTime: '',
      responseTime: '',
      estimatedCompleteTime: '',
      actualCompleteTime: '',
      closedBy: '',
      closedTime: '',
      closeReason: '',
      isEvaluated: 0,
      evaluationTime: '',
      evaluationContent: '',
      internalRemark: '',
      remark: ''
    })
    
    const dialogTitle = computed(() => {
      return dialogType.value === 'create' ? '新增问题' : '编辑问题'
    })
    
    // 表单验证规则
    const formRules = {
      communityId: [
        { required: true, message: '请输入社区ID', trigger: 'blur' }
      ],
      ownerId: [
        { required: true, message: '请输入业主ID', trigger: 'blur' }
      ],
      issueTitle: [
        { required: true, message: '请输入问题标题', trigger: 'blur' }
      ],
      issueContent: [
        { required: true, message: '请输入问题内容', trigger: 'blur' }
      ],
      issueType: [
        { required: true, message: '请选择问题类型', trigger: 'change' }
      ],
      contactPhone: [
        { required: true, message: '请输入联系电话', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
      ]
    }
    
    // 查看问题详情
    const viewIssueDetail = (issueId) => {
      router.push(`/owner-issue-detail/${issueId}`)
    }
    
    // 处理新增
    const handleCreate = () => {
      dialogType.value = 'create'
      dialogVisible.value = true
      // 重置表单数据
      Object.assign(formData, {
        id: undefined,
        communityId: null,
        ownerId: null,
        houseId: null,
        issueTitle: '',
        issueContent: '',
        issueType: '',
        subType: '',
        locationType: '',
        specificLocation: '',
        contactName: '',
        contactPhone: '',
        bestContactTime: '',
        urgencyLevel: '一般',
        expectedResolveTime: '',
        assignedStaffId: null,
        assignedDepartmentId: null,
        assignedTime: '',
        assignedRemark: '',
        processorStaffId: null,
        processPlan: '',
        processResult: '',
        processStartTime: '',
        processEndTime: '',
        actualHours: 0,
        hasCost: 0,
        materialCost: 0,
        laborCost: 0,
        totalCost: 0,
        costPaymentStatus: '',
        issueStatus: '待处理',
        workStatus: '',
        satisfactionLevel: '',
        satisfactionFeedback: '',
        issueImages: null,
        processImages: [],
        resultImages: [],
        additionalImages: null,
        reportedTime: '',
        responseTime: '',
        estimatedCompleteTime: '',
        actualCompleteTime: '',
        closedBy: '',
        closedTime: '',
        closeReason: '',
        isEvaluated: 0,
        evaluationTime: '',
        evaluationContent: '',
        internalRemark: '',
        remark: ''
      })
    }
    
    // 处理编辑
    const handleEdit = (row) => {
      dialogType.value = 'edit'
      dialogVisible.value = true
      // 填充表单数据 - 使用 Object.assign 确保所有字段都被正确初始化
      Object.keys(formData).forEach(key => {
        if (key === 'issueImages' || key === 'additionalImages') {
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
        } else if (key === 'processImages' || key === 'resultImages') {
          // 这两个字段保持多张图片模式
          formData[key] = Array.isArray(row[key]) ? row[key] : []
        } else if (row.hasOwnProperty(key)) {
          // 如果 row 中有这个字段，直接使用
          formData[key] = row[key]
        } else {
          // 如果 row 中没有这个字段，保持 formData 中的原值
          // 不做任何修改
        }
      })
    }
    
    // 处理删除
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该问题吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await ownerIssueApi.delete(row.id)
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
          await ownerIssueApi.create(formData)
          ElMessage.success('新增成功')
        } else {
          // 编辑
          await ownerIssueApi.update(formData)
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
      ownerIssueApi,
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
      viewIssueDetail
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