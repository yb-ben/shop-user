import request from '@/utils/request'
//获取支付方式
export function methods() {
    return request({
        url: '/api/payment/methods',
        method:'get'
    })
}

//支付订单
export function alipay_wap(data) {
    return request({
        url:'/api/alipay/wap',
        method:'post',
        data
    })
}

//同步
export function sync(data) {
    return request({
        url:'/api/alipay/sync',
        method:'get',
        params:data
    })
}
