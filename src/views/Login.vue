<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="logo-info">
        <img :src="getImage('LG', 'png')" />
        <p>{{ siteName }}</p>
        <span>{{ siteName }} 是一款中/后台管理系统</span>
      </div>
      <el-form ref="loginFormRef" @toLogin.prevent :model="loginForm" :rules="loginRules" hide-required-asterisk>
        <el-form-item prop="username">
          <el-input size="default" v-model="loginForm.username" placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="default" v-model="loginForm.password" placeholder="请输入密码" show-password
            @keyup.enter="toLogin(loginFormRef)">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="default" :loading="loading" style="width: 100%" type="primary"
            @click="toLogin(loginFormRef)">登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="other-login">
        <el-button text disabled>其它登录方式</el-button>
        <el-button text disabled>忘记密码</el-button>
      </div>

    </div>
  </div>
</template>
<script lang="ts" setup name="AdminLogin">
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import type { FormInstance } from "element-plus";
import { useUserStore } from "@/pinia/modules/user";
import { siteName } from "@/router/middleware";
import { getImage } from "@/utils";
import { getInfo } from "@/api/user";
const userStore = useUserStore();
const router = useRouter();
const { proxy } = <any>getCurrentInstance();
const loginFormRef = ref<FormInstance>();
const loading = ref<boolean>(false); //缓冲
const loginForm = reactive({
  username: "admin",
  password: "123456",
});

const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
})

const toLogin = async (formEl: FormInstance | undefined) => {
  //登陆
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      proxy._public.debounce(() => {
        loading.value = false;
        Cookies.set("token", 'LnN2QDE2NDE0NzcxO2NuLjo4ZloxV0VCbWF6MSt4ZWlBcEpWWUJocUozak1OYU1rRFhRNkxUZVRZdFJBPQ');
        userStore.$patch({
          user: {
            address: "安徽省 淮南市 大通区",
            birthDate: "2016-09-09",
            image: "",
            jurisdiction: "",
            marks: "这个人很懒什么都没留下.",
            phone: "18866884562",
            sex: "0",
            staffName: "系统管理员",
            userState: "",
            username: "admin",
          },
        });
        router.push({ path: "/dashboard/workbench" });
      }, 300);
    }
  });
};

</script>

<style lang="scss" scoped>
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  .login-content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    overflow: hidden;
    padding: 0 26px 24px 26px;
    box-sizing: border-box;
    margin-left: -198px;
    margin-top: -255px;
    .logo-info {
      padding: 12px;
      text-align: center;
      img {
        height: 55px;
      }
      p {
        font-size: 24px;
        padding: 2px 0px;
      }
      span {
        font-size: 14px;
        color: #909399;
      }
    }
    .other-login {
      display: flex;
      justify-content: space-between;
    }
  }

}
</style>
