<template>
  <div :style="{
    width: collapse ? isMobile ? '0px' : '64px' : '200px',
  }" class="sidebar-wrapper">
     <el-scrollbar>
    <div class="sidebar-info" v-if="configStore.appConfig.showLogo">
      <img :src="getImage('LG', 'png')" />
      <span v-if="!collapse">{{ siteName }}</span>
    </div>
 
      <el-menu :default-active="onRoutes" :collapse="collapse" :collapse-transition="true" unique-opened router>
        <template v-for="item in menuItem">
          <template v-if="item?.children?.length">
            <el-sub-menu :key="item.resourceUrl" :index="item.resourceUrl">
              <template #title>
                <i :class="item.resourceIcon"></i>
                <span :class="
                  item.resourceIcon
                    ? 'menu-title'
                    : 'menu-title menu-nullIcon'
                ">{{ t(item.resourceName) }}</span>
              </template>
              <template v-for="childItem in item.children">
                <el-menu-item-group v-if="childItem?.children?.length" :key="childItem.resourceUrl"
                  :index="childItem.resourceUrl">
                  <template #title>
                    <i :class="childItem.resourceIcon"></i>
                    <span :class="
                      childItem.resourceIcon
                        ? 'menu-title'
                        : 'menu-title menu-nullIcon'
                    ">{{ t(childItem.resourceName) }}</span>
                  </template>
                  <el-menu-item v-for="(grandsonItem, i) in childItem.children" :key="i"
                    :index="grandsonItem.resourceUrl">
                    <span class="menu-title">{{
                        t(grandsonItem.resourceName)
                    }}</span>
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item v-else :key="childItem.resourceUrl + 'childItem'" :index="childItem.resourceUrl">
                  <template #title>
                    <i :class="childItem.resourceIcon"></i>
                    <span :class="
                      childItem.resourceIcon
                        ? 'menu-title'
                        : 'menu-title menu-nullIcon'
                    ">{{ t(childItem.resourceName) }}</span>
                  </template>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>

          <template v-else>
            <el-menu-item :key="item.resourceUrl" :index="item.resourceUrl">
              <i :class="item.resourceIcon"></i>
              <template #title class="menu-title">{{
                  t(item.resourceName)
              }}</template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup name="AdminSidebar">
import { getImage } from '@/utils';
import { computed } from "vue";
import { useRoute } from "vue-router";
import resourceList from "@/assets/js/resource";
import { useI18n } from "vue-i18n";
import { useTagStore } from "@/pinia/modules/tag";
import { ResourceItem } from "@/types/setting";
import { useConfigStore } from "@/pinia/modules/config";
import { siteName } from '@/router/middleware';
import { judgeEquipment } from "@/utils";
const isMobile = computed(() => judgeEquipment())//是否是手机登录
const configStore = useConfigStore();
const { t } = useI18n();
const tagStore = useTagStore();
const route = useRoute();
const menuItem = computed<ResourceItem[]>(() => resourceList);
const onRoutes = computed<string>(() => route.path);
const collapse = computed<boolean>(() => tagStore.collapse);
</script>
<style lang="scss" scoped>
.sidebar-wrapper {
  height: 100%;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  background-color: var(--af-sidebar-color);
  overflow: auto;

  .sidebar-info {
    box-sizing: border-box;
    padding: 16px 10px 16px 10px;
    background-color: var(--af-sidebar-color);
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      padding-left: 5px;
    }

    span {
      white-space: nowrap;
      display: inline-block;
      height: 32px;
      margin: 0 0 0 12px;
      color: var(--af-siteName-color);
      font-weight: 600;
      font-size: 18px;
      line-height: 32px;
      vertical-align: middle;
    }
  }
}
</style>
