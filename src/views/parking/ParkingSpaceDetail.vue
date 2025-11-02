<template>
  <div class="parking-space-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>车位信息详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="车位信息" name="parkingSpace">
          <el-descriptions :column="2" border v-if="parkingSpaceData.parkingSpace">
            <el-descriptions-item label="车位ID">{{ parkingSpaceData.parkingSpace.id }}</el-descriptions-item>
            <el-descriptions-item label="停车场ID">{{ parkingSpaceData.parkingSpace.parkingLotId }}</el-descriptions-item>
            <el-descriptions-item label="车位编号">{{ parkingSpaceData.parkingSpace.spaceNo }}</el-descriptions-item>
            <el-descriptions-item label="完整车位号">{{ parkingSpaceData.parkingSpace.fullSpaceNo }}</el-descriptions-item>
            <el-descriptions-item label="车位类型">{{ parkingSpaceData.parkingSpace.spaceType }}</el-descriptions-item>
            <el-descriptions-item label="车位面积">{{ parkingSpaceData.parkingSpace.spaceArea }}</el-descriptions-item>
            <el-descriptions-item label="车位状态">{{ parkingSpaceData.parkingSpace.spaceStatus }}</el-descriptions-item>
            <el-descriptions-item label="业主ID">{{ parkingSpaceData.parkingSpace.ownerId }}</el-descriptions-item>
            <el-descriptions-item label="车辆ID">{{ parkingSpaceData.parkingSpace.vehicleId }}</el-descriptions-item>
            <el-descriptions-item label="月租金">{{ parkingSpaceData.parkingSpace.monthlyFee }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ parkingSpaceData.parkingSpace.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ parkingSpaceData.parkingSpace.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ parkingSpaceData.parkingSpace.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无车位信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="停车场信息" name="parkingLot">
          <el-descriptions :column="2" border v-if="parkingSpaceData.parkingLot">
            <el-descriptions-item label="停车场ID">{{ parkingSpaceData.parkingLot.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ parkingSpaceData.parkingLot.communityId }}</el-descriptions-item>
            <el-descriptions-item label="停车场名称">{{ parkingSpaceData.parkingLot.lotName }}</el-descriptions-item>
            <el-descriptions-item label="停车场编号">{{ parkingSpaceData.parkingLot.lotCode }}</el-descriptions-item>
            <el-descriptions-item label="停车场类别">{{ parkingSpaceData.parkingLot.lotCategory }}</el-descriptions-item>
            <el-descriptions-item label="区域名称">{{ parkingSpaceData.parkingLot.zoneName }}</el-descriptions-item>
            <el-descriptions-item label="区域编码">{{ parkingSpaceData.parkingLot.zoneCode }}</el-descriptions-item>
            <el-descriptions-item label="联系人">{{ parkingSpaceData.parkingLot.contactPerson }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ parkingSpaceData.parkingLot.contactPhone }}</el-descriptions-item>
            <el-descriptions-item label="地址">{{ parkingSpaceData.parkingLot.address }}</el-descriptions-item>
            <el-descriptions-item label="详细地址">{{ parkingSpaceData.parkingLot.detailAddress }}</el-descriptions-item>
            <el-descriptions-item label="经度">{{ parkingSpaceData.parkingLot.longitude }}</el-descriptions-item>
            <el-descriptions-item label="纬度">{{ parkingSpaceData.parkingLot.latitude }}</el-descriptions-item>
            <el-descriptions-item label="总车位数">{{ parkingSpaceData.parkingLot.totalSpaces }}</el-descriptions-item>
            <el-descriptions-item label="固定车位数">{{ parkingSpaceData.parkingLot.fixedSpaces }}</el-descriptions-item>
            <el-descriptions-item label="临时车位数">{{ parkingSpaceData.parkingLot.tempSpaces }}</el-descriptions-item>
            <el-descriptions-item label="起始编号">{{ parkingSpaceData.parkingLot.startNo }}</el-descriptions-item>
            <el-descriptions-item label="结束编号">{{ parkingSpaceData.parkingLot.endNo }}</el-descriptions-item>
            <el-descriptions-item label="楼层">{{ parkingSpaceData.parkingLot.floorLevel }}</el-descriptions-item>
            <el-descriptions-item label="营业时间">{{ parkingSpaceData.parkingLot.businessHours }}</el-descriptions-item>
            <el-descriptions-item label="是否允许外来车辆">
              <el-tag v-if="parkingSpaceData.parkingLot.isAllowForeign === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="收费方式">{{ parkingSpaceData.parkingLot.chargeMethod }}</el-descriptions-item>
            <el-descriptions-item label="收费标准">{{ parkingSpaceData.parkingLot.chargeStandard }}</el-descriptions-item>
            <el-descriptions-item label="首段时间(分钟)">{{ parkingSpaceData.parkingLot.firstDuration }}</el-descriptions-item>
            <el-descriptions-item label="首段费用">{{ parkingSpaceData.parkingLot.firstFee }}</el-descriptions-item>
            <el-descriptions-item label="单位时长(分钟)">{{ parkingSpaceData.parkingLot.unitDuration }}</el-descriptions-item>
            <el-descriptions-item label="单位费用">{{ parkingSpaceData.parkingLot.unitFee }}</el-descriptions-item>
            <el-descriptions-item label="每日最高费用">{{ parkingSpaceData.parkingLot.dailyMaxFee }}</el-descriptions-item>
            <el-descriptions-item label="月费">{{ parkingSpaceData.parkingLot.monthlyFee }}</el-descriptions-item>
            <el-descriptions-item label="免费时长(分钟)">{{ parkingSpaceData.parkingLot.freeDuration }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ parkingSpaceData.parkingLot.status }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ parkingSpaceData.parkingLot.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ parkingSpaceData.parkingLot.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ parkingSpaceData.parkingLot.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无停车场信息" v-else />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { parkingSpaceApi } from '@/api/parking'

export default {
  name: 'ParkingSpaceDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('parkingSpace')

    const parkingSpaceData = reactive({
      parkingSpace: null,
      parkingLot: null
    })

    // 获取车位详情
    const fetchParkingSpaceDetail = async (parkingSpaceId) => {
      try {
        const res = await parkingSpaceApi.getDetailsById(parkingSpaceId)
        Object.assign(parkingSpaceData, res.data)
      } catch (error) {
        ElMessage.error('获取车位详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const parkingSpaceId = route.params.id
      if (parkingSpaceId) {
        fetchParkingSpaceDetail(parkingSpaceId)
      }
    })

    return {
      activeTab,
      parkingSpaceData,
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

.parking-space-detail {
  padding: 20px;
}
</style>