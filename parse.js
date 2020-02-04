const cheerio = require('cheerio');

// input $: dom
// output: [{
//   href: string
//   text: string   
// }]
function taian(doc) {
    const pattern = /<\s*a\s*target="_blank"\shref="http:\/\/wjw.taian.gov.cn[^>]*>(.*?)<\s*\/\s*a>/g
    const results = []

    doc.html().match(pattern).map(elem => {
        let $ = cheerio.load(elem);
        results.push({
            href: $('a').attr('href'),
            text: $('a').text()
        })
    })

    return results;
}

function yangzhou(doc) {
    const results = []
    const prefix = 'http://wjw.yangzhou.gov.cn'

    doc.children('li').each((i, elem) => {
        let $a = doc.children(elem).children('a')
        results.push({
            href: prefix + $a.attr('href'),
            text: $a.text()
        })
    })

    console.log(results)
    return results;
}


module.exports = {
    parseBy: {
        taian,
        yangzhou
    }
}