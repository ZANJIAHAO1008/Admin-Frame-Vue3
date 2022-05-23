<template>
  <el-config-provider :locale="elConfig.locale" :size="elConfig.componentSize">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import * as eCharts from "echarts";
import { useConfigStore } from "@/pinia/modules/config";
import { useMobile } from '@/common/mobile';
import { useAppConfig } from '@/common/appConfig';
import { useTagStore } from "@/pinia/modules/tag";
const configStore = useConfigStore();
const tagStore = useTagStore();
const { isMobile } = useMobile(configStore, tagStore);
const { elConfig } = useAppConfig(configStore);
provide("eCharts", eCharts); //全局穿透eCharts

</script>
<style lang="scss">
@use "@/assets/style/index.scss"as *;
</style>