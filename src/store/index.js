import { createStore } from 'vuex'
import user from './modules/user';

export default createStore({
    state: {
        tagsList: [], //tag标签存储
        collapse: false, //侧边栏展开关闭
    },
    mutations: {
        setTags(state, data) { //选中在tagsList添加菜单
            state.tagsList.push(data)
        },
        delTags(state, data) { //如果标签到10个再选择就将最初的删除
            state.tagsList.splice(data.index, 1);
        },
        delRightMenu(state, data) {
            //关闭tag的右菜单 
            let tagList = [];
            state.tagsList.forEach((tags, index) => {
                if (data.whiteTags.includes(tags.path)) {
                    tagList.push(tags);
                }
            });
            state.tagsList = [...tagList];
        },
        // 侧边栏折叠
        switchCollapse(state, data) {
            state.collapse = data;
        },
    },
    actions: {},
    modules: {
        user: user,
    }
})
