import request from './axios';

export function getEncyclopedia(data) {   // 宠物百科查询
    return request({
        url: '/encyclopedia/query',
        method: 'get',
        params: data,
    })
}

export function saveEncyclopedia(data) {   // 宠物百科新增
    return request({
        url: '/encyclopedia/save',
        method: 'post',
        data: data,
    }, {
        loading: true,
        message: true,
    })
}

export function editEncyclopedia(data) {   // 宠物百科编辑
    return request({
        url: 'encyclopedia/edit',
        method: 'put',
        data: data,
    }, {
        loading: true,
        message: true,
    })
}

export function deleteEncyclopedia(data) {   // 宠物百科删除
    return request({
        url: 'encyclopedia/delete',
        method: 'delete',
        params: data,
    }, {
        loading: true,
        message: true,
    })
}

export function startEnable(data) {   // 宠物百科启用 禁用
    return request({
        url: 'encyclopedia/enable',
        method: 'put',
        data: data,
    }, {
        loading: true,
        message: true,
    })
}




