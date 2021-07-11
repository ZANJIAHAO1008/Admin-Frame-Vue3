import request from './axios';


export function getAll(params) {  //例子  get请求配置
    return request({
        url: '/user/getAll',
        method: 'get',
        params:params
    })
}

export function login(data) {   //例子  post请求配置
    return request({
        url: '/user/login',
        method: 'post',
        data:data,
    },{
        message:true,
      })
}

