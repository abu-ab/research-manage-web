// 响应式断点配置
export const breakpoints = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1920
}

// 媒体查询工具
export const mediaQueries = {
  xs: `(max-width: ${breakpoints.xs}px)`,
  sm: `(max-width: ${breakpoints.sm}px)`,
  md: `(max-width: ${breakpoints.md}px)`,
  lg: `(max-width: ${breakpoints.lg}px)`,
  xl: `(max-width: ${breakpoints.xl}px)`,
  
  // 最小宽度查询
  minXs: `(min-width: ${breakpoints.xs + 1}px)`,
  minSm: `(min-width: ${breakpoints.sm + 1}px)`,
  minMd: `(min-width: ${breakpoints.md + 1}px)`,
  minLg: `(min-width: ${breakpoints.lg + 1}px)`,
  minXl: `(min-width: ${breakpoints.xl + 1}px)`,
  
  // 范围查询
  onlyXs: `(max-width: ${breakpoints.xs}px)`,
  onlySm: `(min-width: ${breakpoints.xs + 1}px) and (max-width: ${breakpoints.sm}px)`,
  onlyMd: `(min-width: ${breakpoints.sm + 1}px) and (max-width: ${breakpoints.md}px)`,
  onlyLg: `(min-width: ${breakpoints.md + 1}px) and (max-width: ${breakpoints.lg}px)`,
  onlyXl: `(min-width: ${breakpoints.lg + 1}px)`
}

// 响应式工具函数
export const responsiveUtils = {
  // 获取当前屏幕尺寸类型
  getCurrentBreakpoint() {
    const width = window.innerWidth
    
    if (width <= breakpoints.xs) return 'xs'
    if (width <= breakpoints.sm) return 'sm'
    if (width <= breakpoints.md) return 'md'
    if (width <= breakpoints.lg) return 'lg'
    return 'xl'
  },
  
  // 检查是否匹配指定断点
  matches(breakpoint) {
    return window.matchMedia(mediaQueries[breakpoint]).matches
  },
  
  // 监听断点变化
  watchBreakpoint(breakpoint, callback) {
    const mediaQuery = window.matchMedia(mediaQueries[breakpoint])
    mediaQuery.addListener(callback)
    callback(mediaQuery) // 立即执行一次
    
    // 返回清理函数
    return () => mediaQuery.removeListener(callback)
  },
  
  // 根据屏幕尺寸返回不同值
  responsive(values) {
    const currentBreakpoint = this.getCurrentBreakpoint()
    
    // 按优先级查找值
    const priorities = ['xl', 'lg', 'md', 'sm', 'xs']
    const currentIndex = priorities.indexOf(currentBreakpoint)
    
    for (let i = currentIndex; i < priorities.length; i++) {
      const key = priorities[i]
      if (values[key] !== undefined) {
        return values[key]
      }
    }
    
    // 如果没有找到匹配的值，返回默认值
    return values.default || values[Object.keys(values)[0]]
  },
  
  // 获取响应式栅格配置
  getGridConfig() {
    const breakpoint = this.getCurrentBreakpoint()
    
    const configs = {
      xs: { span: 24, gutter: 8 },
      sm: { span: 12, gutter: 16 },
      md: { span: 8, gutter: 16 },
      lg: { span: 6, gutter: 20 },
      xl: { span: 6, gutter: 24 }
    }
    
    return configs[breakpoint] || configs.lg
  },
  
  // 获取响应式表格配置
  getTableConfig() {
    const breakpoint = this.getCurrentBreakpoint()
    
    const configs = {
      xs: { 
        size: 'small',
        showHeader: false,
        stripe: false
      },
      sm: { 
        size: 'small',
        showHeader: true,
        stripe: true
      },
      md: { 
        size: 'default',
        showHeader: true,
        stripe: true
      },
      lg: { 
        size: 'default',
        showHeader: true,
        stripe: true
      },
      xl: { 
        size: 'large',
        showHeader: true,
        stripe: true
      }
    }
    
    return configs[breakpoint] || configs.lg
  }
}

// Vue 3 组合式API钩子
export function useResponsive() {
  const { ref, onMounted, onUnmounted } = require('vue')
  
  const currentBreakpoint = ref(responsiveUtils.getCurrentBreakpoint())
  const isMobile = ref(responsiveUtils.matches('sm'))
  const isTablet = ref(responsiveUtils.matches('md'))
  const isDesktop = ref(responsiveUtils.matches('minLg'))
  
  let cleanupFunctions = []
  
  const updateBreakpoint = () => {
    currentBreakpoint.value = responsiveUtils.getCurrentBreakpoint()
    isMobile.value = responsiveUtils.matches('sm')
    isTablet.value = responsiveUtils.matches('md')
    isDesktop.value = responsiveUtils.matches('minLg')
  }
  
  onMounted(() => {
    // 监听所有断点变化
    Object.keys(mediaQueries).forEach(breakpoint => {
      const cleanup = responsiveUtils.watchBreakpoint(breakpoint, updateBreakpoint)
      cleanupFunctions.push(cleanup)
    })
  })
  
  onUnmounted(() => {
    cleanupFunctions.forEach(cleanup => cleanup())
  })
  
  return {
    currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    matches: responsiveUtils.matches,
    responsive: responsiveUtils.responsive,
    getGridConfig: responsiveUtils.getGridConfig,
    getTableConfig: responsiveUtils.getTableConfig
  }
}

// 响应式CSS类生成器
export const responsiveClasses = {
  // 生成隐藏类
  hidden: {
    xs: 'hidden-xs',
    sm: 'hidden-sm', 
    md: 'hidden-md',
    lg: 'hidden-lg',
    xl: 'hidden-xl'
  },
  
  // 生成显示类
  visible: {
    xs: 'visible-xs',
    sm: 'visible-sm',
    md: 'visible-md', 
    lg: 'visible-lg',
    xl: 'visible-xl'
  },
  
  // 生成文本大小类
  textSize: {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  },
  
  // 生成间距类
  spacing: {
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  }
}

export default responsiveUtils