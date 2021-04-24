import {createStore} from 'vuex'

export default createStore({
    state: {
        tagsList: [],
        collapse: false
    },
    mutations: {
        setTags(state, data) { //选中在tagsList添加菜单
            state.tagsList.push(data)
        },
        delTags(state, data) { //如果标签到10个再选择就将最初的删除
            state.tagsList.splice(data.index, 1);
        },
        // 侧边栏折叠
        switchCollapse(state, data) {
            state.collapse = data;
        }
    },
    actions: {},
    modules: {}
})