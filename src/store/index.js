import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'
import app from '@/modules/user/store/app'
import user from '@/modules/user/store/user'
import assets from '@/modules/exchange/store/assets'
import exchange from '@/modules/exchange/store/exchange'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        app,
        user,
        assets,
        exchange
    }
})

export default store
