# epidemic

疫情爬虫，爬取卫健委官网的新闻列表

## install

1. 安装node
2. 安装redis
3. 根目录 `npm install`
4. 二次开发

## 二次开发

### index.js

创建爬虫实例，参数为

```js
{
    id: 'taian', // 城市id
    url: 'http://wjw.taian.gov.cn/col/col45779/index.html', // 网站地址
    target: 'ul.main-fr-box', // 包含新闻<li>的模块
    interval: 60 * 1000 // 大致间隔
}
```

### parse.js

由爬虫结果页面，转换为目标信息：

```js
[{
    href: string, // 新闻列表href
    text: string // 新闻标题
}, {...}]
```

### pub.js

将结果发送至目标服务器

