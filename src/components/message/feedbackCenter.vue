<template>
    <div class="feedbackCenter">
        <el-card shadow="never" :body-style="{ padding: '30px 10px 15px 10px' }">
            <el-form :inline="true" :model="queryForm" label-position="right" label-width="84px">
                <el-form-item >
                    <el-input v-model.trim="queryForm.name" clearable placeholder="请输入反馈人姓名">
                    </el-input>
                </el-form-item>
                <el-form-item >
                    <el-input v-model.trim="queryForm.id" clearable placeholder="请输入人员ID">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button plain type="primary">查询</el-button>
                    <el-button plain type="primary">新增</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="never" :body-style="{ padding: '30px 10px 15px 10px' }" class="m-t8">
            <el-table :data="tableData" height="calc(100vh - 345px)" style="width: 100%">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="name" label="创建人"></el-table-column>
                <el-table-column prop="address" label="反馈问题"></el-table-column>
                <el-table-column label="操作" fixed="right" width="100">
                    <template #default="scope">
                       
                            <el-button text type="primary">详情</el-button>
                            <br>
                            <el-button text type="warning">处理</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <Pagination :pagination="pagination"></Pagination>
        </el-card>
    </div>
</template>
<script setup lang="ts" name="AdminFeedbackCenter">
import Pagination from "@/components/Pagination/index.vue";
let queryForm = ref({
    name: "",
    id: "",
});

let pagination = ref({
    total: 100,
    page: 1,
    pageSize: 10,
})

let tableData = ref([
    {
        id: "8008208828",
        name: "曹植饭",
        address: "图片无法上传",
    },
    {
        id: "8008208828",
        name: "曹植饭",
        address: "图片无法下载",
    },
    {
        id: "8008208828",
        name: "曹植饭",
        address: "偶先黑屏问题",
    }
])

</script>
<style lang="scss" scoped>
.feedbackCenter {}
</style>
