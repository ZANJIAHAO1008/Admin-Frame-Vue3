import { createI18n } from 'vue-i18n'
import Cookies from "js-cookie";
import en from './en.js'
import cn from './zh-cn.js'
// $t('message.public.editLang') 页面中使用
const messages = {
    en: {
        message: {
            ...en
        },
    },
    zh: {
        message: {
            ...cn
        },
    },
}
export const i18n = createI18n({
    locale: Cookies.get('lang') || "zh",
    globalInjection: true,
    fallbackLocale: 'zh',
    messages
});


export function useI18n(app) {
    app.use(i18n);
};


