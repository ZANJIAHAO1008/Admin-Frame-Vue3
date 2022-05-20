<template>
    <el-drawer :model-value="configVisible" size="400px" title="应用配置" direction="rtl" :before-close="handleClose">
        <div class="appConfig">
            <div>
                <el-divider>
                    主题配置
                </el-divider>
                <ul class="config-list">
                    <li>
                        <label>暗黑模式</label>
                        <el-switch size="default" @change="(() => {
                            toggleDark()
                        })" inactive-color="#A8ABB2" v-model="configStore.isDark" inline-prompt :active-icon="Moon"
                            :inactive-icon="Sunny" />
                    </li>
                    <li>
                        <label>灰色模式</label>
                        <el-switch size="default"  inactive-color="#A8ABB2"
                            v-model="configStore.isGrayscale" inline-prompt active-text="开" inactive-text="关" />
                    </li>
                </ul>
            </div>
            <div>
                <el-divider>
                    导航栏
                </el-divider>
                <ul class="config-list">
                    <li>
                        <label>面包屑</label>
                        <el-switch size="default" @change="((e: unknown) => {
                            if (typeof e === 'boolean') {
                                configStore.handleShowAppConfig('showBreadcrumb', e)
                            }
                        })" inactive-color="#A8ABB2" v-model="configStore.appConfig.showBreadcrumb" inline-prompt
                            active-text="开" inactive-text="关" />
                    </li>
                    <li>
                        <label>刷新按钮</label>
                        <el-switch size="default" @change="((e: unknown) => {
                            if (typeof e === 'boolean') {
                                configStore.handleShowAppConfig('showReFresh', e)
                            }
                        })" inactive-color="#A8ABB2" v-model="configStore.appConfig.showReFresh" inline-prompt
                            active-text="开" inactive-text="关" />
                    </li>
                    <li>
                        <label>折叠按钮</label>
                        <el-switch size="default" @change="((e: unknown) => {
                            if (typeof e === 'boolean') {
                                configStore.handleShowAppConfig('showFoldButton', e)
                            }
                        })" inactive-color="#A8ABB2" v-model="configStore.appConfig.showFoldButton" inline-prompt
                            active-text="开" inactive-text="关" />
                    </li>
                    <li>
                        <label>国际化</label>
                        <el-switch size="default" @change="((e: unknown) => {
                            if (typeof e === 'boolean') {
                                configStore.handleShowAppConfig('showI18n', e)
                            }
                        })" inactive-color="#A8ABB2" v-model="configStore.appConfig.showI18n" inline-prompt
                            active-text="开" inactive-text="关" />
                    </li>
                    <li>
                        <label>消息</label>
                        <el-switch size="default" @change="((e: unknown) => {
                            if (typeof e === 'boolean') {
                                configStore.handleShowAppConfig('showMessage', e)
                            }
                        })" inactive-color="#A8ABB2" v-model="configStore.appConfig.showMessage" inline-prompt
                            active-text="开" inactive-text="关" />
                    </li>
                    <li>
                        <label>全屏</label>
                        <el-switch size="default" @change="((e: unknown) => {
                            if (typeof e === 'boolean') {
                                configStore.handleShowAppConfig('showFullScreen', e)
                            }
                        })" inactive-color="#A8ABB2" v-model="configStore.appConfig.showFullScreen" inline-prompt
                            active-text="开" inactive-text="关" />
                    </li>
                    <li>
                        <label>logo</label>
                        <el-switch size="default" @change="((e: unknown) => {
                            if (typeof e === 'boolean') {
                                configStore.handleShowAppConfig('showLogo', e)
                            }
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
                        <el-switch size="default" @change="((e: unknown) => {
                            if (typeof e === 'boolean') {
                                configStore.handleShowAppConfig('showTabBar', e)
                            }
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
                    <li>
                        <label>页面最大缓存实例数</label>

                        <el-input-number size="default" v-model="configStore.KeepAliveMaxLength" :min="1" :max="10"
                            @change="((e: unknown) => {
                                if (typeof e === 'number') {
                                    configStore.$patch({
                                        KeepAliveMaxLength: e
                                    })
                                }
                            })" />
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
import { Moon, Sunny } from '@element-plus/icons-vue'
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
            margin-bottom: 4px;

            label {
                font-size: 15px;
            }
        }
    }
}
</style>