<template>
  <div class="dashboard-container">
    <!-- 欢迎区域 -->
    <div class="welcome-section card-shadow-strong">
      <div class="welcome-content">
        <div class="welcome-text">
          <h1 class="welcome-title">
            <span class="greeting">欢迎使用</span>
            <span class="system-name text-gradient">科研管理系统</span>
          </h1>
          <p class="welcome-desc">高效管理科研项目，助力学术成果产出，推动科研创新发展</p>
          <div class="welcome-features">
            <div class="feature-tag">
              <el-icon><TrendCharts /></el-icon>
              <span>智能分析</span>
            </div>
            <div class="feature-tag">
              <el-icon><DataAnalysis /></el-icon>
              <span>数据可视化</span>
            </div>
            <div class="feature-tag">
              <el-icon><Connection /></el-icon>
              <span>协同管理</span>
            </div>
          </div>
        </div>
        <div class="welcome-visual">
          <div class="visual-icon">
            <el-icon size="120" color="rgba(255, 255, 255, 0.9)">
              <Management />
            </el-icon>
          </div>
          <div class="floating-elements">
            <div class="float-item float-1">
              <el-icon><Document /></el-icon>
            </div>
            <div class="float-item float-2">
              <el-icon><Trophy /></el-icon>
            </div>
            <div class="float-item float-3">
              <el-icon><User /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速统计 -->
    <div class="stats-overview">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="stat-card card-shadow interactive scale-in" style="animation-delay: 0.1s">
            <div class="stat-icon project-icon">
              <el-icon size="36"><Folder /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">156</div>
              <div class="stat-label">科研项目</div>
              <div class="stat-trend positive">
                <el-icon><TrendCharts /></el-icon>
                <span>+12%</span>
                <span class="trend-text">较上月</span>
              </div>
            </div>
            <div class="stat-chart">
              <div class="mini-chart project-chart"></div>
            </div>
          </div>
        </el-col>
        
        <el-col :span="6">
          <div class="stat-card card-shadow interactive scale-in" style="animation-delay: 0.2s">
            <div class="stat-icon researcher-icon">
              <el-icon size="36"><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">89</div>
              <div class="stat-label">科研人员</div>
              <div class="stat-trend positive">
                <el-icon><TrendCharts /></el-icon>
                <span>+8%</span>
                <span class="trend-text">较上月</span>
              </div>
            </div>
            <div class="stat-chart">
              <div class="mini-chart researcher-chart"></div>
            </div>
          </div>
        </el-col>
        
        <el-col :span="6">
          <div class="stat-card card-shadow interactive scale-in" style="animation-delay: 0.3s">
            <div class="stat-icon paper-icon">
              <el-icon size="36"><Document /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">234</div>
              <div class="stat-label">学术论文</div>
              <div class="stat-trend positive">
                <el-icon><TrendCharts /></el-icon>
                <span>+15%</span>
                <span class="trend-text">较上月</span>
              </div>
            </div>
            <div class="stat-chart">
              <div class="mini-chart paper-chart"></div>
            </div>
          </div>
        </el-col>
        
        <el-col :span="6">
          <div class="stat-card card-shadow interactive scale-in" style="animation-delay: 0.4s">
            <div class="stat-icon award-icon">
              <el-icon size="36"><Trophy /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">67</div>
              <div class="stat-label">获奖项目</div>
              <div class="stat-trend positive">
                <el-icon><TrendCharts /></el-icon>
                <span>+20%</span>
                <span class="trend-text">较上月</span>
              </div>
            </div>
            <div class="stat-chart">
              <div class="mini-chart award-chart"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 主要功能区域 -->
    <div class="main-sections">
      <el-row :gutter="24">
        <!-- 快速操作 -->
        <el-col :span="12">
          <div class="section-card card-shadow slide-up" style="animation-delay: 0.5s">
            <div class="section-header">
              <div class="header-icon">
                <el-icon><Lightning /></el-icon>
              </div>
              <div class="header-content">
                <h3>快速操作</h3>
                <p>常用功能快速入口</p>
              </div>
            </div>
            <div class="action-grid">
              <div class="action-item interactive" @click="$router.push('/project')">
                <div class="action-icon project-bg">
                  <el-icon><Plus /></el-icon>
                </div>
                <div class="action-content">
                  <span class="action-title">新增项目</span>
                  <span class="action-desc">创建新的科研项目</span>
                </div>
              </div>
              <div class="action-item interactive" @click="$router.push('/researcher')">
                <div class="action-icon researcher-bg">
                  <el-icon><UserFilled /></el-icon>
                </div>
                <div class="action-content">
                  <span class="action-title">添加人员</span>
                  <span class="action-desc">录入科研人员信息</span>
                </div>
              </div>
              <div class="action-item interactive" @click="$router.push('/paper')">
                <div class="action-icon paper-bg">
                  <el-icon><EditPen /></el-icon>
                </div>
                <div class="action-content">
                  <span class="action-title">录入论文</span>
                  <span class="action-desc">添加学术论文成果</span>
                </div>
              </div>
              <div class="action-item interactive" @click="$router.push('/award')">
                <div class="action-icon award-bg">
                  <el-icon><Medal /></el-icon>
                </div>
                <div class="action-content">
                  <span class="action-title">登记奖项</span>
                  <span class="action-desc">记录获奖项目信息</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        
        <!-- 最近动态 -->
        <el-col :span="12">
          <div class="section-card card-shadow slide-up" style="animation-delay: 0.6s">
            <div class="section-header">
              <div class="header-icon">
                <el-icon><Clock /></el-icon>
              </div>
              <div class="header-content">
                <h3>最近动态</h3>
                <p>系统最新操作记录</p>
              </div>
              <el-button link type="primary" size="small">查看更多</el-button>
            </div>
            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-icon project-activity">
                  <el-icon><Folder /></el-icon>
                </div>
                <div class="activity-content">
                  <div class="activity-title">新增项目：人工智能算法研究</div>
                  <div class="activity-meta">
                    <span class="activity-user">张教授</span>
                    <span class="activity-time">2小时前</span>
                  </div>
                </div>
                <div class="activity-status">
                  <el-tag size="small" type="success">已完成</el-tag>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon paper-activity">
                  <el-icon><Document /></el-icon>
                </div>
                <div class="activity-content">
                  <div class="activity-title">论文发表：机器学习在医疗诊断中的应用</div>
                  <div class="activity-meta">
                    <span class="activity-user">李博士</span>
                    <span class="activity-time">5小时前</span>
                  </div>
                </div>
                <div class="activity-status">
                  <el-tag size="small" type="warning">审核中</el-tag>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon award-activity">
                  <el-icon><Trophy /></el-icon>
                </div>
                <div class="activity-content">
                  <div class="activity-title">获得奖项：优秀科研成果奖</div>
                  <div class="activity-meta">
                    <span class="activity-user">王研究员</span>
                    <span class="activity-time">1天前</span>
                  </div>
                </div>
                <div class="activity-status">
                  <el-tag size="small" type="success">已确认</el-tag>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon researcher-activity">
                  <el-icon><User /></el-icon>
                </div>
                <div class="activity-content">
                  <div class="activity-title">新增研究员：陈博士加入团队</div>
                  <div class="activity-meta">
                    <span class="activity-user">管理员</span>
                    <span class="activity-time">2天前</span>
                  </div>
                </div>
                <div class="activity-status">
                  <el-tag size="small" type="info">已入职</el-tag>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 数据概览 -->
    <div class="data-overview">
      <el-row :gutter="24">
        <el-col :span="16">
          <div class="section-card card-shadow slide-up" style="animation-delay: 0.7s">
            <div class="section-header">
              <div class="header-icon">
                <el-icon><DataAnalysis /></el-icon>
              </div>
              <div class="header-content">
                <h3>数据趋势</h3>
                <p>科研成果产出趋势分析</p>
              </div>
              <div class="chart-controls">
                <el-button-group size="small">
                  <el-button>本月</el-button>
                  <el-button type="primary">本季度</el-button>
                  <el-button>本年</el-button>
                </el-button-group>
              </div>
            </div>
            <div class="chart-container">
              <div class="chart-placeholder">
                <el-icon size="48" color="#e0e0e0"><DataAnalysis /></el-icon>
                <p>图表数据加载中...</p>
              </div>
            </div>
          </div>
        </el-col>
        
        <el-col :span="8">
          <div class="section-card card-shadow slide-up" style="animation-delay: 0.8s">
            <div class="section-header">
              <div class="header-icon">
                <el-icon><PieChart /></el-icon>
              </div>
              <div class="header-content">
                <h3>项目分布</h3>
                <p>各类型项目占比</p>
              </div>
            </div>
            <div class="distribution-chart">
              <div class="chart-item">
                <div class="chart-color" style="background: var(--color-primary);"></div>
                <span class="chart-label">基础研究</span>
                <span class="chart-value">45%</span>
              </div>
              <div class="chart-item">
                <div class="chart-color" style="background: var(--color-success);"></div>
                <span class="chart-label">应用研究</span>
                <span class="chart-value">35%</span>
              </div>
              <div class="chart-item">
                <div class="chart-color" style="background: var(--color-warning);"></div>
                <span class="chart-label">技术开发</span>
                <span class="chart-value">20%</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { 
  Management, 
  Folder, 
  User, 
  Document, 
  Trophy, 
  TrendCharts,
  Lightning,
  Plus,
  UserFilled,
  EditPen,
  Medal,
  Clock,
  DataAnalysis,
  Connection,
  PieChart
} from '@element-plus/icons-vue';
</script>

<style scoped>
.dashboard-container {
  padding: 0;
  min-height: calc(100vh - 160px);
}

.welcome-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 48px;
  margin-bottom: 32px;
  color: white;
  position: relative;
  overflow: hidden;
}

.welcome-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.welcome-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.welcome-text {
  flex: 1;
  max-width: 60%;
}

.welcome-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
}

.greeting {
  display: block;
  font-size: 24px;
  font-weight: 400;
  opacity: 0.9;
  margin-bottom: 8px;
}

.system-name {
  display: block;
  background: linear-gradient(135deg, #ffffff, #e3f2fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-desc {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 24px;
  line-height: 1.6;
}

.welcome-features {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.feature-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.welcome-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-icon {
  position: relative;
  z-index: 2;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.float-item {
  position: absolute;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: float 6s ease-in-out infinite;
}

.float-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.float-2 {
  top: 60%;
  right: 20%;
  animation-delay: 2s;
}

.float-3 {
  bottom: 30%;
  left: 30%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.stats-overview {
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 28px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  position: relative;
  overflow: hidden;
  min-height: 140px;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1), transparent);
  border-radius: 50%;
  transform: translate(30px, -30px);
}

.stat-icon {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  z-index: 2;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.project-icon {
  background: linear-gradient(135deg, #409EFF, #1890ff);
}

.researcher-icon {
  background: linear-gradient(135deg, #52c41a, #389e0d);
}

.paper-icon {
  background: linear-gradient(135deg, #722ed1, #531dab);
}

.award-icon {
  background: linear-gradient(135deg, #faad14, #d48806);
}

.stat-info {
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

.trend-text {
  font-size: 12px;
  color: var(--color-text-placeholder);
  margin-left: 4px;
}

.stat-chart {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px;
  height: 30px;
  opacity: 0.3;
}

.mini-chart {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, currentColor, transparent);
  border-radius: 4px 4px 0 0;
}

.main-sections {
  margin-bottom: 32px;
}

.section-card {
  background: white;
  border-radius: 16px;
  padding: 28px;
  height: 100%;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border-light);
}

.header-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.header-content {
  flex: 1;
}

.header-content h3 {
  margin: 0 0 4px 0;
  color: var(--color-text-primary);
  font-size: 18px;
  font-weight: 600;
}

.header-content p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: var(--transition-base);
  border: 2px solid transparent;
  background: var(--color-bg-tertiary);
}

.action-item:hover {
  background: white;
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(64, 158, 255, 0.15);
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.project-bg {
  background: linear-gradient(135deg, #409EFF, #1890ff);
}

.researcher-bg {
  background: linear-gradient(135deg, #52c41a, #389e0d);
}

.paper-bg {
  background: linear-gradient(135deg, #722ed1, #531dab);
}

.award-bg {
  background: linear-gradient(135deg, #faad14, #d48806);
}

.action-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.action-title {
  font-size: 16px;
  color: var(--color-text-primary);
  font-weight: 600;
}

.action-desc {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 320px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  transition: var(--transition-base);
  border: 1px solid var(--color-border-light);
}

.activity-item:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-primary);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.project-activity {
  background: linear-gradient(135deg, #409EFF, #1890ff);
}

.paper-activity {
  background: linear-gradient(135deg, #722ed1, #531dab);
}

.award-activity {
  background: linear-gradient(135deg, #faad14, #d48806);
}

.researcher-activity {
  background: linear-gradient(135deg, #52c41a, #389e0d);
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 14px;
  color: var(--color-text-primary);
  font-weight: 500;
  margin-bottom: 4px;
  line-height: 1.4;
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.activity-user {
  font-weight: 500;
}

.activity-status {
  flex-shrink: 0;
}

.data-overview {
  margin-bottom: 32px;
}

.chart-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-container {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  border-radius: 12px;
  margin-top: 16px;
}

.chart-placeholder {
  text-align: center;
  color: var(--color-text-placeholder);
}

.chart-placeholder p {
  margin: 12px 0 0 0;
  font-size: 14px;
}

.distribution-chart {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--color-bg-tertiary);
  border-radius: 8px;
}

.chart-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.chart-label {
  flex: 1;
  font-size: 14px;
  color: var(--color-text-primary);
}

.chart-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .welcome-content {
    flex-direction: column;
    text-align: center;
    gap: 32px;
  }
  
  .welcome-text {
    max-width: 100%;
  }
  
  .welcome-title {
    font-size: 28px;
  }
  
  .greeting {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 0;
  }
  
  .welcome-section {
    padding: 32px 24px;
    margin-bottom: 24px;
  }
  
  .welcome-title {
    font-size: 24px;
  }
  
  .greeting {
    font-size: 18px;
  }
  
  .welcome-desc {
    font-size: 16px;
  }
  
  .stats-overview .el-col {
    margin-bottom: 16px;
  }
  
  .stat-card {
    padding: 20px;
    min-height: 120px;
  }
  
  .stat-icon {
    width: 56px;
    height: 56px;
  }
  
  .stat-number {
    font-size: 24px;
  }
  
  .action-grid {
    grid-template-columns: 1fr;
  }
  
  .main-sections .el-col {
    margin-bottom: 16px;
  }
  
  .section-card {
    padding: 20px;
  }
  
  .data-overview .el-col {
    margin-bottom: 16px;
  }
}

@media (max-width: 480px) {
  .welcome-features {
    justify-content: center;
  }
  
  .feature-tag {
    font-size: 12px;
    padding: 6px 12px;
  }
  
  .floating-elements {
    display: none;
  }
}
</style>