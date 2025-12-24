<template>
  <el-dialog
    :title="data?.id ? '编辑奖项' : '新增奖项'"
    v-model="visible"
    width="600px"
  >
    <el-form :model="form" ref="formRef" label-width="120px">
      <el-form-item label="关联类型" prop="targetType">
        <el-select
          v-model="form.targetType"
          @change="onTypeChange"
          placeholder="请选择"
        >
          <el-option
            v-for="item in targetTypeOptions"
            :key="item.dictCode"
            :label="item.dictLabel"
            :value="item.dictCode"
          />
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
        <el-select v-model="form.level" placeholder="请选择">
          <el-option
            v-for="(item, index) in levelOptions"
            :key="item.dictCode + index"
            :label="item.dictLabel"
            :value="item.dictCode"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="奖项等级">
        <el-select v-model="form.awardRank" placeholder="请选择">
          <el-option
            v-for="(item, index) in rankOptions"
            :key="item.dictCode + index"
            :label="item.dictLabel"
            :value="item.dictCode"
          />
        </el-select>
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
import { getDict } from "@/api/dict";

const props = defineProps({
  modelValue: Boolean,
  data: Object,
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
  description: "",
});

const rules = {
  targetType: [
    { required: true, message: "请选择关联类型", trigger: "change" },
  ],
  targetId: [{ required: true, message: "请选择关联对象", trigger: "change" }],
  name: [{ required: true, message: "请输入奖项名称", trigger: "blur" }],
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

const targetTypeOptions = ref([]);
const levelOptions = ref([]);
const rankOptions = ref([]);

/** 弹窗打开 */
watch(
  () => props.modelValue,
  async (val) => {
    visible.value = val;
    await loadDict();
    if (val) {
      if (props.data) {
        Object.assign(form, props.data);
        await onTypeChange();
      } else {
        resetForm();
      }
    }
  }
);

watch(visible, (val) => emit("update:modelValue", val));

const loadDict = async () => {
  let res = await getDict("AWARD_TARGET_TYPE");
  targetTypeOptions.value = res;
  console.log("targetTypeOptions", res);
  levelOptions.value = await getDict("AWARD_LEVEL");
  rankOptions.value = await getDict("AWARD_RANK");
};

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
    description: "",
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

