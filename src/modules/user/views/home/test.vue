<template>
    <div>
        test
    </div>
</template>

<script>
    import { test } from '@/modules/user/api/get_user'
    import { mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'test13',
        data () {
            return {}
        },
        created () {
            this.getData()
        },
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            ...mapMutations(['SET_USER']),
            getData () {
                console.log('11111111')
                test().then(response => {
                    console.log(this.user)
//                    this.SET_USER(response.data)
//                    console.log(this.user)
                    console.log(response)
                })
            }
        }
    }
</script>


