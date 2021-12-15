<template>
  <div class="noviceGuide">
    <el-button type="primary" size="small" @click="toGuide">进入新手引导</el-button>
  </div>
</template>
<script>
import { defineComponent, reactive, onMounted } from "vue";
// import Driver from "driver.js";
// import "driver.js/dist/driver.min.css";
import steps from "../../assets/js/guide";
export default defineComponent({
  setup() {
    const state = reactive({
      driver: null, //引导实例
    });

    onMounted(() => {
      initDriver();
    });

    const initDriver = () => {
      //初始化引导
      state.driver = new Driver({
        className: "scoped-class", // className to wrap driver.js popover
        animate: true, // Animate while changing highlighted element
        opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
        padding: 6, // Distance of element from around the edges
        allowClose: false, // Whether clicking on overlay should close or not
        overlayClickNext: false, // Should it move to next step on overlay click
        doneBtnText: "完成", // Text on the final button
        closeBtnText: "关闭", // Text on the close button for this step
        nextBtnText: "下一步", // Next button text for this step
        prevBtnText: "上一步", // Previous button text for this step
        // Called when moving to next step on any step
      });
    };

    const toGuide = () => {
      //开始新手引导
      state.driver.defineSteps(steps);
      state.driver.start();
    };

    return {
      toGuide,
    };
  },
});
</script>
