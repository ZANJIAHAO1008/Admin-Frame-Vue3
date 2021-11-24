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
        <img :src="qrcode" alt="QR Code" v-if="text"/>
      </div>
    </el-card>
  </el-space>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useQRCode } from "@vueuse/integrations/useQRCode";
export default defineComponent({
  setup() {
    const text = ref("Admin-Frame");
    const qrcode = useQRCode(text);
    return {
      text,
      qrcode,
    };
  },
});
</script>

