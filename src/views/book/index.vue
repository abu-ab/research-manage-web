<template>
  <div class="page-container">
    <!-- 页面头部 -->
    <div class="page-header card-shadow">
      <div class="header-content">
        <div class="header-left">
          <div class="page-title">
            <el-icon size="24" color="#52c41a">
              <Reading />
            </el-icon>
            <h2>著作管理</h2>
          </div>
          <p class="page-description">管理学术著作和出版物信息</p>
        </div>
        <div class="header-actions">
          <el-button type="primary" size="large" @click="add" class="add-btn">
            <el-icon><Plus /></el-icon>
            新增著作
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
              v-model="query.name" 
              placeholder="书名" 
              clearable
              :prefix-icon="Reading"
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
          <el-col :span="12">
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
        <el-col :span="8">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #52c41a, #389e0d);">
              <el-icon size="24"><Reading /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ page.total }}</div>
              <div class="stat-label">总著作数</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #1890ff, #096dd9);">
              <el-icon size="24"><User /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ getUniqueAuthors() }}</div>
              <div class="stat-label">作者数量</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #722ed1, #531dab);">
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ getUniquePublishers() }}</div>
              <div class="stat-label">出版社数</div>
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
          <span>著作列表</span>
        </div>
        <div class="table-tools">
          <el-button-group>
            <el-button :icon="Grid" size="small">表格视图</el-button>
            <el-button :icon="Menu" size="small">卡片视图</el-button>
          </el-button-group>
        </div>
      </div>

      <el-table :data="list" border stripe class="book-table">
        <el-table-column type="selection" width="55" />
        <el-table-column label="著作信息" min-width="250">
          <template #default="{ row }">
            <div class="book-info">
              <div class="book-title">
                <el-icon color="#52c41a"><Reading /></el-icon>
                {{ row.name }}
              </div>
              <div class="book-meta">
                <span class="author">作者：{{ row.author }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="出版社" prop="publisher" width="180">
          <template #default="{ row }">
            <div class="publisher-info">
              <span>{{ row.publisher }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="出版时间" prop="publishDate" width="120" align="center">
          <template #default="{ row }">
            <div class="publish-date">
              <el-icon><Calendar /></el-icon>
              <span>{{ row.publishDate }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button link type="primary" @click="edit(row)" :icon="Edit">
                编辑
              </el-button>
              <el-button link type="info" :icon="View">
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
    <BookDialog
      v-model="dialogVisible"
      :data="currentRow"
      @success="loadData"
    />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import BookDialog from "./BookDialog.vue";
import { getBookPage, deleteBook } from "@/api/book";
import { ElMessage, ElMessageBox } from "element-plus";
import { 
  Reading, 
  Plus, 
  Search, 
  User, 
  Refresh, 
  Download,
  List,
  Grid,
  Menu,
  Calendar,
  Edit,
  View,
  Delete
} from '@element-plus/icons-vue';

const query = reactive({
  name: "",
  author: ""
});

const list = ref([]);
const dialogVisible = ref(false);
const currentRow = ref(null);

const page = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
});

// 计算唯一作者数量
const getUniqueAuthors = () => {
  const authors = new Set(list.value.map(item => item.author));
  return authors.size;
};

// 计算唯一出版社数量
const getUniquePublishers = () => {
  const publishers = new Set(list.value.map(item => item.publisher));
  return publishers.size;
};

// 加载第一页
const loadFirstPage = () => {
  page.pageNum = 1;
  loadData();
};

// 加载数据
const loadData = async () => {
  const res = await getBookPage({
    pageNum: page.pageNum,
    pageSize: page.pageSize,
    name: query.name,
    author: query.author
  });
  list.value = res.data.records;
  page.total = res.data.total;
};

// 重置
const reset = () => {
  query.name = "";
  query.author = "";
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

// 删除
const remove = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定删除著作「${row.name}」吗？`,
      "提示",
      { 
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }
    );
    await deleteBook(row.id);
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

.book-table {
  border-radius: 8px;
  overflow: hidden;
}

.book-info {
  padding: 4px 0;
}

.book-title {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.book-meta {
  font-size: 12px;
  color: #666;
}

.publisher-info,
.publish-date {
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
}
</style>
