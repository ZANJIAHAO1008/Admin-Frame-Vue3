<template>
  <el-dialog
    :before-close="close"
    :model-value="passVisible"
    title="修改密码"
    width="500px"
  >
    <el-form
      ref="checkPassFormRef"
      :hide-required-asterisk="true"
      :model="checkPassForm"
      :rules="rules"
      class="demo-checkPassForm"
      label-width="100px"
      status-icon
    >
      <el-form-item label="原密码" prop="oldPassword">
        <el-input
          v-model="checkPassForm.oldPassword"
          autocomplete="off"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="checkPassForm.newPassword"
          autocomplete="off"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          v-model="checkPassForm.checkPass"
          autocomplete="off"
          type="password"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitForm(checkPassFormRef)"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts" name="AdminCheckPass">
import { reactive, ref, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { removeToken } from "@/utils/auth";
import type { FormInstance } from "element-plus";
import { CheckPassState } from "@/types/setting";
withDefaults(
  defineProps<{
    passVisible: boolean;
  }>(),
  {
    passVisible: false, //打开修改密码
  }
);

const emits = defineEmits<{
  (e: "update:passVisible", passVisible: boolean): void;
}>();

const checkPassFormRef = ref<FormInstance>();
const router = useRouter();
const validatePass = (rule: any, value: any, callback: Function) => {
  //密码验证
  if (value === "") {
    callback(new Error("请输入新密码"));
  } else {
    if (state.checkPassForm.checkPass !== "") {
      if (!checkPassFormRef.value) {
        return;
      }
      checkPassFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validateCheckPass = (rule: any, value: any, callback: Function) => {
  //重复密码验证
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== state.checkPassForm.newPassword) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

const state = reactive<Required<CheckPassState>>({
  checkPassForm: {
    oldPassword: "",
    newPassword: "",
    checkPass: "",
  },
  rules: {
    oldPassword: [{ required: true, message: "请输入原密码", trigger: "blur" }],
    newPassword: [{ validator: validatePass, trigger: "blur" }],
    checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
  },
});

const { checkPassForm, rules } = { ...toRefs(state) };

const close = () => {
  //关闭
  if (!checkPassFormRef.value) {
    return;
  }
  checkPassFormRef.value.resetFields();
  emits("update:passVisible", false);
}

const submitForm = async (formEl: FormInstance | undefined) => {
  //提交
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessage.warning({
        message: "检测到您修改了密码，请重新登陆",
        type: "warning",
      });
      close(); //关闭弹框
      removeToken(); //清空token 1秒后回到登录页
      setTimeout(() => {
        router.push({ path: "/login" });
      }, 1000);
    }
  });
}
</script>
