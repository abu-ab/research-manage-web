<template>
  <div class="page-container">
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

    <div class="search-section card-shadow">
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
              <el-button @click="reset" :icon="Refresh"> 重置 </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="table-section card-shadow">
      <el-table :data="list" border stripe class="award-table">
        <el-table-column label="奖项信息" prop="name" min-width="200">
        </el-table-column>
        <el-table-column
          label="关联类型"
          prop="targetType"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="getTypeTagType(row.targetType)">
              {{ getTypeLabel(row.targetType) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="奖项级别"
          prop="level"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            <el-tag type="warning" effect="light">{{
              handleLevel(row.level)
            }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="奖项等级"
          prop="awardRank"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            <div class="award-rank">
              <el-icon><Medal /></el-icon>
              <span>{{ handleRank(row.awardRank) }}</span>
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

        <el-table-column
          label="获奖时间"
          prop="awardDate"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            <div class="award-date">
              <el-icon><Calendar /></el-icon>
              <span>{{ row.awardDate }}</span>
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

    <AwardDialog
      v-model="dialogVisible"
      :data="currentRow"
      :targetType="query.targetType || 'PROJECT'"
      @success="loadData"
    />

    <el-dialog
      v-model="detailVisible"
      title="奖项详情"
      width="800px"
      :before-close="() => (detailVisible = false)"
    >
      <div v-if="currentRow" class="detail-content">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="奖项名称" :span="2">
            <el-tag type="warning" size="large">{{ currentRow.name }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="关联类型">
            <el-tag :type="getTypeTagType(currentRow.targetType)">
              {{ getTypeLabel(currentRow.targetType) }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="奖项级别">
            <el-tag type="warning" effect="light">{{
              handleLevel(currentRow.level)
            }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="奖项等级">
            <div class="award-rank">
              <el-icon><Medal /></el-icon>
              <span>{{ currentRow.awardRank }}</span>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="授奖单位">
            {{ currentRow.organization }}
          </el-descriptions-item>
          <el-descriptions-item label="获奖时间">
            <div class="award-date">
              <el-icon><Calendar /></el-icon>
              <span>{{ currentRow.awardDate }}</span>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="关联对象">
            {{ currentRow.targetName || "暂无" }}
          </el-descriptions-item>
          <el-descriptions-item label="奖项描述" :span="2">
            {{ currentRow.description || "暂无描述" }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button type="primary" @click="edit(currentRow)">编辑奖项</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import AwardDialog from "./AwardDialog.vue";
import { getAwardPage, deleteAward } from "@/api/award";
import { getDict } from "@/api/dict";
import {
  Trophy,
  Plus,
  Search,
  Folder,
  Document,
  Reading,
  Refresh,
  Medal,
  Calendar,
  Edit,
  View,
  Delete,
} from "@element-plus/icons-vue";

const query = reactive({
  name: "",
  targetType: "",
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

const getTypeTagType = (type) => {
  switch (type) {
    case "PROJECT":
      return "";
    case "PAPER":
      return "success";
    case "BOOK":
      return "warning";
    default:
      return "info";
  }
};

const getTypeLabel = (type) => {
  switch (type) {
    case "PROJECT":
      return "项目";
    case "PAPER":
      return "论文";
    case "BOOK":
      return "著作";
    default:
      return "未知";
  }
};

const levelOptions = ref([]);
const rankOptions = ref([]);

const handleLevel = (level) => {
  console.log(level);
  const option = levelOptions.value.find((opt) => opt.dictCode === level);
  console.log(option);
  return option ? option.dictLabel : level;
};

const handleRank = (rank) => {
  const option = rankOptions.value.find((opt) => opt.dictCode === rank);
  return option ? option.dictLabel : rank;
};

const loadFirstPage = async () => {
  page.pageNum = 1;
  loadData();
};

const loadData = async () => {
  const res = await getAwardPage({
    pageNum: page.pageNum,
    pageSize: page.pageSize,
    name: query.name,
    targetType: query.targetType,
  });

  list.value = res.data.records;
  page.total = res.data.total;
};

const reset = () => {
  query.name = "";
  query.targetType = "";
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
    await ElMessageBox.confirm(`确定删除奖项「${row.name}」吗？`, "提示", {
      type: "warning",
      confirmButtonText: "确认",
      cancelButtonText: "取消",
    });
    await deleteAward(row.id);
    ElMessage.success("删除成功");
    loadData();
  } catch (err) {
    // 取消或失败都不处理
  }
};

onMounted(async () => {
  levelOptions.value = await getDict("AWARD_LEVEL");
  rankOptions.value = await getDict("AWARD_RANK");
  loadData();
});
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
