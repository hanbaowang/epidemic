const { Crawler } = require('./crawler');

let TAcrawler = new Crawler({
    id: 'taian',
    url: 'http://wjw.taian.gov.cn/col/col45779/index.html',
    target: 'ul.main-fr-box',
    interval: 60 * 1000
})

let YZcrawler = new Crawler({
    id: 'yangzhou',
    url: 'http://wjw.yangzhou.gov.cn/yzwshjh/ywkd/wjw_list.shtml',
    target: 'ul.item',
    interval: 60 * 1000
})
