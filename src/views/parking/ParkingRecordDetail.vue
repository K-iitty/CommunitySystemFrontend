<template>
  <div class="parking-record-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>停车记录详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="停车记录信息" name="parkingRecord">
          <el-descriptions :column="2" border v-if="parkingRecordData.parkingRecord">
            <el-descriptions-item label="记录ID">{{ parkingRecordData.parkingRecord.id }}</el-descriptions-item>
            <el-descriptions-item label="车辆ID">{{ parkingRecordData.parkingRecord.vehicleId }}</el-descriptions-item>
            <el-descriptions-item label="车牌号">{{ parkingRecordData.parkingRecord.plateNumber }}</el-descriptions-item>
            <el-descriptions-item label="车辆类型">{{ parkingRecordData.parkingRecord.vehicleType }}</el-descriptions-item>
            <el-descriptions-item label="车主ID">{{ parkingRecordData.parkingRecord.ownerId }}</el-descriptions-item>
            <el-descriptions-item label="车主姓名">{{ parkingRecordData.parkingRecord.ownerName }}</el-descriptions-item>
            <el-descriptions-item label="车主电话">{{ parkingRecordData.parkingRecord.ownerPhone }}</el-descriptions-item>
            <el-descriptions-item label="停车场ID">{{ parkingRecordData.parkingRecord.parkingLotId }}</el-descriptions-item>
            <el-descriptions-item label="车位ID">{{ parkingRecordData.parkingRecord.parkingSpaceId }}</el-descriptions-item>
            <el-descriptions-item label="闸机编号">{{ parkingRecordData.parkingRecord.gateNo }}</el-descriptions-item>
            <el-descriptions-item label="入场时间">{{ parkingRecordData.parkingRecord.entryTime }}</el-descriptions-item>
            <el-descriptions-item label="出场时间">{{ parkingRecordData.parkingRecord.exitTime }}</el-descriptions-item>
            <el-descriptions-item label="停车时长(分钟)">{{ parkingRecordData.parkingRecord.durationMinutes }}</el-descriptions-item>
            <el-descriptions-item label="停车费用">{{ parkingRecordData.parkingRecord.parkingFee }}</el-descriptions-item>
            <el-descriptions-item label="实际费用">{{ parkingRecordData.parkingRecord.actualFee }}</el-descriptions-item>
            <el-descriptions-item label="支付方式">{{ parkingRecordData.parkingRecord.paymentMethod }}</el-descriptions-item>
            <el-descriptions-item label="支付状态">{{ parkingRecordData.parkingRecord.paymentStatus }}</el-descriptions-item>
            <el-descriptions-item label="交易号">{{ parkingRecordData.parkingRecord.transactionNo }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ parkingRecordData.parkingRecord.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ parkingRecordData.parkingRecord.createdAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无停车记录信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="车辆信息" name="vehicle">
          <el-descriptions :column="2" border v-if="parkingRecordData.vehicle">
            <el-descriptions-item label="车辆ID">{{ parkingRecordData.vehicle.id }}</el-descriptions-item>
            <el-descriptions-item label="车主ID">{{ parkingRecordData.vehicle.ownerId }}</el-descriptions-item>
            <el-descriptions-item label="车牌号">{{ parkingRecordData.vehicle.plateNumber }}</el-descriptions-item>
            <el-descriptions-item label="车辆类型">{{ parkingRecordData.vehicle.vehicleType }}</el-descriptions-item>
            <el-descriptions-item label="品牌">{{ parkingRecordData.vehicle.brand }}</el-descriptions-item>
            <el-descriptions-item label="型号">{{ parkingRecordData.vehicle.model }}</el-descriptions-item>
            <el-descriptions-item label="颜色">{{ parkingRecordData.vehicle.color }}</el-descriptions-item>
            <el-descriptions-item label="固定车位ID">{{ parkingRecordData.vehicle.fixedSpaceId }}</el-descriptions-item>
            <el-descriptions-item label="车辆登记证号">{{ parkingRecordData.vehicle.vehicleLicenseNo }}</el-descriptions-item>
            <el-descriptions-item label="发动机号">{{ parkingRecordData.vehicle.engineNo }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ parkingRecordData.vehicle.status }}</el-descriptions-item>
            <el-descriptions-item label="注册日期">{{ parkingRecordData.vehicle.registerDate }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ parkingRecordData.vehicle.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ parkingRecordData.vehicle.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ parkingRecordData.vehicle.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无车辆信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="业主信息" name="owner">
          <el-descriptions :column="2" border v-if="parkingRecordData.owner">
            <el-descriptions-item label="业主ID">{{ parkingRecordData.owner.id }}</el-descriptions-item>
            <el-descriptions-item label="用户名">{{ parkingRecordData.owner.username }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ parkingRecordData.owner.name }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ parkingRecordData.owner.phone }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ parkingRecordData.owner.idCard }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ parkingRecordData.owner.gender }}</el-descriptions-item>
            <el-descriptions-item label="业主类型">{{ parkingRecordData.owner.ownerType }}</el-descriptions-item>
            <el-descriptions-item label="民族">{{ parkingRecordData.owner.nationality }}</el-descriptions-item>
            <el-descriptions-item label="当前地址">{{ parkingRecordData.owner.currentAddress }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ parkingRecordData.owner.status }}</el-descriptions-item>
            <el-descriptions-item label="认证状态">{{ parkingRecordData.owner.verifyStatus }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ parkingRecordData.owner.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ parkingRecordData.owner.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ parkingRecordData.owner.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无业主信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="车位信息" name="parkingSpace">
          <el-descriptions :column="2" border v-if="parkingRecordData.parkingSpace">
            <el-descriptions-item label="车位ID">{{ parkingRecordData.parkingSpace.id }}</el-descriptions-item>
            <el-descriptions-item label="停车场ID">{{ parkingRecordData.parkingSpace.parkingLotId }}</el-descriptions-item>
            <el-descriptions-item label="车位编号">{{ parkingRecordData.parkingSpace.spaceNo }}</el-descriptions-item>
            <el-descriptions-item label="完整车位号">{{ parkingRecordData.parkingSpace.fullSpaceNo }}</el-descriptions-item>
            <el-descriptions-item label="车位类型">{{ parkingRecordData.parkingSpace.spaceType }}</el-descriptions-item>
            <el-descriptions-item label="车位面积">{{ parkingRecordData.parkingSpace.spaceArea }}</el-descriptions-item>
            <el-descriptions-item label="车位状态">{{ parkingRecordData.parkingSpace.spaceStatus }}</el-descriptions-item>
            <el-descriptions-item label="业主ID">{{ parkingRecordData.parkingSpace.ownerId }}</el-descriptions-item>
            <el-descriptions-item label="车辆ID">{{ parkingRecordData.parkingSpace.vehicleId }}</el-descriptions-item>
            <el-descriptions-item label="月租金">{{ parkingRecordData.parkingSpace.monthlyFee }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ parkingRecordData.parkingSpace.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ parkingRecordData.parkingSpace.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ parkingRecordData.parkingSpace.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无车位信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="停车场信息" name="parkingLot">
          <el-descriptions :column="2" border v-if="parkingRecordData.parkingLot">
            <el-descriptions-item label="停车场ID">{{ parkingRecordData.parkingLot.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ parkingRecordData.parkingLot.communityId }}</el-descriptions-item>
            <el-descriptions-item label="停车场名称">{{ parkingRecordData.parkingLot.lotName }}</el-descriptions-item>
            <el-descriptions-item label="停车场编号">{{ parkingRecordData.parkingLot.lotCode }}</el-descriptions-item>
            <el-descriptions-item label="停车场类别">{{ parkingRecordData.parkingLot.lotCategory }}</el-descriptions-item>
            <el-descriptions-item label="区域名称">{{ parkingRecordData.parkingLot.zoneName }}</el-descriptions-item>
            <el-descriptions-item label="区域编码">{{ parkingRecordData.parkingLot.zoneCode }}</el-descriptions-item>
            <el-descriptions-item label="联系人">{{ parkingRecordData.parkingLot.contactPerson }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ parkingRecordData.parkingLot.contactPhone }}</el-descriptions-item>
            <el-descriptions-item label="地址">{{ parkingRecordData.parkingLot.address }}</el-descriptions-item>
            <el-descriptions-item label="详细地址">{{ parkingRecordData.parkingLot.detailAddress }}</el-descriptions-item>
            <el-descriptions-item label="经度">{{ parkingRecordData.parkingLot.longitude }}</el-descriptions-item>
            <el-descriptions-item label="纬度">{{ parkingRecordData.parkingLot.latitude }}</el-descriptions-item>
            <el-descriptions-item label="总车位数">{{ parkingRecordData.parkingLot.totalSpaces }}</el-descriptions-item>
            <el-descriptions-item label="固定车位数">{{ parkingRecordData.parkingLot.fixedSpaces }}</el-descriptions-item>
            <el-descriptions-item label="临时车位数">{{ parkingRecordData.parkingLot.tempSpaces }}</el-descriptions-item>
            <el-descriptions-item label="起始编号">{{ parkingRecordData.parkingLot.startNo }}</el-descriptions-item>
            <el-descriptions-item label="结束编号">{{ parkingRecordData.parkingLot.endNo }}</el-descriptions-item>
            <el-descriptions-item label="楼层">{{ parkingRecordData.parkingLot.floorLevel }}</el-descriptions-item>
            <el-descriptions-item label="营业时间">{{ parkingRecordData.parkingLot.businessHours }}</el-descriptions-item>
            <el-descriptions-item label="是否允许外来车辆">
              <el-tag v-if="parkingRecordData.parkingLot.isAllowForeign === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="收费方式">{{ parkingRecordData.parkingLot.chargeMethod }}</el-descriptions-item>
            <el-descriptions-item label="收费标准">{{ parkingRecordData.parkingLot.chargeStandard }}</el-descriptions-item>
            <el-descriptions-item label="首段时间(分钟)">{{ parkingRecordData.parkingLot.firstDuration }}</el-descriptions-item>
            <el-descriptions-item label="首段费用">{{ parkingRecordData.parkingLot.firstFee }}</el-descriptions-item>
            <el-descriptions-item label="单位时长(分钟)">{{ parkingRecordData.parkingLot.unitDuration }}</el-descriptions-item>
            <el-descriptions-item label="单位费用">{{ parkingRecordData.parkingLot.unitFee }}</el-descriptions-item>
            <el-descriptions-item label="每日最高费用">{{ parkingRecordData.parkingLot.dailyMaxFee }}</el-descriptions-item>
            <el-descriptions-item label="月费">{{ parkingRecordData.parkingLot.monthlyFee }}</el-descriptions-item>
            <el-descriptions-item label="免费时长(分钟)">{{ parkingRecordData.parkingLot.freeDuration }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ parkingRecordData.parkingLot.status }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ parkingRecordData.parkingLot.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ parkingRecordData.parkingLot.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ parkingRecordData.parkingLot.updatedAt }}</el-descriptions-item>
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
import { parkingRecordApi } from '@/api/parkingRecord.js'

export default {
  name: 'ParkingRecordDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('parkingRecord')

    const parkingRecordData = reactive({
      parkingRecord: null,
      vehicle: null,
      owner: null,
      parkingSpace: null,
      parkingLot: null
    })

    // 获取停车记录详情
    const fetchParkingRecordDetail = async (recordId) => {
      try {
        const res = await parkingRecordApi.getDetailsById(recordId)
        Object.assign(parkingRecordData, res.data)
      } catch (error) {
        ElMessage.error('获取停车记录详情失败')
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
        fetchParkingRecordDetail(recordId)
      }
    })

    return {
      activeTab,
      parkingRecordData,
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

.parking-record-detail {
  padding: 20px;
}
</style>