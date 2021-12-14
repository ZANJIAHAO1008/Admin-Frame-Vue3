import {i18n} from '../../locales/i18n'; //国际化
const { global: { t, tm, locale } } = i18n;
export default [
    //资源信息
    {
        resourceName: `${t("message.resource.homePage.name")}`,
        resourceUrl: "/homePage",
        resourceIcon: 'fa fa-tachometer',
        children: []
    },
    {
        resourceName: `${t("message.resource.function.name")}`,
        resourceUrl: "/gongneng",
        resourceIcon: 'fa fa-wrench',
        children: [
            {
                resourceName: `${t("message.resource.function.chlidren.dialogDrag")}`,
                resourceUrl: "/dialogDrag",
                children: []
            },
            {
                resourceName: `${t("message.resource.function.chlidren.wartermark")}`,
                resourceUrl: "/wartermark",
                children: []
            },
            {
                resourceName: `${t("message.resource.function.chlidren.timePicker")}`,
                resourceUrl: "/timePicker",
                children: []
            },
            {
                resourceName: `${t("message.resource.function.chlidren.map")}`,
                resourceUrl: "/map",
                children: []
            },
            {
                resourceName: `${t("message.resource.function.chlidren.copy")}`,
                resourceUrl: "/copy",
                children: []
            },
            {
                resourceName: `${t("message.resource.function.chlidren.qrcode")}`,
                resourceUrl: "/qrcode",
                children: []
            },
            {
                resourceName: `${t("message.resource.function.chlidren.infiniteScroll")}`,
                resourceUrl: "/infiniteScroll",
                children: []
            },
            {
                resourceName: `${t("message.resource.function.chlidren.computerMonitor")}`,
                resourceUrl: "/computerMonitor",
                children: []
            },
        ]
    },
    {
        resourceName: `${t("message.resource.template.name")}`,
        resourceUrl: "/content",
        resourceIcon: "fa fa-file-text",
        children: [
            {
                resourceName: `${t("message.resource.template.chlidren.easyForm")}`,
                resourceUrl: "/easyForm",
                children: []
            },
            {
                resourceName: `${t("message.resource.template.chlidren.tableOperation")}`,
                resourceUrl: "/tableOperation",
                children: []
            },
            {
                resourceName: `${t("message.resource.template.chlidren.cardList")}`,
                resourceUrl: "/cardList",
                children: []
            },
        ]
    },
    {
        resourceName: `${t("message.resource.editor.name")}`,
        resourceUrl: "/editor",
        resourceIcon: "fa fa-bold",
        children: [
            {
                resourceName: `${t("message.resource.editor.chlidren.markdown")}`,
                resourceUrl: "/markdown",
                children: []
            },
            {
                resourceName: `${t("message.resource.editor.chlidren.textEditor")}`,
                resourceUrl: "/textEditor",
                children: []
            },
        ]
    },
    {
        resourceName: `${t("message.resource.result.name")}`,
        resourceUrl: "/result",
        resourceIcon: "fa fa-random",
        children: [
            {
                resourceName: `${t("message.resource.result.chlidren.successTip")}`,
                resourceUrl: "/successTip",
                children: []
            }, {
                resourceName: `${t("message.resource.result.chlidren.warningTip")}`,
                resourceUrl: "/warningTip",
                children: []
            },
            {
                resourceName: `${t("message.resource.result.chlidren.errorTip")}`,
                resourceUrl: "/errorTip",
                children: []
            },
        ]
    },
    {
        resourceName: `${t("message.resource.abnormalPage.name")}`,
        resourceUrl: "/error",
        resourceIcon: "fa fa-exclamation-triangle",
        children: [{
            resourceName:  `${t("message.resource.abnormalPage.children.404")}`,
            resourceUrl: "/404",
            children: []
        },
        {
            resourceName:  `${t("message.resource.abnormalPage.children.403")}`,
            resourceUrl: "/403",
            children: []
        },
        {
            resourceName:  `${t("message.resource.abnormalPage.children.noData")}`,
            resourceUrl: "/noData",
            children: []
        },
        {
            resourceName:  `${t("message.resource.abnormalPage.children.build")}`,
            resourceUrl: "/build",
            children: []
        },
        {
            resourceName:  `${t("message.resource.abnormalPage.children.networkError")}`,
            resourceUrl: "/networkError",
            children: []
        },
        ]
    },
    {
        resourceName: `${t("message.resource.workflow.name")}`,
        resourceUrl: "/workflow",
        resourceIcon: 'fa fa-crosshairs',
        children: []
    },
    {
        resourceName: `${t("message.resource.message.name")}`,
        resourceUrl: "/messageManagement",
        resourceIcon: "fa fa-comment",
        children: [
            {
                resourceName: `${t("message.resource.message.children.messageCenter")}`,
                resourceUrl: "/messageCenter",
                children: []
            }
        ]
    },
    {
        resourceName: `${t("message.resource.authority.name")}`,
        resourceUrl: "/setting",
        resourceIcon: "fa fa-cog",
        children: [
            {
                resourceName: `${t("message.resource.authority.children.user")}`,
                resourceUrl: "/user",
                children: []
            },
            {
                resourceName: `${t("message.resource.authority.children.role")}`,
                resourceUrl: "/role",
                children: []
            },
            {
                resourceName:  `${t("message.resource.authority.children.resource")}`,
                resourceUrl: "/resource",
                children: []
            },
        ]
    },
    {
        resourceName: `${t("message.resource.noviceGuide.name")}`,
        resourceUrl: "/noviceGuide",
        resourceIcon: 'fa fa-question-circle-o',
        children: []
    },
]