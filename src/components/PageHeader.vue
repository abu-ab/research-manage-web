<template>
  <div class="page-header card-shadow">
    <div class="header-content">
      <div class="header-left">
        <div class="page-title">
          <div class="title-icon" :style="{ background: iconColor }">
            <el-icon :size="24" color="white">
              <component :is="icon" />
            </el-icon>
          </div>
          <div class="title-content">
            <h2>{{ title }}</h2>
            <p v-if="description">{{ description }}</p>
          </div>
        </div>
      </div>
      <div class="header-actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: [String, Object],
    required: true
  },
  iconColor: {
    type: String,
    default: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))'
  }
})
</script>

<style scoped>
.page-header {
  background: white;
  border-radius: var(--border-radius-large);
  padding: 28px 32px;
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  flex: 1;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 20px;
}

.title-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--border-radius-large);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.title-content h2 {
  margin: 0 0 4px 0;
  color: var(--color-text-primary);
  font-size: 24px;
  font-weight: 600;
}

.title-content p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header {
    padding: 20px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
  
  .page-title {
    gap: 16px;
  }
  
  .title-icon {
    width: 48px;
    height: 48px;
  }
  
  .title-content h2 {
    font-size: 20px;
  }
}
</style>