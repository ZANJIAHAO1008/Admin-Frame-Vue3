<template>
  <el-card shadow="always" :body-style="{ padding: '30px' }">
    <template #header>
      <div class="card-header">
        无限滚动列表
      </div>
    </template>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
      <li v-for="i in count" :key="i" class="infinite-list-item">
        {{ `我是第${i}` }}
      </li>
    </ul>
  </el-card>
</template>

<script lang="ts" setup name="AdminInfiniteScroll">
import { ref } from "vue";
const count = ref(0);
const load = () => {
  count.value += 1;
}
</script>

<style>
.infinite-list {
  height: calc(100vh - 300px);
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
  margin-top: 10px;
}
</style>
