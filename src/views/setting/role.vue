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
        <el-form-item label="角色名：">
          <el-input
            v-model.trim="queryParams.roleName"
            clearable
            placeholder="请输入角色名"
            size="medium"
            @keyup.enter="getInfo"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色ID：">
          <el-input
            v-model.trim="queryParams.roleId"
            clearable
            placeholder="请输入角色ID"
            size="medium"
            @keyup.enter="getInfo"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-search"
            size="small"
            type="primary"
            @click="getInfo"
            >查 询</el-button
          >
          <el-button type="primary" size="small" @click="openLog({}, 'add')"
            >新增角色</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="zan-table">
      <el-table
        :data="roleList"
        height="calc(100vh - 320px)"
        stripe
        style="width: 100%"
      >
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="备注" prop="marks"> </el-table-column>
        <el-table-column label="是否默认" prop="grant">
          <template #default="scope">
            <el-tag v-if="scope.row.grant === '1'" effect="dark" type="success"
              >是</el-tag
            >
            <el-tag v-else effect="dark" type="danger">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-space spacer="|" style="color: #dedede">
              <el-button type="text" @click="openAuthorize(scope.row)"
                >授权</el-button
              >
              <el-button type="text" @click="openLog(scope.row, 'edit')"
                >编辑</el-button
              >
              <el-button type="text" @click="del(scope.row)">删除</el-button>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="visible"
      :before-close="close"
      title="角色配置"
      width="865px"
    >
      <el-form
        ref="roleRef"
        :model="roleForm"
        :rules="roleRules"
        class="demo-ruleForm"
        label-width="94px"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="角色名称：" prop="roleName">
              <el-input v-model.trim="roleForm.roleName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="是否默认：" prop="grant">
              <el-switch
                v-model="roleForm.grant"
                active-text="是"
                active-value="1"
                inactive-text="否"
                inactive-value="0"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="说明：" prop="marks">
              <el-input
                v-model="roleForm.marks"
                :autosize="{ minRows: 3, maxRows: 5 }"
                type="textarea"
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
    <el-dialog
      v-model="distribution"
      :before-close="closeAuthorize"
      title="权限分配"
      width="600px"
    >
      <div class="distribution_content">
        <el-tree
          ref="treeRef"
          :data="resourceList"
          :props="defaultProps"
          check-on-click-node
          default-expand-all
          node-key="resourceId"
          show-checkbox
        >
        </el-tree>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="medium" @click="closeAuthorize">取 消</el-button>
          <el-button size="medium" type="primary" @click="saveResource"
            >确 定</el-button
          >
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
  shallowRef,
  provide,
  ref,
  computed,
} from "vue";
import { ElMessageBox } from "element-plus";
import { useStore } from "vuex";
export default defineComponent({
  name: "role",
  setup() {
    const roleRef = ref(null); //角色ref
    const treeRef = ref(null); //资源树的ref
    const store = useStore();
    const state = reactive({
      roleList: [
        {
          roleName: "user",
          marks: "普通用户",
          grant: "1",
          createTime: new Date(),
        },
        {
          roleName: "admin",
          marks: "系统管理员",
          grant: "0",
          createTime: new Date(),
        },
        {
          roleName: "super_admin",
          marks: "超级管理员",
          grant: "0",
          createTime: new Date(),
        },
      ],
      visible: false,
      distribution: false,
      type: "",
      queryParams: {
        roleName: "",
        roleId: "",
      },
      roleForm: {
        roleName: "",
        grant: "0",
        marks: "",
        roleId: "",
      },
      roleWare: null, //暂存
      roleRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      resourceList: computed(() => store.state.user.resourceList),
      defaultProps: {
        //tree 默认配置项
        children: "children",
        label: "resourceName",
      },
    });
    onMounted(() => {
      getInfo();
      getAllResource();
    });

    const getInfo = () => {
      //查询列表
    };

    const openLog = (data, type) => {
      //保存 修改
      if (type) state.type = type;
      if (type === "add") {
      } else if (type === "edit") {
        state.roleForm.roleId = data.roleId;
        state.roleForm.roleName = data.roleName;
        state.roleForm.grant = data.grant;
        state.roleForm.marks = data.marks;
      }
      state.visible = true;
    };

    const close = () => {
      //关闭
      roleRef.value.resetFields();
      state.roleForm = {
        roleName: "",
        grant: "0",
        marks: "",
        roleId: "",
      };
      state.visible = false;
    };

    const save = () => {
      roleRef.value.validate((vaild) => {
        if (vaild) {
          close();
          getInfo();
        }
      });
    };

    const edit = () => {
      roleRef.value.validate((vaild) => {
        if (vaild) {
          close();
          getInfo();
        }
      });
    };

    const ok = () => {
      //保存 or 修改
      const item = {
        add: save,
        edit: edit,
      };
      item[state.type]();
    };

    const del = (data) => {
      //删除
      ElMessageBox.confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getInfo();
        })
        .catch(() => {});
    };

    const openAuthorize = (data) => {
      //打开权限分配
      state.distribution = true;
      state.roleWare = data; //存储选中信息
    };

    const closeAuthorize = () => {
      //关闭权限分配
      //关闭权限分配
      state.distribution = false;
      state.roleWare = null;
    };

    const getAllResource = () => {
      //请求所有资源
    };

    const saveResource = () => {
      //授权
      closeAuthorize();
    };

    return {
      ...toRefs(state),
      roleRef,
      treeRef,
      getInfo,
      getAllResource,
      openLog,
      ok,
      del,
      openAuthorize,
      closeAuthorize,
      saveResource,
      close,
    };
  },
});
</script>
<style lang="scss" scoped>
.distribution_content {
  height: 400px;
  overflow: auto;
}
</style>
