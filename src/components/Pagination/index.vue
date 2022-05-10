<template>
  <el-pagination v-model:currentPage="pagination.page" v-model:page-size="pagination.pageSize" background
    :page-sizes="[10, 20, 100, 200]" layout="sizes,prev, pager, next, jumper,total" :total="pagination.total"
    @size-change="sizeChange" @current-change="currentChange" class="p-location" />
</template>

<script setup lang="ts" name="AdminPagination">
import { PaginationState } from "@/types";

withDefaults(
  defineProps<{
    pagination: Partial<PaginationState>;
  }>(),
  {
    pagination: () => {
      return {
        page: 1,
        pageSize: 10,
        total: 100,
      };
    },
  }
);

const emits = defineEmits<{
  (
    e: "change",
    target: {
      page?: number;
      pageSize?: number;
    }
  ): void;
}>();

const currentChange = (page: number) => {
  //切换分页
  emits("change", {
    page,
  });
}

const sizeChange = (pageSize: number) => {
  //切换展现条数 回到第一页
  emits("change", { pageSize, page: 1 });
}
</script>
<style lang="scss" scoped>
.p-location {
  display: flex;
  justify-content: right;
}
</style>
