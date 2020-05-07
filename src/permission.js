import router from './router'
import { getToken } from './utils/auth';
import store from './store';

// eslint-disable-next-line no-unused-vars
const whiteList = ['/login'];
const blackList = ['/my'];

router.beforeEach(async(to, from, next) => {


    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
        } else {
            const hasGetUserInfo = store.getters.username
            console.log(hasGetUserInfo);
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    // get user info
                    await store.dispatch('user/getInfo')

                    next()
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    if(blackList.indexOf(to.path) !== -1){
                        next({path:'/login',params:{redirect_to:to.path}})
                    }else{
                        next();
                    }
                  }
            }
        }
    } else {
        /* has no token*/
        if(blackList.indexOf(to.path) === -1){
            next();
        }else{
            next('/')
        }
        // if (whiteList.indexOf(to.path) !== -1) {
        //     // in the free login whitelist, go directly
        //     next()
        // } else {
        //     // other pages that do not have permission to access are redirected to the login page.
        //     next(`/login?redirect=${to.path}`)
        //
        // }
    }
})

router.afterEach(()=>{

});
