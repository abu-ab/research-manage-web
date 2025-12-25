<template>
  <div class="search-section card-shadow">
    <div class="search-header">
      <div class="header-icon">
        <el-icon><Search /></el-icon>
      </div>
      <span>搜索筛选</span>
      <div class="header-actions">
        <el-button link type="primary" size="small" @click="toggleExpanded">
          {{ expanded ? '收起' : '展开' }}
          <el-icon>
            <component :is="expanded ? 'ArrowUp' : 'ArrowDown'" />
          </el-icon>
        </el-button>
      </div>
    </div>
    
    <transition name="expand">
      <div v-show="expanded" class="search-form">
        <slot />
        <div class="search-actions">
          <el-button type="primary" @click="$emit('search')" :icon="Search">
            查询
          </el-button>
          <el-button @click="$emit('reset')" :icon="Refresh">
            重置
          </el-button>
          <el-button type="success" @click="$emit('export')" :icon="Download">
            导出
          </el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, Refresh, Download, ArrowUp, ArrowDown } from '@element-plus/icons-vue'

const expanded = ref(true)

defineEmits(['search', 'reset', 'export'])

const toggleExpanded = () => {
  expanded.value = !expanded.value
}
</script>

<style scoped>
.search-section {
  background: white;
  border-radius: var(--border-radius-large);
  padding: 24px;
  margin-bottom: 24px;
}

.search-header {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-text-primary);
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 20px;
}

.header-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  border-radius: var(--border-radius-base);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.header-actions {
  margin-left: auto;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-actions {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border-light);
}

/* 展开收起动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 200px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-actions {
    flex-direction: column;
  }
  
  .search-actions .el-button {
    width: 100%;
  }
}
</style>