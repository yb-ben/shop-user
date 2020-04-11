import axios from 'axios'
import  store  from '@/store'
import { getToken } from '@/utils/auth'
import { Dialog } from 'vant'
import router from '../router'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 0
})

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['Authorization'] = 'Bearer ' + getToken()
        }
        return config
    },

    error => {
        console.log(error);
        return Promise.reject(error);
    }

)

service.interceptors.response.use(

    response => {
        const res = response.data
        console.log(res)
        if (res.code !== 0) {
            //error    
            
            // Dialog.alert({
            //     title:'错误',
            //     message:res.msg
            // })
            if(res.code === 400){
                store.dispatch('user/resetToken')
            }
            return Promise.reject(res);

        } else {
            let token = res.data.token
            if(token){
                store.dispatch('user/refreshToken',token).then(()=>{
                    router.push({name:'Home'})
                });
            }
            return res;
        }
    },
    error =>{
        console.log('err'+error);
        Dialog.alert({
            title:'错误',
            message:error.message
        })
        return Promise.reject(error)
    }
)


export default service;

