<template>
  <div class="app-wrapper">
    <el-container style="height: 100vh">
      <el-affix :offset="400" style="width: 120px!important;">
        <ul class="zan-fix">
          <li>
            <a class="fix-top" href="http://wpa.qq.com/msgrd?v=3&uin=974813758&site=qq&menu=yes" target="_blank">
              <i class="fa fa-send"></i>
              <span>联系
                <br>作者</span>
            </a>
          </li>
          <li>
            <a class="fix-middle"
               href="https://qm.qq.com/cgi-bin/qm/qr?k=zdyTLc5giV9LdBFoGRWyAub_bqYMuVR6&jump_from=webapi"
               target="_blank">
              <i class="fa fa-user-o"></i>
              <span>加入
                <br>群聊</span>
            </a>
          </li>
          <li>
            <a class="fix-bottom" @click="RewardVisible = true;">
              <i class="fa fa-rmb"></i>
              <span>打赏
                <br>作者</span>
            </a>
          </li>
        </ul>
      </el-affix>
      <el-header height="70px">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <side-bar></side-bar>
        </el-aside>
        <el-main>
          <Tags></Tags>
          <div class="content">
            <router-view v-slot="{ Component }">
              <transition name="el-zoom-in-top" mode="out-in">
                <component :is="Component"></component>
              </transition>
            </router-view>
            <el-backtop target=".content"></el-backtop>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
        v-model="RewardVisible"
        title="打赏作者"
        width="500"
    >
      <div style="display: flex;justify-content: space-around">
      <span>
          <h1>微信</h1>
        <el-image
            fit="fill"
            src="src/assets/image/wx.png"
            style="width: 250px; height: 300px">
        </el-image>
      </span>
        <span>
          <h1>支付宝</h1>
        <el-image
            fit="fill"
            src="src/assets/image/zfb.jpg"
            style="width: 250px; height: 300px">
        </el-image>
        </span>
      </div>
      <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="RewardVisible = false">返 回</el-button>
    </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import {defineComponent, toRefs, reactive, ref, computed, watchEffect, watch} from 'vue';
import SideBar from "../components/SideBar.vue";
import Header from "../components/Header.vue";
import Tags from "../components/Tags.vue";
import {useStore} from "vuex";

export default defineComponent({
  name: 'home',
  components: {
    SideBar,
    Header,
    Tags
  },
  setup() {
    const store = useStore();
    const state = reactive({
      RewardVisible: false,
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
<style lang="less">
.app-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .el-header, .el-main {
    padding: 0;
  }

  .el-main {
    background-color: #f0f0f0;

    .content {
      padding: 24px;
      box-sizing: border-box;
      margin: 8px 8px 0 8px;
      background: #ffffff;
      overflow-x: hidden;
      overflow-y: auto;
      height: calc(100vh - 138px);
      color: #5e6d82;
    }
  }

  .el-affix--fixed, .el-overlay {
    right: 8px !important;
    position: fixed;
  }

  .zan-fix {
    box-shadow: 0 1px 24px rgb(149 149 149 / 40%);
    border-radius: 10px;

    li {
      list-style: none;
      vertical-align: top;

      i {
        display: block;
        font-size: 18px;
        text-align: center;
      }

      span {
        margin-top: 2px;
        display: block;
        font-size: 14px;
        text-align: center;
      }

      .fix-top, .fix-middle, .fix-bottom {
        text-decoration: none;
        display: block;
        width: 78px;
        padding: 10px 0 8px 0;
        color: #ffffff;
        float: left;
        border-color: #409EFF;
        opacity: .7;
      }

      .fix-top:hover, .fix-middle:hover, .fix-bottom:hover {
        opacity: 1
      }

      .fix-top {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: rgb(121, 187, 255);
      }

      .fix-middle {
        background-color: #67C23A;
      }

      .fix-bottom {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background-color: #E6A23C;
      }
    }
  }

}
</style>