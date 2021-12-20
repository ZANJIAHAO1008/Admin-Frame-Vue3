const cn = {
    zanTitle: "名字",
    //公共
    public: {
        editLang: "中文切换成功",
        existence: "已经是中文了",
        loggedOut: '退出登陆',
        versionLog: '版本日志',
        basicInfo: "基本信息",
        changePassword: "修改密码",
        closeAll: "关闭全部",
        closeOther: '关闭其他',
        fullScreen: "全屏",
        messageCenter: "消息中心",
        languageSwitch: "语言选择",
    },
    introduce:{
        //基本介绍
        i18n:"基于i18n实现国际化配置，可配置任意语言。"
    },
    //资源
    resource: {
        homePage: {
            name: '首页'
        },
        function: {
            name: '功能',
            chlidren: {
                dialogDrag: '可拖拽弹框',
                wartermark: '添加水印',
                timePicker: '时间选择器',
                map: '地图',
                copy: '复制',
                qrcode: '生成二维码',
                infiniteScroll: '无限滚动',
                computerMonitor: '监测电脑信息',
            }
        },
        template: {
            name: '模板',
            chlidren: {
                easyForm: '基础表单',
                tableOperation: '表格操作',
                cardList: '卡片列表',
            }
        },
        editor: {
            name: '编辑器',
            chlidren: {
                markdown: 'markdown',
                textEditor: '富文本编辑器',
            }
        },
        result: {
            name: '返回结果',
            chlidren: {
                successTip: '成功',
                warningTip: '异常',
                errorTip: '异常',
            }
        },
        abnormalPage: {
            name: "异常页面",
            children: {
                '404': '404',
                '403': '403',
                noData: '暂无数据',
                build: '功能建设中',
                networkError: '网络不可用',
            }
        },
        workflow: {
            name: '工作流程'
        },
        authority: {
            name: '权限管理',
            children: {
                user: '用户管理',
                role: '角色管理',
                resource: '资源管理',
            }
        },
        message: {
            name: '消息管理',
            children: {
                messageCenter: '消息中心',
            }
        },
        noviceGuide: {
            name: '新手引导',
        },
        i18n: {
            name: '国际化',
        },
    }
}
export default cn;
