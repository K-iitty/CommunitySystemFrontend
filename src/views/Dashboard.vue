<template>
  <div class="dashboard">
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon community-icon">
              <el-icon><OfficeBuilding /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-title">社区总数</div>
              <div class="stat-number">{{ stats.communityCount }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon building-icon">
              <el-icon><House /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-title">楼栋总数</div>
              <div class="stat-number">{{ stats.buildingCount }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon house-icon">
              <el-icon><HomeFilled /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-title">房屋总数</div>
              <div class="stat-number">{{ stats.houseCount }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon owner-icon">
              <el-icon><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-title">业主总数</div>
              <div class="stat-number">{{ stats.ownerCount }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="charts-row">
      <el-col :span="16">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>社区房屋统计</span>
            </div>
          </template>
          <div class="chart-container" ref="chartContainer">
            <!-- 图表将在这里渲染 -->
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>近期操作</span>
            </div>
          </template>
          <div class="recent-operations">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp"
                :color="activity.color"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="tables-row">
      <el-col :span="12">
        <el-card class="table-card owner-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">最新业主</span>
              <span class="total-count">共 {{ ownerPagination.total }} 位</span>
            </div>
          </template>
          <el-table 
            :data="recentOwners" 
            style="width: 100%; height: 100%"
            class="owner-table"
            stripe
            :row-class-name="rowClassName"
          >
            <el-table-column prop="name" label="姓名" min-width="80" show-overflow-tooltip />
            <el-table-column prop="phone" label="电话" min-width="110" show-overflow-tooltip />
            <el-table-column prop="ownerType" label="业主类型" min-width="90">
              <template #default="scope">
                <el-tag 
                  :type="scope.row.ownerType === '产权人' ? 'success' : 'info'"
                  size="small"
                >
                  {{ scope.row.ownerType }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="80">
              <template #default="scope">
                <el-tag v-if="scope.row.status === '正常'" type="success" size="small">正常</el-tag>
                <el-tag v-else type="warning" size="small">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" min-width="160" show-overflow-tooltip>
              <template #default="scope">
                <span class="time-text">{{ scope.row.createdAt }}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="ownerPagination.pageNum"
              v-model:page-size="ownerPagination.pageSize"
              :page-sizes="[5, 10, 15, 20]"
              :total="ownerPagination.total"
              layout="total, sizes, prev, pager, next"
              @current-change="fetchRecentOwners"
              @size-change="fetchRecentOwners"
              small
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="table-card">
          <template #header>
            <div class="card-header">
              <span>待处理事项</span>
            </div>
          </template>
          <el-table :data="pendingTasks" style="width: 100%">
            <el-table-column prop="issueTitle" label="问题标题" />
            <el-table-column prop="issueType" label="问题类型" width="100" />
            <el-table-column prop="contactPhone" label="联系电话" width="130" />
            <el-table-column prop="reportedTime" label="上报时间" width="180" />
            <el-table-column label="紧急程度" width="100">
              <template #default="scope">
                <el-tag v-if="scope.row.urgencyLevel === '紧急'" type="danger">紧急</el-tag>
                <el-tag v-else-if="scope.row.urgencyLevel === '高'" type="warning">高</el-tag>
                <el-tag v-else-if="scope.row.urgencyLevel === '一般'" type="info">一般</el-tag>
                <el-tag v-else type="info">低</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template #default="scope">
                <el-button size="small" type="primary" @click="handleTask">处理</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import { OfficeBuilding, House, HomeFilled, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import http from '@/api/http'
import { ownerApi } from '@/api/person'
import * as echarts from 'echarts'

export default {
  name: 'Dashboard',
  components: {
    OfficeBuilding,
    House,
    HomeFilled,
    User
  },
  setup() {
    const router = useRouter()
    // 统计数据
    const stats = ref({
      communityCount: 0,
      buildingCount: 0,
      houseCount: 0,
      ownerCount: 0
    })

    // 图表实例
    let chart = null
    const chartContainer = ref(null)

    // 近期活动
    const activities = ref([
      {
        content: '新增社区信息 - 阳光小区',
        timestamp: '2023-06-01 10:30',
        color: '#0bbd87'
      },
      {
        content: '更新楼栋信息 - 1号楼',
        timestamp: '2023-06-01 09:45',
        color: '#409eff'
      },
      {
        content: '处理业主投诉',
        timestamp: '2023-05-31 16:20',
        color: '#e6a23c'
      },
      {
        content: '新增业主信息',
        timestamp: '2023-05-31 14:15',
        color: '#0bbd87'
      }
    ])

    // 最新业主
    const recentOwners = ref([])
    const ownerPagination = reactive({
      pageNum: 1,
      pageSize: 5,
      total: 0
    })

    // 待处理事项
    const pendingTasks = ref([])

    // 获取统计数据
    const fetchStats = async () => {
      try {
        const [communityRes, buildingRes, houseRes, ownerRes] = await Promise.all([
          http.get('/community/count'),
          http.get('/building/count'),
          http.get('/house/count'),
          http.get('/owner/count')
        ])
        
        stats.value.communityCount = communityRes.data
        stats.value.buildingCount = buildingRes.data
        stats.value.houseCount = houseRes.data
        stats.value.ownerCount = ownerRes.data
      } catch (error) {
        console.error('获取统计数据失败:', error)
      }
    }

    // 获取社区统计信息并绘制图表
    const fetchCommunityStats = async () => {
      try {
        const res = await http.get('/community/statistics')
        const communityData = res.data
        
        // 准备图表数据
        const communityNames = communityData.map(item => item.communityName)
        const houseCounts = communityData.map(item => item.houseCount)
        const ownerCounts = communityData.map(item => item.ownerCount)
        const vehicleCounts = communityData.map(item => item.vehicleCount)
        
        // 初始化图表
        if (chartContainer.value) {
          if (chart) {
            chart.dispose()
          }
          chart = echarts.init(chartContainer.value)
          
          // 图表配置
          const option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['房屋数量', '业主数量', '车辆数量'],
              top: '2%'  // 将图例移到顶部
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              top: '15%',  // 增加顶部边距，为图例留出空间
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: communityNames
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '房屋数量',
                type: 'bar',
                barGap: 0,
                data: houseCounts,
                itemStyle: {
                  color: '#409eff'
                }
              },
              {
                name: '业主数量',
                type: 'bar',
                data: ownerCounts,
                itemStyle: {
                  color: '#67c23a'
                }
              },
              {
                name: '车辆数量',
                type: 'bar',
                data: vehicleCounts,
                itemStyle: {
                  color: '#e6a23c'
                }
              }
            ]
          }
          
          // 设置图表选项并渲染
          chart.setOption(option)
        }
      } catch (error) {
        console.error('获取社区统计数据失败:', error)
      }
    }

    // 获取待处理事项
    const fetchPendingTasks = async () => {
      try {
        const res = await http.get('/ownerIssue/pending/page')
        pendingTasks.value = res.data || []
      } catch (error) {
        console.error('获取待处理事项失败:', error)
      }
    }
    
    // 点击处理按钮，跳转到业主问题分页表格页面
    const handleTask = () => {
      router.push('/owner-issue')
    }

    // 获取最新业主列表
    const fetchRecentOwners = async () => {
      try {
        const res = await ownerApi.latestPage({
          pageNum: ownerPagination.pageNum,
          pageSize: ownerPagination.pageSize
        })
        recentOwners.value = res.data || []
        ownerPagination.total = res.total || 0
      } catch (error) {
        console.error('获取最新业主失败:', error)
      }
    }

    // 窗口大小改变时重置图表大小
    const resizeChart = () => {
      if (chart) {
        chart.resize()
      }
    }

    // 表格行样式
    const rowClassName = ({ rowIndex }) => {
      return 'owner-table-row'
    }

    onMounted(() => {
      fetchStats()
      fetchCommunityStats()
      fetchPendingTasks() // 获取待处理事项
      fetchRecentOwners() // 获取最新业主
      window.addEventListener('resize', resizeChart)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeChart)
      if (chart) {
        chart.dispose()
      }
    })

    return {
      stats,
      chartContainer,
      activities,
      recentOwners,
      ownerPagination,
      pendingTasks,
      handleTask,
      rowClassName
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.stats-row {
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.stat-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 24px;
}

.community-icon {
  background-color: #e8f4ff;
  color: #409eff;
}

.building-icon {
  background-color: #f0f9eb;
  color: #67c23a;
}

.house-icon {
  background-color: #fdf6ec;
  color: #e6a23c;
}

.owner-icon {
  background-color: #f4f4f5;
  color: #909399;
}

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: 14px;
  color: #606266;
  margin-bottom: 5px;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.charts-row {
  margin-bottom: 20px;
}

.chart-card,
.table-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  height: 300px;
  width: 100%;
}

.recent-operations {
  height: 300px;
  overflow-y: auto;
}

.tables-row .el-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.owner-card .el-card__header {
  padding-bottom: 15px;
}

.owner-card .card-title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin-right: 10px;
}

.owner-card .total-count {
  font-size: 14px;
  color: #909399;
}

.owner-table .el-table__row {
  height: 50px; /* 设置行高 */
}

.owner-table .el-table__cell {
  padding: 0 5px; /* 调整单元格内边距 */
}

.owner-table .el-table__cell .time-text {
  font-size: 12px; /* 调整时间文本字体大小 */
  color: #909399;
}

.owner-card .pagination-wrapper {
  margin-top: 15px;
  text-align: right;
}
</style>