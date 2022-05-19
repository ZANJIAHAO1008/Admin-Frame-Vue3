<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '30px 10px 15px 10px' }" >
      <el-form
        label-position="right"
        label-width="84px"
        :inline="true"
        :model="state.queryParams"
        class="demo-form-inline"
      >
        <el-form-item label="用户姓名：">
          <el-input
            v-model.trim="state.queryParams.staffName"
            clearable
            placeholder="请输入姓名"
            @keyup.enter="getUsers"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="用户ID：">
          <el-input
            v-model.trim="state.queryParams.staffId"
            clearable
            placeholder="请输入ID"
            @keyup.enter="getUsers"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsers">查 询</el-button>
        </el-form-item>
      </el-form>
    </el-card>  
    <el-card shadow="never" :body-style="{ padding: '30px 10px 15px 10px' }" class="m-t16">
      <el-table
        :data="state.userList"
        height="calc(100vh - 345px)"
        style="width: 100%"
      >
        <el-table-column prop="staffName" label="用户姓名"></el-table-column>
        <el-table-column prop="staffId" label="用户ID"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template #default="scope">
            {{ $filters.Gender(scope.row.sex) }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="address" label="用户住址"></el-table-column>
        <el-table-column prop="createTime" label="注册时间"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-space spacer="|" style="color: #dedede">
              <el-button type="text" @click="baseInfoEdit(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="deleteUser(scope.row)"
                >删除</el-button
              >
            </el-space>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :pagination="state.pagination"
        @change="handleChangeCurrent"
      ></Pagination>
    </el-card>  
    <base-info ref="baseInfoRef" v-model:baseVisible="baseVisible"></base-info>
  </div>
</template>
<script lang="ts" setup name="AdminUser">
import { ref, reactive, onMounted } from "vue";
import { ElMessageBox } from "element-plus";
import baseInfo from "@/components/dropDownItem/baseInfo.vue";
import Pagination from "@/components/Pagination/index.vue";
import { PaginationState } from "@/types";
import $filters from "@/filters/index";
const baseInfoRef = ref();
const baseVisible = ref<boolean>(false);
const state = reactive({
  userList: [
    {
      staffName: "曹植饭",
      staffId: "8008208820",
      username: "user",
      sex: 0,
      phone: "8008208820",
      address: "南京市雨花台区宁双路19号云密城J栋6楼",
      createTime: new Date(),
    },
    {
      staffName: "曹植饭",
      staffId: "8008208820",
      username: "user",
      sex: 0,
      phone: "8008208820",
      address: "南京市雨花台区宁双路19号云密城J栋6楼",
      createTime: new Date(),
    },
    {
      staffName: "曹植饭",
      staffId: "8008208820",
      username: "user",
      sex: 0,
      phone: "8008208820",
      address: "南京市雨花台区宁双路19号云密城J栋6楼",
      createTime: new Date(),
    },
    {
      staffName: "曹植饭",
      staffId: "8008208820",
      username: "user",
      sex: 0,
      phone: "8008208820",
      address: "南京市雨花台区宁双路19号云密城J栋6楼",
      createTime: new Date(),
    },
    {
      staffName: "曹植饭",
      staffId: "8008208820",
      username: "user",
      sex: 0,
      phone: "8008208820",
      address: "南京市雨花台区宁双路19号云密城J栋6楼",
      createTime: new Date(),
    },
    {
      staffName: "曹植饭",
      staffId: "8008208820",
      username: "user",
      sex: 0,
      phone: "8008208820",
      address: "南京市雨花台区宁双路19号云密城J栋6楼",
      createTime: new Date(),
    },
  ], //存储用户信息
  queryParams: {
    staffName: "",
    staffId: "",
  },
  pagination: {
    total: 100,
    page: 1,
    pageSize: 10,
  },
});

const handleChangeCurrent = (val: Partial<PaginationState>) => {
  //分页操作
  state.pagination = Object.assign(state.pagination, { ...val });
}

const getUsers = () => {
  //查询用户列表
};

const baseInfoEdit = (row: any) => {
  //打开编辑信息弹框
  baseInfoRef.value.openBaseInfo(row);
}

const deleteUser = ({ id }: any) => {
  //删除用户
  ElMessageBox.confirm("此操作将注销该用户, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {})
    .catch(() => {});
}

onMounted(() => {
  getUsers();
})
</script>
