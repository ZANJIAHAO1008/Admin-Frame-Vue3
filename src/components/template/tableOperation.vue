<template>
  <div class="tableOperation">
    <el-card shadow="never" :body-style="{ padding: '30px 10px 15px 10px' }" >
      <el-form :inline="true" :model="queryForm" label-position="right"
        label-width="84px">
        <el-form-item label="姓名：">
          <el-input v-model.trim="queryForm.name" clearable placeholder="请输入姓名" @keyup.enter="getList"></el-input>
        </el-form-item>
        <el-form-item label="ID：">
          <el-input v-model.trim="queryForm.id" clearable placeholder="请输入ID" @keyup.enter="getList"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">查 询</el-button>
          <el-button type="primary" @click="handlePopup(operationStatus.add, null)">新增</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" :body-style="{ padding: '30px 10px 15px 10px' }" class="m-t8">
      <el-table :data="tableData" height="calc(100vh - 345px)" style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-space spacer="|" style="color: #dedede">
              <el-button type="" @click="handlePopup(operationStatus.edit, scope.row)">编辑</el-button>
              <el-button type="primary">{{
                  scope.row.enabled === "0" ? useStatus.start : useStatus.close
              }}</el-button>
              <el-button type="danger" @click="removeDataById(scope.row.id)">删除</el-button>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
      <Pagination  :pagination="pagination" @change="handleChangeCurrent"></Pagination>
    </el-card>

    <el-dialog v-model="isDialog" :title="dialogTitle" :before-close="
      () => {
        handleClose(operationFormRef);
      }
    " width="1000px" :close-on-click-modal="false" :close-on-press-escape="false" top="8vh">
      <el-form ref="operationFormRef" :model="newlyForm" :newly-rules="newlyRules" label-width="108px">
        <el-row >
          <el-col :span="12">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="newlyForm.name" placeholder="请输入姓名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文名：" prop="englishName">
              <el-input v-model="newlyForm.englishName" placeholder="请输入英文名" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row >
          <el-col :span="12">
            <el-form-item label="身高（cm）：" prop="height">
              <el-input v-model="newlyForm.height" placeholder="请输入身高" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="体重（kg）：" prop="weight">
              <el-input v-model="newlyForm.weight" placeholder="请输入体重" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="地址：" prop="address">
              <el-input v-model="newlyForm.address" placeholder="请输入地址" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="基本介绍：" prop="introduction">
              <el-input v-model="newlyForm.introduction" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="请输入基本介绍"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="备注：" prop="marks">
              <el-input v-model="newlyForm.marks" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose(operationFormRef)">取 消</el-button>
          <el-button type="primary" @click="onSubmit(operationFormRef)">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="AdminTableOperation">
import { reactive, toRefs, onMounted, ref, getCurrentInstance } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import Pagination from "@/components/Pagination/index.vue";
import { useStatus, operationStatus } from "@/enums";
import { TitleFormat } from "@/types/template";
import { PaginationState } from "@/types";
const { proxy } = <any>getCurrentInstance();
const operationFormRef = ref<FormInstance>();
let isDialog = ref<boolean>(false); //是否打开弹窗
let handleType = ref<string>(operationStatus.add); //操作状态
let dialogTitle = ref<string>("新增");
const state = reactive({
  tableData: [
    {
      id: "8008208828",
      name: "曹植饭",
      address: "南京市雨花台区宁双路19号云密城J栋6楼",
      enabled: "0",
    },
    {
      id: "8008208828",
      name: "曹植饭",
      address: "南京市雨花台区宁双路19号云密城J栋6楼",
      enabled: "1",
    },
    {
      id: "8008208828",
      name: "曹植饭",
      address: "南京市雨花台区宁双路19号云密城J栋6楼",
    },
    {
      id: "8008208828",
      name: "曹植饭",
      address: "南京市雨花台区宁双路19号云密城J栋6楼",
    },
    {
      id: "8008208828",
      name: "曹植饭",
      address: "南京市雨花台区宁双路19号云密城J栋6楼",
    },
  ],
  queryForm: {
    name: "",
    id: "",
  },
  newlyForm: {
    name: "",
    address: "",
    englishName: "",
    height: "",
    weight: "",
    introduction: "",
    marks: "",
  },
  pagination: {
    total: 100,
    page: 1,
    pageSize: 10,
  },
  newlyRules: {
    name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  },
});

const { queryForm, pagination, tableData, newlyForm, newlyRules } = {
  ...toRefs(state),
};

onMounted(() => {
  getList();
});

const handleChangeCurrent = (val: any) => {
  //分页操作
  state.pagination = Object.assign(state.pagination, { ...val });
};
const getList = () => {
  //查询列表
  console.log("我查询了列表");
};

const handlePopup = <T extends keyof TitleFormat>(type: T, target: any) => {
  //打开新增 编辑
  handleType.value = type;
  isDialog.value = true;
  const TITLE_ITEM = {
    add: "新增",
    edit: "编辑",
  };
  dialogTitle.value = proxy._public.getValues(TITLE_ITEM, type);
  if (type == operationStatus.edit) {
    state.newlyForm = { ...target };
  }
};

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessage({
        message: `${dialogTitle.value}成功.`,
        type: "success",
      });
      isDialog.value = false;
    }
  });
};

const removeDataById = (id: string | number) => {
  //删除
  ElMessageBox.confirm("此操作将永久删除本条记录, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => { })
    .catch(() => { });
};

const handleClose = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  formEl.resetFields();
  isDialog.value = false;
};
</script>
<style lang="scss" scoped>
</style>
