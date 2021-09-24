<template>
  <div>
    <el-result icon="warning" title="提交异常">
      <template #extra>
        <div class="bg-defult p-defult">
          <div class="t-l">异常原因分析：</div>
          <div class="t-l m-t8">
            您的账号最近3日内交易过于频繁，请尽快联系管理员处理异常
          </div>
        </div>
        <div class="m-t8">
          <el-button type="primary" size="medium">返回</el-button>
          <el-button type="primary" size="medium">联系管理员</el-button>
        </div>
      </template>
    </el-result>
  </div>
</template>