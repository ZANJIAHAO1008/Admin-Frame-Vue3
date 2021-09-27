<template>
  <div class="login-container">
    <div class="login-body">
      <div class="logo">
        <img alt="" src="../assets/image/LG.png" />
        <p>Admin Frame</p>
        <span>Zan Admin Frame 是一款中/后台管理系统</span>
      </div>
      <div v-show="loginStatus">
        <el-form
          ref="loginRef"
          :model="param"
          :rules="loginRules"
          hide-required-asterisk
          @submit.prevent
        >
          <el-form-item prop="username">
            <el-input
              v-model.trim="param.username"
              clearable
              placeholder="请输入用户名"
              prefix-icon="fa fa-user-o"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="param.password"
              clearable
              placeholder="请输入密码"
              prefix-icon="fa fa-lock"
              show-password
              @keyup.enter="submitForm"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              style="width: 100%"
              type="primary"
              @click="submitForm()"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <div class="other-content">
          <el-button type="text" disabled>其它登录方式</el-button>
          <el-button type="text" @click="loginStatus = false"
            >注册账户</el-button
          >
        </div>
      </div>
      <div v-show="!loginStatus">
        <el-form
          ref="registerRef"
          :model="register"
          :rules="registerRules"
          hide-required-asterisk
          @submit.prevent
        >
          <el-form-item prop="username">
            <el-input
              v-model.trim="register.username"
              clearable
              placeholder="请输入用户名"
              prefix-icon="fa fa-user-o"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="register.password"
              autocomplete="off"
              clearable
              placeholder="至少6位密码"
              prefix-icon="fa fa-lock"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              v-model.trim="register.checkPass"
              clearable
              placeholder="再次输入密码"
              prefix-icon="fa fa-lock"
            ></el-input>
          </el-form-item>
          <el-form-item prop="staffName">
            <el-input
              v-model.trim="register.staffName"
              clearable
              placeholder="请输入姓名"
              prefix-icon="fa fa-user-o"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-radio-group v-model="register.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--          <el-form-item  prop="phone">-->
          <!--            <el-input clearable prefix-icon="fa fa-user-o"   v-model.trim="register.phone" placeholder="请输入手机号"></el-input>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item  prop="address">-->
          <!--            <el-input clearable prefix-icon="fa fa-user-o"   v-model.trim="register.address" placeholder="请输入家庭地址"></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item>
            <el-button
              style="width: 100%"
              type="primary"
              @click="registerForm()"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
        <div class="other-content">
          <el-button style="width: 100%" type="text" @click="loginStatus = true"
            >使用已有账号登陆</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  getCurrentInstance,
  toRefs,
  reactive,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { useStore } from "vuex";
import { ElMessageBox } from "element-plus";
export default defineComponent({
  setup() {
    const store = useStore(); //vuex仓库
    let { proxy } = getCurrentInstance(); // vue原型
    const loginRef = ref(null); //登录ref
    const registerRef = ref(null); //注册ref
    const router = useRouter(); //路由

    const validatePass = (rule, value, callback) => {
      //密码验证
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (state.register.checkPass !== "") {
          registerRef.value.validateField("checkPass");
        }
        callback();
      }
    };
    const validateCheckPass = (rule, value, callback) => {
      //重复密码验证
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== state.register.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    const state = reactive({
      param: {
        username: "admin",
        password: "123456",
      }, //登录账号
      loginStatus: true, //登陆or注册 true  false
      register: {
        username: "",
        password: "",
        checkPass: "",
        sex: "0",
        staffName: "",
      },
      loginRules: {
        //登陆验证
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      registerRules: {
        //注册验证
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
      },
      loading: false, //缓冲
    });

    const submitForm = () => {
      //登陆
      loginRef.value.validate((valid) => {
        if (valid) {
          state.loading = true;
          proxy._public.debounce(() => {
            localStorage.setItem("username", state.param.username);
            Cookies.set("token", state.param.username);
            router.push({ path: "/homePage" });
            state.loading = false;
          }, 300);
        }
      });
    };

    const registerForm = () => {
      //注册
      registerRef.value.validate((valid) => {
        if (valid) {
          ElMessageBox.confirm("注册成功,是否立即登陆 ?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success",
          })
            .then(() => {
              //直接登陆
              state.param.username = state.register.username;
              state.param.password = state.register.password;
              submitForm();
            })
            .catch(() => {});
        }
      });
    };

    return {
      ...toRefs(state),
      loginRef,
      registerRef,
      submitForm,
      registerForm,
    };
  },
});
</script>
<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-size: 100% 100%;
  background-image: url(../assets/image/BG.png);

  .login-body {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    overflow: hidden;
    padding: 0 26px 24px 26px;
    box-sizing: border-box;
    margin-left: -198px;
    margin-top: -255px;

    .logo {
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

    .l-title {
      padding: 8px 0 24px 0;
      font-size: 20px;
      color: #121212;
      font-weight: 550;
      text-align: center;
    }
  }

  .other-content {
    display: flex;
    justify-content: space-between;
  }
}
</style>
