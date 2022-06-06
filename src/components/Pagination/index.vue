<template>
  <el-pagination v-model:currentPage="pagination.page" v-model:page-size="pagination.pageSize" :background="!isMobile"
    :page-sizes="[10, 20, 100, 200]" :layout="isMobile?MobileLayout:DeskLayout" :total="pagination.total"
    @size-change="sizeChange" @current-change="currentChange" class="pagination-location" />
</template>

<script setup lang="ts" name="AdminPagination">
import { PaginationState } from "@/types";
import { useMobile } from '@/common/mobile';
import { useConfigStore } from "@/pinia/modules/config";
import { useTagStore } from "@/pinia/modules/tag";
const configStore = useConfigStore();
const tagStore = useTagStore();
const { isMobile } = useMobile(configStore, tagStore);
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

const DeskLayout = 'sizes,prev, pager, next, jumper,total';

const MobileLayout = 'prev, pager, next';

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
.pagination-location {
  display: flex;
  justify-content: right;
  padding-top: 15px;
}
</style>
