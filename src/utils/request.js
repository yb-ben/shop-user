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

        store.dispatch('loading/turnOn');

        return config
    },

    error => {
        console.log(error);
        return Promise.reject(error);
    }

)

service.interceptors.response.use(

    response => {
        store.dispatch('loading/turnOff');
        const res = response.data

        if(typeof res === 'string'){
            console.log(res);
            return res;
        }

        if (res.code !== 0) {
            //error

            if(res.code === 400){
                store.dispatch('user/resetToken');
                console.log(1);
                Dialog.confirm({
                    title:'错误',
                    message:'请登录'
                }).then(()=>{
                    //确认
                    router.push({name:'Login',params:{redirect_to:router.history.current.path}});
                });

                Promise.reject(res);
            }else if(res.code === 401){
                Dialog.confirm({
                    title:'错误',
                    message:res.msg
                });
                Promise.reject(res);
            }
            return res;
        } else {
            let token = res.data.token
            if(token){

                store.dispatch('user/refreshToken',token).then(()=>{
                    let rt = router.history.current.params.redirect_to;
                    if(rt){
                        router.replace({path:rt});
                    }else{
                        router.push({name:'Home'})
                    }
                });
            }
            return res;
        }
    },
    error =>{
        store.dispatch('loading/turnOff');
        console.log('err'+error);
        Dialog.alert({
            title:'错误',
            message:error.message
        })
        return Promise.reject(error)
    }
)


export default service;

