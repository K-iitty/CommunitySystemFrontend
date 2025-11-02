<template>
  <div class="about">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>关于我们</span>
        </div>
      </template>
      <div class="content">
        <h2>技术栈</h2>
        <ul>
          <li>Vue 3</li>
          <li>Element Plus</li>
          <li>Vue Router</li>
          <li>Axios</li>
          <li>Vite</li>
        </ul>
        <p>这是一个使用现代前端技术构建的纯前端项目。</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.content {
  text-align: left;
}

ul {
  text-align: left;
  display: inline-block;
}

li {
  margin: 10px 0;
}
</style>