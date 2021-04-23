const state = {
    user: {},
    token: ""
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    }
}

const actions = {}

export default {
    namespaced: true,//用于全局引用此文件的方法时标识这一个的文件名，解决命名冲突
    state,
    mutations,
    actions
}