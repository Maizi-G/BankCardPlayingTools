# 📌 BankCardPlayingTools （玩卡必备小工具）

**BankCardPlayingTools** 旨在方便玩卡的朋友们快速获取所需的资源，例如 **外汇牌价**、**BIN 检测** 等。

---

## 🎯 功能一览

### 🔍 1. BIN 检测器
✅ **基于 BinCheck.io API**，准确率高。
✅ 额外 **汉化卡等级、卡组织、卡类别**。
✅ 如果有残缺的数据，欢迎 **开 Issue 反馈**。

---

### 💱 2. 外汇牌价查询
✅ **基于阿里云云市场收费接口**（3￥/万次）。
✅ 覆盖 **十大银行**（工商、农业、中国、建设、交通、招商、广发、浦发、兴业、中信）。
✅ **更方便比价，省钱买外汇！** 💰
⚠️ **本接口不是实时接口**。

---

### 🏦 3. 网申及网申进度查询
> 🚧 **TODO**

✅ 展示各大银行 **网申入口** 和 **网申进度查询入口**。

---

## 🚀 如何启动本项目？

### 📦 1. 安装依赖
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

---

### 🔧 2. 配置环境变量
在项目 **根目录** 下创建 `.env` 文件，并按照以下格式填充：
```env
RAPIDAPI_API_KEY=your_rapidapi_key
ALIYUN_APPCODE=your_aliyun_appcode
```

---

### ▶️ 3. 启动开发服务器
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
服务器默认运行在 **http://localhost:5000**

---

## 🐳 使用 Docker 部署

### 📥 1. 拉取 Docker 镜像
```bash
docker pull maizicn/bankcardtools:latest
```

### 🚀 2. 运行 Docker 容器
```bash
docker run -d --name bankcardtools \
  --restart unless-stopped \
  -p 5000:3000 \
  -e RAPIDAPI_API_KEY=your_rapidapi_key \
  -e ALIYUN_APPCODE=your_aliyun_appcode \
  maizicn/bankcardtools:latest
```

### 🛠️ 3. 常用 Docker 命令
#### 查看容器状态
```bash
docker ps
```
#### 查看容器日志
```bash
docker logs -f bankcardtools
```
#### 进入容器内部
```bash
docker exec -it bankcardtools sh
```
#### 停止 & 删除容器
```bash
docker stop bankcardtools && docker rm bankcardtools
```

---

## 📜 License
本项目基于 **AGPL-3.0 许可证** 开源，欢迎使用和贡献！

🚀 **如果你觉得这个项目有帮助，欢迎 Star 支持！** ⭐

