<template>
  <div class="thereIsNo">
    <!--    <el-empty description="抱歉页面好像不存在哦~" :image-size="300"></el-empty>-->
    <el-result title="404" subTitle="抱歉，请求错误">
      <template #icon>
        <el-image
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-image>
      </template>
      <template #extra>
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </div>

</template>
