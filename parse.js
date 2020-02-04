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
            test: $('a').text()
        })
    })

    console.log(results)
    return results;
}

function yangzhou(doc) {
    console.log(doc.html())
}


module.exports = {
    parseBy: {
        taian,
        yangzhou
    }
}