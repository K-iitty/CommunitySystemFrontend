<template>
  <div class="building-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>楼栋信息详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="楼栋信息" name="building">
          <el-descriptions :column="2" border v-if="buildingData.building">
            <el-descriptions-item label="楼栋ID">{{ buildingData.building.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ buildingData.building.communityId }}</el-descriptions-item>
            <el-descriptions-item label="楼栋编号">{{ buildingData.building.buildingNo }}</el-descriptions-item>
            <el-descriptions-item label="楼栋名称">{{ buildingData.building.buildingName }}</el-descriptions-item>
            <el-descriptions-item label="楼栋别名">{{ buildingData.building.buildingAlias }}</el-descriptions-item>
            <el-descriptions-item label="单元编号">{{ buildingData.building.unitNo }}</el-descriptions-item>
            <el-descriptions-item label="单元名称">{{ buildingData.building.unitName }}</el-descriptions-item>
            <el-descriptions-item label="建筑类型">{{ buildingData.building.buildingType }}</el-descriptions-item>
            <el-descriptions-item label="建筑结构">{{ buildingData.building.buildingStructure }}</el-descriptions-item>
            <el-descriptions-item label="建筑用途">{{ buildingData.building.buildingPurpose }}</el-descriptions-item>
            <el-descriptions-item label="总单元数">{{ buildingData.building.totalUnits }}</el-descriptions-item>
            <el-descriptions-item label="总楼层数">{{ buildingData.building.totalFloors }}</el-descriptions-item>
            <el-descriptions-item label="地下层数">{{ buildingData.building.undergroundFloors }}</el-descriptions-item>
            <el-descriptions-item label="总户数">{{ buildingData.building.totalHouseholds }}</el-descriptions-item>
            <el-descriptions-item label="每层户数">{{ buildingData.building.householdsPerFloor }}</el-descriptions-item>
            <el-descriptions-item label="建筑面积">{{ buildingData.building.buildingArea }}</el-descriptions-item>
            <el-descriptions-item label="使用面积">{{ buildingData.building.usableArea }}</el-descriptions-item>
            <el-descriptions-item label="公共面积">{{ buildingData.building.publicArea }}</el-descriptions-item>
            <el-descriptions-item label="建造日期">{{ buildingData.building.builtDate }}</el-descriptions-item>
            <el-descriptions-item label="验收日期">{{ buildingData.building.acceptanceDate }}</el-descriptions-item>
            <el-descriptions-item label="交付日期">{{ buildingData.building.deliveryDate }}</el-descriptions-item>
            <el-descriptions-item label="经度">{{ buildingData.building.longitude }}</el-descriptions-item>
            <el-descriptions-item label="纬度">{{ buildingData.building.latitude }}</el-descriptions-item>
            <el-descriptions-item label="楼栋地址">{{ buildingData.building.buildingAddress }}</el-descriptions-item>
            <el-descriptions-item label="朝向">{{ buildingData.building.orientation }}</el-descriptions-item>
            <el-descriptions-item label="是否有电梯">
              <el-tag v-if="buildingData.building.hasElevator === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="电梯数量">{{ buildingData.building.elevatorCount }}</el-descriptions-item>
            <el-descriptions-item label="楼梯数量">{{ buildingData.building.stairCount }}</el-descriptions-item>
            <el-descriptions-item label="是否有地下停车场">
              <el-tag v-if="buildingData.building.hasUndergroundParking === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="是否有屋顶">
              <el-tag v-if="buildingData.building.hasRooftop === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="状态">{{ buildingData.building.status }}</el-descriptions-item>
            <el-descriptions-item label="楼栋等级">{{ buildingData.building.buildingGrade }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ buildingData.building.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ buildingData.building.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ buildingData.building.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无楼栋信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="社区信息" name="community">
          <el-descriptions :column="2" border v-if="buildingData.communityInfo">
            <el-descriptions-item label="社区ID">{{ buildingData.communityInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="社区名称">{{ buildingData.communityInfo.communityName }}</el-descriptions-item>
            <el-descriptions-item label="社区编码">{{ buildingData.communityInfo.communityCode }}</el-descriptions-item>
            <el-descriptions-item label="省份">{{ buildingData.communityInfo.province }}</el-descriptions-item>
            <el-descriptions-item label="城市">{{ buildingData.communityInfo.city }}</el-descriptions-item>
            <el-descriptions-item label="区县">{{ buildingData.communityInfo.district }}</el-descriptions-item>
            <el-descriptions-item label="区域编码">{{ buildingData.communityInfo.areaCode }}</el-descriptions-item>
            <el-descriptions-item label="详细地址">{{ buildingData.communityInfo.detailAddress }}</el-descriptions-item>
            <el-descriptions-item label="总楼栋数">{{ buildingData.communityInfo.totalBuildings }}</el-descriptions-item>
            <el-descriptions-item label="总户数">{{ buildingData.communityInfo.totalHouseholds }}</el-descriptions-item>
            <el-descriptions-item label="总面积">{{ buildingData.communityInfo.totalArea }}</el-descriptions-item>
            <el-descriptions-item label="建筑面积">{{ buildingData.communityInfo.buildingArea }}</el-descriptions-item>
            <el-descriptions-item label="停车面积">{{ buildingData.communityInfo.parkingArea }}</el-descriptions-item>
            <el-descriptions-item label="绿化面积">{{ buildingData.communityInfo.greenArea }}</el-descriptions-item>
            <el-descriptions-item label="公共面积">{{ buildingData.communityInfo.publicArea }}</el-descriptions-item>
            <el-descriptions-item label="物业经理ID">{{ buildingData.communityInfo.managerStaffId }}</el-descriptions-item>
            <el-descriptions-item label="物业经理姓名">{{ buildingData.communityInfo.managerName }}</el-descriptions-item>
            <el-descriptions-item label="物业经理电话">{{ buildingData.communityInfo.managerPhone }}</el-descriptions-item>
            <el-descriptions-item label="物业经理备注">{{ buildingData.communityInfo.managerRemark }}</el-descriptions-item>
            <el-descriptions-item label="物业公司">{{ buildingData.communityInfo.propertyCompany }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ buildingData.communityInfo.contactPhone }}</el-descriptions-item>
            <el-descriptions-item label="建成年份">{{ buildingData.communityInfo.builtYear }}</el-descriptions-item>
            <el-descriptions-item label="入住率">{{ buildingData.communityInfo.occupancyRate }}%</el-descriptions-item>
            <el-descriptions-item label="状态">{{ buildingData.communityInfo.status }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ buildingData.communityInfo.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ buildingData.communityInfo.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ buildingData.communityInfo.updatedAt }}</el-descriptions-item>
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
import { buildingApi } from '@/api/community'

export default {
  name: 'BuildingDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('building')

    const buildingData = reactive({
      building: null,
      communityInfo: null
    })

    // 获取楼栋详情
    const fetchBuildingDetail = async (buildingId) => {
      try {
        const res = await buildingApi.getDetailsById(buildingId)
        Object.assign(buildingData, res.data)
      } catch (error) {
        ElMessage.error('获取楼栋详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const buildingId = route.params.id
      if (buildingId) {
        fetchBuildingDetail(buildingId)
      }
    })

    return {
      activeTab,
      buildingData,
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

.building-detail {
  padding: 20px;
}
</style>