<template>
  <el-dialog
    :title="data?.id ? '编辑著作' : '新增著作'"
    v-model="visible"
    width="600px"
    @close="resetForm"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="书名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="作者" prop="authorList">
        <el-select
          v-model="form.authorList"
          multiple
          filterable
          placeholder="请选择作者"
          style="width: 100%"
        >
          <el-option
            v-for="item in researcherList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="出版社" prop="publisher">
        <el-input v-model="form.publisher" />
      </el-form-item>

      <el-form-item label="出版时间" prop="publishDate">
        <el-date-picker
          v-model="form.publishDate"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <!-- ISBN -->
      <el-form-item label="ISBN" prop="isbn">
        <el-input v-model="form.isbn" />
      </el-form-item>

      <!-- 简介 -->
      <el-form-item label="简介" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="3"
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
import { saveBook, updateBook } from "@/api/book";
import { getAllResearchers } from "@/api/researcher";

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
  author: "",
  authorList: [],
  publisher: "",
  publishDate: "",
  isbn: "",
  description: "",
});

const rules = {
  name: [{ required: true, message: "请输入书名", trigger: "blur" }],
  authorList: [
    { required: true, message: "请选择作者", trigger: "change" },
  ],
  publisher: [{ required: true, message: "请输入出版社", trigger: "blur" }],
  publishDate: [
    { required: true, message: "请选择出版时间", trigger: "change" },
  ],
};

const researcherList = ref([]);

const loadResearchers = async () => {
  const res = await getAllResearchers();
  researcherList.value = res || [];
};

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
    if (val) {
      loadResearchers();
      if (props.data) {
        Object.assign(form, props.data);
        form.authorList = props.data.author
          ? props.data.author.split(",")
          : [];
      } else {
        resetForm();
      }
    }
  }
);

watch(visible, (val) => {
  emit("update:modelValue", val);
});

const resetForm = () => {
  form.id = null;
  form.name = "";
  form.author = "";
  form.authorList = [];
  form.publisher = "";
  form.publishDate = "";
  form.isbn = "";
  form.description = "";
  formRef.value?.clearValidate();
};

const submit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;

    const payload = {
      ...form,
      author: form.authorList.join(","),
    };
    delete payload.authorList;

    try {
      if (payload.id) {
        await updateBook(payload);
      } else {
        await saveBook(payload);
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
