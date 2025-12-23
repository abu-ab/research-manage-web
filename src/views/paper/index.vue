<template>
  <div class="bg-white p-4 rounded shadow-sm">
    <!-- 标题 -->
    <div class="flex justify-between mb-4">
      <div class="text-lg font-bold">期刊论文管理</div>
      <el-button type="primary" @click="add">新增论文</el-button>
    </div>

    <!-- 查询 -->
    <div class="mb-4 flex gap-3 flex-wrap">
      <el-input v-model="query.title" placeholder="论文标题" class="w-60" />
      <el-input v-model="query.author" placeholder="作者" class="w-48" />
      <el-select v-model="query.source" placeholder="检索来源" class="w-48">
        <el-option label="SCI" value="SCI" />
        <el-option label="EI" value="EI" />
        <el-option label="核心期刊" value="CORE" />
      </el-select>
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border>
      <el-table-column label="论文标题" prop="title" />
      <el-table-column label="作者" prop="author" />
      <el-table-column label="期刊名称" prop="journal" />
      <el-table-column label="检索来源" prop="sourceLabel" />
      <el-table-column label="发表时间" prop="publishDate" />
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
  title: '',
  author: '',
  source: ''
})

const list = [
  {
    id: 1,
    title: '基于 Vue 的高校科研管理系统设计',
    author: '张三',
    journal: '计算机工程与应用',
    source: 'SCI',
    sourceLabel: 'SCI',
    publishDate: '2024-03-15'
  }
]

const add = () => router.push('/paper/edit')
const edit = (row) => router.push(`/paper/edit/${row.id}`)
</script>
