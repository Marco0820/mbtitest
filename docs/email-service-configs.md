# 邮件服务配置指南

## 主流邮件服务配置

### 1. Gmail
```bash
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-16-digit-app-password"
```

**获取应用密码：**
- 访问：https://myaccount.google.com/security
- 启用两步验证
- 生成应用密码

### 2. Outlook/Hotmail
```bash
SMTP_HOST="smtp-mail.outlook.com"
SMTP_PORT="587"
SMTP_USER="your-email@outlook.com"
SMTP_PASS="your-password"
```

### 3. SendGrid（推荐用于大量邮件）
```bash
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
```

**获取API密钥：**
- 注册：https://sendgrid.com/
- Settings → API Keys → Create API Key
- 选择 "Full Access" 权限

### 4. Mailgun
```bash
SMTP_HOST="smtp.mailgun.org"
SMTP_PORT="587"
SMTP_USER="postmaster@your-domain.mailgun.org"
SMTP_PASS="your-mailgun-password"
```

### 5. Amazon SES
```bash
SMTP_HOST="email-smtp.us-east-1.amazonaws.com"
SMTP_PORT="587"
SMTP_USER="your-aws-access-key"
SMTP_PASS="your-aws-secret-key"
```

## 邮件配置测试

### 快速测试脚本
```bash
# 测试SMTP连接
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

transporter.verify().then(() => {
  console.log('✅ SMTP配置正确');
}).catch((error) => {
  console.log('❌ SMTP配置错误:', error.message);
});
"
```

### 发送测试邮件
```bash
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

transporter.sendMail({
  from: 'your-email@gmail.com',
  to: 'test@example.com',
  subject: '测试邮件',
  text: '这是一封测试邮件'
}).then(() => {
  console.log('✅ 测试邮件发送成功');
}).catch((error) => {
  console.log('❌ 邮件发送失败:', error.message);
});
"
```

## 安全建议

1. **使用应用密码**：不要使用主账户密码
2. **环境变量**：敏感信息存储在环境变量中
3. **权限最小化**：只授予必要的邮件发送权限
4. **监控使用**：定期检查邮件发送日志
5. **备用配置**：准备多个邮件服务作为备用
