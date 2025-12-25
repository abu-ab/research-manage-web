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
              <el-button @click="reset" :icon="Refresh"> 重置 </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="table-section card-shadow">
      <el-table :data="list" border stripe class="book-table">
        <el-table-column label="著作信息" prop="name" min-width="250">
        </el-table-column>
        <el-table-column label="作者" prop="author"></el-table-column>
        <el-table-column label="出版社" prop="publisher" width="180">
          <template #default="{ row }">
            <div class="publisher-info">
              <span>{{ row.publisher }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="ISBN" prop="isbn" width="150" />
        <el-table-column
          label="出版时间"
          prop="publishDate"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            <div class="publish-date">
              <el-icon><Calendar /></el-icon>
              <span>{{ row.publishDate }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230" fixed="right">
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

    <BookDialog
      v-model="dialogVisible"
      :data="currentRow"
      @success="loadData"
    />

    <el-dialog
      v-model="detailVisible"
      title="著作详情"
      width="800px"
      :before-close="() => (detailVisible = false)"
    >
      <div v-if="currentRow" class="detail-content">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="著作名称" :span="2">
            <el-tag type="success" size="large">{{ currentRow.name }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="作者">
            <el-tag type="primary">{{ currentRow.author }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="出版社">
            {{ currentRow.publisher }}
          </el-descriptions-item>
          <el-descriptions-item label="出版时间">
            {{ currentRow.publishDate }}
          </el-descriptions-item>
          <el-descriptions-item label="ISBN">
            {{ currentRow.isbn || "暂无" }}
          </el-descriptions-item>
          <el-descriptions-item label="页数">
            {{ currentRow.pages || "暂无" }}页
          </el-descriptions-item>
          <el-descriptions-item label="价格">
            {{ currentRow.price ? `¥${currentRow.price}` : "暂无" }}
          </el-descriptions-item>
          <el-descriptions-item label="著作简介" :span="2">
            {{ currentRow.description || "暂无简介" }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button type="primary" @click="edit(currentRow)">编辑著作</el-button>
      </template>
    </el-dialog>
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
  Calendar,
  Edit,
  View,
  Delete,
} from "@element-plus/icons-vue";

const query = reactive({
  name: "",
  author: "",
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

const loadFirstPage = () => {
  page.pageNum = 1;
  loadData();
};

const loadData = async () => {
  const res = await getBookPage({
    pageNum: page.pageNum,
    pageSize: page.pageSize,
    name: query.name,
    author: query.author,
  });
  list.value = res.data.records;
  page.total = res.data.total;
};

const reset = () => {
  query.name = "";
  query.author = "";
  loadFirstPage();
};

const add = () => {
  currentRow.value = null;
  dialogVisible.value = true;
};

const edit = (row) => {
  currentRow.value = { ...row };
  dialogVisible.value = true;
};

const viewDetail = (row) => {
  currentRow.value = { ...row };
  detailVisible.value = true;
};

const remove = async (row) => {
  try {
    await ElMessageBox.confirm(`确定删除著作「${row.name}」吗？`, "提示", {
      type: "warning",
      confirmButtonText: "确认",
      cancelButtonText: "取消",
    });
    await deleteBook(row.id);
    ElMessage.success("删除成功");
    loadData();
  } catch (err) {}
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
