<template>
    <div>
        <van-form @submit="onSubmit">
            <van-field v-model="phone" name="手机号" placeholder="请输入手机号" />
        </van-form>
    </div>
</template>

<script>
export default {
    name:'Login',

    data(){
        return{
            phone:'',
            code:'',

        }
    },

    methods:{
        //登录
        onSubmit(){

        }
    }
}
</script>