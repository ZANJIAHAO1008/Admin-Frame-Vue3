<template>
  <div class="app-wrapper">
    <el-container style="height: 100vh">
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
          </div>
        </el-main>
      </el-container>
    </el-container>
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
    const state = reactive({})
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
}
</style>