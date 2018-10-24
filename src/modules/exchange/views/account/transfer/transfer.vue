<template>
    <div class="m-accountshow">
        <x-header title="资金划转" :left-options="{backText: ''}">
        </x-header>

        <div class="m-accounttransfer__detail" v-if="this.transferFlag">
            <div class="m-accounttransfer__detail__head">
                <div class="m-accounttransfer__detail__head-caption">
                    <span class="m-accounttransfer__detail__head-title">币存帐号</span>
                </div>
                <div class="m-accounttransfer__detail__head-icon" @click="reverseType">
                    <i class="mcicon-huilvhuansuan"></i>
                </div>
                <div class="m-accounttransfer__detail__head-caption">
                    <span class="m-accounttransfer__detail__head-title m-accounttransfer__detail__head-title-c">我的钱包</span>
                </div>
            </div>
        </div>
        <div class="m-accounttransfer__detail" v-else="">
            <div class="m-accounttransfer__detail__head">
                <div class="m-accounttransfer__detail__head-caption">
                    <span class="m-accounttransfer__detail__head-title">我的钱包</span>
                </div>
                <div class="m-accounttransfer__detail__head-icon" @click="reverseType">
                    <i class="mcicon-huilvhuansuan"></i>
                </div>
                <div class="m-accounttransfer__detail__head-caption">
                    <span class="m-accounttransfer__detail__head-title m-accounttransfer__detail__head-title-c">币存帐号</span>
                </div>
            </div>
        </div>

        <div class="m-accounttransfer__detail">
            <group title="">
                <Test :typeList="this.typeList"
                      @changeType="getBalance">
                </Test>
                <cell title="可用数量"
                      :value="totalValue">
                </cell>
                <x-input title="转划数量"
                         type="number"
                         placeholder="0"
                         v-model="exchangeNum"
                         :min="0.00000001"
                         text-align="right"
                         @on-change="change"
                         :disabled="xInputDisabled">
                </x-input>
            </group>
        </div>

        <div class="m-accounttransfer__action">
            <div class="m-accounttransfer__action__r">
                <x-button class="btn_base btn_primary"
                          @click.native="onClick">
                    划转
                </x-button>
            </div>
            <!--<div class="m-accounttransfer__action__r">-->
            <!--<x-button class="btn_base btn_primary" link="/account/show/deposit">划转-->
            <!--</x-button>-->
            <!--</div>-->
        </div>
    </div>
</template>

<style rel="stylesheet/scss" lang="scss">
    @import "src/assets/css/mc/config.scss";

    .m-accountshow {

        .m-accounttransfer__detail {
            background-color: get-color(light, box);
            margin-bottom: $m--space;

            .m-accounttransfer__detail__head {
                display: table;
                width: 100%;
                min-height: 80px;
                table-layout: fixed;

                .m-accounttransfer__detail__head-icon {
                    display: table-cell;
                    vertical-align: middle;
                    text-align: center;
                    padding-right: 10px;
                    font-size: get-font-size(icon, '+++++');
                    color: $m--danger-color;
                }

                .m-accounttransfer__detail__head-caption {
                    display: table-cell;
                    vertical-align: middle;
                    text-align: center;
                    line-height: 1.4rem !important;

                }

                .m-accounttransfer__detail__head-title {
                    display: block;
                    font-size: get-font-size(regular, '+++');
                    font-weight: get-font-weight(bolder);
                }

                .m-accounttransfer__detail__head-title-c {
                    color: $m--danger-color;
                }

                .m-accounttransfer__detail__head-desc {
                    display: block;
                    font-size: get-font-size(regular);
                    color: get-color(light, muted);
                }

            }

            .m-accounttransfer__detail__body {
                padding-bottom: $m--space;
                border-bottom: 1px solid get-color(light, panel);

                .m-accounttransfer__detail__body-item {
                    padding: 0 $m--space 10px $m--space;
                    display: table;
                    width: 100%;
                    font-size: get-font-size(regular, '++');

                    .m-accounttransfer__detail__body-item-l {
                        display: table-cell;
                        width: 60%;
                        text-align: left;
                    }

                    .m-accounttransfer__detail__body-item-r {
                        font-weight: get-font-weight(bolder);
                        display: table-cell;
                        text-align: right;
                    }
                }
            }

            .m-accounttransfer__detail__footer {
                padding-top: $m--space;
                padding-bottom: $m--space;
                /*border-bottom: 1px solid get-color(light, panel);*/

                .m-accounttransfer__detail__footer-item {
                    padding: 0 $m--space 10px $m--space;
                    display: table;
                    width: 100%;
                    font-size: get-font-size(regular, '++');

                    .m-accounttransfer__detail__footer-item-l {
                        display: table-cell;
                        width: 60%;
                        text-align: left;
                    }

                    .m-accounttransfer__detail__footer-item-r {
                        font-weight: get-font-weight(bolder);
                        display: table-cell;
                        text-align: right;
                    }
                }
            }
        }

        .m-accounttransfer__action {
            display: flex;
            padding: 0 $m--space;

            .m-accounttransfer__action__r {
                flex: 1;
            }
            .m-accounttransfer__action__l {
                flex: 1;
            }
        }

    }
</style>

<script>
    import {XHeader, Group, Cell, XButton, XInput} from 'vux'
    import Decimal from 'decimal.js'
    import {getAssets, getThirdAssets, submitExchange} from '@/modules/user/api/get_user'
    import {showloadings, hideloadings, showToasts, noEnough, yExchange, noExchange} from '@/utils/load'
    import Test from './test.vue'

    export default {
        name: 'accountTransfer',
        data() {
            return {
                transferFlag: true, // true转入, false转出
                selectType: null, // 选中货币类型名称
                totalValue: 0, // 当前选中货币可用余额
                exchangeNum: 0, // 输入划转数量
//                余额列表
                thirdList: [], // 第三方钱包列表
                thirdHook: [],
                walletList: [], // 交易所钱包列表
                walletHook: [],
                typeList: [], // 组件钱包列表
                loadFlag: 8, // load加载动画
                xInputDisabled: true, // 输入判定
                submitFlag: false, // 提交判定, false不提交, true提交
                from: null,
                to: null
            }
        },
        beforeRouteEnter(from, to, next) {
            next(vm => {
                vm.getAssetsData()
                vm.getThirdAssetsData()
            })
        },
        created() {
        },
        mounted() {
            this.calcList()
        },
        methods: {
            getAssetsData() {
                this.loadFlag -= 1
                getAssets().then((res) => {
                    if (res.status === 200) {
                        this.loadFlag += 1
                        const data = res.data.data
                        this.thirdList = data
                        const dataArray = []
                        for (var i in data) {
                            dataArray.push(data[i].currency)
                        }
                        this.thirdHook.splice(0, 1, dataArray)
                    }
                })
            },
            getThirdAssetsData() {
                this.loadFlag -= 1
                getThirdAssets().then((res) => {
                    if (res.status === 200) {
                        this.loadFlag += 1
                        const data = res.data.data
                        this.walletList = data
                        const dataArray = []
                        for (var i in data) {
                            dataArray.push(data[i].currency)
                        }
                        this.walletHook.splice(0, 1, dataArray)
                    }
                })
            },
            getBalance(val) {
                this.xInputDisabled = false
                this.exchangeNum = 0
                this.selectType = val[0]
//                获取第三方货币余额
                if (this.transferFlag) {
                    // 转入
                    this.calcTotalValue(this.thirdList, val)
                } else {
                    // 转出
                    this.calcTotalValue(this.walletList, val)
                }
            },
            calcTotalValue(wallet, val) {
                for (let i = 0; i < wallet.length; i++) {
                    // eslint-disable-next-line
                    if (wallet[i].currency == val) {
                        this.totalValue = new Decimal(wallet[i].balance).toFixed(8)
                    }
                }
            },
            calcList() {
                if (this.transferFlag) {
                    this.typeList = this.thirdHook
                    this.from = 2
                    this.to = 1
                } else {
                    this.typeList = this.walletHook
                    this.from = 1
                    this.to = 2
                }
            },
            change() {
                const inputNum = +this.exchangeNum
                const totalNum = +this.totalValue
                if (inputNum > totalNum) {
                    showToasts(noEnough, 'warn')
                }
            },
            reverseType() {
                this.typeList = []
                this.transferFlag = !this.transferFlag
            },
            // 提交
            onClick() {
                if (this.submitFlag) {
                    this.loadFlag -= 1
                    const data = {
                        currency: this.selectType,
                        amount: this.exchangeNum,
                        from: this.from,
                        to: this.to
                    }
//                    console.log(data)
                    submitExchange(data)
                        .then(res => {
                            if (res.status === 200) {
                                if (res.data.code === 200) {
                                    this.loadFlag += 1
                                    showToasts(yExchange, 'success')
                                    this.exchangeNum = 0
                                    setTimeout(this.getAssetsData, 3000)
                                    setTimeout(this.getThirdAssetsData, 3000)
                                } else {
                                    showToasts(noExchange, 'warn')
                                }
                            }
                        })
                        .catch(
                            err => console.log(err)
                        )
                }
            }
        },
        watch: {
            transferFlag() {
                this.calcList()
            },
            loadFlag() {
                if (this.loadFlag === 8) {
                    hideloadings()
                } else {
                    showloadings()
                }
            },
            exchangeNum() {
                const inputNum = +this.exchangeNum
                const totalNum = +this.totalValue
                if (inputNum > totalNum || inputNum <= 0) {
                    this.submitFlag = false
                } else {
                    this.submitFlag = true
                }
            }
        },
        components: {
            Group,
            XHeader,
            Cell,
            XButton,
            XInput,
            Test
        }
    }
</script>
