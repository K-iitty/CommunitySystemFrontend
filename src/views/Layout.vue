<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside width="200px" class="sidebar">
      <div class="logo">社区管理系统</div>
      <el-menu
        :default-active="activeMenu"
        class="sidebar-menu"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        router
        :collapse="isCollapse"
      >
        <el-menu-item index="/dashboard">
          <el-icon><Tickets /></el-icon>
          <span>工作台</span>
        </el-menu-item>
        
        <el-sub-menu index="1">
          <template #title>
            <el-icon><House /></el-icon>
            <span>社区管理</span>
          </template>
          <el-menu-item index="/community">社区信息</el-menu-item>
          <el-menu-item index="/building">楼栋信息</el-menu-item>
          <el-menu-item index="/house">房屋信息</el-menu-item>
          <el-menu-item index="/house-owner">房屋业主关联</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><OfficeBuilding /></el-icon>
            <span>停车管理</span>
          </template>
          <el-menu-item index="/parking-lot">停车场信息</el-menu-item>
          <el-menu-item index="/parking-space">车位信息</el-menu-item>
          <el-menu-item index="/vehicle">车辆信息</el-menu-item>
          <el-menu-item index="/parking-record">停车记录</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>门禁管理</span>
          </template>
          <el-menu-item index="/access-device">门禁设备</el-menu-item>
          <el-menu-item index="/access-record">门禁记录</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="4">
          <template #title>
            <el-icon><DataLine /></el-icon>
            <span>仪表管理</span>
          </template>
          <el-menu-item index="/meter-config">仪表配置</el-menu-item>
          <el-menu-item index="/meter-info">仪表信息</el-menu-item>
          <el-menu-item index="/meter-reading">抄表记录</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="5">
          <template #title>
            <el-icon><User /></el-icon>
            <span>人员管理</span>
          </template>
          <el-menu-item index="/staff">员工信息</el-menu-item>
          <el-menu-item index="/owner">业主信息</el-menu-item>
          <el-menu-item index="/department">部门信息</el-menu-item>
          <el-menu-item index="/role">角色信息</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="6">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>知识库管理</span>
          </template>
          <el-menu-item index="/knowledge">知识库信息</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="7">
          <template #title>
            <el-icon><Bell /></el-icon>
            <span>公告管理</span>
          </template>
          <el-menu-item index="/notice">社区公告</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="8">
          <template #title>
            <el-icon><Help /></el-icon>
            <span>问题管理</span>
          </template>
          <el-menu-item index="/issue-follow-up">问题跟进</el-menu-item>
          <el-menu-item index="/owner-issue">业主问题</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="9">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/system-admin">管理员管理</el-menu-item>
          <el-menu-item index="/admin-log">操作日志</el-menu-item>
        </el-sub-menu>


      </el-menu>
    </el-aside>

    <!-- 主体区域 -->
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <div class="header-left">
          <!-- <el-button @click="toggleCollapse" class="collapse-button" icon="Expand" /> -->
        </div>
        <div style="display: flex; float: right;" class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="user-info">
              <el-avatar :size="30" icon="UserFilled" />
              <span class="username">{{ userInfo.realName || '管理员' }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 内容区域 -->
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { House, OfficeBuilding, Monitor, DataLine, User, Document, Expand, UserFilled, Bell, Help, Setting, Tickets } from '@element-plus/icons-vue'
import { systemAdminApi } from '@/api/system'

export default {
  name: 'Layout',
  components: {
    House,
    OfficeBuilding,
    Monitor,
    DataLine,
    User,
    Document,
    Expand,
    UserFilled,
    Bell,
    Help,
    Setting,
    Tickets
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isCollapse = ref(false)
    const userInfo = reactive({
      id: '',
      username: '',
      realName: '',
      email: '',
      roleType: '',
      status: ''
    })
    
    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    
    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value
    }
    
    // 获取当前用户信息
    const getUserInfo = async () => {
      try {
        const res = await systemAdminApi.getInfo()
        Object.assign(userInfo, res.data)
      } catch (error) {
        console.error('获取用户信息失败:', error)
      }
    }
    
    const handleCommand = (command) => {
      if (command === 'logout') {
        // 执行退出登录操作
        systemAdminApi.logout().finally(() => {
          // 清除本地存储的token
          localStorage.removeItem('adminToken')
          // 跳转到登录页
          router.push('/login')
        })
      }
    }
    
    // 页面加载时获取用户信息
    onMounted(() => {
      getUserInfo()
    })
    
    return {
      activeMenu,
      isCollapse,
      toggleCollapse,
      handleCommand,
      userInfo
    }
  }
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.sidebar {
  background-color: #304156;
  transition: width 0.3s;
}

.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  background-color: #2d3e50;
}

.sidebar-menu {
  border: none;
  height: calc(100% - 60px);
}

.sidebar-menu:not(.el-menu--collapse) {
  width: 200px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  padding: 0 20px;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin-left: 10px;
  font-size: 14px;
}

.main {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>