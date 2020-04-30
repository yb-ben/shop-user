import { count } from '@/api/cart'
const getDefaultState = () => {
    return {
        count:0
    }
};

const state = getDefaultState();

const mutations = {

    SET_COUNT:(state,count)=>{
        state.count = count;
    },

    INCR_COUNT:(state,count) =>{
        state.count += count;
    },

    DECR_COUNT:(state,count) =>{
        state.count = count > state.count ? 0 :state.count - count;
    },
};

const actions = {
    setCount({commit}){
        return count().then(resp => {
                commit('SET_COUNT',resp.data);
            })
        },

    incrCount({commit},count){
        commit('INCR_COUNT',count);
    },
    decrCount({commit},count){
        commit('DECR_COUNT',count);
    }
};


export default {
    namespaced:true,
    state,
    mutations,
    actions
}
