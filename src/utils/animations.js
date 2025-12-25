// 动画工具类
export const animations = {
  // 淡入动画
  fadeIn: {
    name: 'fadeIn',
    duration: '0.4s',
    timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    keyframes: {
      from: {
        opacity: 0,
        transform: 'translateY(20px)'
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)'
      }
    }
  },
  
  // 滑入动画
  slideUp: {
    name: 'slideUp',
    duration: '0.4s',
    timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    keyframes: {
      from: {
        opacity: 0,
        transform: 'translateY(30px)'
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)'
      }
    }
  },
  
  // 缩放动画
  scaleIn: {
    name: 'scaleIn',
    duration: '0.3s',
    timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    keyframes: {
      from: {
        opacity: 0,
        transform: 'scale(0.9)'
      },
      to: {
        opacity: 1,
        transform: 'scale(1)'
      }
    }
  },
  
  // 弹跳动画
  bounce: {
    name: 'bounce',
    duration: '0.6s',
    timingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    keyframes: {
      from: {
        opacity: 0,
        transform: 'scale(0.3)'
      },
      '50%': {
        opacity: 1,
        transform: 'scale(1.05)'
      },
      to: {
        opacity: 1,
        transform: 'scale(1)'
      }
    }
  },
  
  // 旋转动画
  rotate: {
    name: 'rotate',
    duration: '2s',
    timingFunction: 'linear',
    iterationCount: 'infinite',
    keyframes: {
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(360deg)'
      }
    }
  },
  
  // 脉冲动画
  pulse: {
    name: 'pulse',
    duration: '2s',
    timingFunction: 'ease-in-out',
    iterationCount: 'infinite',
    keyframes: {
      '0%': {
        transform: 'scale(1)',
        opacity: 1
      },
      '50%': {
        transform: 'scale(1.05)',
        opacity: 0.8
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 1
      }
    }
  },
  
  // 摇摆动画
  shake: {
    name: 'shake',
    duration: '0.5s',
    timingFunction: 'ease-in-out',
    keyframes: {
      '0%, 100%': {
        transform: 'translateX(0)'
      },
      '10%, 30%, 50%, 70%, 90%': {
        transform: 'translateX(-5px)'
      },
      '20%, 40%, 60%, 80%': {
        transform: 'translateX(5px)'
      }
    }
  },
  
  // 浮动动画
  float: {
    name: 'float',
    duration: '6s',
    timingFunction: 'ease-in-out',
    iterationCount: 'infinite',
    keyframes: {
      '0%, 100%': {
        transform: 'translateY(0px) rotate(0deg)'
      },
      '50%': {
        transform: 'translateY(-20px) rotate(180deg)'
      }
    }
  }
}

// 动画工具函数
export const animationUtils = {
  // 创建CSS动画
  createAnimation(name, keyframes, options = {}) {
    const {
      duration = '0.3s',
      timingFunction = 'ease',
      delay = '0s',
      iterationCount = '1',
      direction = 'normal',
      fillMode = 'both'
    } = options
    
    // 生成keyframes CSS
    let keyframesCSS = `@keyframes ${name} {\n`
    for (const [key, value] of Object.entries(keyframes)) {
      keyframesCSS += `  ${key} {\n`
      for (const [prop, val] of Object.entries(value)) {
        keyframesCSS += `    ${prop}: ${val};\n`
      }
      keyframesCSS += `  }\n`
    }
    keyframesCSS += `}`
    
    // 插入样式
    const style = document.createElement('style')
    style.textContent = keyframesCSS
    document.head.appendChild(style)
    
    // 返回动画属性
    return {
      animationName: name,
      animationDuration: duration,
      animationTimingFunction: timingFunction,
      animationDelay: delay,
      animationIterationCount: iterationCount,
      animationDirection: direction,
      animationFillMode: fillMode
    }
  },
  
  // 应用动画到元素
  applyAnimation(element, animationName, options = {}) {
    const animation = animations[animationName]
    if (!animation) {
      console.warn(`Animation ${animationName} not found`)
      return
    }
    
    const {
      duration = animation.duration,
      timingFunction = animation.timingFunction,
      delay = '0s',
      iterationCount = animation.iterationCount || '1',
      direction = 'normal',
      fillMode = 'both'
    } = options
    
    element.style.animation = `${animation.name} ${duration} ${timingFunction} ${delay} ${iterationCount} ${direction} ${fillMode}`
  },
  
  // 移除动画
  removeAnimation(element) {
    element.style.animation = ''
  },
  
  // 动画序列
  sequence(elements, animationName, stagger = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        this.applyAnimation(element, animationName)
      }, index * stagger)
    })
  },
  
  // 监听动画结束
  onAnimationEnd(element, callback) {
    element.addEventListener('animationend', callback, { once: true })
  },
  
  // 创建交错动画
  staggerAnimation(selector, animationName, stagger = 100) {
    const elements = document.querySelectorAll(selector)
    this.sequence(elements, animationName, stagger)
  }
}

// 预设动画组合
export const animationPresets = {
  // 页面进入动画
  pageEnter: [
    { selector: '.page-header', animation: 'fadeIn', delay: 0 },
    { selector: '.search-section', animation: 'slideUp', delay: 100 },
    { selector: '.stats-card', animation: 'scaleIn', delay: 200 },
    { selector: '.table-section', animation: 'fadeIn', delay: 300 }
  ],
  
  // 卡片悬停效果
  cardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  // 按钮悬停效果
  buttonHover: {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(64, 158, 255, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }
}

// 初始化动画系统
export const initAnimations = () => {
  // 创建所有预定义动画的CSS
  Object.values(animations).forEach(animation => {
    animationUtils.createAnimation(animation.name, animation.keyframes, {
      duration: animation.duration,
      timingFunction: animation.timingFunction,
      iterationCount: animation.iterationCount
    })
  })
}

export default animations