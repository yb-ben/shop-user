<template>
    <div style="text-align: left">
        <van-swipe class="my-swipe" :autoplay="5000" :loop="false" indicator-color="white">
            <van-swipe-item v-for="(v) in gallery" :key="v.id">
                <van-image style="width: 100%;height: 239px" :src="v.image_url"></van-image>
            </van-swipe-item>
        </van-swipe>
        <van-sku
                v-model="show"
                :goods="goods"
                :sku="sku"
                :goods-id="id"
                ref="sku"
                @sku-selected="onSkuSelected"
                @sku-prop-selected="onSkuPropSelected"
        >
            <template #sku-header-price="props" >
                <div class="van-sku__goods-price" >
                    <span class="van-sku__price-symbol">￥</span>
                    <span class="van-sku__price-num">{{ props.price }}</span>
                </div>
            </template>

            <template #sku-actions="">
                <div class="van-sku-actions">
                    <van-button square size="large" type="warning" @click="onSubmit">确定</van-button>
                </div>
            </template>
        </van-sku>
        <van-goods-action>
            <van-goods-action-icon icon="cart-o" text="购物车" @click="goToCart"/>
            <van-goods-action-button
                    type="warning"
                    text="加入购物车"
                    @click="onClickAddCart"
            />
            <van-goods-action-button
                    type="danger"
                    text="立即购买"
                    @click="onClickBuy"
            />
        </van-goods-action>
    </div>
</template>
<style>
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
</style>
<script>
    import {GoodsAction, GoodsActionIcon, GoodsActionButton, Sku} from 'vant';
    import {goodsDetail} from "../../api/goods";
    import { add } from "../../api/cart";
    import {Swipe, SwipeItem,Notify} from 'vant';

    export default {
        name: "GoodsDetail",
        components: {
            [GoodsAction.name]: GoodsAction,
            [GoodsActionIcon.name]: GoodsActionIcon,
            [GoodsActionButton.name]: GoodsActionButton,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Sku.name]: Sku,
            [Notify.name]:Notify
        },
        data() {
            return {
                buyImmediately:false,
                show: false,
                id: null,
                gallery: [],
                goods: {
                    picture: 'https://img.yzcdn.cn/1.jpg'
                },
                price: 0,
                sku: {
                    tree: [],
                    list: [],
                    none_sku:false,
                    price:'0.00',
                    collection_id:0,
                    stock_num:0
                },

            }
        },

        created() {
           this.getData(this.$route.params.id)
        },

        methods: {
            getData(id) {
                return goodsDetail(id)
                    .then((resp) => {
                        let d = resp.data;

                        if(!this.$common.empty(d.spu)){

                            d.spu.forEach((v,i) => {
                                v.values.forEach((vv)=>{
                                    vv.name = vv['v'];
                                    vv.id = String(vv['v_id']);
                                    if(vv['image_url']){
                                        vv.imgUrl = vv['image_url'];
                                        vv.previewImgUrl = vv['image_url'];
                                    }
                                });
                                v.v = v.values;
                                v.k_s = 'k' + (i+1) + '_id';

                            });
                            d.specs.forEach((v) => {
                                let keys = Object.keys(v.sku);
                                keys.forEach((vv) => {
                                    let r = /^k(\d+)_id$/.exec(vv)
                                    if (r) {
                                        v[vv] = String(v.sku['v'+r[1]+'_id']);
                                    }

                                });
                                v.stock_num = v.count;
                                v.price = parseFloat(v.price)*100;

                            });
                            this.$set(this.sku,'tree',d.spu);
                            this.$set(this.sku,'list',d.specs);
                            this.none_sku = false;
                        }else{
                            this.none_sku = true;
                        }
                        if(this.$common.empty(d.gallery)){
                            d.gallery.push({image_url:d.image_url})

                        }


                        this.id = d.id;
                        this.goods.picture = d.image_url;
                        this.gallery = d.gallery;
                        this.goods.price = d.price;
                        this.goods.line_price = d.line_price;
                        this.sku.price = d.price;
                        this.sku.line_price = d.line_price;

                        this.$set(this.sku,'stock_num',d.count);
                        this.$set(this.sku,'collection_id',d.id);
                        //this.sku.tree = d.spu;
                        //this.sku.list = d.specs;
                       // // this.properties = d.spu;
                       //  this.sku.stock_num = d.count;
                       //  this.sku.collection_id = d.id;

                    })
            },

            //弹出sku
            onClickAddCart() {
                this.show = true;
                this.buyImmediately = false;
            },

            //立即购买
            onClickBuy(){
                this.show = true;
                this.buyImmediately = true;

            },


            //提交
            onSubmit(){
              let skuData = this.$refs.sku.getSkuData()
                console.log(skuData);
              if((!skuData.selectedNum) && (!this.none_sku)){

                  return;
              }
                if(this.buyImmediately){
                    //立即购买
                    sessionStorage.setItem('confirm_goods',JSON.stringify([{
                        goods_id:skuData.goodsId,
                        count:skuData.selectedNum,
                        spec_id:this.none_sku?null:skuData.selectedSkuComb.id
                    }]));
                    this.$router.push({name:'ConfirmOrder'});
                }else{
                    let params = {
                        goods_id:skuData.goodsId,
                        count:skuData.selectedNum,
                        spec_id:null
                    };
                    if(!this.none_sku){
                        params.spec_id = skuData.selectedSkuComb.id;
                    }
                    add(params)
                        .then(()=>{
                            Notify({type:'success',message:'添加成功',duration:1000});
                        });
                }
            },

            onSkuSelected(skuValue,selectedSku,selectedSkuComb){
                console.log(skuValue);
                console.log(selectedSku);
                console.log(selectedSkuComb);
            },

            onSkuPropSelected(skuValue,selectedSku,selectedSkuComb){
                console.log(skuValue);
                console.log(selectedSku);
                console.log(selectedSkuComb);
            },

            //跳转到购物车
            goToCart(){
                this.$router.push({name:'Cart'});
            }

        }

    }
</script>

<style scoped>

</style>
