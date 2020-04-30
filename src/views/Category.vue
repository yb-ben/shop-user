<template>
    <div class="category">
      <van-sidebar class="left-side" v-model="currCate" @change="setLeftSide">
        <van-sidebar-item v-for="(v,i) in cates" :key="i" :title="v.name" />

      </van-sidebar>
      <div class="right-side">
        <template v-if="p && p.nodes && p.nodes.length > 0">
          <div v-for="(v,i) in p.nodes" :key="i">
          <div class="second-title">{{ v.name }}</div>
          <div class="flex-div">
            <template v-if="v.nodes">
            <div class="flex-group-1" v-for="(vv,ii) in v.nodes" :key="ii"  @click="onClick(vv)">
              <van-image style="width: 2rem;height: 2rem" :src="vv.image"></van-image>
              <div>{{ vv.name }}</div>
            </div>
            </template>
          </div>
        </div>
        </template>
      </div>
    </div>
</template>
<style>
  .category {
    display: flex;
  }
  .flex-div{
    display: flex;
    padding: 10px;
  }
  .left-side{
    flex-grow: 1;
  }
  .flex-group-1{
    flex-grow: 1;
  }
  .right-side{
    flex-grow: 30;
    padding-left: 5px;
  }
  .second-title{
    font-size: 14px;
    color: #333;
    text-align: left;
  }
</style>
<script>
    import {cateLists} from "../api/category";
    import { Sidebar, SidebarItem } from 'vant';
    export default {
        name: 'Category',
        components: {
          [Sidebar.name]:Sidebar,
          [SidebarItem.name]:SidebarItem
        },

        created() {

          cateLists()
                  .then((res)=>{
                    this.cates = res.data;
                    this.setLeftSide(0);
                  })
          ;
        },
        data() {
            return {
              cates:[],
              currCate: -1,
              p:null
            };
        },
        methods: {

          setLeftSide(index){
              this.currCate = index;
              this.p = this.cates[index];
              this.$forceUpdate()
          },
          // renderRightSight(){
          //   this.cates.forEach((x,v)=>{
          //
          //   })
          // }

          onClick(args){
              let cate_id = args.id;
              this.$router.replace({name:'GoodsList',params:{cate_id}})
          }
        }
    };
</script>
