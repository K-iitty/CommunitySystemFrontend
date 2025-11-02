<template>
  <div class="meter-reading-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>抄表记录详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="抄表记录信息" name="reading">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="记录ID">{{ readingData.meterReading?.id }}</el-descriptions-item>
            <el-descriptions-item label="仪表ID">{{ readingData.meterReading?.meterId }}</el-descriptions-item>
            <el-descriptions-item label="上次读数">{{ readingData.meterReading?.previousReading }}</el-descriptions-item>
            <el-descriptions-item label="当前读数">{{ readingData.meterReading?.currentReading }}</el-descriptions-item>
            <el-descriptions-item label="用量">{{ readingData.meterReading?.usageAmount }}</el-descriptions-item>
            <el-descriptions-item label="单位">{{ readingData.meterReading?.unit }}</el-descriptions-item>
            <el-descriptions-item label="抄表日期">{{ readingData.meterReading?.readingDate }}</el-descriptions-item>
            <el-descriptions-item label="抄表时间">{{ readingData.meterReading?.readingTime }}</el-descriptions-item>
            <el-descriptions-item label="抄表人ID">{{ readingData.meterReading?.readerId }}</el-descriptions-item>
            <el-descriptions-item label="抄表人">{{ readingData.meterReading?.readerName }}</el-descriptions-item>
            <el-descriptions-item label="仪表分类">{{ readingData.meterReading?.categoryName }}</el-descriptions-item>
            <el-descriptions-item label="抄表类型">{{ readingData.meterReading?.readingType }}</el-descriptions-item>
            <el-descriptions-item label="抄表状态">{{ readingData.meterReading?.readingStatus }}</el-descriptions-item>
            <el-descriptions-item label="异常原因">{{ readingData.meterReading?.abnormalReason }}</el-descriptions-item>
            <el-descriptions-item label="是否处理">
              <el-tag v-if="readingData.meterReading?.processed === 1" type="success">已处理</el-tag>
              <el-tag v-else type="info">未处理</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="抄表图片">{{ readingData.meterReading?.readingImage }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ readingData.meterReading?.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ readingData.meterReading?.createdAt }}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>

        <el-tab-pane label="抄表员信息" name="staff" v-if="readingData.staff">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="员工ID">{{ readingData.staff?.id }}</el-descriptions-item>
            <el-descriptions-item label="用户名">{{ readingData.staff?.username }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ readingData.staff?.name }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ readingData.staff?.phone }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ readingData.staff?.idCard }}</el-descriptions-item>
            <el-descriptions-item label="工号">{{ readingData.staff?.workNo }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ readingData.staff?.gender }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ readingData.staff?.email }}</el-descriptions-item>
            <el-descriptions-item label="微信">{{ readingData.staff?.wechat }}</el-descriptions-item>
            <el-descriptions-item label="部门ID">{{ readingData.staff?.departmentId }}</el-descriptions-item>
            <el-descriptions-item label="角色ID">{{ readingData.staff?.roleId }}</el-descriptions-item>
            <el-descriptions-item label="职位">{{ readingData.staff?.position }}</el-descriptions-item>
            <el-descriptions-item label="职称">{{ readingData.staff?.jobTitle }}</el-descriptions-item>
            <el-descriptions-item label="入职日期">{{ readingData.staff?.hireDate }}</el-descriptions-item>
            <el-descriptions-item label="工作状态">{{ readingData.staff?.workStatus }}</el-descriptions-item>
            <el-descriptions-item label="是否管理员">
              <el-tag v-if="readingData.staff?.isManager === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="账户状态">{{ readingData.staff?.accountStatus }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ readingData.staff?.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ readingData.staff?.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ readingData.staff?.updatedAt }}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>

        <el-tab-pane label="业主信息" name="owner" v-if="readingData.owner">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="业主ID">{{ readingData.owner?.id }}</el-descriptions-item>
            <el-descriptions-item label="用户名">{{ readingData.owner?.username }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ readingData.owner?.name }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ readingData.owner?.phone }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ readingData.owner?.idCard }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ readingData.owner?.gender }}</el-descriptions-item>
            <el-descriptions-item label="业主类型">{{ readingData.owner?.ownerType }}</el-descriptions-item>
            <el-descriptions-item label="政治面貌">{{ readingData.owner?.politicalStatus }}</el-descriptions-item>
            <el-descriptions-item label="婚姻状况">{{ readingData.owner?.maritalStatus }}</el-descriptions-item>
            <el-descriptions-item label="民族">{{ readingData.owner?.nationality }}</el-descriptions-item>
            <el-descriptions-item label="户籍类型">{{ readingData.owner?.householdType }}</el-descriptions-item>
            <el-descriptions-item label="户籍地址">{{ readingData.owner?.censusRegister }}</el-descriptions-item>
            <el-descriptions-item label="暂住证号">{{ readingData.owner?.temporaryResidentNo }}</el-descriptions-item>
            <el-descriptions-item label="现住址">{{ readingData.owner?.currentAddress }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系人">{{ readingData.owner?.emergencyContactName }}</el-descriptions-item>
            <el-descriptions-item label="与本人关系">{{ readingData.owner?.emergencyContactRelation }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系电话">{{ readingData.owner?.emergencyContactPhone }}</el-descriptions-item>
            <el-descriptions-item label="居住类型">{{ readingData.owner?.residenceType }}</el-descriptions-item>
            <el-descriptions-item label="入住日期">{{ readingData.owner?.moveInDate }}</el-descriptions-item>
            <el-descriptions-item label="迁出日期">{{ readingData.owner?.moveOutDate }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ readingData.owner?.status }}</el-descriptions-item>
            <el-descriptions-item label="认证状态">{{ readingData.owner?.verifyStatus }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ readingData.owner?.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ readingData.owner?.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ readingData.owner?.updatedAt }}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { meterReadingApi } from '@/api/meter'

export default {
  name: 'MeterReadingDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('reading')

    const readingData = reactive({
      meterReading: null,
      staff: null,
      owner: null
    })

    // 获取抄表记录详情
    const fetchReadingDetail = async (id) => {
      try {
        const res = await meterReadingApi.getDetailsById(id)
        Object.assign(readingData, res.data)
      } catch (error) {
        ElMessage.error('获取抄表记录详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const readingId = route.params.id
      if (readingId) {
        fetchReadingDetail(readingId)
      }
    })

    return {
      activeTab,
      readingData,
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

.meter-reading-detail {
  padding: 20px;
}
</style>