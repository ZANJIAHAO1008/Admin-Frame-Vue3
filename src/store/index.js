import {createStore} from 'vuex'

export default createStore({
    state: {
        tagsList: [],
        collapse: false
    },
    mutations: {
        // 侧边栏折叠
        switchCollapse(state, data) {
            state.collapse = data;
        }
    },
    actions: {},
    modules: {}
})