<template>
    <el-drawer :model-value="configVisible" size="400px" title="应用配置" direction="rtl" :before-close="handleClose">
        <div class="appConfig">
            <!-- <div>
                <el-divider>
                    主题配置
                </el-divider>
                <ul class="config-list">
                    <li style="justify-content: center;">
                        <el-switch @change="(() => {
                            toggleDark()
                        })" active-color="#000000" v-model="configStore.isDark" size="small" active-text="黑夜模式"
                            inactive-text="白昼模式" />
                    </li>
                </ul>
            </div> -->
            <div>
                <el-divider>
                    导航栏
                </el-divider>
                <ul class="config-list">
                    <li>
                        <label>面包屑</label>
                        <el-switch @change="((e: any) => {
                            configStore.handleShowAppConfig('showBreadcrumb', e)
                        })" inactive-color="#A8ABB2" v-model="configStore.appConfig.showBreadcrumb" inline-prompt
                            active-text="开" inactive-text="关" />
                    </li>
                    <li>
                        <label>刷新按钮</label>
                        <el-switch @change="((e: any) => {
                            configStore.handleShowAppConfig('showReFresh', e)
                        })" inactive-color="#A8ABB2" v-model="configStore.appConfig.showReFresh" inline-prompt
                            active-text="开" inactive-text="关" />
                    </li>
                    <li>
                        <label>折叠按钮</label>
                        <el-switch @change="((e: any) => {
                            configStore.handleShowAppConfig('showFoldButton', e)
                        })" inactive-color="#A8ABB2" v-model="configStore.appConfig.showFoldButton" inline-prompt
                            active-text="开" inactive-text="关" />
                    </li>
                    <li>
                        <label>国际化</label>
                        <el-switch @change="((e: any) => {
                            configStore.handleShowAppConfig('showI18n', e)
                        })" inactive-color="#A8ABB2" v-model="configStore.appConfig.showI18n" inline-prompt
                            active-text="开" inactive-text="关" />
                    </li>
                    <li>
                        <label>消息</label>
                        <el-switch @change="((e: any) => {
                            configStore.handleShowAppConfig('showMessage', e)
                        })" inactive-color="#A8ABB2" v-model="configStore.appConfig.showMessage" inline-prompt
                            active-text="开" inactive-text="关" />
                    </li>
                    <li>
                        <label>全屏</label>
                        <el-switch @change="((e: any) => {
                            configStore.handleShowAppConfig('showFullScreen', e)
                        })" inactive-color="#A8ABB2" v-model="configStore.appConfig.showFullScreen" inline-prompt
                            active-text="开" inactive-text="关" />
                    </li>
                    <li>
                        <label>logo</label>
                        <el-switch @change="((e: any) => {
                            configStore.handleShowAppConfig('showLogo', e)
                        })" inactive-color="#A8ABB2" v-model="configStore.appConfig.showLogo" inline-prompt
                            active-text="开" inactive-text="关" />
                    </li>
                </ul>
            </div>
            <div>
                <el-divider>
                    标签栏
                </el-divider>
                <ul class="config-list">
                    <li>
                        <label>是否启用</label>
                        <el-switch @change="((e: any) => {
                            configStore.handleShowAppConfig('showTabBar', e)
                        })" inactive-color="#A8ABB2" v-model="configStore.appConfig.showTabBar" inline-prompt
                            active-text="开" inactive-text="关" />
                    </li>
                </ul>
            </div>
            <div>
                <el-divider>
                    其他
                </el-divider>
                <ul class="config-list">
                    <li>
                        <label>组件尺寸</label>
                        <el-radio-group @change="((e: any) => {
                            configStore.$patch({
                                componentSize: e
                            })
                        })" size="default" v-bind:model-value="configStore.componentSize">
                            <el-radio-button :label="item.value" v-for="(item, index) in Component_Size" :key="index">
                                {{ item.label }}</el-radio-button>
                        </el-radio-group>
                    </li>
                </ul>
            </div>
        </div>
    </el-drawer>
</template>
<script setup lang="ts" name="AdminAppConfig">
import { useConfigStore } from "@/pinia/modules/config";
import { Component_Size } from "@/assets/js/dictionarie";
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
const configStore = useConfigStore();
withDefaults(
    defineProps<{
        configVisible: boolean;
    }>(),
    {
        configVisible: false
    }
);

const emits = defineEmits<{
    (
        e: "update:configVisible",
        target: boolean
    ): void;
}>()

const handleClose = () => {
    //关闭设置
    emits("update:configVisible", false)
}
</script>
<style lang="scss" scoped>
.appConfig {
    .config-list {
        list-style: none;
        padding: 12px 0;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2px 8px;

            label {
                font-size: 15px;
            }
        }

        li:hover {
            background: #E6E8EB;
        }
    }
}
</style>