import request from '@/utils/request'

import { Dialog } from 'vant'
export function code(phone){
    return request({
        url: '/api/sms/vcode',
        method:'get',
        params:{phone}
    }).then((resp)=>{
        Dialog.confirm({
            title:'测试',
            message:resp.data
        })
    })
}
