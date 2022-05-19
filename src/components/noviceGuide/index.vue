<template>
   <el-card shadow="never" :body-style="{ padding: '30px' }">
      <template #header>
        <div class="card-header">
          新手引导
        </div>
      </template>
    <el-button type="primary" @click="toGuide">进入新手引导</el-button>
   </el-card>
</template>
<script lang="ts" setup name="AdminNoviceGuide">
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import steps from "../../assets/js/guide";
const driver = new Driver({
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

const toGuide = () => {
  //开始新手引导
  driver.defineSteps(steps);
  driver.start();
}
</script>
