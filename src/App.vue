<template>
  <router-view />
</template>
<script setup lang="ts">
import * as eCharts from "echarts";
import { provide } from "vue";
import Cookies from "js-cookie";
import { usePreferredLanguages } from "@vueuse/core";
const defaultLanguages = usePreferredLanguages();

provide("eCharts", eCharts); //全局穿透eCharts

const setDefaultSetting = () => {
  //添加一些默认配置
  if (!Cookies.get("lang")) {
    //如果未设置过 则默认中文 可根据接口返回的个人信息中 增加默认语言
    Cookies.set("lang", defaultLanguages?.value[1] ?? "zh");
  }

  if (!Cookies.get("size")) {
    //默认添加size大小
    Cookies.set("size", "default");
  }
};

setDefaultSetting();
</script>
<style lang="scss">
@import "@/assets/style/index.scss";
@import "@/assets/style/element-ui.scss";
</style>
