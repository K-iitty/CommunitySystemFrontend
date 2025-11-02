<template>
  <div class="meter-config-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>仪表配置详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="基本信息" name="basic">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="配置ID">{{ configData.id }}</el-descriptions-item>
            <el-descriptions-item label="分类名称">{{ configData.categoryName }}</el-descriptions-item>
            <el-descriptions-item label="仪表类型">{{ configData.meterType }}</el-descriptions-item>
            <el-descriptions-item label="产品ID">{{ configData.productId }}</el-descriptions-item>
            <el-descriptions-item label="配置参数">{{ configData.configParams }}</el-descriptions-item>
            <el-descriptions-item label="单位">{{ configData.unit }}</el-descriptions-item>
            <el-descriptions-item label="小数位数">{{ configData.decimalPlaces }}</el-descriptions-item>
            <el-descriptions-item label="最大值">{{ configData.maxValue }}</el-descriptions-item>
            <el-descriptions-item label="最小值">{{ configData.minValue }}</el-descriptions-item>
            <el-descriptions-item label="收费方式">{{ configData.chargeStandard }}</el-descriptions-item>
            <el-descriptions-item label="单价">{{ configData.unitPrice }}</el-descriptions-item>
            <el-descriptions-item label="计算方式">{{ configData.calculationMethod }}</el-descriptions-item>
            <el-descriptions-item label="通讯协议">{{ configData.commProtocol }}</el-descriptions-item>
            <el-descriptions-item label="状态">
              <el-tag v-if="configData.status === '启用'" type="success">启用</el-tag>
              <el-tag v-else type="info">{{ configData.status }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="是否默认">
              <el-tag v-if="configData.isDefault === 1" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="备注">{{ configData.remark }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ configData.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ configData.updatedAt }}</el-descriptions-item>
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
import { meterConfigApi } from '@/api/meter'

export default {
  name: 'MeterConfigDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('basic')

    const configData = reactive({
      id: null,
      categoryName: '',
      meterType: '',
      productId: '',
      configParams: '',
      unit: '',
      decimalPlaces: '',
      maxValue: '',
      minValue: '',
      chargeStandard: '',
      unitPrice: '',
      calculationMethod: '',
      commProtocol: '',
      status: '',
      isDefault: '',
      remark: '',
      createdAt: '',
      updatedAt: ''
    })

    // 获取配置详情
    const fetchConfigDetail = async (id) => {
      try {
        const res = await meterConfigApi.getById(id)
        Object.assign(configData, res.data)
      } catch (error) {
        ElMessage.error('获取配置详情失败')
        console.error(error)
      }
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      const configId = route.params.id
      if (configId) {
        fetchConfigDetail(configId)
      }
    })

    return {
      activeTab,
      configData,
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

.meter-config-detail {
  padding: 20px;
}
</style>