<template>
  <div
    class="change-password-page bg-white p-6 rounded shadow-sm max-w-md mx-auto mt-12"
  >
    <h2 class="text-xl font-bold mb-6">修改密码</h2>

    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="120px"
      size="medium"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model="form.oldPassword"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { changePassword } from "@/api/auth";
import { useRouter } from "vue-router";
const router = useRouter();

const formRef = ref(null);

const form = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const rules = {
  oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 6, message: "密码至少6位", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    {
      validator: (rule, value) => {
        if (value !== form.newPassword) {
          return Promise.reject("两次输入的密码不一致");
        }
        return Promise.resolve();
      },
      trigger: "blur",
    },
  ],
};

const resetForm = () => {
  form.oldPassword = "";
  form.newPassword = "";
  form.confirmPassword = "";
  if (formRef.value) formRef.value.clearValidate();
};

const submit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;
    try {
      await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      ElMessage.success("密码修改成功，请重新登录");
      resetForm();
      localStorage.removeItem("token");
      router.push("/login");
    } catch (e) {
      ElMessage.error(e.response?.data?.message || "修改密码失败");
    }
  });
};
</script>

<style scoped>
.change-password-page {
  min-height: 60vh;
}
</style>
