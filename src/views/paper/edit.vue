<template>
  <div class="bg-white p-6 rounded shadow-sm max-w-4xl">
    <div class="text-lg font-bold mb-6">
      {{ isEdit ? '编辑论文' : '新增论文' }}
    </div>

    <el-form :model="form" label-width="120px">
      <el-form-item label="论文标题">
        <el-input v-model="form.title" />
      </el-form-item>

      <el-form-item label="作者">
        <el-input v-model="form.author" />
        <!-- 后续可替换为 Researcher 多选 -->
      </el-form-item>

      <el-form-item label="期刊名称">
        <el-input v-model="form.journal" />
      </el-form-item>

      <el-form-item label="检索来源">
        <el-select v-model="form.source">
          <el-option label="SCI" value="SCI" />
          <el-option label="EI" value="EI" />
          <el-option label="核心期刊" value="CORE" />
          <el-option label="一般期刊" value="NORMAL" />
        </el-select>
      </el-form-item>

      <el-form-item label="发表时间">
        <el-date-picker
          v-model="form.publishDate"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)

const form = reactive({
  title: '',
  author: '',
  journal: '',
  source: '',
  publishDate: ''
})

if (isEdit.value) {
  Object.assign(form, {
    title: '基于 Vue 的高校科研管理系统设计',
    author: '张三',
    journal: '计算机工程与应用',
    source: 'SCI',
    publishDate: '2024-03-15'
  })
}

const submit = () => router.push('/paper')
const back = () => router.back()
</script>
