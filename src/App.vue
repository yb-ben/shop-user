<template>
    <div id="app">
        <van-nav-bar
                v-show="showNavbar"
                :title="getPageTitle"
                left-text="返回"
                right-text="..."
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
        <van-action-sheet v-model="show" :actions="getActions" @select="onActionSheetSelect"/>
        <router-view/>

<!--        <van-loading v-if="loading" type="spinner" class="global-loading"></van-loading>-->
    </div>
</template>
<script>

  import { mapGetters } from 'vuex'
    export default {

        data() {
            return {
                show: false,
            }
        },
        created() {

        },


        computed: {
            ...mapGetters([
              'isOnline','loading','showNavbar'
            ]),
            getActions() {
                return [
                  {
                    name:'关于我们',
                    action: null
                  },
                  this.isOnline &&{
                    name: '退出登录',
                    action: () => {
                      this.$store.dispatch('user/logout')
                              .then(() => {
                                this.$router.replace({name: 'Home'})
                              })
                    }
                  }
                ].filter(function(v){ return Boolean(v); })
            },

            getPageTitle() {
                if (this.$route.meta && this.$route.meta.title) {
                    return this.$route.meta.title;
                }
                return '';
            }
        },


        methods: {
            onClickLeft() {
                this.$router.back();
            },
            onClickRight() {
                console.log(2)
                this.show = true;
            },
            onActionSheetSelect(item) {

                this.show = false;
                item.action && item.action();
            },


        }
    }
</script>
<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    .global-loading{
        position: fixed;
        top:50%;
        left: 0;
        right: 0;
        z-index: 999;
    }
</style>
