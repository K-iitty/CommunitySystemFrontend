<template>
  <div class="home">
    <el-card class="welcome-card">
      <template #header>
        <div class="card-header">
          <span>欢迎使用社区管理系统</span>
        </div>
      </template>
      <div class="content">
        <h1>社区管理系统</h1>
        <p>这是一个基于Vue 3、Element Plus、Vue Router和Axios构建的前端项目</p>
        <el-button type="primary" @click="fetchData">测试Axios请求</el-button>
        <div v-if="responseData" class="response-data">
          <h3>请求响应数据:</h3>
          <pre>{{ responseData }}</pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      responseData: null
    }
  },
  methods: {
    async fetchData() {
      try {
        // 这里只是一个示例，实际项目中应该替换为真实的API地址
        // 由于是演示，我们使用一个公共API
        const response = await this.$http.get('https://jsonplaceholder.typicode.com/users/1')
        this.responseData = response.data
      } catch (error) {
        console.error('请求失败:', error)
        this.$message.error('请求失败: ' + error.message)
      }
    }
  }
}
</script>

<style scoped>
.welcome-card {
  max-width: 800px;
  margin: 0 auto;
}

.content {
  text-align: center;
}

.response-data {
  margin-top: 20px;
  text-align: left;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
}
</style>