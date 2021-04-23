<template>
  <div class="tags">

  </div>
</template>
<script>
import {defineComponent, getCurrentInstance, toRefs, reactive, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
export default defineComponent({
  name: "tags",
  setup() {
    const route = useRoute(); //路由
    const state = reactive({
      tagList: [] //标签仓库
    });

    watch(()=>{ //监控路由走向 往标签仓库塞数据
      return route
    },(n,v)=>{
    console.log(n,v);
    })

    const setTags = (route)=>{
      // 设置标签


    }


    return {
      ...toRefs(state)
    }
  }
})
</script>
<style lang="less" scoped>
.tags {

}
</style>