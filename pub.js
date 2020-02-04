const http = require('http');  

function me(result) {
    let url = 'YOUR SERVER';
    http.get(url + '?text=' + '有新的卫健委新闻' + '&desp=' + `标题: ${result.text}, 链接: ${result.href}`)
}

module.exports = {
    pub: {
        taian: [me],
        yangzhou: [me]
    }
}