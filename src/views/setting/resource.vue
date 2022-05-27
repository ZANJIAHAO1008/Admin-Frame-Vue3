<template>
  <div class="resource">
    <el-card shadow="never" :body-style="{ padding: '30px 10px 15px 10px' }">
      <el-form ref="baseInfoRef" :inline="true" :model="state.queryParams" class="demo-form-inline"
        label-position="right" label-width="84px">
        <el-form-item label="资源名称：">
          <el-input v-model.trim="state.queryParams.resourceName" clearable placeholder="请输入资源名称"
            @keyup.enter="getResourceList">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getResourceList">查 询</el-button>
          <el-button type="primary" @click="handlePopup(null, 'add')">新增资源</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" :body-style="{ padding: '30px 10px 15px 10px' }" class="m-t8">
      <el-row>
        <el-col :span="12">
          <el-tree :data="state.resourceList" :expand-on-click-node="false" :props="state.defaultProps"
            default-expand-all node-key="resourceId">
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span>
                  <el-space spacer="|">
                    <el-link type="primary" @click="handlePopup(data, 'add')" :underline="false">添加</el-link>
                    <el-link type="primary" @click="handlePopup(data, 'modify')" :underline="false">编辑</el-link>
                    <el-link type="primary" @click="delDataById(data)" :underline="false">删除</el-link>
                  </el-space>
                </span>
              </span>
            </template>
          </el-tree>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog v-model="showDistribution" :before-handle-close="
      () => {
        handleClose(resourceFormRef);
      }
    " title="资源配置" width="865px">
      <el-form ref="resourceFormRef" :model="state.resourceForm" :rules="state.resourceRules" class="demo-ruleForm"
        label-width="74px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称：" prop="resourceName">
              <el-input v-model.trim="state.resourceForm.resourceName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路径：" prop="resourceUrl">
              <el-input v-model.trim="state.resourceForm.resourceUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="图标：" prop="resourceIcon">
              <el-input v-model="state.resourceForm.resourceIcon"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权重：" prop="resourceOrder">
              <el-input-number v-model="state.resourceForm.resourceOrder" :max="999" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型：" prop="resourceType">
              <el-select v-model="state.resourceForm.resourceType" placeholder="请选择资源类型">
                <el-option label="菜单" value="1"></el-option>
                <el-option label="url" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="说明：" prop="marks">
              <el-input v-model="state.resourceForm.marks" :rows="2" placeholder="请输入说明" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose(resourceFormRef)">取 消</el-button>
          <el-button type="primary" @click="onSubmit(resourceFormRef)">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup name="AdminResource">
import { reactive, onMounted, ref } from "vue";
import { transitionLocal } from "@/locales/i18n";
import type { FormInstance } from "element-plus";
import { ElMessageBox } from "element-plus";
import resourceList from "@/assets/js/resource";
const resourceFormRef = ref<FormInstance>();
const showDistribution = ref<boolean>(false);
const handleType = ref<string>(""); //执行类别
const state = reactive({
  resourceList,
  defaultProps: {
    //tree 默认配置项
    children: "children",
    label: "name",
  },
  queryParams: {
    resourceName: "",
  },
  resourceForm: {
    parentId: "",
    resourceName: "",
    resourceUrl: "",
    resourceType: "",
    resourceIcon: "",
    resourceOrder: 0,
    marks: "",
    resourceId: "",
  },
  resourceRules: {
    resourceName: [
      { required: true, message: "请输入资源名称", trigger: "blur" },
    ],
    resourceUrl: [
      { required: true, message: "请输入资源路径", trigger: "blur" },
    ],
    resourceOrder: [{ required: true, message: "请输入权重", trigger: "blur" }],
  },
});

onMounted(() => {
  getResourceList();
})

const getResourceList = () => {
  //查询列表
  state.resourceList = state.resourceList.map((v: any) => {
    v.name = transitionLocal(v.resourceName);
    v.children = v.children.map((vChild: any) => {
      vChild.name = transitionLocal(vChild.resourceName);
      return vChild;
    })
    return v;
  })
};

const onSubmit = (formEl: FormInstance | undefined) => {
  if (handleType.value === "add") {
    toSaveThe(formEl);
  } else {
    toModify(formEl);
  }
};

const toSaveThe = async (formEl: FormInstance | undefined) => {
  //保存
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      handleClose(formEl);
      getResourceList();
    }
  });
}

const toModify = async (formEl: FormInstance | undefined) => {
  //编辑
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      handleClose(formEl);
      getResourceList();
    }
  });
}

const delDataById = (data: any) => {
  //删除
  ElMessageBox.confirm("此操作将永久删除该资源, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      getResourceList();
    })
    .catch(() => { });
}

const handleClose = (formEl: FormInstance | undefined) => {
  //关闭
  if (!formEl) {
    return;
  }
  formEl.resetFields();
  showDistribution.value = false;
}

const handlePopup = (
  data: {
    resourceId: string;
    resourceName: string;
    resourceUrl: string;
    resourceType: string;
    resourceIcon: string;
    resourceOrder: number;
    marks: string;
  } | null,
  type: string
) => {
  //保存 修改
  if (type) {
    handleType.value = type;
  }
  if (type === "add") {
    state.resourceForm.parentId = data?.resourceId ? data.resourceId : "0";
  } else if (type === "modify") {
    state.resourceForm.resourceName = data?.resourceName ?? "";
    state.resourceForm.resourceUrl = data?.resourceUrl ?? "";
    state.resourceForm.resourceType = data?.resourceType ?? "";
    state.resourceForm.resourceIcon = data?.resourceIcon ?? "";
    state.resourceForm.resourceOrder = data?.resourceOrder ?? 0;
    state.resourceForm.marks = data?.marks ?? "";
    state.resourceForm.resourceId = data?.resourceId ?? "";
  }
  showDistribution.value = true;
  state.resourceForm = Object.assign(state.resourceForm, { data });
}
</script>
<style lang="scss" scoped>
.resource {
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>
