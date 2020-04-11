import request from '@/utils/request'


export function code(phone){
    return request({
        url: '/api/sms/vcode',
        method:'get',
        params:{phone}
    })    
}