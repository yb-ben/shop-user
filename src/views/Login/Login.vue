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
        :rules="[{ required:true , message:codeVM ,trigger:'onBlur'}]"
        placeholder="请输入短信验证码"
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
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Button } from "vant";
import { login } from "@/api/user";
import { code } from "@/api/common";
import Timer from "@/utils/timer";

export default {
  name: "Login",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data() {
    return {
      phone: "",
      code: "",

      phoneVM: "",
      codeVM: "验证码不能为空",

      phoneRegex: /^1[3456789]\d{9}$/,

      codeTriggerStatus: 0,

      
    };
  },

  computed: {
    getSendCodeButtonText() {
      return this.canSendCode ? this.codeTriggerStatus + "秒" : "发送验证码";
    },

    canSendCode() {
      return this.codeTriggerStatus > 0;
    }
  },

  // watch:{

  //   codeTriggerStatus(val){
  //     val || clearInterval(this.timer); //清除倒计时
  //   }
  // },

  methods: {
    //登录
    onSubmit() {
      login({ phone: this.phone, code: this.code })
      
    },

    //手机号验证
    phoneValidator(val) {
      if (!this.phoneRegex.test(val)) {
        this.phoneVM = "手机号码有误";
        return false;
      }
      return true;
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
    }
  }
};
</script>