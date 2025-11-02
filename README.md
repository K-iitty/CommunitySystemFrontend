# 西安社区管理系统 - 前端项目

[![Vue](https://img.shields.io/badge/Vue-3.5.22-brightgreen)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.9-646cff)](https://vitejs.dev/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.11.4-409EFF)](https://element-plus.org/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

一个基于 **Vue 3**、**Vite** 和 **Element Plus** 构建的现代化社区管理系统前端应用。该项目提供完整的社区物业管理功能，包括社区管理、建筑物管理、住户管理、停车场管理、仪表管理、访问控制、工作人员管理等功能模块。

## 📋 目录

- [功能概述](#功能概述)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [开发指南](#开发指南)
- [API 集成](#api-集成)
- [路由说明](#路由说明)
- [组件库](#组件库)
- [常见问题](#常见问题)
- [贡献指南](#贡献指南)

## 🎯 功能概述

### 核心功能模块

#### 1. **社区管理**
   - 社区信息管理
   - 社区详情查看
   - 住户列表和信息
   - 通知公告管理
   - 通知详情查看

#### 2. **建筑物管理**
   - 建筑物列表展示
   - 建筑物详情管理
   - 楼栋与单位关系维护

#### 3. **住房管理**
   - 房屋列表管理
   - 房屋详情维护
   - 建筑综合体管理
   - 房屋与所有者关联

#### 4. **停车场管理**
   - 停车场列表及详情
   - 停车位管理
   - 车辆信息管理
   - 停车记录查询
   - 停车位状态追踪

#### 5. **仪表管理**
   - 仪表配置管理
   - 仪表信息维护
   - 仪表数据读取
   - 仪表与住户关联

#### 6. **访问控制**
   - 访问设备管理
   - 访问记录查询
   - 访问权限控制

#### 7. **人员管理**
   - 员工信息管理
   - 住户信息维护
   - 部门管理
   - 角色权限管理

#### 8. **系统管理**
   - 系统管理员管理
   - 管理日志查询
   - 审计追踪

#### 9. **知识库管理**
   - 知识文章管理
   - 知识内容维护

#### 10. **问题反馈**
   - 住户问题提交
   - 问题跟进管理
   - 问题处理流程

## 🛠 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Vue** | 3.5.22 | 前端框架 - Composition API |
| **Vite** | 7.1.9 | 构建工具 - 快速开发和生产构建 |
| **Vue Router** | 4.5.1 | 路由管理 - 单页应用路由 |
| **Element Plus** | 2.11.4 | UI 组件库 - 企业级 UI 组件 |
| **Axios** | 1.12.2 | HTTP 客户端 - API 请求 |
| **ECharts** | 6.0.0 | 数据可视化 - 图表展示 |

### 开发依赖

```json
{
  "@vitejs/plugin-vue": "^6.0.1",
  "@vitejs/plugin-vue-jsx": "^5.1.1"
}
```

## 📁 项目结构

```
CommunitySystem-Frontend/
├── src/
│   ├── api/                          # API 模块
│   │   ├── access.js                 # 访问控制 API
│   │   ├── adminLog.js               # 管理日志 API
│   │   ├── community.js              # 社区管理 API
│   │   ├── http.js                   # Axios 实例和拦截器
│   │   ├── issueFollowUp.js          # 问题跟进 API
│   │   ├── knowledge.js              # 知识库 API
│   │   ├── meter.js                  # 仪表管理 API
│   │   ├── notice.js                 # 通知公告 API
│   │   ├── ownerIssue.js             # 住户问题 API
│   │   ├── parking.js                # 停车场 API
│   │   ├── parkingRecord.js          # 停车记录 API
│   │   ├── person.js                 # 人员管理 API
│   │   └── system.js                 # 系统管理 API
│   │
│   ├── components/                   # 可复用组件
│   │   ├── ImageGallery.vue          # 图像库组件
│   │   ├── ImageUpload.vue           # 图像上传组件
│   │   └── PaginationTable.vue       # 分页表格组件
│   │
│   ├── views/                        # 页面视图
│   │   ├── Login.vue                 # 登录页面
│   │   ├── Layout.vue                # 主布局
│   │   ├── Dashboard.vue             # 仪表板主页
│   │   ├── HomeView.vue              # 首页
│   │   ├── AboutView.vue             # 关于页面
│   │   ├── CommunityView.vue         # 社区视图
│   │   │
│   │   ├── access/                   # 访问控制模块
│   │   │   ├── AccessDeviceList.vue
│   │   │   ├── AccessDeviceDetail.vue
│   │   │   ├── AccessRecordList.vue
│   │   │   └── AccessRecordDetail.vue
│   │   │
│   │   ├── building/                 # 建筑物模块
│   │   │   ├── BuildingList.vue
│   │   │   └── BuildingDetail.vue
│   │   │
│   │   ├── community/                # 社区管理模块
│   │   │   ├── CommunityList.vue
│   │   │   ├── CommunityDetail.vue
│   │   │   ├── HouseOwnerList.vue
│   │   │   ├── NoticeList.vue
│   │   │   └── NoticeDetail.vue
│   │   │
│   │   ├── house/                    # 房屋管理模块
│   │   │   ├── HouseList.vue
│   │   │   ├── HouseDetail.vue
│   │   │   └── HouseComplexDetail.vue
│   │   │
│   │   ├── issue/                    # 问题管理模块
│   │   │   ├── IssueFollowUpList.vue
│   │   │   ├── IssueFollowUpDetail.vue
│   │   │   ├── OwnerIssueList.vue
│   │   │   └── OwnerIssueDetail.vue
│   │   │
│   │   ├── knowledge/                # 知识库模块
│   │   │   └── KnowledgeList.vue
│   │   │
│   │   ├── meter/                    # 仪表管理模块
│   │   │   ├── MeterConfigList.vue
│   │   │   ├── MeterConfigDetail.vue
│   │   │   ├── MeterInfoList.vue
│   │   │   ├── MeterInfoDetail.vue
│   │   │   ├── MeterInfoComplexDetail.vue
│   │   │   ├── MeterReadingList.vue
│   │   │   ├── MeterReadingDetail.vue
│   │   │   └── MeterReadingMeterDetail.vue
│   │   │
│   │   ├── parking/                  # 停车场管理模块
│   │   │   ├── ParkingLotList.vue
│   │   │   ├── ParkingLotDetail.vue
│   │   │   ├── ParkingSpaceList.vue
│   │   │   ├── ParkingSpaceDetail.vue
│   │   │   ├── VehicleList.vue
│   │   │   ├── VehicleDetail.vue
│   │   │   ├── ParkingRecordList.vue
│   │   │   └── ParkingRecordDetail.vue
│   │   │
│   │   ├── person/                   # 人员管理模块
│   │   │   ├── StaffList.vue
│   │   │   ├── StaffDetail.vue
│   │   │   ├── OwnerList.vue
│   │   │   ├── OwnerDetail.vue
│   │   │   ├── OwnerAllDetails.vue
│   │   │   ├── OwnerMeterInfo.vue
│   │   │   ├── DepartmentList.vue
│   │   │   └── RoleList.vue
│   │   │
│   │   └── system/                   # 系统管理模块
│   │       ├── SystemAdminList.vue
│   │       └── AdminLogList.vue
│   │
│   ├── router/                       # 路由配置
│   │   └── index.js                  # 路由定义和路由守卫
│   │
│   ├── store/                        # 状态管理（如果使用 Pinia/Vuex）
│   │
│   ├── styles/                       # 全局样式
│   │
│   ├── utils/                        # 工具函数
│   │   └── fileUpload.js             # 文件上传工具
│   │
│   ├── assets/                       # 静态资源
│   │
│   ├── App.vue                       # 根组件
│   └── main.js                       # 应用入口文件
│
├── dist/                             # 生产构建输出
│
├── public/                           # 静态文件（如果存在）
│
├── index.html                        # HTML 模板
├── vite.config.js                    # Vite 配置文件
├── package.json                      # 项目依赖和脚本
├── package-lock.json                 # 依赖锁定文件
└── README.md                         # 本文件
```

## 🚀 快速开始

### 前置要求

- **Node.js**: 16.x 或更高版本
- **npm**: 7.x 或更高版本（或 yarn/pnpm）
- **后端 API 服务**: 运行在 `http://localhost:8080`

### 1. 克隆项目

```bash
git clone <repository-url>
cd CommunitySystem-Frontend
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境

确保后端 API 服务正在 `http://localhost:8080` 运行。如果需要修改 API 地址，编辑 `vite.config.js`:

```javascript
proxy: {
  '/api': {
    target: 'http://your-api-url:8080', // 修改为你的后端地址
    changeOrigin: true,
    rewrite: (path) => path
  }
}
```

### 4. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 5. 构建生产版本

```bash
npm run build
```

生产文件将生成在 `dist/` 目录中。

### 6. 预览生产构建

```bash
npm run serve
```

## 📖 开发指南

### 项目脚本

| 脚本 | 描述 |
|------|------|
| `npm run dev` | 启动开发服务器 (Vite) |
| `npm run build` | 构建生产版本 |
| `npm run serve` | 预览生产构建 |

### 代码风格

- 使用 Vue 3 Composition API
- 遵循 JavaScript/Vue 最佳实践
- 组件命名使用 PascalCase
- 文件命名使用 PascalCase（`.vue` 文件）

### 创建新页面/组件

#### 创建新页面

1. 在 `src/views/` 下创建相应目录（如 `src/views/newModule/`）
2. 创建 `.vue` 文件（如 `NewPageList.vue`）
3. 在 `src/router/index.js` 中添加路由配置

```javascript
{
  path: '/new-page',
  name: 'NewPageList',
  component: () => import('../views/newModule/NewPageList.vue'),
  meta: { requiresAuth: true }
}
```

#### 创建新组件

1. 在 `src/components/` 下创建 `.vue` 文件
2. 在需要的地方导入和使用

```vue
<script setup>
import MyComponent from '@/components/MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

### 创建新 API 模块

1. 在 `src/api/` 下创建新的 `.js` 文件（如 `newModule.js`）
2. 导入 HTTP 服务并创建 API 函数

```javascript
import service from './http'

export const getNewModuleList = (params) => {
  return service.get('/newModule/list', { params })
}

export const createNewModule = (data) => {
  return service.post('/newModule/create', data)
}

export const updateNewModule = (id, data) => {
  return service.put(`/newModule/${id}`, data)
}

export const deleteNewModule = (id) => {
  return service.delete(`/newModule/${id}`)
}
```

3. 在组件中使用

```javascript
import { getNewModuleList } from '@/api/newModule'

export default {
  setup() {
    const fetchData = async () => {
      const response = await getNewModuleList({ page: 1, pageSize: 10 })
      // 处理数据
    }
    return { fetchData }
  }
}
```

## 🔌 API 集成

### HTTP 拦截器

项目使用 Axios 配置了请求和响应拦截器（`src/api/http.js`）：

#### 请求拦截器

- 自动添加 `Authorization` 头
- 从 `localStorage` 读取 `adminToken`

```javascript
// 自动注入 Token
config.headers['Authorization'] = 'Bearer ' + token
```

#### 响应拦截器

- 根据返回码处理响应
- 处理 401（未授权）- 跳转登录
- 处理 403（禁止访问）
- 其他错误处理和提示

### API 响应格式

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    // 响应数据
  }
}
```

### 错误处理

所有 API 请求都通过响应拦截器处理，自动显示错误提示：

```javascript
// 错误会自动通过 ElMessage 显示
// 无需在组件中额外处理
```

## 🛣 路由说明

### 路由守卫

项目实现了基于 Token 的路由守卫：

```javascript
// 在 src/router/index.js 中
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('adminToken')
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})
```

### 主要路由

#### 公开路由
- `/login` - 登录页面

#### 受保护路由（需要认证）
- `/dashboard` - 仪表板
- `/community` - 社区管理
- `/building` - 建筑物管理
- `/house` - 房屋管理
- `/parking-*` - 停车场相关
- `/meter-*` - 仪表相关
- `/staff` - 员工管理
- `/owner` - 住户管理
- `/access-*` - 访问控制
- `/notice` - 通知公告
- `/issue-*` - 问题跟进
- `/system-admin` - 系统管理
- `/admin-log` - 管理日志

### 路由跳转示例

```javascript
// 导航到新路由
this.$router.push('/community')

// 带参数导航
this.$router.push({
  name: 'CommunityDetail',
  params: { id: 123 }
})

// 带查询参数
this.$router.push({
  path: '/community',
  query: { page: 2, searchText: 'test' }
})
```

## 🎨 组件库

### Element Plus 组件使用

项目集成了 Element Plus UI 组件库。常用组件：

| 组件 | 用途 | 文档 |
|------|------|------|
| `el-table` | 数据表格 | [文档](https://element-plus.org/en-US/component/table.html) |
| `el-form` | 表单 | [文档](https://element-plus.org/en-US/component/form.html) |
| `el-input` | 输入框 | [文档](https://element-plus.org/en-US/component/input.html) |
| `el-button` | 按钮 | [文档](https://element-plus.org/en-US/component/button.html) |
| `el-dialog` | 对话框 | [文档](https://element-plus.org/en-US/component/dialog.html) |
| `el-message` | 消息提示 | [文档](https://element-plus.org/en-US/component/message.html) |
| `el-pagination` | 分页 | [文档](https://element-plus.org/en-US/component/pagination.html) |
| `el-date-picker` | 日期选择 | [文档](https://element-plus.org/en-US/component/date-picker.html) |

### 自定义组件

#### ImageUpload (图像上传)
```vue
<script setup>
import ImageUpload from '@/components/ImageUpload.vue'
</script>

<template>
  <ImageUpload @upload="handleUpload" />
</template>
```

#### ImageGallery (图像库)
```vue
<script setup>
import ImageGallery from '@/components/ImageGallery.vue'
</script>

<template>
  <ImageGallery :images="imageList" />
</template>
```

#### PaginationTable (分页表格)
```vue
<script setup>
import PaginationTable from '@/components/PaginationTable.vue'
</script>

<template>
  <PaginationTable 
    :data="tableData" 
    :total="total"
    :page-size="pageSize"
    @page-change="handlePageChange"
  />
</template>
```

## ❓ 常见问题

### Q1: 如何添加新的 API 端点？

**A:** 在 `src/api/` 目录下创建相应的模块文件，导入 `http.js` 服务，然后定义 API 函数。

### Q2: 如何修改 API 基础 URL？

**A:** 编辑 `vite.config.js` 中的 proxy 配置或 `src/api/http.js` 中的 baseURL：

```javascript
// src/api/http.js
const service = axios.create({
  baseURL: 'http://your-api-url/api',
  timeout: 10000
})
```

### Q3: 如何在组件中使用全局状态管理？

**A:** 项目结构中包含 `src/store/` 目录。如果需要状态管理，可以使用 Pinia（推荐）或 Vuex。

### Q4: 如何处理登录和令牌管理？

**A:** 登录令牌存储在 `localStorage` 中的 `adminToken` 键。登录时保存，登出时清除：

```javascript
// 登录
localStorage.setItem('adminToken', token)

// 登出
localStorage.removeItem('adminToken')
router.push('/login')
```

### Q5: 如何调试 API 请求？

**A:** 在浏览器开发者工具的 Network 选项卡中查看请求和响应。所有请求都会自动包含认证令牌。

### Q6: 项目出现跨域问题怎么办？

**A:** 确保后端 API 启用了 CORS，或在 `vite.config.js` 的 proxy 配置中设置 `changeOrigin: true`（已默认配置）。

## 🤝 贡献指南

### 提交前的检查清单

- [ ] 代码遵循项目风格规范
- [ ] 测试新功能
- [ ] 更新相关文档
- [ ] 提交消息清晰明确

### 提交流程

1. 创建功能分支: `git checkout -b feature/新功能`
2. 提交更改: `git commit -am '添加新功能'`
3. 推送到分支: `git push origin feature/新功能`
4. 提交 Pull Request

## 📝 许可证

本项目采用 ISC 许可证。详见 [LICENSE](LICENSE) 文件。

## 📞 联系方式

如有问题或建议，请提交 Issue 或联系开发团队。

---

**最后更新**: 2024年
**版本**: 1.0.0