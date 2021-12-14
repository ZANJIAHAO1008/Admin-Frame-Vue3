<template>
  <el-switch
    v-model="value"
    style="display: block"
    active-color="#13ce66"
    active-text="开启水印"
    inactive-text="关闭水印"
  />
</template>
<script>
import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import Watermark from "../../common/wartermark.js"; // 引入水印
export default defineComponent({
  name: "WatermarkTest",
  setup() {
    const value = ref(true);

    watch(value, (n, o) => {
      if (n) {
        Watermark.set("Admin Frame 添加水印"); // 添加水印
        return false;
      }
      Watermark.remove(); //卸载水印
    });

    onMounted(() => {
      Watermark.set("Admin Frame 添加水印"); // 添加水印
    });

    onUnmounted(() => {
      Watermark.remove(); //卸载水印
    });

    return {
      value,
    };
  },
});
</script>