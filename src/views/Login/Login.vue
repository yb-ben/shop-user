<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field v-model="phone" label-align="right" label="手机号" placeholder="请输入手机号" 
        :rules="[{ phoneValidator , phoneVM }]"
      />
      <van-field v-model="code" label-align="right" center clearable label="短信验证码"
        :rules="[{ codeValidator , codeVM }]"
       placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
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

      phoneVM:"",
      codeVM:"",
    };
  },

  methods: {
    //登录
    onSubmit() {},

    phoneValidator(val){

    },

    codeValidator(val){

    }
  }
};
</script>