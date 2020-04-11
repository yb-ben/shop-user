import router from './router'
import { getToken } from './utils/auth';
import store from './store';

const whiteList = ['/login'];

router.beforeEach(async(to,from,next) => {

    const hasToken = getToken();
    if(hasToken){
        if(to.path === '/login'){
            next({path: '/'})
        }else{
            const hasGetUserInfo = store.getters.name;
            if(hasGetUserInfo){
                next();
            }else{
                try{
                    await store.dispatch('user/getInfo');
                }catch(error){
                    await store.dispatch('user/resetToken');
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
    }else{
        if(whiteList.indexOf(to.path) !== - 1){
            next();
        }else{
            next(`/login?redirect=${to.path}`);
        }
    }
})


router.afterEach(()=>{

});