<template>
  <div class="stats-card card-shadow interactive" :class="{ 'animate-in': animateIn }">
    <div class="card-background" :style="{ background: gradientColor }"></div>
    
    <div class="stat-icon" :style="{ background: iconColor }">
      <el-icon :size="iconSize">
        <component :is="icon" />
      </el-icon>
    </div>
    
    <div class="stat-content">
      <div class="stat-number">{{ formatNumber(value) }}</div>
      <div class="stat-label">{{ label }}</div>
      
      <div v-if="trend" class="stat-trend" :class="trendClass">
        <el-icon><TrendCharts /></el-icon>
        <span>{{ trend.value }}</span>
        <span class="trend-text">{{ trend.text || '较上月' }}</span>
      </div>
    </div>
    
    <div v-if="showChart" class="stat-chart">
      <div class="mini-chart" :style="{ background: chartColor }"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TrendCharts } from '@element-plus/icons-vue'

const props = defineProps({
  icon: {
    type: [String, Object],
    required: true
  },
  iconSize: {
    type: Number,
    default: 32
  },
  iconColor: {
    type: String,
    default: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))'
  },
  gradientColor: {
    type: String,
    default: 'linear-gradient(135deg, rgba(64, 158, 255, 0.1), transparent)'
  },
  chartColor: {
    type: String,
    default: 'linear-gradient(135deg, var(--color-primary), transparent)'
  },
  value: {
    type: [Number, String],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  trend: {
    type: Object,
    default: null
  },
  showChart: {
    type: Boolean,
    default: true
  },
  animateIn: {
    type: Boolean,
    default: false
  }
})

const trendClass = computed(() => {
  if (!props.trend) return ''
  
  const value = parseFloat(props.trend.value.replace(/[^-\d.]/g, ''))
  return value >= 0 ? 'positive' : 'negative'
})

const formatNumber = (num) => {
  if (typeof num === 'string') return num
  return num.toLocaleString()
}
</script>

<style scoped>
.stats-card {
  background: white;
  border-radius: var(--border-radius-large);
  padding: 28px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  position: relative;
  overflow: hidden;
  min-height: 140px;
  transition: var(--transition-base);
}

.stats-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-base);
}

.card-background {
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  transform: translate(40px, -40px);
  opacity: 0.6;
}

.stat-icon {
  width: 72px;
  height: 72px;
  border-radius: var(--border-radius-large);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  z-index: 2;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
  position: relative;
  z-index: 2;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-bottom: 12px;
  font-weight: 500;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
}

.stat-trend.positive {
  color: var(--color-success);
}

.stat-trend.negative {
  color: var(--color-danger);
}

.trend-text {
  font-size: 12px;
  color: var(--color-text-placeholder);
  margin-left: 4px;
}

.stat-chart {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 80px;
  height: 40px;
  opacity: 0.3;
}

.mini-chart {
  width: 100%;
  height: 100%;
  border-radius: 4px 4px 0 0;
}

.animate-in {
  animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-card {
    padding: 20px;
    min-height: 120px;
    gap: 16px;
  }
  
  .stat-icon {
    width: 56px;
    height: 56px;
  }
  
  .stat-number {
    font-size: 24px;
  }
  
  .stat-label {
    font-size: 14px;
  }
}
</style>