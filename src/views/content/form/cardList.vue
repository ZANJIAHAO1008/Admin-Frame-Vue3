<template>
  <div class="cardList">
    <div class="zan-nav">
      <el-form
        :inline="true"
        :model="queryParams"
        class="demo-form-inline"
        label-position="right"
        label-width="84px"
      >
        <el-form-item label="商品名称：">
          <el-input
            v-model.trim="queryParams.name"
            clearable
            placeholder="请输入商品名称"
            size="medium"
            @keyup.enter="getInfo()"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品ID：">
          <el-input
            v-model.trim="queryParams.id"
            clearable
            placeholder="请输入商品ID"
            size="medium"
            @keyup.enter="getInfo()"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            icon="el-icon-search"
            type="primary"
            @click="getInfo()"
            >查 询</el-button
          >
          <el-button size="small" type="primary" @click="operation('add', {})"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="zan-table">
      <el-row :gutter="10">
        <el-col
          v-for="(item, index) in list"
          :key="index"
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="6"
          style="margin-top: 12px"
        >
          <el-card :body-style="{ padding: '24px 0px 6px 0px' }">
            <div class="list-nav">
              <el-image
                style="width: 130px; height: 120px"
                :src="item.image"
                fit="fill"
              ></el-image>
              <div class="l-n-body">
                <div class="l-n-b-titie">{{ item.name }}</div>
                <span class="l-n-b-introduce">{{ item.introduce }}</span>
              </div>
            </div>
            <div style="padding: 8px 4px 0px 4px">
              <div class="bottom">
                <time class="time">上架日期：{{ item.putawayDate }}</time>
                <el-space size="10" spacer="|">
                  <el-button type="text" @click="operation('edit', {})"
                    >编辑</el-button
                  >
                  <el-button type="text" @click="del">删除</el-button>
                </el-space>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
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
            <el-form-item label="商品名称：" prop="name">
              <el-input
                placeholder="请输入商品名称"
                v-model="form.name"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="商品类型：" prop="height">
              <el-input
                placeholder="请输入商品类型"
                v-model="form.height"
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
import { defineComponent, reactive, toRefs, onMounted, ref } from "vue";
import { ElMessageBox } from "element-plus";
export default defineComponent({
  name: "cardList",
  setup() {
    const tableRef = ref(null);
    const state = reactive({
      type: "add", //保存状态
      openDialog: false, //log开关
      logTitle: "新增", //log title
      list: [],
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
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
      },
    });

    onMounted(() => {
      getInfo();
    });

    const getInfo = (val) => {
      //查询列表
      for (let index = 0; index <= 24; index++) {
        state.list.push({
          name: "汉堡包",
          introduce:
            "小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡小林蜜制小汉堡",
          image:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          putawayDate: "2021/11/26",
        });
      }
    };

    const operation = (type, target) => {
      //打开新增 编辑
      state.type = type;
      state.openDialog = true;
      const titleWare = {
        add: "新增商品",
        edit: "编辑商品",
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
      ElMessageBox.confirm("此操作将永久删除本商品记录, 是否继续?", "提示", {
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
.list-nav {
  display: flex;
  justify-content: space-around;
  .l-n-body {
    width: 200px;
    .l-n-b-titie {
      text-align: center;
      font-size: 17px;
    }
    .l-n-b-introduce {
      font-size: 14px;
      padding-top: 12px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  //   margin-top: 13px;
      padding: 0 12px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
