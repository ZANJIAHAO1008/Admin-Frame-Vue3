<template>
  <div class="sidebar">
    <el-menu
        :default-active="onRoutes"
        class="sidebar-el-menu"
        :collapse="collapse"
        collapse-transition
        unique-opened
        background-color="rgb(0, 21, 41)"
        active-text-color="#ffffff"
        text-color="#C0C4CC"
        router>
      <template v-for="item in menuItem">
        <template v-if="item.children">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span class="sidebar-title">{{ item.title }}</span>
            </template>
            <template v-for="childItem in item.children">
              <el-submenu
                  v-if="childItem.children"
                  :index="childItem.index"
                  :key="childItem.index">

                <template #title>
                  <i :class="childItem.icon"></i>
                  <span class="sidebar-title">{{ childItem.title }}</span>
                </template>
                <el-menu-item
                    v-for="(grandsonItem, i) in childItem.children"
                    :key="i"
                    :index="grandsonItem.index"
                >
                  <span class="sidebar-title">{{ grandsonItem.title }}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                  v-else
                  :index="childItem.index"
                  :key="childItem.index"
              >

                <template #title>
                  <i :class="childItem.icon"></i>
                  <span class="sidebar-title">{{ childItem.title }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>


        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon"></i>
            <template #title class="sidebar-title">{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import {defineComponent, toRefs, reactive, ref, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex';

export default defineComponent({
  name: "sidebar",
  setup() {
    const store = useStore();
    const router = useRouter(); //路由
    const route = useRoute(); //路由

    const state = reactive({
      menuItem: [
        {
          icon: "fa fa-home",
          index: "homePage",
          title: "个人中心"
        },
        {
          icon: "fa fa-bar-chart",
          index: "6",
          title: "数据管理",
          children: [
            {
              icon: "fa fa-table",
              index: "table",
              title: "基础表格"
            },
            {
              icon: "fa fa-table",
              index: "form",
              title: "基础表单"
            },
          ]
        },
        {
          icon: "fa fa-exclamation",
          index: "7",
          title: "错误提示",
          children: [
            {
              icon: "fa fa-close",
              index: "404",
              title: "404页面"
            },
            {
              icon: "fa fa-exclamation-circle",
              index: "403",
              title: "403页面"
            }
          ]
        },
        {
          icon: "fa fa-comments",
          index: "messageCenter",
          title: "消息中心"
        }
      ], //菜单栏
      onRoutes: computed(() => route.path.replace("/", "")),
      collapse: computed(() => store.state.collapse),
    });

    return {
      ...toRefs(state)
    }
  }

})
</script>
<style lang="less">
.sidebar {
  height: calc(100%);

  .el-menu {
    border-right: 0;
  }

  .fa {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    color: #C0C4CC;
  }

  .el-menu .el-menu-item.is-active {
    background-color: rgb(64, 158, 255) !important;
  }
}
.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}

.sidebar > ul {
  height: 100%;
}

.el-menu-item:focus, .el-menu-item:hover {
  outline: 0px;
  background-color: #606266 !important;
}

.el-submenu__title:hover {
  background-color: #606266 !important;
}
</style>