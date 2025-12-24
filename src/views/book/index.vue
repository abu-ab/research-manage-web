<template>
  <div class="bg-white p-4 rounded shadow-sm">
    <!-- 标题 -->
    <div class="flex justify-between mb-4">
      <div class="text-lg font-bold">著作管理</div>
      <el-button type="primary" @click="add">新增著作</el-button>
    </div>

    <!-- 查询 -->
    <div class="mb-4 flex gap-3 flex-wrap">
      <el-input v-model="query.name" placeholder="书名" class="w-60" />
      <el-input v-model="query.author" placeholder="作者" class="w-48" />
      <el-button type="primary" @click="loadFirstPage">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border>
      <el-table-column label="书名" prop="name" />
      <el-table-column label="作者" prop="author" />
      <el-table-column label="出版社" prop="publisher" />
      <el-table-column label="出版时间" prop="publishDate" />
      <el-table-column label="操作" width="160">
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
        @current-change="loadData"
        @size-change="loadFirstPage"
      />
    </div>

    <!-- 弹窗 -->
    <BookDialog
      v-model="dialogVisible"
      :data="currentRow"
      @success="loadData"
    />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import BookDialog from "./BookDialog.vue";
import { getBookPage, deleteBook } from "@/api/book";
import { ElMessage } from "element-plus";

const query = reactive({
  name: "",
  author: ""
});

const list = ref([]);
const dialogVisible = ref(false);
const currentRow = ref(null);

const page = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
});

// 加载第一页
const loadFirstPage = () => {
  page.pageNum = 1;
  loadData();
};

// 加载数据
const loadData = async () => {
  const res = await getBookPage({
    pageNum: page.pageNum,
    pageSize: page.pageSize,
    name: query.name,
    author: query.author
  });
  list.value = res.data.records;
  page.total = res.data.total;
};

// 重置
const reset = () => {
  query.name = "";
  query.author = "";
  loadFirstPage();
};

// 新增
const add = () => {
  currentRow.value = null;
  dialogVisible.value = true;
};

// 编辑
const edit = (row) => {
  currentRow.value = { ...row };
  dialogVisible.value = true;
};

// 删除
const remove = async (row) => {
  try {
    await deleteBook(row.id);
    ElMessage.success("删除成功");
    loadData();
  } catch (err) {
    ElMessage.error("删除失败");
  }
};

onMounted(loadData);
</script>
