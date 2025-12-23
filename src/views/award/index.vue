<template>
  <div class="bg-white p-4 rounded shadow-sm">
    <div class="flex justify-between mb-4">
      <div class="text-lg font-bold">奖项管理</div>
      <el-button type="primary" @click="add">新增奖项</el-button>
    </div>

    <el-table :data="list" border>
      <el-table-column label="奖项名称" prop="name" />
      <el-table-column label="获奖级别" prop="level" />
      <el-table-column label="获奖时间" prop="date" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button link type="primary" @click="edit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const list = [
  { id: 1, name: '优秀科研奖', level: '省级', date: '2024-06-01' }
]

const add = () => router.push('/award/edit')
const edit = row => router.push(`/award/edit/${row.id}`)
</script>
