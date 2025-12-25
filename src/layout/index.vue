<template>
  <el-container class="h-screen">
    <!-- 左侧菜单 -->
    <el-aside width="240px" class="sidebar">
      <!-- Logo区域 -->
      <div class="logo-area">
        <div class="logo-container">
          <div class="logo-icon">
            <el-icon size="28" color="white">
              <Management />
            </el-icon>
          </div>
          <div class="logo-text">
            <h3>科研管理系统</h3>
            <p>Research Management</p>
          </div>
        </div>
      </div>

      <!-- 菜单 -->
      <div class="menu-container">
        <el-menu 
          router 
          class="sidebar-menu" 
          default-active="/dashboard"
          :collapse="false"
          background-color="transparent"
          text-color="rgba(255, 255, 255, 0.8)"
          active-text-color="#ffffff"
        >
          <!-- <el-menu-item index="/dashboard" class="menu-item">
            <el-icon><Odometer /></el-icon>
            <span>系统首页</span>
          </el-menu-item> -->

          <el-menu-item index="/project" class="menu-item">
            <el-icon><Folder /></el-icon>
            <span>科研项目</span>
          </el-menu-item>

          <el-menu-item index="/researcher" class="menu-item">
            <el-icon><User /></el-icon>
            <span>科研人员</span>
          </el-menu-item>

          <el-menu-item index="/paper" class="menu-item">
            <el-icon><Document /></el-icon>
            <span>期刊论文</span>
          </el-menu-item>

          <el-menu-item index="/book" class="menu-item">
            <el-icon><Reading /></el-icon>
            <span>学术著作</span>
          </el-menu-item>

          <el-menu-item index="/award" class="menu-item">
            <el-icon><Trophy /></el-icon>
            <span>科研奖项</span>
          </el-menu-item>

          <el-menu-item index="/dictionary" class="menu-item">
            <el-icon><Setting /></el-icon>
            <span>字典管理</span>
          </el-menu-item>
        </el-menu>
      </div>

      <!-- 底部信息 -->
      <div class="sidebar-footer">
        <div class="version-info">
          <el-icon><InfoFilled /></el-icon>
          <span>版本 v1.0.0</span>
        </div>
      </div>
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
              <div class="user-details">
                <span class="username">管理员</span>
                <span class="user-role">系统管理员</span>
              </div>
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
import { ref } from "vue";
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
  Odometer,
  InfoFilled,
  Bell,
  FullScreen
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

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
</script>

<style scoped>
.sidebar {
  background: linear-gradient(180deg, #001529 0%, #002140 100%);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.logo-area {
  padding: 20px;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #1890ff, #409EFF);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
}

.logo-text h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;
  color: white;
}

.logo-text p {
  margin: 2px 0 0 0;
  font-size: 11px;
  opacity: 0.7;
  line-height: 1;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
}

.menu-container {
  flex: 1;
  padding: 0 12px;
  overflow-y: auto;
}

.sidebar-menu {
  border: none;
  background: transparent !important;
}

.menu-item {
  margin: 2px 0;
  border-radius: 6px;
  transition: all 0.2s ease;
  position: relative;
  display: flex !important;
  align-items: center;
  gap: 8px;
  padding: 10px 12px !important;
}

.menu-item:hover {
  background-color: rgba(64, 158, 255, 0.1) !important;
  color: #409EFF !important;
  transform: translateX(2px);
}

.menu-item.is-active {
  background: rgba(64, 158, 255, 0.15) !important;
  color: white !important;
  border-left: 3px solid #409EFF;
}

.menu-badge {
  background: #ff4757;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 8px;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
}

.version-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
}

.header {
  background: white;
  border-bottom: 1px solid #e8eaec;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
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
  gap: 24px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  color: var(--color-text-secondary);
}

.system-title {
  margin-left: 8px;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.notification-badge {
  cursor: pointer;
}

.user-dropdown {
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  border: 1px solid #e8eaec;
}

.user-info:hover {
  background-color: #f5f7fa;
  border-color: #409EFF;
}

.user-avatar {
  margin-right: 8px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
}

.user-details {
  display: flex;
  flex-direction: column;
  margin-right: 8px;
}

.username {
  font-size: 13px;
  color: var(--color-text-primary);
  font-weight: 500;
  line-height: 1.2;
}

.user-role {
  font-size: 11px;
  color: var(--color-text-secondary);
  line-height: 1.2;
  margin-top: 1px;
}

.dropdown-icon {
  color: var(--color-text-secondary);
  font-size: 12px;
  transition: var(--transition-base);
}

.user-info:hover .dropdown-icon {
  color: var(--color-primary);
}

.main-content {
  background: #f5f7fa;
  padding: 20px;
  overflow-y: auto;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .sidebar {
    width: 220px !important;
  }
  
  .main-content {
    padding: 16px;
  }
}

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
  
  .header {
    padding: 0 16px;
  }
  
  .header-left {
    gap: 16px;
  }
  
  .system-title {
    font-size: 14px;
  }
  
  .user-details {
    display: none;
  }
  
  .main-content {
    padding: 12px;
  }
  
  .menu-badge {
    display: none;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 180px !important;
  }
  
  .header-actions {
    display: none;
  }
}
</style>