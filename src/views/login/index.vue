<template>
  <el-form :model="form" ref="formRef" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="form.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { loginApi } from '@/api/user';

const formRef = ref(null);
const form = reactive({
  username: '',
  password: ''
});

const login = async () => {
  try {
    const res = await loginApi(form);
    // 保存用户信息到 store 或 localStorage
    localStorage.setItem('user', JSON.stringify(res.data));
    ElMessage.success('登录成功');
    // 跳转首页
    window.location.href = '/';
  } catch {
    ElMessage.error('用户名或密码错误');
  }
};
</script>
