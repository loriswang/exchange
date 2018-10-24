module.exports = {
    proxy: {
        '/v1/user/auth/login': {     //这里是公共部分，在调用接口时后面接不相同的部分，/api就相当于http://192.168.0.199:8926/api这一段
            target: 'https://ht.fbank.io',   //这里写的是访问接口的域名和端口号
            changeOrigin: true, // 必须加上这个才能跨域请求
            secure: true
            // pathRewrite: {  // 重命名
            //   '^/api': '/'
            // }
        },
        '/v1/user/user/show': {
            target: 'https://ht.fbank.io',
            changeOrigin: true,
            secure: true
        },
        '/v1/wallet/account/balance': {
            target: 'https://ht.fbank.io',
            changeOrigin: true,
            secure: true
        },
        '/v1/common/symbols': {
            target: 'https://ht.fbank.io',
            changeOrigin: true,
            secure: true
        },
        '/v1/trade/orders': {
            target: 'https://ht.fbank.io',
            changeOrigin: true,
            secure: true
        }
    }
}