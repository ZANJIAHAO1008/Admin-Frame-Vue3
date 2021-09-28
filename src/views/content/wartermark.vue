<template></template>
<script>
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
import Watermark from "../../common/wartermark.js"; // 引入水印
export default defineComponent({
  name: "WatermarkTest",
  setup() {
    onMounted(() => {
      Watermark.set("Admin Frame 添加水印"); // 添加水印
    });

    onUnmounted(() => {
      Watermark.remove(); //卸载水印
    });
  },
});
</script>