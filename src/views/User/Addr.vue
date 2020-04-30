<template>
    <div>
        <van-nav-bar
                :title="getPageTitle"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
        />
        <van-address-list
                v-model="chosenAddressId"
                :list="addrs"
                default-tag-text="默认"
                @add="onNewAddr"
                @edit="onEdit"
                @select="onSelect"
        />

    </div>
</template>

<script>

    import { AddressList } from 'vant';
    import {list} from "../../api/addr";

    export default {
        name: "Addr",
        components:{
          [AddressList.name]:AddressList
        },
        data() {
            return {
                chosenAddressId:null,
                addrs: []
            }
        },

        created() {

            this.closeGlobalNavBar();
            this.setChosenAddressId();
            this.getUserAddr();
        },

        mounted(){
        },


        beforeRouteLeave(to,from,next) {
            this.showGlobalNavBar();
            next();
        },


        computed:{
            getPageTitle() {
                if (this.$route.meta && this.$route.meta.title) {
                    return this.$route.meta.title;
                }
                return '';
            }
        },

        methods: {
            onClickLeft() {
                this.$router.replace({name:'ConfirmOrder'});
            },


            setChosenAddressId(){
                this.chosenAddressId = this.$route.params.addr_id || null;
            },

            //获取地址
            getUserAddr() {
                list().then(resp => {
                    let d  = resp.data;
                    d.forEach((v,i)=>{
                        v.tel = v.phone;
                        v.address = v.addr_full;
                        v.isDefault =  i===0;
                    });
                    this.addrs = d;

                    if((!this.chosenAddressId) && d.length > 0){
                        this.chosenAddressId = d[0].id
                    }
                })
            },

            closeGlobalNavBar() {
                this.$store.dispatch('navbar/turnOff');
            },

            showGlobalNavBar() {
                this.$store.dispatch('navbar/turnOn');
            },
            //新增收货地址
            onNewAddr(){
                this.$router.push({name:'NewAddr'})
            },

            onEdit(item){
                sessionStorage.setItem('edit_addr',JSON.stringify(item))
                this.$router.push({name:'NewAddr'});
            },

            onSelect(item){
                sessionStorage.setItem('selected_addr',JSON.stringify(item));
                this.$router.push({name:'ConfirmOrder'});
            }
        },




    }
</script>

