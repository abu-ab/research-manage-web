<template>
  <div class="bg-white p-6 rounded shadow-sm max-w-3xl">
    <div class="text-lg font-bold mb-6">
      {{ isEdit ? '编辑字典' : '新增字典' }}
    </div>

    <el-form :model="form" label-width="120px">
      <el-form-item label="字典类型">
        <el-input v-model="form.dictType" placeholder="如 project_type" />
      </el-form-item>

      <el-form-item label="字典编码">
        <el-input v-model="form.dictCode" placeholder="如 NSFC" />
      </el-form-item>

      <el-form-item label="字典值">
        <el-input v-model="form.dictLabel" />
      </el-form-item>

      <el-form-item label="排序">
        <el-input-number v-model="form.sort" :min="1" />
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="form.status" />
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
  dictType: '',
  dictCode: '',
  dictLabel: '',
  sort: 1,
  status: true
})

if (isEdit.value) {
  Object.assign(form, {
    dictType: 'project_type',
    dictCode: 'NSFC',
    dictLabel: '国家自然科学基金',
    sort: 1,
    status: true
  })
}

const submit = () => router.push('/dictionary')
const back = () => router.back()
</script>
