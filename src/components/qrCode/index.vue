<template>
  <el-space direction="vertical">
    <el-card class="box-card" style="width: 60vw">
      <template #header>
        <div class="card-header">
          <span>输入内容展示二维码</span>
        </div>
      </template>
      <div class="text item">
        <el-input v-model="text" placeholder="输入内容展示二维码" />
        <img v-if="text" :src="qrCode" alt="QR Code" />
      </div>
    </el-card>
  </el-space>
</template>
<script setup lang="ts" name="AdminQrCode">
import { ref } from "vue";
import { useQRCode } from "@vueuse/integrations/useQRCode";
const text = ref<string>("Admin-Frame");
const qrCode = useQRCode(text);
</script>
