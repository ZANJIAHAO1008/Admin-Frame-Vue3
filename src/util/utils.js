export const debounce = (function () {   //防重复提交
	let timer = 0
	return function (callback, ms) {
		clearTimeout(timer)
		timer = setTimeout(callback, ms)
	}
})()