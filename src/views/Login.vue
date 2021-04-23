<template>
  <div class="login-container">
    <div class="login-body">
      <div class="l-title">后台管理系统</div>
      <div>
        <el-form @submit.native.prevent hide-required-asterisk ref="loginRef" :model="param" :rules="loginRules">
          <el-form-item label="账号：" prop="username">
            <el-input v-model="param.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input @keyup.enter="submitForm" placeholder="请输入密码" v-model="param.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="submitForm()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, getCurrentInstance, toRefs, reactive, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {useRoute, useRouter} from 'vue-router'

export default defineComponent({
  setup() {
    let {proxy} = getCurrentInstance(); // vue原型
    const loginRef = ref(null);  //登录ref
    const router = useRouter(); //路由
    const state = reactive({
      param: {
        username: "",
        password: ""
      }, //登录账号
      loginRules: { //验证
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"}
        ]
      },
      loading: false //缓冲
    })

    const submitForm = () => {
      loginRef.value.validate(valid => {
        if (valid) {
          state.loading = true;
          proxy._public.debounce(() => {
            state.loading = false;
            ElMessage.success("登录成功");
            localStorage.setItem("person_name", state.param.username);
            router.push({path: '/home'})
          }, 700)
        } else {
          ElMessage.warning("请输入账号和密码");
          return false;
        }
      });
    }

    return {
      ...toRefs(state),
      loginRef,
      submitForm,
    }
  }
})
</script>
<style lang="less" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-size: 100%;
  background-image: url(../assets/image/background.jpg);

  .login-body {
    position: absolute;
    left: 40.1%;
    top: 31%;
    width: 400px;
    background: #ffffff;
    overflow: hidden;
    padding: 0 24px 26px;
    box-sizing: border-box;

    .el-button {
      width: 100% !important;
      border-color: #005ce6 !important;
      background: #005ce6 !important;
    }

    .l-title {
      padding: 12px 0;
      font-size: 20px;
      color: #121212;
      font-weight: 550;
      text-align: center;
    }
  }
}
</style>