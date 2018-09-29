<template>
    <div class="m-numberinput">
        <div class="m-numberinput__area">
            <input
                    type="number"
                    v-bind:value="numericValue"
                    @input="oninput"
                    :class="inputClass"
                    :min="min"
                    :max="max"
                    :step="this.step"
                    debounce="500"
            />
            <span class="m-numberinput__area-text">{{this.unit}}</span>
        </div>

        <div v-if="controls===0" class="m-numberinput__control">
            <a @click.prevent="decreaseNumber" :class="buttonClass">-</a>
            <a @click.prevent="increaseNumber" :class="buttonClass">+</a>
        </div>

        <div v-if="controls===1" class="m-numberinput__control">
            <a @click.prevent="quarterNumber" :class="buttonTextClass">1/4</a>
            <a @click.prevent="halfNumber" :class="buttonTextClass">1/2</a>
            <a @click.prevent="allNumber" :class="buttonTextClass">全部</a>
        </div>
    </div>
</template>

<script>
    import {Decimal} from 'decimal.js'
    import {mapActions} from 'vuex'

    export default {
        name: 'NumberInput',
        data: function () {
            return {
                numericValue: this.value,
                numericStep: this.step
            }
        },
        props: {
            tabIndex: {
                type: Number
            },
            controls: {
                type: Number
            },
            disabled: Boolean,
            value: {
                default: 0,
                type: String | Number
            },
            min: {
                default: 0,
                type: Number
            },
            max: {
                default: 10,
                type: Number | String
            },
            step: {
                default: '1',
                type: String | Function
            },
            inputClass: {
                default: 'm-numberinput__area-input',
                type: String
            },
            buttonClass: {
                default: 'm-numberinput__control-button',
                type: String
            },
            buttonTextClass: {
                default: 'm-numberinput__control-button m-numberinput__control-button-text',
                type: String
            },
            unit: {
                type: String
            },
            len: {
                default: 1,
                type: Number
            },
            remainderWallet: {
                default: 0,
                type: Number | String
            }
        },
        created() {
            this.saveVuexPN(+this.numericValue)
        },
        methods: {
            ...mapActions([
                'sellPrice',
                'sellNumber'
            ]),
            saveVuexPN(value) {
                if (this.controls === 0) {
                    // 保存价格
                    this.sellPrice(value)
                } else if (this.controls === 1) {
                    // 保存数量
                    this.sellNumber(value)
                }
            },
            formatDeciaml() {
                this.numericValue = new Decimal(this.numericValue)
                this.numericStep = new Decimal(this.numericStep)
            },
//            -------------------加减--------------------
            increaseNumber() {
                this.formatDeciaml()
                this.numericValue = this.numericValue.plus(this.numericStep)
            },
            decreaseNumber() {
                this.formatDeciaml()
                this.numericValue = this.numericValue.minus(this.numericStep)
            },
//            -----------------输入--------------------
//            判断输入时小数点后位数,超出不允许输入
            oninput(e) {
                e.target.value = (e.target.value.match(/^\d*(\.?\d{0,4})/g)[0]) || null
                this.numericValue = e.target.value
            },
//            ---------------------四分之一------------------------
            quarterNumber() {
                const DTotalNum = new Decimal(this.remainderWallet).div(4).toFixed(this.len)
                this.numericValue = DTotalNum
            },
//            --------------------二分之一-------------------------
            halfNumber() {
                const DTotalNum = new Decimal(this.remainderWallet).div(2).toFixed(this.len)
                this.numericValue = DTotalNum
            },
//            ---------------------全部------------------------
            allNumber() {
                const DTotalNum = new Decimal(this.remainderWallet).div(1).toFixed(this.len)
                this.numericValue = DTotalNum
            }
        },
        watch: {
            value: function () {
                this.numericValue = this.value
            },
            step: function () {
                this.numericStep = this.step
            },
            remainderWallet() {
//                console.log(this.remainderWallet)
            },
            numericValue() {
                this.saveVuexPN(+this.numericValue)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/css/mc/config.scss";

    *,
    *::after,
    *::before {
        box-sizing: border-box;
    }

    .m-numberinput {
        display: flex;
        flex-wrap: nowrap;
        margin-bottom: $m--space;
        color: get-color(light, muted);

        .m-numberinput__area {
            flex: 1;
            position: relative;

            .m-numberinput__area-input {
                width: 100%;
                padding: 1rem 1.5rem;
                font-size: get-font-size(regular, '++');
                outline: none;
                border-radius: 0;
                border: 1px solid get-color(light, panel);

                -webkit-appearance: none;
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }

                &:focus {
                    //border-color: array-get($m--state-colors, brand, base);
                }
            }

            .m-numberinput__area-text {
                position: absolute;
                right: 5%;
                top: 50%;
                transform: translateY(-50%);
                padding: 0 .15rem;
                font-size: get-font-size(regular, '++');
            }

        }

        .m-numberinput__control {
            /*display: flex;*/
            border: 1px solid get-color(light, panel);
            border-left: none;
            border-radius: 0;
            padding: 5px 0;
            font-size: get-font-size(regular, '+++++');

            .m-numberinput__control-button {
                text-align: center;
                -webkit-appearance: none;
                cursor: pointer;
                outline: none;

                &:hover {
                    /*background: lighten(#387e90, 10%);*/
                }
            }

            .m-numberinput__control-button-text {
                font-size: get-font-size(regular, '++') !important;
            }

            a {
                padding: 0 $m--space;
                &:not(:first-child) {
                    border-left: 1px solid get-color(light, panel);
                }
            }

        }
    }
</style>
