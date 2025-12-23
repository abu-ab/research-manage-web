<template>
  <div class="bg-white p-4 rounded shadow-sm">
    <!-- 标题 -->
    <div class="flex justify-between mb-4">
      <div class="text-lg font-bold">科研项目管理</div>
      <el-button type="primary" @click="add">新增项目</el-button>
    </div>

    <!-- 查询条件 -->
    <div class="mb-4 flex gap-3 flex-wrap">
      <el-input v-model="query.name" placeholder="项目名称" class="w-60" />
      <el-select v-model="query.type" placeholder="项目性质" class="w-60">
        <el-option label="国家自然科学基金" value="NSFC" />
        <el-option label="863 项目" value="863" />
      </el-select>
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border>
      <el-table-column label="项目名称" prop="name" />
      <el-table-column label="项目性质" prop="typeLabel" />
      <el-table-column label="项目范围" prop="scopeLabel" />
      <el-table-column label="负责人" prop="leader" />
      <el-table-column label="研究周期" width="220">
        <template #default="{ row }">
          {{ row.startDate }} ~ {{ row.endDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button link type="primary" @click="edit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const query = reactive({
  name: '',
  type: ''
})

const list = [
  {
    id: 1,
    name: '高校科研管理系统',
    type: 'NSFC',
    typeLabel: '国家自然科学基金',
    scope: 'NATIONAL',
    scopeLabel: '全国',
    leader: '李四',
    startDate: '2023-01-01',
    endDate: '2025-12-31'
  }
]

const add = () => router.push('/project/edit')
const edit = (row) => router.push(`/project/edit/${row.id}`)
</script>
