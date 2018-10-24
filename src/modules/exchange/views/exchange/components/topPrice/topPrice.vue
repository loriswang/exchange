<template>
    <div class="m-exchange__orderbook-ticker">
        <h1 class="m-exchange__orderbook-ticker-price m--font-success" v-if="this.localTopPrice === null">
            null
        </h1>
        <h1 class="m-exchange__orderbook-ticker-price m--font-success" v-else="">
            {{this.localTopPrice.last}}
        </h1>
        <span class="m-exchange__orderbook-ticker-rmb">
            ≈ 0 CNY
        </span>
    </div>
</template>
<script type="text/ecmascript-6">
    import {mapState, mapActions} from 'vuex'
    import Decimal from 'decimal.js'
    export default {
        name: 'topPrice',
        data() {
            return {
                localTopPrice: null
            }
        },
        created() {},
        mounted() {
            if (this.topPrice) {
                this.localTopPrice = this.topPrice
            }
//            设置交易价格vuex变量
            this.setExchangePrice(this.localTopPrice.last)
        },
        updated() {
            this.numFixed()
        },
        methods: {
            ...mapActions([
                'buyPrice',
                'sellPrice'
            ]),
            setExchangePrice(num) {
                this.buyPrice(num)
                this.sellPrice(num)
            },
            numFixed() {
                this.localTopPrice.last = new Decimal(this.localTopPrice.last).toFixed(this.selectSymbol.price_precision)
            }
        },
        computed: {
            ...mapState({
                topPrice: state => state.exchange.topPrice,
                selectSymbol: state => state.exchange.selectSymbol
            })
        },
        watch: {
            topPrice() {
                this.localTopPrice = this.topPrice
            }
        },
        filters: {
        }
    }
</script>

<style scoped>

</style>
