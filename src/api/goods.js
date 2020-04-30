import request from '@/utils/request'
import baseUrl from '@/api/base'

//商品列表
export function getGoodsList(params) {
    return request({
        url: baseUrl+'/goods/lists',
        method:'get',
        params
    })
}

//商品详情
export function goodsDetail(id) {
    return request({
        url:baseUrl+'/goods/detail/'+id,
        method: 'get'
    })
}

//
