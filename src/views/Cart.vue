<template>
    <div class="container">
        <div class="head-bar">
            <span class="head-bar-item" v-if="!editMode" @click="enterEditMode">编辑商品</span>
            <span class="head-bar-item" v-if="editMode" @click="exitEditMode">完成</span>
        </div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-checkbox-group v-model="result" @change="onSelectChange" ref="cbg">
                <van-list class="cart-list" v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
                    <div class="item" v-for="(v) in carts" :key="v.id">
                        <div class="cb">
                            <van-checkbox :name="v.id"></van-checkbox>
                        </div>
                        <van-image class="thumbnail" :src="v.goods.image_url" @click="onClick(v.goods_id)"></van-image>
                        <div class="info" @click="onClick(v.goods_id)">
                            <div class="info-item title">{{ v.goods.title}}</div>
                            <div class="info-item price">￥{{ v.spec ? v.spec.price :v.goods.price}}</div>
                            <template v-if="v.spec">
                                <div  class="info-item "><span class="sku_text">{{v.spec.sku_text}}</span></div>
                            </template>
                            <div class="info-item modify" @click.prevent.stop>
                                <van-stepper class="modify-item" style="text-align: left" :name="v.id" @change="onCountChange" v-model="v.count" min="1" max="200" integer></van-stepper>
                                <div v-if="editMode"  class="modify-item" style="text-align: right" @click="onRemoveItem(v.id)">删除</div>
                            </div>
                        </div>
                    </div>
                </van-list>
            </van-checkbox-group>
        </van-pull-refresh>
        <div class="bottomBar">
            <van-checkbox v-model="isAll" @click="onSelectAll">全选</van-checkbox>
            <div v-if="!editMode" class="priceInfo">
                <span class="totalText">总价：</span>
                <span class="totalPrice">￥{{totalPrice}}</span>
            </div>
            <div v-if="editMode" class="priceInfo">
            </div>
            <van-button v-if="!editMode" class="btn-submit" round type="danger" @click="goToBuy">去结算</van-button>
            <van-button v-if="editMode" class="btn-submit" round type="danger" @click="onRemove">删除</van-button>

        </div>
    </div>

</template>
<script>
    import {List, Checkbox, PullRefresh, CheckboxGroup,Stepper} from 'vant';
    // eslint-disable-next-line no-unused-vars
    import {list, calculate, remove, modify} from "../api/cart";

    export default {
        name: 'Cart',
        components: {
            [List.name]: List, [Checkbox.name]: Checkbox, [PullRefresh.name]: PullRefresh,
            [CheckboxGroup.name]: CheckboxGroup,[Stepper.name]:Stepper
        },
        data() {
            return {
                editMode: false,
                isAll: false,
                result: [],
                carts: [],
                totalPrice: 0,
                loading: false,
                refreshing: false,
                finished: true,
                ignoreChangeEvent:false,
                params: {
                    page: 1,
                    limit: 10,
                }
            }
        },

        created() {
            this.onLoad();
        },



        methods: {
            getCarts() {
                return list(this.params)
                    .then((resp) => {
                        this.loading = false;
                        this.refreshing = false;
                        this.finished = !resp.data.more;
                        this.params.more = resp.data.more;
                        this.params.page++;
                        return resp;
                    }).catch(()=>{
                        this.loading = false;
                        this.refreshing = false;
                        this.finished = true;
                    })
            },

            onLoad() {
                this.getCarts().then(resp => {
                    this.carts.push(...resp.data.data);
                    this.$forceUpdate();
                })
            },

            refresh() {
                this.params.page = 1;
                return this.getCarts().then(resp => {
                    this.carts = resp.data.data;
                    this.$forceUpdate();
                })
            },

            //下拉刷新
            onRefresh() {
                this.finished = false;
                this.loading = true;
                this.refresh();
            },

            //详情页
            onClick(v) {
                console.log(v);
                this.$router.push({name: 'GoodsDetail', params: {id: v}})
            },

            //全选反选
            onSelectAll() {
                if (!this.isAll) {
                    this.$refs.cbg.toggleAll(true);
                } else {

                    this.$refs.cbg.toggleAll(false);
                }
            },

            //选择
            onSelectChange(val) {
                this.isAll = val.length === this.carts.length;

                if(this.editMode){
                   return;
                }
                if(this.ignoreChangeEvent){
                    this.ignoreChangeEvent = false;
                    return;
                }
                this.calculateTotalPrice(val)
            },

            //计算总价
            calculateTotalPrice(val){
                if(this.$common.empty(val)){
                    this.totalPrice = 0;
                    return;
                }
                calculate(val)
                    .then(resp => {
                        this.totalPrice = resp.data.totalPrice;
                    })
            },


            //进入编辑模式
            enterEditMode() {
                this.editMode = true;
            },

            //退出编辑模式
            exitEditMode() {
                this.editMode = false;
            },

            //单项移除
            onRemoveItem(val){
                console.log(val);
                 remove([val])
                    .then(()=>{
                        this.carts = this.carts.filter((v)=>{
                            this.ignoreChangeEvent = true;
                            return  val !== v.id;
                        });
                        let p =this.result.indexOf(val);

                        p !== -1 && this.result.splice(p,1);

                        this.calculateTotalPrice(this.result);
                    })
            },

            //移除购物车
            onRemove(){

                remove(this.result)
                    .then(()=>{
                        this.carts = this.carts.filter((v)=>{
                            return -1 === this.result.indexOf(v.id);
                        });
                        this.result = [];
                        this.isAll = false;
                        this.calculateTotalPrice(this.result);
                    })
            },

            //数量变化
            onCountChange(val,detail){
                if(this.$common.empty(val)){
                    return;
                }
                if(-1 === this.result.indexOf(detail.name)){
                    this.ignoreChangeEvent = true;
                    this.result.push(detail.name);
                }
                modify({count:val,cart_id:detail.name})
                    .then(()=>{
                        this.calculateTotalPrice(this.result)
                    })

            },

            //去结算
            goToBuy(){
                let data = [];
                this.result.forEach((v)=>{
                    this.carts.forEach((vv)=>{
                       if(vv.id === v){
                           data.push({cart_id:vv.id,goods_id:vv.goods_id,spec_id:vv.spec_id || 0,count:vv.count})
                            return;
                       }
                    });
                });
                if(this.$common.empty(data)){
                    return;
                }
                sessionStorage.setItem('confirm_goods',JSON.stringify(data));
                this.$router.push({name:'ConfirmOrder'});
            }
        }
    }
</script>
<style scoped>
    .container {
        background-color: #eee;
    }

    .item {
        padding: 5px 0;
        display: flex;
    }

    .thumbnail {
        width: 3rem;
        height: 3rem;
    }

    .info {
        padding: 0 5px;
        flex-grow: 1;
        text-align: left;
    }

    .title {
        font-size: .4rem;
        line-height: .5rem;
        color: #333;
    }

    .price {
        color: #e93b3d;
        font-size: .4rem;
    }

    .sku_text {
        background-color: #eee;
        border-radius: 10px;
        padding: 4px 10px;
        margin-bottom: 10px;
    }

    .info-item {
        margin-bottom: 5px;
    }

    .cb {
        display: flex;
        padding: 0 10px;
    }

    .bottomBar {
        position: fixed;
        bottom: 1.33333rem;
        padding: 5px 10px;
        background: hsla(0, 0%, 100%, .95);
        display: flex;
        width: 100%;
    }

    .priceInfo {
        flex-grow: 5;
        text-align: right;
        padding-right: .45rem;
        font-size: .4rem;
        line-height: 1rem;
        height: 1rem;
    }

    .totalText {
        font-weight: 700;
        vertical-align: middle;
    }

    .totalPrice {
        vertical-align: middle;
        color: #f2270c;
    }

    .btn-submit {
        margin-right: .45rem;
        height: 1rem;
        line-height: 1rem;
    }

    .head-bar {
        text-align: right;
        background-color: white;
        margin-bottom: 15px;
    }

    .cart-list {
        background-color: white;
    }

    .head-bar-item {
        line-height: .8rem;
        font-size: .35rem;
        height: .8rem;
        display: inline-block;
        padding-right: 10px;
    }

    .modify{
        display: flex;
        height: 1rem;
        line-height: 1rem;
    }

    .modify-item{
        flex-grow: 1;
    }
</style>
