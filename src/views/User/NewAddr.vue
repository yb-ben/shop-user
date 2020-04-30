<template>
    <div>
        <van-nav-bar
                :title="getPageTitle"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
        />
        <van-address-edit
                :area-list="areaList"
                :show-delete="isEdit"
                show-set-default
                show-detail
                :address-info="info"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @delete="onDelete"
        />
    </div>
</template>

<style scoped>

</style>
<script>
    import {add,del,save } from '@/api/addr';

    import {AddressEdit} from 'vant';
    import areaList from '@/utils/area';

    export default {
        name: "NewAddr",
        components: {
            [AddressEdit.name]: AddressEdit
        },
        data() {
            return {
                isEdit:false,
                areaList,
                info:{}
            }
        },


        created() {
            this.closeGlobalNavBar();
            this.isEditMode()

        },


        beforeRouteLeave(to, from, next) {
            this.showGlobalNavBar();
            next();
        },

        computed: {
            getPageTitle() {
                if (this.$route.meta && this.$route.meta.title) {
                    return this.$route.meta.title;
                }
                return '';
            }
        },

        methods: {
            isEditMode(){
                let addr = sessionStorage.getItem('edit_addr');
                if(this.$common.empty(addr)){
                    this.isEdit = false;
                    return;
                }
                let d = JSON.parse(addr);
                d.areaCode = ''+d.county_id;
                d.addressDetail = d.addr_detail;
                d.tel = d.phone;
                this.info = d;
                this.isEdit = true;
            },

            onClickLeft() {
                this.$router.replace({name: 'Addr'});
            },
            closeGlobalNavBar() {
                this.$store.dispatch('navbar/turnOff');
            },

            showGlobalNavBar() {
                this.$store.dispatch('navbar/turnOn');
            },

            onSave(content) {
                let d = {
                    name: content.name,
                    phone: content.tel,
                    province_id: content.areaCode.substr(0, 2) + '0000',
                    city_id: content.areaCode.substr(0, 4) + '00',
                    county_id: content.areaCode,
                    addr_detail: content.addressDetail,
                    default: content.isDefault ? 1 : 0,
                    addr_full: content.province + content.city + content.county + content.addressDetail
                };
                if(this.isEdit){
                    save(this.info.id,d).then(()=>{
                        this.onClickLeft();
                    }).catch((r)=>{
                        console.log(r);
                    })
                }else{

                    add(d).then(() => {
                        this.onClickLeft();
                    }).catch((r)=>{
                        console.log(r);
                    })
                }
            },

            //删除
            onDelete() {
                this.$toast('delete')
                    .then(()=>{
                        del(this.info.id)
                    }).then(()=>{
                        this.onClickLeft();
                });
            },

        },
    }
</script>

