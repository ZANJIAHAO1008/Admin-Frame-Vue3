<template>
  <el-config-provider :locale="elConfig.locale" :size="elConfig.componentSize">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import * as eCharts from "echarts";
import { provide } from "vue";
import Cookies from "js-cookie";
import { usePreferredLanguages } from "@vueuse/core";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import { useConfigStore } from "@/pinia/modules/config";
import { ElConfig } from '@/types/layout'
const defaultLanguages = usePreferredLanguages();
const configStore = useConfigStore();
const elConfig: Partial<ElConfig> = reactive({
  locale: undefined,
  componentSize: ""
})

watch(
  () => configStore.language,
  (newValue, oldValue) => {
    //实时监听国际化切换替换element自带国际化
    newValue === 'en' ? elConfig.locale = en : elConfig.locale = zhCn;
  },
)

watch(
  () => configStore.componentSize,
  (newValue, oldValue) => {
    //实时监听国际化切换替换element自带国际化
    elConfig.componentSize = newValue;
  },
)

watch(
  () => configStore.isGrayscale,
  (newValue, oldValue) => {
    //实时监听灰色模式
    if (newValue) {
      document.body.setAttribute('style', 'filter:grayscale(100%)')
    } else {
      document.body.setAttribute('style', 'filter:grayscale(0)')
    }
  },
)


onMounted(() => {
  if (configStore.isGrayscale) {
    document.body.setAttribute('style', 'filter:grayscale(100%)')
  } else {
    document.body.setAttribute('style', 'filter:grayscale(0)')
  }
})

provide("eCharts", eCharts); //全局穿透eCharts

const setDefaultSetting = () => {
  //添加一些默认配置
  if (!Cookies.get("lang")) {
    //如果未设置过 则默认中文 可根据接口返回的个人信息中 增加默认语言
    Cookies.set("lang", defaultLanguages?.value[1] ?? "zh");
    configStore.$patch({
      language: 'zh'
    })
  }

  if (!configStore.componentSize) {
    //默认添加size大小
    configStore.$patch({
      componentSize: ""
    })
  }
};

setDefaultSetting();
</script>
<style lang="scss">
@import "@/assets/style/index.scss";
@import "@/assets/style/element-ui.scss";
</style>
