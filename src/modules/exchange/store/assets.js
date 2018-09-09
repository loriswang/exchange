// 资产
const assets = {
    state: {
        assets: {}
    },
    getter: {
        assets: state => state.assets
    },
    mutations: {
        SET_ASSETS: (state, assets) => {
            state.assets = assets
        }
    },
    actions: {
        setAssets ({commit}, assets) {
            commit('SET_ASSETS', assets)
        }
    }
}
export default assets