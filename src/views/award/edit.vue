<template>
  <div class="bg-white p-6 rounded shadow-sm max-w-3xl">
    <div class="text-lg font-bold mb-6">
      {{ isEdit ? '编辑奖项' : '新增奖项' }}
    </div>

    <el-form :model="form" label-width="100px">
      <el-form-item label="奖项名称">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="奖项级别">
        <el-select v-model="form.level">
          <el-option label="国家级" value="国家级" />
          <el-option label="省级" value="省级" />
        </el-select>
      </el-form-item>

      <el-form-item label="获奖时间">
        <el-date-picker v-model="form.date" />
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
  level: '',
  date: ''
})

const submit = () => router.push('/award')
const back = () => router.back()
</script>
