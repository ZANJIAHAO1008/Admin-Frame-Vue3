export default {
    state: {
        user: {}, //用户信息
    },
    mutations: {
        //存储用户信息
        SET_USER_INFO(state, data) {
            state.user = data;
        }
    },
    actions: {},
}