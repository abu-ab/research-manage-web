<script setup>
// 全局样式和配置
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Element Plus 全局样式优化 */
.el-button {
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.el-button:hover {
  transform: translateY(-1px);
}

.el-button--primary {
  background: linear-gradient(135deg, #409EFF, #1890ff);
  border: none;
}

.el-button--primary:hover {
  background: linear-gradient(135deg, #1890ff, #409EFF);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.4);
}

.el-card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.el-card:hover {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
}

.el-table {
  border-radius: 8px;
  overflow: hidden;
}

.el-table th {
  background-color: #fafafa;
  color: #2c3e50;
  font-weight: 600;
}

.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #fafbfc;
}

.el-input__wrapper {
  border-radius: 6px;
  transition: all 0.3s ease;
}

.el-input__wrapper:hover {
  box-shadow: 0 0 0 1px #409EFF;
}

.el-select .el-input__wrapper {
  border-radius: 6px;
}

.el-pagination {
  justify-content: center;
}

.el-pagination .btn-next,
.el-pagination .btn-prev {
  border-radius: 6px;
}

.el-pagination .el-pager li {
  border-radius: 6px;
  margin: 0 2px;
}

/* 自定义动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式断点 */
@media (max-width: 768px) {
  .el-table {
    font-size: 12px;
  }
  
  .el-button {
    padding: 8px 12px;
    font-size: 12px;
  }
}
</style>
