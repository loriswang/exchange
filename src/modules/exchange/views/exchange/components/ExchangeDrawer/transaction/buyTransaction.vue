<template>
    <div>
        <!--价格-->
        <NumberInput
                :min="0"
                :max="1000000000000000"
                :step="this.stepQuote"
                :tabIndex="this.tabIndex"
                :controls=0
                :unit="this.quote_currency"
                :value="this.quote_currency_price"
                :len="this.quote_len"
        />
        <!--数量-->
        <NumberInput
                :min="0"
                :max="100000000000000"
                :step="this.stepAmount"
                :tabIndex="this.tabIndex"
                :controls=1
                :unit="this.base_currency"
                :value="this.inputNum"
                :len="this.amount_len"
                :remainderWallet="this.maxInputNum"
        />

        <div class="m-exchange__tradepanel-available" v-if="this.nowCurrencyBalance">
            <span class="m-exchange__tradepanel-available-text">
                可用
            </span>
            <span class="m-exchange__tradepanel-available-value">
                {{this.nowCurrencyBalanceNum}} {{this.quote_currency}}
            </span>
        </div>

        <div class="m-exchange__tradepanel-total">
            <span class="m-exchange__tradepanel-total-text">
                交易额
            </span>
            <span class="m-exchange__tradepanel-total-value">
                {{this.totalPrice}} {{this.quote_currency}}
            </span>
        </div>
        <x-button class="btn_base"
                  :class="{ btn_primary : tabIndex===0, btn_danger : tabIndex===1 }"
                  @click.native="judgeBtn">
            买入{{this.base_currency}}
        </x-button>
    </div>
</template>
<script type="text/ecmascript-6">
    import {XButton} from 'vux'
    import NumberInput from '@/components/NumberInput/NumberInput'
    import {mapState, mapActions} from 'vuex'
    import {Decimal} from 'decimal.js'
    import {sendMessage} from '@/modules/exchange/api/get_exchange'

    const noEnough = '可用余额不足!'
    const noEnoughPrice = '请输入价格!'
    const noEnoughNum = '请输入数量!'

    export default {
        name: 'BuyTransaction',
        data() {
            return {
                localWallet: null, // 接收到vuex中wallet保存到localWallet
                componentSelectData: null,  // 当前交易货币交易信息zl/test
                quote_currency_price: null, // 当前交易实时金额(sellP)
                base_currency: '',  // 基准货币单位:zl
                quote_currency: '', // 标价货币单位:test
                nowCurrencyBalance: null,    // 当前交易基本货币个人余额(标价)
                nowCurrencyBalanceNum: null,    // 基本(标价)余额test:1968.00000000(小数点已格式化)
                stepQuote: '',    // 价格每次i++的值
                stepAmount: '', // 数量每次i++的值
                quote_len: 0, // 价格保留小数点的位数
                amount_len: 0, // 数量保留小数点的位数
                totalPrice_len: 0, // 交易额保留小数点的位数
                inputNum: 0, // 默认数量
                maxInputNum: null,   // 最大买入数量
                totalP: null,
                totalPrice: null,    // 交易额
                submitFlag: false,
                submitData: null
            }
        },
        props: {
            selectData: {},
            tabIndex: {},
            buyP: {
                type: Number
            }
        },
        created() {
//            this.searchCurrency()
//            this.toDecimalN()
//            this.formatWalletLength()
        },
        mounted() {
            if (this.wallet) {
                this.localWallet = this.wallet
            }
        },
        methods: {
            ...mapActions([
                'buyTotalPrice'
            ]),
//            loading提示
            showloading() {
                this.$vux.loading.show({
                    text: '加载中...'
                })
            },
            hideloading() {
                this.$vux.loading.hide()
            },
//            toast提示
            showToast(text, icon) {
                this.$vux.toast.show({
                    type: icon,
                    text: text,
                    width: '9.6em',
                    isShowMask: true,
                    time: 3000
                })
            },
//            查找当前交易信息对应钱包货币种类(基准)
            forSearchCurrencyBalance(currency, currencyB, currencyBN) {
                for (let i = 0; i < this.localWallet.length; i++) {
                    if (this.localWallet[i].currency === this.componentSelectData[currency]) {
                        this[currencyB] = this.localWallet[i]
                        this[currencyBN] = new Decimal(this[currencyB].available).toFixed(8)
                    }
                }
            },
//            设置基准货币单位, 价格/数量保留小数点
            searchCurrency() {
                if (this.componentSelectData) {
//                    根据当前交易信息获取:
//                    单位
                    this.base_currency = this.componentSelectData.base_currency
                    this.quote_currency = this.componentSelectData.quote_currency
//                    小数点
                    this.quote_len = this.componentSelectData.price_precision
                    this.amount_len = this.componentSelectData.amount_precision
                    this.totalPrice_len = this.componentSelectData.total_precision
//                    查找当前交易信息对应钱包余额(标价)
                    this.forSearchCurrencyBalance('quote_currency', 'nowCurrencyBalance', 'nowCurrencyBalanceNum')
                }
            },
            calcMaxInputNum() {
                const sellPrice = this.quote_currency_price
                const maxInputNumber = new Decimal(this.nowCurrencyBalanceNum).div(sellPrice)
                this.toDecimalN(maxInputNumber, this.amount_len, 'maxInputNum')
            },
//            保留指定浮点数位数
            toDecimalN(num, len, key) {
                const number = num.toString()
                const searchDigital = number.indexOf('.')
                if (searchDigital > 0) {
                    const digit = number.split('.')
                    const digitLeft = new Decimal(digit[0])
                    const digitRight = new Decimal(digit[1].slice(0, len)).div(new Decimal(10).toPower(len))
                    this[key] = (digitLeft.add(digitRight)).toNumber()
                } else {
                    const f = new Decimal(num)
                    this[key] = f.toFixed(len)
                }
            },
//            格式化价格长度单位
            formatWalletLength() {
                this.toDecimalN(this.buyP, this.quote_len, 'quote_currency_price')
            },
//            设置价格每次 ++ || -- 的最小单位
            setQuoteStepValue(k, val) {
                const len = this.componentSelectData[val]
//                const baseNumber = new Decimal(0.1).toPower(len)
                const baseNumber = Math.pow(0.1, len)
                this[k] = new Decimal(baseNumber).toFixed(len)
            },
//            获取当前价格和数量进行计算(余额不足提示)
            realTime() {
                const realTimePrice = this.buyPrice
                const realTimeNumber = this.buyNumber
                this.quote_currency_price = realTimePrice
                this.inputNum = realTimeNumber
                this.calcMaxInputNum()
                const realTotal = new Decimal(realTimePrice).mul(new Decimal(realTimeNumber)).toNumber()
                console.log(new Decimal(250.433).mul(new Decimal(1.0000)).toNumber())
                this.totalP = realTotal
                if (realTotal > this.nowCurrencyBalanceNum) {
                    this.showToast(noEnough, 'warn')
                    this.submitFlag = false
                    return this.submitFlag
                } else {
                    this.submitFlag = true
                    return this.submitFlag
                }
            },
//            发送信息,执行loading状态加载
            sendMessage() {
                this.showloading()
                this.submitData = {
                    symbol: this.componentSelectData.symbol,
                    side: 'buy',
                    type: 'limit',
                    price: this.buyPrice,
                    amount: this.buyNumber
                }
                sendMessage(this.submitData).then((res) => {
                    if (res.status === 200 && res.statusText === 'OK') {
                        if (res.data.code === '200') {
                            const data = res.data.data
                            if (data.state === 'submitted') {
                                this.showToast('已提交!', 'srccess')
                                this.hideloading()
                                this.$emit('submiting', event)
                            } else {
                                this.showToast('未提交!', 'warn')
                                this.showLoadingInfo = false
                            }
                        } else {
                            this.showToast('提交失败!', 'warn')
                            this.showLoadingInfo = false
                        }
                    } else {
                        this.showToast('网络错误!', 'warn')
                        this.showLoadingInfo = false
                    }
                })
            },
//            判断点击按钮是否可用
            judgeBtn() {
                if (this.realTime()) {
                    if (this.buyPrice === null || this.buyPrice === 0) {
                        this.showToast(noEnoughPrice, 'warn')
                        this.submitFlag = false
                    } else {
//                        console.log(typeof this.buyNumber)
                        if (this.buyNumber === null || this.buyNumber === 0) {
                            this.showToast(noEnoughNum, 'warn')
                            this.submitFlag = false
                        } else {
                            this.submitFlag = true
                            this.sendMessage()
                        }
                    }
                }
            }
        },
        watch: {
            selectData() {
                this.componentSelectData = this.selectData
            },
//            获得钱包所有余额
            componentSelectData() {
                this.searchCurrency()   // 设置当前交易单位
                this.setQuoteStepValue('stepQuote', 'price_precision')  // 设置价格每次++的最小单位
                this.setQuoteStepValue('stepAmount', 'amount_precision')  // 设置数量每次++的最小单位
            },
//            获取当前交易(标价)的余额
            nowCurrencyBalance() {
                this.formatWalletLength()
                this.calcMaxInputNum()
            },
//            价格变动计算
            buyPrice() {
                this.realTime()
            },
//            数量变动计算
            buyNumber() {
                this.realTime()
            },
//            计算当前交易额为多少
            totalP() {
                this.toDecimalN(this.totalP, this.totalPrice_len, 'totalPrice')
                this.buyTotalPrice(this.totalPrice)
            },
            wallet() {
                this.localWallet = this.wallet
            },
            localWallet() {
                this.searchCurrency()   // 设置当前交易单位
            }
        },
        computed: {
            ...mapState({
                wallet: state => state.user.wallet,
                buyPrice: state => state.exchange.buyPrice,
                buyNumber: state => state.exchange.buyNumber
            })
        },
        components: {
            XButton,
            NumberInput
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "src/assets/css/mc/config.scss";

</style>
