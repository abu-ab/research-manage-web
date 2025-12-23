<template>
  <div class="bg-white p-6 rounded shadow-sm max-w-4xl">
    <div class="text-lg font-bold mb-6">
      {{ isEdit ? '编辑项目' : '新增项目' }}
    </div>

    <el-form :model="form" label-width="120px">
      <el-form-item label="项目名称">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="项目性质">
        <el-select v-model="form.type">
          <el-option label="国家自然科学基金" value="NSFC" />
          <el-option label="863 项目" value="863" />
          <el-option label="部省科委项目" value="PROVINCE" />
        </el-select>
      </el-form-item>

      <el-form-item label="项目范围">
        <el-select v-model="form.scope">
          <el-option label="全国" value="NATIONAL" />
          <el-option label="国际" value="INTERNATIONAL" />
          <el-option label="地方" value="LOCAL" />
        </el-select>
      </el-form-item>

      <el-form-item label="项目负责人">
        <el-input v-model="form.leader" />
      </el-form-item>

      <el-form-item label="研究周期">
        <el-date-picker
          v-model="form.period"
          type="daterange"
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
  name: '',
  type: '',
  scope: '',
  leader: '',
  period: []
})

if (isEdit.value) {
  Object.assign(form, {
    name: '高校科研管理系统',
    type: 'NSFC',
    scope: 'NATIONAL',
    leader: '李四',
    period: ['2023-01-01', '2025-12-31']
  })
}

const submit = () => {
  router.push('/project')
}

const back = () => router.back()
</script>
