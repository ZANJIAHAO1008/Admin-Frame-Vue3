<template>

  <el-card shadow="always" :body-style="{ padding: '30px' }">
    <template #header>
      <div class="card-header">
        QuillEditor —— 轻量级 web 富文本编辑器，配置方便，使用简单。
      </div>
    </template>
    <QuillEditor class="m-t8 min-h350" :read-only="readOnly" placeholder="欢迎来到Admin-Frame-Vue3" theme="snow"
      :toolbar="toolbarOptions" content-type="html" :content="content" @text-change="textChange" @ready="ready"
      @update:content="update" />
    <el-card class="m-t8">
      <template #header>
        <div class="card-header">
          <span style="font-size: 18px">Html代码</span>
        </div>
      </template>
      <div v-text="content ? content : '输入内容后自动同步'"></div>
    </el-card>
    <el-card class="m-t8">
      <template #header>
        <div class="card-header">
          <span style="font-size: 18px">Text文本</span>
        </div>
      </template>
      <div v-html="content ? content : '输入内容后自动同步'"></div>
    </el-card>
  </el-card>
</template>

<script setup lang="ts" name="AdminTextEditor">
import { reactive, ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const readOnly = ref<boolean>(false); //只读
const content = ref<string>(
  "<h1><strong>欢迎来到Admin-Frame-Vue3</strong></h1>"
); //内容
const toolbarOptions = reactive([
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
]);

const textChange = (text: string) => {
  //文本改变时触发
  console.log("文本改变时触发", text);
}

const update = (text: string) => {
  //当编辑器内容改变时触发
  console.log("当编辑器内容改变时触发", text);
  content.value = text ? text : "";
}

const ready = () => {
  //Quill初始化后触发
  console.log("Quill初始化后触发");
}
</script>
<style lang="scss" scoped>
</style>
