<template>
  <div class="dashboard-container">
    <!-- 欢迎区域 -->
    <div class="welcome-section card-shadow">
      <div class="welcome-content">
        <div class="welcome-text">
          <h1>欢迎使用科研管理系统</h1>
          <p>高效管理科研项目，助力学术成果产出</p>
        </div>
        <div class="welcome-icon">
          <el-icon size="80" color="#409EFF">
            <Management />
          </el-icon>
        </div>
      </div>
    </div>

    <!-- 快速统计 -->
    <div class="stats-overview">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon project-icon">
              <el-icon size="32"><Folder /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">156</div>
              <div class="stat-label">科研项目</div>
              <div class="stat-trend">
                <el-icon color="#52c41a"><TrendCharts /></el-icon>
                <span>+12%</span>
              </div>
            </div>
          </div>
        </el-col>
        
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon researcher-icon">
              <el-icon size="32"><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">89</div>
              <div class="stat-label">科研人员</div>
              <div class="stat-trend">
                <el-icon color="#52c41a"><TrendCharts /></el-icon>
                <span>+8%</span>
              </div>
            </div>
          </div>
        </el-col>
        
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon paper-icon">
              <el-icon size="32"><Document /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">234</div>
              <div class="stat-label">学术论文</div>
              <div class="stat-trend">
                <el-icon color="#52c41a"><TrendCharts /></el-icon>
                <span>+15%</span>
              </div>
            </div>
          </div>
        </el-col>
        
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon award-icon">
              <el-icon size="32"><Trophy /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">67</div>
              <div class="stat-label">获奖项目</div>
              <div class="stat-trend">
                <el-icon color="#52c41a"><TrendCharts /></el-icon>
                <span>+20%</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 快速操作 -->
    <div class="quick-actions">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="action-section card-shadow">
            <div class="section-header">
              <el-icon><Lightning /></el-icon>
              <h3>快速操作</h3>
            </div>
            <div class="action-grid">
              <div class="action-item" @click="$router.push('/project')">
                <div class="action-icon project-bg">
                  <el-icon><Plus /></el-icon>
                </div>
                <span>新增项目</span>
              </div>
              <div class="action-item" @click="$router.push('/researcher')">
                <div class="action-icon researcher-bg">
                  <el-icon><UserFilled /></el-icon>
                </div>
                <span>添加人员</span>
              </div>
              <div class="action-item" @click="$router.push('/paper')">
                <div class="action-icon paper-bg">
                  <el-icon><EditPen /></el-icon>
                </div>
                <span>录入论文</span>
              </div>
              <div class="action-item" @click="$router.push('/award')">
                <div class="action-icon award-bg">
                  <el-icon><Medal /></el-icon>
                </div>
                <span>登记奖项</span>
              </div>
            </div>
          </div>
        </el-col>
        
        <el-col :span="12">
          <div class="recent-section card-shadow">
            <div class="section-header">
              <el-icon><Clock /></el-icon>
              <h3>最近动态</h3>
            </div>
            <div class="recent-list">
              <div class="recent-item">
                <div class="recent-icon">
                  <el-icon color="#409EFF"><Folder /></el-icon>
                </div>
                <div class="recent-content">
                  <div class="recent-title">新增项目：人工智能算法研究</div>
                  <div class="recent-time">2小时前</div>
                </div>
              </div>
              <div class="recent-item">
                <div class="recent-icon">
                  <el-icon color="#52c41a"><Document /></el-icon>
                </div>
                <div class="recent-content">
                  <div class="recent-title">论文发表：机器学习在医疗诊断中的应用</div>
                  <div class="recent-time">5小时前</div>
                </div>
              </div>
              <div class="recent-item">
                <div class="recent-icon">
                  <el-icon color="#faad14"><Trophy /></el-icon>
                </div>
                <div class="recent-content">
                  <div class="recent-title">获得奖项：优秀科研成果奖</div>
                  <div class="recent-time">1天前</div>
                </div>
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
  Clock
} from '@element-plus/icons-vue';
</script>

<style scoped>
.dashboard-container {
  padding: 0;
}

.welcome-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 24px;
  color: white;
}

.welcome-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.welcome-text h1 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 12px;
}

.welcome-text p {
  font-size: 16px;
  opacity: 0.9;
}

.stats-overview {
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
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
}

.stat-number {
  font-size: 28px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #52c41a;
}

.quick-actions {
  margin-bottom: 24px;
}

.action-section,
.recent-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  height: 300px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.section-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.action-item:hover {
  background-color: #f8f9fa;
  border-color: #409EFF;
  transform: translateY(-2px);
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
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

.action-item span {
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.recent-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.recent-item:hover {
  background-color: #f8f9fa;
}

.recent-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recent-content {
  flex: 1;
}

.recent-title {
  font-size: 14px;
  color: #2c3e50;
  margin-bottom: 4px;
}

.recent-time {
  font-size: 12px;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .welcome-content {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .welcome-text h1 {
    font-size: 24px;
  }
  
  .stats-overview .el-col {
    margin-bottom: 16px;
  }
  
  .action-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-actions .el-col {
    margin-bottom: 16px;
  }
}
</style>