<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" :fixed="true" route>
      <van-tabbar-item name="home" icon="home-o" replace to="/">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="search" replace to="/about">分类</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o" replace to="/test">购物车</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
//import main from './Main';

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
 
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {}
};
</script>
