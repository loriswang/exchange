import http from '@/utils/http'

export function getAssets() {
    return http({
        url: '/v1/wallet/account/balance',
        method: 'get'
    })
}
export function getSymbols() {
    return http({
        url: '/v1/common/symbols',
        method: 'get'
    })
}
// 提交委托
export function sendMessage(submitData) {
    const data = submitData
    return http({
        url: '/v1/trade/orders',
        method: 'post',
        data
    })
}

// 获取委托列表
export function exchangeList(state) {
    const data = state
    console.log(`/v1/trade/orders?state=${data}`)
    return http({
        url: `/v1/trade/orders?state=${data}`,
        method: 'get'
    })
}

// 获取委托uuid详情
export function exchangeItem(id) {
    return http({
        url: `/v1/trade/orders/${id}`,
        method: 'get'
    })
}

// 撤销委托
export function exchangeChanel(id) {
    const data = {
        uuid: id
    }
    return http({
        url: '/v1/trade/orders/cancel',
        method: 'post',
        data
    })
}

// 获取盘口信息
export function getHandicap() {
    return http({
        url: '/v1/market/zltest/depth',
        method: 'get'
    })
}

// 获取价格信息
export function getPrice() {
    return http({
        url: '/v1/market/zltest/ticker',
        method: 'get'
    })
}

// "fill_fees": "0.000000000000000000",  // 手续费
// "filled_amount": "0.000000000000000000",  // 填充量
// "executed_value": "0.000000000000000000", // 成交总量