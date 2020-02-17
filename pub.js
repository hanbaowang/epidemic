const http = require('http');  

function me(result) {
    let url = 'http://YOURSERVER';
    return serverChen(url, result)
}

function somebody(result) {
    let url = 'http://HERURL';
    return serverChen(url, result)
}

function serverChen(url, result, filter) {
    if (filter && !filter(result)) return false
    http.get(url + '?text=' + '有新的卫健委新闻' + '&desp=' + `标题: ${result.text}, 链接: ${result.href}`)
    return true
}

function filter(result, whiteList = ["新增", "轨迹", "确诊", "治愈", "病例"], blackList = ["带队", "督导", "致敬", "坚守", "培训"]) {

    for (let i = 0; i < whiteList.length; i++) {
        if (result.text.indexOf(whiteList[i]) !== -1) {
            return true
        }
    }
    
    for (let i = 0; i < blackList.length; i++) {
        if (result.text.indexOf(blackList[i]) !== -1) {
            return false
        }
    }

    return true
}

module.exports = {
    pub: {
        taian: [me],
        yangzhou: [me, somebody]
    },

    filter: filter
}