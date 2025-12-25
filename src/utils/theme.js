// 主题配置
export const themeConfig = {
  // 颜色系统
  colors: {
    primary: '#409EFF',
    primaryLight: '#79bbff',
    primaryDark: '#337ecc',
    success: '#67C23A',
    warning: '#E6A23C',
    danger: '#F56C6C',
    info: '#909399',
    
    // 文本颜色
    textPrimary: '#303133',
    textRegular: '#606266',
    textSecondary: '#909399',
    textPlaceholder: '#C0C4CC',
    
    // 背景颜色
    bgPrimary: '#ffffff',
    bgSecondary: '#f5f7fa',
    bgTertiary: '#fafbfc',
    
    // 边框颜色
    borderLight: '#EBEEF5',
    borderBase: '#DCDFE6',
    borderDark: '#D4D7DE'
  },
  
  // 渐变色系统
  gradients: {
    primary: 'linear-gradient(135deg, #409EFF, #337ecc)',
    success: 'linear-gradient(135deg, #67C23A, #5cb85c)',
    warning: 'linear-gradient(135deg, #E6A23C, #f0ad4e)',
    danger: 'linear-gradient(135deg, #F56C6C, #d9534f)',
    info: 'linear-gradient(135deg, #909399, #73767a)',
    
    // 背景渐变
    bgPrimary: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    bgSecondary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    bgTertiary: 'linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%)'
  },
  
  // 阴影系统
  shadows: {
    light: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    base: '0 4px 20px 0 rgba(0, 0, 0, 0.15)',
    strong: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
    colored: '0 4px 12px rgba(64, 158, 255, 0.3)'
  },
  
  // 圆角系统
  borderRadius: {
    small: '4px',
    base: '6px',
    large: '8px',
    xl: '12px',
    '2xl': '16px',
    round: '50%'
  },
  
  // 间距系统
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '48px'
  },
  
  // 字体系统
  fonts: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif',
    mono: '"SF Mono", Monaco, Inconsolata, "Roboto Mono", "Source Code Pro", Menlo, Consolas, "Courier New", monospace'
  },
  
  // 过渡动画
  transitions: {
    base: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  }
}

// 主题工具函数
export const themeUtils = {
  // 获取CSS变量
  getCSSVar(name) {
    return `var(--${name})`
  },
  
  // 设置CSS变量
  setCSSVar(name, value) {
    document.documentElement.style.setProperty(`--${name}`, value)
  },
  
  // 应用主题
  applyTheme(theme = 'light') {
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
      // 设置暗色主题变量
      this.setCSSVar('color-bg-primary', '#1a1a1a')
      this.setCSSVar('color-bg-secondary', '#2d2d2d')
      this.setCSSVar('color-text-primary', '#ffffff')
      this.setCSSVar('color-text-regular', '#e0e0e0')
    } else {
      root.classList.remove('dark')
      // 恢复亮色主题变量
      this.setCSSVar('color-bg-primary', themeConfig.colors.bgPrimary)
      this.setCSSVar('color-bg-secondary', themeConfig.colors.bgSecondary)
      this.setCSSVar('color-text-primary', themeConfig.colors.textPrimary)
      this.setCSSVar('color-text-regular', themeConfig.colors.textRegular)
    }
  },
  
  // 生成渐变色
  generateGradient(color1, color2, direction = '135deg') {
    return `linear-gradient(${direction}, ${color1}, ${color2})`
  },
  
  // 生成阴影
  generateShadow(x = 0, y = 4, blur = 12, spread = 0, color = 'rgba(0, 0, 0, 0.15)') {
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`
  }
}

// 预设主题
export const presetThemes = {
  default: {
    name: '默认主题',
    primary: '#409EFF',
    success: '#67C23A',
    warning: '#E6A23C',
    danger: '#F56C6C'
  },
  
  blue: {
    name: '蓝色主题',
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    danger: '#f5222d'
  },
  
  green: {
    name: '绿色主题',
    primary: '#52c41a',
    success: '#73d13d',
    warning: '#faad14',
    danger: '#f5222d'
  },
  
  purple: {
    name: '紫色主题',
    primary: '#722ed1',
    success: '#52c41a',
    warning: '#faad14',
    danger: '#f5222d'
  }
}

export default themeConfig