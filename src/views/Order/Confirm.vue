<template>

    <div class="container">
        <div>
            <div class="addr container-div" @click="selectAddr">
                <p v-if="!addr">请选择收货地址</p>
                <ul v-else>
                    <li>
                        <strong>{{ addr.name }}</strong>
                        <strong>{{addr.phone}}</strong>
                        <span class="isdefault" v-if="addr.isDefault">默认</span>
                    </li>
                    <li>{{addr.addr_full}}</li>
                </ul>
            </div>
            <div class="container-div list">
                <div class="item" v-for="(v) in goods" :key="v.id">

                    <van-image class="thumbnail" :src="v.image_url"></van-image>
                    <div class="info">
                        <div class="info-item title">{{ v.title}}</div>
                        <div class="info-item price">
                            <span style="flex-grow: 1">￥{{ (v.specs && v.specs.length>0) ? v.specs[0].price :v.price}}</span>
                            <span>× {{ v.submit_count }}</span>
                        </div>
                        <template v-if="v.specs && v.specs.length>0">
                            <div class="info-item "><span class="sku_text">{{v.specs[0].sku_text}}</span></div>
                        </template>

                    </div>
                </div>
            </div>
            <div class="container-div money-info">
                <div class="money-info-item">
                    <p class="money-info-item-title">商品金额</p>
                    <p class="money-info-item-value" style="color: black">￥{{totalPrice}}</p>
                </div>
                <div class="money-info-item">
                    <p class="money-info-item-title">运费</p>
                    <p class="money-info-item-value">+ ￥0.00</p>
                </div>
            </div>
            <div class="bottomBar">
                <div class="priceInfo">
                    <span class="totalText">总价：</span>
                    <span class="totalPrice">￥{{totalPrice}}</span>
                </div>
                <van-button class="btn-submit" :disabled="isSubmit" round type="danger" @click="onSubmit">提交订单</van-button>

            </div>
        </div>

    </div>
</template>
<style scoped>
    .container {
        background-color: #eee;
        overflow: hidden
    }

    .container-div {
        margin-bottom: 10px;
        background-color: white;
    }


    .addr {
        height: 1.2rem;
        text-align: left;
        padding: 5px 10px;
        font-size: .35rem;
    }
    .isdefault{
        border-radius: 5px;
        background-color: #eb3c3c;
        color: white;
        padding: 0 5px;
    }

    .item {
        padding: 5px 10px;
        display: flex;
        background-color: white;
        border-radius: 5px;
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
        display: flex;
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

    .bottomBar {
        position: fixed;
        bottom: 0;
        padding: 5px 10px;
        background: hsla(0, 0%, 100%, .95);
        display: flex;
        width: 100%;
    }

    .priceInfo {
        flex-grow: 5;
        text-align: left;
        padding-right: .45rem;
        font-size: .4rem;
        line-height: .7rem;
        height: .7rem;
    }

    .totalText {
        font-weight: 700;
        vertical-align: middle;
    }

    .totalPrice {
        vertical-align: middle;
        color: #f2270c;
        font-size: .6rem;
        font-weight: 600;
    }

    .btn-submit {
        margin-right: .45rem;
        height: .7rem;
        line-height: .7rem;
    }

    .money-info {
        padding: 5px 0;
    }

    .money-info-item {
        display: flex;
        padding: 2px 10px;
    }

    .money-info-item > p {
        margin: 0;
        font-weight: 500;

    }

    .money-info-item-title {
        flex: 1;
        text-align: left;
    }

    .money-info-item-value {
        text-align: right;
        color: #f2270c;

    }
</style>
<script>
    import {calculate,submit} from "../../api/order";
    import {getDefault} from "../../api/addr";

    export default {
        name: "Confirm",

        data() {
            return {
                isSubmit: false,
                params: {},
                goods: [],
                totalPrice: 0.00,
                addr: null,
            }
        },


        created() {
            this.setData();
            this.goodsInfo();
            this.setAddr();
        },

        methods: {
            goodsInfo() {
                calculate(this.params)
                    .then((resp) => {
                        let d = resp.data;
                        this.goods = d.items;
                        this.totalPrice = d.totalPrice
                    })
            },

            setData(){
                this.params.data = JSON.parse(sessionStorage.getItem('confirm_goods')) || [];
            },

            //设置地址
            setAddr(){
                let addr = sessionStorage.getItem('selected_addr');
                if(this.$common.empty(addr)){
                    this.getDefaultAddr();
                }else{
                    this.addr = JSON.parse(addr);
                }
            },

            //默认 地址
            getDefaultAddr() {
                getDefault()
                    .then((resp) => {
                        if (!this.$common.empty(resp.data)) {
                            let d =resp.data;
                            d.isDefault = d.default > 0;
                            this.addr = d;
                        }
                    })
            },

            //选择收货地址
            selectAddr() {
                this.$router.push({name: 'Addr'});
            },

            onSubmit(){
                this.isSubmit = true;
                let d = {};
                d.data = this.params.data;
                d.addr_id = this.addr.id;
                d.price = this.totalPrice * 100;

                submit(d)
                    .then((resp)=>{

                        this.isSubmit = false;
                        this.$router.replace({name:'Payment',query:{order_id:resp.data.id,totalPrice:this.totalPrice}})
                 }).catch(()=>{
                    this.isSubmit = false;
                });
            }
        },

        beforeRouteLeave(to, from, next) {
            if (to.name === 'Addr') {
                console.log(to);
                from.meta.keepAlive = true;
            } else {
                from.meta.keepAlive = false;
                this.$destroy();
            }
            next();
        }
    }
</script>

