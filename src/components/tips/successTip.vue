<template>
  <el-card shadow="never" :body-style="{ padding: '30px' }">
      <template #header>
        <div class="card-header">
          成功提示
        </div>
      </template>
    <el-result icon="success" title="提交成功">
      <template #extra>
        <div class="bg-default p-default min-w600">
          <div>提交后会在3个工作日里，将结果发送到您的手机。</div>
        </div>
        <div class="m-t8">
          <el-button type="primary">返回</el-button>
        </div>
      </template>
    </el-result>
  </el-card>
</template>
<script lang="ts" setup name="AdminSuccess"></script>
