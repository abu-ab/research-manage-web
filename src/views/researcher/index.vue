<template>
  <div class="page-container">
    <!-- 页面头部 -->
    <div class="page-header card-shadow">
      <div class="header-content">
        <div class="header-left">
          <div class="page-title">
            <el-icon size="24" color="#52c41a">
              <User />
            </el-icon>
            <h2>科研人员管理</h2>
          </div>
          <p class="page-description">管理科研团队成员信息和学术资料</p>
        </div>
        <div class="header-actions">
          <el-button type="primary" size="large" @click="add" class="add-btn">
            <el-icon><Plus /></el-icon>
            新增人员
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
              placeholder="姓名" 
              clearable
              :prefix-icon="User"
            />
          </el-col>
          <el-col :span="6">
            <el-input 
              v-model="query.code" 
              placeholder="工号" 
              clearable
              :prefix-icon="Key"
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
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #52c41a, #389e0d);">
              <el-icon size="24"><User /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ page.total }}</div>
              <div class="stat-label">总人员数</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #1890ff, #096dd9);">
              <el-icon size="24"><Star /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ getProfessorCount() }}</div>
              <div class="stat-label">教授人数</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #722ed1, #531dab);">
              <el-icon size="24"><UserFilled /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ getAssociateProfessorCount() }}</div>
              <div class="stat-label">副教授人数</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #faad14, #d48806);">
              <el-icon size="24"><Avatar /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ getLecturerCount() }}</div>
              <div class="stat-label">讲师人数</div>
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
          <span>人员列表</span>
        </div>
        <div class="table-tools">
          <el-button-group>
            <el-button :icon="Grid" size="small">表格视图</el-button>
            <el-button :icon="Menu" size="small">卡片视图</el-button>
          </el-button-group>
        </div>
      </div>

      <el-table :data="list" border stripe class="researcher-table">
        <el-table-column type="selection" width="55" />
        <el-table-column label="人员信息" min-width="200">
          <template #default="{ row }">
            <div class="researcher-info">
              <div class="researcher-avatar">
                <el-avatar :size="40" class="avatar">
                  <el-icon><User /></el-icon>
                </el-avatar>
              </div>
              <div class="researcher-details">
                <div class="researcher-name">{{ row.name }}</div>
                <div class="researcher-code">工号：{{ row.code }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学院" prop="college" width="180">
          <template #default="{ row }">
            <div class="college-info">
              <el-icon><School /></el-icon>
              <span>{{ row.college }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="职称" prop="title" width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="getTitleTagType(row.title)" effect="light">
              {{ row.title }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" prop="phone" width="140">
          <template #default="{ row }">
            <div class="contact-info">
              <el-icon><Phone /></el-icon>
              <span>{{ row.phone }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="入职时间" prop="joinDate" width="120" align="center">
          <template #default="{ row }">
            <div class="join-date">
              <el-icon><Calendar /></el-icon>
              <span>{{ formatDate(row.joinDate) }}</span>
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
    <ResearcherDialog
      v-model="dialogVisible"
      :data="currentRow"
      @success="loadData"
    />

    <!-- 详情弹窗 -->
    <el-dialog
      v-model="detailVisible"
      title="人员详情"
      width="700px"
      :before-close="() => detailVisible = false"
    >
      <div v-if="currentRow" class="detail-content">
        <div class="researcher-profile">
          <el-avatar :size="80" class="profile-avatar">
            <el-icon><User /></el-icon>
          </el-avatar>
          <div class="profile-info">
            <h3>{{ currentRow.name }}</h3>
            <p>{{ currentRow.title }} · {{ currentRow.college }}</p>
          </div>
        </div>
        
        <el-descriptions :column="2" border class="detail-descriptions">
          <el-descriptions-item label="姓名">
            {{ currentRow.name }}
          </el-descriptions-item>
          <el-descriptions-item label="工号">
            {{ currentRow.code }}
          </el-descriptions-item>
          <el-descriptions-item label="所属学院">
            {{ currentRow.college }}
          </el-descriptions-item>
          <el-descriptions-item label="职称">
            <el-tag :type="getTitleTagType(currentRow.title)">
              {{ currentRow.title }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="联系电话">
            {{ currentRow.phone }}
          </el-descriptions-item>
          <el-descriptions-item label="入职时间">
            {{ formatDate(currentRow.joinDate) }}
          </el-descriptions-item>
          <el-descriptions-item label="邮箱地址" :span="2">
            {{ currentRow.email || '暂未填写' }}
          </el-descriptions-item>
          <el-descriptions-item label="个人简介" :span="2">
            {{ currentRow.bio || '暂无个人简介' }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button type="primary" @click="edit(currentRow)">编辑信息</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import ResearcherDialog from "./ResearcherDialog.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getResearcherPage, deleteResearcher } from "@/api/researcher";
import { formatDate } from "@/utils/format";
import { 
  User, 
  Plus, 
  Search, 
  Key, 
  Refresh, 
  Download,
  Star,
  UserFilled,
  Avatar,
  List,
  Grid,
  Menu,
  School,
  Phone,
  Calendar,
  Edit,
  View,
  Delete
} from '@element-plus/icons-vue';

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

// 计算不同职称的人数
const getProfessorCount = () => {
  return list.value.filter(item => item.title === '教授').length;
};

const getAssociateProfessorCount = () => {
  return list.value.filter(item => item.title === '副教授').length;
};

const getLecturerCount = () => {
  return list.value.filter(item => item.title === '讲师').length;
};

// 获取职称标签类型
const getTitleTagType = (title) => {
  switch (title) {
    case '教授': return '';
    case '副教授': return 'success';
    case '讲师': return 'warning';
    case '助教': return 'info';
    default: return 'info';
  }
};

const loadFirstPage = () => {
  page.pageNum = 1;
  loadData();
};

const loadData = async () => {
  const res = await getResearcherPage({
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
  ElMessageBox.confirm(`确认删除科研人员 "${row.name}" 吗？`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        await deleteResearcher(row.id);
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

.researcher-table {
  border-radius: 8px;
  overflow: hidden;
}

.researcher-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 0;
}

.researcher-avatar .avatar {
  background: linear-gradient(135deg, #52c41a, #389e0d);
}

.researcher-details {
  flex: 1;
}

.researcher-name {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 4px;
}

.researcher-code {
  font-size: 12px;
  color: #666;
}

.college-info,
.contact-info,
.join-date {
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
  
  .researcher-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
/* 详情页面样式 */
.detail-content {
  padding: 16px 0;
}

.researcher-profile {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
  padding: 20px;
  background: var(--color-bg-tertiary);
  border-radius: 8px;
}

.profile-avatar {
  background: linear-gradient(135deg, #52c41a, #389e0d);
}

.profile-info h3 {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.profile-info p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.detail-descriptions {
  margin-top: 16px;
}