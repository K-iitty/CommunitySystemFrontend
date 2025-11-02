<template>
  <div class="meter-info-complex-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>仪表信息详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="仪表信息" name="meterInfo">
          <el-descriptions :column="2" border v-if="meterInfoData.meterInfo">
            <el-descriptions-item label="仪表ID">{{ meterInfoData.meterInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ meterInfoData.meterInfo.communityId }}</el-descriptions-item>
            <el-descriptions-item label="房屋ID">{{ meterInfoData.meterInfo.houseId }}</el-descriptions-item>
            <el-descriptions-item label="楼栋ID">{{ meterInfoData.meterInfo.buildingId }}</el-descriptions-item>
            <el-descriptions-item label="配置ID">{{ meterInfoData.meterInfo.configId }}</el-descriptions-item>
            <el-descriptions-item label="仪表名称">{{ meterInfoData.meterInfo.meterName }}</el-descriptions-item>
            <el-descriptions-item label="分类名称">{{ meterInfoData.meterInfo.categoryName }}</el-descriptions-item>
            <el-descriptions-item label="仪表类型">{{ meterInfoData.meterInfo.meterType }}</el-descriptions-item>
            <el-descriptions-item label="仪表编码">{{ meterInfoData.meterInfo.meterCode }}</el-descriptions-item>
            <el-descriptions-item label="仪表序列号">{{ meterInfoData.meterInfo.meterSn }}</el-descriptions-item>
            <el-descriptions-item label="位置类型">{{ meterInfoData.meterInfo.locationType }}</el-descriptions-item>
            <el-descriptions-item label="安装位置">{{ meterInfoData.meterInfo.installLocation }}</el-descriptions-item>
            <el-descriptions-item label="安装日期">{{ meterInfoData.meterInfo.installDate }}</el-descriptions-item>
            <el-descriptions-item label="初始读数">{{ meterInfoData.meterInfo.initialReading }}</el-descriptions-item>
            <el-descriptions-item label="当前读数">{{ meterInfoData.meterInfo.currentReading }}</el-descriptions-item>
            <el-descriptions-item label="最大读数">{{ meterInfoData.meterInfo.maxReading }}</el-descriptions-item>
            <el-descriptions-item label="总用量">{{ meterInfoData.meterInfo.totalUsage }}</el-descriptions-item>
            <el-descriptions-item label="单位">{{ meterInfoData.meterInfo.unit }}</el-descriptions-item>
            <el-descriptions-item label="收费方式">{{ meterInfoData.meterInfo.chargeStandard }}</el-descriptions-item>
            <el-descriptions-item label="在线状态">
              <el-tag v-if="meterInfoData.meterInfo.onlineStatus === 1" type="success">在线</el-tag>
              <el-tag v-else type="info">离线</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="电源状态">
              <el-tag v-if="meterInfoData.meterInfo.powerStatus === 1" type="success">供电</el-tag>
              <el-tag v-else type="info">断电</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="仪表状态">{{ meterInfoData.meterInfo.meterStatus }}</el-descriptions-item>
            <el-descriptions-item label="通讯地址">{{ meterInfoData.meterInfo.commAddress }}</el-descriptions-item>
            <el-descriptions-item label="最后通讯时间">{{ meterInfoData.meterInfo.lastCommTime }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ meterInfoData.meterInfo.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ meterInfoData.meterInfo.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ meterInfoData.meterInfo.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无仪表信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="仪表配置信息" name="meterConfig">
          <el-descriptions :column="2" border v-if="meterInfoData.meterConfig">
            <el-descriptions-item label="配置ID">{{ meterInfoData.meterConfig.id }}</el-descriptions-item>
            <el-descriptions-item label="分类名称">{{ meterInfoData.meterConfig.categoryName }}</el-descriptions-item>
            <el-descriptions-item label="仪表类型">{{ meterInfoData.meterConfig.meterType }}</el-descriptions-item>
            <el-descriptions-item label="产品ID">{{ meterInfoData.meterConfig.productId }}</el-descriptions-item>
            <el-descriptions-item label="配置参数">{{ meterInfoData.meterConfig.configParams }}</el-descriptions-item>
            <el-descriptions-item label="单位">{{ meterInfoData.meterConfig.unit }}</el-descriptions-item>
            <el-descriptions-item label="小数位数">{{ meterInfoData.meterConfig.decimalPlaces }}</el-descriptions-item>
            <el-descriptions-item label="最大值">{{ meterInfoData.meterConfig.maxValue }}</el-descriptions-item>
            <el-descriptions-item label="最小值">{{ meterInfoData.meterConfig.minValue }}</el-descriptions-item>
            <el-descriptions-item label="收费方式">{{ meterInfoData.meterConfig.chargeStandard }}</el-descriptions-item>
            <el-descriptions-item label="单价">{{ meterInfoData.meterConfig.unitPrice }}</el-descriptions-item>
            <el-descriptions-item label="计算方式">{{ meterInfoData.meterConfig.calculationMethod }}</el-descriptions-item>
            <el-descriptions-item label="通讯协议">{{ meterInfoData.meterConfig.commProtocol }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ meterInfoData.meterConfig.status }}</el-descriptions-item>
            <el-descriptions-item label="是否默认">
              <el-tag v-if="meterInfoData.meterConfig.isDefault === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="备注">{{ meterInfoData.meterConfig.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ meterInfoData.meterConfig.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ meterInfoData.meterConfig.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无仪表配置信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="房屋信息" name="house">
          <el-descriptions :column="2" border v-if="meterInfoData.house">
            <el-descriptions-item label="房屋ID">{{ meterInfoData.house.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ meterInfoData.house.communityId }}</el-descriptions-item>
            <el-descriptions-item label="楼栋ID">{{ meterInfoData.house.buildingId }}</el-descriptions-item>
            <el-descriptions-item label="房间号">{{ meterInfoData.house.roomNo }}</el-descriptions-item>
            <el-descriptions-item label="完整房号">{{ meterInfoData.house.fullRoomNo }}</el-descriptions-item>
            <el-descriptions-item label="房屋编码">{{ meterInfoData.house.houseCode }}</el-descriptions-item>
            <el-descriptions-item label="建筑面积">{{ meterInfoData.house.buildingArea }}</el-descriptions-item>
            <el-descriptions-item label="使用面积">{{ meterInfoData.house.usableArea }}</el-descriptions-item>
            <el-descriptions-item label="公摊面积">{{ meterInfoData.house.sharedArea }}</el-descriptions-item>
            <el-descriptions-item label="房屋类型">{{ meterInfoData.house.houseType }}</el-descriptions-item>
            <el-descriptions-item label="房屋户型">{{ meterInfoData.house.houseLayout }}</el-descriptions-item>
            <el-descriptions-item label="房屋朝向">{{ meterInfoData.house.houseOrientation }}</el-descriptions-item>
            <el-descriptions-item label="车位编号">{{ meterInfoData.house.parkingSpaceNo }}</el-descriptions-item>
            <el-descriptions-item label="车位类型">{{ meterInfoData.house.parkingType }}</el-descriptions-item>
            <el-descriptions-item label="房屋状态">{{ meterInfoData.house.houseStatus }}</el-descriptions-item>
            <el-descriptions-item label="装修状态">{{ meterInfoData.house.decorationStatus }}</el-descriptions-item>
            <el-descriptions-item label="楼层">{{ meterInfoData.house.floorLevel }}</el-descriptions-item>
            <el-descriptions-item label="是否有阳台">
              <el-tag v-if="meterInfoData.house.hasBalcony === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="是否有花园">
              <el-tag v-if="meterInfoData.house.hasGarden === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="备注">{{ meterInfoData.house.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ meterInfoData.house.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ meterInfoData.house.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无房屋信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="楼栋信息" name="building">
          <el-descriptions :column="2" border v-if="meterInfoData.building">
            <el-descriptions-item label="楼栋ID">{{ meterInfoData.building.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ meterInfoData.building.communityId }}</el-descriptions-item>
            <el-descriptions-item label="楼栋编号">{{ meterInfoData.building.buildingNo }}</el-descriptions-item>
            <el-descriptions-item label="楼栋名称">{{ meterInfoData.building.buildingName }}</el-descriptions-item>
            <el-descriptions-item label="楼栋别名">{{ meterInfoData.building.buildingAlias }}</el-descriptions-item>
            <el-descriptions-item label="单元编号">{{ meterInfoData.building.unitNo }}</el-descriptions-item>
            <el-descriptions-item label="单元名称">{{ meterInfoData.building.unitName }}</el-descriptions-item>
            <el-descriptions-item label="楼栋类型">{{ meterInfoData.building.buildingType }}</el-descriptions-item>
            <el-descriptions-item label="建筑结构">{{ meterInfoData.building.buildingStructure }}</el-descriptions-item>
            <el-descriptions-item label="建筑用途">{{ meterInfoData.building.buildingPurpose }}</el-descriptions-item>
            <el-descriptions-item label="总单元数">{{ meterInfoData.building.totalUnits }}</el-descriptions-item>
            <el-descriptions-item label="总楼层数">{{ meterInfoData.building.totalFloors }}</el-descriptions-item>
            <el-descriptions-item label="地下楼层数">{{ meterInfoData.building.undergroundFloors }}</el-descriptions-item>
            <el-descriptions-item label="总户数">{{ meterInfoData.building.totalHouseholds }}</el-descriptions-item>
            <el-descriptions-item label="每层户数">{{ meterInfoData.building.householdsPerFloor }}</el-descriptions-item>
            <el-descriptions-item label="建筑面积">{{ meterInfoData.building.buildingArea }}</el-descriptions-item>
            <el-descriptions-item label="使用面积">{{ meterInfoData.building.usableArea }}</el-descriptions-item>
            <el-descriptions-item label="公摊面积">{{ meterInfoData.building.publicArea }}</el-descriptions-item>
            <el-descriptions-item label="建成日期">{{ meterInfoData.building.builtDate }}</el-descriptions-item>
            <el-descriptions-item label="验收日期">{{ meterInfoData.building.acceptanceDate }}</el-descriptions-item>
            <el-descriptions-item label="交付日期">{{ meterInfoData.building.deliveryDate }}</el-descriptions-item>
            <el-descriptions-item label="经度">{{ meterInfoData.building.longitude }}</el-descriptions-item>
            <el-descriptions-item label="纬度">{{ meterInfoData.building.latitude }}</el-descriptions-item>
            <el-descriptions-item label="楼栋地址">{{ meterInfoData.building.buildingAddress }}</el-descriptions-item>
            <el-descriptions-item label="朝向">{{ meterInfoData.building.orientation }}</el-descriptions-item>
            <el-descriptions-item label="是否有电梯">
              <el-tag v-if="meterInfoData.building.hasElevator === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="电梯数量">{{ meterInfoData.building.elevatorCount }}</el-descriptions-item>
            <el-descriptions-item label="楼梯数量">{{ meterInfoData.building.stairCount }}</el-descriptions-item>
            <el-descriptions-item label="是否有地下停车场">
              <el-tag v-if="meterInfoData.building.hasUndergroundParking === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="是否有屋顶">
              <el-tag v-if="meterInfoData.building.hasRooftop === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="状态">{{ meterInfoData.building.status }}</el-descriptions-item>
            <el-descriptions-item label="楼栋等级">{{ meterInfoData.building.buildingGrade }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ meterInfoData.building.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ meterInfoData.building.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ meterInfoData.building.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无楼栋信息" v-else />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { meterInfoApi } from '@/api/meter'

export default {
  name: 'MeterInfoComplexDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('meterInfo')

    const meterInfoData = reactive({
      meterInfo: null,
      meterConfig: null,
      house: null,
      building: null
    })

    // 获取仪表信息详情
    const fetchMeterInfoDetail = async (meterId) => {
      try {
        const res = await meterInfoApi.getDetailsById(meterId)
        Object.assign(meterInfoData, res.data)
      } catch (error) {
        ElMessage.error('获取仪表信息详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const meterId = route.params.id
      if (meterId) {
        fetchMeterInfoDetail(meterId)
      }
    })

    return {
      activeTab,
      meterInfoData,
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

.meter-info-complex-detail {
  padding: 20px;
}
</style>