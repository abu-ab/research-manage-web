<template>
  <el-container class="h-screen">
    <!-- 左侧菜单 -->
    <el-aside width="260px" class="sidebar">
      <!-- Logo区域 -->
      <div class="logo-area">
        <div class="logo-icon">
          <el-icon size="32" color="#409EFF">
            <Management />
          </el-icon>
        </div>
        <div class="logo-text">
          <h3>科研管理系统</h3>
          <p>Research Management</p>
        </div>
      </div>

      <!-- 菜单 -->
      <el-menu 
        router 
        class="sidebar-menu" 
        default-active="/dashboard"
        :collapse="false"
        background-color="#001529"
        text-color="#ffffff"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/dashboard" class="menu-item">
          <el-icon><Odometer /></el-icon>
          <span>系统首页</span>
        </el-menu-item>

        <el-menu-item index="/project" class="menu-item">
          <el-icon><Folder /></el-icon>
          <span>科研项目管理</span>
        </el-menu-item>

        <el-menu-item index="/researcher" class="menu-item">
          <el-icon><User /></el-icon>
          <span>科研人员管理</span>
        </el-menu-item>

        <el-menu-item index="/paper" class="menu-item">
          <el-icon><Document /></el-icon>
          <span>期刊论文管理</span>
        </el-menu-item>

        <el-menu-item index="/book" class="menu-item">
          <el-icon><Reading /></el-icon>
          <span>著作管理</span>
        </el-menu-item>

        <el-menu-item index="/award" class="menu-item">
          <el-icon><Trophy /></el-icon>
          <span>科研奖项管理</span>
        </el-menu-item>

        <el-menu-item index="/dictionary" class="menu-item">
          <el-icon><Setting /></el-icon>
          <span>字典管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧内容 -->
    <el-container>
      <!-- 顶栏 -->
      <el-header class="header">
        <div class="header-left">
          <div class="breadcrumb">
            <el-icon><Location /></el-icon>
            <span class="system-title">高校科研管理系统</span>
          </div>
        </div>
        
        <div class="header-right">
          <el-dropdown trigger="hover" class="user-dropdown">
            <div class="user-info">
              <el-avatar :size="32" class="user-avatar">
                <el-icon><UserFilled /></el-icon>
              </el-avatar>
              <span class="username">管理员</span>
              <el-icon class="dropdown-icon"><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="$router.push('/change-password')">
                  <el-icon><Key /></el-icon>
                  修改密码
                </el-dropdown-item>
                <el-dropdown-item divided @click="logout">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主体 -->
      <el-main class="main-content">
        <div class="content-wrapper fade-in">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { 
  Management, 
  Folder, 
  User, 
  Document, 
  Reading, 
  Trophy, 
  Setting, 
  Location, 
  UserFilled, 
  ArrowDown, 
  Key, 
  SwitchButton,
  Odometer
} from '@element-plus/icons-vue';

const router = useRouter();

const logout = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要退出登录吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    
    localStorage.removeItem("token");
    ElMessage.success('退出成功');
    router.push("/login");
  } catch {
    // 用户取消
  }
};
</script>

<style scoped>
.sidebar {
  background: #001529;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1000;
}

.logo-area {
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: linear-gradient(135deg, #1890ff, #409EFF);
  color: white;
  margin-bottom: 20px;
}

.logo-icon {
  margin-right: 12px;
}

.logo-text h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;
}

.logo-text p {
  margin: 2px 0 0 0;
  font-size: 12px;
  opacity: 0.8;
  line-height: 1;
}

.sidebar-menu {
  border: none;
  background: transparent !important;
}

.menu-item {
  margin: 4px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background-color: rgba(64, 158, 255, 0.1) !important;
}

.menu-item.is-active {
  background-color: #409EFF !important;
  color: white !important;
}

.header {
  background: white;
  border-bottom: 1px solid #e8eaec;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: relative;
  z-index: 999;
}

.header-left {
  display: flex;
  align-items: center;
}

.breadcrumb {
  display: flex;
  align-items: center;
  color: #666;
}

.system-title {
  margin-left: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #2c3e50;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-dropdown {
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.user-info:hover {
  background-color: #f5f7fa;
}

.user-avatar {
  margin-right: 8px;
  background: linear-gradient(135deg, #409EFF, #1890ff);
}

.username {
  margin-right: 8px;
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
}

.dropdown-icon {
  color: #909399;
  font-size: 12px;
}

.main-content {
  background: #f5f7fa;
  padding: 24px;
  overflow-y: auto;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    width: 200px !important;
  }
  
  .logo-text h3 {
    font-size: 14px;
  }
  
  .logo-text p {
    display: none;
  }
  
  .main-content {
    padding: 16px;
  }
}
</style>
