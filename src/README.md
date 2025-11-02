# 前端项目结构说明

## 项目结构

```
src/
├── api/                 # API接口封装
│   ├── http.js          # axios封装
│   ├── system.js        # 系统管理相关API
│   ├── community.js     # 社区管理相关API
│   ├── parking.js       # 停车管理相关API
│   ├── access.js        # 门禁管理相关API
│   ├── meter.js         # 仪表管理相关API
│   └── person.js        # 人员管理相关API
├── components/          # 公共组件
│   └── PaginationTable.vue  # 分页表格组件
├── views/               # 页面组件
│   ├── Login.vue        # 登录页面
│   ├── Layout.vue       # 主布局页面
│   ├── HomeView.vue     # 首页
│   ├── community/       # 社区管理模块
│   │   └── CommunityList.vue  # 社区信息列表页面
│   ├── building/        # 楼栋管理模块
│   ├── house/           # 房屋管理模块
│   ├── parking/         # 停车管理模块
│   ├── access/          # 门禁管理模块
│   ├── meter/           # 仪表管理模块
│   ├── person/          # 人员管理模块
│   └── knowledge/       # 知识库管理模块
├── router/              # 路由配置
│   └── index.js
├── utils/               # 工具类
├── assets/              # 静态资源
├── styles/              # 全局样式
└── store/               # 状态管理
```

## 功能模块

### 1. 系统管理
- 管理员登录/退出
- 系统权限控制

### 2. 社区管理
- 社区信息管理
- 楼栋信息管理
- 房屋信息管理

### 3. 停车管理
- 停车场信息管理
- 车位信息管理
- 车辆信息管理

### 4. 门禁管理
- 门禁设备管理
- 门禁记录管理

### 5. 仪表管理
- 仪表配置管理
- 仪表信息管理
- 抄表记录管理

### 6. 人员管理
- 员工信息管理
- 业主信息管理
- 部门信息管理
- 角色信息管理

### 7. 知识库管理
- 智能问答知识库管理

## 技术栈

- Vue 3 (Composition API)
- Element Plus
- Vue Router
- Axios
- Vite