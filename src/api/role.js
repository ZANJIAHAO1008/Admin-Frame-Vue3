import request from './axios';

export function getRole(data) {   // 角色查询
    return request({
        url: 'role/getRole',
        method: 'get',
        params: data,
    })
}

export function saveRole(data) {   // 角色新增
    return request({
        url: 'role/save',
        method: 'post',
        data: data,
    }, {
        loading: true,
        message: true,
    })
}

export function editRole(data) {   // 角色编辑
    return request({
        url: 'role/edit',
        method: 'put',
        data: data,
    }, {
        loading: true,
        message: true,
    })
}

export function delRole(data) {   // 角色删除
    return request({
        url: 'role/delete',
        method: 'delete',
        params: data,
    }, {
        loading: true,
        message: true,
    })
}

export function roleRelation(data) {   // 角色关联用户
    return request({
        url: 'role/relationUser',
        method: 'post',
        data: data,
    })
}

export function getUserRole(data) {   // 角色关联用户
    return request({
        url: '/role/getUserRole',
        method: 'get',
        params: data,
    })
}

