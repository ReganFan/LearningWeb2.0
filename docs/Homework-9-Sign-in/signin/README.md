# 文件内容说明

　　本应用设计参考了[MVC](https://zh.wikipedia.org/zh-hans/MVC)模式，其中路由文件根据不同的URL访问调用对应的Controller作为响应处理函数，而不同Controller会根据不同的交互访问要求，调用数据库Models(`usersManager.js`)的函数对数据库进行访问处理，再渲染对应的Views模版，最后在网页上呈现出来。

```
|--bin/
    www                          // 应用入口(可执行文件)
|--controllers/                  // MVC Controllers
    accessController.js          // 访问交互(包括访问他人页面交互)控制文件
    indexController.js           // 主交互(包括已登录用户交互)控制文件
    loginController.js           // 登录交互控制文件
    mainController.js            // 主控制器
    registController.js          // 注册交互控制文件
|--data/
    |--db/                       // 数据存储路径(可选)
|--models/                       // MVC Models
    userSchema.js                // 数据库数据模版(mongoose)
    usersManager.js              // 数据库访问控制js文件
|--public/                       // 资源文件夹
    |--images/
    |--javascripts/              // 客户端js文件
    |--stylesheets/              // 页面css文件
|--routes/
    indexRouter.js               // Express路由
|--views/                        // MVC Views 页面模版文件(pug)
app.js                           // 服务端文件
package.json                     // 包信息文件
README.md                        // 本readme文档
```

## 依赖包

```
"dependencies": {
  "bcryptjs": "^2.4.3",
  "connect-mongo": "^2.0.3",
  "cookie-parser": "~1.4.3",
  "debug": "~2.6.9",
  "express": "~4.16.0",
  "express-session": "^1.15.6",
  "http-errors": "~1.6.2",
  "mongodb": "^3.1.10",
  "mongoose": "^5.4.1",
  "morgan": "~1.9.0",
  "pug": "2.0.0-beta11"
}
```

　　`connect-mongo`包是`express-session`以MongoDB作为Sessions存储空间所需要的接口包，因此在应用执行时，访问数据库会找到用于存放用户会话信息的`sessions`集合。