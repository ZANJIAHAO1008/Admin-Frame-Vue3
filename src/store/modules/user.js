export default {
    state: {
        user: {}, //用户信息
        resourceList: [  //资源信息
            {
                resourceName: '首页',
                resourceUrl: "/homePage",
                resourceIcon: 'fa fa-tachometer',
                children: []
            },
            {
                resourceName: "内容管理",
                resourceUrl: "/content",
                resourceIcon: "fa fa-file-text",
                children: [
                    {
                        resourceName: "表格增删改查",
                        resourceUrl: "/table",
                        children: []
                    },
                    {
                        resourceName: '富文本编辑器',
                        resourceUrl: "/wangeditor",
                        children: []
                    },
                ]
            },
            {
                resourceName: "消息管理",
                resourceUrl: "/messageCenter",
                resourceIcon: "fa fa-comment",
                children: [
                    {
                        resourceName: "消息中心",
                        resourceUrl: "/messageCenter",
                        children: []
                    }
                ]
            },
            {
                resourceName: "异常页面",
                resourceUrl: "",
                resourceIcon: "fa fa-exclamation-triangle",
                children: [{
                    resourceName: "404",
                    resourceUrl: "/404",
                    children: []
                },
                {
                    resourceName: "403",
                    resourceUrl: "/403",
                    children: []
                },]
            },
            {
                resourceName: "权限管理",
                resourceUrl: "/setting",
                resourceIcon: "fa fa-cog",
                children: [
                    {
                        resourceName: "用户管理",
                        resourceUrl: "/user",
                        children: []
                    },
                    {
                        resourceName: "角色管理",
                        resourceUrl: "/role",
                        children: []
                    },
                    {
                        resourceName: "资源管理",
                        resourceUrl: "/resource",
                        children: []
                    },
                ]
            },
        ]
    },
    mutations: {
        //存储用户信息
        SET_USER_INFO(state, data) {
            state.user = data;
        }
    },
    actions: {},
}