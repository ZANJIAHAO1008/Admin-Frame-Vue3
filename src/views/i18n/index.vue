<template>
    <div>
        <el-space direction="vertical">
            <el-card class="box-card" style="width: 60vw">
                <template #header>
                    <div class="card-header">
                        <span>{{ transitionLocal('message.introduce.i18n') }}</span>
                    </div>
                </template>
                <div class="text item">
                    <el-radio
                        @change="changLang"
                        border
                        v-model="choose"
                        :label="locale"
                        v-for="locale in $i18n.availableLocales"
                        :key="`locale-${locale}`"
                    >{{ $filters.langFilter(locale) }}</el-radio>
                </div>
            </el-card>
        </el-space>
    </div>
</template>
<script>
import { defineComponent, reactive, toRefs, getCurrentInstance, onMounted, watch } from 'vue'
import { useI18n } from "vue-i18n";
import Cookies from "js-cookie";
import { transitionLocal } from '../../locales/i18n'
export default defineComponent({
    setup() {
        const { t, locale: language } = useI18n();
        const state = reactive({
            choose: ""
        });

        watch(() => language.value, (val) => {
            state.choose = val;
        });

        const getDefaultLang = () => {
            //获取本地默认语言
            state.choose =language.value;
        };

        const changLang = (lang) => {
            Cookies.set("lang", lang); //存储国际化
            language.value = lang; //更新i18n配置
        };

        onMounted(() => {
            getDefaultLang();
        })



        return {
            ...toRefs(state),
            changLang,
            transitionLocal
        }
    },
})
</script>
