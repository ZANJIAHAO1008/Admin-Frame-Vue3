import request from './axios';

export function getData() {
    return request({
        url: '/mock/news',
        method: 'get',
        params: {},
    })
}