<template>
  <div class="resource">
    <div class="zan-nav">
      <el-form
        ref="baseInfoRef"
        :inline="true"
        :model="queryParams"
        class="demo-form-inline"
        label-position="right"
        label-width="84px"
      >
        <el-form-item label="资源名称：">
          <el-input
            v-model.trim="queryParams.resourceName"
            clearable
            placeholder="请输入资源名称"
            size="medium"
            @keyup.enter="getInfo"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" size="small" type="primary" @click="getInfo">查 询</el-button>
          <el-button type="primary" size="small" @click="openLog({}, 'add')">新增资源</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="zan-table">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-tree
            :data="resourceList"
            :expand-on-click-node="false"
            :props="defaultProps"
            default-expand-all
            node-key="resourceId"
          >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span>
                  <el-space spacer="|" style="color: #dedede">
                    <el-button title="添加子资源" type="text" @click="openLog(data, 'add')">添加</el-button>
                    <el-button title="编辑" type="text" @click="openLog(data, 'edit')">编辑</el-button>
                    <el-button title="删除" type="text" @click="del(data)">删除</el-button>
                  </el-space>
                </span>
              </span>
            </template>
          </el-tree>
        </el-col>
      </el-row>
    </div>
    <el-dialog v-model="visible" :before-close="close" title="资源配置" width="865px">
      <el-form
        ref="resourceRef"
        :model="resourceForm"
        :rules="resourceRules"
        class="demo-ruleForm"
        label-width="74px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称：" prop="resourceName">
              <el-input v-model.trim="resourceForm.resourceName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路径：" prop="resourceUrl">
              <el-input v-model.trim="resourceForm.resourceUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="图标：" prop="resourceIcon">
              <el-input v-model="resourceForm.resourceIcon"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权重：" prop="resourceOrder">
              <el-input-number v-model="resourceForm.resourceOrder" :max="999" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型：" prop="resourceType">
              <el-select v-model="resourceForm.resourceType" placeholder="请选择资源类型">
                <el-option label="菜单" value="1"></el-option>
                <el-option label="url" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="说明：" prop="marks">
              <el-input v-model="resourceForm.marks" :rows="2" placeholder="请输入说明" type="textarea"></el-input>
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
  computed,
} from "vue";
import { ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import resourceList from "../../assets/js/resource";
export default defineComponent({
  name: "resource",
  setup() {
    const resourceRef = ref(null); //资源ref
    const store = useStore();
    const state = reactive({
      resourceList,
      visible: false,
      defaultProps: {
        //tree 默认配置项
        children: "children",
        label: "resourceName",
      },
      queryParams: {
        resourceName: "",
      },
      resourceForm: {
        resourceName: "",
        resourceUrl: "",
        resourceType: "",
        resourceIcon: "",
        resourceOrder: "",
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
        resourceOrder: [
          { required: true, message: "请输入权重", trigger: "blur" },
        ],
      },
      type: "",
    });

    onMounted(() => {
      getInfo();
    });

    const getInfo = () => {
      //查询列表
    };

    const ok = () => {
      const item = {
        add: save,
        edit: edit,
      };
      item[state.type]();
    };

    const save = () => {
      //保存
      resourceRef.value.validate((vaild) => {
        if (vaild) {
          close();
          getInfo();
        }
      });
    };

    const edit = () => {
      //编辑
      resourceRef.value.validate((vaild) => {
        if (vaild) {
          close();
          getInfo();
        }
      });
    };

    const del = (data) => {
      //删除
      ElMessageBox.confirm("此操作将永久删除该资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getInfo();
        })
        .catch(() => { });
    };

    const close = () => {
      //关闭
      resourceRef.value.resetFields();
      state.resourceForm = {
        resourceName: "",
        resourceUrl: "",
        resourceType: "",
        resourceIcon: "",
        resourceOrder: "",
        marks: "",
        resourceId: "",
      };
      state.visible = false;
    };

    const openLog = (data, type) => {
      //保存 修改
      if (type) state.type = type;
      if (type === "add") {
        state.resourceForm.parentId = data.resourceId ? data.resourceId : 0;
      } else if (type === "edit") {
        state.resourceForm.resourceName = data.resourceName;
        state.resourceForm.resourceUrl = data.resourceUrl;
        state.resourceForm.resourceType = data.resourceType;
        state.resourceForm.resourceIcon = data.resourceIcon;
        state.resourceForm.resourceOrder = data.resourceOrder;
        state.resourceForm.marks = data.marks;
        state.resourceForm.resourceId = data.resourceId;
      }
      state.visible = true;
      // state.resourceForm = Object.assign({...data},{});
    };

    return {
      ...toRefs(state),
      save,
      edit,
      del,
      ok,
      close,
      openLog,
      getInfo,
      resourceRef,
    };
  },
});
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
