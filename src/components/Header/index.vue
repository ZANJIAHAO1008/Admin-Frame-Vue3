<template>
  <div class="zan-header">
    <div class="collapse-btn" @click="switchCollapse">
      <i v-if="collapse" class="fa fa-indent"></i>
      <i v-else class="fa fa-dedent"></i>
    </div>
    <div class="collapse-right">
      <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
        <i class="fa fa-arrows-alt" @click="requestFullScreen('body')"></i>
      </el-tooltip>
      <el-dropdown @command="changeI18n">
        <span class="el-dropdown-link">
          <i class="fa fa-language" style="font-size: 18px"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="locale in $i18n.availableLocales"
              :key="`locale-${locale}`"
              :command="locale"
              :style="{
                color: $i18n.locale == locale ? 'rgb(64, 158, 255)' : '',
              }"
              >{{ $filters.langFilter(locale) }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tooltip
        class="item"
        effect="dark"
        content="消息中心"
        placement="bottom"
      >
        <i class="fa fa-bell-o" @click="toGetMessage"></i>
      </el-tooltip>
      <!-- 用户名下拉菜单 -->
      <el-dropdown size="small" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link btn_username_group">
          <span class="btn_username" :title="username">{{ username }}</span>
          <i class="el-icon-caret-bottom"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided command="signOut"
              >退出登录</el-dropdown-item
            >
            <el-dropdown-item command="baseInfo" divided
              >基本信息</el-dropdown-item
            >
            <el-dropdown-item command="checkPass" divided
              >修改密码</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 用户头像 -->
      <div class="user-avatar">
        <img src="/src/assets/image/touxiang.jpg" />
        <!-- <el-avatar icon="el-icon-user-solid">
        </el-avatar> -->
      </div>
    </div>
    <check-pass v-model:passVisible="passVisible"></check-pass>
    <base-info ref="baseInfoRef" v-model:baseVisible="baseVisible"></base-info>
  </div>
</template>
<script>
import {
  defineComponent,
  getCurrentInstance,
  toRefs,
  reactive,
  ref,
  computed,
  watch,
  provide,
  shallowRef,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import Cookies from "js-cookie";
import checkPass from "../Setting/checkPass.vue";
import baseInfo from "../Setting/baseInfo.vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "zan-header",
  components: {
    checkPass,
    baseInfo,
  },
  setup(context, props) {
    let { proxy } = getCurrentInstance(); // vue原型
    const { t } = useI18n();
    const store = useStore(); //vuex
    const router = useRouter(); //路由
    const baseInfoRef = ref("null");
    const state = reactive({
      collapse: computed(() => store.state.collapse),
      username: computed(() => localStorage.getItem("username") || "待完善"),
      passVisible: false, //修改密码弹框
      baseVisible: false, //基本信息弹框
    });

    const requestFullScreen = (element) => {
      //进入全屏 退出全屏
      const isFullScreen =
        document.fullScreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenElement; //判断窗口是否全屏
      let ele = document.querySelector(element) || document.documentElement; //获取元素
      if (!isFullScreen) {
        if (ele.requestFullscreen) {
          ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
          ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullscreen) {
          ele.webkitRequestFullscreen();
        } else if (ele.msRequestFullscreen) {
          ele.msRequestFullscreen();
        }
      } else {
        if (document.exitFullScreen) {
          document.exitFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (element.msExitFullscreen) {
          element.msExitFullscreen();
        }
      }
    };

    const switchCollapse = () => {
      //菜单栏展开关闭
      setTimeout(() => {
        store.commit("switchCollapse", !state.collapse);
      }, 0);
    };

    const handleCommand = (command) => {
      //用户下拉菜单
      if (command == "signOut") {
        Cookies.remove("token"); //清空token 1秒后回到登录页
        store.commit("delRightMenu", {
          //退出清空所有菜单
          whiteTags: [],
        });
        router.push("/login");
        ElMessage.success("登出成功");
      } else if (command == "checkPass") {
        state.passVisible = true;
      } else if (command == "baseInfo") {
        baseInfoRef.value.openBaseInfo(store.state.user.user);
      }
    };

    const toGetMessage = () => {
      //进入消息中心
      router.push("/messageCenter");
    };

    const changeI18n = (type) => {
      //切换中英文
      if (type == Cookies.get("lang")) {
        //如果已经是这个语言则提醒
        ElMessage.warning(`${t("message.public.existence")}`);
        return false;
      }
      proxy.$i18n.locale = type;
      Cookies.set("lang", type);
      ElMessage.success(`${t("message.public.editLang")}`);
    };

    return {
      ...toRefs(state),
      baseInfoRef,
      switchCollapse,
      handleCommand,
      toGetMessage,
      changeI18n,
      requestFullScreen,
    };
  },
});
</script>
<style lang="scss" scoped>
.zan-header {
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  font-size: 18px;
  color: #616161;
  background: #fff;
  display: flex;
  justify-content: space-between;

  .collapse-btn {
    // float: left;
    padding: 0px 15px 0 15px;
    cursor: pointer;
    line-height: 64px;
  }

  .el-icon-s-fold,
  .el-icon-s-unfold {
    font-size: 25px;
    cursor: pointer;
  }

  .collapse-right {
    // float: right;
    padding-right: 20px;
    height: 64px;
    display: flex;
    align-items: center;

    .fa {
      padding-right: 15px;
      cursor: pointer;
    }
  }

  .user-avatar {
    margin: 0 15px 0 5px;
  }

  img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .btn_username_group {
    display: flex;
    justify-content: space-between;
    .btn_username {
      text-align: right;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 60px;
      padding-right: 8px;
    }
  }
}
</style>
