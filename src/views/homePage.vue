<template>
  <div class="homePage">
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="24"
        :md="6"
        :lg="6"
        :xl="6"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <el-card
          class="box-card m-t8"
          shadow="always"
          :body-style="{ padding: '35px 20px' }"
        >
          <template #header>
            <div class="card-header">
              <span class="card-header-title">{{ item.title }}</span>
              <el-tag :type="item.type" effect="dark" size="small">
                {{ item.labelTitle }}
              </el-tag>
            </div>
          </template>
          <div class="text item card-h-total">{{ item.total }}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card
          class="box-card m-t8"
          shadow="always"
          :body-style="{ padding: '0' }"
        >
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
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-card class="box-card m-t8" shadow="always">
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
        <el-card class="box-card m-t8" shadow="always">
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
        <el-card class="box-card m-t8" shadow="always">
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
<script>
import {
  inject,
  onMounted,
  defineComponent,
  reactive,
  toRefs,
  onUnmounted,
} from "vue";
export default defineComponent({
  name: "homePage",
  setup() {
    let echarts = inject("echarts"); //引入echarts
    const state = reactive({
      dataList: [
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
          title: "图鉴",
          total: "120",
          labelTitle: "总数",
          type: "warning",
        },
      ],
    });

    onMounted(() => {
      // window.onresize = function () {
      //   //页面尺寸变化 自适应大小
      //   chartsInit();
      // };
      chartsInit();
    });

    onUnmounted(() => {});

    const chartsInit = () => {
      //图标初始化
      loadVisitChart();
      loadOriginChart();
      loadActiveChart();
      loadGenderChart();
    };
    const loadVisitChart = () => {
      //加载访问图表
      let labelware = [];
      let dataware = [];
      for (let index = 1; index <= 24; index++) {
        labelware.push(`${index}:00`);
        if (index % 2 === 0) {
          dataware.push(index * 104);
        } else {
          dataware.push(index * 26);
        }
      }
      let myChart = echarts.init(document.getElementById("visitChart"));
      let option = {
        xAxis: {
          type: "category",
          data: labelware,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: dataware,
            type: "line",
          },
        ],
      };
      document
        .getElementById("visitChart")
        .setAttribute("_echarts_instance_", "");
      myChart.setOption(option);
    };

    const loadOriginChart = () => {
      //加载访问图表
      let myChart = echarts.init(document.getElementById("originChart"));
      let option = {
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
      document
        .getElementById("originChart")
        .setAttribute("_echarts_instance_", "");
      myChart.setOption(option);
    };

    const loadActiveChart = () => {
      //每周访问量
      let myChart = echarts.init(document.getElementById("activeChart"));
      // 绘制图表
      let option = {
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
      document
        .getElementById("activeChart")
        .setAttribute("_echarts_instance_", "");
      myChart.setOption(option);
    };

    const loadGenderChart = () => {
      //用户性别统计
      let myChart = echarts.init(document.getElementById("genderChart"));
      // 绘制图表
      let option = {
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
      document
        .getElementById("genderChart")
        .setAttribute("_echarts_instance_", "");
      myChart.setOption(option);
    };

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.homePage {
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
