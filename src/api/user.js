import request from '@/utils/request'
import {BASEURL} from '@/api/base'

//登录
export function login(data){
    return request({
        url: BASEURL + '/user/login',
        method:'post',
        data
    })
}

//个人信息
export function getInfo(){
    return request({
        url: BASEURL + '/user/info',
        method:'get',

    })
}

//登出
export function logout(){

    return request({
        url: BASEURL + '/user/logout',
        method:'get'
    })
}