<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '30px' }">
      <template #header>
        <div class="card-header">
          可拖拽弹框
        </div>
      </template>
      <el-button type="primary" @click="dialogVisible = true">点击打开可拖拽弹框</el-button>
      <el-dialog v-model="dialogVisible" draggable title="可拖拽弹框" width="30%" center>
        <span>可以尝试拖拽我</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="AdminDialogDrag">
import { ref } from "vue";

const dialogVisible = ref<boolean>(false);

// const handleClose = (done: () => void) => {
//   done();
// };
</script>
