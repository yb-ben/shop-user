import request from '@/utils/request'
import baseUrl from '@/api/base'

//添加到购物车
export function add(data) {
    return request({
        url:baseUrl+'/cart/add',
        method:'post',
        data
    })
}


export function modify(data) {
    return request({
        url:baseUrl+'/cart/modify',
        method:'post',
        data
    })
}

//
export function remove(ids) {
    return request({
        url:baseUrl+'/cart/remove',
        method:'post',
        data:{
            ids
        }
    })
}


export function list(params){
    return request({
        url:baseUrl+'/cart/list',
        method:'get',
        params
    })
}

export function count() {
    return request({
        url:baseUrl+'/cart/count',
        method:'get'
    })
}


export function calculate(ids) {
    return request({
        url:baseUrl+'/cart/calculate',
        method:'post',
        data:{
            ids
        }
    })
}
