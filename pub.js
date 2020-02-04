const http = require('http');  

function me(result) {
    console.error(result);
    let url = 'https://127.0.0.1:8080';
    http.get(url + '?text=' + 'news updated' + '&desp=' + `
        news: ${result.text},
        href: ${result.href},
    `)
}

module.exports = {
    pub: {
        taian: [me],
        yangzhou: [me]
    }
}