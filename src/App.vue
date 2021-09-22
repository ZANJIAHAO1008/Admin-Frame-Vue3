<template>
    <router-view/>
</template>
<script>
import * as echarts from 'echarts'
import {computed, getCurrentInstance, provide, watch} from 'vue'
import Cookies from "js-cookie";
import {
  defineComponent,
  toRefs,
  reactive,
} from "vue";

export default defineComponent({
  name: 'App',

  setup() {
    provide('echarts', echarts) //全局穿透Echarts
    const state = reactive({});

    return {
      ...toRefs(state)
    }
  },
})
</script>
<style lang="scss">
@import "./src/style/index.scss";
@import "./src/style/element-ui.scss";
</style>
