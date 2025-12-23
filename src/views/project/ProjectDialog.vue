<template>
  <el-dialog
    :title="data?.id ? '编辑项目' : '新增项目'"
    v-model="visible"
    width="600px"
    @close="resetForm"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="项目编号" prop="code">
        <el-input v-model="form.code" />
      </el-form-item>

      <el-form-item label="项目性质" prop="type">
        <el-input v-model="form.type" placeholder="例如：国家自然科学基金" />
      </el-form-item>

      <el-form-item label="研究周期" prop="duration">
        <el-input v-model="form.duration" placeholder="例如：2024-2026" />
      </el-form-item>

      <el-form-item label="负责人" prop="leader">
        <el-input v-model="form.leader" />
      </el-form-item>

      <el-form-item label="项目简介" prop="description">
        <el-input v-model="form.description" type="textarea" rows="3" />
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
import { saveProject, updateProject } from "@/api/project";

const props = defineProps({
  data: Object,
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "success"]);

const visible = ref(false);
const formRef = ref(null);

const form = reactive({
  id: null,
  name: "",
  code: "",
  type: "",
  duration: "",
  leader: "",
  description: "",
});

const rules = {
  name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入项目编号", trigger: "blur" }],
  type: [{ required: true, message: "请输入项目性质", trigger: "blur" }],
  duration: [{ required: true, message: "请输入研究周期", trigger: "blur" }],
  leader: [{ required: true, message: "请输入负责人", trigger: "blur" }],
};

// 同步外部 dialog 显示
watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
    if (val && props.data) {
      Object.assign(form, props.data); // 编辑时填充表单
    } else if (val) {
      resetForm();
    }
  }
);

watch(visible, (val) => {
  emit("update:modelValue", val);
});

// 重置表单
const resetForm = () => {
  form.id = null;
  form.name = "";
  form.code = "";
  form.type = "";
  form.duration = "";
  form.leader = "";
  form.description = "";
  if (formRef.value) formRef.value.clearValidate();
};

// 提交
const submit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;
    try {
      if (form.id) {
        // 编辑 -> PUT
        await updateProject(form.id, form);
      } else {
        // 新增 -> POST
        await saveProject(form);
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
