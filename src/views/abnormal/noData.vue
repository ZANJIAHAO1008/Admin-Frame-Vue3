<template>
  <div class="thereIsNo">
    <el-result :image-size="400">
      <template #icon>
        <img
          class="abnormal-img"
          src="/src/assets/image/noData.svg"
          alt=""
        />
      </template>
      <template #extra>
        <h2 class="abnormal-tip">暂无数据</h2>
        <el-button
         type="text"
          @click="router.push({ path: '/homePage' })"
          >返回首页</el-button
        >
      </template>
    </el-result>
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

