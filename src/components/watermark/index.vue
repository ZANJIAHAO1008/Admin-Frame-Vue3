<template>
  <el-card shadow="always" :body-style="{ padding: '30px' }">
      <template #header>
        <div class="card-header">
          添加水印
        </div>
      </template>
        <el-switch
    v-model="value"
    style="display: block"
    active-color="#13ce66"
    active-text="开启水印"
    inactive-text="关闭水印"
  />
      </el-card>  
</template>
<script setup lang="ts" name="AdminWatermark">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { setWaterMarker, removeWaterMarker } from "@/common/watermark"; // 引入水印

const value = ref<boolean>(true);

watch(value, (newV, oldV) => {
  if (newV) {
    setWaterMarker("Admin Frame 添加水印"); // 添加水印
  } else {
    removeWaterMarker(); //卸载水印
  }
});

onMounted(() => {
  setWaterMarker("Admin Frame 添加水印"); // 添加水印
})

onUnmounted(() => {
  removeWaterMarker(); //卸载水印
})
</script>
