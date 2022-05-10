<template>
  <div class="thereIsNo">
    <el-result :image-size="400">
      <template #icon>
        <img class="abnormal-img" :src="getImage('404','svg')" />
      </template>
      <template #extra>
        <h2 class="abnormal-tip">很抱歉，您所访问的页面不存在</h2>
        <el-button plain @click="router.go(-1)"
          >返回</el-button
        >
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts" name="Admin404">
import { getImage } from '@/utils';
import { useRouter } from "vue-router";
const router = useRouter(); //路由
</script>
