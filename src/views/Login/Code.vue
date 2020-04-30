<template>
    <div>
        <van-form @submit="onSubmit" ref="form1">
            <van-field
                    v-model="code"
                    label-align="right"
                    center
                    label="短信验证码"
                    name="code"
                    placeholder="请输入短信验证码"
                    :rules="[{ required:true,message:codeVM,trigger:'onBlur' }]"
            />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" :disabled="isCodeNull">提交</van-button>
                </div>

        </van-form>
    </div>
</template>

<script>
    import {registerByCode} from '@/api/user';
    import {validPhoneNumber} from "../../utils/validate";

    export default {
        name: "RegisterCode",

        data() {
            return {
                code: "",
                phone: "",
                codeVM: "验证码不能为空",
                phoneVM:"",
            }
        },

        created() {
            this.phone = this.$route.query.phone;
        },

        computed: {

            isCodeNull() {
                return !this.codeValidator(this.code);
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

            //验证码验证
            codeValidator(val) {
                if (val && val !== '') {
                    return true;
                }
                this.codeVM = '验证码不能为空';
                return false;
            },
            //注册
            onSubmit() {

                if (this.codeValidator(this.code)) {
                    registerByCode({phone: this.phone, code: this.code})
                }
            },
        }
    }
</script>

<style scoped>

</style>
