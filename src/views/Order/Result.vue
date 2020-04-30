<template>
    <div>
        <p>{{msg}}</p>
        <div>
        </div>
    </div>
</template>

<script>
    import {sync} from "../../api/payment";

    export default {
        name: "Result",

        data(){
            return{
                msg:'查询中',

            }
        },

        created() {
            this.queryOrderStatus();
        },

        methods:{

            queryOrderStatus(){
                sync(this.$route.query)
                    .then((resp)=>{
                        console.log(resp);
                            this.msg = '支付成功';
                    }).catch(()=>{
                        this.msg = '支付失败';
                })
                ;
            },



        }
    }
</script>

<style scoped>

</style>
