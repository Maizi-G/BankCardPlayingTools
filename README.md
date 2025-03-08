# BankCardPlayingTools （玩卡必备小工具）
这个网页旨在于方便爱玩卡的朋友们快速获取自己所需要的资源，比如外汇牌价。
## 功能一览
目前有以下功能：
### 1. BIN 检测器
基于 BinCheck.io 的API接口，准确率很高。我在返回数据的基础上额外对卡等级、卡组织、卡类别进行了汉化处理。如果有残缺的数据可以开issue反馈。
### 2. 外汇牌价查询
基于阿里云云市场上的一个收费接口（3￥/万次），覆盖五大行（没有邮储）以及招商、广大、浦发、兴业、中信十大银行的外汇牌价，更方便的比价，在买外汇时省下更多的钱！    
注：**本接口不是实时接口。**
### 3. 网申及网申进度查询
> TODO

这个页面展示各大银行网申入口和网申进度查询入口。

## 如何启动本项目？
### 安装依赖
```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```
### 配置环境变量
在根目录下创建.env文件，按照以下格式填充
``` env
RAPIDAPI_API_KEY=xxx
ALIYUN_APPCODE=xxx
```
### 启动
```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```
服务器默认启动在端口5000上。