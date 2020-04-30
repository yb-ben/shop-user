import request from '@/utils/request'
import baseUrl from '@/api/base'

//计算价格
export function calculate(data) {
    return request({
        url:baseUrl+'/order/calculate',
        method:'post',
        data
    })
}


//购物车下单
export function submit(data) {
    return request({
        url:baseUrl+'/order/submit',
        method: 'post',
        data
    })
}


//付款信息
export function getOrderPaymentInfo(params) {
    return request({
        url:baseUrl+'/order/payment/info',
        method:'get',
        params
    })
}

//订单列表
export function list(params) {
    return request({
        url:baseUrl+'/order/list',
        method:'get',
        params
    })
}
