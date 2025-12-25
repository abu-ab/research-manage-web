<template>
  <div class="page-container">
    <!-- 页面头部 -->
    <div class="page-header card-shadow">
      <div class="header-content">
        <div class="header-left">
          <div class="page-title">
            <el-icon size="24" color="#722ed1">
              <Document />
            </el-icon>
            <h2>期刊论文管理</h2>
          </div>
          <p class="page-description">管理学术论文发表和检索收录情况</p>
        </div>
        <div class="header-actions">
          <el-button type="primary" size="large" @click="add" class="add-btn">
            <el-icon><Plus /></el-icon>
            新增论文
          </el-button>
        </div>
      </div>
    </div>

    <!-- 搜索区域 -->
    <div class="search-section card-shadow">
      <div class="search-header">
        <el-icon><Search /></el-icon>
        <span>搜索筛选</span>
      </div>
      <div class="search-form">
        <el-row :gutter="16">
          <el-col :span="6">
            <el-input 
              v-model="query.title" 
              placeholder="论文标题" 
              clearable
              :prefix-icon="Document"
            />
          </el-col>
          <el-col :span="6">
            <el-input 
              v-model="query.author" 
              placeholder="作者" 
              clearable
              :prefix-icon="User"
            />
          </el-col>
          <el-col :span="6">
            <el-select 
              v-model="query.source" 
              placeholder="检索来源" 
              clearable
              style="width: 100%"
            >
              <el-option label="SCI" value="SCI">
                <div class="option-item">
                  <el-tag size="small" type="danger">SCI</el-tag>
                  <span>Science Citation Index</span>
                </div>
              </el-option>
              <el-option label="EI" value="EI">
                <div class="option-item">
                  <el-tag size="small" type="warning">EI</el-tag>
                  <span>Engineering Index</span>
                </div>
              </el-option>
              <el-option label="核心期刊" value="CORE">
                <div class="option-item">
                  <el-tag size="small" type="success">核心</el-tag>
                  <span>核心期刊</span>
                </div>
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <div class="search-actions">
              <el-button type="primary" @click="loadFirstPage" :icon="Search">
                查询
              </el-button>
              <el-button @click="reset" :icon="Refresh">
                重置
              </el-button>
              <el-button type="success" :icon="Download">
                导出
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-section">
      <el-row :gutter="16">
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #722ed1, #531dab);">
              <el-icon size="24"><Document /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ page.total }}</div>
              <div class="stat-label">总论文数</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #f5222d, #cf1322);">
              <el-icon size="24"><Star /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ getSCICount() }}</div>
              <div class="stat-label">SCI论文</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #faad14, #d48806);">
              <el-icon size="24"><Medal /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ getEICount() }}</div>
              <div class="stat-label">EI论文</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #52c41a, #389e0d);">
              <el-icon size="24"><Trophy /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ getCoreCount() }}</div>
              <div class="stat-label">核心期刊</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 表格区域 -->
    <div class="table-section card-shadow">
      <div class="table-header">
        <div class="table-title">
          <el-icon><List /></el-icon>
          <span>论文列表</span>
        </div>
        <div class="table-tools">
          <el-button-group>
            <el-button :icon="Grid" size="small">表格视图</el-button>
            <el-button :icon="Menu" size="small">卡片视图</el-button>
          </el-button-group>
        </div>
      </div>

      <el-table :data="list" border stripe class="paper-table">
        <el-table-column type="selection" width="55" />
        <el-table-column label="论文信息" min-width="300">
          <template #default="{ row }">
            <div class="paper-info">
              <div class="paper-title">
                <el-icon color="#722ed1"><Document /></el-icon>
                {{ row.title }}
              </div>
              <div class="paper-meta">
                <span class="author">作者：{{ row.author }}</span>
                <el-tag 
                  size="small" 
                  :type="getSourceTagType(row.source)"
                  style="margin-left: 8px;"
                >
                  {{ row.source }}
                </el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column label="期刊信息" prop="journal" min-width="180">
          <template #default="{ row }">
            <div class="journal-info">
              <div class="journal-name">{{ row.journal }}</div>
              <div class="journal-meta">
                <span v-if="row.impactFactor" class="impact-factor">
                  IF: {{ row.impactFactor }}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="检索来源" prop="source" width="120" align="center">
          <template #default="{ row }">
            <el-tag 
              :type="getSourceTagType(row.source)" 
              effect="light"
              size="small"
            >
              {{ row.source }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="发表时间" prop="publishDate" width="120" align="center">
          <template #default="{ row }">
            <div class="publish-date">
              <el-icon><Calendar /></el-icon>
              <span>{{ row.publishDate }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="引用次数" prop="citations" width="100" align="center">
          <template #default="{ row }">
            <div class="citations">
              <el-icon><DataAnalysis /></el-icon>
              <span>{{ row.citations || 0 }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button link type="primary" @click="edit(row)" :icon="Edit">
                编辑
              </el-button>
              <el-button link type="info" @click="viewDetail(row)" :icon="View">
                详情
              </el-button>
              <el-button link type="danger" @click="remove(row)" :icon="Delete">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          v-model:current-page="page.pageNum"
          v-model:page-size="page.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          @current-change="loadData"
          @size-change="loadFirstPage"
        />
      </div>
    </div>

    <!-- 弹窗 -->
    <PaperDialog
      v-model="dialogVisible"
      :data="currentRow"
      @success="loadData"
    />

    <!-- 详情弹窗 -->
    <el-dialog
      v-model="detailVisible"
      title="论文详情"
      width="900px"
      :before-close="() => detailVisible = false"
    >
      <div v-if="currentRow" class="detail-content">
        <div class="paper-header">
          <div class="paper-icon">
            <el-icon size="40" color="#722ed1"><Document /></el-icon>
          </div>
          <div class="paper-title-info">
            <h3>{{ currentRow.title }}</h3>
            <div class="paper-meta">
              <el-tag :type="getSourceTagType(currentRow.source)" size="large">
                {{ currentRow.source }}
              </el-tag>
              <span class="journal-name">{{ currentRow.journal }}</span>
            </div>
          </div>
        </div>
        
        <el-descriptions :column="2" border class="detail-descriptions">
          <el-descriptions-item label="论文标题" :span="2">
            {{ currentRow.title }}
          </el-descriptions-item>
          <el-descriptions-item label="作者">
            {{ currentRow.author }}
          </el-descriptions-item>
          <el-descriptions-item label="期刊名称">
            {{ currentRow.journal }}
          </el-descriptions-item>
          <el-descriptions-item label="检索来源">
            <el-tag :type="getSourceTagType(currentRow.source)">
              {{ currentRow.source }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="发表时间">
            {{ currentRow.publishDate }}
          </el-descriptions-item>
          <el-descriptions-item label="影响因子">
            <el-tag v-if="currentRow.impactFactor" type="warning">
              IF: {{ currentRow.impactFactor }}
            </el-tag>
            <span v-else>暂无数据</span>
          </el-descriptions-item>
          <el-descriptions-item label="引用次数">
            <el-tag type="info">{{ currentRow.citations || 0 }}次</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="DOI" :span="2">
            {{ currentRow.doi || '暂无DOI' }}
          </el-descriptions-item>
          <el-descriptions-item label="关键词" :span="2">
            {{ currentRow.keywords || '暂无关键词' }}
          </el-descriptions-item>
          <el-descriptions-item label="摘要" :span="2">
            <div class="abstract-content">
              {{ currentRow.abstract || '暂无摘要' }}
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button type="primary" @click="edit(currentRow)">编辑论文</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import PaperDialog from "./PaperDialog.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getPaperPage, deletePaper } from "@/api/paper";
import { 
  Document, 
  Plus, 
  Search, 
  User, 
  Refresh, 
  Download,
  Star,
  Medal,
  Trophy,
  List,
  Grid,
  Menu,
  Calendar,
  DataAnalysis,
  Edit,
  View,
  Delete
} from '@element-plus/icons-vue';

const query = reactive({
  title: "",
  author: "",
  source: "",
});

const list = ref([]);
const dialogVisible = ref(false);
const detailVisible = ref(false);
const currentRow = ref(null);

const page = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});

// 计算不同检索来源的论文数量
const getSCICount = () => {
  return list.value.filter(item => item.source === 'SCI').length;
};

const getEICount = () => {
  return list.value.filter(item => item.source === 'EI').length;
};

const getCoreCount = () => {
  return list.value.filter(item => item.source === 'CORE').length;
};

// 获取检索来源标签类型
const getSourceTagType = (source) => {
  switch (source) {
    case 'SCI': return 'danger';
    case 'EI': return 'warning';
    case 'CORE': return 'success';
    default: return 'info';
  }
};

// 加载第一页
const loadFirstPage = () => {
  page.pageNum = 1;
  loadData();
};

// 加载数据
const loadData = async () => {
  const res = await getPaperPage({
    pageNum: page.pageNum,
    pageSize: page.pageSize,
    title: query.title,
    author: query.author,
    source: query.source,
  });
  list.value = res.data.records;
  page.total = res.data.total;
};

// 重置查询条件
const reset = () => {
  query.title = "";
  query.author = "";
  query.source = "";
  loadFirstPage();
};

// 新增
const add = () => {
  currentRow.value = null;
  dialogVisible.value = true;
};

// 编辑
const edit = (row) => {
  currentRow.value = { ...row };
  dialogVisible.value = true;
};

// 查看详情
const viewDetail = (row) => {
  currentRow.value = { ...row };
  detailVisible.value = true;
};

// 删除
const remove = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定删除论文「${row.title}」吗？`,
      "提示",
      { 
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }
    );
    await deletePaper(row.id);
    ElMessage.success("删除成功");
    loadData();
  } catch (err) {
    // 用户取消或删除失败
  }
};

onMounted(loadData);
</script>
<style scoped>
.page-container {
  padding: 0;
}

.page-header {
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
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
  gap: 12px;
  margin-bottom: 8px;
}

.page-title h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 24px;
  font-weight: 600;
}

.page-description {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.add-btn {
  height: 40px;
  padding: 0 24px;
  font-size: 14px;
  border-radius: 8px;
}

.search-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
}

.search-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #2c3e50;
  font-weight: 500;
}

.search-actions {
  display: flex;
  gap: 8px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stats-section {
  margin-bottom: 16px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.table-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.table-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2c3e50;
  font-weight: 500;
}

.paper-table {
  border-radius: 8px;
  overflow: hidden;
}

.paper-info {
  padding: 4px 0;
}

.paper-title {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 1.4;
}

.paper-meta {
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
}

.journal-info {
  padding: 4px 0;
}

.journal-name {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 4px;
}

.journal-meta {
  font-size: 12px;
  color: #666;
}

.impact-factor {
  background: rgba(114, 46, 209, 0.1);
  color: #722ed1;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.publish-date,
.citations {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .search-form .el-col {
    margin-bottom: 12px;
  }
  
  .stats-section .el-col {
    margin-bottom: 12px;
  }
  
  .paper-title {
    font-size: 14px;
  }
  
  .paper-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>