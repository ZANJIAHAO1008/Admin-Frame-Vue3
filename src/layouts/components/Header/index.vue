<template>
  <div :class="configStore.appConfig.showTabBar ? 'header-wrapper' : 'header-wrapper borderBottom'">
    <div class="collapse-left">
      <div class="collapse-btn-group">
        <i v-if="configStore.appConfig.showFoldButton" title="点击打开关闭菜单" @click="switchCollapse"
          :class="collapse ? 'fa fabtn fa-indent' : 'fa fabtn fa-dedent'"></i>
        <i v-if="configStore.appConfig.showReFresh" title="刷新页面" @click="reload()" class="fa fa-refresh"
          aria-hidden="true"></i>
      </div>
      <div class="collapse-breadcrumb" v-if="configStore.appConfig.showBreadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item v-for="(item, index) in  route.matched" :key="item.path">
            <span :style="{
              'font-weight': route.matched.length === index + 1 ? 700 : 500
            }">{{ transitionLocal("message." + item.meta.title) }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="collapse-right">
      <span class="faSpan" v-if="configStore.appConfig.showFullScreen">
        <i class="fa fa-arrows-alt" @click="requestFullScreen()"></i>
      </span>
      <el-dropdown @command="changeI18n" v-if="configStore.appConfig.showI18n">
        <span class="el-dropdown-link faSpan">
          <i class="fa fa-language g-language" style="font-size: 18px"></i>
        </span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :command="locale"
              :style="{
                color: $i18n.locale == locale ? 'rgb(64, 158, 255)' : '',
              }">{{ $filters.inspectLanguage(locale) }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="faSpan" @click="toGetMessage" v-if="configStore.appConfig.showMessage">
        <el-badge is-dot class="item">
          <i class="fa faPad fa-bell-o"></i>
        </el-badge>
      </span>
      <span class="faSpan" @click="configVisible = true" v-if="configStore.appConfig.showConfigMenu">
        <i class="fa faPad fa-cogs"></i>
      </span>
      <!-- 用户名下拉菜单 -->
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link btn_username_group">
          <span class="btn_username" :title="username">{{ username }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="signOut">{{
                t("message.public.loggedOut")
            }}</el-dropdown-item>
            <el-dropdown-item command="versionLog">{{
                t("message.public.versionLog")
            }}</el-dropdown-item>
            <el-dropdown-item command="baseInfo">{{
                t("message.public.basicInfo")
            }}</el-dropdown-item>
            <el-dropdown-item command="checkPass">{{
                t("message.public.changePassword")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 用户头像 -->
      <div class="user-avatar">
        <img :src="getImage('touxiang', 'jpg')" />
      </div>
    </div>
    <check-pass v-model:passVisible="passVisible"></check-pass>
    <base-info ref="baseInfoRef" v-model:baseVisible="baseVisible"></base-info>
    <version-log v-model:versionVisible="versionVisible"></version-log>
    <app-config v-model:configVisible="configVisible"></app-config>
  </div>
</template>
<script setup lang="ts" name="AdminHeader">
import {
  getCurrentInstance,
  ref,
  computed,
  unref,
  inject
} from "vue";
import $filters from "@/filters/index";
import screenFull from "screenfull";
import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import Cookies from "js-cookie";
import CheckPass from "@/components/dropDownItem/checkPass.vue";
import BaseInfo from "@/components/dropDownItem/baseInfo.vue";
import VersionLog from "@/components/dropDownItem/versionLog.vue";
import AppConfig from "@/components/appConfig/index.vue";
import { useI18n } from "vue-i18n";
import { useTagStore } from "@/pinia/modules/tag";
import { useUserStore } from "@/pinia/modules/user";
import { Component_Size } from "@/assets/js/dictionarie";
import { removeToken } from "@/utils/auth";
import { HeaderState } from "@/types/layout";
import { getImage } from "@/utils";
import { transitionLocal } from "@/locales/i18n"; //国际化\
import { useConfigStore } from "@/pinia/modules/config";
const configStore = useConfigStore();
const tagStore = useTagStore();
const userStore = useUserStore();
const route = useRoute();
const { proxy } = <any>getCurrentInstance(); // vue原型
const { t, locale: language } = useI18n();
const router = useRouter(); //路由
const baseInfoRef = ref();
const collapse = computed(() => tagStore.collapse); //打开关闭sidebar
const username = computed(() => userStore?.user?.username || "待完善"); //用户名
let passVisible = ref<boolean>(false);  //修改密码弹框
let baseVisible = ref<boolean>(false);  //基本信息弹框
let versionVisible = ref<boolean>(false);  //版本日志弹框
let configVisible = ref<boolean>(false);  //应用配置弹框
const reload = inject("reload") as Function;
const requestFullScreen = () => {
  //进入全屏 退出全屏
  if (screenFull.isEnabled) {
    //检测是否支持screenFull
    if (screenFull.isFullscreen) {
      //如果是全屏则退出
      screenFull.exit();
    } else {
      //不是则进入全屏
      screenFull.toggle();
    }
  }
};

const switchCollapse = () => {
  //菜单栏展开关闭
  tagStore.$patch({
    collapse: !unref(collapse)
  })
};

const handleCommand = <T extends string>(command: T) => {
  //用户下拉菜单
  if (command === "signOut") {
    removeToken();
    tagStore.delRightMenu({ WHITE_TAGS_LIST: [] }); //退出清空所有菜单
    router.push("/login");
    ElMessage.success("登出成功");
  } else if (command === "checkPass") {
    //打开修改密码弹框
    passVisible.value = true;
  } else if (command === "baseInfo") {
    //打开基本信息弹框
    unref(baseInfoRef).openBaseInfo()
  } else if (command === "versionLog") {
    //打开版本日志弹框
    versionVisible.value = true;
  }
};

const toGetMessage = () => {
  //进入反馈中心
  router.push("/main/feedbackCenter");
};

const changeI18n = <T extends string>(type: T) => {
  //切换中英文
  if (type == Cookies.get("lang")) {
    //如果已经是这个语言则提醒
    ElMessage.warning(`${t("message.public.recurrentSelection")}`);
    return;
  }
  Cookies.set("lang", type); //存储国际化
  language.value = type; //更新i18n配置
  configStore.$patch({
    language: type
  })
  proxy.$i18n.locale = type; //更新i18n配置
  ElMessage.success(`${t("message.public.editLang")}`);
};
</script>
<style lang="scss" scoped>
.header-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  font-size: 18px;
  color: var(--af-default-font-color);
  display: flex;
  justify-content: space-between;

  .collapse-left {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .collapse-btn-group {
      padding: 0px 0px 0 15px;
      cursor: pointer;

      i {
        margin-right: 25px;
      }
    }
  }

  .el-icon-s-fold,
  .el-icon-s-unfold {
    font-size: 25px;
    cursor: pointer;
  }

  .collapse-right {
    float: right;
    padding-right: 8px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .faSpan {
      padding-right: 20px;
      cursor: pointer;
    }
  }

  .user-avatar {
    margin: 0 15px 0 5px;
  }

  img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .btn_username_group {
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    .btn_username {
      text-align: right;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 60px;
    }
  }
}
</style>
