<template>
  <div>

    <router-view></router-view>
    <van-tabbar v-model="active" :fixed="true" route>
      <van-tabbar-item name="home" icon="home-o" :replace="false" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="category" icon="search" :replace="false" to="/category">分类</van-tabbar-item>
      <van-tabbar-item name="cart" icon="friends-o" :replace="false" to="/cart">购物车</van-tabbar-item>

      <van-tabbar-item  v-if="!token" name="login" icon="setting-o" :replace="false" to="/login">未登录</van-tabbar-item>
      <van-tabbar-item  v-if="token" name="my" icon="setting-o" :replace="false" to="/my">我的</van-tabbar-item>

    </van-tabbar>

  </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
import {mapGetters} from 'vuex';


export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,

  },


  created(){
  },

  computed:{

    ...mapGetters([
      'token'
    ])
  },

  data() {
    return {
      active: 0
    };
  },
  methods: {

  }
};
</script>
