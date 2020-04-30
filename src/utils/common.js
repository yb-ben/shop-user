class Common {

    //判断是否为空
    empty(val){
        if(val === null){
            return true;
        }
        if(typeof val === 'object'){
            if(val instanceof Array){
                return val.length === 0;
            }
            return Object.keys(val).length === 0;
        }
        return Boolean(val) === false;
    }




    link(url){
        window.location.href = url;
    }

}

export default {
    install(Vue){
        Vue.prototype.$common = new Common();
    }
}
