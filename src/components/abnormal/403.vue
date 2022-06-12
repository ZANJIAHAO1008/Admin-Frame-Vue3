<template>
  <div class="thereIsNo">
    <el-result :image-size="400">
      <template #icon>
        <img class="abnormal-img" :src="getImage('403','svg')" />
      </template>
      <template #extra>
        <h2 class="abnormal-tip">很抱歉，您暂无权限访问</h2>
        <el-button size="default" type="primary" plain @click="router.go(-1)"
          >返 回</el-button
        >
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts" name="Admin403">
import { getImage } from '@/utils';
import { useRouter } from "vue-router";
const router = useRouter(); //路由
</script>
