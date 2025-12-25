<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 左侧品牌 -->
      <div class="login-left">
        <h1>科研管理系统</h1>
        <p>Research Management System</p>
      </div>

      <!-- 右侧表单 -->
      <div class="login-right">
        <el-tabs v-model="activeTab" stretch>
          <!-- 登录 -->
          <el-tab-pane label="登录" name="login">
            <el-form
              ref="loginFormRef"
              :model="loginForm"
              :rules="loginRules"
              label-position="top"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="loginForm.username"
                  placeholder="请输入用户名"
                />
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  show-password
                  placeholder="请输入密码"
                />
              </el-form-item>

              <el-button
                type="primary"
                class="w-full"
                :loading="loading"
                @click="handleLogin"
              >
                登录
              </el-button>
            </el-form>
          </el-tab-pane>

          <!-- 注册 -->
          <el-tab-pane label="注册" name="register">
            <el-form
              ref="registerFormRef"
              :model="registerForm"
              :rules="registerRules"
              label-position="top"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="registerForm.username"
                  placeholder="请输入用户名"
                />
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="registerForm.password"
                  type="password"
                  show-password
                  placeholder="请输入密码"
                />
              </el-form-item>

              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                  v-model="registerForm.confirmPassword"
                  type="password"
                  show-password
                  placeholder="请再次输入密码"
                />
              </el-form-item>

              <el-button
                type="primary"
                class="w-full"
                :loading="loading"
                @click="handleRegister"
              >
                注册
              </el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { login, register } from "@/api/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const activeTab = ref("login");
const loading = ref(false);

/* ===== 登录 ===== */
const loginFormRef = ref(null);
const loginForm = reactive({
  username: "",
  password: "",
});

const loginRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const handleLogin = () => {
  loginFormRef.value.validate(async (valid) => {
    if (!valid) return;

    try {
      loading.value = true;
      const res = await login(loginForm);
      localStorage.setItem("token", res.data.token);
      ElMessage.success("登录成功");
      router.push("/");
    } catch (e) {
      // ElMessage.error("登录失败");
    } finally {
      loading.value = false;
    }
  });
};

/* ===== 注册 ===== */
const registerFormRef = ref(null);
const registerForm = reactive({
  username: "",
  password: "",
  confirmPassword: "",
});

const registerRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      validator: (_, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

const handleRegister = () => {
  registerFormRef.value.validate(async (valid) => {
    if (!valid) return;

    try {
      loading.value = true;
      await register(registerForm);
      ElMessage.success("注册成功，请登录");
      activeTab.value = "login";
    } catch (e) {
      ElMessage.error("注册失败");
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  background: linear-gradient(135deg, #409eff, #66b1ff);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  width: 820px;
  height: 420px;
  background: #fff;
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.login-left {
  width: 45%;
  background: #409eff;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-left h1 {
  font-size: 28px;
  margin-bottom: 12px;
}

.login-left p {
  opacity: 0.9;
}

.login-right {
  width: 55%;
  padding: 40px;
}
</style>
