import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getInfo } from '@/api/user'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
    }
}

const state = getDefaultState()


const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    }
}

const actions = {
    refreshToken({commit},token) {
        commit('SET_TOKEN', token);
        setToken(token);
    },
    //登录
    login({ commit }, userInfo) {
        const { phone, code } = userInfo
        return new Promise((resolve, reject) => {
            login({ phone, code }).then(res => {
                const { data } = res;
                commit('SET_TOKEN', data.token);
                setToken(data.token);
                resolve()
            }).catch(error => {
                reject(error);
            })
        })
    },

    //获取用户信息
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(resp => {
                const { data } = resp
                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { name, avatar } = data;

                commit('SET_NAME', name);
                commit('SET_AVATAR', avatar);
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken();
                commit('RESET_STATE');
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    },
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
