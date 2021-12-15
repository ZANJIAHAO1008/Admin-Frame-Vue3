<template>
  <el-row :gutter="10" v-loading="loading" element-loading-text="地图加载中...">
    <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
      <div id="container" class="defult-h"></div>
    </el-col>

    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
      <el-card>
        <template #header>
          <div class="card-header">
            <span style="font-size: 18px">当前所在行政区信息</span>
          </div>
        </template>
        <div>
          <span v-if="info">位置:{{ info.province + info.city + info.district }}</span>
          <span v-else>暂无位置信息</span>
        </div>
      </el-card>
      <el-card class="m-t8">
        <template #header>
          <div class="card-header">
            <span style="font-size: 18px">获取输入提示数据</span>
          </div>
        </template>
        <div>
          <el-form :inline="true" :model="mapForm">
            <el-form-item>
              <el-autocomplete
                :fetch-suggestions="searchCity"
                v-model="mapForm.search"
                placeholder="获取输入提示数据"
                @select="selectCity"
              />
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card class="m-t8">
        <template #header>
          <div class="card-header">
            <span style="font-size: 18px">地图跳转(城市名 \ 城市编码)</span>
          </div>
        </template>
        <div>
          <el-form :inline="true" :model="mapForm">
            <el-form-item>
              <el-input v-model="mapForm.name" placeholder="设置地图当前行政区"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="gotoCity">跳转</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>

      <el-card>
        <template #header>
          <div class="card-header">
            <span style="font-size: 18px">地图平移</span>
          </div>
        </template>
        <div>
          <el-button size="small" type="primary" @click="panBy">平移像素值：(50,100)</el-button>
          <el-button size="small" type="primary" @click="panTo">回到中心点</el-button>
        </div>
      </el-card>

      <el-card>
        <template #header>
          <div class="card-header">
            <span style="font-size: 18px">地图标记(点位 \ 窗体)</span>
          </div>
        </template>
        <div>
          <el-button size="small" type="primary" @click="addMarker(AMap)">添加点标记</el-button>
          <el-button size="small" type="primary" @click="openInfo(AMap)">添加窗体</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
export default defineComponent({
  setup() {
    const state = reactive({
      loading: false,
      map: null,
      AMap: null,
      marker: null,
      info: null,
      infoWindow: null,
      center: [119.330328, 26.097549],
      mapForm: {
        name: "",
        search: "",
      },
    });

    const createMap = (AMap) => {
      //创建地图
      state.map = new AMap.Map("container", {
        zoom: 14, //级别
        center: state.center, //中心点坐标
        viewMode: "3D", //使用3D视图
      });

      state.AMap = AMap;
    };

    const destroyMap = () => {
      //销毁地图
      state?.map?.destroy();
      console.log("地图已销毁");
    };

    const logMapinfo = () => {
      //获取并展示当前城市信息
      state?.map.getCity((info) => {
        console.log(info);
        state.info = info;
      });
    };

    const gotoCity = () => {
      //根据cityname、adcode、citycode设置地图位置
      if (!state?.mapForm?.name) {
        return false;
      }
      state?.map.setCity(state?.mapForm?.name);
    };

    const panBy = () => {
      //平移(50,100)
      state?.map.panBy(50, 100);
    };

    const panTo = () => {
      //平移到中心点
      state?.map.panTo(state.center);
    };

    const addMarker = (AMap) => {
      //添加点标记
      state.marker = new AMap.Marker({
        icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
        position: state.center,
        offset: new AMap.Pixel(-13, -30),
      });
      state?.marker.setMap(state.map);
    };

    // 获取输入提示信息
    const searchCity = (keyword) => {
      console.log(keyword);
      state.AMap.plugin("AMap.AutoComplete", () => {
        // 实例化Autocomplete
        var autoOptions = {
          city: "全国",
        };
        var autoComplete = new state.AMap.Autocomplete(autoOptions);
        autoComplete.search(keyword, (status, result) => {
          // 搜索成功时，result即是对应的匹配数据
          console.log(status, result);
        });
      });
    };

    const selectCity = () => {
      //选择城市
    };

    const openInfo = (AMap) => {
      //构建信息窗体中显示的内容
      var info = [];
      info.push('<div style="padding:7px 0px 0px 0px;"><h4>Admin-Frame</h4>');
      info.push("<p class='input-item'>一款中/后台管理系统</p>");
      info.push("<p class='input-item'>这是地图测试内容这是地图测试内容</p>");
      info.push("<p class='input-item'>这是地图测试内容这是地图测试内容</p>");
      info.push("<p class='input-item'>这是地图测试内容这是地图测试内容</p>");
      info.push("<p class='input-item'>感谢支持</p></div></div>");

      var infoWindow = new AMap.InfoWindow({
        content: info.join(""), //使用默认信息窗体框样式，显示信息内容
      });

      infoWindow.open(state?.map, state?.map.getCenter());
    };

    onMounted(() => {
      state.loading = true;
      AMapLoader.load({
        key: "e996569c0dd8ad17cf52a3051eae2562", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: "1.1", // AMapUI 缺省 1.1
          plugins: [], // 需要加载的 AMapUI ui插件
        },
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: "1.3.2", // Loca 版本，缺省 1.3.2
        },
      })
        .then((AMap) => {
          createMap(AMap);
          state?.map.on("complete", () => {
            console.log("地图加载完成！");
            logMapinfo();
            state.loading = false;
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });

    onUnmounted(() => {
      destroyMap();
    });

    return {
      ...toRefs(state),
      gotoCity,
      panBy,
      panTo,
      addMarker,
      openInfo,
      searchCity,
      selectCity,
    };
  },
});
</script>

