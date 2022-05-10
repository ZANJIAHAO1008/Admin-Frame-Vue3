<template>
   <el-card shadow="always" :body-style="{ padding: '30px' }">
      <template #header>
        <div class="card-header">
          异常提示
        </div>
      </template>
    <el-result icon="warning" title="提交异常">
      <template #extra>
        <div class="bg-default p-default min-w600">
          <div class="t-l">异常原因分析：</div>
          <div class="t-l m-t8">
            您的账号最近3日内交易过于频繁，请尽快
            <span style="color: #409eff; cursor: pointer">联系管理员</span>
            处理异常
          </div>
        </div>
        <div class="m-t8">
          <el-button type="primary">返回</el-button>
          <el-button type="primary">联系管理员</el-button>
        </div>
      </template>
    </el-result>
  </el-card>  
</template>
<script lang="ts" setup name="AdminWarning"></script>
