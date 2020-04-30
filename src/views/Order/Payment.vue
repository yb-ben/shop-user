<template>
    <div class="container">
        <div class="left-align">
        <p>订单金额：{{totalPrice}}</p>
        <p>订单号{{orderId}}</p>
            <p><van-count-down :time="countDown"></van-count-down></p>
        </div>
        <div>
            <ul>
                <van-radio-group v-model="selected">
                <li v-for="(v) in list" :key="v.id">
                    <van-radio :name="v.id">{{v.name}}</van-radio>
                </li>
                </van-radio-group>
            </ul>
        </div>

        <div><van-button type="danger" @click="onSubmit">立即支付</van-button></div>
    </div>
</template>
<script>
    import {methods , alipay_wap } from "../../api/payment";
    import {getOrderPaymentInfo} from "../../api/order";
    import {RadioGroup,Radio,CountDown} from 'vant';
    export default {
        name: "Payment",
        components:{
          [RadioGroup.name]:RadioGroup,
          [Radio.name]:Radio,
            [CountDown.name]:CountDown
        },
        data(){
            return{
                totalPrice:0,
                list:[],
                selected:null,
                orderId: null,
                ret:'',
                token:'',
                expired_at:null,
                countDown:null,


            }
        },

        created() {
            this.orderId =  this.$route.query.order_id;
            this.getOrderInfo();
            this.getPaymentMethods();
          },

        methods:{
            getPaymentMethods(){
                methods().then(resp=>{
                    this.list = resp.data;
                })
            },

            getOrderInfo(){
                getOrderPaymentInfo({oid:this.orderId})
                    .then((resp)=>{
                        let d = resp.data;
                        if(this.$common.empty(d)){
                            this.$router.replace({name:'Cart'})
                        }else{

                            this.totalPrice = d.total_price;
                            this.token = d._token;
                            this.expired_at = d.expired_at;
                            this.countDown = d.expired_at * 1000 - (new Date()).getTime()
                        }})
            },

            onSubmit(){

                switch (this.selected) {
                    case 1:
                        alipay_wap({order_id:this.orderId,_token:this.token})
                            .then(resp=>{
                                console.log(resp);
                                const div = document.createElement('div')
                                /* 此处form就是后台返回接收到的数据 */
                                div.innerHTML = resp.data;
                                document.body.appendChild(div)
                                document.forms[0].submit()
                            });
                        break;

                }

            },


        }
    }
</script>

<style scoped>
 .container{
     padding: 0 20px;
 }
    .left-align{
        text-align: left;
    }
</style>
