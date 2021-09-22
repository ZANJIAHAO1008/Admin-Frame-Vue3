import request from './axios';

export function login(data) {   //例子  登陆
    return request({
        url: '/user/login',
        method: 'post',
        data:data,
    },{
        message:true,
    })
}

export function register(data) {   //例子  注册
    return request({
        url: '/user/addUser',
        method: 'post',
        data:data,
    },{
        message:true,
        loading:true,
    })
}



export function getAll(data) {   //例子  用户列表查询
    return request({
        url: '/user/getAll',
        method: 'get',
        params: data,
    })
}

export function getUserInfo(data) {   //例子  用户信息查询
    return request({
        url: '/user/getUserInfo',
        method: 'get',
        params: data,
    })
}

export function delUser(data) {   //例子  删除用户
    return request({
        url: '/user/delUser',
        method: 'post',
        data: data,
    }, {
        message: true,
        loading: true,
    })
}

export function changePass(data) {   //密码修改
    return request({
        url: '/user/changePass',
        method: 'post',
        data: data,
    }, {
        message: true,
    })
}

export function modifyBaseInfo(data) {   //用户信息修改
    return request({
        url: '/user/modifyBaseInfo',
        method: 'post',
        data: data,
    }, {
        message: true,
    })
}

