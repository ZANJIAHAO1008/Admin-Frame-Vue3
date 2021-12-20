import { i18n } from '../../locales/i18n'; //国际化
const { global: { t, tm, locale } } = i18n;
export default [
    //资源信息
    {
        resourceName: 'message.resource.homePage.name',
        resourceUrl: "/homePage",
        resourceIcon: 'fa fa-tachometer',
        children: []
    },
    {
        resourceName: "message.resource.function.name",
        resourceUrl: "/gongneng",
        resourceIcon: 'fa fa-wrench',
        children: [
            {
                resourceName: "message.resource.function.chlidren.dialogDrag",
                resourceUrl: "/dialogDrag",
                children: []
            },
            {
                resourceName: "message.resource.function.chlidren.wartermark",
                resourceUrl: "/wartermark",
                children: []
            },
            {
                resourceName: "message.resource.function.chlidren.timePicker",
                resourceUrl: "/timePicker",
                children: []
            },
            {
                resourceName: "message.resource.function.chlidren.map",
                resourceUrl: "/map",
                children: []
            },
            {
                resourceName: "message.resource.function.chlidren.copy",
                resourceUrl: "/copy",
                children: []
            },
            {
                resourceName: "message.resource.function.chlidren.qrcode",
                resourceUrl: "/qrcode",
                children: []
            },
            {
                resourceName: "message.resource.function.chlidren.infiniteScroll",
                resourceUrl: "/infiniteScroll",
                children: []
            },
            {
                resourceName: "message.resource.function.chlidren.computerMonitor",
                resourceUrl: "/computerMonitor",
                children: []
            },
        ]
    },
    {
        resourceName: "message.resource.template.name",
        resourceUrl: "/content",
        resourceIcon: "fa fa-file-text",
        children: [
            {
                resourceName: "message.resource.template.chlidren.easyForm",
                resourceUrl: "/easyForm",
                children: []
            },
            {
                resourceName: "message.resource.template.chlidren.tableOperation",
                resourceUrl: "/tableOperation",
                children: []
            },
            {
                resourceName: "message.resource.template.chlidren.cardList",
                resourceUrl: "/cardList",
                children: []
            },
        ]
    },
    {
        resourceName: "message.resource.editor.name",
        resourceUrl: "/editor",
        resourceIcon: "fa fa-bold",
        children: [
            {
                resourceName: "message.resource.editor.chlidren.markdown",
                resourceUrl: "/markdown",
                children: []
            },
            {
                resourceName: "message.resource.editor.chlidren.textEditor",
                resourceUrl: "/textEditor",
                children: []
            },
        ]
    },
    {
        resourceName: "message.resource.result.name",
        resourceUrl: "/result",
        resourceIcon: "fa fa-random",
        children: [
            {
                resourceName: "message.resource.result.chlidren.successTip",
                resourceUrl: "/successTip",
                children: []
            }, {
                resourceName: "message.resource.result.chlidren.warningTip",
                resourceUrl: "/warningTip",
                children: []
            },
            {
                resourceName: "message.resource.result.chlidren.errorTip",
                resourceUrl: "/errorTip",
                children: []
            },
        ]
    },
    {
        resourceName: "message.resource.abnormalPage.name",
        resourceUrl: "/error",
        resourceIcon: "fa fa-exclamation-triangle",
        children: [{
            resourceName: "message.resource.abnormalPage.children.404",
            resourceUrl: "/404",
            children: []
        },
        {
            resourceName: "message.resource.abnormalPage.children.403",
            resourceUrl: "/403",
            children: []
        },
        {
            resourceName: "message.resource.abnormalPage.children.noData",
            resourceUrl: "/noData",
            children: []
        },
        {
            resourceName: "message.resource.abnormalPage.children.build",
            resourceUrl: "/build",
            children: []
        },
        {
            resourceName: "message.resource.abnormalPage.children.networkError",
            resourceUrl: "/networkError",
            children: []
        },
        ]
    },
    {
        resourceName: "message.resource.workflow.name",
        resourceUrl: "/workflow",
        resourceIcon: 'fa fa-crosshairs',
        children: []
    },
    {
        resourceName: "message.resource.message.name",
        resourceUrl: "/messageManagement",
        resourceIcon: "fa fa-comment",
        children: [
            {
                resourceName: "message.resource.message.children.messageCenter",
                resourceUrl: "/messageCenter",
                children: []
            }
        ]
    },
    {
        resourceName: "message.resource.authority.name",
        resourceUrl: "/setting",
        resourceIcon: "fa fa-cog",
        children: [
            {
                resourceName: "message.resource.authority.children.user",
                resourceUrl: "/user",
                children: []
            },
            {
                resourceName: "message.resource.authority.children.role",
                resourceUrl: "/role",
                children: []
            },
            {
                resourceName: "message.resource.authority.children.resource",
                resourceUrl: "/resource",
                children: []
            },
        ]
    },
    {
        resourceName: "message.resource.noviceGuide.name",
        resourceUrl: "/noviceGuide",
        resourceIcon: 'fa fa-question-circle-o',
        children: []
    },
    {
        resourceName: "message.resource.i18n.name",
        resourceUrl: "/i18n",
        resourceIcon: 'fa fa-language',
        children: []
    },
]