<template>
  <div class="page-container">
    <!-- 页面头部 -->
    <div class="page-header card-shadow">
      <div class="header-content">
        <div class="header-left">
          <div class="page-title">
            <el-icon size="24" color="#faad14">
              <Trophy />
            </el-icon>
            <h2>科研奖项管理</h2>
          </div>
          <p class="page-description">管理科研成果获奖信息和荣誉记录</p>
        </div>
        <div class="header-actions">
          <el-button type="primary" size="large" @click="add" class="add-btn">
            <el-icon><Plus /></el-icon>
            新增奖项
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
              placeholder="奖项名称"
              clearable
              :prefix-icon="Trophy"
            />
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="query.targetType"
              placeholder="关联类型"
              clearable
              style="width: 100%"
            >
              <el-option label="科研项目" value="PROJECT">
                <div class="option-item">
                  <el-icon><Folder /></el-icon>
                  <span>科研项目</span>
                </div>
              </el-option>
              <el-option label="论文成果" value="PAPER">
                <div class="option-item">
                  <el-icon><Document /></el-icon>
                  <span>论文成果</span>
                </div>
              </el-option>
              <el-option label="著作成果" value="BOOK">
                <div class="option-item">
                  <el-icon><Reading /></el-icon>
                  <span>著作成果</span>
                </div>
              </el-option>
            </el-select>
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
            <div class="stat-icon" style="background: linear-gradient(135deg, #faad14, #d48806);">
              <el-icon size="24"><Trophy /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ page.total }}</div>
              <div class="stat-label">总奖项数</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #409EFF, #1890ff);">
              <el-icon size="24"><Folder /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ getTypeCount('PROJECT') }}</div>
              <div class="stat-label">项目奖项</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #52c41a, #389e0d);">
              <el-icon size="24"><Document /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ getTypeCount('PAPER') }}</div>
              <div class="stat-label">论文奖项</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #722ed1, #531dab);">
              <el-icon size="24"><Reading /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ getTypeCount('BOOK') }}</div>
              <div class="stat-label">著作奖项</div>
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
          <span>奖项列表</span>
        </div>
        <div class="table-tools">
          <el-button-group>
            <el-button :icon="Grid" size="small">表格视图</el-button>
            <el-button :icon="Menu" size="small">卡片视图</el-button>
          </el-button-group>
        </div>
      </div>

      <el-table :data="list" border stripe class="award-table">
        <el-table-column type="selection" width="55" />
        <el-table-column label="奖项信息" min-width="200">
          <template #default="{ row }">
            <div class="award-info">
              <div class="award-name">
                <el-icon color="#faad14"><Trophy /></el-icon>
                {{ row.name }}
              </div>
              <div class="award-meta">
                <el-tag size="small" :type="getTypeTagType(row.targetType)">
                  {{ getTypeLabel(row.targetType) }}
                </el-tag>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="奖项级别" prop="level" width="120" align="center">
          <template #default="{ row }">
            <el-tag type="warning" effect="light">{{ row.level }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="奖项等级" prop="awardRank" width="120" align="center">
          <template #default="{ row }">
            <div class="award-rank">
              <el-icon><Medal /></el-icon>
              <span>{{ row.awardRank }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="授奖单位" prop="organization" min-width="160">
          <template #default="{ row }">
            <div class="organization-info">
              <span>{{ row.organization }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="获奖时间" prop="awardDate" width="120" align="center">
          <template #default="{ row }">
            <div class="award-date">
              <el-icon><Calendar /></el-icon>
              <span>{{ row.awardDate }}</span>
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

    <AwardDialog
      v-model="dialogVisible"
      :data="currentRow"
      :targetType="query.targetType || 'PROJECT'"
      @success="loadData"
    />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import AwardDialog from "./AwardDialog.vue";
import { getAwardPage, deleteAward } from "@/api/award";
import { 
  Trophy, 
  Plus, 
  Search, 
  Folder, 
  Document, 
  Reading, 
  Refresh, 
  Download,
  List,
  Grid,
  Menu,
  Medal,
  Calendar,
  Edit,
  View,
  Delete
} from '@element-plus/icons-vue';

/** 查询条件 */
const query = reactive({
  name: "",
  targetType: ""
});

/** 列表数据 */
const list = ref([]);

/** 弹窗 */
const dialogVisible = ref(false);
const currentRow = ref(null);

/** 分页 */
const page = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
});

// 计算不同类型的奖项数量
const getTypeCount = (type) => {
  return list.value.filter(item => item.targetType === type).length;
};

// 获取类型标签样式
const getTypeTagType = (type) => {
  switch (type) {
    case 'PROJECT': return '';
    case 'PAPER': return 'success';
    case 'BOOK': return 'warning';
    default: return 'info';
  }
};

// 获取类型标签文本
const getTypeLabel = (type) => {
  switch (type) {
    case 'PROJECT': return '项目';
    case 'PAPER': return '论文';
    case 'BOOK': return '著作';
    default: return '未知';
  }
};

/** 加载第一页 */
const loadFirstPage = () => {
  page.pageNum = 1;
  loadData();
};

/** 加载数据 */
const loadData = async () => {
  const res = await getAwardPage({
    pageNum: page.pageNum,
    pageSize: page.pageSize,
    name: query.name,
    targetType: query.targetType
  });

  list.value = res.data.records;
  page.total = res.data.total;
};

/** 重置 */
const reset = () => {
  query.name = "";
  query.targetType = "";
  loadFirstPage();
};

/** 新增 */
const add = () => {
  currentRow.value = null;
  dialogVisible.value = true;
};

/** 编辑 */
const edit = (row) => {
  currentRow.value = { ...row };
  dialogVisible.value = true;
};

/** 删除 */
const remove = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定删除奖项「${row.name}」吗？`,
      "提示",
      { 
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }
    );
    await deleteAward(row.id);
    ElMessage.success("删除成功");
    loadData();
  } catch (err) {
    // 取消或失败都不处理
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

.award-table {
  border-radius: 8px;
  overflow: hidden;
}

.award-info {
  padding: 4px 0;
}

.award-name {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.award-meta {
  margin-top: 4px;
}

.award-rank,
.organization-info,
.award-date {
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
