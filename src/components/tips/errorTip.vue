<template>
  <el-card shadow="always" :body-style="{ padding: '30px' }">
    <template #header>
      <div class="card-header">
        错误提示
      </div>
    </template>
    <el-result icon="error" title="提交失败">
      <template #extra>
        <div class="bg-default p-default min-w600">
          <div class="t-l">失败原因分析：</div>
          <div class="t-l m-t8">
            账号余额不足，
            <span style="color: #409eff; cursor: pointer">请充值</span>。
          </div>
        </div>
        <div class="m-t8">
          <el-button type="primary">返回</el-button>
          <el-button type="primary">重新再试</el-button>
        </div>
      </template>
    </el-result>
  </el-card>
</template>
<script lang="ts" setup name="AdminError"></script>
