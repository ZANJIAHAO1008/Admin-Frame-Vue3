<template>
  <div class="app-wrapper mobile">
    <div class="drawer-bg" v-if="isMobile && !collapse" @click="(() => {
      tagStore.$patch({
        collapse: true
      })
    })"></div>
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
          <el-scrollbar id="screen-display" v-loading="!isReload" class="content" :style="{
            height: configStore.appConfig.showTabBar ? 'calc(100vh - 105px)' : 'calc(100vh - 82px)'
          }">
            <router-view v-if="isReload" v-slot="{ Component, router }">
              <Transition appear name="fade" appear-active-class="animate__animated animate__pulse"
                enter-active-class="animate__animated animate__fadeIn">
                <!--进入 enter-active-class   移出 leave-active-class  初始 appear-active-class-->
                <KeepAlive :max="configStore.KeepAliveMaxLength">
                  <component :is="Component" />
                </KeepAlive>
              </Transition>
            </router-view>

            <el-backtop target=".content"></el-backtop>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts" name="AdminMain">
import SideBar from "@/layouts/components/SideBar/index.vue";
import Header from "@/layouts/components/Header/index.vue";
import Tags from "@/layouts/components/Tags/index.vue";
import { nextTick, provide, ref, } from "vue";
import { useConfigStore } from "@/pinia/modules/config";
import { useTagStore } from "@/pinia/modules/tag";
import { judgeEquipment } from "@/utils";
const configStore = useConfigStore();
const isReload = ref<boolean>(true);
const tagStore = useTagStore();
const collapse = computed(() => tagStore.collapse); //打开关闭sidebar
const isMobile = computed(() => Boolean(judgeEquipment()))//是否是手机登录
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
    .content {
      box-sizing: border-box;
      margin: 8px 5px 8px 5px;
      color: #515a6e;
      // padding-bottom: 12px;
    }
  }

  .el-affix--fixed,
  .el-overlay {
    right: 8px !important;
    position: fixed;
  }


}
</style>
