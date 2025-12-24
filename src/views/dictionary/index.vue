<template>
  <div class="bg-white p-4 rounded shadow-sm">
    <!-- 标题和新增 -->
    <div class="flex justify-between mb-4">
      <div class="text-lg font-bold">字典管理</div>
      <el-button type="primary" @click="add">新增字典</el-button>
    </div>

    <!-- 查询 -->
    <div class="mb-4 flex gap-3 flex-wrap">
      <el-input v-model="query.dictType" placeholder="字典类型" class="w-48" />
      <el-input v-model="query.dictLabel" placeholder="字典标签" class="w-48" />
      <el-button type="primary" @click="loadFirstPage">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border>
      <el-table-column label="字典类型" prop="dictType" />
      <el-table-column label="字典编码" prop="dictCode" />
      <el-table-column label="字典标签" prop="dictLabel" />
      <el-table-column label="排序" prop="sort" width="80" />
      <el-table-column label="状态" prop="status" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'info'">
            {{ row.status === 1 ? '启用' : '停用' }}
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
    <DictionaryDialog
      v-model="dialogVisible"
      :data="currentRow"
      @success="loadData"
    />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import DictionaryDialog from "./DictionaryDialog.vue";
import { getDictPage, deleteDict } from "@/api/dict";
import { ElMessage } from "element-plus";

const query = reactive({
  dictType: "",
  dictLabel: ""
});

const list = ref([]);
const dialogVisible = ref(false);
const currentRow = ref(null);

const page = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
});

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

const remove = async (row) => {
  try {
    await deleteDict(row.id);
    ElMessage.success("删除成功");
    loadData();
  } catch (err) {
    ElMessage.error("删除失败");
  }
};

onMounted(loadData);
</script>
