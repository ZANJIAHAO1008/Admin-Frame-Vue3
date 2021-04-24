<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          label="日期"
          width="180">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="姓名"
          width="180">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top">
            <template #default>
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              size="mini"
          >编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        style="text-align: right"
        v-model:currentPage="currentPage"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
    </el-pagination>
  </div>
</template>
<script>
import {defineComponent, getCurrentInstance, toRefs, reactive, ref, watch, computed, onMounted} from 'vue'

export default defineComponent({
  name: "table",
  setup() {
    const state = reactive({
      currentPage: 5,
      tableData: [{
        date: '2016-05-02',
        name: '曹植饭',
        address: '宁双路19号云密城'
      }, {
        date: '2016-05-04',
        name: '曹植饭',
        address: '宁双路19号云密城'
      }, {
        date: '2016-05-01',
        name: '曹植饭',
        address: '宁双路19号云密城'
      }, {
        date: '2016-05-03',
        name: '曹植饭',
        address: '宁双路19号云密城'
      }, {
        date: '2016-05-02',
        name: '曹植饭',
        address: '宁双路19号云密城'
      }, {
        date: '2016-05-04',
        name: '曹植饭',
        address: '宁双路19号云密城'
      }, {
        date: '2016-05-01',
        name: '曹植饭',
        address: '宁双路19号云密城'
      }, {
        date: '2016-05-03',
        name: '曹植饭',
        address: '宁双路19号云密城'
      }, {
        date: '2016-05-02',
        name: '曹植饭',
        address: '宁双路19号云密城'
      }, {
        date: '2016-05-04',
        name: '曹植饭',
        address: '宁双路19号云密城'
      }, {
        date: '2016-05-01',
        name: '曹植饭',
        address: '宁双路19号云密城'
      }, {
        date: '2016-05-03',
        name: '曹植饭',
        address: '宁双路19号云密城'
      },
      ]
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>