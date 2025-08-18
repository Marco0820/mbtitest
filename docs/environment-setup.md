# 环境变量配置指南

## 必需的环境变量

请在 `.env.local` 文件中添加以下配置：

```bash
# 数据库配置
DATABASE_URL="postgresql://username:password@localhost:5432/mbtitest?schema=public"

# NextAuth 配置
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# 定时任务安全密钥（必需）
CRON_SECRET="your-super-secret-cron-key-here"

# 邮件服务配置（用于外链建设邮件发送）
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="MBTI TEST <your-email@gmail.com>"

# 外链检查API密钥（可选）
AHREFS_API_KEY="your-ahrefs-api-key"
MOZ_API_KEY="your-moz-api-key"
MAJESTIC_API_KEY="your-majestic-api-key"

# Google Search Console API（可选）
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_REFRESH_TOKEN="your-google-refresh-token"

# 网站配置
NEXT_PUBLIC_SITE_URL="https://www.mbti16personalities.online"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# 搜索API配置（用于博客内容抓取）
SEARCHAPI_KEY="your-searchapi-key"
```

## 环境变量说明

### 必需配置

1. **CRON_SECRET**: 用于保护定时任务端点的安全密钥
2. **DATABASE_URL**: PostgreSQL数据库连接字符串
3. **NEXTAUTH_SECRET**: NextAuth.js加密密钥

### 邮件服务配置

如果需要实际发送外链邮件，请配置SMTP设置：

- **Gmail**: 使用应用专用密码
- **SendGrid**: 使用API密钥
- **其他服务**: 根据提供商配置

### 可选API集成

这些API可以增强外链分析功能：

- **Ahrefs**: 用于外链发现和分析
- **Moz**: 用于域名权威性评估
- **Majestic**: 用于信任流量分析
- **Google Search Console**: 用于搜索数据分析

## 快速设置

1. 复制环境变量模板
2. 填入您的实际配置值
3. 确保CRON_SECRET足够复杂（建议32字符以上）
4. 测试数据库连接
5. 验证邮件服务配置
