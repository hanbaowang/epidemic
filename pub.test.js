const { pub } = require('./pub');
const http = require('http');  

jest.mock('http')

test('pub is useful', () => {
    expect(pub.taian[0]({
        text: '我市新增病患10人',
        href: 'xxx'
    })).toBe(true)
})
