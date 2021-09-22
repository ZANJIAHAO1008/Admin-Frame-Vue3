import request from './axios';

export function getAll(data) {   // 资源列表查询
    return request({
        url: 'resource/getResource',
        method: 'get',
        params: data,
    })
}

export function saveResource(data) {   // 资源列表新增
    return request({
        url: 'resource/save',
        method: 'post',
        data: data,
    }, {
        loading: true,
        message: true,
    })
}

export function editResource(data) {   // 资源列表编辑
    return request({
        url: 'resource/edit',
        method: 'put',
        data: data,
    }, {
        loading: true,
        message: true,
    })
}

export function delResource(data) {   // 资源删除
    return request({
        url: 'resource/delete',
        method: 'delete',
        params: data,
    }, {
        loading: true,
        message: true,
    })
}

export function relationResource(data) {   // 角色资源关联
    return request({
        url: 'resource/relation',
        method: 'post',
        data: data,
    }, {
        loading: true,
        message: true,
    })
}

export function getRoleRelation(data) {   // 角色资源关联查询
    return request({
        url: 'resource/getRoleRelation',
        method: 'get',
        params: data,
    })
}

