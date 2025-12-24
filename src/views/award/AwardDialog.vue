<template>
  <el-dialog
    :title="data?.id ? '编辑奖项' : '新增奖项'"
    v-model="visible"
    width="600px"
  >
    <el-form :model="form" ref="formRef" label-width="120px">
      <el-form-item label="关联类型" prop="targetType">
        <el-select v-model="form.targetType" @change="onTypeChange">
          <el-option label="科研项目" value="PROJECT" />
          <el-option label="论文" value="PAPER" />
          <el-option label="著作" value="BOOK" />
        </el-select>
      </el-form-item>
      <el-form-item label="关联对象" prop="targetId">
        <el-select v-model="form.targetId" filterable placeholder="请选择">
          <el-option
            v-for="item in targetList"
            :key="item.id"
            :label="item.name || item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="奖项名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="奖项级别">
        <el-select v-model="form.level">
          <el-option label="国家级" value="国家级" />
          <el-option label="省部级" value="省部级" />
          <el-option label="校级" value="校级" />
        </el-select>
      </el-form-item>

      <el-form-item label="奖项等级">
        <el-input v-model="form.awardRank" />
      </el-form-item>

      <el-form-item label="授奖单位">
        <el-input v-model="form.organization" />
      </el-form-item>

      <el-form-item label="获奖时间">
        <el-date-picker
          v-model="form.awardDate"
          type="date"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.description" />
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
import { saveAward, updateAward } from "@/api/award";
import { getProjectList } from "@/api/project";
import { getPaperList } from "@/api/paper";
import { getBookList } from "@/api/book";

const props = defineProps({
  modelValue: Boolean,
  data: Object
});

const emit = defineEmits(["update:modelValue", "success"]);

const visible = ref(false);
const formRef = ref(null);

const form = reactive({
  id: null,
  targetType: "",
  targetId: null,
  name: "",
  level: "",
  awardRank: "",
  organization: "",
  awardDate: "",
  description: ""
});

const rules = {
  targetType: [{ required: true, message: "请选择关联类型", trigger: "change" }],
  targetId: [{ required: true, message: "请选择关联对象", trigger: "change" }],
  name: [{ required: true, message: "请输入奖项名称", trigger: "blur" }]
};

const targetList = ref([]);

/** 类型切换 */
const onTypeChange = async () => {
  form.targetId = null;
  targetList.value = [];

  if (form.targetType === "PROJECT") {
    const res = await getProjectList();
    targetList.value = res || [];
  } else if (form.targetType === "PAPER") {
    const res = await getPaperList();
    targetList.value = res || [];
  } else if (form.targetType === "BOOK") {
    const res = await getBookList();
    targetList.value = res || [];
  }
};

/** 弹窗打开 */
watch(() => props.modelValue, async (val) => {
  visible.value = val;
  if (val) {
    if (props.data) {
      Object.assign(form, props.data);
      await onTypeChange();
    } else {
      resetForm();
    }
  }
});

watch(visible, (val) => emit("update:modelValue", val));

const resetForm = () => {
  Object.assign(form, {
    id: null,
    targetType: "",
    targetId: null,
    name: "",
    level: "",
    awardRank: "",
    organization: "",
    awardDate: "",
    description: ""
  });
  targetList.value = [];
  formRef.value?.clearValidate();
};

const submit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;

    try {
      if (form.id) {
        await updateAward(form);
      } else {
        await saveAward(form);
      }
      ElMessage.success("保存成功");
      visible.value = false;
      emit("success");
    } catch (e) {
      ElMessage.error("保存失败");
    }
  });
};
</script>

