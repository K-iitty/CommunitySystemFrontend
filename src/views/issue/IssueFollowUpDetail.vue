<template>
  <div class="issue-follow-up-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>问题跟进详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="跟进信息" name="issueFollowUp">
          <el-descriptions :column="2" border v-if="followUpData.issueFollowUp">
            <el-descriptions-item label="跟进ID">{{ followUpData.issueFollowUp.id }}</el-descriptions-item>
            <el-descriptions-item label="问题ID">{{ followUpData.issueFollowUp.issueId }}</el-descriptions-item>
            <el-descriptions-item label="跟进类型">{{ followUpData.issueFollowUp.followUpType }}</el-descriptions-item>
            <el-descriptions-item label="跟进内容">{{ followUpData.issueFollowUp.followUpContent }}</el-descriptions-item>
            <el-descriptions-item label="操作人类型">{{ followUpData.issueFollowUp.operatorType }}</el-descriptions-item>
            <el-descriptions-item label="操作人ID">{{ followUpData.issueFollowUp.operatorId }}</el-descriptions-item>
            <el-descriptions-item label="操作人姓名">{{ followUpData.issueFollowUp.operatorName }}</el-descriptions-item>
            <el-descriptions-item label="附件">{{ followUpData.issueFollowUp.attachments }}</el-descriptions-item>
            <el-descriptions-item label="内部备注">{{ followUpData.issueFollowUp.internalNote }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ followUpData.issueFollowUp.createdAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无跟进信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="问题信息" name="ownerIssue">
          <el-descriptions :column="2" border v-if="followUpData.ownerIssue">
            <el-descriptions-item label="问题ID">{{ followUpData.ownerIssue.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ followUpData.ownerIssue.communityId }}</el-descriptions-item>
            <el-descriptions-item label="业主ID">{{ followUpData.ownerIssue.ownerId }}</el-descriptions-item>
            <el-descriptions-item label="房屋ID">{{ followUpData.ownerIssue.houseId }}</el-descriptions-item>
            <el-descriptions-item label="问题标题">{{ followUpData.ownerIssue.issueTitle }}</el-descriptions-item>
            <el-descriptions-item label="问题内容">{{ followUpData.ownerIssue.issueContent }}</el-descriptions-item>
            <el-descriptions-item label="问题类型">{{ followUpData.ownerIssue.issueType }}</el-descriptions-item>
            <el-descriptions-item label="子类型">{{ followUpData.ownerIssue.subType }}</el-descriptions-item>
            <el-descriptions-item label="位置类型">{{ followUpData.ownerIssue.locationType }}</el-descriptions-item>
            <el-descriptions-item label="具体位置">{{ followUpData.ownerIssue.specificLocation }}</el-descriptions-item>
            <el-descriptions-item label="联系人姓名">{{ followUpData.ownerIssue.contactName }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ followUpData.ownerIssue.contactPhone }}</el-descriptions-item>
            <el-descriptions-item label="最佳联系时间">{{ followUpData.ownerIssue.bestContactTime }}</el-descriptions-item>
            <el-descriptions-item label="紧急程度">{{ followUpData.ownerIssue.urgencyLevel }}</el-descriptions-item>
            <el-descriptions-item label="预计解决时间">{{ followUpData.ownerIssue.expectedResolveTime }}</el-descriptions-item>
            <el-descriptions-item label="分配员工ID">{{ followUpData.ownerIssue.assignedStaffId }}</el-descriptions-item>
            <el-descriptions-item label="分配部门ID">{{ followUpData.ownerIssue.assignedDepartmentId }}</el-descriptions-item>
            <el-descriptions-item label="分配时间">{{ followUpData.ownerIssue.assignedTime }}</el-descriptions-item>
            <el-descriptions-item label="分配备注">{{ followUpData.ownerIssue.assignedRemark }}</el-descriptions-item>
            <el-descriptions-item label="处理员工ID">{{ followUpData.ownerIssue.processorStaffId }}</el-descriptions-item>
            <el-descriptions-item label="处理计划">{{ followUpData.ownerIssue.processPlan }}</el-descriptions-item>
            <el-descriptions-item label="处理结果">{{ followUpData.ownerIssue.processResult }}</el-descriptions-item>
            <el-descriptions-item label="处理开始时间">{{ followUpData.ownerIssue.processStartTime }}</el-descriptions-item>
            <el-descriptions-item label="处理结束时间">{{ followUpData.ownerIssue.processEndTime }}</el-descriptions-item>
            <el-descriptions-item label="实际工时">{{ followUpData.ownerIssue.actualHours }}</el-descriptions-item>
            <el-descriptions-item label="是否有费用">
              <el-tag v-if="followUpData.ownerIssue.hasCost === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="材料费用">{{ followUpData.ownerIssue.materialCost }}</el-descriptions-item>
            <el-descriptions-item label="人工费用">{{ followUpData.ownerIssue.laborCost }}</el-descriptions-item>
            <el-descriptions-item label="总费用">{{ followUpData.ownerIssue.totalCost }}</el-descriptions-item>
            <el-descriptions-item label="费用支付状态">{{ followUpData.ownerIssue.costPaymentStatus }}</el-descriptions-item>
            <el-descriptions-item label="问题状态">{{ followUpData.ownerIssue.issueStatus }}</el-descriptions-item>
            <el-descriptions-item label="工作状态">{{ followUpData.ownerIssue.workStatus }}</el-descriptions-item>
            <el-descriptions-item label="满意度等级">{{ followUpData.ownerIssue.satisfactionLevel }}</el-descriptions-item>
            <el-descriptions-item label="满意度反馈">{{ followUpData.ownerIssue.satisfactionFeedback }}</el-descriptions-item>
            <el-descriptions-item label="问题图片">{{ followUpData.ownerIssue.issueImages }}</el-descriptions-item>
            <el-descriptions-item label="处理图片">{{ followUpData.ownerIssue.processImages }}</el-descriptions-item>
            <el-descriptions-item label="结果图片">{{ followUpData.ownerIssue.resultImages }}</el-descriptions-item>
            <el-descriptions-item label="报告时间">{{ followUpData.ownerIssue.reportedTime }}</el-descriptions-item>
            <el-descriptions-item label="响应时间">{{ followUpData.ownerIssue.responseTime }}</el-descriptions-item>
            <el-descriptions-item label="预计完成时间">{{ followUpData.ownerIssue.estimatedCompleteTime }}</el-descriptions-item>
            <el-descriptions-item label="实际完成时间">{{ followUpData.ownerIssue.actualCompleteTime }}</el-descriptions-item>
            <el-descriptions-item label="关闭人">{{ followUpData.ownerIssue.closedBy }}</el-descriptions-item>
            <el-descriptions-item label="关闭时间">{{ followUpData.ownerIssue.closedTime }}</el-descriptions-item>
            <el-descriptions-item label="关闭原因">{{ followUpData.ownerIssue.closeReason }}</el-descriptions-item>
            <el-descriptions-item label="是否已评价">
              <el-tag v-if="followUpData.ownerIssue.isEvaluated === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="评价时间">{{ followUpData.ownerIssue.evaluationTime }}</el-descriptions-item>
            <el-descriptions-item label="评价内容">{{ followUpData.ownerIssue.evaluationContent }}</el-descriptions-item>
            <el-descriptions-item label="内部备注">{{ followUpData.ownerIssue.internalRemark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ followUpData.ownerIssue.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ followUpData.ownerIssue.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无问题信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="跟进人信息" name="staff">
          <el-descriptions :column="2" border v-if="followUpData.staff">
            <el-descriptions-item label="员工ID">{{ followUpData.staff.id }}</el-descriptions-item>
            <el-descriptions-item label="用户名">{{ followUpData.staff.username }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ followUpData.staff.name }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ followUpData.staff.phone }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ followUpData.staff.idCard }}</el-descriptions-item>
            <el-descriptions-item label="工号">{{ followUpData.staff.workNo }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ followUpData.staff.gender }}</el-descriptions-item>
            <el-descriptions-item label="出生日期">{{ followUpData.staff.birthDate }}</el-descriptions-item>
            <el-descriptions-item label="头像">{{ followUpData.staff.avatar }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ followUpData.staff.email }}</el-descriptions-item>
            <el-descriptions-item label="微信号">{{ followUpData.staff.wechat }}</el-descriptions-item>
            <el-descriptions-item label="座机区号">{{ followUpData.staff.telephoneAreaCode }}</el-descriptions-item>
            <el-descriptions-item label="座机号码">{{ followUpData.staff.telephoneNumber }}</el-descriptions-item>
            <el-descriptions-item label="分机号">{{ followUpData.staff.telephoneExtension }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系人">{{ followUpData.staff.emergencyContact }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系电话">{{ followUpData.staff.emergencyPhone }}</el-descriptions-item>
            <el-descriptions-item label="毕业院校">{{ followUpData.staff.graduateSchool }}</el-descriptions-item>
            <el-descriptions-item label="毕业日期">{{ followUpData.staff.graduationDate }}</el-descriptions-item>
            <el-descriptions-item label="学历">{{ followUpData.staff.educationLevel }}</el-descriptions-item>
            <el-descriptions-item label="专业">{{ followUpData.staff.major }}</el-descriptions-item>
            <el-descriptions-item label="部门ID">{{ followUpData.staff.departmentId }}</el-descriptions-item>
            <el-descriptions-item label="角色ID">{{ followUpData.staff.roleId }}</el-descriptions-item>
            <el-descriptions-item label="职位">{{ followUpData.staff.position }}</el-descriptions-item>
            <el-descriptions-item label="职称">{{ followUpData.staff.jobTitle }}</el-descriptions-item>
            <el-descriptions-item label="入职日期">{{ followUpData.staff.hireDate }}</el-descriptions-item>
            <el-descriptions-item label="工作状态">{{ followUpData.staff.workStatus }}</el-descriptions-item>
            <el-descriptions-item label="是否管理员">
              <el-tag v-if="followUpData.staff.isManager === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="籍贯">{{ followUpData.staff.nativePlace }}</el-descriptions-item>
            <el-descriptions-item label="账户状态">{{ followUpData.staff.accountStatus }}</el-descriptions-item>
            <el-descriptions-item label="在线状态">
              <el-tag v-if="followUpData.staff.onlineStatus === 1" type="success">在线</el-tag>
              <el-tag v-else type="info">离线</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="最后登录时间">{{ followUpData.staff.lastLoginTime }}</el-descriptions-item>
            <el-descriptions-item label="最后登录IP">{{ followUpData.staff.lastLoginIp }}</el-descriptions-item>
            <el-descriptions-item label="登录次数">{{ followUpData.staff.loginCount }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ followUpData.staff.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建人">{{ followUpData.staff.createdBy }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ followUpData.staff.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ followUpData.staff.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无跟进人信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="业主信息" name="owner">
          <el-descriptions :column="2" border v-if="followUpData.owner">
            <el-descriptions-item label="业主ID">{{ followUpData.owner.id }}</el-descriptions-item>
            <el-descriptions-item label="用户名">{{ followUpData.owner.username }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ followUpData.owner.name }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ followUpData.owner.phone }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ followUpData.owner.idCard }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ followUpData.owner.gender }}</el-descriptions-item>
            <el-descriptions-item label="出生日期">{{ followUpData.owner.birthDate }}</el-descriptions-item>
            <el-descriptions-item label="业主类型">{{ followUpData.owner.ownerType }}</el-descriptions-item>
            <el-descriptions-item label="政治面貌">{{ followUpData.owner.politicalStatus }}</el-descriptions-item>
            <el-descriptions-item label="婚姻状况">{{ followUpData.owner.maritalStatus }}</el-descriptions-item>
            <el-descriptions-item label="民族">{{ followUpData.owner.nationality }}</el-descriptions-item>
            <el-descriptions-item label="户籍类型">{{ followUpData.owner.householdType }}</el-descriptions-item>
            <el-descriptions-item label="户籍地址">{{ followUpData.owner.censusRegister }}</el-descriptions-item>
            <el-descriptions-item label="暂住证号">{{ followUpData.owner.temporaryResidentNo }}</el-descriptions-item>
            <el-descriptions-item label="当前地址">{{ followUpData.owner.currentAddress }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系人姓名">{{ followUpData.owner.emergencyContactName }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系人关系">{{ followUpData.owner.emergencyContactRelation }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系人电话">{{ followUpData.owner.emergencyContactPhone }}</el-descriptions-item>
            <el-descriptions-item label="居住类型">{{ followUpData.owner.residenceType }}</el-descriptions-item>
            <el-descriptions-item label="入住日期">{{ followUpData.owner.moveInDate }}</el-descriptions-item>
            <el-descriptions-item label="搬出日期">{{ followUpData.owner.moveOutDate }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ followUpData.owner.status }}</el-descriptions-item>
            <el-descriptions-item label="认证状态">{{ followUpData.owner.verifyStatus }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ followUpData.owner.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ followUpData.owner.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ followUpData.owner.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无业主信息" v-else />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { issueFollowUpApi } from '@/api/issueFollowUp.js'

export default {
  name: 'IssueFollowUpDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('issueFollowUp')

    const followUpData = reactive({
      issueFollowUp: null,
      ownerIssue: null,
      staff: null,
      owner: null
    })

    // 获取问题跟进详情
    const fetchFollowUpDetail = async (followUpId) => {
      try {
        const res = await issueFollowUpApi.getDetailsById(followUpId)
        Object.assign(followUpData, res.data)
      } catch (error) {
        ElMessage.error('获取问题跟进详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const followUpId = route.params.id
      if (followUpId) {
        fetchFollowUpDetail(followUpId)
      }
    })

    return {
      activeTab,
      followUpData,
      goBack
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

.issue-follow-up-detail {
  padding: 20px;
}
</style>