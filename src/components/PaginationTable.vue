<template>
  <div class="pagination-table">
    <!-- 搜索和筛选区域 -->
    <div class="filter-container">
      <slot name="filter"></slot>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
    </div>

    <!-- 表格区域 -->
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      highlight-current-row
      style="width: 100%"
      class="custom-table"
      size="default"
      :default-sort="defaultSort"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <el-table-column type="selection" width="55" v-if="showSelection"></el-table-column>
      <slot></slot>
      <el-table-column label="操作" width="150" v-if="showActions">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="pagination.pageNum"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, inject, ref } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'PaginationTable',
  props: {
    // 获取数据的API函数
    apiFunction: {
      type: Function,
      required: true
    },
    // 搜索数据的API函数
    searchApiFunction: {
      type: Function,
      default: null
    },
    // 是否显示多选框
    showSelection: {
      type: Boolean,
      default: false
    },
    // 是否显示操作列
    showActions: {
      type: Boolean,
      default: true
    }
  },
  emits: ['edit', 'delete', 'selection-change'],
  setup(props, { emit }) {
    // 获取父组件提供的搜索表单数据
    const searchForm = inject('searchForm', {})
    
    // 表格数据
    const tableData = reactive([])
    
    // 加载状态
    const loading = ref(false)
    
    // 默认排序配置
    const defaultSort = {
      prop: 'id',
      order: 'ascending'
    }
    
    // 分页和排序信息
    const pagination = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 0,
      orderBy: 'id', // 排序字段 - 默认按id排序
      orderType: 'asc' // 排序类型(asc/desc) - 默认升序
    })
    
    // 获取数据
    const fetchData = async () => {
      try {
        loading.value = true
        const params = {
          pageNum: pagination.pageNum,
          pageSize: pagination.pageSize,
          orderBy: pagination.orderBy,
          orderType: pagination.orderType,
          ...searchForm
        }
        
        // 检查API函数是否存在
        if (!props.apiFunction) {
          console.error('PaginationTable: apiFunction is not provided')
          return
        }
        
        let res
        // 如果有搜索API函数且搜索表单中有非空值，则使用搜索API
        if (props.searchApiFunction && hasSearchConditions(searchForm)) {
          res = await props.searchApiFunction(params)
        } else {
          // 否则使用普通分页API
          res = await props.apiFunction(params)
        }
        
        // 检查响应数据
        if (!res || !res.data) {
          console.error('PaginationTable: Invalid response data', res)
          return
        }
        
        tableData.length = 0
        tableData.push(...res.data)
        pagination.total = res.total || 0
      } catch (error) {
        console.error('获取数据失败:', error)
        ElMessage.error('获取数据失败: ' + (error.message || '未知错误'))
      } finally {
        loading.value = false
      }
    }
    
    // 检查是否有搜索条件
    const hasSearchConditions = (form) => {
      return Object.values(form).some(value => value !== '' && value !== null && value !== undefined)
    }
    
    // 处理排序变化
    const handleSortChange = ({ column, prop, order }) => {
      if (prop && order) {
        pagination.orderBy = prop
        // element-plus的排序顺序: ascending -> asc, descending -> desc
        pagination.orderType = order === 'ascending' ? 'asc' : 'desc'
      } else {
        pagination.orderBy = ''
        pagination.orderType = ''
      }
      fetchData()
    }
    
    // 处理页码变化
    const handleCurrentChange = (val) => {
      pagination.pageNum = val
      fetchData()
    }
    
    // 处理页面大小变化
    const handleSizeChange = (val) => {
      pagination.pageSize = val
      pagination.pageNum = 1
      fetchData()
    }
    
    // 处理搜索
    const handleSearch = () => {
      pagination.pageNum = 1
      fetchData()
    }
    
    // 处理重置
    const handleReset = () => {
      // 清空搜索条件
      Object.keys(searchForm).forEach(key => {
        searchForm[key] = ''
      })
      pagination.pageNum = 1
      fetchData()
    }
    
    // 处理编辑
    const handleEdit = (row) => {
      emit('edit', row)
    }
    
    // 处理删除
    const handleDelete = (row) => {
      emit('delete', row)
    }
    
    // 处理多选变化
    const handleSelectionChange = (selection) => {
      emit('selection-change', selection)
    }
    
    // 组件挂载时获取数据
    onMounted(() => {
      fetchData()
    })
    
    return {
      tableData,
      loading,
      pagination,
      fetchData,
      handleCurrentChange,
      handleSizeChange,
      handleSearch,
      handleReset,
      handleEdit,
      handleDelete,
      handleSelectionChange,
      handleSortChange,
      defaultSort
    }
  }
}
</script>

<style scoped>
.filter-container {
  padding: 15px;
  background-color: #f9f9f9;
  margin-bottom: 15px;
  border-radius: 4px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>

<style>
/* 强制设置表格行高为100px */
.custom-table .el-table__row,
.custom-table .el-table__header th {
  height: 100px !important;
  line-height: 100px !important;
}

.custom-table .el-table__row td,
.custom-table .el-table__header th {
  padding: 0 !important;
  height: 100px !important;
}

.custom-table .el-table__body-wrapper {
  min-height: auto !important;
}

.custom-table .cell {
  line-height: normal !important;
  padding: 8px 12px !important;
  font-size: 14px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 50px; /* 保证最小高度以适应tiny尺寸的图片 */
  display: flex;
  align-items: center;
  height: 100px !important;
}

/* 操作按钮样式 */
.custom-table .el-button--small {
  padding: 6px 10px !important;
  font-size: 13px !important;
  height: 28px !important;
  margin: 2px 0 !important;
}
</style>