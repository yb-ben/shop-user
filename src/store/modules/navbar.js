
const state = {

    show:true,
}


const mutations = {

    TURN_ON:function (state) {
        state.show = true;
    },
    TURN_OFF:function (state) {
        state.show = false;
    }
};

const actions = {
    turnOn:function ({commit}) {
        commit('TURN_ON');

    },
    turnOff:function ({commit}) {
        commit('TURN_OFF')
    }
}

export default {
    namespaced:true,
    state,mutations,actions
}
