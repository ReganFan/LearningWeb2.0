# 文件内容说明

```
|--css/
    info_style.css                             // 用户信息页面css文件
    jquery.mCustomScrollbar.css                // 滑动块样式模块css文件
    style.css                                  // 注册主页css文件
|--html/
    index.html                                 // 本地生成的注册主页html文件
    index.pug                                  // 注册主页pug文件
    info.html                                  // 本地生成的用户信息html文件
    info.pug                                   // 用户信息页面pug文件
|--image/                                      // 图片文件夹
|--js/
    info_script.js                             // 用户信息页面事件处理js文件
    jquery.mCustomScrollbar.concat.min.js      // 滑动块样式模块实现js文件
    script.js                                  // 注册主页事件处理js文件(客户端)
    validityCheck.js                           // 输入字符数据校验模块实现js文件
package-lock.json                              // 包信息lock.json文件
package.json                                   // 包信息json文件
signin.js                                      // 本地服务器实现js文件
```

## 利用pug插件生成本地html

　　`html`文件夹中本地生成的两个html文件是使用全局安装的`pug`模块生成，目的是用于设计样式以及检查静态页面效果。

　　全局安装pug：

```powershell
> npm install pug
```

　　本地生成静态html文件(以`index.pug`为例)：

```powershell
> cd html              # 进入当前目录
> pug index.pug -P -w  # -P表示生成非压缩版的html(即有缩进), -w表示可以实现动态自动生成
```

　　而在实际项目中，则是使用`pug.renderFile(path, options)`生成`html`文件，详细可见`pug`[官网](https://pugjs.org/api/getting-started.html)的`API`介绍。

## 滑动块样式模块

　　在本系统使用该模块的原因，主要是因为文档需求里，对邮箱的格式长度没有实际的要求，也就是有可能最后注册用户的邮箱信息会超过用户信息页面的显示框部分，这需要使用到浏览器滑动块来辅助显示。

　　为了更好的视觉效果，所以利用了[malihu custom scrollbar plugin](https://github.com/malihu/malihu-custom-scrollbar-plugin)模块，可以在多种浏览器中实现较为一致的滑动块样式，兼容性较高，而且美观(见[Demo](http://manos.malihu.gr/repository/custom-scrollbar/demo/examples/complete_examples.html))。

　　上述的`jquery.mCustomScrollbar.css`、`jquery.mCustomScrollbar.concat.min.js`和`info_script.js`文件均是为了实现这个效果，如下所示：

![scollbar_style](../output/output_scollbar_style.png)

## 控制台样式模块 - colors

　　因为注册系统页面的用户交互与服务器响应频繁，如果在控制台上使用单一颜色来展示各种请求和响应，将不容易分析与发现错误。所以这里简单地使用了`colors`模块，安装与使用见[color.js](https://www.npmjs.com/package/colors)。

　　根据之前的样例显示中，现在项目控制台只提供了注册用户的信息显示与响应，如果想要进一步获知各个页面的`request`与`response`消息信息，可以看`signin.js`中注释进行适当修改。