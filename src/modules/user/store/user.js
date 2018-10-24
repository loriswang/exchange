const user = {
    state: {
        user: 'test',
        token: '',
        email: '',
        mobile: '',
        wallet: [],
        showWallet: {}
    },
    getters: {
        user: state => state.user,
        token: state => state.token,
        email: state => state.email,
        mobile: state => state.mobile,
        wallet: state => state.wallet,
        showWallet: state => state.showWallet
    },
    mutations: {
        SET_USER: (state, user) => {
            state.user = user
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_EMAIL: (state, email) => {
            state.email = email
        },
        SET_MOBILE: (state, mobile) => {
            state.mobile = mobile
        },
        SET_WALLET: (state, wallet) => {
            state.wallet = wallet
        },
        SET_SHOWWALLET: (state, showWallet) => {
            state.showWallet = showWallet
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
            console.log(email)
            commit('SET_EMAIL', email)
        },
        setMobile({commit}, mobile) {
            commit('SET_MOBILE', mobile)
        },
        setWallet({commit}, wallet) {
            commit('SET_WALLET', wallet)
        },
        showWallet({commit}, showWallet) {
            commit('SET_SHOWWALLET', showWallet)
        }
    }
}

export default user
