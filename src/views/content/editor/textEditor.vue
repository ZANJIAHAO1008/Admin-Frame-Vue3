<template>
  <div>
    <p style="font-size: 26px">
      QuillEditor —— 轻量级 web 富文本编辑器，配置方便，使用简单。
    </p>
    <QuillEditor
      class="m-t8 min-h350"
      :readOnly="readOnly"
      placeholder="欢迎来到Admin-Frame-Vue3"
      theme="snow"
      :toolbar="toolbarOptions"
      contentType="html"
      :content="content"
      @textChange="textChange"
      @ready="ready"
      @update:content="update"
    />
    <el-card class="m-t8">
      <template #header>
        <div class="card-header">
          <span style="font-size: 18px">HTML 代码</span>
        </div>
      </template>
      <div v-text="content ? content : '输入内容后自动同步'"></div>
    </el-card>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default defineComponent({
  components: {
    QuillEditor,
  },
  setup() {
    const state = reactive({
      readOnly: false,
      content: "<h1><strong>欢迎来到Admin-Frame-Vue3</strong></h1>",
      toolbarOptions: [
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
      ],
    });

    const textChange = (text) => {
      //文本改变时触发
      console.log("文本改变时触发", text);
    };

    const update = (text) => {
      //当编辑器内容改变时触发
      console.log("当编辑器内容改变时触发", text);
      state.content = text ? text : "";
    };

    const ready = () => {
      //Quill初始化后触发
      console.log("Quill初始化后触发");
    };

    return {
      ...toRefs(state),
      textChange,
      update,
      ready,
    };
  },
});
</script>

