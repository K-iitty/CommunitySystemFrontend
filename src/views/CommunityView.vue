<template>
  <div class="community">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>社区功能</span>
        </div>
      </template>
      <div class="content">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card class="feature-card">
              <div class="feature-title">
                <el-icon><User /></el-icon>
                <span>用户管理</span>
              </div>
              <p>管理社区用户信息</p>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="feature-card">
              <div class="feature-title">
                <el-icon><ChatDotRound /></el-icon>
                <span>消息中心</span>
              </div>
              <p>处理社区消息和通知</p>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="feature-card">
              <div class="feature-title">
                <el-icon><Setting /></el-icon>
                <span>系统设置</span>
              </div>
              <p>配置社区系统参数</p>
            </el-card>
          </el-col>
        </el-row>
        <div style="margin-top: 20px;">
          <el-button type="primary" @click="loadCommunityData">加载社区数据</el-button>
          <el-button @click="clearData">清空数据</el-button>
        </div>
        <div v-if="communityData.length > 0" style="margin-top: 20px;">
          <el-table :data="communityData" style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="name" label="名称" width="180" />
            <el-table-column prop="description" label="描述" />
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { User, ChatDotRound, Setting } from '@element-plus/icons-vue'

export default {
  name: 'CommunityView',
  components: {
    User,
    ChatDotRound,
    Setting
  },
  data() {
    return {
      communityData: []
    }
  },
  methods: {
    loadCommunityData() {
      // 模拟数据加载
      this.communityData = [
        { id: 1, name: '用户管理模块', description: '用于管理社区用户信息' },
        { id: 2, name: '消息中心模块', description: '用于处理社区消息和通知' },
        { id: 3, name: '系统设置模块', description: '用于配置社区系统参数' }
      ]
      this.$message.success('数据加载成功')
    },
    clearData() {
      this.communityData = []
      this.$message.info('数据已清空')
    }
  }
}
</script>

<style scoped>
.feature-card {
  margin-bottom: 20px;
  text-align: center;
}

.feature-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.feature-title .el-icon {
  margin-right: 8px;
  font-size: 20px;
}
</style>