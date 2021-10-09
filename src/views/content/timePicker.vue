<template>
  <el-space direction="vertical">
    <el-card class="box-card" style="width: 60vw">
      <template #header>
        <div class="card-header">
          <span>基础时间选择</span>
        </div>
      </template>
      <div class="text item">
        <el-time-picker
          v-model="value"
          :disabled-hours="disabledHours"
          :disabled-minutes="disabledMinutes"
          :disabled-seconds="disabledSeconds"
          placeholder="请选择"
        >
        </el-time-picker>
      </div>
    </el-card>

    <el-card class="box-card m-t8" style="width: 60vw">
      <template #header>
        <div class="card-header">
          <span>任意时间范围</span>
        </div>
      </template>
      <div class="text item">
        <el-time-picker
          v-model="value1"
          is-range
          range-separator=" - "
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-time-picker>
      </div>
    </el-card>

    <el-card class="box-card m-t8" style="width: 60vw">
      <template #header>
        <div class="card-header">
          <span>时间计算</span>
        </div>
      </template>
      <div class="text item">
        <div class="m-t8">
          <span>选择时间：</span>
          <el-time-picker
            v-model="value2"
            :disabled-hours="disabledHours"
            :disabled-minutes="disabledMinutes"
            :disabled-seconds="disabledSeconds"
            placeholder="请选择"
          >
          </el-time-picker>
        </div>

        <div class="m-t8">
          <span>添加时间：</span>
          <el-time-picker
            v-model="value3"
            :disabled-hours="disabledHours"
            :disabled-minutes="disabledMinutes"
            :disabled-seconds="disabledSeconds"
            placeholder="请选择"
          >
          </el-time-picker>
        </div>

        <div class="m-t8">
          <span>结果时间：</span>
          <span style="font-size: 18px">{{ time ? time : "暂无数据" }}</span>
        </div>

        <el-button type="primary" @click="calculation">计算</el-button>
      </div>
    </el-card>
  </el-space>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      value: "",
      value1: [],
      value2: "",
      value3: "",
      time: "",
    });

    const calculation = () => {
      //时间计算
      let curTime = new Date(state.value2); //初始
      let addTime = new Date(state.value3); //添加时间
      state.time = new Date(curTime.setHours(addTime.getHours() + curTime.getHours()));
    };
    return {
      ...toRefs(state),
      calculation,
    };
  },
});
</script>
