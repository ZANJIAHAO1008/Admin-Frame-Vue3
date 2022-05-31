<template>
  <el-dialog :before-close="close" :model-value="versionVisible" :title="`版本日志（${siteName} 版权所有）`" width="900px">
    <ul class="v-log-content">
      <li v-for="(item, index) in versionInfo" :key="item.version">
        <div class="v-log-nav df-c">
          <div class="df-c">
            <el-tag v-if="!index" effect="dark" size="small">NEW</el-tag>
            <span class="v-n-title" :style="{
              paddingLeft: index ? '50px' : '4px',
            }">{{ item.version }}</span>
          </div>
          <span class="v-n-date">{{ item.releaseDate }}</span>
        </div>
        <ul class="v-log-body">
          <li v-for="(it, idx) in item.description" :key="idx">
            {{ idx + 1 + "、" + it }}
          </li>
        </ul>
      </li>
    </ul>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary"  @click="close">返 回</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts" name="AdminVersionLog">
import { computed } from "vue";
import { versionLog } from "@/assets/js/versionLog";
import { siteName } from "@/router/middleware";

withDefaults(
  defineProps<{
    versionVisible: boolean;
  }>(),
  {
    versionVisible: false, //打开版本信息
  }
);

const emits = defineEmits<{
  (e: "update:versionVisible", versionVisible: boolean): void;
}>();

const versionInfo = computed(() => versionLog);

const close = () => {
  //关闭
  emits("update:versionVisible", false);
}
</script>
<style lang="scss" scoped>
.v-log-content {
  list-style: none;
  padding: 0 12px;
  overflow: auto;

  .v-log-nav {
    justify-content: space-between;

    .v-n-title {
      font-size: 18px;
    }

    .v-n-date {
      font-size: 14px;
      color: #A8ABB2;
    }
  }

  .v-log-body {
    list-style: none;
    padding: 12px 8px;

    li {
      font-size: 14px;
      padding-bottom: 6px;
    }
  }
}
</style>
