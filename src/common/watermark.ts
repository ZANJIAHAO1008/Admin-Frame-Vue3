const id = "1.234523841642.1234124163";
const setWatermark = (str: string) => {
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id) as HTMLElement);
  }
  // 创建一个画布
  const canvas = document.createElement("canvas");
  // 设置画布的长宽
  canvas.width = 220;
  canvas.height = 180;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  // 设置旋转角度
  ctx.rotate((-20 * Math.PI) / 150);
  ctx.font = "15px Vedana";
  // 设置填充绘画的颜色、渐变或者模式
  ctx.fillStyle = "rgba(200, 200, 200, 0.70)";
  // 设置文本内容的当前对齐方式
  ctx.textAlign = "center";
  // 设置在绘制文本时使用的当前文本基线
  ctx.textBaseline = "middle";
  // 在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
  ctx.fillText(str, canvas.width / 3, canvas.height / 2);
  const div = document.createElement("div");
  div.id = id;
  div.style.pointerEvents = "none";
  div.style.top = "40px";
  div.style.left = "0px";
  div.style.opacity = "0.6";
  div.style.position = "fixed";
  div.style.zIndex = "100000";
  div.style.width = document.documentElement.clientWidth + "px";
  div.style.height = document.documentElement.clientHeight + "px";
  div.style.background =
    "url(" + canvas.toDataURL("image/png") + ") left top repeat";
  document.body.appendChild(div);
  return id;
}
// 该方法只允许调用一次
// 添加水印的方法
export const setWaterMarker = (str: string) => {
  let id = setWatermark(str);
  if (document.getElementById(id) === null) {
    id = setWatermark(str);
  }
};
// 移除水印的方法
export const removeWaterMarker = () => {
  if (document.getElementById(id) !== null) {
    const box = document.getElementById(id) as HTMLElement;
    box?.parentNode?.removeChild(box);
  }
};
