<h1 align="center">ant-back</h1>

![react](https://img.shields.io/badge/react-%5E16.8.6-green)
![MIT](https://img.shields.io/badge/license-MIT-red)
![antd](https://img.shields.io/badge/antd-%5E3.26.4-blue)

网站后台项目，实现了多角色登录、权限管理、用户管理、菜单管理、文章管理、富文本、图片上传等常用功能。你可以在本项目基础上定制自己的后台系统。

:rocket: [查看效果点这里](http://back.1cloud.xyz/)

:gem: [后端项目地址点这里](https://github.com/sunft1996/ant-back-server/)

## 说明
> 项目跑起来后首页有使用说明，里面有接口文档，还有添加页面、添加接口的教程。
> 
> 数据库文件在后端项目中。
> 
> 如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！:stuck_out_tongue_closed_eyes:

## 技术栈
前端：react + ant-design-pro

后端：node.js + koa + sequelize + mysql

## 部分截图

#### 首页：

![页面图片-首页](http://back.1cloud.xyz/uploadImg/1591359501170_index.png)

#### 角色管理：

![页面图片-角色管理](http://back.1cloud.xyz/uploadImg/1589959890213_role.png)

#### 用户管理：
![页面图片-用户管理](http://back.1cloud.xyz/uploadImg/1590906137979_%E9%A1%B5%E9%9D%A2-%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86.jpg)

#### 列表页demo：
![页面图片-列表页demo](http://back.1cloud.xyz/uploadImg/1590906398027_rolePageList.jpg)

#### 写文章：

![页面图片-写文章](http://back.1cloud.xyz/uploadImg/1589959795874_article.png)

## 安装和运行
> 请确保已安装node

```
git clone https://github.com/sunft1996/ant-back-server.git
cd ant-back
npm install 
<!--安装依赖后项目运行-->
npm start 
```
如果npm install或者时间太长，配置npm registry到国内镜像
```
npm config set registry https://registry.npm.taobao.org/
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
<!--重新install-->
npm install 
```
实在不行你就用yarn下载
```
npm install -g yarn
yarn install
<!--运行项目-->
yarn start
```

**项目跑起来后你可以用以下两个账号登录：**

管理员 账号：root
，密码：123456

游客 账号：user，
密码：123456

## 项目部署

修改路径 
```
// src/global.js

// 修改为你的后端项目运行地址
export const imgUrl = 'http://back.1cloud.xyz';
```
执行命令
```
// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
```

## 功能
- [x] 登录/注销
- [x] 修改密码
- [x] 新增用户
- [x] 用户管理
- [x] 角色管理
- [x] 按钮级权限
- [x] 菜单管理
- [x] 文章管理
- [x] 成功页/失败页
- [x] 403页/404页/500页
- [x] 富文本编辑器
- [x] 图片上传
- [x] 图表


## 关于权限
项目实现了多角色登录，你可以用root账号给角色分配权限。你可以给一个页面添加新增、删除、修改等功能添加子权限，具体看项目首页的使用说明。

## 如何添加页面

后台项目通常是列表和对应的增删改查，我写了一个示例列表页提供参考，你可以直接复制它来添加页面。
**跟着项目首页的教程走一遍即可。**


## License
[MIT](https://github.com/sunfutao/ant-back/blob/master/LICENSE)
