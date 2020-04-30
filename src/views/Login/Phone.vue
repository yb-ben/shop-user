<template>
    <div>
        <van-form @submit="onSubmit" ref="form1">
            <van-field
                    v-model="phone"
                    label-align="right"
                    label="手机号"
                    placeholder="请输入手机号"
                    name="phone"
                    :rules="[{required:true ,validator:phoneValidator , message:phoneVM,trigger:'onBlur' }]"
            />

            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" :disabled="isPhone">下一步</van-button>
            </div>

        </van-form>
    </div>
</template>

<script>
    import { code } from "@/api/common";
    import {validPhoneNumber} from "../../utils/validate";

    export default {
        name: "RegisterPhone",
        data() {
            return {
                phone: "",

                phoneVM: "",

            };
        },

        computed: {

            isPhone(){
                return !this.phoneValidator(this.phone);
            }

        },


        methods: {


            //手机号验证
            phoneValidator(val) {
                if (!validPhoneNumber(val)) {
                    this.phoneVM = "手机号码有误";
                    return false;
                }
                return true;
            },

            //获取消息验证码
            getCode() {
                return code(this.phone);
            },

            onSubmit() {
                if (this.phoneValidator(this.phone)) {
                    this.getCode().then(()=>{
                        this.$router.push({name:'RegisterCode',query:{phone:this.phone}})
                    });
                 }
            },

        }
    };
</script>

<style scoped>

</style>
