function me(result) {
    console.error(result);
    return
    let url = ''
    fetch(url + '?text=' + 'news updated' + '&desp' + `
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