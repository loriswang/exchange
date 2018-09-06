const parseUrl = function(url) {
    var result = []
    var query = url.split('?')[1]
    var queryArr = query.split('&')
    queryArr.forEach(function (item) {
        var obj = {}
        var value = item.split('=')[1]
        var key = item.split('=')[0]
        obj[key] = value
        result.push(obj)
    })
    return result
}

export default parseUrl