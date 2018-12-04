# Homework 6 - Fifteen Puzzle

## 简介

　　根据样例，制作一个简单的网页拼图游戏，可以另外设计UI或添加新功能，增加游戏的趣味性。

## 作业结果

- [Puzzle Game](https://reganfan.github.io/LearningWeb2.0/docs/Homework-6-Fifteen-Puzzle/index.html)

## 文件内容

```
|-- assets/                    // 资源文件夹
  |-- audio/                    // 项目使用到的音频资源
  |-- images/                   // 项目使用到的图像资源
  |-- resources/                // 原始资源
    |-- background/             // 可选用背景图片
    |-- cursor/                 // 鼠标图标(PNG)
    |-- fragments/              // 拼图原图片段
    |-- pics/                   // 拼图原图
|-- css/
  style.css                     // css文件
|-- js/
  script.js                     // javascript文件
  jquery-3.3.1.min.js           // jQuery 3.3.1(压缩)文件
index.html                      // 主页html文件
output.png                      // 样例输出截图
README.md                       // readme文档
```

## 问题说明

### 作业相关

1. 本次作业仅供个人的《Web2.0 程序设计》课程学习专用。
2. 经过个人检测，html文件以及css文件均已通过W3C检测。
3. 建议使用Google Chrome或Firefox浏览器打开网页使得效果最佳，Edge等其他浏览器可能会存在某些显示不佳的问题，不过并不影响正常游戏。
4. javascript代码文件因具体需要，使用到了**侵入式代码**直接修改了网页的css样式；另外，由于个人对jQuery中的带参数事件处理器调用方法不够熟悉，所以文件中会使用到部分全局变量，请体谅。
5. 在开始游戏之前，请**开启浏览器声音**，否则将无法接收提示语音来获得最佳体验。另外，需要说明的是，本提示语音并非打开页面即自动播放语音，而是在玩家进行相应页面交互后才播放的语音，但是玩家依然暂时无法主动取消语音，所以请体谅。

### 更新

1. 已将jQuery的CDN从Google替换成国内可流畅访问的BootCDN，同时备份了本地jQuery文件，现在网页加载速度更快了，也能够应对无网络连接进行游戏的情况(此时将不会收到提示语音，而是提示框，因此强烈建议保持网络连接正常)。
2. 解决了部分浏览器不支持`AudioContext`的问题，现在这部分浏览器可以正常执行游戏，不过游戏完成后将不会收到提示语音(也将会被改为提示框)。另外，**请使用IE浏览器的玩家允许浏览器加载网页脚本或控件**，否则将无法成功加载网页。
3. 现在网页极少可能会出现无法显示拼图的情况，在大多数情况下也能够正常游戏。欢迎大家提供游戏Bug来改进游戏。

### 资源相关

1. 原始资源文件夹中，背景图片来源于[《英雄联盟》宇宙(中国)官网的地区专题](https://yz.lol.qq.com/zh_CN/regions/)，分别为弗雷尔卓德、艾欧尼亚、巨神峰以及恕瑞玛的地区风景图片；鼠标图标截取自百度图片，并使用在线文件转换网页[Convertio](https://convertio.co/zh/)将图片从png转换为cur格式。
2. 拼图的原图来源于网络图片并只截取了部分作为拼图展示，各图画手详见致谢列表。
3. 音频原始资源来自**网易云音乐**电台——[英雄联盟英雄语音](https://music.163.com/#/djradio?id=349436516)。

### 致谢

　　资源文件中的拼图原图来自以下各画手的英雄联盟同人作品，感谢你们为我们带来优秀的作品。

- **ID**  [Chengwei Pan](https://www.artstation.com/pan)，**作品**  [Farewell](https://www.artstation.com/artwork/oOAWJ4)
- **ID**  [CONCEPT 4](https://www.artstation.com/concept_4)，**作品**  [Subterfuge - Camille](https://www.artstation.com/artwork/1kRoG)
- **ID**  [Dao Le Trong](https://www.artstation.com/daole)，**作品**  [Kai'Sa fanart](https://www.artstation.com/artwork/eGm5G)  [Riven](https://www.artstation.com/artwork/XVzgD)  [fanart League of Legends](https://www.artstation.com/artwork/8rdJE)
- **ID**  [Elena Ootkina](https://www.artstation.com/allien)，**作品**  [Sashimi Akali](https://www.artstation.com/artwork/BPEdl)
- **ID**  [mist XG](https://www.artstation.com/z361474408)，**作品**  [Darkness Ionia Ghost Assassin——Akali](https://www.artstation.com/artwork/6xndx)  [Darkness Ionia Source of darkness —— Master Yi](https://www.artstation.com/artwork/VkyV4)  [Champion poro 2017](https://www.artstation.com/artwork/8doEw)
- **ID**  [Joseph Lin](https://www.artstation.com/simca1017)，**作品**  [LOL Fan Art - IRELIA](https://www.artstation.com/artwork/K1ELR)
- **ID**  [kusanagi lin](https://www.artstation.com/kusanagilin)，**作品**  [Braum on the way to the fete](https://www.artstation.com/artwork/oYOgw)
- **ID**  [Raphael Massarani](https://www.artstation.com/rmassarani)，**作品**  [Masterchef Braum](https://www.artstation.com/artwork/nYNQK)
- **ID**  [Marisa Oh](https://www.artstation.com/marisaoh)，**作品**  [Fanart: Ashe, the Frost Archer](https://www.artstation.com/artwork/XP8zL)
- **ID**  [Linger FTC](https://www.artstation.com/lingerftc)，**作品**  [project lucian](https://www.artstation.com/artwork/m1VZ1)
- **ID**  [Xhilia JP](https://www.artstation.com/xhilia)，**作品**  [Xayah - League of Legends](https://www.artstation.com/artwork/owlAm)