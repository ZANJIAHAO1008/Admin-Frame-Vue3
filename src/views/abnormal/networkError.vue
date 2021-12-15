<template>
  <div class="thereIsNo">
    <el-result :image-size="400">
      <template #icon>
        <img class="abnormal-img" src="/src/assets/image/networkError.svg" alt />
      </template>
      <template #extra>
        <h2 class="abnormal-tip">网络不可用，请检查你的网络设置</h2>
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

