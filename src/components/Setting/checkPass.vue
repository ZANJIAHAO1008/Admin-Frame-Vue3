<template>
  <el-dialog
    :before-close="close"
    :model-value="passVisible"
    title="修改密码"
    width="500px"
  >
    <el-form
      ref="checkPassRef"
      :hide-required-asterisk="true"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      label-width="100px"
      status-icon
    >
      <el-form-item label="原密码" prop="oldPassword">
        <el-input
          v-model="ruleForm.oldPassword"
          autocomplete="off"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="ruleForm.newPassword"
          autocomplete="off"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          v-model="ruleForm.checkPass"
          autocomplete="off"
          type="password"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="medium" @click="close">取 消</el-button>
        <el-button size="medium" type="primary" @click="ok">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { defineComponent, toRefs, reactive, inject, ref, computed } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
export default defineComponent({
  name: "checkPass",
  props: {
    passVisible: Boolean,
  },
  setup(props, context) {
    const checkPassRef = ref(null); //密码验证ref
    const store = useStore(); //vuex
    const router = useRouter(); //路由
    const validatePass = (rule, value, callback) => {
      //密码验证
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (state.ruleForm.checkPass !== "") {
          checkPassRef.value.validateField("checkPass");
        }
        callback();
      }
    };
    const validateCheckPass = (rule, value, callback) => {
      //重复密码验证
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== state.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    const state = reactive({
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        checkPass: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
      },
      userInfo: computed(() => store.state.user.user), //标签仓库
    });

    const close = () => {
      checkPassRef.value.resetFields();
      context.emit("update:passVisible", false);
    };

    const ok = () => {
      checkPassRef.value.validate((valid) => {
        if (valid) {
          ElMessage.warning({
            message: "检测到您修改了密码，请重新登陆",
            type: "warning",
          });
          close(); //关闭弹框
          Cookies.remove("token"); //清空token 1秒后回到登录页
          setTimeout(() => {
            router.push({ path: "/login" });
          }, 1000);
        }
      });
    };

    return {
      ...toRefs(state),
      checkPassRef,
      close,
      ok,
    };
  },
});
</script>
