<template>
    <!--交易(tab页面) -->
    <div style="height:100%;">
        <drawer :show.sync="drawerVisibility"
                :show-mode="showModeValue"
                :placement="showPlacementValue"
                :drawer-style="{ width: '280px' }">

            <div slot="drawer">
                <exchange-drawer @upParents="handleToggleSliderNav"
                                 @upSelectIndex="getSelectIndex"
                                 :exchangeList='this.exchangeList'
                                 :transferSelectIndex='this.selectIndex'>
                </exchange-drawer>
            </div>
            <div>
                <!--<router-view></router-view>-->
            </div>
            <div body-padding-bottom="55px">
                <div class="m-exchange">
                    <x-header class="m-exchange__header" title="" :left-options="{backText: ''}">
                     <span class="m-exchange__tools" slot="overwrite-left"
                           @click="handleToggleSliderNav">
                          <span class="m-exchange__tools-icon" slot="icon">
                              <i class="mcicon-category"></i>
                          </span>
                         <span class="m-exchange__tools-text" v-if="this.selectData">
                             {{this.selectData.base_currency | toUpper}}/{{this.selectData.quote_currency | toUpper}}
                         </span>
                         <span class="m-exchange__tools-desc">
                             切换
                         </span>
                     </span>
                    </x-header>
                    <div class="m-exchange__trade">
                        <div class="m-exchange__orderbook-ticker">
                            <h1 class="m-exchange__orderbook-ticker-price m--font-success">
                                {{this.buyP}}
                            </h1>
                            <span class="m-exchange__orderbook-ticker-rmb">
                                ≈ 0 CNY
                            </span>
                        </div>

                        <handicap :handicapData="handicapData"></handicap>

                        <div class="m-exchange__tradepanel">
                            <div class="m-exchange__tradepanel-tab">
                                <tab :line-width=0 custom-bar-width="0px">
                                    <tab-item :selected="selected === item" v-for="(item, index) in exchangeMenu"
                                              @click="selected = item" :key="index"
                                              :active-class="'m-exchange__tradepanel-tab-title'+tab_index"
                                              @on-item-click="onItemClick">
                                        {{item}}
                                    </tab-item>
                                </tab>
                            </div>
                            <!--买入-->
                            <div v-show="this.tab_index === 0">
                                <Buy-transaction :selectData='this.selectData' :tabIndex='this.tab_index'
                                                 :buyP="this.buyP" @submiting="refreshing">
                                </Buy-transaction>
                            </div>
                            <!--卖出-->
                            <div v-show="this.tab_index === 1">
                                <Sell-transaction :selectData='this.selectData' :tabIndex='this.tab_index'
                                                  :sellP="this.sellP" @submiting="refreshing">
                                </Sell-transaction>
                            </div>
                        </div>
                    </div>
                    <open-orders :submited="submited" @reset="resetSubmited" disabled></open-orders>
                </div>
            </div>

        </drawer>
    </div>
</template>

<style rel="stylesheet/scss" lang="scss">
    @import "src/assets/css/mc/config.scss";

    .m-exchange {
        .vux-tab .vux-tab-item {
            background-size: 100% 0px !important;
        }

        .m-exchange__header {
            .vux-header-left {
                top: 10px !important;
            }

            .m-exchange__tools {
                color: $m--font-color !important;
                .m-exchange__tools-icon {
                    font-size: get-font-size(icon, '++++') !important;
                    font-weight: get-font-weight(boldest) !important;
                    vertical-align: middle;
                }

                .m-exchange__tools-text {
                    font-size: get-font-size(regular, '++++');
                    vertical-align: middle;
                    font-weight: get-font-weight(bolder) !important;
                    padding-left: 8.5rem;
                }

                .m-exchange__tools-desc {
                    color: get-color(light, muted) !important;
                    font-size: get-font-size(regular, '-');
                    vertical-align: middle;
                }
            }
        }

        .m-exchange__trade {
            padding: $m--space;
            display: table;
            width: 100%;
            /*table-layout: fixed;*/
            background: white;
            /*font-size: 1rem;*/

            .m-exchange__orderbook-ticker {
                .m-exchange__orderbook-ticker-price {
                    display: inline-block;
                    vertical-align: middle;
                }

                .m-exchange__orderbook-ticker-rmb {
                    font-size: get-font-size(regular, '+');
                    color: get-color(light, muted);
                    padding-left: 5px;
                    display: inline-block;
                    vertical-align: middle;
                }
            }

            .m-exchange__orderbook {
                display: table;
                width: 100%;
                table-layout: fixed;
                font-size: get-font-size(regular);

                .m-exchange__orderbook-buy {
                    display: table-cell;
                    color: get-color(light, muted);

                    .m-exchange__orderbook-header, .m-exchange__orderbook-depth-item {
                        display: table;
                        width: 100%;
                        position: relative;
                        padding: 5px;

                        .m-exchange__orderbook-hand {
                            display: table-cell;
                            text-align: left;
                            width: 34%;
                        }

                        .m-exchange__orderbook-amount {
                            display: table-cell;
                            text-align: left;
                            width: 33%;
                        }

                        .m-exchange__orderbook-price {
                            display: table-cell;
                            padding-right: 5px;
                            text-align: right;
                            width: 33%;
                            color: array-get($m--state-colors, success, base);
                        }

                        .m-exchange__orderbook-bg {
                            position: absolute;
                            top: 0;
                            right: 0;
                            opacity: .1;
                            height: 100%;
                            max-width: 100%;
                            background-color: array-get($m--state-colors, success, base);
                        }

                    }
                    .m-exchange__orderbook-header {
                        .m-exchange__orderbook-price {
                            color: get-color(light, muted) !important;
                        }
                    }
                }

                .m-exchange__orderbook-sell {
                    display: table-cell;

                    .m-exchange__orderbook-header, .m-exchange__orderbook-depth-item {
                        display: table;
                        width: 100%;
                        color: get-color(light, muted);
                        position: relative;
                        padding: 5px;

                        .m-exchange__orderbook-price {
                            display: table-cell;
                            padding-left: 5px;
                            text-align: left;
                            width: 33%;
                            color: array-get($m--state-colors, danger, base);
                        }

                        .m-exchange__orderbook-amount {
                            display: table-cell;
                            text-align: right;
                            width: 33%;
                        }

                        .m-exchange__orderbook-hand {
                            display: table-cell;
                            text-align: right;
                            width: 34%;
                        }

                        .m-exchange__orderbook-bg {
                            position: absolute;
                            top: 0;
                            left: 0;
                            opacity: .1;
                            height: 100%;
                            max-width: 100%;
                            background-color: array-get($m--state-colors, danger, base);
                        }

                    }

                    .m-exchange__orderbook-header {
                        .m-exchange__orderbook-price {
                            color: get-color(light, muted) !important;
                        }
                    }

                }

            }

            .m-exchange__tradepanel {
                display: block;

                .m-exchange__tradepanel-tab {
                    padding: $m--space 0;
                    .m-exchange__tradepanel-tab-title0 {
                        color: array-get($m--state-colors, success, base) !important;
                        border-bottom: 3px solid array-get($m--state-colors, success, base) !important;
                        font-size: get-font-size(regular, '++++') !important;
                    }
                    .m-exchange__tradepanel-tab-title1 {
                        color: array-get($m--state-colors, danger, base) !important;
                        border-bottom: 3px solid array-get($m--state-colors, danger, base) !important;
                        font-size: get-font-size(regular, '++++') !important;
                    }
                }
                .m-exchange__tradepanel-fee {
                    display: block;
                }

                .m-exchange__tradepanel-available {
                    font-size: get-font-size(regular, '+');
                    display: table;
                    width: 100%;

                    .m-exchange__tradepanel-available-text {
                        color: get-color(light, muted);
                        display: table-cell;
                    }

                    .m-exchange__tradepanel-available-value {
                        font-weight: get-font-weight(bolder);
                        text-align: right;
                        display: table-cell;
                    }
                }

                .m-exchange__tradepanel-total {
                    font-size: get-font-size(regular, '+');
                    display: table;
                    width: 100%;
                    margin-bottom: $m--space;

                    .m-exchange__tradepanel-total-text {
                        color: get-color(light, muted);
                        display: table-cell;
                    }

                    .m-exchange__tradepanel-total-value {
                        font-weight: get-font-weight(bolder);
                        text-align: right;
                        display: table-cell;
                    }
                }

            }

        }
    }
</style>

<script>
    import {TransferDom, XHeader, XButton, Group, Cell, Tab, TabItem, Drawer} from 'vux'
    import {mapState, mapActions} from 'vuex'
    import {getSymbols, getHandicap, getPrice} from '@/modules/exchange/api/get_exchange'
    import {getAssets} from '@/modules/user/api/get_user'
    import NumberInput from '@/components/NumberInput/NumberInput'
    import Handicap from './components/handicap/handicap.vue'
    import BuyTransaction from './components/ExchangeDrawer/transaction/buyTransaction.vue'
    import SellTransaction from './components/ExchangeDrawer/transaction/sellTransaction.vue'
    import OpenOrders from './components/OpenOrders/OpenOrders.vue'
    import ExchangeDrawer from './components/ExchangeDrawer/ExchangeDrawer.vue'

    //    const sellP = 20.038448596849
    //    const buyP = 250.439448596849

    export default {
        name: 'Home',
        data() {
            return {
                loadingNum: 8,
                tab_index: 0,
                exchangeMenu: ['买入', '卖出'],
                selected: '买入',
                drawerVisibility: false,
                showMode: 'overlay',
                showModeValue: 'overlay',
                showPlacement: 'left',
                showPlacementValue: 'left',
                exchangeList: [],
                selectIndex: 0,
                selectData: null,
                sellP: 0,
                buyP: 1,
                submited: false,
                handicapData: null
            }
        },
        created() {
            this.calcTime()
            this.getSymbolsData()
        },
        methods: {
            ...mapActions([
                'setWallet'
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
            handleToggleSliderNav() {
                this.drawerVisibility = !this.drawerVisibility
            },
            onItemClick(index) {
                if (this.tab_index === index) return
                this.tab_index = index
//                console.log(index)
            },
//            计时器
            calcTime() {
                setInterval(this.gethandicapData, 20000)
                setInterval(this.getPriceData, 20000)
            },
//            获取盘口信息
            gethandicapData() {
                const _this = this
                getHandicap().then(res => {
                    if (res.status === 200 && res.statusText === 'OK') {
                        if (res.data.code === '200') {
                            const data = res.data.data
                            _this.handicapData = data
                        }
                    }
                })
            },
//            获取价格信息
            getPriceData() {
                const _this = this
                getPrice().then(res => {
                    if (res.status === 200 && res.statusText === 'OK') {
                        if (res.data.code === '200') {
                            const data = res.data.data
                            _this.buyP = data.last
                            _this.sellP = data.last
                        }
                    }
                })
            },
//            请求交易数据
            getSymbolsData() {
                this.loadingNum -= 1
                getSymbols().then((res) => {
//                    console.log(res)
                    if (res.status === 200 && res.statusText === 'OK') {
                        this.exchangeList = res.data.data
                        this.transferSelectData(this.selectIndex)
                        this.loadingNum += 1
                    }
                })
            },
            getSelectIndex(i) {
//                console.log(i)
                this.selectIndex = i
                this.transferSelectData(this.selectIndex)
            },
//            筛选当前交易币兑
            transferSelectData(i) {
//                console.log(this.exchangeList[i])
                this.selectData = this.exchangeList[i]
            },
//            获取钱包余额
            ajaxWallet() {
                getAssets().then((res) => {
                    if (res.status === 200 && res.statusText === 'OK') {
                        let data = res.data.data
                        console.log(700)
                        this.setWallet(data)
                        this.submited = true
                    }
                })
            },
            refreshing() {
                console.log(800)
                this.ajaxWallet()
            },
//            列表刷新完成,还原状态
            resetSubmited() {
                console.log('reset')
                this.submited = false
            }
        },
        directives: {
            TransferDom
        },
        filters: {
            toUpper(val) {
                return val.toUpperCase()
            }
        },
        computed: {
            ...mapState({
                wallet: state => state.user.wallet
            })
        },
        watch: {
            loadingNum() {
                if (this.loadingNum === 8) {
                    this.hideloading()
                } else {
                    this.showloading()
                }
            }
        },
        components: {
            XButton,
            Group,
            Cell,
            Tab,
            TabItem,
            NumberInput,
            XHeader,
            Drawer,
            OpenOrders,
            ExchangeDrawer,
            Handicap,
            BuyTransaction,
            SellTransaction
        }
    }
</script>
