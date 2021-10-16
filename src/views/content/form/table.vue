<template>
  <div class="role">
    <div class="zan-nav">
      <el-form
        :inline="true"
        :model="queryParams"
        class="demo-form-inline"
        label-position="right"
        label-width="84px"
      >
        <el-form-item label="姓名：">
          <el-input
            v-model.trim="queryParams.name"
            clearable
            placeholder="请输入姓名"
            size="medium"
            @keyup.enter="getInfo(pagination)"
          ></el-input>
        </el-form-item>
        <el-form-item label="ID：">
          <el-input
            v-model.trim="queryParams.id"
            clearable
            placeholder="请输入ID"
            size="medium"
            @keyup.enter="getInfo(pagination)"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            icon="el-icon-search"
            type="primary"
            @click="getInfo(pagination)"
            >查 询</el-button
          >
          <el-button size="small" type="primary" @click="operation('add', {})"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="zan-table">
      <el-table :data="list" height="calc(100vh - 320px)" style="width: 100%">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-space spacer="|" style="color: #dedede">
              <el-button type="text" @click="operation('edit', scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="toEnable(scope.row)">{{
                scope.row.enabled === "0" ? "启用" : "禁用"
              }}</el-button>
              <el-button type="text" @click="del(scope.row.id)"
                >删除
              </el-button>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
      <component
        :is="components.pagination"
        class="zan-pagination"
        @change="getInfo"
      ></component>
    </div>
    <el-dialog
      :title="logTitle"
      :before-close="close"
      v-model="openDialog"
      width="1000px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      top="8vh"
    >
      <el-form :model="form" ref="tableRef" :rules="rules" label-width="108px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名：" prop="name">
              <el-input
                placeholder="请输入姓名"
                v-model="form.name"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文名：" prop="englishName">
              <el-input
                placeholder="请输入英文名"
                v-model="form.englishName"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="身高（cm）：" prop="height">
              <el-input
                placeholder="请输入身高"
                v-model="form.height"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="体重（kg）：" prop="weight">
              <el-input
                placeholder="请输入体重"
                v-model="form.weight"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="地址：" prop="address">
              <el-input
                placeholder="请输入地址"
                v-model="form.address"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="基本介绍：" prop="introduction">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="请输入基本介绍"
                v-model="form.introduction"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注：" prop="marks">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5 }"
                v-model="form.marks"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="medium" @click="close">取 消</el-button>
          <el-button size="medium" type="primary" @click="ok">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  ref,
  provide,
  shallowRef,
} from "vue";
import { ElMessageBox } from "element-plus";
import Pagination from "../../../components/Pagination/index.vue";
import {getDate} from "../../../api/mock.js"
export default defineComponent({
  name: "table",
  components: {
    Pagination,
  },
  setup() {
    const tableRef = ref(null);
    const state = reactive({
      type: "add", //保存状态
      openDialog: false, //log开关
      logTitle: "新增", //log title
      list: [
        {
          id: "8008208828",
          name: "曹植饭",
          address: "南京市雨花台区宁双路19号云密城J栋6楼",
        },
        {
          id: "8008208828",
          name: "曹植饭",
          address: "南京市雨花台区宁双路19号云密城J栋6楼",
        },
        {
          id: "8008208828",
          name: "曹植饭",
          address: "南京市雨花台区宁双路19号云密城J栋6楼",
        },
        {
          id: "8008208828",
          name: "曹植饭",
          address: "南京市雨花台区宁双路19号云密城J栋6楼",
        },
        {
          id: "8008208828",
          name: "曹植饭",
          address: "南京市雨花台区宁双路19号云密城J栋6楼",
        },
      ],
      queryParams: {
        name: "",
        id: "",
      },
      form: {
        name: "",
        address: "",
        englishName: "",
        height: "",
        weight: "",
        introduction: "",
        marks: "",
      },
      pagination: {
        total: 1,
        page: 1,
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      },
    });

    provide("pagination", state.pagination); //父子传参
    const components = shallowRef({
      //子组件注册
      pagination: Pagination,
    });
    onMounted(() => {
      getInfo();
    });

    const getInfo = (val) => {
      //查询列表
      getDate().then(res=>{
        console.log(res);
      })
    };

    const operation = (type, target) => {
      //打开新增 编辑
      state.type = type;
      state.openDialog = true;
      const titleWare = {
        add: "新增",
        edit: "编辑",
      };
      state.logTitle = titleWare[type];
      if (type == "edit") {
        state.form = { ...target };
      }
    };

    const ok = () => {
      //判断新增 编辑
      const item = {
        add: save,
        edit: edit,
      };
      tableRef.value.validate((vaild) => {
        if (vaild) {
          item[state.type]();
        }
      });
    };

    const save = () => {
      //新增
    };

    const edit = () => {
      //编辑
    };

    const del = (id) => {
      //删除
      ElMessageBox.confirm("此操作将永久删除本条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {})
        .catch(() => {});
    };

    const toEnable = (data) => {
      //启用 禁用
    };

    const close = () => {
      //关闭
      tableRef.value.resetFields();
      state.form = {
        name: "",
        address: "",
        englishName: "",
        height: "",
        weight: "",
        introduction: "",
        marks: "",
      };
      state.openDialog = false;
    };

    return {
      ...toRefs(state),
      tableRef,
      components,
      close,
      getInfo,
      operation,
      toEnable,
      ok,
      del,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
