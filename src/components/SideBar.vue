<template>
  <div class="sidebar">
    <el-menu
        :default-active="onRoutes"
        class="sidebar-el-menu"
        :collapse="collapse"
        unique-opened
        router>
      <template v-for="item in menuItem">
        <template v-if="item.children">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="childItem in item.children">
              <el-submenu
                  v-if="childItem.children"
                  :index="childItem.index"
                  :key="childItem.index">
                <template #title>{{ childItem.title }}</template>
                <el-menu-item
                    v-for="(grandsonItem, i) in childItem.children"
                    :key="i"
                    :index="grandsonItem.index"
                >{{ grandsonItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                  v-else
                  :index="childItem.index"
                  :key="childItem.index"
              >{{ childItem.title }}
              </el-menu-item>

            </template>
          </el-submenu>
        </template>


        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
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
  setup(){
    const store = useStore();
    const router = useRouter(); //路由
    const route = useRoute(); //路由

    const state = reactive({
      menuItem: [
        {
          icon: "el-icon-lx-home",
          index: "home",
          title: "首页"
        },
        {
          icon: "el-icon-lx-cascades",
          index: "table",
          title: "基础表格"
        },
        {
          icon: "el-icon-lx-global",
          index: "i18n",
          title: "国际化功能"
        },
        {
          icon: "el-icon-lx-warn",
          index: "7",
          title: "错误处理",
          children: [
            {
              index: "permission",
              title: "权限测试"
            },
            {
              index: "404",
              title: "404页面"
            }
          ]
        },
        {
          icon: "el-icon-lx-redpacket_fill",
          index: "/donate",
          title: "支持作者"
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
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>