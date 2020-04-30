import request from '@/utils/request'
import baseUrl from '@/api/base'

//分类列表

export function cateLists() {
    return request({
        url:baseUrl + '/category/tree',
        method:'get'
    })
}
