<template>
  <div class="app-wrapper">
    <el-container style="height: 100vh">
      <el-aside style="width: auto">
        <side-bar></side-bar>
      </el-aside>
      <el-container>
        <el-header height="64px">
          <Header></Header>
        </el-header>
        <el-main>
          <Tags v-if="configStore.appConfig.showTabBar"></Tags>
          <div id="screen-display" v-loading="!isReload" class="content" :style="{
            height: configStore.appConfig.showTabBar ? 'calc(100vh - 115px)' : 'calc(100vh - px)'
          }">
            <router-view v-if="isReload" v-slot="{ Component }">
              <Transition appear name="fade" appear-active-class="animate__animated animate__pulse"
                enter-active-class="animate__animated animate__fadeIn">
                <!--进入 enter-active-class   移出 leave-active-class  初始 appear-active-class-->
                <component :is="Component" v-if="Component" />
              </Transition>
            </router-view>
            <el-backtop target=".content"></el-backtop>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts" name="AdminMain">
import SideBar from "@/layouts/components/SideBar/index.vue";
import Header from "@/layouts/components/Header/index.vue";
import Tags from "@/layouts/components/Tags/index.vue";
import { nextTick, provide, ref } from "vue";
import { useConfigStore } from "@/pinia/modules/config";
const configStore = useConfigStore();
const isReload = ref<boolean>(true);
const reload = () => {
  isReload.value = false;
  nextTick(() => {
    setTimeout(() => {
      isReload.value = true;
    }, 500);
  })
}
provide("reload", reload);
</script>
<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .el-aside {
    position: relative;
    overflow: hidden;
  }

  .el-header,
  .el-main {
    padding: 0;
  }

  .el-main {
    background: #f0f2f5;

    .content {
      padding: 6px 5px 8px 5px;
      box-sizing: border-box;
      margin: 0px 8px 0 8px;
      // background: #ffffff;
      overflow-x: hidden;
      overflow-y: auto;
      color: #515a6e;
      min-width: 1000px;
    }
  }

  .el-affix--fixed,
  .el-overlay {
    right: 8px !important;
    position: fixed;
  }


}
</style>
