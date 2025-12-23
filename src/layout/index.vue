<template>
  <el-container class="h-screen">
    <!-- 左侧菜单 -->
    <el-aside width="220px" class="bg-white border-r">
      <div class="h-14 flex items-center justify-center text-lg font-bold">
        科研管理系统
      </div>

      <el-menu
        router
        class="border-none"
        default-active="/project"
      >
        <el-menu-item index="/project">
          <span>科研项目管理</span>
        </el-menu-item>

        <el-menu-item index="/researcher">
          <span>科研人员管理</span>
        </el-menu-item>

        <el-menu-item index="/paper">
          <span>期刊论文管理</span>
        </el-menu-item>

        <el-menu-item index="/book">
          <span>著作管理</span>
        </el-menu-item>

        <el-menu-item index="/dictionary">
          <span>字典管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧内容 -->
    <el-container>
      <!-- 顶栏 -->
      <el-header class="bg-white border-b flex items-center justify-between">
        <div class="text-base font-medium">
          高校科研管理系统
        </div>

        <el-button size="small" type="danger">
          退出登录
        </el-button>
      </el-header>

      <!-- 主体 -->
      <el-main class="bg-gray-100">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
</script>
