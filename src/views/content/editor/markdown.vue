<template>
  <div>
    <p style="font-size: 26px">
      Markdown编辑器，基于vue3，使用jsx和typescript语法开发，支持切换主题、prettier美化文本等。
    </p>
    <md-editor class="m-t8" v-model="text" />
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
export default defineComponent({
  name: "markdown",
  components: { MdEditor },
  setup() {
    const state = reactive({
      text: "## Admin-Frame",
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
