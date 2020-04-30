import request from '@/utils/request'
import baseUrl from '@/api/base'
//登录
export function login(data){
    return request({
        url: baseUrl + '/user/login',
        method:'post',
        data
    })
}

//注册
export function registerByCode(data){
    return request({
        url:baseUrl + '/user/register/code',
        method:'post',
        data
    })
}

//个人信息
export function getInfo(){
    return request({
        url: baseUrl + '/user/info',
        method:'get',

    })
}

//登出
export function logout(){

    return request({
        url: baseUrl + '/user/logout',
        method:'get'
    })
}

//部分订单数
export function someCount() {
    return request({
        url:baseUrl+'/user/order/someCount',
        method:'get'
    })
}
