// 资产
const exchange = {
    state: {
        buyPrice: 0,
        buyNumber: 0,
        buyTotalPrice: 0,
        sellPrice: 0,
        sellNumber: 0,
        sellTotalPrice: 0,
        topPrice: 0,    // 顶部价钱
        exchangePrice: 0,    // 交易价钱
        selectSymbol: {},    // 当前选中交易币兑
        selectBuyWallet: {},
        selectSellWallet: {}
    },
    getter: {
        buyPrice: state => state.buyPrice,
        buyNumber: state => state.buyNumber,
        buyTotalPrice: state => state.buyTotalPrice,
        sellPrice: state => state.sellPrice,
        sellNumber: state => state.sellNumber,
        sellTotalPrice: state => state.sellTotalPrice,
        topPrice: state => state.topPrice,
        exchangePrice: state => state.exchangePrice,
        selectSymbol: state => state.selectSymbol,
        selectBuyWallet: state => state.selectBuyWallet,
        selectSellWallet: state => state.selectSellWallet
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
        },
        SET_TOP_PRICE: (state, topPrice) => {
            state.topPrice = topPrice
        },
        SET_EXCHANGE_PRICE: (state, exchangePrice) => {
            state.exchangePrice = exchangePrice
        },
        SET_SELECT_SYMBOL: (state, selectSymbol) => {
            state.selectSymbol = selectSymbol
        },
        SET_SELECT_BUY_WALLET: (state, selectBuyWallet) => {
            state.selectBuyWallet = selectBuyWallet
        },
        SET_SELECT_SELL_WALLET: (state, selectSellWallet) => {
            state.selectSellWallet = selectSellWallet
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
        },
        topPrice({commit}, topPrice) {
            commit('SET_TOP_PRICE', topPrice)
        },
        exchangePrice({commit}, exchangePrice) {
            commit('SET_EXCHANGE_PRICE', exchangePrice)
        },
        selectSymbol({commit}, selectSymbol) {
            commit('SET_SELECT_SYMBOL', selectSymbol)
        },
        selectBuyWallet({commit}, selectBuyWallet) {
            commit('SET_SELECT_BUY_WALLET', selectBuyWallet)
        },
        selectSellWallet({commit}, selectSellWallet) {
            commit('SET_SELECT_SELL_WALLET', selectSellWallet)
        }
    }
}
export default exchange