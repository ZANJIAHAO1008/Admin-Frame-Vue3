<template>
  <div class="role">
    <el-card shadow="never" :body-style="{ padding: '30px 10px 15px 10px' }">
      <el-form :inline="true" :model="state.queryParams" class="demo-form-inline" label-position="right"
        label-width="84px">
        <el-form-item label="角色名：">
          <el-input v-model.trim="state.queryParams.roleName" clearable placeholder="请输入角色名" @keyup.enter="getRoles">
          </el-input>
        </el-form-item>
        <el-form-item label="角色ID：">
          <el-input v-model.trim="state.queryParams.roleId" clearable placeholder="请输入角色ID" @keyup.enter="getRoles">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRoles">查 询</el-button>
          <el-button type="primary" @click="handlePopup(null, 'add')">新增角色</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" :body-style="{ padding: '30px 10px 15px 10px' }" class="m-t16">
      <el-table :data="state.roleList" height="calc(100vh - 345px)" stripe style="width: 100%">
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="备注" prop="marks"></el-table-column>
        <el-table-column label="是否默认" prop="grant">
          <template #default="scope">
            <el-tag v-if="scope.row.grant === '1'" effect="dark" type="success">是</el-tag>
            <el-tag v-else effect="dark" type="danger">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-space spacer="|">
              <el-button type="" @click="handlePopup(scope.row, 'edit')">编辑</el-button>
              <el-button type="primary" @click="openAuthorize(scope.row)">授权</el-button>
              <el-button type="danger" @click="delDataById(scope.row)">删除</el-button>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="showRoleDialog" :before-close="
      () => {
        handleClose(roleFormRef);
      }
    " title="角色配置" width="865px">
      <el-form ref="roleFormRef" :model="state.roleForm" :rules="state.roleRules" class="demo-ruleForm"
        label-width="94px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="角色名称：" prop="roleName">
              <el-input v-model.trim="state.roleForm.roleName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="是否默认：" prop="grant">
              <el-switch v-model="state.roleForm.grant" active-text="是" active-value="1" inactive-text="否"
                inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="说明：" prop="marks">
              <el-input v-model="state.roleForm.marks" :autosize="{ minRows: 3, maxRows: 5 }" type="textarea">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose(roleFormRef)">取 消</el-button>
          <el-button type="primary" @click="onSubmit(roleFormRef)">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="showJurDialog" :before-close="closeAuthorizeWindow" title="权限分配" width="600px">
      <div class="distribution_content">
        <el-tree ref="treeFormRef" :data="resourceList" :props="state.defaultProps" check-on-click-node
          default-expand-all node-key="resourceId" show-checkbox></el-tree>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeAuthorizeWindow">取 消</el-button>
          <el-button type="primary" @click="saveResources">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup name="AdminRole">
import { reactive, onMounted, ref } from "vue";
import { ElMessageBox } from "element-plus";
import resourceList from "../../assets/js/resource";
import type { FormInstance } from "element-plus";
const roleFormRef = ref<FormInstance>();
const treeFormRef = ref<FormInstance>();
const handleType = ref<string>(""); //执行类别
const showRoleDialog = ref<boolean>(false); //新增角色
const showJurDialog = ref<boolean>(false); //分配权限
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
  roleInfo: null, //暂存
  roleRules: {
    roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  },
  resourceList,
  defaultProps: {
    //tree 默认配置项
    children: "children",
    label: "name",
  },
});
onMounted(() => {
  getRoles();
  queryAllResources();
})

const getRoles = () => {
  //查询列表
};

const handlePopup = (
  data: {
    roleId: string;
    roleName: string;
    grant: string;
    marks: string;
  } | null,
  type: string
) => {
  //保存 修改
  if (type) {
    handleType.value = type;
  }
  if (type === "add") {
  } else if (type === "edit" && data) {
    state.roleForm.roleId = data.roleId;
    state.roleForm.roleName = data.roleName;
    state.roleForm.grant = data.grant;
    state.roleForm.marks = data.marks;
  }
  showRoleDialog.value = true;
}

const handleClose = (formEl: FormInstance | undefined) => {
  //关闭
  if (!formEl) {
    return;
  }
  formEl.resetFields();
  showRoleDialog.value = false;
}

const toSaveThe = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      handleClose(formEl);
      getRoles();
    }
  });
}

const toModify = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      handleClose(formEl);
      getRoles();
    }
  });
}

const onSubmit = (formEl: FormInstance | undefined) => {
  //保存 or 修改
  if (handleType.value === "add") {
    toSaveThe(formEl);
  } else {
    toModify(formEl);
  }
};

const delDataById = (data: any) => {
  //删除
  ElMessageBox.confirm("此操作将永久删除该角色, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      getRoles();
    })
    .catch(() => { });
}

const openAuthorize = (data: any) => {
  //打开权限分配
  showJurDialog.value = true;
  state.roleInfo = data; //存储选中角色信息
}

const closeAuthorizeWindow = () => {
  //关闭权限分配窗口
  showJurDialog.value = false;
  state.roleInfo = null;
}

const queryAllResources = () => {
  //请求所有资源
};

const saveResources = () => {
  //授权
  closeAuthorizeWindow();
}
</script>
<style lang="scss" scoped>
.distribution_content {
  height: 400px;
  overflow: auto;
}
</style>
