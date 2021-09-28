<template>
  <div class="thereIsNo">
    <el-result :image-size="400">
      <template #icon>
        <img
          class="abnormal-img min-w600 min-h500"
          src="/src/assets/image/403.svg"
          alt=""
        />
      </template>
      <template #extra>
        <h2 class="p-defult font-32">很抱歉，您暂无权限访问。</h2>
        <el-button
          size="medium"
          type="primary"
          plain
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

