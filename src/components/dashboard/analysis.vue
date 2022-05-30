<template>
  <div class="analysis">
    <el-row :gutter="8">
      <el-col v-for="(item, index) in dataList" :key="index" :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card shadow="never" :body-style="{ padding: '35px 20px' }">
          <template #header>
            <div class="card-header">
              <span class="card-header-title">{{ item.title }}</span>
              <el-tag :type="item.type" effect="dark">{{
                  item.labelTitle
              }}</el-tag>
            </div>
          </template>
          <div class="text item card-h-total">{{ item.total }}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="m-t8" shadow="never" :body-style="{ padding: '0' }">
          <template #header>
            <div class="card-header">
              <span class="card-header-title">各时间段流量监控</span>
            </div>
          </template>
          <div class="text item">
            <div id="visitChart" class="home_charts"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-card class="m-t8" shadow="never">
          <template #header>
            <div class="card-header">
              <span class="card-header-title">数据来源</span>
            </div>
          </template>
          <div class="text item">
            <div id="originChart" class="home_charts"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-card class="m-t8" shadow="never">
          <template #header>
            <div class="card-header">
              <span class="card-header-title">周活跃量统计</span>
            </div>
          </template>
          <div class="text item">
            <div id="activeChart" class="home_charts"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-card class="m-t8" shadow="never">
          <template #header>
            <div class="card-header">
              <span class="card-header-title">用户数据统计</span>
            </div>
          </template>
          <div class="text item">
            <div id="genderChart" class="home_charts"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts" name="AdminAnalysis">
import type { TagProps } from "element-plus";
import { inject, onMounted, onUnmounted, ref } from "vue";
type DataList = {
  type: TagProps["type"];
  title: string;
  labelTitle: string;
  total: number | string;
};
const eCharts: any = inject("eCharts");

const dataList: DataList[] = [
  {
    title: "待办任务",
    total: "300,000",
    labelTitle: "总数",
    type: "danger",
  },
  {
    title: "用户数量",
    total: "335,084",
    labelTitle: "总数",
    type: "",
  },
  {
    title: "访问量",
    total: "88,846,565",
    labelTitle: "总数",
    type: "success",
  },
  {
    title: "商品数量",
    total: "120",
    labelTitle: "总数",
    type: "warning",
  },
];

const visitChart = ref<any>(null);
const originChart = ref<any>(null);
const activeChart = ref<any>(null);
const statisticsChart = ref<any>(null);
onMounted(() => chartsInit())
onActivated(() => chartsInit())
onUnmounted(() => chartsDispose())
onDeactivated(() => chartsDispose())

const chartsDispose = () => {
  if (originChart.value) {
    originChart.value.dispose()
  }

  if (visitChart.value) {
    visitChart.value.dispose()
  }
  if (activeChart.value) {
    activeChart.value.dispose()
  }
  if (statisticsChart.value) {
    statisticsChart.value.dispose()
  }
}

const chartsInit = () => {
  //图标初始化
  loadVisitChart();
  loadOriginChart();
  loadActiveChart();
  loadGenderChart();
}
const loadVisitChart = () => {
  //加载访问图表
  const labels = [];
  const values = [];
  for (let index = 1; index <= 24; index++) {
    labels.push(`${index}:00`);
    if (index % 2 === 0) {
      values.push(index * 104);
    } else {
      values.push(index * 26);
    }
  };

  visitChart.value = eCharts.init(document.getElementById("visitChart"));
  const option = {
    xAxis: {
      type: "category",
      data: labels,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: values,
        type: "line",
      },
    ],
  };
  visitChart.value.setOption(option);
}

const loadOriginChart = () => {
  //加载访问图表
  originChart.value = eCharts.init(document.getElementById("originChart"));
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "搜索引擎" },
          { value: 735, name: "直接访问" },
          { value: 580, name: "邮件营销" },
          { value: 484, name: "联盟广告" },
          { value: 300, name: "视频广告" },
        ],
      },
    ],
  };
  originChart.value.setOption(option);
}

const loadActiveChart = () => {
  //每周访问量
  activeChart.value = eCharts.init(document.getElementById("activeChart"));
  // 绘制图表
  const option = {
    xAxis: {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };

  activeChart.value.setOption(option);
}

const loadGenderChart = () => {
  //用户性别统计
  statisticsChart.value = eCharts.init(document.getElementById("genderChart"));
  // 绘制图表
  const option = {
    xAxis: {
      type: "category",
      data: ["男生", "女生", "未知"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [
          {
            value: 12234,
            itemStyle: {
              color: "#409EFF",
            },
          },
          {
            value: 64132,
            itemStyle: {
              color: "#7B76D6",
            },
          },
          {
            value: 8755,
            itemStyle: {
              color: "#C0C4CC",
            },
          },
        ],
        type: "bar",
      },
    ],
  };
  statisticsChart.value.setOption(option);
}
</script>
<style lang="scss" scoped>
.analysis {
  .home_charts {
    height: 380px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;

    .card-header-title {
      font-size: 15px;
    }
  }

  .card-h-total {
    font-size: 28px;
  }
}
</style>
