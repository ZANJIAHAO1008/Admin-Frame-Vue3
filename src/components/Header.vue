<template>
  <div class="header">
    <div class="collapse-btn" @click="switchCollapse">
      <i v-if="collapse" class="fa fa-indent"></i>
      <i v-else class="fa fa-dedent"></i>
    </div>
    <span class="collapse-title">后台管理系统</span>
    <div class="collapse-right">
      <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
        <i :class="!screen?'fa fa-expand':'fa fa-compress'" @click="requestFullScreen('body')"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="消息中心" placement="bottom">
        <i class="fa fa-bell-o" @click="toGetMessage"></i>
      </el-tooltip>
      <!-- 用户头像 -->
      <div class="user-avatar">
        <img src="../assets/image/img.jpg"/>
      </div>
      <!-- 用户名下拉菜单 -->
      <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link" style="color: #ffffff;">
                        {{ username }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-link type="primary" href="https://github.com/ZANJIAHAO1008/vue-admin-manage" :underline="false"
                     target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </el-link>
            <el-dropdown-item divided command="signOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import {defineComponent, getCurrentInstance, toRefs, reactive, ref, computed} from 'vue'
import {useStore} from 'vuex';
import {useRouter} from "vue-router";
import {ElMessage} from 'element-plus'

export default defineComponent({
  name: "header",
  setup() {
    const store = useStore(); //vuex
    const router = useRouter(); //路由
    const state = reactive({
      collapse: computed(() => store.state.collapse),
      username: computed(() => localStorage.getItem('person_name')),
      screen: false, //全屏按钮
    })

    const requestFullScreen = (element) => {  //进入全屏 退出全屏
      let ele = document.querySelector(element) || document.documentElement;
      if (!state.screen) {
        if (ele.requestFullscreen) {
          ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
          ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullscreen) {
          ele.webkitRequestFullscreen();
        } else if (ele.msRequestFullscreen) {
          ele.msRequestFullscreen();
        }
        state.screen = true;
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
        state.screen = false;
      }
    }

    const switchCollapse = () => {   //菜单栏展开关闭
      setTimeout(() => {
        store.commit('switchCollapse', !state.collapse)
      }, 0)
    };

    const handleCommand = (command) => {  //用户下拉菜单
      if (command == "signOut") {
        localStorage.removeItem("person_name");
        router.push("/login");
        ElMessage.success("登出成功");
      }
    };

    const toGetMessage = () => {  //进入消息中心
      router.push("/messageCenter");
    }

    return {
      ...toRefs(state),
      switchCollapse,
      handleCommand,
      requestFullScreen,
      toGetMessage
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background: #242f42;

  .collapse-btn {
    float: left;
    padding: 0px 15px 0 30px;
    cursor: pointer;
    line-height: 70px;
  }

  .collapse-title {
    float: left;
    width: 250px;
    line-height: 70px;
  }

  .el-icon-s-fold, .el-icon-s-unfold {
    font-size: 25px;
    cursor: pointer;
  }

  .collapse-right {
    float: right;
    padding-right: 65px;
    height: 70px;
    display: flex;
    align-items: center;

    i {
      padding-right: 18px;
      cursor: pointer;
    }
  }

  .user-avatar {
    margin: 0 20px 0 5px;
  }

  img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
