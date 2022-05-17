<template>
  <div class="tag_content">
    <TransitionGroup v-if="tagsList.length" name="list" class="tags" tag="div">
      <el-tag v-for="(tag, index) in tagsList" :key="index" :type="selectPath === tag.path ? '' : 'info'"
        :class="selectPath === tag.path ? 'tag_check' : 'tag_null_check'"
        :closable="tag.path == '/dashboard/workbench' ? false : true"
        :effect="selectPath === tag.path ? 'dark' : 'plain'" :disable-transitions="false" @close="closeTag(index)"
        @click="triggerTag(tag, 'go')" size="large">
        {{ t("message." + tag.title) }}
      </el-tag>
    </TransitionGroup>
    <div class="right_trigger_box">
      <span class="el-dropdown-link fullScreen" @click="toFullScreen">
        <el-icon>
          <full-screen />
        </el-icon>
      </span>
      <el-dropdown trigger="click" @command="triggerRight">
        <span class="el-dropdown-link">
          <i class="fa fa-angle-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="reload">
              <span>{{ t("message.public.reload") }}</span>
            </el-dropdown-item>
            <el-dropdown-item command="all" :disabled="tagsList.length === 1">
              <span>{{ t("message.public.closeAll") }}</span>
            </el-dropdown-item>
            <el-dropdown-item command="other" :disabled="tagsList.length <= 2">{{ t("message.public.closeOther") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts" name="AdminTags">
import {
  getCurrentInstance,
  computed,
  onMounted,
  ref,
  inject,
  toRaw,
  unref,
  isProxy,
  watch
} from "vue";
import { FullScreen } from "@element-plus/icons-vue";
import {
  useRoute,
  useRouter,
} from "vue-router";
import { ElMessage, ElNotification } from "element-plus";
import { useI18n } from "vue-i18n";
import { useTagStore } from "@/pinia/modules/tag";
import screenFull from "screenfull";
import { Tag } from "@/types/layout";
import { storeToRefs } from "pinia";
const tagStore = useTagStore();
const { tagsList } = storeToRefs(tagStore);
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { proxy } = <any>getCurrentInstance();
const reload = inject("reload") as Function;
let selectPath = ref<string>("");
const setTags = <T extends Tag>(target: T) => {
  // 设置标签
  const isExist = unref(tagsList).some((item: { path: string }) => {
    return item.path === target.fullPath;
  });
  if (!isExist) {
    if (unref(tagsList).length >= tagStore.MAX_TAG_LENGTH) {
      //如果标签到10个再选择就将最初的删除
      let index: number = 0;
      for (const [i, v] of unref(tagsList).entries()) {
        if (v.path === "/dashboard/workbench") {
          if (i === 0) {
            index += 1;
            break;
          }
        }
      }
      tagStore.delTags({ index });
    }


    tagStore.setTags({
      title: target.meta.title,
      ...target,
    });
  }

};


const closeTag = <K extends number>(index: K) => {
  //关闭标签
  tagStore.delTags({ index });
  triggerTag(unref(tagsList)[unref(tagsList).length === index ? index - 1 : index], "go");
};

const triggerTag = <T extends Tag, K extends string>(tag: T, type?: K) => {
  //选择标签
  proxy._public.debounce(() => {
    selectPath.value = tag.path;
    if (type) {
      //如果是点击标签则进行路由跳转
      router.push(tag.path);
    }
  }, 150);
};

const triggerRight = <V extends string>(menu: V) => {
  //右菜单操作
  if (["all", "other"].includes(menu)) {
    //如果是关闭标签
    let WHITE_TAGS_LIST: string[] = ["/dashboard/workbench"];
    if (unref(selectPath) !== WHITE_TAGS_LIST[0] && menu === "other") {
      //如果是其他 则把自己添加进白名单
      WHITE_TAGS_LIST.push(unref(selectPath));
    }
    tagStore.delRightMenu({ WHITE_TAGS_LIST });
    router.push(WHITE_TAGS_LIST[WHITE_TAGS_LIST.length - 1]);
  } else if (menu === "reload") {
    //如果是重新渲染
    reload();
  }
};

const toFullScreen = () => {
  //进入全屏 退出全屏
  const element = document.getElementById("screen-display") as HTMLDivElement;
  if (screenFull.isEnabled) {
    //检测是否支持screenFull
    if (screenFull.isFullscreen) {
      //如果是全屏则退出
      screenFull.exit();
    } else {
      //不是则进入全屏
      screenFull.request(element);
      ElNotification({
        title: "Success",
        message: "当前为全屏模式,退出按ESC.",
        type: "success",
        duration: 2000,
        appendTo: "#screen-display",
      });
    }
  }
};



router.beforeEach(async (to, from) => {
  //监听路由变动
  if (!tagStore.BLACK_LIST.includes(to.path)) {
    await setTags(to);
    await triggerTag(to);
  }
});


onMounted(() => {
  //监听路由变动
  setTags(route);
  triggerTag(route);
});
</script>
<style lang="scss" scoped>
.tag_content {
  padding-top: 6px;
  margin: 0px 12px;
  box-sizing: border-box;
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .list-move,
  /* 对移动中的元素应用的过渡 */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  /* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
  .list-leave-active {
    position: absolute;
  }

  .tags {
    width: calc(100vw - 310px);
    overflow: auto;
  }

  .list-move,
  /* 对移动中的元素应用的过渡 */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  /* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
  .list-leave-active {
    position: absolute;
  }

  .el-tag {
    cursor: pointer;
    margin-right: 8px;
  }

  .tag_check {
    border-radius: 1px;
  }

  .tag_null_check {
    background-color: #ffffff !important;
    border-color: #e4e7ed !important;
    color: rgb(97, 97, 97) !important;
    border-radius: 1px;
  }

  .right_trigger_box {
    display: flex;
    border: 1px solid #e4e7ed;

    .fullScreen {
      border-right: 1px solid #e4e7ed;
    }

    .el-dropdown-link {
      cursor: pointer;
      height: 26px;
      width: 50px;
      display: flex;
      background: #fff;
      border-radius: 2px;
      align-items: center;
      justify-content: center;
      color: #a8abb2;

      .fa-angle-down {
        font-size: 20px;
      }
    }

    .el-dropdown-link:hover {
      color: #000;
    }
  }
}
</style>
