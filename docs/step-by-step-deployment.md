# 外链建设自动化系统部署指南

## 🎯 完整部署步骤

### 第一步：环境准备

#### 1.1 安装必需依赖
```bash
# 安装邮件服务依赖
npm install nodemailer @types/nodemailer

# 更新 Prisma 客户端
npx prisma generate
```

#### 1.2 配置环境变量
在 `.env.local` 文件中添加以下配置：

```bash
# 【必需】定时任务安全密钥 - 用于保护API端点
CRON_SECRET="your-32-character-secret-key-here"

# 【必需】数据库连接
DATABASE_URL="postgresql://username:password@localhost:5432/mbtitest"

# 【可选】邮件服务配置 - 用于实际发送外链邮件
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-gmail-app-password"
SMTP_FROM="MBTI TEST <your-email@gmail.com>"

# 【必需】网站配置
NEXT_PUBLIC_SITE_URL="https://www.mbti16personalities.online"
```

> **重要提醒**: CRON_SECRET 必须是强密码，建议32字符以上的随机字符串

### 第二步：数据库设置

#### 2.1 运行数据库迁移
```bash
# 生成 Prisma 客户端
npx prisma generate

# 运行迁移，创建外链相关表
npx prisma migrate deploy
```

#### 2.2 验证数据库表
运行以下命令验证表是否正确创建：
```bash
npx prisma studio
```

应该看到以下新表：
- `OutreachCampaign` (外链活动)
- `OutreachTarget` (目标网站)
- `OutreachActivity` (活动记录)
- `Backlink` (外链记录)

### 第三步：邮件服务配置 (可选但推荐)

#### 3.1 Gmail 配置
1. 启用 Gmail 的两步验证
2. 生成应用专用密码：
   - 访问 Google 账户设置
   - 安全 → 两步验证 → 应用专用密码
   - 生成新密码并记录

#### 3.2 其他邮件服务
- **SendGrid**: 使用 API 密钥
- **Mailgun**: 配置 SMTP 认证
- **Amazon SES**: 使用 IAM 凭证

### 第四步：本地测试

#### 4.1 构建项目
```bash
npm run build
```

#### 4.2 启动开发服务器
```bash
npm run dev
```

#### 4.3 测试API端点
```bash
# 测试状态查询 (应返回统计数据)
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  http://localhost:3000/api/outreach/status

# 测试手动触发 (应返回成功消息)
curl -X POST \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"campaignType": "guest_posting", "targetCount": 2}' \
  http://localhost:3000/api/cron/outreach
```

### 第五步：Vercel 部署

#### 5.1 配置 Vercel 环境变量
在 Vercel Dashboard 中添加以下环境变量：
```
CRON_SECRET=your-32-character-secret-key
DATABASE_URL=your-production-database-url
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=MBTI TEST <your-email@gmail.com>
NEXT_PUBLIC_SITE_URL=https://www.mbti16personalities.online
```

#### 5.2 验证 Cron Jobs 配置
确认 `vercel.json` 包含：
```json
{
  "crons": [
    {
      "path": "/api/cron/outreach",
      "schedule": "0 9 * * *"
    }
  ]
}
```

#### 5.3 部署到生产环境
```bash
vercel --prod
```

### 第六步：生产环境验证

#### 6.1 验证定时任务
```bash
# 测试生产环境端点
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  https://www.mbti16personalities.online/api/outreach/status
```

#### 6.2 访问管理界面
访问：`https://www.mbti16personalities.online/zh-CN/admin/outreach`

您应该看到：
- 外链建设统计仪表板
- 实时数据更新
- 手动触发按钮

### 第七步：监控和维护

#### 7.1 设置监控
- 在 Vercel Dashboard 查看函数日志
- 监控定时任务执行状态
- 跟踪邮件发送成功率

#### 7.2 日常维护任务
- 每周检查外链建设效果
- 更新目标网站列表
- 优化邮件模板内容
- 分析回复率和成功率

## 🚀 快速启动流程

如果您急需快速部署，按以下最小配置执行：

```bash
# 1. 设置环境变量
echo 'CRON_SECRET="'$(openssl rand -base64 32)'"' >> .env.local
echo 'DATABASE_URL="your-database-url"' >> .env.local

# 2. 安装依赖和迁移
npm install nodemailer @types/nodemailer
npx prisma generate
npx prisma migrate deploy

# 3. 构建和部署
npm run build
vercel --prod
```

## 🔧 故障排除

### 常见问题及解决方案

#### 问题：定时任务未执行
**解决方案**：
1. 检查 `CRON_SECRET` 是否正确配置
2. 验证 Vercel Cron Jobs 设置
3. 查看 Vercel 函数日志

#### 问题：邮件发送失败
**解决方案**：
1. 验证 SMTP 配置
2. 检查 Gmail 应用密码
3. 确认邮件服务商限制

#### 问题：数据库连接错误
**解决方案**：
1. 验证 `DATABASE_URL` 格式
2. 检查数据库服务状态
3. 确认网络连接权限

#### 问题：管理界面无法访问
**解决方案**：
1. 检查 Next.js 路由配置
2. 验证组件导入路径
3. 查看浏览器控制台错误

## 📊 成功指标

部署成功后，您应该观察到：

### 技术指标
- ✅ 定时任务每天按时执行
- ✅ API 端点正常响应
- ✅ 数据库正常记录活动
- ✅ 邮件发送成功率 > 90%

### 业务指标
- 📈 每日外链联系数：5-10个网站
- 📈 回复率：15-25%
- 📈 接受率：5-15%
- 📈 新增外链：每月2-5个

## 🎯 优化建议

### 提升效果的方法
1. **优化邮件模板**：A/B测试不同的主题和内容
2. **精准目标筛选**：提高域名权威性门槛
3. **个性化内容**：为不同类型网站定制邮件
4. **建立关系**：与成功合作的网站保持长期联系

### 扩展功能
1. **自动跟进**：添加邮件自动跟进功能
2. **回复分析**：使用AI分析邮件回复内容
3. **竞争分析**：监控竞争对手的外链策略
4. **效果预测**：基于历史数据预测成功率

恭喜！您的外链建设自动化系统现在已经完全配置并运行。系统将自动开始寻找高质量的外链机会并发送专业的外联邮件。
