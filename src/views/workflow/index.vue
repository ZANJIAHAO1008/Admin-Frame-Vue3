<template>
  <div id="diagramContainer">
    <div id="item_left" class="item">前端</div>
    <div id="item_right" class="item" style="left: 400px; top: 150px">后端</div>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive } from "vue";
import * as jsPlumbTarget from "jsplumb";
import { toRefs } from "@vueuse/shared";
export default defineComponent({
  setup() {
    const state = reactive({
      jsPlumb: null,
    });

    const draw = () => {
      state.jsPlumb.ready(function () {
        state.jsPlumb.connect({
          source: "item_left", //起始点
          target: "item_right", //目标点
          endpoint: "Rectangle", // 端点(方形)
          connector: ["Flowchart"], //连线的样式
          anchor: ["Left", "Right"],
        });
      });
      state.jsPlumb.draggable("item_left");
      state.jsPlumb.draggable("item_right");
    };

    const init = () => {
      //初始化
      state.jsPlumb = jsPlumbTarget.jsPlumb;
    };

    init();

    onMounted(() => {
      draw();
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>


<style lang="scss" scoped>
#diagramContainer {
  padding: 20px;
  // width: 80%;
  height: 400px;
  border: 1px solid gray;
  position: relative;
  .item {
    position: absolute;
    height: 80px;
    width: 80px;
    border: 1px solid #616161;
    text-align: center;
    color: #616161;
    font-size: 16px;
    font-weight: 600;
    line-height: 80px;
  }
}
</style>
