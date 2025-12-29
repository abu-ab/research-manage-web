<template>
  <div class="bg-white p-4 rounded shadow-sm">
    <div class="flex justify-between mb-4">
      <div class="text-lg font-bold">用户管理</div>
    </div>

    <!-- 查询条件 -->
    <div class="mb-4 flex gap-3">
      <el-input
        v-model="query.username"
        placeholder="用户名"
        class="w-60"
        clearable
      />
      <el-button type="primary" @click="loadFirstPage">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border stripe>
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="角色">
        <template #default="{ row }">
          <el-tag :type="row.role === 'ADMIN' ? 'danger' : 'success'">
            {{ row.role === "ADMIN" ? "管理员" : "普通用户" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="openRoleDialog(row)">
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="mt-4 flex justify-end">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="page.total"
        v-model:current-page="page.pageNum"
        :page-size="page.pageSize"
        @current-change="loadData"
      />
    </div>
    <el-dialog title="修改用户权限" v-model="roleDialog.visible" width="400px">
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="roleDialog.username" disabled />
        </el-form-item>

        <el-form-item label="角色">
          <el-select v-model="roleDialog.role" placeholder="请选择角色">
            <el-option label="普通用户" value="USER" />
            <el-option label="管理员" value="ADMIN" />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="roleDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="submitRole">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { getUserPage } from "@/api/user";
import { updateUserRole } from "@/api/user";


const query = reactive({
  username: "",
});

const list = ref([]);

const page = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});

const roleDialog = reactive({
  visible: false,
  id: null,
  username: "",
  role: ""
});

const openRoleDialog = (row) => {
  roleDialog.visible = true;
  roleDialog.id = row.id;
  roleDialog.username = row.username;
  roleDialog.role = row.role;
};


const loadFirstPage = () => {
  page.pageNum = 1;
  loadData();
};

const loadData = async () => {
  const res = await getUserPage({
    pageNum: page.pageNum,
    pageSize: page.pageSize,
    username: query.username,
  });
  list.value = res.data.records;
  page.total = res.data.total;
};

const reset = () => {
  query.username = "";
  loadFirstPage();
};

const submitRole = async () => {
  await updateUserRole({
    id: roleDialog.id,
    role: roleDialog.role
  });

  roleDialog.visible = false;
  loadData();
};


onMounted(loadData);
</script>
