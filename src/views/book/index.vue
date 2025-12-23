<template>
  <div class="bg-white p-4 rounded shadow-sm">
    <!-- 标题 + 操作 -->
    <div class="flex justify-between mb-4">
      <div class="text-lg font-bold">著作管理</div>
      <el-button type="primary" @click="add">新增著作</el-button>
    </div>

    <!-- 查询条件 -->
    <div class="mb-4 flex gap-3">
      <el-input v-model="query.name" placeholder="著作名称" class="w-60" />
      <el-input v-model="query.author" placeholder="作者" class="w-60" />
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border>
      <el-table-column label="著作名称" prop="name" />
      <el-table-column label="作者" prop="author" />
      <el-table-column label="出版社" prop="publisher" />
      <el-table-column label="出版时间" prop="publishDate" />
      <el-table-column label="ISBN" prop="isbn" />
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
  author: ''
})

const list = [
  {
    id: 1,
    name: '软件工程导论',
    author: '张三',
    publisher: '清华大学出版社',
    publishDate: '2023-05-01',
    isbn: '978-7-302-12345-6'
  }
]

const add = () => {
  router.push('/book/edit')
}

const edit = (row) => {
  router.push(`/book/edit/${row.id}`)
}
</script>
