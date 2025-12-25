<template>
  <div class="page-container">
    <!-- 页面头部 -->
    <div class="page-header card-shadow">
      <div class="header-content">
        <div class="header-left">
          <div class="page-title">
            <el-icon size="24" color="#909399">
              <Setting />
            </el-icon>
            <h2>字典管理</h2>
          </div>
          <p class="page-description">管理系统字典数据和配置项</p>
        </div>
        <div class="header-actions">
          <el-button type="primary" size="large" @click="add" class="add-btn">
            <el-icon><Plus /></el-icon>
            新增字典
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
              v-model="query.dictType" 
              placeholder="字典类型" 
              clearable
              :prefix-icon="Setting"
            />
          </el-col>
          <el-col :span="6">
            <el-input 
              v-model="query.dictLabel" 
              placeholder="字典标签" 
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
        <el-col :span="8">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #909399, #73767a);">
              <el-icon size="24"><Setting /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ page.total }}</div>
              <div class="stat-label">总字典数</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #52c41a, #389e0d);">
              <el-icon size="24"><SuccessFilled /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ getEnabledCount() }}</div>
              <div class="stat-label">启用状态</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="stat-card card-shadow">
            <div class="stat-icon" style="background: linear-gradient(135deg, #1890ff, #096dd9);">
              <el-icon size="24"><Collection /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ getTypeCount() }}</div>
              <div class="stat-label">字典类型</div>
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
          <span>字典列表</span>
        </div>
        <div class="table-tools">
          <el-button-group>
            <el-button :icon="Grid" size="small">表格视图</el-button>
            <el-button :icon="Menu" size="small">分组视图</el-button>
          </el-button-group>
        </div>
      </div>

      <el-table :data="list" border stripe class="dict-table">
        <el-table-column type="selection" width="55" />
        <el-table-column label="字典信息" min-width="200">
          <template #default="{ row }">
            <div class="dict-info">
              <div class="dict-label">
                <el-icon color="#909399"><Setting /></el-icon>
                {{ row.dictLabel }}
              </div>
              <div class="dict-meta">
                <span class="dict-type">类型：{{ row.dictType }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column label="字典编码" prop="dictCode" width="150">
          <template #default="{ row }">
            <div class="dict-code">
              <el-tag size="small" type="info">{{ row.dictCode }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="排序" prop="sort" width="80" align="center">
          <template #default="{ row }">
            <div class="sort-info">
              <el-icon><Sort /></el-icon>
              <span>{{ row.sort }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="状态" prop="status" width="100" align="center">
          <template #default="{ row }">
            <el-tag 
              :type="row.status === 1 ? 'success' : 'info'" 
              effect="light"
              size="small"
            >
              <el-icon>
                <component :is="row.status === 1 ? 'CircleCheckFilled' : 'CircleCloseFilled'" />
              </el-icon>
              {{ row.status === 1 ? '启用' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="创建时间" prop="createTime" width="120" align="center">
          <template #default="{ row }">
            <div class="create-time">
              <el-icon><Calendar /></el-icon>
              <span>{{ formatDate(row.createTime) }}</span>
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
    <DictionaryDialog
      v-model="dialogVisible"
      :data="currentRow"
      @success="loadData"
    />

    <!-- 详情弹窗 -->
    <el-dialog
      v-model="detailVisible"
      title="字典详情"
      width="800px"
      :before-close="() => detailVisible = false"
    >
      <div v-if="currentRow" class="detail-content">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="字典标签" :span="2">
            <el-tag type="primary" size="large">{{ currentRow.dictLabel }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="字典类型">
            {{ currentRow.dictType }}
          </el-descriptions-item>
          <el-descriptions-item label="字典编码">
            <el-tag type="info">{{ currentRow.dictCode }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="排序">
            <div class="sort-info">
              <el-icon><Sort /></el-icon>
              <span>{{ currentRow.sort }}</span>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag 
              :type="currentRow.status === 1 ? 'success' : 'info'" 
              effect="light"
            >
              <el-icon>
                <component :is="currentRow.status === 1 ? 'CircleCheckFilled' : 'CircleCloseFilled'" />
              </el-icon>
              {{ currentRow.status === 1 ? '启用' : '停用' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            <div class="create-time">
              <el-icon><Calendar /></el-icon>
              <span>{{ formatDate(currentRow.createTime) }}</span>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="备注" :span="2">
            {{ currentRow.remark || '暂无备注' }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button type="primary" @click="edit(currentRow)">编辑字典</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import DictionaryDialog from "./DictionaryDialog.vue";
import { getDictPage, deleteDict } from "@/api/dict";
import { ElMessage, ElMessageBox } from "element-plus";
import { formatDate } from "@/utils/format";
import { 
  Setting, 
  Plus, 
  Search, 
  Key, 
  Refresh, 
  Download,
  SuccessFilled,
  Collection,
  List,
  Grid,
  Menu,
  Sort,
  CircleCheckFilled,
  CircleCloseFilled,
  Calendar,
  Edit,
  View,
  Delete
} from '@element-plus/icons-vue';

const query = reactive({
  dictType: "",
  dictLabel: ""
});

const list = ref([]);
const dialogVisible = ref(false);
const detailVisible = ref(false);
const currentRow = ref(null);

const page = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
});

// 计算启用状态的字典数量
const getEnabledCount = () => {
  return list.value.filter(item => item.status === 1).length;
};

// 计算字典类型数量
const getTypeCount = () => {
  const types = new Set(list.value.map(item => item.dictType));
  return types.size;
};

const loadFirstPage = () => {
  page.pageNum = 1;
  loadData();
};

const loadData = async () => {
  const res = await getDictPage({
    pageNum: page.pageNum,
    pageSize: page.pageSize,
    dictType: query.dictType,
    dictLabel: query.dictLabel
  });
  list.value = res.data.records;
  page.total = res.data.total;
};

const reset = () => {
  query.dictType = "";
  query.dictLabel = "";
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
    await ElMessageBox.confirm(
      `确定删除字典「${row.dictLabel}」吗？`,
      "提示",
      { 
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }
    );
    await deleteDict(row.id);
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

.dict-table {
  border-radius: 8px;
  overflow: hidden;
}

.dict-info {
  padding: 4px 0;
}

.dict-label {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dict-meta {
  font-size: 12px;
  color: #666;
}

.dict-code {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sort-info,
.create-time {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
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