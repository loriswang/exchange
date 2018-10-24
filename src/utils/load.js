import Vue from 'vue'

const submit = '已撤销'
const unsubmit = '撤销失败'
const noEnough = '可用余额不足!'
const noEnoughPrice = '请输入价格!'
const noEnoughNum = '请输入数量!'
const yExchange = '已划转'
const noExchange = '划转失败'
export {submit, unsubmit, noEnough, noEnoughPrice, noEnoughNum, yExchange, noExchange}

export function showloadings() {
    Vue.$vux.loading.show({
        text: '加载中...'
    })
}
export function hideloadings() {
    Vue.$vux.loading.hide()
}
//            toast提示
export function showToasts(text, icon) {
    Vue.$vux.toast.show({
        type: icon,
        text: text,
        width: '9.6em',
        isShowMask: true,
        time: 3000
    })
}