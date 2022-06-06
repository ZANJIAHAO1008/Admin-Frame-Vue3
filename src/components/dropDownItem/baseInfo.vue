<template>
  <el-drawer :before-close="close" :model-value="baseVisible" title="基本信息" @open="getInit">
    <template #default>
      <el-form label-width="92px" ref="baseInfoFormRef" hide-required-asterisk :model="state.baseInfoForm"
        :rules="state.baseInfoRules">
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="姓名：">
              <el-input v-model="state.baseInfoForm.staffName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="用户名：" prop="username">
              <el-input v-model="state.baseInfoForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="24" >
            <el-form-item label="手机号码：">
              <el-input v-model="state.baseInfoForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="性别：">
              <el-select v-model="state.baseInfoForm.sex" placeholder="请选择性别">
                <el-option label="女" value="0"></el-option>
                <el-option label="男" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="出生日期：">
              <el-date-picker v-model="state.baseInfoForm.birthDate" placeholder="选择日期" type="date"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="账号状态：">
              <el-select v-model="state.baseInfoForm.userState" placeholder="请选择">
                <el-option label="正常" value="0"></el-option>
                <el-option label="冻结" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="权限分配：" prop="jurisdiction">
              <el-select v-model="state.baseInfoForm.jurisdiction" multiple placeholder="请选择">
                <el-option v-for="item in roleList" :key="item.roleId" :label="item.marks" :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="家庭住址：">
              <el-input v-model="state.baseInfoForm.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="个人说明：">
              <el-input v-model="state.baseInfoForm.marks" :autosize="{ minRows: 4, maxRows: 6 }" type="textarea">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="saveBaseInfo">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="AdminBaseInfo">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import type { FormInstance } from "element-plus";
import { removeToken } from "@/utils/auth";
import { useUserStore } from "@/pinia/modules/user";
import { BaseInfoState } from "@/types/setting";
import { DeepPartial } from "@/types/index";

withDefaults(
  defineProps<{
    baseVisible: boolean;
  }>(),
  {
    baseVisible: false, //打开基本信息
  }
);

const emits = defineEmits<{
  (e: "update:baseVisible", baseVisible: boolean): void;
  (e: "reFresh", status: boolean): void;
}>();

const userStore = useUserStore();

const router = useRouter();

const baseInfoFormRef = ref<FormInstance>();

const roleList = [
  //角色列表
  {
    marks: "普通用户",
    roleId: "1",
  },
  {
    marks: "系统管理员",
    roleId: "2",
  },
  {
    marks: "超级管理员",
    roleId: "3",
  },
];

const state = reactive<BaseInfoState>({
  baseInfoForm: {
    username: "",
    sex: "",
    staffName: "",
    phone: "",
    marks: "",
    birthDate: "",
    address: "",
    userState: "",
    jurisdiction: "",
    image: "",
  },
  baseInfoRules: {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    jurisdiction: [
      { required: true, message: "请至少选择一个角色", trigger: "change" },
    ],
  },
});

const getInit = () => {
  //基本信息初始化
  state.baseInfoForm = Object.assign(state.baseInfoForm, {
    ...userStore.user,
  });
}
const close = () => {
  emits("update:baseVisible", false);
}

const openBaseInfo = <T extends Partial<BaseInfoState["baseInfoForm"]>>(
  row: T
) => {
  emits("update:baseVisible", true);
  state.baseInfoForm = Object.assign(state.baseInfoForm, { ...row });
}

const saveBaseInfo = () => {
  //保存用户信息
  ElMessage.warning({
    message: "检测到您修改了本账号的信息，3秒后回到登陆页",
    type: "warning",
  });
  setTimeout(() => {
    router.push({ path: "/login" });
    emits("reFresh", false);
    removeToken();
  }, 3000);
  close();
}

defineExpose({
  openBaseInfo,
});
</script>
<style lang="scss" scoped>
.baseInfo_footer {
  text-align: right;
}
</style>
