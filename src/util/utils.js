import Cookies from "js-cookie";
import {ElLoading} from "element-plus";
export const debounce = (function () {   //防重复提交
	let timer = 0
	return function (callback, ms) {
		clearTimeout(timer)
		timer = setTimeout(callback, ms)
	}
})()

export function getToken (){
 return	Cookies.get("token")
}

export  function  Loading(){ //loading方法
	return ElLoading.service({
		lock: false,
		text: '加载中···',
		spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, 0.7)',
	});
}

