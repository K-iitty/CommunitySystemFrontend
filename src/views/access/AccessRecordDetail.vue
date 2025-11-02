<template>
  <div class="access-record-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>门禁记录详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="门禁记录信息" name="accessControlRecord">
          <el-descriptions :column="2" border v-if="accessRecordData.accessControlRecord">
            <el-descriptions-item label="记录ID">{{ accessRecordData.accessControlRecord.id }}</el-descriptions-item>
            <el-descriptions-item label="人员ID">{{ accessRecordData.accessControlRecord.personId }}</el-descriptions-item>
            <el-descriptions-item label="人员类型">{{ accessRecordData.accessControlRecord.personType }}</el-descriptions-item>
            <el-descriptions-item label="人员姓名">{{ accessRecordData.accessControlRecord.personName }}</el-descriptions-item>
            <el-descriptions-item label="人员电话">{{ accessRecordData.accessControlRecord.personPhone }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ accessRecordData.accessControlRecord.idCard }}</el-descriptions-item>
            <el-descriptions-item label="设备ID">{{ accessRecordData.accessControlRecord.deviceId }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ accessRecordData.accessControlRecord.communityId }}</el-descriptions-item>
            <el-descriptions-item label="通行类型">{{ accessRecordData.accessControlRecord.accessType }}</el-descriptions-item>
            <el-descriptions-item label="通行方式">{{ accessRecordData.accessControlRecord.accessMethod }}</el-descriptions-item>
            <el-descriptions-item label="权限类型">{{ accessRecordData.accessControlRecord.permissionType }}</el-descriptions-item>
            <el-descriptions-item label="有效开始时间">{{ accessRecordData.accessControlRecord.validStartTime }}</el-descriptions-item>
            <el-descriptions-item label="有效结束时间">{{ accessRecordData.accessControlRecord.validEndTime }}</el-descriptions-item>
            <el-descriptions-item label="通行时间">{{ accessRecordData.accessControlRecord.accessTime }}</el-descriptions-item>
            <el-descriptions-item label="闸机名称">{{ accessRecordData.accessControlRecord.gateName }}</el-descriptions-item>
            <el-descriptions-item label="位置信息">{{ accessRecordData.accessControlRecord.locationInfo }}</el-descriptions-item>
            <el-descriptions-item label="验证结果">{{ accessRecordData.accessControlRecord.verifyResult }}</el-descriptions-item>
            <el-descriptions-item label="失败原因">{{ accessRecordData.accessControlRecord.failReason }}</el-descriptions-item>
            <el-descriptions-item label="抓拍图片">{{ accessRecordData.accessControlRecord.captureImage }}</el-descriptions-item>
            <el-descriptions-item label="审批人">{{ accessRecordData.accessControlRecord.approvedBy }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ accessRecordData.accessControlRecord.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ accessRecordData.accessControlRecord.createdAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无门禁记录信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="门禁设备信息" name="accessControlDevice">
          <el-descriptions :column="2" border v-if="accessRecordData.accessControlDevice">
            <el-descriptions-item label="设备ID">{{ accessRecordData.accessControlDevice.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ accessRecordData.accessControlDevice.communityId }}</el-descriptions-item>
            <el-descriptions-item label="楼栋ID">{{ accessRecordData.accessControlDevice.buildingId }}</el-descriptions-item>
            <el-descriptions-item label="设备名称">{{ accessRecordData.accessControlDevice.deviceName }}</el-descriptions-item>
            <el-descriptions-item label="设备类型">{{ accessRecordData.accessControlDevice.deviceType }}</el-descriptions-item>
            <el-descriptions-item label="设备编码">{{ accessRecordData.accessControlDevice.deviceCode }}</el-descriptions-item>
            <el-descriptions-item label="设备序列号">{{ accessRecordData.accessControlDevice.deviceSn }}</el-descriptions-item>
            <el-descriptions-item label="安装位置">{{ accessRecordData.accessControlDevice.installLocation }}</el-descriptions-item>
            <el-descriptions-item label="安装日期">{{ accessRecordData.accessControlDevice.installDate }}</el-descriptions-item>
            <el-descriptions-item label="设备状态">{{ accessRecordData.accessControlDevice.deviceStatus }}</el-descriptions-item>
            <el-descriptions-item label="在线状态">
              <el-tag v-if="accessRecordData.accessControlDevice.onlineStatus === 1" type="success">在线</el-tag>
              <el-tag v-else type="info">离线</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="支持人脸">
              <el-tag v-if="accessRecordData.accessControlDevice.supportFace === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="支持指纹">
              <el-tag v-if="accessRecordData.accessControlDevice.supportFingerprint === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="支持刷卡">
              <el-tag v-if="accessRecordData.accessControlDevice.supportCard === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="支持二维码">
              <el-tag v-if="accessRecordData.accessControlDevice.supportQrcode === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="欠费禁用">
              <el-tag v-if="accessRecordData.accessControlDevice.arrearsBanEnabled === 1" type="success">启用</el-tag>
              <el-tag v-else type="info">禁用</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="访客审批">
              <el-tag v-if="accessRecordData.accessControlDevice.visitorApprovalEnabled === 1" type="success">启用</el-tag>
              <el-tag v-else type="info">禁用</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="开门时长(秒)">{{ accessRecordData.accessControlDevice.openDuration }}</el-descriptions-item>
            <el-descriptions-item label="最后心跳">{{ accessRecordData.accessControlDevice.lastHeartbeat }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ accessRecordData.accessControlDevice.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ accessRecordData.accessControlDevice.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ accessRecordData.accessControlDevice.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无门禁设备信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="人员信息" name="person">
          <el-descriptions :column="2" border v-if="accessRecordData.person">
            <el-descriptions-item label="人员ID">{{ accessRecordData.person.id }}</el-descriptions-item>
            <el-descriptions-item label="用户名">{{ accessRecordData.person.username }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ accessRecordData.person.name }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ accessRecordData.person.phone }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ accessRecordData.person.idCard }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ accessRecordData.person.gender }}</el-descriptions-item>
            <el-descriptions-item label="出生日期">{{ accessRecordData.person.birthDate }}</el-descriptions-item>
            <el-descriptions-item label="人员类型">{{ accessRecordData.person.ownerType }}</el-descriptions-item>
            <el-descriptions-item label="政治面貌">{{ accessRecordData.person.politicalStatus }}</el-descriptions-item>
            <el-descriptions-item label="婚姻状况">{{ accessRecordData.person.maritalStatus }}</el-descriptions-item>
            <el-descriptions-item label="民族">{{ accessRecordData.person.nationality }}</el-descriptions-item>
            <el-descriptions-item label="户籍类型">{{ accessRecordData.person.householdType }}</el-descriptions-item>
            <el-descriptions-item label="户籍地址">{{ accessRecordData.person.censusRegister }}</el-descriptions-item>
            <el-descriptions-item label="暂住证号">{{ accessRecordData.person.temporaryResidentNo }}</el-descriptions-item>
            <el-descriptions-item label="当前地址">{{ accessRecordData.person.currentAddress }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系人姓名">{{ accessRecordData.person.emergencyContactName }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系人关系">{{ accessRecordData.person.emergencyContactRelation }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系人电话">{{ accessRecordData.person.emergencyContactPhone }}</el-descriptions-item>
            <el-descriptions-item label="居住类型">{{ accessRecordData.person.residenceType }}</el-descriptions-item>
            <el-descriptions-item label="入住日期">{{ accessRecordData.person.moveInDate }}</el-descriptions-item>
            <el-descriptions-item label="搬出日期">{{ accessRecordData.person.moveOutDate }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ accessRecordData.person.status }}</el-descriptions-item>
            <el-descriptions-item label="认证状态">{{ accessRecordData.person.verifyStatus }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ accessRecordData.person.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ accessRecordData.person.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ accessRecordData.person.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无人员信息" v-else />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { accessRecordApi } from '@/api/access'

export default {
  name: 'AccessRecordDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('accessControlRecord')

    const accessRecordData = reactive({
      accessControlRecord: null,
      accessControlDevice: null,
      person: null,
      personType: null
    })

    // 获取门禁记录详情
    const fetchAccessRecordDetail = async (recordId) => {
      try {
        const res = await accessRecordApi.getDetailsById(recordId)
        Object.assign(accessRecordData, res.data)
      } catch (error) {
        ElMessage.error('获取门禁记录详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const recordId = route.params.id
      if (recordId) {
        fetchAccessRecordDetail(recordId)
      }
    })

    return {
      activeTab,
      accessRecordData,
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

.access-record-detail {
  padding: 20px;
}
</style>