<template>
  <div class="bg-white p-4 rounded shadow-sm">
    <!-- 标题 -->
    <div class="flex justify-between mb-4">
      <div class="text-lg font-bold">科研人员管理</div>
      <el-button type="primary" @click="add">新增人员</el-button>
    </div>

    <!-- 查询 -->
    <div class="mb-4 flex gap-3 flex-wrap">
      <el-input v-model="query.name" placeholder="姓名" class="w-48" />
      <el-input v-model="query.code" placeholder="工号" class="w-48" />
      <el-button type="primary" @click="loadFirstPage">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border>
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="工号" prop="code" />
      <el-table-column label="学院" prop="college" />
      <el-table-column label="职称" prop="title" />
      <el-table-column label="联系电话" prop="phone" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button link type="primary" @click="edit(row)">编辑</el-button>
          <el-button link type="danger" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-4 flex justify-end">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :total="page.total"
        v-model:current-page="page.pageNum"
        v-model:page-size="page.pageSize"
        :prev-text="'上一页'"
        :next-text="'下一页'"
      />
    </div>
    <!-- 弹窗 -->
    <ResearcherDialog
      v-model="dialogVisible"
      :data="currentRow"
      @success="loadData"
    />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import ResearcherDialog from "./ResearcherDialog.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getResearcherPage, deleteResearcher } from "@/api/researcher";

const query = reactive({
  name: "",
  code: "",
});

const list = ref([]);
const dialogVisible = ref(false);
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
        // 删除后刷新列表
        loadData();
      } catch (error) {
        ElMessage.error("删除失败");
      }
    })
    .catch(() => {
      // 取消删除
    });
};

onMounted(loadData);
</script>
