<template>
  <div
    :style="{
      width: collapse ? '64px' : '200px',
    }"
    class="sidebar"
  >
    <div class="zan-sidebar-nav">
      <img alt="" src="../../assets/image/LG.png" />
      <h1 v-if="!collapse">Admin Frame</h1>
    </div>
    <el-menu
      :default-active="onRoutes"
      class="sidebar-el-menu"
      :collapse="collapse"
      :collapse-transition="true"
      unique-opened
      background-color="#001529"
      active-text-color="#ffffff"
      text-color="#C0C4CC"
      router
    >
      <template v-for="item in menuItem">
        <template v-if="item?.children?.length">
          <el-submenu :key="item.resourceUrl" :index="item.resourceUrl">
            <template #title>
              <i :class="item.resourceIcon"></i>
              <span
                :class="
                  item.resourceIcon
                    ? 'sidebar-title'
                    : 'sidebar-title sidebar-nullIcon'
                "
                >{{ item.resourceName }}</span
              >
            </template>
            <template v-for="childItem in item.children">
              <el-submenu
                v-if="childItem?.children?.length"
                :key="childItem.resourceUrl"
                :index="childItem.resourceUrl"
              >
                <template #title>
                  <i :class="childItem.resourceIcon"></i>
                  <span
                    :class="
                      childItem.resourceIcon
                        ? 'sidebar-title'
                        : 'sidebar-title sidebar-nullIcon'
                    "
                    >{{ childItem.resourceName }}</span
                  >
                </template>
                <el-menu-item
                  v-for="(grandsonItem, i) in childItem.children"
                  :key="i"
                  :index="grandsonItem.resourceUrl"
                >
                  <span class="sidebar-title">{{
                    grandsonItem.resourceName
                  }}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :key="childItem.resourceUrl"
                :index="childItem.resourceUrl"
              >
                <template #title>
                  <i :class="childItem.resourceIcon"></i>
                  <span
                    :class="
                      childItem.resourceIcon
                        ? 'sidebar-title'
                        : 'sidebar-title sidebar-nullIcon'
                    "
                    >{{ childItem.resourceName }}</span
                  >
                </template>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>

        <template v-else>
          <el-menu-item :key="item.resourceUrl" :index="item.resourceUrl">
            <i :class="item.resourceIcon"></i>
            <template #title class="sidebar-title">{{
              item.resourceName
            }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { defineComponent, toRefs, reactive, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import resourceList from "../../assets/js/resource";
export default defineComponent({
  name: "sidebar",
  setup() {
    const store = useStore();
    const router = useRouter(); //路由
    const route = useRoute(); //路由

    const state = reactive({
      menuItem: computed(() => resourceList), //查询菜单栏
      onRoutes: computed(() => route.path),
      collapse: computed(() => {
        return store.state.collapse;
      }),
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.sidebar {
  height: 100%;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  .sidebar-el-menu {
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .zan-sidebar-nav {
    box-sizing: border-box;
    padding: 16px 10px 16px 10px;
    background-color: rgb(0, 21, 41);
    display: flex;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
      padding-left: 5px;
    }
    h1 {
      white-space: nowrap;
      display: inline-block;
      height: 32px;
      margin: 0 0 0 12px;
      color: #fff;
      font-weight: 600;
      font-size: 18px;
      line-height: 32px;
      vertical-align: middle;
    }
  }

  .fa {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    //color: #c0c4cc;
  }
}
</style>
