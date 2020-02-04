const request = require('request-promise');
const cheerio = require('cheerio');
const { bus } = require('./bus');
const { db } = require('./db');
const { parseBy } = require('./parse');

class Crawler {
    // params: {
    //     url, target, interval
    // }
    constructor(params) {
        this.id = params.id;
        this.url = params.url;
        // target is the element containing news list
        this.target = params.target;
        this.interval = params.interval;
        this.options = {
            uri: this.url,
            headers:{
                'Host': 'wjw.yangzhou.gov.cn',
                'Connection': 'keep-alive',
                'Cache-Control': 'max-age=0',
                'Upgrade-Insecure-Requests': 1,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'  
            },
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        if (bus.getEvents().indexOf(this.id) === -1) {
            bus.addEvent(this.id);
        }
    }

    async crawl() {
        console.error('crawling');

        const $ = await request(this.options).catch(err => {
            console.error(err)
        });

        const results = parseBy[this.id]($(this.target))

        let hasLastOne = await db.has(this.id, results[0])
        if (!hasLastOne) {
            results.forEach(async result => {
                let hasOne = await db.has(this.id, result)
                if (!hasOne) {
                    db.add(this.id, result);
                    bus.newEvent(this.id, result);
                }
            })
        } else {
            console.log('wait for next time')
        }
    }


}


module.exports = {
    Crawler
}