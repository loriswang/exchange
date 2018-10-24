<template>
    <!--交易 -> 当前委托(全部) -> 历史订单-->
    <div class="m-exchange__historyorder">
        <x-header title="历史订单" :left-options="{backText: ''}">
        </x-header>
        <div class="m-exchange__historyorder__body">
            <div v-for="item in this.exchangeListData" :key="item.uuid">
                <router-link :to="{name:'exchangeHistoryOrderShow', query: {uuid: item.uuid}}">
                    <div class="m-exchange__historyorder__body-item">
                        <div class="m-exchange__historyorder__body-item-1">
                        <span v-if="item.side == buy"
                              class="m-exchange__historyorder__body-item-side m-badge m-badge--success m-badge--wide">买入</span>
                            <span v-else=""
                                  class="m-exchange__historyorder__body-item-side m-badge m-badge--danger m-badge--wide">卖出</span>
                            <span class="m-exchange__historyorder__body-item-pair">
                        {{item.base | toUpper}}/{{item.quote | toUpper}}
                    </span>
                            <span v-if="item.state == 'filled'" class="m-exchange__historyorder__body-item-status">成交</span>
                            <span v-else="" class="m-exchange__historyorder__body-item-status m--font-warning">撤销</span>

                            <span class="m-exchange__historyorder__body-item-date">
                            {{item.created_at.date | strIntercept}}
                    </span>
                        </div>
                        <div class="m-exchange__historyorder__body-item-2">

                    <span class="m-exchange__historyorder__body-item-filled">
                           {{item.price | numberIntercept}}
                    </span>
                            <span class="m-exchange__historyorder__body-item-amount">
                           {{item.executed_value | numberIntercept}}
                     </span>
                        </div>
                        <div class="m-exchange__historyorder__body-item-3">
                    <span class="m-exchange__historyorder__body-item-dealprice">
                            {{item.amount | numberIntercept}}
                    </span>
                            <span class="m-exchange__historyorder__body-item-price">
                            {{item.filled_amount | numberIntercept}}
                    </span>
                        </div>
                    </div>
                </router-link>
            </div>

            <div class="listNone" v-if="this.exchangeListData.length === 0">暂无订单</div>
            <div class="empty_space"></div>
        </div>
    </div>
</template>

<style rel="stylesheet/scss" lang="scss">
    @import "src/assets/css/mc/config.scss";

    .m-exchange__historyorder {
        .m-exchange__historyorder__body {
            padding: 0 $m--space;
            background: white;
            font-size: get-font-size(regular, '+');

            .m-exchange__historyorder__body-item {
                color: $m--font-color;
                display: table;
                width: 100%;
                //padding-bottom: $m--space ;
                padding: $m--space 0px;
                border-bottom: 1px solid get-color(light, panel);

                .m-exchange__historyorder__body-item-1 {
                    display: table-cell;
                    width: 55%;
                    vertical-align: top;
                }

                .m-exchange__historyorder__body-item-2 {
                    width: 35%;
                    display: table-cell;
                    vertical-align: top;
                }

                .m-exchange__historyorder__body-item-3 {
                    display: table-cell;
                    vertical-align: top;
                    text-align: right;
                }

                .m-exchange__historyorder__body-item-side {
                    /*font-weight: get-font-weight(bolder);*/
                }

                .m-exchange__historyorder__body-item-pair {
                    /*font-weight: get-font-weight(bolder);*/
                    display: inline-block;
                }

                .m-exchange__historyorder__body-item-status {
                    color: get-color(light, muted);
                    display: inline-block;
                }

                .m-exchange__historyorder__body-item-filled {
                    display: block;
                    /*font-weight: get-font-weight(bolder);*/
                }

                .m-exchange__historyorder__body-item-date {
                    color: get-color(light, muted);
                    display: block;
                }

                .m-exchange__historyorder__body-item-amount {
                    color: get-color(light, muted);
                    display: block;
                }

                .m-exchange__historyorder__body-item-dealprice {
                    display: block;
                    /*font-weight: get-font-weight(bolder);*/
                }

                .m-exchange__historyorder__body-item-price {
                    display: block;
                    color: get-color(light, muted);
                }

            }
            .listNone{
                text-align: center;
                padding: 1rem 0;
            }
            .empty_space {
                height: 6rem;
            }
        }

        .m-badge.m-badge--wide {
            letter-spacing: 0.6px;
            padding: 1px 10px;
        }

        .m-badge {
            line-height: 16px !important;
            min-height: 16px !important;
            min-width: 16px !important;
        }

        background-color: array-get($m--state-colors, light, base);
        border-color: array-get($m--state-colors, light, base);
    }

</style>

<script>
    import {XHeader, Group, Cell} from 'vux'
    import {Decimal} from 'decimal.js'
    import {exchangeList} from '@/modules/exchange/api/get_exchange'
    import {showloadings, hideloadings} from '@/utils/load'

    export default {
        name: 'historyorders',
        data() {
            return {
                buy: 'buy',
                exchangeListData: [],
                historyState: 'history',
                tips: true
            }
        },
        created() {
        },
        beforeRouteEnter(from, to, next) {
            next(vm => {
                vm.getExchangeList(vm.historyState)
            })
        },
        mounted() {
        },
        methods: {
            getExchangeList() {
                showloadings()
                exchangeList(this.historyState).then(res => {
                    if (res.status === 200) {
                        const data = res.data
                        if (data.code === '200') {
                            this.exchangeListData = data.data
                            hideloadings()
                        }
                    }
                })
            }
        },
        filters: {
            toUpper(val) {
                return val.toUpperCase()
            },
            strIntercept(val) {
                return val.substr(0, 19)
            },
            numberIntercept(val) {
                return new Decimal(val).toFixed(6)
            }
        },
        watch: {
        },
        components: {
            Group,
            XHeader,
            Cell
        }
    }
</script>
