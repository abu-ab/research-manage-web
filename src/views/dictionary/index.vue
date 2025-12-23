<template>
  <div class="bg-white p-4 rounded shadow-sm">
    <!-- 标题 -->
    <div class="flex justify-between mb-4">
      <div class="text-lg font-bold">数据字典管理</div>
      <el-button type="primary" @click="add">新增字典</el-button>
    </div>

    <!-- 查询 -->
    <div class="mb-4 flex gap-3 flex-wrap">
      <el-input v-model="query.type" placeholder="字典类型" class="w-60" />
      <el-input v-model="query.label" placeholder="字典值" class="w-60" />
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border>
      <el-table-column label="字典类型" prop="dictType" />
      <el-table-column label="字典编码" prop="dictCode" />
      <el-table-column label="字典值" prop="dictLabel" />
      <el-table-column label="排序" prop="sort" width="80" />
      <el-table-column label="状态" width="80">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'info'">
            {{ row.status ? '启用' : '停用' }}
          </el-tag>
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
  type: '',
  label: ''
})

const list = [
  {
    id: 1,
    dictType: 'project_type',
    dictCode: 'NSFC',
    dictLabel: '国家自然科学基金',
    sort: 1,
    status: true
  },
  {
    id: 2,
    dictType: 'paper_source',
    dictCode: 'SCI',
    dictLabel: 'SCI',
    sort: 1,
    status: true
  }
]

const add = () => router.push('/dictionary/edit')
const edit = (row) => router.push(`/dictionary/edit/${row.id}`)
</script>
