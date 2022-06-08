# 网易云音乐 API

网易云音乐 Node.js API service

<p>
<a href="https://www.npmjs.com/package/NeteaseCloudMusicApi"><img src="https://img.shields.io/npm/v/NeteaseCloudMusicApi.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/NeteaseCloudMusicApi"><img src="https://img.shields.io/npm/l/NeteaseCloudMusicApi.svg" alt="License"></a>
<a href="https://www.npmjs.com/package/NeteaseCloudMusicApi"><img src="https://img.shields.io/david/dev/binaryify/NeteaseCloudMusicApi.svg" alt="devDependencies" ></a>
<a href="https://www.npmjs.com/package/NeteaseCloudMusicApi"><img src="https://img.shields.io/david/binaryify/NeteaseCloudMusicApi.svg" alt="devDependencies" ></a>
<a href="https://codeclimate.com/github/Binaryify/NeteaseCloudMusicApi"><img src="https://codeclimate.com/github/Binaryify/NeteaseCloudMusicApi/badges/gpa.svg" /></a>
</p>


## 灵感来自

[disoul/electron-cloud-music](https://github.com/disoul/electron-cloud-music)

[darknessomi/musicbox](https://github.com/darknessomi/musicbox)

[sqaiyan/netmusic-node](https://github.com/sqaiyan/netmusic-node)

[greats3an/pyncm](https://github.com/greats3an/pyncm)


## 环境要求

需要 NodeJS 8.12+ 环境

## 安装

```shell
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git 

$ npm install
```

或者

```shell
$ git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git

$ npm install
```

## 运行
调用前务必阅读文档的`调用前须知`

```shell
$ node app.js
```

服务器启动默认端口为 3000,若不想使用 3000 端口,可使用以下命令: Mac/Linux

```shell
$ PORT=4000 node app.js
```

windows 下使用 git-bash 或者 cmder 等终端执行以下命令:

```shell
$ set PORT=4000 && node app.js
```

## Vercel 部署

v4.0.8 加入了 Vercel 配置文件,可以直接在 Vercel 下部署了,不需要自己的服务器

### 操作方法

1. fork 此项目
2. 在 Vercel 官网点击 `New Project`
3. 点击 `Import Git Repository` 并选择你 fork 的此项目并点击`import`
4. 点击 `PERSONAL ACCOUNT` 的 `select`
5. 直接点`Continue`
6. `PROJECT NAME`自己填,`FRAMEWORK PRESET` 选 `Other` 然后直接点 `Deploy` 接着等部署完成即可  

## 可以在Node.js调用

v3.31.0后支持Node.js调用,导入的方法为`module`内的文件名,返回内容包含`status`和`body`,`status`为状态码,`body`为请求返回内容,参考`module_example` 文件夹下的 `test.js`

```js
const { login_cellphone, user_cloud } = require('NeteaseCloudMusicApi')
async function main() {
  try {
    const result = await login_cellphone({
      phone: '手机号',
      password: '密码'
    })
    console.log(result)
    const result2 = await user_cloud({
      cookie: result.body.cookie // 凭证
    })
    console.log(result2.body)
      
  } catch (error) {
    console.log(error)
  }
}
main()
```

## 支持 TypeScript

```ts
// test.ts
import { banner } from 'NeteaseCloudMusicApi'
banner({ type:0 }).then(res=>{
  console.log(res)
})
```


## 使用文档

[文档地址](https://binaryify.github.io/NeteaseCloudMusicApi) 

[文档地址2](https://neteasecloudmusicapi.vercel.app)

![文档](https://raw.githubusercontent.com/Binaryify/NeteaseCloudMusicApi/master/static/docs.png)


## 功能特性
1. 获取歌单，收藏，mv, dj 数量

2. flex布局

3.发现好歌单

4.轮播图

5.底部歌单条

6. 搜索

7. 搜索历史

8.搜索历史删除

## SDK

| 语言 |                    作者                     |                             地址                             |  类型  |
| :--: | :-----------------------------------------: | :----------------------------------------------------------: | :----: |
| Java |    [JackuXL](https://github.com/JackuXL)    | [https://github.com/JackuXL/NeteaseCloudMusicApi-SDK](https://github.com/JackuXL/NeteaseCloudMusicApi-SDK) | 第三方 |
| Java | [1015770492](https://github.com/1015770492) |       https://github.com/1015770492/yumbo-music-utils        | 第三方 |

## 贡献者

![](https://opencollective.com/NeteaseCloudMusicApi/contributors.svg?width=890)


## License

[The MIT License (MIT)](https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/LICENSE)
