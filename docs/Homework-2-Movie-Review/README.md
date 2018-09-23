# Homework 2 - Movie Review

## 简介

　　根据模版，利用学习的HTML和CSS布局以及盒模型知识，制作一个相同的电影评论网页。

## 作业结果

- [电影评论页面](https://reganfan.github.io/LearningWeb2.0/docs/Homework-2-Movie-Review/tmnt.html)

## 代码文件内容

```
|-- images/                           // 制作网页所用图像文件夹
|-- output/                           // 网页样例输出
	expected_output.png               // 网页模版(预期输出)
	output_pixelperfect.png           // 模版输出对比截图(使用了pixel perfect)
	output.png                        // 网页输出截图
	output_wide.png                   // 宽窗口网页输出截图
movie.css                             // 网页css文件
tmnt.html                             // 网页html文件
README.md                             // readme文档
```

## 开发平台工具

1. **编辑器：**Sublime Text 3
2. **系统：**Windows 10 - 64bit
3. **浏览器：**Firefox 62.0.2(64bit)
4. **浏览器插件：**PerfectPixel by WellDoneCode

## 其他相关问题

1. tmnt.html以及movie.css是本次任务的主要文件，请主要查阅这些文件内容和输出结果。
2. 个人本次任务是在**Win 10(64位)**系统上使用**Sublime Text 3**进行代码编写，同时利用**Firefox(62.0.2 64bit)**浏览器以及浏览器插件**PerfectPixel by WellDoneCode**进行效果检查。
3. 网页样例输出文件夹output/中，expected_output.png为提供的模版输出，output.png为个人编写网页的结果输出截图，output_wide.png为宽窗口下个人编写网页的结果输出截图，同时，output_pixelperfect.png为利用前述插件将模版图与结果输出网页对比的效果截图。
4. 在output_pixelperfect.png中可以看到，在第一条评论内容以及右侧的电影信息列表中均出现了不重合部分，个人认为，前者除非修改html文件的文本内容，否则不可能实现重合；后者则是个人利用Firefox的开发者工具调试修改后效果较优的结果(尽管还是不能完全重合)，其中在css文件里修改了`dd`的`margin-bottom`数值，使得结果输出尽可能地与模版重合。
5. 强烈建议使用Firefox浏览器以及PerfectPixel by WellDoneCode插件来进行评阅，因不同浏览器间的渲染效果不同，所以不建议使用Chrome进行评阅。
6. 经个人测试，上述的html以及css文件均已通过W3C的检测。