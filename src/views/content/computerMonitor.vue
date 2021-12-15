<template>
  <el-space direction="vertical">
    <el-card class="box-card" style="width: 60vw">
      <template #header>
        <div class="card-header">
          <span>监听网络是否断开</span>
        </div>
      </template>
      <div class="text item">
        <el-tag :type="online ? 'success' : 'danger'">
          {{
            online ? "当前网络在线" : "当前是离线状态"
          }}
        </el-tag>
      </div>
    </el-card>
    <el-card class="box-card" style="width: 60vw">
      <template #header>
        <div class="card-header">
          <span>鼠标位置</span>
        </div>
      </template>
      <div class="text item">X轴_____{{ x }} y轴_____{{ y }}</div>
    </el-card>
    <el-card class="box-card" style="width: 60vw">
      <template #header>
        <div class="card-header">
          <span>按键监听</span>
        </div>
      </template>
      <div class="text item">可监听单个或多个按键 按下大写的A,B,C,D试试。</div>
    </el-card>
    <el-card class="box-card" style="width: 60vw">
      <template #header>
        <div class="card-header">
          <span>键修饰符( 监听按键是否启用 )</span>
        </div>
      </template>
      <div class="text item">
        <el-tag :type="capsLockState ? 'success' : 'info'">
          {{
            capsLockState ? "CapsLock已打开" : "CapsLock未打开"
          }}
        </el-tag>
        <el-tag class="m-l8" :type="altState ? 'success' : 'info'">
          {{
            altState ? "Alt已打开" : "Alt未打开"
          }}
        </el-tag>
        <el-tag class="m-l8" :type="controlState ? 'success' : 'info'">
          {{
            controlState ? "Control已打开" : "Control未打开"
          }}
        </el-tag>
        <el-tag class="m-l8" :type="numLockState ? 'success' : 'info'">
          {{
            numLockState ? "NumLock已打开" : "NumLock未打开"
          }}
        </el-tag>
      </div>
    </el-card>
    <el-card class="box-card" style="width: 60vw">
      <template #header>
        <div class="card-header">
          <span>获取地理位置</span>
        </div>
      </template>
      <div class="text item">
        {{ coords }}
        {{ locatedAt }}
        {{ error }}
      </div>
    </el-card>
    <el-card class="box-card" style="width: 60vw">
      <template #header>
        <div class="card-header">
          <span>浏览器位置查看</span>
        </div>
      </template>
      <div class="text item">{{ location }}</div>
    </el-card>
  </el-space>
</template>
<script>
import { defineComponent, ref } from "vue";
import {
  useMouse,
  useBrowserLocation,
  onKeyStroke,
  useGeolocation,
  useKeyModifier,
  useOnline,
} from "@vueuse/core";
import { ElNotification } from "element-plus";
export default defineComponent({
  setup() {
    const { x, y } = useMouse(); //监听鼠标的位置
    const location = useBrowserLocation(); //浏览器信息
    onKeyStroke(
      //监听按键
      ["A", "B", "C", "D"],
      (e) => {
        ElNotification({
          title: "按键监听",
          message: `您按下了${e.key}键`,
          type: "success",
        });
      },
      { target: document }
    );
    const { coords, locatedAt, error } = useGeolocation(); //获取地理位置

    const capsLockState = useKeyModifier(["CapsLock"]); //监听键盘是否开启
    const altState = useKeyModifier(["Alt"]); //监听键盘是否开启
    const controlState = useKeyModifier(["Control"]); //监听键盘是否开启
    const numLockState = useKeyModifier(["NumLock"]); //监听键盘是否开启

    const online = useOnline(); //监听网络是否断开
    return {
      x,
      y,
      location,
      coords,
      locatedAt,
      error,
      capsLockState,
      altState,
      controlState,
      numLockState,
      online,
    };
  },
});
</script>

