<template>
    <div class="workbench">
        <el-card shadow="never">
            <el-row :gutter="8" class="workbench-nav">
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-image style="width: 100%; height: 200px" :src="getImage('workbench', 'svg')" fit="fill" />
                </el-col>
                <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
                    <div class="image-space">
                        <strong class="workbench-nav-title">{{ hoursTip }}，欢迎使用{{ siteName }}，祝你开开心心每一天 !</strong>
                        <small class="workbench-nav-introduce">轻松创建、部署您的中后台系统、提升研发效率、降低业务成本。</small>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-row :gutter="8">
            <el-col :xs="24" :sm="18">
                <el-card class="box-card m-t8" shadow="never"
                    :body-style="{ padding: '35px 20px', textAlign: 'center' }">
                    <template #header>
                        <div class="card-header">
                            <i class="fa fa-th-large module-icon" aria-hidden="true"></i> 项目统计
                        </div>
                    </template>
                    <el-row :gutter="8" class="workbench-statistics">
                        <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                            <span class="workbench-statistics-label">项目总数</span>
                            <span class="workbench-statistics-value">5</span>
                        </el-col>
                        <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                            <el-badge type="info" :value="180">
                                <span class="workbench-statistics-label">待处理</span>
                            </el-badge>
                            <span class="workbench-statistics-value">180</span>
                        </el-col>
                        <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                            <el-badge type="success" :value="5400">
                                <span class="workbench-statistics-label">已处理</span>
                            </el-badge>
                            <span class="workbench-statistics-value">5400</span>
                        </el-col>
                        <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                            <el-badge type="danger" :value="118">
                                <span class="workbench-statistics-label">用户反馈</span>
                            </el-badge>
                            <span class="workbench-statistics-value">118</span>
                        </el-col>

                    </el-row>
                    <!-- <ul class="workbench-statistics">
                        <li>
                            <span class="workbench-statistics-label">项目总数</span>
                            <span class="workbench-statistics-value">5</span>
                        </li>
                        <li>
                            <el-badge type="info" :value="180">
                                <span class="workbench-statistics-label">待处理</span>
                            </el-badge>
                            <span class="workbench-statistics-value">180</span>
                        </li>
                        <li>
                            <el-badge type="success" :value="5400">
                                <span class="workbench-statistics-label">已处理</span>
                            </el-badge>
                            <span class="workbench-statistics-value">5400</span>
                        </li>
                        <li>
                            <el-badge type="danger" :value="118">
                                <span class="workbench-statistics-label">用户反馈</span>
                            </el-badge>
                            <span class="workbench-statistics-value">118</span>
                        </li>
                    </ul> -->
                </el-card>
                <el-card class="box-card m-t8" shadow="never" :body-style="{ padding: '15px 20px' }">
                    <template #header>
                        <div class="card-header">
                            <i class="fa fa-check-square-o module-icon" aria-hidden="true"></i> 待办事项
                        </div>
                    </template>
                    <el-table :data="taskData" style="width: 100%" height="255">
                        <el-table-column prop="taskName" label="任务名称" width="180" />
                        <el-table-column prop="name" label="发起人" width="180" />
                        <el-table-column prop="taskDetail" label="任务详情" />
                        <el-table-column label="操作" fixed="right" width="110">
                            <template #default>

                                    <el-button type="primary" text>详情</el-button>
                                    <br>
                                    <el-button type="warning" text>处理</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="6">
                <el-card class="box-card m-t8" shadow="never" :body-style="{ padding: '20px' }">
                    <template #header>
                        <div class="card-header">
                            <i class="fa fa-bars module-icon" aria-hidden="true"></i>快速导航 / 最近使用
                        </div>
                    </template>
                    <ul class="workbench-navigation">
                        <li v-for="item in QuickNavigation" :key="item.url" @click="$router.push(item.url)">
                            <i :class="item.icon" aria-hidden="true" :style="{ color: item.color }"></i>
                            <div>{{ item.name }}</div>
                        </li>
                    </ul>
                </el-card>
                <el-card class="box-card m-t8" shadow="never" :body-style="{ padding: '20px 20px 35px 20px' }">
                    <template #header>
                        <div class="card-header">
                            <i class="fa fa-question-circle module-icon" aria-hidden="true"></i>使用帮助
                        </div>
                    </template>
                    <div class="workbench-use-help">
                        <ul>
                            <li v-for="item in useHelpData" :key="item.url">
                                <el-link type="info" @click="toViewDocument(item.url)">{{ item.name }}</el-link>
                            </li>
                        </ul>
                        <div class="other-help">
                            <span class="other-help-label">其他</span>
                            <el-button type="primary" plain>新手引导</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>

        </el-row>
    </div>
</template>
<script setup lang="ts" name="AdminWorkbench">
import {
    getCurrentInstance,
    onMounted,
    ref,
} from "vue";
import { siteName } from "@/router/middleware";
import { getImage } from "@/utils";
import {
    useRoute,
} from "vue-router";
const { proxy } = <any>getCurrentInstance();
let hoursTip = ref<string>('');
const route = useRoute();
const QuickNavigation = [
    {
        name: "数据分析",
        url: "/dashboard/analysis",
        icon: "fa fa-area-chart",
        color: "#1890ff"
    },
    {
        name: "用户管理",
        url: "/setting/user",
        icon: "fa fa-cog",
        color: "#13c2c2"
    },
    {
        name: "表单",
        url: "/template/tableOperation",
        icon: "fa fa-file-text",
        color: "#722ed1"
    },
    {
        name: "工具",
        url: "/components/watermark",
        icon: "fa fa-wrench",
        color: "#1d39c4"
    },
    {
        name: "反馈中心",
        url: "/main/feedbackCenter",
        icon: "fa fa-comment",
        color: "#a0d911"
    },
    {
        name: "新手引导",
        url: "/main/noviceGuide",
        icon: "fa fa-question-circle-o",
        color: "#595959"
    },
];
const taskData = [
    {
        taskName: '办理入职',
        name: 'Tom',
        taskDetail: '带新人办理入职',
    },
    {
        taskName: '材料领取',
        name: 'Tom',
        taskDetail: '带新人领取入职材料',
    },
    {
        taskName: '办理出入证',
        name: 'Tom',
        taskDetail: '带新人办理出入证',
    },
]
const useHelpData = [
    {
        name: "Element-Plus的官方文档",
        url: "https://element-plus.org/zh-CN/guide/design.html"
    },
    {
        name: "Vue3的中文文档",
        url: "https://staging-cn.vuejs.org/?mode=light"
    },
    {
        name: "VueRouter的中文文档",
        url: "https://router.vuejs.org/zh/"
    },
    {
        name: "Pinia的中文文档",
        url: "https://pinia.web3doc.top/"
    },
]
onMounted(() => {
    accessTimeRange()
})
const accessTimeRange = () => {
    //获取时间范围
    let hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        hoursTip.value = '早上好';
    } else if (hour >= 12 && hour < 18) {
        hoursTip.value = '下午好';
    } else {
        hoursTip.value = '晚上好';
    }
}

const toViewDocument = (url: string) => {
    //打开文档
    window.open(url);
}


</script>
<style lang="scss" scoped>
.workbench {
    .module-icon {
        padding-right: 4px;
        font-size: 16px;
    }

    &-nav {
        border-radius: 4px;
        display: flex;
        align-items: center;

        .image-space {
            text-align: center;
        }

        .workbench-nav-title {
            font-size: 24px;
        }

        .workbench-nav-introduce {
            display: block;
            color: #808695;
            padding-top: 30px;
        }
    }

    &-statistics {
        &-label {
            font-size: 15px;
            display: block;
            color: var(--af-default-font-color);
            padding: 4px 5px;
        }

        &-value {
            display: block;
            padding-top: 10px;
            font-size: 25px;
            font-weight: bold;
            color: var(--af-default-font-color);
        }
    }

    &-navigation {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 12px 20px;
        list-style: none;

        li {
            cursor: pointer;
            text-align: center;
            border-radius: 3px;
            color: #606266;
            font-size: 14px;

            i {
                font-size: 22px;
                padding-bottom: 8px;
            }

            span {
                color: var(--af-default-font-color);
            }
        }

        li:hover {
            color: #409EFF;
        }
    }

    &-use-help {
        ul {
            list-style: none;

            li {
                margin-top: 10px;
            }
        }

        .other-help {
            border-top: 1px solid #e4e7ed;
            padding-top: 15px;
            margin-top: 20px;

            &-label {
                display: block;
                padding-bottom: 10px;
            }
        }
    }
}
</style>