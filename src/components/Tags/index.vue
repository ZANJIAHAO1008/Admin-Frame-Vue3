<template>
  <div class="tag_content">
    <div v-if="tagsList.length > 0" class="tags">
      <el-tag
        :key="tag"
        type=""
        :class="path === tag.path ? 'tag_check' : 'tag_nocheck'"
        v-for="(tag, index) in tagsList"
        :closable="tag.path == '/homePage' ? false : true"
        size="medium"
        effect="plain"
        @close="aClosingTag(tag, index)"
        @click="triggerTag(tag, 'go')"
        :disable-transitions="false"
      >
        {{ tag.title }}
      </el-tag>
    </div>
    <el-dropdown v-if="tagsList.length > 0" @command="rightMenu">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="all">关闭全部</el-dropdown-item>
          <el-dropdown-item command="other"> 关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
import {
  defineComponent,
  getCurrentInstance,
  toRefs,
  reactive,
  ref,
  watch,
  computed,
  onMounted,
} from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "tags",
  setup() {
    const store = useStore(); //vuex仓库
    const route = useRoute(); //路由
    const router = useRouter(); //路由
    let { proxy } = getCurrentInstance(); // vue原型
    const state = reactive({
      tagsList: computed(() => store.state.tagsList), //标签仓库
      path: "", //选中标签
    });

    const setTags = (route) => {
      // 设置标签
      const isExist = state.tagsList.some((item) => {
        return item.path === route.fullPath;
      });
      if (!isExist) {
        if (state.tagsList.length >= 10) {
          //如果标签到10个再选择就将最初的删除
          store.commit("delTags", { index: 0 });
        }
        store.commit("setTags", {
          name: route.name,
          title: route.meta.title,
          path: route.fullPath,
        });
      }
    };
    const aClosingTag = (tag, index) => {
      //删除标签
      if (state.tagsList.length <= 1) {
        //最后一个标签不能删
        ElMessage.warning({
          message: "最后一个标签了哦！",
          type: "warning",
        });
        return false;
      }
      store.commit("delTags", { index: index });
      triggerTag(state.tagsList[state.tagsList.length - 1], "go");
    };
    const triggerTag = (tag, type) => {
      //选择标签
      // debugger
      proxy._public.debounce(() => {
        state.path = tag.path;
        if (type) {
          //如果是点击标签则进行路由跳转
          router.push(tag.path);
        }
      }, 100);
    };
    const rightMenu = (menu) => {
      //右菜单操作
      let whiteTags = ["/homePage"];
      if (state.path !== whiteTags[0] && menu === "other") {
        whiteTags.push(state.path);
      }
      store.commit("delRightMenu", {
        whiteTags,
      });
      router.push(whiteTags[whiteTags.length - 1]);
    };

    onBeforeRouteUpdate((to) => {
      //监听路由变动
      setTags(to);
      triggerTag(to);
    });
    onMounted(() => {
      //监听路由变动
      setTags(route);
      triggerTag(route);
    });

    return {
      ...toRefs(state),
      setTags,
      aClosingTag,
      triggerTag,
      rightMenu,
    };
  },
});
</script>
<style lang="scss" scoped>
.tag_content {
  padding: 6px 0px;
  margin: 0px 12px;
  box-sizing: border-box;
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tags {
    width: calc(100vw - 310px);
    overflow: auto;
  }
  .el-tag {
    cursor: pointer;
    margin-right: 8px;
    //height: 30px;
    //padding: 0px 13px 0 9px;
    //line-height: 28px;
    //border-radius: 0;
  }
  ::v-deep(.el-tag .el-icon-close) {
    color: rgb(97, 97, 97) !important;
  }
  ::v-deep(.el-tag .el-icon-close:hover) {
    background: none;
  }
  .tag_check {
    background-color: rgb(255, 255, 255) !important;
    border-color: rgb(255, 255, 255) !important;
    color: #409eff !important;
  }
  .tag_nocheck {
    background-color: rgb(255, 255, 255) !important;
    border-color: rgb(255, 255, 255) !important;
    color: rgb(97, 97, 97) !important;
  }
  .el-dropdown-link {
    text-align: center;
    height: 26px;
    display: block;
    width: 70px;
    background: #fff;
    line-height: 26px;
  }
}
</style>
