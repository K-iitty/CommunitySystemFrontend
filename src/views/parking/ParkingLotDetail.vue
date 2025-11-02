<template>
  <div class="parking-lot-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>停车场信息详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="停车场信息" name="parkingLot">
          <el-descriptions :column="2" border v-if="parkingLotData.parkingLot">
            <el-descriptions-item label="停车场ID">{{ parkingLotData.parkingLot.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ parkingLotData.parkingLot.communityId }}</el-descriptions-item>
            <el-descriptions-item label="停车场名称">{{ parkingLotData.parkingLot.lotName }}</el-descriptions-item>
            <el-descriptions-item label="停车场编号">{{ parkingLotData.parkingLot.lotCode }}</el-descriptions-item>
            <el-descriptions-item label="停车场类别">{{ parkingLotData.parkingLot.lotCategory }}</el-descriptions-item>
            <el-descriptions-item label="区域名称">{{ parkingLotData.parkingLot.zoneName }}</el-descriptions-item>
            <el-descriptions-item label="区域编码">{{ parkingLotData.parkingLot.zoneCode }}</el-descriptions-item>
            <el-descriptions-item label="联系人">{{ parkingLotData.parkingLot.contactPerson }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ parkingLotData.parkingLot.contactPhone }}</el-descriptions-item>
            <el-descriptions-item label="地址">{{ parkingLotData.parkingLot.address }}</el-descriptions-item>
            <el-descriptions-item label="详细地址">{{ parkingLotData.parkingLot.detailAddress }}</el-descriptions-item>
            <el-descriptions-item label="经度">{{ parkingLotData.parkingLot.longitude }}</el-descriptions-item>
            <el-descriptions-item label="纬度">{{ parkingLotData.parkingLot.latitude }}</el-descriptions-item>
            <el-descriptions-item label="总车位数">{{ parkingLotData.parkingLot.totalSpaces }}</el-descriptions-item>
            <el-descriptions-item label="固定车位数">{{ parkingLotData.parkingLot.fixedSpaces }}</el-descriptions-item>
            <el-descriptions-item label="临时车位数">{{ parkingLotData.parkingLot.tempSpaces }}</el-descriptions-item>
            <el-descriptions-item label="起始编号">{{ parkingLotData.parkingLot.startNo }}</el-descriptions-item>
            <el-descriptions-item label="结束编号">{{ parkingLotData.parkingLot.endNo }}</el-descriptions-item>
            <el-descriptions-item label="楼层">{{ parkingLotData.parkingLot.floorLevel }}</el-descriptions-item>
            <el-descriptions-item label="营业时间">{{ parkingLotData.parkingLot.businessHours }}</el-descriptions-item>
            <el-descriptions-item label="是否允许外来车辆">
              <el-tag v-if="parkingLotData.parkingLot.isAllowForeign === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="收费方式">{{ parkingLotData.parkingLot.chargeMethod }}</el-descriptions-item>
            <el-descriptions-item label="收费标准">{{ parkingLotData.parkingLot.chargeStandard }}</el-descriptions-item>
            <el-descriptions-item label="首段时间(分钟)">{{ parkingLotData.parkingLot.firstDuration }}</el-descriptions-item>
            <el-descriptions-item label="首段费用">{{ parkingLotData.parkingLot.firstFee }}</el-descriptions-item>
            <el-descriptions-item label="单位时长(分钟)">{{ parkingLotData.parkingLot.unitDuration }}</el-descriptions-item>
            <el-descriptions-item label="单位费用">{{ parkingLotData.parkingLot.unitFee }}</el-descriptions-item>
            <el-descriptions-item label="每日最高费用">{{ parkingLotData.parkingLot.dailyMaxFee }}</el-descriptions-item>
            <el-descriptions-item label="月费">{{ parkingLotData.parkingLot.monthlyFee }}</el-descriptions-item>
            <el-descriptions-item label="免费时长(分钟)">{{ parkingLotData.parkingLot.freeDuration }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ parkingLotData.parkingLot.status }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ parkingLotData.parkingLot.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ parkingLotData.parkingLot.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ parkingLotData.parkingLot.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无停车场信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="社区信息" name="community">
          <el-descriptions :column="2" border v-if="parkingLotData.communityInfo">
            <el-descriptions-item label="社区ID">{{ parkingLotData.communityInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="社区名称">{{ parkingLotData.communityInfo.communityName }}</el-descriptions-item>
            <el-descriptions-item label="社区编码">{{ parkingLotData.communityInfo.communityCode }}</el-descriptions-item>
            <el-descriptions-item label="省份">{{ parkingLotData.communityInfo.province }}</el-descriptions-item>
            <el-descriptions-item label="城市">{{ parkingLotData.communityInfo.city }}</el-descriptions-item>
            <el-descriptions-item label="区县">{{ parkingLotData.communityInfo.district }}</el-descriptions-item>
            <el-descriptions-item label="区域编码">{{ parkingLotData.communityInfo.areaCode }}</el-descriptions-item>
            <el-descriptions-item label="详细地址">{{ parkingLotData.communityInfo.detailAddress }}</el-descriptions-item>
            <el-descriptions-item label="总楼栋数">{{ parkingLotData.communityInfo.totalBuildings }}</el-descriptions-item>
            <el-descriptions-item label="总户数">{{ parkingLotData.communityInfo.totalHouseholds }}</el-descriptions-item>
            <el-descriptions-item label="总面积">{{ parkingLotData.communityInfo.totalArea }}</el-descriptions-item>
            <el-descriptions-item label="建筑面积">{{ parkingLotData.communityInfo.buildingArea }}</el-descriptions-item>
            <el-descriptions-item label="停车面积">{{ parkingLotData.communityInfo.parkingArea }}</el-descriptions-item>
            <el-descriptions-item label="绿化面积">{{ parkingLotData.communityInfo.greenArea }}</el-descriptions-item>
            <el-descriptions-item label="公共面积">{{ parkingLotData.communityInfo.publicArea }}</el-descriptions-item>
            <el-descriptions-item label="物业经理ID">{{ parkingLotData.communityInfo.managerStaffId }}</el-descriptions-item>
            <el-descriptions-item label="物业经理姓名">{{ parkingLotData.communityInfo.managerName }}</el-descriptions-item>
            <el-descriptions-item label="物业经理电话">{{ parkingLotData.communityInfo.managerPhone }}</el-descriptions-item>
            <el-descriptions-item label="物业经理备注">{{ parkingLotData.communityInfo.managerRemark }}</el-descriptions-item>
            <el-descriptions-item label="物业公司">{{ parkingLotData.communityInfo.propertyCompany }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ parkingLotData.communityInfo.contactPhone }}</el-descriptions-item>
            <el-descriptions-item label="建成年份">{{ parkingLotData.communityInfo.builtYear }}</el-descriptions-item>
            <el-descriptions-item label="入住率">{{ parkingLotData.communityInfo.occupancyRate }}%</el-descriptions-item>
            <el-descriptions-item label="状态">{{ parkingLotData.communityInfo.status }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ parkingLotData.communityInfo.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ parkingLotData.communityInfo.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ parkingLotData.communityInfo.updatedAt }}</el-descriptions-item>
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
import { parkingLotApi } from '@/api/parking'

export default {
  name: 'ParkingLotDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('parkingLot')

    const parkingLotData = reactive({
      parkingLot: null,
      communityInfo: null
    })

    // 获取停车场详情
    const fetchParkingLotDetail = async (parkingLotId) => {
      try {
        const res = await parkingLotApi.getDetailsById(parkingLotId)
        Object.assign(parkingLotData, res.data)
      } catch (error) {
        ElMessage.error('获取停车场详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const parkingLotId = route.params.id
      if (parkingLotId) {
        fetchParkingLotDetail(parkingLotId)
      }
    })

    return {
      activeTab,
      parkingLotData,
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

.parking-lot-detail {
  padding: 20px;
}
</style>