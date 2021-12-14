<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script>
import * as echarts from "echarts";
import { computed, getCurrentInstance, provide, watch } from "vue";
import Cookies from "js-cookie";
import { defineComponent, toRefs, reactive } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
export default defineComponent({
  name: "App",
  components: {
    ElConfigProvider,
  },
  setup() {
    provide("echarts", echarts); //全局穿透Echarts
    const state = reactive({
      locale: computed(() => {
        return Cookies.get("lang") === "en" ? en : zhCn;
      }),
    });
    const proxy = getCurrentInstance();
    const settingDefaultLang = () => {
      //如果未设置过 则默认中文 可根据接口返回的个人信息中 增加默认语言
      if (!Cookies.get("lang")) {
        Cookies.set("lang", "zh-cn");
      }
    };
    settingDefaultLang();

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss">
@import "./src/style/index.scss";
@import "./src/style/element-ui.scss";
</style>
