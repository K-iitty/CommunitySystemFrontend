<template>
  <div class="house-complex-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>房屋综合信息详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="房屋信息" name="house">
          <el-descriptions :column="2" border v-if="houseData.house">
            <el-descriptions-item label="房屋ID">{{ houseData.house.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ houseData.house.communityId }}</el-descriptions-item>
            <el-descriptions-item label="楼栋ID">{{ houseData.house.buildingId }}</el-descriptions-item>
            <el-descriptions-item label="房间号">{{ houseData.house.roomNo }}</el-descriptions-item>
            <el-descriptions-item label="完整房号">{{ houseData.house.fullRoomNo }}</el-descriptions-item>
            <el-descriptions-item label="房屋编码">{{ houseData.house.houseCode }}</el-descriptions-item>
            <el-descriptions-item label="建筑面积">{{ houseData.house.buildingArea }}</el-descriptions-item>
            <el-descriptions-item label="使用面积">{{ houseData.house.usableArea }}</el-descriptions-item>
            <el-descriptions-item label="公摊面积">{{ houseData.house.sharedArea }}</el-descriptions-item>
            <el-descriptions-item label="房屋类型">{{ houseData.house.houseType }}</el-descriptions-item>
            <el-descriptions-item label="户型">{{ houseData.house.houseLayout }}</el-descriptions-item>
            <el-descriptions-item label="朝向">{{ houseData.house.houseOrientation }}</el-descriptions-item>
            <el-descriptions-item label="车位号">{{ houseData.house.parkingSpaceNo }}</el-descriptions-item>
            <el-descriptions-item label="车位类型">{{ houseData.house.parkingType }}</el-descriptions-item>
            <el-descriptions-item label="房屋状态">{{ houseData.house.houseStatus }}</el-descriptions-item>
            <el-descriptions-item label="装修状态">{{ houseData.house.decorationStatus }}</el-descriptions-item>
            <el-descriptions-item label="楼层">{{ houseData.house.floorLevel }}</el-descriptions-item>
            <el-descriptions-item label="是否有阳台">
              <el-tag v-if="houseData.house.hasBalcony === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="是否有花园">
              <el-tag v-if="houseData.house.hasGarden === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="备注">{{ houseData.house.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ houseData.house.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ houseData.house.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无房屋信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="楼栋信息" name="building">
          <el-descriptions :column="2" border v-if="houseData.building">
            <el-descriptions-item label="楼栋ID">{{ houseData.building.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ houseData.building.communityId }}</el-descriptions-item>
            <el-descriptions-item label="楼栋编号">{{ houseData.building.buildingNo }}</el-descriptions-item>
            <el-descriptions-item label="楼栋名称">{{ houseData.building.buildingName }}</el-descriptions-item>
            <el-descriptions-item label="楼栋别名">{{ houseData.building.buildingAlias }}</el-descriptions-item>
            <el-descriptions-item label="单元编号">{{ houseData.building.unitNo }}</el-descriptions-item>
            <el-descriptions-item label="单元名称">{{ houseData.building.unitName }}</el-descriptions-item>
            <el-descriptions-item label="建筑类型">{{ houseData.building.buildingType }}</el-descriptions-item>
            <el-descriptions-item label="建筑结构">{{ houseData.building.buildingStructure }}</el-descriptions-item>
            <el-descriptions-item label="建筑用途">{{ houseData.building.buildingPurpose }}</el-descriptions-item>
            <el-descriptions-item label="总单元数">{{ houseData.building.totalUnits }}</el-descriptions-item>
            <el-descriptions-item label="总楼层数">{{ houseData.building.totalFloors }}</el-descriptions-item>
            <el-descriptions-item label="地下层数">{{ houseData.building.undergroundFloors }}</el-descriptions-item>
            <el-descriptions-item label="总户数">{{ houseData.building.totalHouseholds }}</el-descriptions-item>
            <el-descriptions-item label="每层户数">{{ houseData.building.householdsPerFloor }}</el-descriptions-item>
            <el-descriptions-item label="建筑面积">{{ houseData.building.buildingArea }}</el-descriptions-item>
            <el-descriptions-item label="使用面积">{{ houseData.building.usableArea }}</el-descriptions-item>
            <el-descriptions-item label="公共面积">{{ houseData.building.publicArea }}</el-descriptions-item>
            <el-descriptions-item label="建造日期">{{ houseData.building.builtDate }}</el-descriptions-item>
            <el-descriptions-item label="验收日期">{{ houseData.building.acceptanceDate }}</el-descriptions-item>
            <el-descriptions-item label="交付日期">{{ houseData.building.deliveryDate }}</el-descriptions-item>
            <el-descriptions-item label="经度">{{ houseData.building.longitude }}</el-descriptions-item>
            <el-descriptions-item label="纬度">{{ houseData.building.latitude }}</el-descriptions-item>
            <el-descriptions-item label="楼栋地址">{{ houseData.building.buildingAddress }}</el-descriptions-item>
            <el-descriptions-item label="朝向">{{ houseData.building.orientation }}</el-descriptions-item>
            <el-descriptions-item label="是否有电梯">
              <el-tag v-if="houseData.building.hasElevator === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="电梯数量">{{ houseData.building.elevatorCount }}</el-descriptions-item>
            <el-descriptions-item label="楼梯数量">{{ houseData.building.stairCount }}</el-descriptions-item>
            <el-descriptions-item label="是否有地下停车场">
              <el-tag v-if="houseData.building.hasUndergroundParking === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="是否有屋顶">
              <el-tag v-if="houseData.building.hasRooftop === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="状态">{{ houseData.building.status }}</el-descriptions-item>
            <el-descriptions-item label="楼栋等级">{{ houseData.building.buildingGrade }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ houseData.building.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ houseData.building.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ houseData.building.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无楼栋信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="社区信息" name="community">
          <el-descriptions :column="2" border v-if="houseData.communityInfo">
            <el-descriptions-item label="社区ID">{{ houseData.communityInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="社区名称">{{ houseData.communityInfo.communityName }}</el-descriptions-item>
            <el-descriptions-item label="社区编码">{{ houseData.communityInfo.communityCode }}</el-descriptions-item>
            <el-descriptions-item label="省份">{{ houseData.communityInfo.province }}</el-descriptions-item>
            <el-descriptions-item label="城市">{{ houseData.communityInfo.city }}</el-descriptions-item>
            <el-descriptions-item label="区县">{{ houseData.communityInfo.district }}</el-descriptions-item>
            <el-descriptions-item label="区域编码">{{ houseData.communityInfo.areaCode }}</el-descriptions-item>
            <el-descriptions-item label="详细地址">{{ houseData.communityInfo.detailAddress }}</el-descriptions-item>
            <el-descriptions-item label="总楼栋数">{{ houseData.communityInfo.totalBuildings }}</el-descriptions-item>
            <el-descriptions-item label="总户数">{{ houseData.communityInfo.totalHouseholds }}</el-descriptions-item>
            <el-descriptions-item label="总面积">{{ houseData.communityInfo.totalArea }}</el-descriptions-item>
            <el-descriptions-item label="建筑面积">{{ houseData.communityInfo.buildingArea }}</el-descriptions-item>
            <el-descriptions-item label="停车面积">{{ houseData.communityInfo.parkingArea }}</el-descriptions-item>
            <el-descriptions-item label="绿化面积">{{ houseData.communityInfo.greenArea }}</el-descriptions-item>
            <el-descriptions-item label="公共面积">{{ houseData.communityInfo.publicArea }}</el-descriptions-item>
            <el-descriptions-item label="物业经理ID">{{ houseData.communityInfo.managerStaffId }}</el-descriptions-item>
            <el-descriptions-item label="物业经理姓名">{{ houseData.communityInfo.managerName }}</el-descriptions-item>
            <el-descriptions-item label="物业经理电话">{{ houseData.communityInfo.managerPhone }}</el-descriptions-item>
            <el-descriptions-item label="物业经理备注">{{ houseData.communityInfo.managerRemark }}</el-descriptions-item>
            <el-descriptions-item label="物业公司">{{ houseData.communityInfo.propertyCompany }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ houseData.communityInfo.contactPhone }}</el-descriptions-item>
            <el-descriptions-item label="建成年份">{{ houseData.communityInfo.builtYear }}</el-descriptions-item>
            <el-descriptions-item label="入住率">{{ houseData.communityInfo.occupancyRate }}%</el-descriptions-item>
            <el-descriptions-item label="状态">{{ houseData.communityInfo.status }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ houseData.communityInfo.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ houseData.communityInfo.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ houseData.communityInfo.updatedAt }}</el-descriptions-item>
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
import { houseApi } from '@/api/community'

export default {
  name: 'HouseComplexDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('house')

    const houseData = reactive({
      house: null,
      building: null,
      communityInfo: null
    })

    // 获取房屋综合详情
    const fetchHouseDetail = async (houseId) => {
      try {
        const res = await houseApi.getDetailsById(houseId)
        Object.assign(houseData, res.data)
      } catch (error) {
        ElMessage.error('获取房屋综合详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const houseId = route.params.id
      if (houseId) {
        fetchHouseDetail(houseId)
      }
    })

    return {
      activeTab,
      houseData,
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

.house-complex-detail {
  padding: 20px;
}
</style>