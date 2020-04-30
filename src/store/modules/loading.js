import {Toast} from "vant";
const state ={

    loading:false
};

const mutations = {

    TURN_ON:function (state) {
        state.loading = true;
    },
    TURN_OFF:function (state) {
        state.loading = false;
    }
};

const actions = {
    turnOn:function ({commit}) {
        commit('TURN_ON');
        Toast.loading({
            message:'加载中...',
        })
    },
    turnOff:function ({commit}) {
        commit('TURN_OFF')
        Toast.clear();
    }
}

export default {
    namespaced:true,
    state,mutations,actions
}
