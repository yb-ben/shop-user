<template>
    <div class="container">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

        <van-list v-model="loading" :finished="finished"  @load="onLoad" finished-text="没有更多了">
            <div class="item" v-for="(v) in goods" :key="v.id" @click="onClick(v.id)">
                <van-image class="thumbnail" :src="v.image_url"></van-image>
                <div class="info">
                    <div class="title">{{ v.title}}</div>
                    <div class="price">￥{{v.price}}</div>
                </div>
            </div>
        </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import {getGoodsList} from "../../api/goods";
    import {List,PullRefresh } from 'vant';


    export default {
        name: "GoodsList",
        components:{
          [List.name]:List,
            [PullRefresh.name]:PullRefresh,

        },
        data(){
            return{
                refreshing:false,
                loading:false,
                finished:false,
                goods:[],
                params:{
                    page:1,
                    limit:10,
                    cate_id:0,
                }
            }
        },

        created() {
            this.init();
        },

        methods:{

            init(){
                this.params = Object.assign(this.params, this.$route.params)
            },

            //获取商品列表
            getGoods(){
                   return getGoodsList({limit:this.params.limit,page:this.params.page,cate_id:this.params.cate_id})
                       .then((resp)=>{
                           this.loading = false;
                           this.refreshing = false;
                           if(!resp.data.more){
                               this.finished = true;
                           }
                           this.params.more = resp.data.more;
                           this.params.page++;
                           return resp;
                       })
                       ;
            },


            onLoad(){
                this.getGoods().then((resp)=>{
                   this.goods.push(...resp.data.data);
                    this.$forceUpdate();
                });
            },

            //刷新
            refresh(){
                this.params.page = 1;
                return this.getGoods().then(resp=>{
                    let d = resp.data;
                    this.goods = d.data;
                    this.$forceUpdate();

                });
            },

            //下拉刷新
            onRefresh(){
                this.finished = false;
                this.loading = true;
                this.refresh();
            },

            //详情页
            onClick(v){
                console.log(v);
                this.$router.push({name:'GoodsDetail',params:{id:v}})
            }


        }
    }
</script>

<style scoped>
.container{
    padding: 10px;
}
    .item{
        padding: 5px 0;
        display: flex;
    }
    .thumbnail{
        width: 3rem;
        height: 3rem;
    }
    .info{
        padding: 0 5px;
        flex-grow: 1;
        text-align: left;
    }
    .title{
        font-size: .4rem ;
        line-height: .5rem;
        color: #333;
        padding-top:.3rem
    }
    .price{
        color: #e93b3d;
        font-size: .4rem;
    }
</style>
