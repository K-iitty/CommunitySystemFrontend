<template>
  <div class="access-device-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>门禁设备详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="门禁设备信息" name="accessControlDevice">
          <el-descriptions :column="2" border v-if="accessDeviceData.accessControlDevice">
            <el-descriptions-item label="设备ID">{{ accessDeviceData.accessControlDevice.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ accessDeviceData.accessControlDevice.communityId }}</el-descriptions-item>
            <el-descriptions-item label="楼栋ID">{{ accessDeviceData.accessControlDevice.buildingId }}</el-descriptions-item>
            <el-descriptions-item label="设备名称">{{ accessDeviceData.accessControlDevice.deviceName }}</el-descriptions-item>
            <el-descriptions-item label="设备类型">{{ accessDeviceData.accessControlDevice.deviceType }}</el-descriptions-item>
            <el-descriptions-item label="设备编码">{{ accessDeviceData.accessControlDevice.deviceCode }}</el-descriptions-item>
            <el-descriptions-item label="设备序列号">{{ accessDeviceData.accessControlDevice.deviceSn }}</el-descriptions-item>
            <el-descriptions-item label="安装位置">{{ accessDeviceData.accessControlDevice.installLocation }}</el-descriptions-item>
            <el-descriptions-item label="安装日期">{{ accessDeviceData.accessControlDevice.installDate }}</el-descriptions-item>
            <el-descriptions-item label="设备状态">{{ accessDeviceData.accessControlDevice.deviceStatus }}</el-descriptions-item>
            <el-descriptions-item label="在线状态">
              <el-tag v-if="accessDeviceData.accessControlDevice.onlineStatus === 1" type="success">在线</el-tag>
              <el-tag v-else type="info">离线</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="支持人脸">
              <el-tag v-if="accessDeviceData.accessControlDevice.supportFace === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="支持指纹">
              <el-tag v-if="accessDeviceData.accessControlDevice.supportFingerprint === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="支持刷卡">
              <el-tag v-if="accessDeviceData.accessControlDevice.supportCard === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="支持二维码">
              <el-tag v-if="accessDeviceData.accessControlDevice.supportQrcode === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="欠费禁用">
              <el-tag v-if="accessDeviceData.accessControlDevice.arrearsBanEnabled === 1" type="success">启用</el-tag>
              <el-tag v-else type="info">禁用</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="访客审批">
              <el-tag v-if="accessDeviceData.accessControlDevice.visitorApprovalEnabled === 1" type="success">启用</el-tag>
              <el-tag v-else type="info">禁用</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="开门时长(秒)">{{ accessDeviceData.accessControlDevice.openDuration }}</el-descriptions-item>
            <el-descriptions-item label="最后心跳">{{ accessDeviceData.accessControlDevice.lastHeartbeat }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ accessDeviceData.accessControlDevice.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ accessDeviceData.accessControlDevice.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ accessDeviceData.accessControlDevice.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无门禁设备信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="楼栋信息" name="building">
          <el-descriptions :column="2" border v-if="accessDeviceData.building">
            <el-descriptions-item label="楼栋ID">{{ accessDeviceData.building.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ accessDeviceData.building.communityId }}</el-descriptions-item>
            <el-descriptions-item label="楼栋编号">{{ accessDeviceData.building.buildingNo }}</el-descriptions-item>
            <el-descriptions-item label="楼栋名称">{{ accessDeviceData.building.buildingName }}</el-descriptions-item>
            <el-descriptions-item label="楼栋别名">{{ accessDeviceData.building.buildingAlias }}</el-descriptions-item>
            <el-descriptions-item label="单元编号">{{ accessDeviceData.building.unitNo }}</el-descriptions-item>
            <el-descriptions-item label="单元名称">{{ accessDeviceData.building.unitName }}</el-descriptions-item>
            <el-descriptions-item label="楼栋类型">{{ accessDeviceData.building.buildingType }}</el-descriptions-item>
            <el-descriptions-item label="建筑结构">{{ accessDeviceData.building.buildingStructure }}</el-descriptions-item>
            <el-descriptions-item label="建筑用途">{{ accessDeviceData.building.buildingPurpose }}</el-descriptions-item>
            <el-descriptions-item label="总单元数">{{ accessDeviceData.building.totalUnits }}</el-descriptions-item>
            <el-descriptions-item label="总楼层数">{{ accessDeviceData.building.totalFloors }}</el-descriptions-item>
            <el-descriptions-item label="地下楼层数">{{ accessDeviceData.building.undergroundFloors }}</el-descriptions-item>
            <el-descriptions-item label="总户数">{{ accessDeviceData.building.totalHouseholds }}</el-descriptions-item>
            <el-descriptions-item label="每层户数">{{ accessDeviceData.building.householdsPerFloor }}</el-descriptions-item>
            <el-descriptions-item label="建筑面积">{{ accessDeviceData.building.buildingArea }}</el-descriptions-item>
            <el-descriptions-item label="使用面积">{{ accessDeviceData.building.usableArea }}</el-descriptions-item>
            <el-descriptions-item label="公摊面积">{{ accessDeviceData.building.publicArea }}</el-descriptions-item>
            <el-descriptions-item label="建成日期">{{ accessDeviceData.building.builtDate }}</el-descriptions-item>
            <el-descriptions-item label="验收日期">{{ accessDeviceData.building.acceptanceDate }}</el-descriptions-item>
            <el-descriptions-item label="交付日期">{{ accessDeviceData.building.deliveryDate }}</el-descriptions-item>
            <el-descriptions-item label="经度">{{ accessDeviceData.building.longitude }}</el-descriptions-item>
            <el-descriptions-item label="纬度">{{ accessDeviceData.building.latitude }}</el-descriptions-item>
            <el-descriptions-item label="楼栋地址">{{ accessDeviceData.building.buildingAddress }}</el-descriptions-item>
            <el-descriptions-item label="朝向">{{ accessDeviceData.building.orientation }}</el-descriptions-item>
            <el-descriptions-item label="是否有电梯">
              <el-tag v-if="accessDeviceData.building.hasElevator === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="电梯数量">{{ accessDeviceData.building.elevatorCount }}</el-descriptions-item>
            <el-descriptions-item label="楼梯数量">{{ accessDeviceData.building.stairCount }}</el-descriptions-item>
            <el-descriptions-item label="是否有地下停车场">
              <el-tag v-if="accessDeviceData.building.hasUndergroundParking === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="是否有屋顶">
              <el-tag v-if="accessDeviceData.building.hasRooftop === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="状态">{{ accessDeviceData.building.status }}</el-descriptions-item>
            <el-descriptions-item label="楼栋等级">{{ accessDeviceData.building.buildingGrade }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ accessDeviceData.building.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ accessDeviceData.building.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ accessDeviceData.building.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无楼栋信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="社区信息" name="communityInfo">
          <el-descriptions :column="2" border v-if="accessDeviceData.communityInfo">
            <el-descriptions-item label="社区ID">{{ accessDeviceData.communityInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="社区名称">{{ accessDeviceData.communityInfo.communityName }}</el-descriptions-item>
            <el-descriptions-item label="社区编码">{{ accessDeviceData.communityInfo.communityCode }}</el-descriptions-item>
            <el-descriptions-item label="省份">{{ accessDeviceData.communityInfo.province }}</el-descriptions-item>
            <el-descriptions-item label="城市">{{ accessDeviceData.communityInfo.city }}</el-descriptions-item>
            <el-descriptions-item label="区县">{{ accessDeviceData.communityInfo.district }}</el-descriptions-item>
            <el-descriptions-item label="区域编码">{{ accessDeviceData.communityInfo.areaCode }}</el-descriptions-item>
            <el-descriptions-item label="详细地址">{{ accessDeviceData.communityInfo.detailAddress }}</el-descriptions-item>
            <el-descriptions-item label="总楼栋数">{{ accessDeviceData.communityInfo.totalBuildings }}</el-descriptions-item>
            <el-descriptions-item label="总户数">{{ accessDeviceData.communityInfo.totalHouseholds }}</el-descriptions-item>
            <el-descriptions-item label="总面积">{{ accessDeviceData.communityInfo.totalArea }}</el-descriptions-item>
            <el-descriptions-item label="建筑面积">{{ accessDeviceData.communityInfo.buildingArea }}</el-descriptions-item>
            <el-descriptions-item label="停车面积">{{ accessDeviceData.communityInfo.parkingArea }}</el-descriptions-item>
            <el-descriptions-item label="绿化面积">{{ accessDeviceData.communityInfo.greenArea }}</el-descriptions-item>
            <el-descriptions-item label="公摊面积">{{ accessDeviceData.communityInfo.publicArea }}</el-descriptions-item>
            <el-descriptions-item label="物业经理ID">{{ accessDeviceData.communityInfo.managerStaffId }}</el-descriptions-item>
            <el-descriptions-item label="物业经理姓名">{{ accessDeviceData.communityInfo.managerName }}</el-descriptions-item>
            <el-descriptions-item label="物业经理电话">{{ accessDeviceData.communityInfo.managerPhone }}</el-descriptions-item>
            <el-descriptions-item label="物业经理备注">{{ accessDeviceData.communityInfo.managerRemark }}</el-descriptions-item>
            <el-descriptions-item label="物业公司">{{ accessDeviceData.communityInfo.propertyCompany }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ accessDeviceData.communityInfo.contactPhone }}</el-descriptions-item>
            <el-descriptions-item label="建成年份">{{ accessDeviceData.communityInfo.builtYear }}</el-descriptions-item>
            <el-descriptions-item label="入住率">{{ accessDeviceData.communityInfo.occupancyRate }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ accessDeviceData.communityInfo.status }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ accessDeviceData.communityInfo.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ accessDeviceData.communityInfo.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ accessDeviceData.communityInfo.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无社区信息" v-else />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { accessDeviceApi } from '@/api/access'

export default {
  name: 'AccessDeviceDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('accessControlDevice')

    const accessDeviceData = reactive({
      accessControlDevice: null,
      building: null,
      communityInfo: null
    })

    // 获取门禁设备详情
    const fetchAccessDeviceDetail = async (deviceId) => {
      try {
        const res = await accessDeviceApi.getDetailsById(deviceId)
        Object.assign(accessDeviceData, res.data)
      } catch (error) {
        ElMessage.error('获取门禁设备详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const deviceId = route.params.id
      if (deviceId) {
        fetchAccessDeviceDetail(deviceId)
      }
    })

    return {
      activeTab,
      accessDeviceData,
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

.access-device-detail {
  padding: 20px;
}
</style>