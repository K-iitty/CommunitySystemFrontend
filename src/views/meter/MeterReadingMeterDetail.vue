<template>
  <div class="meter-reading-meter-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>仪表信息详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="仪表信息" name="meterInfo">
          <el-descriptions :column="2" border v-if="meterData.meterInfo">
            <el-descriptions-item label="仪表ID">{{ meterData.meterInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="社区ID">{{ meterData.meterInfo.communityId }}</el-descriptions-item>
            <el-descriptions-item label="房屋ID">{{ meterData.meterInfo.houseId }}</el-descriptions-item>
            <el-descriptions-item label="配置ID">{{ meterData.meterInfo.configId }}</el-descriptions-item>
            <el-descriptions-item label="仪表名称">{{ meterData.meterInfo.meterName }}</el-descriptions-item>
            <el-descriptions-item label="分类名称">{{ meterData.meterInfo.categoryName }}</el-descriptions-item>
            <el-descriptions-item label="仪表类型">{{ meterData.meterInfo.meterType }}</el-descriptions-item>
            <el-descriptions-item label="仪表编码">{{ meterData.meterInfo.meterCode }}</el-descriptions-item>
            <el-descriptions-item label="仪表序列号">{{ meterData.meterInfo.meterSn }}</el-descriptions-item>
            <el-descriptions-item label="位置类型">{{ meterData.meterInfo.locationType }}</el-descriptions-item>
            <el-descriptions-item label="安装位置">{{ meterData.meterInfo.installLocation }}</el-descriptions-item>
            <el-descriptions-item label="安装日期">{{ meterData.meterInfo.installDate }}</el-descriptions-item>
            <el-descriptions-item label="初始读数">{{ meterData.meterInfo.initialReading }}</el-descriptions-item>
            <el-descriptions-item label="当前读数">{{ meterData.meterInfo.currentReading }}</el-descriptions-item>
            <el-descriptions-item label="最大读数">{{ meterData.meterInfo.maxReading }}</el-descriptions-item>
            <el-descriptions-item label="总用量">{{ meterData.meterInfo.totalUsage }}</el-descriptions-item>
            <el-descriptions-item label="单位">{{ meterData.meterInfo.unit }}</el-descriptions-item>
            <el-descriptions-item label="收费方式">{{ meterData.meterInfo.chargeStandard }}</el-descriptions-item>
            <el-descriptions-item label="在线状态">
              <el-tag v-if="meterData.meterInfo.onlineStatus === 1" type="success">在线</el-tag>
              <el-tag v-else type="info">离线</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="电源状态">
              <el-tag v-if="meterData.meterInfo.powerStatus === 1" type="success">供电</el-tag>
              <el-tag v-else type="info">断电</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="仪表状态">{{ meterData.meterInfo.meterStatus }}</el-descriptions-item>
            <el-descriptions-item label="通讯地址">{{ meterData.meterInfo.commAddress }}</el-descriptions-item>
            <el-descriptions-item label="最后通讯时间">{{ meterData.meterInfo.lastCommTime }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ meterData.meterInfo.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ meterData.meterInfo.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ meterData.meterInfo.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无仪表信息" v-else />
        </el-tab-pane>

        <el-tab-pane label="仪表配置信息" name="meterConfig">
          <el-descriptions :column="2" border v-if="meterData.meterConfig">
            <el-descriptions-item label="配置ID">{{ meterData.meterConfig.id }}</el-descriptions-item>
            <el-descriptions-item label="分类名称">{{ meterData.meterConfig.categoryName }}</el-descriptions-item>
            <el-descriptions-item label="仪表类型">{{ meterData.meterConfig.meterType }}</el-descriptions-item>
            <el-descriptions-item label="产品ID">{{ meterData.meterConfig.productId }}</el-descriptions-item>
            <el-descriptions-item label="配置参数">{{ meterData.meterConfig.configParams }}</el-descriptions-item>
            <el-descriptions-item label="单位">{{ meterData.meterConfig.unit }}</el-descriptions-item>
            <el-descriptions-item label="小数位数">{{ meterData.meterConfig.decimalPlaces }}</el-descriptions-item>
            <el-descriptions-item label="最大值">{{ meterData.meterConfig.maxValue }}</el-descriptions-item>
            <el-descriptions-item label="最小值">{{ meterData.meterConfig.minValue }}</el-descriptions-item>
            <el-descriptions-item label="收费方式">{{ meterData.meterConfig.chargeStandard }}</el-descriptions-item>
            <el-descriptions-item label="单价">{{ meterData.meterConfig.unitPrice }}</el-descriptions-item>
            <el-descriptions-item label="计算方式">{{ meterData.meterConfig.calculationMethod }}</el-descriptions-item>
            <el-descriptions-item label="通讯协议">{{ meterData.meterConfig.commProtocol }}</el-descriptions-item>
            <el-descriptions-item label="状态">
              <el-tag v-if="meterData.meterConfig.status === '启用'" type="success">启用</el-tag>
              <el-tag v-else type="info">{{ meterData.meterConfig.status }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="是否默认">
              <el-tag v-if="meterData.meterConfig.isDefault === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="备注">{{ meterData.meterConfig.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ meterData.meterConfig.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ meterData.meterConfig.updatedAt }}</el-descriptions-item>
          </el-descriptions>
          <el-empty description="暂无仪表配置信息" v-else />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { meterReadingApi } from '@/api/meter'

export default {
  name: 'MeterReadingMeterDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('meterInfo')

    const meterData = reactive({
      meterInfo: null,
      meterConfig: null
    })

    // 获取仪表详情
    const fetchMeterDetail = async (meterId) => {
      try {
        const res = await meterReadingApi.getMeterDetailsByMeterId(meterId)
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
        fetchMeterDetail(meterId)
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

.meter-reading-meter-detail {
  padding: 20px;
}
</style>