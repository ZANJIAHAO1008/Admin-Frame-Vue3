<template>
  <div class="messageCenter">
    <div class="container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
          <el-table :data="unread" :show-header="false" style="width: 100%">
            <el-table-column>
              <template #default="scope">
                <span class="message-title">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" width="180"></el-table-column>
            <el-table-column width="120">
              <template #default="scope">
                <el-button size="small" @click="handleRead(scope.$index)"
                  >标为已读</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="primary">全部标为已读</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`已读消息(${read.length})`" name="second">
          <template v-if="message === 'second'">
            <el-table :data="read" :show-header="false" style="width: 100%">
              <el-table-column>
                <template #default="scope">
                  <span class="message-title">{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="150"></el-table-column>
              <el-table-column width="120">
                <template #default="scope">
                  <el-button type="danger" @click="handleDel(scope.$index)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="danger">删除全部</el-button>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
          <template v-if="message === 'third'">
            <el-table :data="recycle" :show-header="false" style="width: 100%">
              <el-table-column>
                <template #default="scope">
                  <span class="message-title">{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="150"></el-table-column>
              <el-table-column width="120">
                <template #default="scope">
                  <el-button @click="handleRestore(scope.$index)"
                    >还原</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="danger">清空回收站</el-button>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  toRefs,
  reactive,
  ref,
  computed,
  watchEffect,
  watch,
} from "vue";
export default defineComponent({
  name: "messageCenter",
  setup() {
    const state = reactive({
      message: "first",
      showHeader: false,
      unread: [
        {
          date: new Date(),
          title: "福建本土新增明显下降",
        },
        {
          date: new Date(),
          title: "哈尔滨市新增3例核酸初筛阳性人员",
        },
        {
          date: new Date(),
          title: "BOSS血掉的有点快",
        },
      ],
      read: [
        {
          date: new Date(),
          title: "拜登宣称美国不寻求新冷战",
        },
      ],
      recycle: [
        {
          date: new Date(),
          title: "江苏省委政法委原书记王立科被双开",
        },
      ],
      unreadNum: computed(() => state.unread.length),
    });

    const handleRead = (index) => {
      const item = state.unread.splice(index, 1);
      state.read = item.concat(state.read);
    };
    const handleDel = (index) => {
      const item = state.read.splice(index, 1);
      state.recycle = item.concat(state.recycle);
    };
    const handleRestore = (index) => {
      const item = state.recycle.splice(index, 1);
      state.read = item.concat(state.read);
    };

    return {
      ...toRefs(state),
      handleRead,
      handleDel,
      handleRestore,
    };
  },
});
</script>
<style lang="scss" scoped>
.messageCenter {
  .message-title {
    cursor: pointer;
  }

  .handle-row {
    margin-top: 30px;
  }
}
</style>
