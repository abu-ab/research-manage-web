<template>
  <div class="login-container">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <div class="login-box card-shadow">
      <!-- 左侧品牌 -->
      <div class="login-left">
        <div class="brand-content">
          <div class="brand-icon">
            <el-icon size="48" color="white">
              <Management />
            </el-icon>
          </div>
          <h1>科研管理系统</h1>
          <p>Research Management System</p>
          <div class="features">
            <div class="feature-item">
              <el-icon><Check /></el-icon>
              <span>项目全生命周期管理</span>
            </div>
            <div class="feature-item">
              <el-icon><Check /></el-icon>
              <span>科研成果统计分析</span>
            </div>
            <div class="feature-item">
              <el-icon><Check /></el-icon>
              <span>智能数据可视化</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧表单 -->
      <div class="login-right">
        <div class="form-header">
          <h2>{{ activeTab === "login" ? "欢迎回来" : "创建账户" }}</h2>
          <p>
            {{ activeTab === "login" ? "请登录您的账户" : "请填写注册信息" }}
          </p>
        </div>

        <el-tabs v-model="activeTab" stretch class="login-tabs">
          <!-- 登录 -->
          <el-tab-pane name="login">
            <template #label>
              <span class="tab-label">
                <el-icon><User /></el-icon>
                登录
              </span>
            </template>

            <el-form
              ref="loginFormRef"
              :model="loginForm"
              :rules="loginRules"
              label-position="top"
              class="login-form"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="loginForm.username"
                  placeholder="请输入用户名"
                  size="large"
                  :prefix-icon="User"
                />
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  show-password
                  placeholder="请输入密码"
                  size="large"
                  :prefix-icon="Lock"
                />
              </el-form-item>

              <el-button
                type="primary"
                class="login-btn"
                size="large"
                :loading="loading"
                @click="handleLogin"
              >
                <el-icon v-if="!loading"><Right /></el-icon>
                {{ loading ? "登录中..." : "立即登录" }}
              </el-button>
            </el-form>
          </el-tab-pane>

          <!-- 注册 -->
          <el-tab-pane name="register">
            <template #label>
              <span class="tab-label">
                <el-icon><UserFilled /></el-icon>
                注册
              </span>
            </template>

            <el-form
              ref="registerFormRef"
              :model="registerForm"
              :rules="registerRules"
              label-position="top"
              class="login-form"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="registerForm.username"
                  placeholder="请输入用户名"
                  size="large"
                  :prefix-icon="User"
                />
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="registerForm.password"
                  type="password"
                  show-password
                  placeholder="请输入密码"
                  size="large"
                  :prefix-icon="Lock"
                />
              </el-form-item>

              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                  v-model="registerForm.confirmPassword"
                  type="password"
                  show-password
                  placeholder="请再次输入密码"
                  size="large"
                  :prefix-icon="Lock"
                />
              </el-form-item>

              <el-button
                type="primary"
                class="login-btn"
                size="large"
                :loading="loading"
                @click="handleRegister"
              >
                <el-icon v-if="!loading"><Plus /></el-icon>
                {{ loading ? "注册中..." : "立即注册" }}
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
import {
  Management,
  Check,
  User,
  UserFilled,
  Lock,
  Right,
  Plus,
} from "@element-plus/icons-vue";

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
      localStorage.setItem("user", JSON.stringify(res.data.user));
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 60%;
  animation-delay: 4s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.login-box {
  width: 900px;
  min-height: 520px;
  max-height: 90vh;
  background: #fff;
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.login-left {
  width: 45%;
  background: linear-gradient(135deg, #409eff 0%, #1890ff 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.brand-content {
  text-align: center;
  padding: 40px;
}

.brand-icon {
  margin-bottom: 20px;
}

.login-left h1 {
  font-size: 28px;
  margin-bottom: 8px;
  font-weight: 600;
}

.login-left p {
  opacity: 0.9;
  margin-bottom: 30px;
  font-size: 14px;
}

.features {
  text-align: left;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
}

.feature-item .el-icon {
  margin-right: 8px;
  color: #52c41a;
}

.login-right {
  width: 55%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h2 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 24px;
  font-weight: 600;
}

.form-header p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.login-tabs {
  flex: 1;
}

.tab-label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.login-form {
  margin-top: 20px;
}

.login-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  margin-top: 20px;
  background: linear-gradient(135deg, #409eff, #1890ff);
  border: none;
}

.login-btn:hover {
  background: linear-gradient(135deg, #1890ff, #409eff);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-box {
    width: 90%;
    min-height: auto;
    max-height: 90vh;
    flex-direction: column;
  }

  .login-left,
  .login-right {
    width: 100%;
  }

  .login-left {
    padding: 30px;
    min-height: 200px;
  }

  .login-right {
    max-height: 60vh;
    overflow-y: auto;
  }

  .brand-content {
    padding: 20px;
  }

  .features {
    display: none;
  }
}
</style>
