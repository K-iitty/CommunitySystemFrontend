<template>
  <div class="owner-meter-info">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>业主仪表信息</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="仪表信息" name="meters">
          <el-table :data="meterData.meters" style="width: 100%" v-loading="loading">
            <el-table-column prop="id" label="仪表ID" width="80">
              <template #default="scope">
                <el-link type="primary" @click="viewMeterDetail(scope.row.id)">{{ scope.row.id }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="meterName" label="仪表名称" width="120" />
            <el-table-column prop="categoryName" label="分类名称" width="100" />
            <el-table-column prop="meterType" label="仪表类型" width="120" />
            <el-table-column prop="meterCode" label="仪表编码" width="120" />
            <el-table-column prop="locationType" label="位置类型" width="100" />
            <el-table-column prop="installLocation" label="安装位置" width="150" />
            <el-table-column prop="currentReading" label="当前读数" width="120" />
            <el-table-column prop="meterStatus" label="仪表状态" width="100">
              <template #default="scope">
                <el-tag v-if="scope.row.meterStatus === '正常'" type="success">正常</el-tag>
                <el-tag v-else type="info">{{ scope.row.meterStatus }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" width="180" />
          </el-table>
          <el-empty description="暂无仪表信息" v-if="meterData.meters && meterData.meters.length === 0 && !loading" />
        </el-tab-pane>

        <el-tab-pane label="仪表配置信息" name="configs">
          <el-table :data="meterData.meterConfigs" style="width: 100%" v-loading="loading">
            <el-table-column prop="id" label="配置ID" width="80">
              <template #default="scope">
                <el-link type="primary" @click="viewMeterConfigDetail(scope.row.id)">{{ scope.row.id }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="categoryName" label="分类名称" width="120" />
            <el-table-column prop="meterType" label="仪表类型" width="120" />
            <el-table-column prop="unit" label="单位" width="100" />
            <el-table-column prop="decimalPlaces" label="小数位数" width="100" />
            <el-table-column prop="chargeStandard" label="收费方式" width="120" />
            <el-table-column prop="unitPrice" label="单价" width="100" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="scope">
                <el-tag v-if="scope.row.status === '启用'" type="success">启用</el-tag>
                <el-tag v-else type="info">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" width="180" />
          </el-table>
          <el-empty description="暂无仪表配置信息" v-if="meterData.meterConfigs && meterData.meterConfigs.length === 0 && !loading" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ownerMeterApi } from '@/api/meter'

export default {
  name: 'OwnerMeterInfo',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('meters')
    const loading = ref(false)

    const meterData = reactive({
      meters: [],
      meterConfigs: []
    })

    // 获取业主仪表信息
    const fetchOwnerMeterInfo = async (ownerId) => {
      try {
        loading.value = true
        const res = await ownerMeterApi.getByOwnerId(ownerId)
        meterData.meters = res.data.meters || []
        meterData.meterConfigs = res.data.meterConfigs || []
      } catch (error) {
        ElMessage.error('获取业主仪表信息失败')
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    // 查看仪表详情
    const viewMeterDetail = (meterId) => {
      // 跳转到仪表信息列表并传递参数
      router.push({ name: 'MeterInfoList', query: { id: meterId } })
    }

    // 查看仪表配置详情
    const viewMeterConfigDetail = (configId) => {
      // 跳转到仪表配置列表并传递参数
      router.push({ name: 'MeterConfigList', query: { id: configId } })
    }

    onMounted(() => {
      const ownerId = route.params.ownerId
      if (ownerId) {
        fetchOwnerMeterInfo(ownerId)
      }
    })

    return {
      activeTab,
      loading,
      meterData,
      goBack,
      viewMeterDetail,
      viewMeterConfigDetail
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

.owner-meter-info {
  padding: 20px;
}
</style>