<template>
  <el-dialog
    :title="form.id ? '编辑科研人员' : '新增科研人员'"
    v-model="visible"
    width="500px"
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="工号">
        <el-input v-model="form.code" />
      </el-form-item>

      <el-form-item label="学院">
        <el-input v-model="form.college" />
      </el-form-item>

      <el-form-item label="职称">
        <el-input v-model="form.title" />
      </el-form-item>

      <el-form-item label="电话">
        <el-input v-model="form.phone" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, watch } from "vue";
import { addResearcher, updateResearcher } from "@/api/researcher";
import { ElMessage } from "element-plus";
const props = defineProps({
  modelValue: Boolean,
  data: Object,
});

const emit = defineEmits(["update:modelValue", "success"]);

const visible = defineModel();

const form = reactive({
  id: null,
  name: "",
  code: "",
  college: "",
  title: "",
  phone: "",
});

const reset = () => {
  form.id = null;
  form.name = "";
  form.code = "";
  form.college = "";
  form.title = "";
  form.phone = "";
};

watch(
  () => props.data,
  (val) => {
    if (val) {
      Object.assign(form, val);
    } else {
      reset();
    }
  },
  { immediate: true }
);

const submit = async () => {
  let res;
  if (form.id) {
    res = await updateResearcher(form);
  } else {
    res = await addResearcher(form);
  }
  console.log(res);
  if (res.data.code === 200) {
    emit("success");
    visible.value = false;
  } else {
    console.log(res.data.msg);
    ElMessage.error(res.data.msg);
  }
  // if (res) {
  //   emit("success");
  //   visible.value = false;
  //   return;
  // } else {
  // visible.value = false;
};
</script>
