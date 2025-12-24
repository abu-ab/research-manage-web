<template>
  <el-dialog
    :title="data?.id ? '编辑字典' : '新增字典'"
    v-model="visible"
    width="500px"
    @close="resetForm"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="字典类型" prop="dictType">
        <el-input v-model="form.dictType" />
      </el-form-item>

      <el-form-item label="字典编码" prop="dictCode">
        <el-input v-model="form.dictCode" />
      </el-form-item>

      <el-form-item label="字典标签" prop="dictLabel">
        <el-input v-model="form.dictLabel" />
      </el-form-item>

      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="form.sort" :min="0" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="form.remark" rows="2" />
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
import { saveDict, updateDict } from "@/api/dict";

const props = defineProps({
  data: Object,
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "success"]);

const visible = ref(false);
const formRef = ref(null);

const form = reactive({
  id: null,
  dictType: "",
  dictCode: "",
  dictLabel: "",
  sort: 0,
  status: 1,
  remark: ""
});

const rules = {
  dictType: [{ required: true, message: "请输入字典类型", trigger: "blur" }],
  dictCode: [{ required: true, message: "请输入字典编码", trigger: "blur" }],
  dictLabel: [{ required: true, message: "请输入字典标签", trigger: "blur" }]
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
  form.dictType = "";
  form.dictCode = "";
  form.dictLabel = "";
  form.sort = 0;
  form.status = 1;
  form.remark = "";
  if (formRef.value) formRef.value.clearValidate();
};

const submit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;
    try {
      if (form.id) {
        await updateDict(form);
      } else {
        await saveDict(form);
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
