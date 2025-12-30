<template>
  <el-dialog
    :title="data?.id ? '编辑项目' : '新增项目'"
    v-model="visible"
    width="700px"
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

      <el-form-item label="天数" prop="duration">
        <el-input v-model="form.duration" placeholder="例如：10天" />
      </el-form-item>

      <el-form-item label="负责人" prop="leader">
        <el-input v-model="form.leader" />
      </el-form-item>
      <!-- <el-form-item label="项目状态" prop="status">
        <el-select
          v-model="form.status"
          placeholder="项目状态"
          clearable
          class="w-40"
        >
          <el-option
            v-for="item in PROJECT_STATUS_OPTIONS"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item label="项目简介" prop="description">
        <el-input v-model="form.description" type="textarea" rows="3" />
      </el-form-item>

      <!-- 成员管理 -->
      <el-form-item label="项目成员">
        <el-select
          v-model="selectedResearcherIds"
          multiple
          filterable
          placeholder="选择成员"
          style="width: 100%"
        >
          <el-option
            v-for="r in allResearchers"
            :key="r.id"
            :label="r.name + ' (' + r.code + ')'"
            :value="r.id"
          />
        </el-select>

        <div class="mt-2">
          <el-tag
            v-for="r in selectedMembers"
            :key="r.id"
            closable
            @close="removeMember(r.id)"
            class="mr-2 mb-2"
          >
            {{ r.name }} ({{ r.code }})
          </el-tag>
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, watch, computed } from "vue";
import { ElMessage } from "element-plus";
import { saveProject, updateProject } from "@/api/project";
import {
  addProjectMembers,
  removeProjectMember,
  getProjectMembers,
} from "@/api/projectResearcher";

import { getAllResearchers } from "@/api/researcher";

import { PROJECT_STATUS_OPTIONS } from "@/constants/projectStatus";

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
  status: 0,
});

const rules = {
  name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入项目编号", trigger: "blur" }],
  type: [{ required: true, message: "请输入项目性质", trigger: "blur" }],
  duration: [{ required: true, message: "请输入研究周期", trigger: "blur" }],
  leader: [{ required: true, message: "请输入负责人", trigger: "blur" }],
  // status: [{ required: true, message: "请输入项目状态", trigger: "blur" }],
};

// 项目成员
const allResearchers = ref([]);
const selectedResearcherIds = ref([]); // 选择的成员 id
const selectedMembers = computed(() =>
  allResearchers.value.filter((r) => selectedResearcherIds.value.includes(r.id))
);

// 同步外部 dialog 显示
watch(
  () => props.modelValue,
  async (val) => {
    visible.value = val;
    if (val) {
      await loadAllResearchers();
      console.log(props.data);
      if (props.data?.id) {
        Object.assign(form, props.data);
        const members = await getProjectMembers(form.id);
        selectedResearcherIds.value = members.map((m) => m.id);
      } else {
        resetForm();
      }
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
  selectedResearcherIds.value = [];
  if (formRef.value) formRef.value.clearValidate();
};

// 删除单个成员
const removeMember = async (researcherId) => {
  const index = selectedResearcherIds.value.indexOf(researcherId);
  if (index !== -1) selectedResearcherIds.value.splice(index, 1);
  if (form.id) {
    try {
      await removeProjectMember(form.id, researcherId);
      ElMessage.success("成员移除成功");
    } catch {
      ElMessage.error("成员移除失败");
    }
  }
};

// 加载所有科研人员
const loadAllResearchers = async () => {
  allResearchers.value = await getAllResearchers();
};

// 提交
const submit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;

    try {
      if (form.id) {
        await updateProject(form);
      } else {
        const res = await saveProject(form);
        form.id = res.data.id;
      }

      // 更新成员
      if (selectedResearcherIds.value.length > 0) {
        console.log(form.id);
        await addProjectMembers({
          projectId: form.id,
          researcherIds: selectedResearcherIds.value,
        });
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
