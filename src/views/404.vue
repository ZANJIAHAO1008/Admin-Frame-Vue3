<template>
  <div class="thereIsNo">
    <!--    <el-empty description="抱歉页面好像不存在哦~" :image-size="300"></el-empty>-->
    <el-result :image-size="400" subTitle="很抱歉，您访问的页面去月球了~~">
      <template #icon>
        <el-image
          src="https://www.undi.cn/404/fresh-moon/picture/404.png"
        ></el-image>
      </template>
      <template #extra>
        <el-button
          size="medium"
          type="primary"
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
