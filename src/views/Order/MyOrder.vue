<template>
    <div class="container">

                <van-tabs v-model="active" @change="onTabChange">
                    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

                        <van-list v-model="loading" :finished="finished"  @load="onLoad"  finished-text="没有更多了">
                    <van-tab title="全部" name="1">
                        <div class="order-item" v-for="(v) in all_list" :key="v.id" @click="onClick(v.id)">

                            <div class="status-div"><span>{{v.status_text}}</span></div>
                            <div class="item" v-for="(vv) in v.order_goods" :key="vv.id" >

                                <van-image class="thumbnail" :src="v.order_goods.image_url"></van-image>

                                <div class="title">{{ vv.title}}</div>
                                <div class="price"><span>￥{{vv.price}}</span><span>&nbsp;×{{vv.count}}</span></div>
                            </div>
                            <div class="price-div">
                                <span>实付款:{{v.total_price}}</span>
                                <span>,</span>
                                <span>优惠:{{v.discount_price}}</span>
                                <span>总价:{{v.price}}</span>
                            </div>
                            <div class="order-item-bottomBar">
                                <van-button v-if="v.status === 0" class="btn" type="danger">去支付</van-button>
                                <van-button v-if="v.status === 3" class="btn" type="default">删除订单</van-button>

                            </div>

                        </div>
                    </van-tab>
                    <van-tab title="待付款" name="2">
                        <div class="order-item" v-for="(v) in notpay_list" :key="v.id" @click="onClick(v.id)">

                            <div class="status-div"><span>{{v.status_text}}</span></div>
                            <div class="item" v-for="(vv) in v.order_goods" :key="vv.id" >

                                <van-image class="thumbnail" :src="v.order_goods.image_url"></van-image>

                                    <div class="title">{{ vv.title}}</div>
                                    <div class="price"><span>￥{{vv.price}}</span><span>&nbsp;×{{vv.count}}</span></div>
                            </div>
                            <div class="price-div">
                                <span>实付款:{{v.total_price}}</span>
                                <span>,</span>
                                <span>优惠:{{v.discount_price}}</span>
                                <span>总价:{{v.price}}</span>
                            </div>
                            <div class="order-item-bottomBar"><van-button class="btn-pay" type="danger">去支付</van-button></div>
                        </div>
                    </van-tab>
                    <van-tab title="待收货" name="3">
                        <div class="order-item" v-for="(v) in notget_list" :key="v.id" @click="onClick(v.id)">

                            <div class="status-div"><span>{{v.status_text}}</span></div>
                            <div class="item" v-for="(vv) in v.order_goods" :key="vv.id" >

                                <van-image class="thumbnail" :src="v.order_goods.image_url"></van-image>

                                <div class="title">{{ vv.title}}</div>
                                <div class="price"><span>￥{{vv.price}}</span><span>&nbsp;×{{vv.count}}</span></div>
                            </div>
                            <div class="price-div">
                                <span>实付款:{{v.total_price}}</span>
                                <span>,</span>
                                <span>优惠:{{v.discount_price}}</span>
                                <span>总价:{{v.price}}</span>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="已完成" name="4">
                        <div class="order-item" v-for="(v) in finished_list" :key="v.id" @click="onClick(v.id)">

                            <div class="status-div"><span>{{v.status_text}}</span></div>
                            <div class="item" v-for="(vv) in v.order_goods" :key="vv.id" >

                                <van-image class="thumbnail" :src="v.order_goods.image_url"></van-image>

                                <div class="title">{{ vv.title}}</div>
                                <div class="price"><span>￥{{vv.price}}</span><span>&nbsp;×{{vv.count}}</span></div>
                            </div>
                            <div class="price-div">
                                <span>实付款:{{v.total_price}}</span>
                                <span>,</span>
                                <span>优惠:{{v.discount_price}}</span>
                                <span>总价:{{v.price}}</span>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="已取消" name="5">
                        <div class="order-item" v-for="(v) in cancel_list" :key="v.id" @click="onClick(v.id)">

                            <div class="status-div"><span>{{v.status_text}}</span></div>
                            <div class="item" v-for="(vv) in v.order_goods" :key="vv.id" >

                                <van-image class="thumbnail" :src="v.order_goods.image_url"></van-image>

                                <div class="title">{{ vv.title}}</div>
                                <div class="price"><span>￥{{vv.price}}</span><span>&nbsp;×{{vv.count}}</span></div>
                            </div>
                            <div class="price-div">
                                <span>实付款:{{v.total_price}}</span>
                                <span>,</span>
                                <span>优惠:{{v.discount_price}}</span>
                                <span>总价:{{v.price}}</span>
                            </div>
                        </div>
                    </van-tab>

                        </van-list>
                    </van-pull-refresh>

                </van-tabs>

    </div>
</template>

<script>
    import { Tab, Tabs,List,PullRefresh } from 'vant';
    import {list} from "../../api/order";

    export default {
        name: "MyOrder",
        components:{
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [List.name]:List,
            [PullRefresh.name]:PullRefresh,
        },
        data(){
            return{
                refreshing:false,
                loading:false,
                finished:false,

                active:1,
                all_list:[],
                notpay_list:[],
                notget_list:[],
                finished_list:[],
                cancel_list:[]
            }
        },

        created() {
            this.active = this.$route.params.id+'' || '1';

        },

        watch:{

            active(value){
                console.log(value);
                this.page = 1;
                this.getList(value,this.page,this.limit)
            }
        },

        methods:{
            //点击订单详情
            onClick(){

            },

            onLoad(){
                this.getList(this.active,this.page,this.limit)
            },

            //刷新
            onRefresh(){
                this.page = 1;
                this.getList(this.active,this.page,this.limit)
            },

            //切换标签
            onTabChange(){
                this.finished = false;
                this.page = 1;
            },

            getList(type,page,limit){
                this.finished = false;
                this.loading = true;
                list({t:type,page,limit})
                    .then(resp=>{
                        this.loading = false;
                        this.refreshing = false;
                        if(!resp.data.more){
                            this.finished = true;
                        }
                        if(this.page === 1){
                            this.setList(type,resp.data.data,true)
                        }else{
                            this.setList(type,resp.data.data)
                        }
                        this.page++;

                    })
            },


            setList(type,data,reset = false){
                switch (type) {
                    case "1":
                        if(reset)
                            this.all_list = data;
                        else
                            this.all_list.push(...data);
                        break;

                    case "2":
                        if(reset)
                            this.notpay_list = data;
                        else
                            this.notpay_list.push(...data);
                        break;

                    case "3":
                        if(reset)
                            this.notget_list = data;
                        else
                            this.notget_list.push(...data);
                        break;

                    case "4":
                        if(reset)
                            this.finished_list = data;
                        else
                            this.finished_list.push(...data);
                        break;

                    case "5":
                        if(reset)
                            this.cancel_list = data;
                        else
                            this.cancel_list.push(...data);
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    .container{
        background-color: #eee;
    }
    .order-item{
        margin: 10px;
        padding: 5px 10px;
        background-color: white;
        border-radius: 5px;
    }
    .item{
        display: flex;
    }
    .thumbnail{
        width: 2rem;
        height: 2rem;
    }

    .title{
        text-align: left;
        font-size: .4rem ;
        line-height: .5rem;
        color: #333;
        flex-grow: 1;
        padding: 0 5px;
    }
    .price{
        color: #e93b3d;
        font-size: .4rem;
        text-align: right;
        flex-shrink: 0;
    }
    .price-div{
        text-align: right;
    }
    .status-div{
        text-align: right;
        color: #ff7459;
    }
    .order-item-bottomBar{
        margin: 10px 0;
        text-align: right;
    }
    .order-item-bottomBar .btn{
        height: .7rem;
        line-height: .7rem;
        border-radius: .5rem;
    }

</style>
