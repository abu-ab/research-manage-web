<template>
  <div class="bg-white p-4 rounded shadow-sm">
    <!-- 标题 -->
    <div class="flex justify-between mb-4">
      <div class="text-lg font-bold">科研项目管理</div>
      <el-button type="primary" @click="add">新增项目</el-button>
    </div>

    <!-- 查询 -->
    <div class="mb-4 flex gap-3 flex-wrap">
      <el-input v-model="query.name" placeholder="项目名称" class="w-48" />
      <el-input v-model="query.code" placeholder="项目编号" class="w-48" />
      <el-button type="primary" @click="loadFirstPage">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border>
      <el-table-column label="项目名称" prop="name" />
      <el-table-column label="项目编号" prop="code" />
      <el-table-column label="项目性质" prop="type" />
      <el-table-column label="天数" prop="duration" />
      <el-table-column label="负责人" prop="leader" />
      <el-table-column label="参与人数" prop="memberCount" />
      <el-table-column label="创建时间" prop="createTime">
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="项目状态" width="120">
        <template #default="{ row }">
          <el-tag :type="statusTagType(row.status)" effect="light">
            {{ PROJECT_STATUS_MAP[row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button link type="primary" @click="edit(row)">编辑</el-button>
          <el-button link type="danger" @click="remove(row)">删除</el-button>
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
        :prev-text="'上一页'"
        :next-text="'下一页'"
        @current-change="loadData"
        @size-change="loadFirstPage"
      />
    </div>

    <!-- 弹窗 -->
    <ProjectDialog
      v-model="dialogVisible"
      :data="currentRow"
      @success="loadData"
    />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import ProjectDialog from "./ProjectDialog.vue";
import { getProjectPage, deleteProject } from "@/api/project";
import {formatDate} from "@/utils/format";

import { PROJECT_STATUS_MAP } from "@/constants/projectStatus";

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
