const http = require('http');
const { db } = require('./db')

let me = {
    url: 'http://YOURSERVER',
    name: 'me',
    service: 'taian'
}

let somebody = {
    url: 'http://HERURL',
    name: 'somebody',
    service: 'yangzhou'
}

let fixedSubscribersFor = {
    yangzhou: [me, somebody],
    taian: [me]
}

async function pubFor(id, result) {
    let DBSubscribers = await getSubscribersFor(id) || [];
    let fixedSubscribers = fixedSubscribersFor[id] || [];
    let subscribers = DBSubscribers.concat(fixedSubscribers);

    subscribers.forEach(subscriber => {
        serverChen(subscriber.url, result, filter.bind(this, result, subscriber.whiteList, subscriber.blackList))
    });
}

async function getSubscribersFor(id) {
    let subscribers = await db.getSubscribers(id);
    return subscribers;
}

function serverChen(url, result, filter) {
    if (filter && !filter(result)) return false
    http.get(url + '?text=' + result.text + '&desp=' + `标题: ${result.text}, 链接: ${result.href}`)
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
    pub: pubFor,
    filter
}