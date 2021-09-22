import {createI18n} from 'vue-i18n'
import Cookies from "js-cookie";
import enLocale from 'element-plus/es/locale/lang/en'
import zhLocale from 'element-plus/es/locale/lang/zh-cn'
import en from './en.js'
import cn from './zh-cn.js'
// $t('message.public.editLang') 页面中使用
const messages = {
    [enLocale.name]: {
        // el 这个属性很关键，一定要保证有这个属性，
        el: enLocale.el,
        // 定义你自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
        message: {
            ...en
        },
    },
    [zhLocale.name]: {
        el: zhLocale.el,
        // 定义你自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
        message: {
            ...cn
        },
    },
    testLocale: {
        el: {},
        // 没有定义 message 字段，会 fallback 回到 en 去, fallbackLocale 的定义在下方 👇
    },
}
const i18n = createI18n({
    // locale: Cookies.get('lang') || 'zh-cn',
    locale: zhLocale.name,
    fallbackLocale: enLocale.name,
    messages
})

export default i18n
