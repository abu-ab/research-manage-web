<template>
  <div class="page-container">
    <div class="page-header card-shadow">
      <div class="header-content">
        <div class="header-left">
          <div class="page-title">
            <el-icon size="24" color="#409EFF">
              <Folder />
            </el-icon>
            <h2>科研项目管理</h2>
          </div>
          <p class="page-description">管理和跟踪科研项目的全生命周期</p>
        </div>
        <div class="header-actions">
          <el-button type="primary" size="large" @click="add" class="add-btn">
            <el-icon><Plus /></el-icon>
            新增项目
          </el-button>
        </div>
      </div>
    </div>

    <div class="search-section card-shadow">
      <div class="search-form">
        <el-row :gutter="16">
          <el-col :span="6">
            <el-input
              v-model="query.name"
              placeholder="项目名称"
              clearable
              :prefix-icon="Document"
            />
          </el-col>
          <el-col :span="6">
            <el-input
              v-model="query.code"
              placeholder="项目编号"
              clearable
              :prefix-icon="Key"
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
      <el-table :data="list" border stripe class="project-table">
        <el-table-column label="项目信息" prop="name" min-width="200">
        </el-table-column>
        <el-table-column label="项目编号" prop="code" width="150" />
        <el-table-column label="项目性质" prop="type" width="120" />
        <el-table-column label="负责人" prop="leader" width="100" />
        <el-table-column label="参与人数" prop="memberCount" width="100">
        </el-table-column>
        <el-table-column label="项目周期" prop="duration" width="120">
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="120">
          <template #default="{ row }">
            {{ formatDate(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="项目状态" width="120">
          <template #default="{ row }">
            <el-tag
              :type="statusTagType(row.status)"
              effect="light"
              :icon="getStatusIcon(row.status)"
            >
              {{ PROJECT_STATUS_MAP[row.status] }}
            </el-tag>
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

    <ProjectDialog
      v-model="dialogVisible"
      :data="currentRow"
      @success="loadData"
    />

    <el-dialog
      v-model="detailVisible"
      title="项目详情"
      width="800px"
      :before-close="() => (detailVisible = false)"
    >
      <div v-if="currentRow" class="detail-content">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="项目名称" :span="2">
            <el-tag type="primary" size="large">{{ currentRow.name }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="项目编号">
            {{ currentRow.code }}
          </el-descriptions-item>
          <el-descriptions-item label="项目性质">
            {{ currentRow.type }}
          </el-descriptions-item>
          <el-descriptions-item label="项目负责人">
            <el-tag type="success">{{ currentRow.leader }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="参与人数">
            <el-tag type="info">{{ currentRow.memberCount }}人</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="项目周期">
            {{ currentRow.duration }}天
          </el-descriptions-item>
          <el-descriptions-item label="项目状态">
            <el-tag :type="statusTagType(currentRow.status)" effect="light">
              {{ PROJECT_STATUS_MAP[currentRow.status] }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            {{ formatDate(currentRow.createTime) }}
          </el-descriptions-item>
          <el-descriptions-item label="项目描述" :span="2">
            {{ currentRow.description || "暂无描述" }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button type="primary" @click="edit(currentRow)">编辑项目</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import ProjectDialog from "./ProjectDialog.vue";
import { getProjectPage, deleteProject } from "@/api/project";
import { formatDate } from "@/utils/format";
import { PROJECT_STATUS_MAP } from "@/constants/projectStatus";
import {
  Folder,
  Plus,
  Search,
  Document,
  Key,
  Refresh,
  Timer,
  Edit,
  View,
  Delete,
} from "@element-plus/icons-vue";

const query = reactive({
  name: "",
  code: "",
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

// 计算不同状态的项目数量
const getStatusCount = (status) => {
  return list.value.filter((item) => item.status === status).length;
};

// 获取状态图标
const getStatusIcon = (status) => {
  switch (status) {
    case 0:
      return "Clock";
    case 1:
      return "SuccessFilled";
    case 2:
      return "Warning";
    case 3:
      return "CircleCheckFilled";
    default:
      return "InfoFilled";
  }
};

const statusTagType = (status) => {
  switch (status) {
    case 0:
      return "info";
    case 1:
      return "success";
    case 2:
      return "warning";
    case 3:
      return "danger";
    default:
      return "info";
  }
};

const loadFirstPage = () => {
  page.pageNum = 1;
  loadData();
};

const loadData = async () => {
  const res = await getProjectPage({
    pageNum: page.pageNum,
    pageSize: page.pageSize,
    name: query.name,
    code: query.code,
  });

  list.value = res.data.records;
  page.total = res.data.total;
};

const reset = () => {
  query.name = "";
  query.code = "";
  loadData();
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

const remove = (row) => {
  ElMessageBox.confirm(`确认删除项目 "${row.name}" 吗？`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        await deleteProject(row.id);
        ElMessage.success("删除成功");
        loadData();
      } catch (error) {
        ElMessage.error("删除失败");
      }
    })
    .catch(() => {});
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

.project-table {
  border-radius: 8px;
  overflow: hidden;
}

.project-info {
  padding: 4px 0;
}

.project-name {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 4px;
}

.project-code {
  font-size: 12px;
  color: #666;
}

.duration-info {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
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
