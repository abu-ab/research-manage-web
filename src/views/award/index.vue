<template>
  <div class="bg-white p-4 rounded shadow-sm">
    <div class="flex justify-between mb-4">
      <div class="text-lg font-bold">科研奖项管理</div>
      <el-button type="primary" @click="add">新增奖项</el-button>
    </div>

    <div class="mb-4 flex gap-3 flex-wrap">
      <el-input
        v-model="query.name"
        placeholder="奖项名称"
        class="w-60"
        clearable
      />

      <el-select
        v-model="query.targetType"
        placeholder="关联类型"
        class="w-40"
        clearable
      >
        <el-option label="科研项目" value="PROJECT" />
        <el-option label="论文成果" value="PAPER" />
        <el-option label="著作成果" value="BOOK" />
      </el-select>

      <el-button type="primary" @click="loadFirstPage">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>

    <el-table :data="list" border>
      <el-table-column label="奖项名称" prop="name" min-width="160" />

      <el-table-column label="关联类型" width="120">
        <template #default="{ row }">
          <el-tag v-if="row.targetType === 'PROJECT'">项目</el-tag>
          <el-tag type="success" v-else-if="row.targetType === 'PAPER'">论文</el-tag>
          <el-tag type="warning" v-else>著作</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="奖项级别" prop="level" width="120" />
      <el-table-column label="奖项等级" prop="awardRank" width="120" />
      <el-table-column label="授奖单位" prop="organization" min-width="160" />
      <el-table-column label="获奖时间" prop="awardDate" width="120" />

      <el-table-column label="操作" width="160">
        <template #default="{ row }">
          <el-button link type="primary" @click="edit(row)">
            编辑
          </el-button>
          <el-button link type="danger" @click="remove(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="mt-4 flex justify-end">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :total="page.total"
        v-model:current-page="page.pageNum"
        v-model:page-size="page.pageSize"
        @current-change="loadData"
        @size-change="loadFirstPage"
      />
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
      { type: "warning" }
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
