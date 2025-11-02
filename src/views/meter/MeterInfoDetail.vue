<template>
  <div class="meter-info-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>仪表信息详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="基本信息" name="basic">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="仪表ID">{{ meterData.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ meterData.communityId }}</el-descriptions-item>
            <el-descriptions-item label="房屋ID">{{ meterData.houseId }}</el-descriptions-item>
            <el-descriptions-item label="配置ID">{{ meterData.configId }}</el-descriptions-item>
            <el-descriptions-item label="仪表名称">{{ meterData.meterName }}</el-descriptions-item>
            <el-descriptions-item label="分类名称">{{ meterData.categoryName }}</el-descriptions-item>
            <el-descriptions-item label="仪表类型">{{ meterData.meterType }}</el-descriptions-item>
            <el-descriptions-item label="仪表编码">{{ meterData.meterCode }}</el-descriptions-item>
            <el-descriptions-item label="仪表序列号">{{ meterData.meterSn }}</el-descriptions-item>
            <el-descriptions-item label="位置类型">{{ meterData.locationType }}</el-descriptions-item>
            <el-descriptions-item label="安装位置">{{ meterData.installLocation }}</el-descriptions-item>
            <el-descriptions-item label="安装日期">{{ meterData.installDate }}</el-descriptions-item>
            <el-descriptions-item label="初始读数">{{ meterData.initialReading }}</el-descriptions-item>
            <el-descriptions-item label="当前读数">{{ meterData.currentReading }}</el-descriptions-item>
            <el-descriptions-item label="最大读数">{{ meterData.maxReading }}</el-descriptions-item>
            <el-descriptions-item label="总用量">{{ meterData.totalUsage }}</el-descriptions-item>
            <el-descriptions-item label="单位">{{ meterData.unit }}</el-descriptions-item>
            <el-descriptions-item label="收费方式">{{ meterData.chargeStandard }}</el-descriptions-item>
            <el-descriptions-item label="在线状态">
              <el-tag v-if="meterData.onlineStatus === 1" type="success">在线</el-tag>
              <el-tag v-else type="info">离线</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="电源状态">
              <el-tag v-if="meterData.powerStatus === 1" type="success">供电</el-tag>
              <el-tag v-else type="info">断电</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="仪表状态">{{ meterData.meterStatus }}</el-descriptions-item>
            <el-descriptions-item label="通讯地址">{{ meterData.commAddress }}</el-descriptions-item>
            <el-descriptions-item label="最后通讯时间">{{ meterData.lastCommTime }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ meterData.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ meterData.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ meterData.updatedAt }}</el-descriptions-item>
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
import { meterInfoApi } from '@/api/meter'

export default {
  name: 'MeterInfoDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('basic')

    const meterData = reactive({
      id: null,
      communityId: '',
      houseId: '',
      buildingId: '',
      configId: '',
      meterName: '',
      categoryName: '',
      meterType: '',
      meterCode: '',
      meterSn: '',
      locationType: '',
      installLocation: '',
      installDate: '',
      initialReading: '',
      currentReading: '',
      maxReading: '',
      totalUsage: '',
      unit: '',
      chargeStandard: '',
      onlineStatus: '',
      powerStatus: '',
      meterStatus: '',
      commAddress: '',
      lastCommTime: '',
      remark: '',
      createdAt: '',
      updatedAt: ''
    })

    // 获取仪表详情
    const fetchMeterInfoDetail = async (id) => {
      try {
        const res = await meterInfoApi.getById(id)
        Object.assign(meterData, res.data)
      } catch (error) {
        ElMessage.error('获取仪表详情失败')
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
      meterData,
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

.meter-info-detail {
  padding: 20px;
}
</style>