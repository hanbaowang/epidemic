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
        this.options =  {
            uri: this.url,
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
        }
    }


}


module.exports = {
    Crawler
}