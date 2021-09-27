<template>
  <el-button @click="dialogVisible = true" type="primary">打开可拖拽弹框</el-button>
  <div v-dialogdrag>
    <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="30%"
      :before-close="handleClose"
    >
      <div style="heig">
        <span
          >Notice: before dialog gets opened for the first time this node and
          the one bellow will not be rendered</span
        >
        <div>
          <strong>Extra content (Not rendered)</strong>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { ElMessageBox } from "element-plus";

export default defineComponent({
  setup() {
    const dialogVisible = ref(false);

    const handleClose = (done) => {
      ElMessageBox.confirm("Are you sure to close this dialog?")
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    return {
      dialogVisible,
      handleClose,
    };
  },
});
</script>