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
      <van-field
        v-model="code"
        label-align="right"
        center
        label="短信验证码"
        name="code"
        placeholder="请输入短信验证码"
        :rules="[{ message:codeVM,trigger:'onBlur' }]"

      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="onGetCode"
            :text="getSendCodeButtonText"
            :disabled="canSendCode"
            native-type="button"
          ></van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" :disabled="isCodeNull">提交</van-button>
      </div>
      <div class="reg">
        <span class="reg-item"></span>
        <span class="reg-item" style="text-align: right" @click="onRegister">手机快速注册</span>
      </div>
    </van-form>

  </div>
</template>
<style>
  .reg{
    display: flex;
    margin:16px;
    font-size: .44rem;
    color: rgba(0,0,0,.4);
  }
  .reg-item{
    flex-grow: 1;
  }
</style>
<script>
import { login } from "@/api/user";
import { code } from "@/api/common";
import Timer from "@/utils/timer";
import {validPhoneNumber} from "../../utils/validate";

export default {
  name: "Login",
  data() {
    return {
      phone: "",
      code: "",

      phoneVM: "",
      codeVM: "验证码不能为空",


      codeTriggerStatus: 0,


    };
  },

  computed: {
    getSendCodeButtonText() {
      return this.canSendCode ? this.codeTriggerStatus + "秒" : "发送验证码";
    },

    canSendCode() {
      return this.codeTriggerStatus > 0;
    },

    isCodeNull(){
      return !this.codeValidator(this.code);
    }

  },


  methods: {
    //登录
    onSubmit() {
      if(!this.codeValidator(this.code) ){

          return;
      }
      login({ phone: this.phone, code: this.code })

    },

    //手机号验证
    phoneValidator(val) {
      if (!validPhoneNumber(val)) {
        this.phoneVM = "手机号码有误";
        return false;
      }
      return true;
    },

    //验证码验证
    codeValidator(val){
      if( val && val !== ''){
        return true;
      }
      this.codeVM = '验证码不能为空';
      return false;
    },

    //获取消息验证码
    getCode() {
      if (this.canSendCode) {
        code(this.phone).then(() => {
          new Timer(
            () => {
              this.codeTriggerStatus--;
            },
            1000,
            60000
          );
        });
      }
    },

    turnOnSendCode() {
      this.codeTriggerStatus = 60;
    },

    onGetCode() {
      if (this.phoneValidator(this.phone)) {
        this.turnOnSendCode();
        this.getCode();
      }
    },

    //go to register page
    onRegister(){
      this.$router.push('/register/phone')
    }


  }
};
</script>
