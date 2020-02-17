const { filter } = require('./pub');

test('"新增" can pass filter', () => {
    expect(filter({
        text: '我市新增病患10人',
        href: 'xxx'
    })).toBe(true)
})

test('only "培训" cannot pass filter', () => {
    expect(filter({
        text: '一大堆培训正在前来',
        href: 'yyy'
    })).toBe(false)
})

test('"新增" can pass filter directly', () => {
    expect(filter({
        text: '我市新增培训10项',
        href: 'zzz'
    })).toBe(true)
})