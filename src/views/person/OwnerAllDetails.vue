<template>
  <div class="owner-all-details">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>业主综合信息详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="基本信息" name="owner">
          <el-descriptions :column="2" border v-if="ownerAllData.owner">
            <el-descriptions-item label="业主ID">{{ ownerAllData.owner.id }}</el-descriptions-item>
            <el-descriptions-item label="用户名">{{ ownerAllData.owner.username }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ ownerAllData.owner.name }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ ownerAllData.owner.phone }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ ownerAllData.owner.idCard }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ ownerAllData.owner.gender }}</el-descriptions-item>
            <el-descriptions-item label="出生日期">{{ ownerAllData.owner.birthDate }}</el-descriptions-item>
            <el-descriptions-item label="业主类型">{{ ownerAllData.owner.ownerType }}</el-descriptions-item>
            <el-descriptions-item label="政治面貌">{{ ownerAllData.owner.politicalStatus }}</el-descriptions-item>
            <el-descriptions-item label="婚姻状况">{{ ownerAllData.owner.maritalStatus }}</el-descriptions-item>
            <el-descriptions-item label="民族">{{ ownerAllData.owner.nationality }}</el-descriptions-item>
            <el-descriptions-item label="户籍类型">{{ ownerAllData.owner.householdType }}</el-descriptions-item>
            <el-descriptions-item label="户籍地址">{{ ownerAllData.owner.censusRegister }}</el-descriptions-item>
            <el-descriptions-item label="暂住证号">{{ ownerAllData.owner.temporaryResidentNo }}</el-descriptions-item>
            <el-descriptions-item label="现住址">{{ ownerAllData.owner.currentAddress }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系人">{{ ownerAllData.owner.emergencyContactName }}</el-descriptions-item>
            <el-descriptions-item label="与本人关系">{{ ownerAllData.owner.emergencyContactRelation }}</el-descriptions-item>
            <el-descriptions-item label="紧急联系电话">{{ ownerAllData.owner.emergencyContactPhone }}</el-descriptions-item>
            <el-descriptions-item label="居住类型">{{ ownerAllData.owner.residenceType }}</el-descriptions-item>
            <el-descriptions-item label="入住日期">{{ ownerAllData.owner.moveInDate }}</el-descriptions-item>
            <el-descriptions-item label="迁出日期">{{ ownerAllData.owner.moveOutDate }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ ownerAllData.owner.status }}</el-descriptions-item>
            <el-descriptions-item label="认证状态">{{ ownerAllData.owner.verifyStatus }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ ownerAllData.owner.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ ownerAllData.owner.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ ownerAllData.owner.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无业主基本信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="房屋拥有信息" name="houses">
          <el-table :data="ownerAllData.houses" border v-if="ownerAllData.houses && ownerAllData.houses.length > 0">
            <el-table-column prop="id" label="房屋ID" width="80" />
            <el-table-column prop="fullRoomNo" label="完整房号" width="150" />
            <el-table-column prop="houseCode" label="房屋编码" width="150" />
            <el-table-column prop="buildingArea" label="建筑面积" width="100" />
            <el-table-column prop="houseType" label="房屋类型" width="100" />
            <el-table-column prop="houseLayout" label="房屋户型" width="120" />
            <el-table-column prop="houseStatus" label="房屋状态" width="100" />
            <el-table-column prop="createdAt" label="创建时间" width="180" />
          </el-table>
          <el-empty description="暂无房屋拥有信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="车位所属信息" name="parkingSpaces">
          <el-table :data="ownerAllData.parkingSpaces" border v-if="ownerAllData.parkingSpaces && ownerAllData.parkingSpaces.length > 0">
            <el-table-column prop="id" label="车位ID" width="80" />
            <el-table-column prop="fullSpaceNo" label="完整车位号" width="150" />
            <el-table-column prop="spaceType" label="车位类型" width="100" />
            <el-table-column prop="spaceStatus" label="车位状态" width="100" />
            <el-table-column prop="monthlyFee" label="月租金" width="100" />
            <el-table-column prop="createdAt" label="创建时间" width="180" />
          </el-table>
          <el-empty description="暂无车位所属信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="车辆所属信息" name="vehicles">
          <el-table :data="ownerAllData.vehicles" border v-if="ownerAllData.vehicles && ownerAllData.vehicles.length > 0">
            <el-table-column prop="id" label="车辆ID" width="80" />
            <el-table-column prop="plateNumber" label="车牌号" width="120" />
            <el-table-column prop="vehicleType" label="车辆类型" width="100" />
            <el-table-column prop="brand" label="品牌" width="100" />
            <el-table-column prop="model" label="型号" width="120" />
            <el-table-column prop="color" label="颜色" width="80" />
            <el-table-column prop="status" label="状态" width="100" />
            <el-table-column prop="createdAt" label="创建时间" width="180" />
          </el-table>
          <el-empty description="暂无车辆所属信息" v-else />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ownerApi } from '@/api/person'

export default {
  name: 'OwnerAllDetails',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('owner')

    const ownerAllData = reactive({
      owner: null,
      houseOwners: [],
      houses: [],
      parkingSpaces: [],
      vehicles: []
    })

    // 获取业主综合详情
    const fetchOwnerAllDetails = async (ownerId) => {
      try {
        const res = await ownerApi.getAllDetailsById(ownerId)
        Object.assign(ownerAllData, res.data)
      } catch (error) {
        ElMessage.error('获取业主综合信息详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const ownerId = route.params.id
      if (ownerId) {
        fetchOwnerAllDetails(ownerId)
      }
    })

    return {
      activeTab,
      ownerAllData,
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

.owner-all-details {
  padding: 20px;
}
</style>