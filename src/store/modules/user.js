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
                resourceName: '组件',
                resourceUrl: "/zujian",
                resourceIcon: 'fa fa-wrench',
                children: [
                    {
                        resourceName: "可拖拽弹框",
                        resourceUrl: "/dialogDrag",
                        children: []
                    },
                    {
                        resourceName: "添加水印",
                        resourceUrl: "/wartermark",
                        children: []
                    },
                    {
                        resourceName: "时间选择器",
                        resourceUrl: "/timePicker",
                        children: []
                    },
                    {
                        resourceName: "地图",
                        resourceUrl: "/map",
                        children: []
                    },
                ]
            },
            {
                resourceName: "表单模板",
                resourceUrl: "/content",
                resourceIcon: "fa fa-file-text",
                children: [
                    {
                        resourceName: "基础表单",
                        resourceUrl: "/easyForm",
                        children: []
                    },
                    {
                        resourceName: "表格表单",
                        resourceUrl: "/table",
                        children: []
                    },
                ]
            },
            {
                resourceName: '编辑器',
                resourceUrl: "/wangeditor",
                resourceIcon: "fa fa-bold",
                children: [
                    {
                        resourceName: 'markdown',
                        resourceUrl: "/markdown",
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
                resourceName: "返回结果",
                resourceUrl: "/result",
                resourceIcon: "fa fa-random",
                children: [
                    {
                        resourceName: "成功",
                        resourceUrl: "/successTip",
                        children: []
                    }, {
                        resourceName: "异常",
                        resourceUrl: "/warningTip",
                        children: []
                    },
                    {
                        resourceName: "失败",
                        resourceUrl: "/errorTip",
                        children: []
                    },
                ]
            },
            {
                resourceName: "异常页面",
                resourceUrl: "/error",
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
                },
                {
                    resourceName: "功能建设中",
                    resourceUrl: "/build",
                    children: []
                },
                ]
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