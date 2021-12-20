//配置引导设置
const steps = [
    {
        element: '.noviceGuide',
        popover: {
            title: "Hello",
            description: "欢迎来到Admin-Frame的新手引导",
            position: "bottom"
        }
    },
    {
        element: '.zan-sidebar-nav',
        popover: {
            title: "介绍",
            description: "Admin-Frame是一款中/后台管理系统",
            position: "bottom"
        }
    },
    {
        element: '.fa-arrows-alt',
        popover: {
            title: "全屏",
            description: "打开全屏模式",
            position: "left"
        }
    },
    {
        element: '.g-language',
        popover: {
            title: "国际化",
            description: "点击切换语言",
            position: "left"
        }
    },
    {
        element: '.fa-bell-o',
        popover: {
            title: "消息中心",
            description: "点击查看消息中心",
            position: "left"
        }
    },
    {
        element: '.fabtn',
        popover: {
            title: "菜单开关",
            description: "控制菜单的显示/隐藏",
            position: "right"
        }
    },
    {
        element: '.el-menu',
        popover: {
            title: "快来试试吧~",
            description: "菜单中包含首页图、各种功能、页面模板、编辑器、返回结果、异常页面、消息中心、权限管理等... 详情请点击菜单查看",
            position: "right"
        }
    },
];

export default steps