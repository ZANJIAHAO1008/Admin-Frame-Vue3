<template>
  <div>
    <p style="font-size: 26px">
      wangEditor —— 轻量级 web 富文本编辑器，配置方便，使用简单。
    </p>
    <el-link
      style="font-size: 18px"
      type="primary"
      class="m-t8"
      href=" https://www.wangeditor.com"
      >官网：https://www.wangeditor.com</el-link
    >
    <div ref="editorRef" class="m-t8"></div>
    <el-button style="margin-top: 8px" type="primary" @click="printHTML"
      >同步内容</el-button
    >
    <div class="m-t8" v-html="html"></div>
  </div>
</template>
<script>
import WangEditor from "wangeditor";
import {
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
  defineComponent,
  toRefs,
} from "vue";
export default defineComponent({
  setup() {
    const editorRef = ref();
    const content = reactive({
      html: "",
      text: "",
      instance: "",
    });

    onMounted(() => {
      //初始化富文本编辑器
      content.instance = new WangEditor(editorRef.value);
      Object.assign(content.instance.config, {
        onchange() {
          console.log("change");
        },
      });
      content.instance.create();
    });

    onBeforeUnmount(() => {
      //卸载编辑器
      content.instance.destroy();
      content.instance = null;
    });

    const printHTML = () => {
      //打印html
      content.html = content.instance.txt.html();
    };

    return {
      editorRef,
      printHTML,
      ...toRefs(content),
    };
  },
});
</script>
<style lang="scss" scoped>

</style>
