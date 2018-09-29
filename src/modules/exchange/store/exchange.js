// 资产
const exchange = {
    state: {
        buyPrice: 0,
        buyNumber: 0,
        buyTotalPrice: 0,
        sellPrice: 0,
        sellNumber: 0,
        sellTotalPrice: 0
    },
    getter: {
        buyPrice: state => state.buyPrice,
        buyNumber: state => state.buyNumber,
        buyTotalPrice: state => state.buyTotalPrice,
        sellPrice: state => state.sellPrice,
        sellNumber: state => state.sellNumber,
        sellTotalPrice: state => state.sellTotalPrice
    },
    mutations: {
        SET_BUY_PRiCE: (state, buyPrice) => {
            state.buyPrice = buyPrice
        },
        SET_BUY_NUMBER: (state, buyNumber) => {
            state.buyNumber = buyNumber
        },
        SET_BUY_TOTAL_PRICE: (state, buyTotalPrice) => {
            state.buyTotalPrice = buyTotalPrice
        },
        SET_SELL_PRICE: (state, sellPrice) => {
            state.sellPrice = sellPrice
        },
        SET_SELL_NUMBER: (state, sellNumber) => {
            state.sellNumber = sellNumber
        },
        SET_SELL_TOTAL_PRICE: (state, sellTotalPrice) => {
            state.sellTotalPrice = sellTotalPrice
        }
    },
    actions: {
        buyPrice({commit}, buyPrice) {
            commit('SET_BUY_PRiCE', buyPrice)
        },
        buyNumber({commit}, buyNumber) {
            commit('SET_BUY_NUMBER', buyNumber)
        },
        buyTotalPrice({commit}, buyTotalPrice) {
            commit('SET_BUY_TOTAL_PRICE', buyTotalPrice)
        },
        sellPrice({commit}, sellPrice) {
            commit('SET_SELL_PRICE', sellPrice)
        },
        sellNumber({commit}, sellNumber) {
            commit('SET_SELL_NUMBER', sellNumber)
        },
        sellTotalPrice({commit}, sellTotalPrice) {
            commit('SET_SELL_TOTAL_PRICE', sellTotalPrice)
        }
    }
}
export default exchange