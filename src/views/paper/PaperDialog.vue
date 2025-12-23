<template>
  <el-dialog
    :title="data?.id ? '编辑论文' : '新增论文'"
    v-model="visible"
    width="600px"
    @close="resetForm"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="论文标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>

      <el-form-item label="作者" prop="author">
        <el-input v-model="form.author" />
      </el-form-item>

      <el-form-item label="期刊名称" prop="journal">
        <el-input v-model="form.journal" />
      </el-form-item>

      <el-form-item label="检索来源" prop="source">
        <el-select v-model="form.source">
          <el-option label="SCI" value="SCI" />
          <el-option label="EI" value="EI" />
          <el-option label="核心期刊" value="CORE" />
        </el-select>
      </el-form-item>

      <el-form-item label="发表时间" prop="publishDate">
        <el-date-picker
          v-model="form.publishDate"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { savePaper, updatePaper } from "@/api/paper";

const props = defineProps({
  data: Object,
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "success"]);

const visible = ref(false);
const formRef = ref(null);

const form = reactive({
  id: null,
  title: "",
  author: "",
  journal: "",
  source: "",
  publishDate: "",
});

const rules = {
  title: [{ required: true, message: "请输入论文标题", trigger: "blur" }],
  author: [{ required: true, message: "请输入作者", trigger: "blur" }],
  journal: [{ required: true, message: "请输入期刊名称", trigger: "blur" }],
  source: [{ required: true, message: "请选择检索来源", trigger: "change" }],
  publishDate: [
    { required: true, message: "请选择发表时间", trigger: "change" },
  ],
};

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
    if (val && props.data) {
      Object.assign(form, props.data);
    } else if (val) {
      resetForm();
    }
  }
);

watch(visible, (val) => {
  emit("update:modelValue", val);
});

const resetForm = () => {
  form.id = null;
  form.title = "";
  form.author = "";
  form.journal = "";
  form.source = "";
  form.publishDate = "";
  if (formRef.value) formRef.value.clearValidate();
};

const submit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;
    try {
      if (form.id) {
        await updatePaper(form);
      } else {
        await savePaper(form);
      }
      ElMessage.success("保存成功");
      visible.value = false;
      emit("success");
    } catch (error) {
      ElMessage.error("保存失败");
    }
  });
};
</script>
