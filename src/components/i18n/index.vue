<template>
  <div>
    <el-space direction="vertical">
      <el-card class="box-card" style="width: 60vw">
        <template #header>
          <div class="card-header">
            <span>{{ t("message.introduce.i18n") }}</span>
          </div>
        </template>
        <div class="text item">
          <el-radio v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" v-model="state.chooseI18n"
            :label="locale" @change="changLang">{{ $filters.inspectLanguage(locale) }}</el-radio>
        </div>
      </el-card>
    </el-space>
  </div>
</template>
<script setup lang="ts" name="AdminI18n">
import { watch, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import Cookies from "js-cookie";
import $filters from "@/filters/index";
import { useConfigStore } from "@/pinia/modules/config";
const configStore = useConfigStore();
const { t, locale: language } = useI18n();

const state = reactive({
  chooseI18n: "",
});

watch(
  () => language.value,
  (val) => {
    state.chooseI18n = val;
  }
);

const getDefaultLang = () => {
  //获取本地默认语言
  state.chooseI18n = language.value;
}

const changLang = (lang: any) => {
  Cookies.set("lang", lang); //存储国际化
  language.value = lang; //更新i18n配置
  configStore.$patch({
    language: lang
  })
}

getDefaultLang();
</script>
