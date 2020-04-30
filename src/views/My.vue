<template>
    <div>

        <div class="head">
            <div class="head-container">
                <div class=" head-item  head-item-avatar" :style="userAvatar">

                </div>

                <div class="head-item head-item-info">
                    <div class="head-item-info-username">{{username}}</div>
                </div>

            </div>
        </div>

        <van-tabbar v-model="order_active" class="order"  inactive-color="#FFCA2F" :fixed="false">
            <van-tabbar-item :to="{name:'MyOrder' ,params:{id:2}}" class="order-item"  icon="card" :badge="pay">待付款</van-tabbar-item>
            <van-tabbar-item :to="{name:'MyOrder',params:{id:3}}" class="order-item" icon="send-gift" :base="get">待收货</van-tabbar-item>
            <van-tabbar-item  class="order-item" icon="send-gift" :base="comment">待评价</van-tabbar-item>
            <van-tabbar-item  class="order-item" icon="service" >退换/售后</van-tabbar-item>
            <van-tabbar-item :to="{name:'MyOrder',params:{id:1}}" class="order-item" icon="bill" >全部</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>

    import {mapGetters} from 'vuex';
    import {someCount} from "../api/user";

    import { Tabbar, TabbarItem } from "vant";
    export default {
        name: 'My',

        components:{
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,

        },
        data() {
            return {
                order_active:-1,
                pay:null,
                get:null,
                comment:null
            }
        },

        created(){

          this.getOrderCount();
        },

        computed: {
            ...mapGetters([
                'avatar', 'username'
            ]),

            userAvatar() {
                return {
                    'background-image': 'url(' + this.$store.getters.avatar + ')',
                    'background-repeat': 'no-repeat',
                    'background-size': '100% 100%'
                };
            },

            username() {
                return this.$store.getters.username
            },


        },
        methods:{
            //获取订单数量
            getOrderCount(){
                someCount()
                    .then(resp=>{
                        let d = resp.data;
                        this.pay = d.waitPay;
                        this.get = d.waitGet;
                        this.comment = d.waitComment;
                    })
            }
        }


    }
</script>

<style>
    .head {
        text-align: left;
        height: 150px;
        background: linear-gradient(90deg, #eb3c3c, #ff7459);
        box-shadow: 0 2px 4px rgba(228, 57, 60, .4);
        overflow: hidden;
    }

    .head-container {
        margin: 30px 20px 0 20px;
        height: 80px;
    }

    .head-item{
        display: inline-block;
    }

    .head-item-avatar {

        background-color: yellow;
        width: 80px;
        height: 80px;
        border-radius: 80px;
    }

    .head-item-info {
        vertical-align: top;
        height: 80px;
        line-height: 40px;
        margin-left: 20px;
    }

    .head-item-info-username {
        font-size: 20px;
        color: white;
    }

</style>
<style>
    .order {
      padding: 5px;
    }
    .order-item{
       font-size: 0.4rem;

    }
    .order-item .van-tabbar-item__text{
        color:#666!important;
    }
</style>
