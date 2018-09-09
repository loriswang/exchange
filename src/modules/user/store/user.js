const user = {
    state: {
        user: 'test',
        token: '',
        email: '',
        mobile: ''
    },
    getters: {
        user: state => state.user,
        token: state => state.token,
        email: state => state.email,
        mobile: state => state.mobile
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USER: (state, user) => {
            state.user = user
        },
        SET_EMAIL: (state, email) => {
            state.email = user
        },
        SET_MOBILE: (state, mobile) => {
            state.mobile = user
        }
    },
    actions: {
        setUser({commit}, user) {
            commit('SET_USER', user)
        },
        setToken({commit}, token) {
            commit('SET_TOKEN', token)
        },
        setEmail({commit}, email) {
            commit('SET_EMAIL', email)
        },
        setMobile({commit}, mobile) {
            commit('SET_MOBILE', mobile)
        }
    }
}

export default user
