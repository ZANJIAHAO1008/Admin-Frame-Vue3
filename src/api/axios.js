import axios from 'axios';
import qs from 'qs';
import {ElMessage} from 'element-plus'
import {getToken,Loading } from '../util/utils.js';
const pendingMap = new Map();
var loading = null;
export default function (config,options) {
    //判断是否要展示loading 需要配置则在增加{loading:true} 默认false
    let loadingStatus = options?.loading || undefined;
    //判断是否要展示消息 需要配置则在增加{message:true} 默认false
    let messageStatus = options?.message || undefined;
    //判断是否展示未格式化的数据 需要配置则在增加{rawData:true} 默认false
    let rawData = options.rawData??=false;
    const service = axios.create({
        baseURL: '/api', // 设置统一的请求前缀
        timeout: 10000, // 设置统一的超时时长
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        transformRequest: [function (data, headers) {
            // 对 data 进行任意转换处理
            return qs.stringify(data)
        }],

        // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
        transformResponse: [function (data) {
            // 对 data 进行任意转换处理
            let res = JSON.parse(data);//返回数据类型转换

            if(res.code == 200){
                !messageStatus ||  ElMessage.success(res.message)
            }else if(res.code == 500){
                !messageStatus ||  ElMessage.error(res.message)
            }else{
                !messageStatus ||  ElMessage.warning(res.message)
            }

            return data;

        }],
        // `paramsSerializer` 是一个负责 `params` 序列化的函数
        // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
        paramsSerializer: function(params) {
            return qs.stringify(params, {arrayFormat: 'brackets'})
        },
        // `withCredentials` 表示跨域请求时是否需要使用凭证
        withCredentials: false, // default
    });

    // 请求拦截
    service.interceptors.request.use(config =>{
        removePending(config);
        addPending(config);
        //发起请求的时候 展示loading
        !loadingStatus || (loading = Loading());
        // 自动携带token
        if (getToken() && typeof window !== "undefined") {
            config.headers.Authorization = getToken();
        }
        return config;
    }, error => {
        return Promise.reject(error);
    })


    // 响应拦截
    service.interceptors.response.use(
        response => {
            //返回请求的时候关闭loading
            !loadingStatus ||  loading.close(),loading = null;
            return rawData?response:response.data;
        },
        error => {
            error.config && removePending(error.config);
            //返回请求的时候关闭loading
            !loadingStatus ||  loading.close(),loading = null;
            httpErrorStatusHandle(error);
            return Promise.reject(error);
        }
    );
    return service(config)

};

function httpErrorStatusHandle(error) {
    // 处理被取消的请求
    if(axios.isCancel(error)) return console.error('请求的重复请求：' + error.message);
    let message = '';
    if (error && error.response) {
        switch(error.response.status) {
            case 302: message = '接口重定向了！';break;
            case 400: message = '参数不正确！';break;
            case 401: message = '您未登录，或者登录已经超时，请先登录！';break;
            case 403: message = '您没有权限操作！'; break;
            case 404: message = `请求地址出错: ${error.response.config.url}`; break; // 在正确域名下
            case 408: message = '请求超时！'; break;
            case 409: message = '系统已存在相同数据！'; break;
            case 500: message = '服务器内部错误！'; break;
            case 501: message = '服务未实现！'; break;
            case 502: message = '网关错误！'; break;
            case 503: message = '服务不可用！'; break;
            case 504: message = '服务暂时无法访问，请稍后再试！'; break;
            case 505: message = 'HTTP版本不受支持！'; break;
            default: message = '异常问题，请联系管理员！'; break
        }
    }
    if (error.message.includes('timeout')) message = '网络请求超时！';
    if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';

    ElMessage({
        type: 'error',
        message
    })
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
function addPending(config) {
    const pendingKey = getPendingKey(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pendingMap.has(pendingKey)) {
            pendingMap.set(pendingKey, cancel);
        }
    });
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
    const pendingKey = getPendingKey(config);
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey);
        cancelToken(pendingKey);
        pendingMap.delete(pendingKey);
    }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey(config) {
    let {url, method, params, data} = config;
    if(typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}



