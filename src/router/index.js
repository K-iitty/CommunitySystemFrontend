import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue'
import CommunityList from '../views/community/CommunityList.vue'
import BuildingList from '../views/building/BuildingList.vue'
import HouseList from '../views/house/HouseList.vue'
import ParkingLotList from '../views/parking/ParkingLotList.vue'
import ParkingSpaceList from '../views/parking/ParkingSpaceList.vue'
import VehicleList from '../views/parking/VehicleList.vue'
import AccessDeviceList from '../views/access/AccessDeviceList.vue'
import AccessRecordList from '../views/access/AccessRecordList.vue'
import MeterConfigList from '../views/meter/MeterConfigList.vue'
import MeterInfoList from '../views/meter/MeterInfoList.vue'
import MeterReadingList from '../views/meter/MeterReadingList.vue'
import StaffList from '../views/person/StaffList.vue'
import OwnerList from '../views/person/OwnerList.vue'
import DepartmentList from '../views/person/DepartmentList.vue'
import RoleList from '../views/person/RoleList.vue'
import KnowledgeList from '../views/knowledge/KnowledgeList.vue'
import NoticeList from '../views/community/NoticeList.vue'
import IssueFollowUpList from '../views/issue/IssueFollowUpList.vue'
import OwnerIssueList from '../views/issue/OwnerIssueList.vue'
import SystemAdminList from '../views/system/SystemAdminList.vue'
import ParkingRecordList from '../views/parking/ParkingRecordList.vue'
import AdminLogList from '../views/system/AdminLogList.vue'
import HouseOwnerList from '../views/community/HouseOwnerList.vue'
import HouseDetail from '../views/house/HouseDetail.vue'
import OwnerDetail from '../views/person/OwnerDetail.vue'
import OwnerMeterInfo from '../views/person/OwnerMeterInfo.vue'
import MeterInfoDetail from '../views/meter/MeterInfoDetail.vue'
import MeterConfigDetail from '../views/meter/MeterConfigDetail.vue'
import MeterReadingDetail from '../views/meter/MeterReadingDetail.vue'
import MeterReadingMeterDetail from '../views/meter/MeterReadingMeterDetail.vue'
import BuildingDetail from '../views/building/BuildingDetail.vue'
import HouseComplexDetail from '../views/house/HouseComplexDetail.vue'
import ParkingLotDetail from '../views/parking/ParkingLotDetail.vue'
import ParkingSpaceDetail from '../views/parking/ParkingSpaceDetail.vue'
import VehicleDetail from '../views/parking/VehicleDetail.vue'
import ParkingRecordDetail from '../views/parking/ParkingRecordDetail.vue'
import AccessDeviceDetail from '../views/access/AccessDeviceDetail.vue'
import AccessRecordDetail from '../views/access/AccessRecordDetail.vue'
import MeterInfoComplexDetail from '../views/meter/MeterInfoComplexDetail.vue'
import StaffDetail from '../views/person/StaffDetail.vue'
import OwnerAllDetails from '../views/person/OwnerAllDetails.vue'
import NoticeDetail from '../views/community/NoticeDetail.vue'
import OwnerIssueDetail from '../views/issue/OwnerIssueDetail.vue'
import IssueFollowUpDetail from '../views/issue/IssueFollowUpDetail.vue'
import CommunityDetail from '../views/community/CommunityDetail.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/community',
        name: 'CommunityList',
        component: CommunityList,
        meta: { requiresAuth: true }
      },
      {
        path: '/community-detail/:id',
        name: 'CommunityDetail',
        component: CommunityDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/building',
        name: 'BuildingList',
        component: BuildingList,
        meta: { requiresAuth: true }
      },
      {
        path: '/building-detail/:id',
        name: 'BuildingDetail',
        component: BuildingDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/house',
        name: 'HouseList',
        component: HouseList,
        meta: { requiresAuth: true }
      },
      {
        path: '/house-detail/:id',
        name: 'HouseDetail',
        component: HouseDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/house-complex-detail/:id',
        name: 'HouseComplexDetail',
        component: HouseComplexDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/house-owner',
        name: 'HouseOwnerList',
        component: HouseOwnerList,
        meta: { requiresAuth: true }
      },
      {
        path: '/parking-lot',
        name: 'ParkingLotList',
        component: ParkingLotList,
        meta: { requiresAuth: true }
      },
      {
        path: '/parking-lot-detail/:id',
        name: 'ParkingLotDetail',
        component: ParkingLotDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/parking-space',
        name: 'ParkingSpaceList',
        component: ParkingSpaceList,
        meta: { requiresAuth: true }
      },
      {
        path: '/parking-space-detail/:id',
        name: 'ParkingSpaceDetail',
        component: ParkingSpaceDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/vehicle',
        name: 'VehicleList',
        component: VehicleList,
        meta: { requiresAuth: true }
      },
      {
        path: '/vehicle-detail/:id',
        name: 'VehicleDetail',
        component: VehicleDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/access-device',
        name: 'AccessDeviceList',
        component: AccessDeviceList,
        meta: { requiresAuth: true }
      },
      {
        path: '/access-record',
        name: 'AccessRecordList',
        component: AccessRecordList,
        meta: { requiresAuth: true }
      },
      {
        path: '/access-record-detail/:id',
        name: 'AccessRecordDetail',
        component: AccessRecordDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/access-device-detail/:id',
        name: 'AccessDeviceDetail',
        component: AccessDeviceDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/meter-config',
        name: 'MeterConfigList',
        component: MeterConfigList,
        meta: { requiresAuth: true }
      },
      {
        path: '/meter-config-detail/:id',
        name: 'MeterConfigDetail',
        component: MeterConfigDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/meter-info',
        name: 'MeterInfoList',
        component: MeterInfoList,
        meta: { requiresAuth: true }
      },
      {
        path: '/meter-info-detail/:id',
        name: 'MeterInfoDetail',
        component: MeterInfoDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/meter-info-complex-detail/:id',
        name: 'MeterInfoComplexDetail',
        component: MeterInfoComplexDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/meter-reading',
        name: 'MeterReadingList',
        component: MeterReadingList,
        meta: { requiresAuth: true }
      },
      {
        path: '/meter-reading-detail/:id',
        name: 'MeterReadingDetail',
        component: MeterReadingDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/meter-reading-meter-detail/:id',
        name: 'MeterReadingMeterDetail',
        component: MeterReadingMeterDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/staff',
        name: 'StaffList',
        component: StaffList,
        meta: { requiresAuth: true }
      },
      {
        path: '/staff-detail/:id',
        name: 'StaffDetail',
        component: StaffDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/owner',
        name: 'OwnerList',
        component: OwnerList,
        meta: { requiresAuth: true }
      },
      {
        path: '/owner-detail/:id',
        name: 'OwnerDetail',
        component: OwnerDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/owner-meter-info/:ownerId',
        name: 'OwnerMeterInfo',
        component: OwnerMeterInfo,
        meta: { requiresAuth: true }
      },
      {
        path: '/owner-all-details/:id',
        name: 'OwnerAllDetails',
        component: OwnerAllDetails,
        meta: { requiresAuth: true }
      },
      {
        path: '/department',
        name: 'DepartmentList',
        component: DepartmentList,
        meta: { requiresAuth: true }
      },
      {
        path: '/role',
        name: 'RoleList',
        component: RoleList,
        meta: { requiresAuth: true }
      },
      {
        path: '/knowledge',
        name: 'KnowledgeList',
        component: KnowledgeList,
        meta: { requiresAuth: true }
      },
      {
        path: '/notice',
        name: 'NoticeList',
        component: NoticeList,
        meta: { requiresAuth: true }
      },
      {
        path: '/notice-detail/:id',
        name: 'NoticeDetail',
        component: NoticeDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/issue-follow-up',
        name: 'IssueFollowUpList',
        component: IssueFollowUpList,
        meta: { requiresAuth: true }
      },
      {
        path: '/issue-follow-up-detail/:id',
        name: 'IssueFollowUpDetail',
        component: IssueFollowUpDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/owner-issue',
        name: 'OwnerIssueList',
        component: OwnerIssueList,
        meta: { requiresAuth: true }
      },
      {
        path: '/owner-issue-detail/:id',
        name: 'OwnerIssueDetail',
        component: OwnerIssueDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/system-admin',
        name: 'SystemAdminList',
        component: SystemAdminList,
        meta: { requiresAuth: true }
      },
      {
        path: '/parking-record',
        name: 'ParkingRecordList',
        component: ParkingRecordList,
        meta: { requiresAuth: true }
      },
      {
        path: '/parking-record-detail/:id',
        name: 'ParkingRecordDetail',
        component: ParkingRecordDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/admin-log',
        name: 'AdminLogList',
        component: AdminLogList,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  // 检查要前往的路由是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检查是否存在token
    const token = localStorage.getItem('adminToken')
    if (token) {
      // 如果有token，允许访问
      next()
    } else {
      // 如果没有token，重定向到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    // 如果不需要认证，直接访问
    next()
  }
})

export default router