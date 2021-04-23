<template>
  <el-container style="height: 100vh">
    <el-aside width="auto">
      <side-bar></side-bar>
    </el-aside>
    <el-container>
      <el-header height="70px">
        <Header></Header>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
import {defineComponent, toRefs, reactive, ref, computed, watchEffect, watch} from 'vue';
import SideBar from "../components/SideBar.vue";
import Header from "../components/Header.vue";
import {useStore} from "vuex";
export default defineComponent({
  name: 'home',
  components: {
    SideBar,
    Header
  },
  setup() {
    const store = useStore();
    const state = reactive({

    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
<style>
.el-header,.el-main {
  padding: 0;
}
.el-main {
  background-color: #E9EEF3;
}
</style>