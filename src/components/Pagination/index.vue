<template>
  <el-pagination
    @current-change="currentChange"
    :current-page="pagination.currentPage"
    :page-sizes="[10]"
    :page-size="pagination.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pagination.total"
  ></el-pagination>
</template>
<script>
import { defineComponent, reactive, toRefs, watch, inject } from "vue";
export default defineComponent({
  setup(props, context) {
    const pagination = inject("pagination"); //接受

    const currentChange = (val) => {
      //切换分页
      context.emit("change", {
        pageSize: 10,
        page: val,
      });
    };

    return {
      pagination,
      currentChange,
    };
  },
});
</script>
