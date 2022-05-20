<template>
  <el-config-provider :locale="elConfig.locale" :size="elConfig.componentSize">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import * as eCharts from "echarts";
import { provide } from "vue";
import { useConfigStore } from "@/pinia/modules/config";
import { useMobile } from '@/common/mobile';
import { useAppConfig } from '@/common/appConfig'
const configStore = useConfigStore();
const { isMobile } = useMobile(configStore);
const { elConfig } = useAppConfig(configStore);
provide("eCharts", eCharts); //全局穿透eCharts
</script>
<style lang="scss">
@import "@/assets/style/index.scss";
@import "@/assets/style/element-ui.scss";
</style>
