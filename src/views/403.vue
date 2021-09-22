<template>
  <div class="thereIsNo">
    <el-empty :image-size="500" description="您没有权限访问哦~">
      <el-button type="primary" @click="router.push({ path: '/homePage' })"
        >返回首页</el-button
      >
    </el-empty>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter(); //路由

    return {
      router,
    };
  },
});
</script>
