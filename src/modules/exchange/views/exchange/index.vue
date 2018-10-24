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
                        <!--价钱/盘口信息-->
                        <top-price></top-price>
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
                            <div v-show="this.tab_index === 0">
                                <Buy :tabIndex='this.tab_index'
                                     @submiting="refreshing">
                                </Buy>
                            </div>
                            <div v-show="this.tab_index === 1">
                                <Sell :tabIndex='this.tab_index'
                                      @submiting="refreshing">
                                </Sell>
                            </div>
                        </div>

                    </div>
                    <open-orders :submited="submited" @submiting="refreshing" @reset="resetSubmited"
                                 disabled></open-orders>
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

                .router-wrapper {
                    display: flex;
                    margin: 1rem 0;
                    .router_item_buy, .router_item_sell {
                        flex: 1;
                        text-align: center;
                        .buy_item, .sell_item {
                            padding: 1rem 0;
                            font-size: 1.2rem;
                            font-weight: bold;
                            color: #CCC;
                            border-bottom: 3px solid #ffffff;
                        }
                    }
                    .router-link-active {
                        .buy_item {
                            font-size: 1.5rem;
                            color: #3dbea3;
                            border-bottom: 3px solid #3dbea3;
                        }
                        .sell_item {
                            font-size: 1.5rem;
                            color: #f4516c;
                            border-bottom: 3px solid #f4516c;
                        }
                    }
                }

            }

        }
    }
</style>

<script>
    import {TransferDom, XHeader, XButton, Group, Cell, Tab, TabItem, Drawer} from 'vux'
    import {mapState, mapActions} from 'vuex'
    import {showloadings, hideloadings} from '@/utils/load'
    import {getSymbols, getHandicap, getPrice} from '@/modules/exchange/api/get_exchange'
    import {getAssets} from '@/modules/user/api/get_user'
    import NumberInput from '@/components/NumberInput/NumberInput'
    import TopPrice from './components/topPrice/topPrice.vue'
    import Handicap from './components/handicap/handicap.vue'
    import Buy from './components/ExchangeDrawer/transaction/buy.vue'
    import Sell from './components/ExchangeDrawer/transaction/sell.vue'
    import OpenOrders from './components/OpenOrders/OpenOrders.vue'
    import ExchangeDrawer from './components/ExchangeDrawer/ExchangeDrawer.vue'

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
                exchangeList: [],   // 币兑交易列表
                selectIndex: 0, // 当前展示交易币兑下标
                selectData: null,   // 当前展示交易币兑
                submited: false,
                handicapData: null
            }
        },
        created() {
        },
        // 对应该组件的路由被确认之前，此时还未创建组件实例
        beforeRouteEnter: function (to, from, next) {
            next(vm => {
//                刷新币兑
                vm.getSymbolsData()
//                刷新价格,盘口,余额,委托列表
                vm.refreshing()
//                设置盘口计时器
                window.timerHandicap = setInterval(() => {
                    vm.gethandicapData()
                }, 50000)
//                设置价格计时器
                window.timerPrice = setInterval(() => {
                    vm.getPriceData()
                }, 50000)
            })
        },
        // 即将离开对应该组件的路由时
        beforeRouteLeave: function (to, from, next) {
//            离开当前页面,清空计时器
            if (from.path === '/exchange') {
                clearInterval(window.timerHandicap)
                clearInterval(window.timerPrice)
            }
            next()
        },
        mounted() {
        },
        beforeMount() {
//            this.forSearchSelectWallet()
        },
        methods: {
            ...mapActions([
                'setWallet',
                'topPrice',
                'selectSymbol',
                'selectBuyWallet',
                'selectSellWallet'
            ]),
            handleToggleSliderNav() {
                this.drawerVisibility = !this.drawerVisibility
            },
            onItemClick(index) {
                if (this.tab_index === index) return
                this.tab_index = index
            },
//            获取盘口信息
            gethandicapData() {
                getHandicap().then(res => {
                    if (res.status === 200) {
                        if (res.data.code === '200') {
                            const data = res.data.data
                            this.handicapData = data
                        }
                    }
                })
            },
//            获取价格信息
            getPriceData() {
                getPrice().then(res => {
                    if (res.status === 200) {
                        if (res.data.code === '200') {
                            const data = res.data.data
                            this.topPrice(data)
                        }
                    }
                })
            },
//            请求交易数据
            getSymbolsData() {
                getSymbols().then((res) => {
                    if (res.status === 200) {
                        this.exchangeList = res.data.data
                        this.transferSelectData(this.selectIndex)
                    }
                })
            },
//            切换交易币兑下标
            getSelectIndex(i) {
                this.selectIndex = i
                this.transferSelectData(this.selectIndex)
            },
//            筛选当前交易币兑
            transferSelectData(i) {
                this.selectData = this.exchangeList[i]
                this.selectSymbol(this.exchangeList[i])
                this.forSearchSelectWallet()
            },
//            查找买入和卖出时可用的货币余额, 保存在vuex中
            forSearchSelectWallet() {
                for (let i = 0; i < this.wallet.length; i++) {
                    if (this.wallet[i].currency === this.selectData.quote_currency) {
                        this.selectBuyWallet(this.wallet[i])
                    } else if (this.wallet[i].currency === this.selectData.base_currency) {
                        this.selectSellWallet(this.wallet[i])
                    }
                }
            },
//            获取钱包余额
            ajaxWallet() {
                getAssets().then((res) => {
                    if (res.status === 200) {
                        let data = res.data.data
                        this.setWallet(data)
                    }
                })
            },
            refreshing() {
                this.getPriceData()
                this.gethandicapData()
                this.ajaxWallet()
                this.submited = true
            },
//            列表刷新完成,还原状态
            resetSubmited() {
                this.submited = false
            }
        },
        beforeDestroy() {
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
            wallet() {
                if (this.selectData) {
                    this.forSearchSelectWallet()
                }
            },
            loadingNum() {
                if (this.loadingNum === 8) {
                    hideloadings()
                } else {
                    showloadings()
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
            TopPrice,
            Handicap,
            Buy,
            Sell
        }
    }
</script>
