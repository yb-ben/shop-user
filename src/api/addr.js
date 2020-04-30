import request from '@/utils/request'
import baseUrl from '@/api/base'

//地址列表
export function list() {
    return request({
        url:baseUrl+'/user/addr/list',
        method:'get'
    })
}


export function add(data) {
    return request({
        url: baseUrl+'/user/addr/add',
        method: 'post',
        data
    })
}

export function save(id,data) {
    return request({
        url:baseUrl+'/user/addr/save/'+id,
        method:'post',
        data
    })
}


export function del(id) {
    return request({
        url:baseUrl+'/user/addr/delete/'+id,
        method:'post'
    })
}

export function getDefault() {
    return request({
        url:baseUrl+'/user/addr/default',
        method:'get'
    })
}
