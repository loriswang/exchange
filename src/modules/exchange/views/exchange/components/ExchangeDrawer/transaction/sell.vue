<template>
    <div>
        <!--价格-->
        <NumberInput
                :min="0"
                :max="1000000"
                :step="this.step"
                :controls=0
                :unit="this.quoteUnit"
                :value="this.localExchangePrice"
                :len="this.priceLen"
        />
        <!--数量-->
        <NumberInput
                :min="0"
                :max="1000000"
                :controls=1
                :unit="this.baseUnit"
                :value="this.inputNum"
                :len="this.numberLen"
                :remainderWallet="this.maxInputNum"
        />
        <div class="m-exchange__tradepanel-available">
            <span class="m-exchange__tradepanel-available-text">
                可用
            </span>
            <span class="m-exchange__tradepanel-available-value">
                {{this.localWalletNum}} {{this.baseUnit}}
            </span>
        </div>

        <div class="m-exchange__tradepanel-total">
            <span class="m-exchange__tradepanel-total-text">
                交易额
            </span>
            <span class="m-exchange__tradepanel-total-value">
                {{this.totalPrice}} {{this.quoteUnit}}
            </span>
        </div>
        <x-button class="btn_base"
                  :class="{ btn_primary : tabIndex===0, btn_danger : tabIndex===1 }"
                  @click.native="judgeBtn">
            卖出{{this.baseUnit}}
        </x-button>
    </div>
</template>
<script type="text/ecmascript-6">
    import Decimal from 'decimal.js'
    import {XButton} from 'vux'
    import NumberInput from '@/components/NumberInput/numSell.vue'
    import {mapState, mapActions} from 'vuex'
    import {showloadings, hideloadings, showToasts, noEnough, noEnoughPrice, noEnoughNum} from '@/utils/load.js'
    import {sendMessage} from '@/modules/exchange/api/get_exchange'

    export default {
        name: 'Sell',
        data() {
            return {
//                价格-------
                localExchangePrice: null, // 交易价格
                inputNum: 0, // 数量
//                余额---------
                localWallet: null,
                localWalletNum: 0,
//                交易信息--------
                symbol: '',
                baseUnit: '',
                quoteUnit: '',
                priceLen: 0,
                numberLen: 0,
                totalLen: 0,
                step: null,
                totalPrice: 0,
                maxInputNum: 0  // 最大输入
            }
        },
        props: [
            'tabIndex'
        ],
        created() {
            this.clearInputNum()
        },
        mounted() {
//            价格---------
            if (this.sellPrice) {
                this.formatWalletLength()
            }
//            数量
            if (this.sellNumber) {
                this.inputNum = this.sellNumber
            }
//            余额----------
            if (this.selectSellWallet) {
                this.forSearchCurrencyBalance()
            }
//            交易信息----------
            if (this.selectSymbol) {
                this.setSymbolInfo()
            }
        },
        updated() {
//            this.formatWalletLength()
//            this.inputNum = this.sellNumber
//            this.forSearchCurrencyBalance()
//            this.setSymbolInfo()
        },
        methods: {
            ...mapActions({
                setSellNumber: 'sellNumber'
            }),
// 方法-----------------------------------------
//            保留指定浮点数位数
            splitNumberFc(num, len, key) {
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
            //            设置价格每次 ++ || -- 的最小单位
            setStepFc(k, len) {
                const baseNumber = Math.pow(0.1, len)
                this[k] = new Decimal(baseNumber).toFixed(len)
            },
//            设置输入量为0
            clearInputNum() {
                const val = 0
                this.setSellNumber(val)
            },
// 价格------------------------------------------
//            格式化价格长度单位
            formatWalletLength() {
                if (this.priceLen) {
                    this.splitNumberFc(this.sellPrice, this.priceLen, 'localExchangePrice')
                }
            },
// 余额---------------------------------
            forSearchCurrencyBalance() {
                this.localWallet = this.selectSellWallet
                const price = this.localWallet.available
                this.localWalletNum = new Decimal(price).toFixed(8)
            },
// symbol币兑信息---------------------------------
            setSymbolInfo() {
                this.symbol = this.selectSymbol.symbol
                this.baseUnit = this.selectSymbol.base_currency
                this.quoteUnit = this.selectSymbol.quote_currency
                this.priceLen = this.selectSymbol.price_precision
                this.numberLen = this.selectSymbol.amount_precision
                this.totalLen = this.selectSymbol.total_precision
                this.setStepFc('step', this.priceLen)
            },
// 计算------------------------------------
            //            计算最大输入值
            calcMaxInputNum() {
                const maxInputNumber = this.localWalletNum
                this.splitNumberFc(maxInputNumber, this.numberLen, 'maxInputNum')
            },
//            比较最大输入和当前输入
            compare() {
                if (this.sellNumber > this.maxInputNum) {
                    showToasts(noEnough, 'warn')
                    return false
                } else {
                    return true
                }
            },
//            计算total
            calcTotal() {
                const price = this.localExchangePrice
                const num = this.sellNumber
                this.totalPrice = (new Decimal(price).mul(new Decimal(num))).toFixed(this.totalLen)
            },
// 点击--------------------------------------
//            提交
            send() {
                showloadings()
                const submitData = {
//                    symbol: this.localWallet.symbol,
                    symbol: this.symbol,
                    side: 'sell',
                    type: 'limit',
                    price: this.localExchangePrice,
                    amount: this.sellNumber
                }
                sendMessage(submitData)
                    .then((res) => {
                        if (res.status === 200) {
                            if (res.data.code === '200') {
                                const data = res.data.data
                                if (data.state === 'submitted') {
                                    console.log('submit')
                                    showToasts('已提交!', 'srccess')
                                    hideloadings()
                                    this.$emit('submiting', event)
                                } else {
                                    showToasts('未提交!', 'warn')
                                    hideloadings()
                                }
                            } else {
                                showToasts('提交失败!', 'warn')
                                hideloadings()
                            }
                        } else {
                            showToasts('网络错误!', 'warn')
                            hideloadings()
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
//            判断点击按钮是否可用
            judgeBtn() {
                if (this.localExchangePrice === null || this.localExchangePrice === 0) {
                    showToasts(noEnoughPrice, 'warn')
                } else {
                    if (this.sellNumber === null || this.sellNumber === 0) {
                        showToasts(noEnoughNum, 'warn')
                    } else {
                        if (this.compare()) {
                            this.send()
                        }
                    }
                }
            }
        },
        watch: {
// 价格---------
            sellPrice() {
                this.localExchangePrice = this.sellPrice
                this.calcMaxInputNum()
                this.compare()
                this.calcTotal()
            },
//            输入数量
            sellNumber() {
                this.inputNum = this.sellNumber
                this.compare()
                this.calcTotal()
            },
// 余额----------
            selectSellWallet() {
                this.forSearchCurrencyBalance()
            },
// 交易信息--------
            selectSymbol() {
                this.setSymbolInfo()
            }
        },
        computed: {
            ...mapState({
                sellPrice: state => state.exchange.sellPrice,   // 获取交易价格
                selectSellWallet: state => state.exchange.selectSellWallet,    // 获取可用余额,
                selectSymbol: state => state.exchange.selectSymbol,   // 获取交易symbol
                sellNumber: state => state.exchange.sellNumber // 实时买入数量
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
