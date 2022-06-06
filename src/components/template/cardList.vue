<template>
  <div class="cardList">
    <el-card shadow="never" :body-style="{ padding: '30px 10px 15px 10px' }">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline" label-position="right" label-width="84px">
        <el-form-item>
          <el-input v-model.trim="queryParams.name" clearable placeholder="请输入商品名称" @keyup.enter="getList"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="queryParams.id" clearable placeholder="请输入商品ID" @keyup.enter="getList"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="getList">查 询</el-button>
          <el-button type="primary" plain @click="handlePopup('add', {})">新增</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="m-t8">
      <el-row :gutter="8">
        <el-col v-for="(item, index) in list" :key="index" :xs="24" :sm="24" :md="12" :lg="12" :xl="6"
          style="margin-top: 9px">
          <el-card :body-style="{ padding: '24px 0px 6px 0px' }">
            <div class="list-nav">
              <el-image style="width: 130px; height: 120px" :src="item.image" fit="fill"></el-image>
              <div class="l-n-body">
                <div class="l-n-b-title">{{ item.name }}</div>
                <span class="l-n-b-introduce">{{ item.introduce }}</span>
              </div>
            </div>
            <div style="padding: 8px 4px 0px 4px">
              <div class="bottom">
                <time class="time">上架日期：{{ item.putWayDate }}</time>
                <el-space :size="10" spacer="|">
                  <el-link type="primary" @click="handlePopup('edit', {})" :underline="false">编辑</el-link>
                  <el-link type="primary" @click="removeDataById(item.id)" :underline="false">删除</el-link>
                </el-space>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog v-model="isDialog" :title="dialogTitle" :before-close="
      () => {
        handleClose(tableFormRef);
      }
    " width="1000px" :close-on-click-modal="false" :close-on-press-escape="false" top="8vh">
      <el-form hide-required-asterisk ref="tableFormRef" :model="form" :rules="rules" label-width="92px">
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="商品名称：" prop="name">
              <el-input v-model="form.name" placeholder="请输入商品名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="商品类型：" prop="height">
              <el-input v-model="form.height" placeholder="请输入商品类型" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="基本介绍：" prop="introduction">
              <el-input v-model="form.introduction" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="请输入基本介绍"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注：" prop="marks">
              <el-input v-model="form.marks" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose(tableFormRef)">取 消</el-button>
          <el-button type="primary" @click="onSubmit(tableFormRef)">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup name="AdminCardList">
import { reactive, toRefs, onMounted, ref, getCurrentInstance } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { operationStatus } from "@/enums";
import { TitleFormat } from "@/types/template";
const { proxy } = <any>getCurrentInstance();
const tableFormRef = ref<FormInstance>();
let isDialog = ref<boolean>(false);
let handleType = ref<string>(operationStatus.add); //操作状态
let dialogTitle = ref<string>("新增");
interface ListItem {
  name: string;
  introduce: string;
  image: string;
  putWayDate: string;
  id: number | string;
}
let list = ref<ListItem[]>([]);

const state = reactive({
  queryParams: {
    name: "",
    id: "",
  },
  form: {
    name: "",
    address: "",
    englishName: "",
    height: "",
    weight: "",
    introduction: "",
    marks: "",
  },
  rules: {
    name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
  },
});

const { queryParams, form, rules } = { ...toRefs(state) };

onMounted(() => {
  getList();
});

const getList = () => {
  //查询列表
  for (let index = 0; index <= 24; index++) {
    list.value.push({
      name: "汉堡包",
      introduce:
        "小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡",
      image:
        "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      putWayDate: "2021/11/26",
      id: index,
    });
  }
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
    state.form = { ...target };
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
  ElMessageBox.confirm("此操作将永久删除本商品记录, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => { })
    .catch(() => { });
};

const handleClose = (formEl: FormInstance | undefined) => {
  //关闭
  if (!formEl) {
    return;
  }
  formEl.resetFields();
  isDialog.value = false;
};
</script>
<style lang="scss" scoped>
.list-nav {
  display: flex;
  justify-content: space-around;

  .l-n-body {
    width: 200px;

    .l-n-b-titie {
      text-align: center;
      font-size: 17px;
    }

    .l-n-b-introduce {
      font-size: 14px;
      padding-top: 12px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  //   margin-top: 13px;
  padding: 0 12px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
