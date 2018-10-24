<template>
    <div>
        <div class="m-exchange__orderbook">
            <div class="m-exchange__orderbook-buy">
                <div class="m-exchange__orderbook-header">
                    <span class="m-exchange__orderbook-hand">买</span>
                    <span class="m-exchange__orderbook-amount">数量</span>
                    <span class="m-exchange__orderbook-price">价格</span>
                </div>
                <div class="m-exchange__orderbook-depth">
                    <div class="m-exchange__orderbook-depth-item"
                         @click="setPrice(item[0])"
                         v-if="index < 5"
                         v-for="(item, index) in this.localData.asks">
                        <span class="m-exchange__orderbook-hand">{{index + 1}}</span>
                        <span class="m-exchange__orderbook-amount">{{item[1] | numFixed}}</span>
                        <span class="m-exchange__orderbook-price">{{item[0] | numFixed}}</span>
                        <span class="m-exchange__orderbook-bg" style="width: 100%"></span>
                    </div>
                </div>
            </div>
            <div class="m-exchange__orderbook-sell">
                <div class="m-exchange__orderbook-header">
                    <span class="m-exchange__orderbook-price">价格</span>
                    <span class="m-exchange__orderbook-amount">数量</span>
                    <span class="m-exchange__orderbook-hand">卖</span>
                </div>
                <div class="m-exchange__orderbook-depth">
                    <div class="m-exchange__orderbook-depth-item"
                         @click="setPrice(item[0])"
                         v-if="index < 5"
                         v-for="(item, index) in this.localData.bids">
                        <span class="m-exchange__orderbook-price">{{item[0] | numFixed}}</span>
                        <span class="m-exchange__orderbook-amount">{{item[1] | numFixed}}</span>
                        <span class="m-exchange__orderbook-hand">{{index + 1}}</span>
                        <span class="m-exchange__orderbook-bg" style="width: 100%"></span>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {mapActions} from 'vuex'
    import Decimal from 'decimal.js'
    export default {
        name: 'handicap',
        data() {
            return {
                localData: {}
            }
        },
        props: [
            'handicapData'
        ],
        mounted() {
            if (this.handicapData) {
                this.localData = this.handicapData
            }
        },
        methods: {
            ...mapActions([
                'exchangePrice',
                'buyPrice',
                'sellPrice'
            ]),
            setPrice(val) {
                this.exchangePrice(val)
                this.buyPrice(val)
                this.sellPrice(val)
            }
        },
        filters: {
            numFixed(val) {
                return new Decimal(val).toFixed(4)
            }
        },
        watch: {
            handicapData() {
                this.localData = this.handicapData
            }
        }
    }
</script>

<style scoped>

</style>
