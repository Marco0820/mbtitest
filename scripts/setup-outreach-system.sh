#!/bin/bash

echo "🚀 设置MBTI测试网站外链建设自动化系统"
echo "================================================"

# 检查必需的工具
echo "📋 检查系统依赖..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装，请先安装 npm"
    exit 1
fi

echo "✅ 系统依赖检查完成"

# 安装依赖
echo "📦 安装项目依赖..."
npm install nodemailer @types/nodemailer

# 检查环境变量
echo "🔧 检查环境变量配置..."
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local 文件不存在，正在创建模板..."
    cat > .env.local << EOF
# 数据库配置
DATABASE_URL="your-database-url-here"

# NextAuth 配置
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# 定时任务安全密钥（请修改为强密码）
CRON_SECRET="$(openssl rand -base64 32)"

# 邮件服务配置
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="MBTI TEST <your-email@gmail.com>"

# 网站配置
NEXT_PUBLIC_SITE_URL="https://www.mbti16personalities.online"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
EOF
    echo "✅ .env.local 模板已创建，请填入实际配置"
else
    echo "✅ .env.local 文件已存在"
fi

# 检查必需的环境变量
source .env.local 2>/dev/null || true
if [ -z "$CRON_SECRET" ]; then
    echo "❌ CRON_SECRET 未配置，请在 .env.local 中设置"
    exit 1
fi

if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL 未配置，请在 .env.local 中设置"
    exit 1
fi

echo "✅ 环境变量检查完成"

# 运行数据库迁移
echo "🗄️  运行数据库迁移..."
npx prisma generate
npx prisma migrate deploy

if [ $? -eq 0 ]; then
    echo "✅ 数据库迁移完成"
else
    echo "❌ 数据库迁移失败，请检查 DATABASE_URL 配置"
    exit 1
fi

# 测试邮件配置
echo "📧 测试邮件配置..."
node -e "
const EmailService = require('./dist/lib/outreach/email-service.js').EmailService;
const emailService = new EmailService();
emailService.verifyConfiguration().then(result => {
    if (result) {
        console.log('✅ 邮件配置验证成功');
        process.exit(0);
    } else {
        console.log('⚠️  邮件配置验证失败，请检查 SMTP 设置');
        process.exit(0);
    }
}).catch(err => {
    console.log('⚠️  邮件配置测试跳过（可选配置）');
    process.exit(0);
});
" || echo "⚠️  邮件配置测试跳过"

# 构建项目
echo "🔨 构建项目..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 项目构建完成"
else
    echo "❌ 项目构建失败"
    exit 1
fi

# 测试定时任务端点
echo "🧪 测试定时任务端点..."
if command -v curl &> /dev/null; then
    # 启动开发服务器
    npm run dev &
    DEV_PID=$!
    
    # 等待服务器启动
    sleep 10
    
    # 测试端点
    response=$(curl -s -w "%{http_code}" -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/outreach/status)
    http_code="${response: -3}"
    
    if [ "$http_code" = "200" ]; then
        echo "✅ 定时任务端点测试成功"
    else
        echo "⚠️  定时任务端点测试失败 (HTTP $http_code)"
    fi
    
    # 停止开发服务器
    kill $DEV_PID 2>/dev/null || true
else
    echo "⚠️  curl 未安装，跳过端点测试"
fi

echo ""
echo "🎉 外链建设自动化系统设置完成！"
echo "================================================"
echo ""
echo "📋 下一步操作："
echo "1. 检查并完善 .env.local 中的配置"
echo "2. 配置邮件服务（Gmail应用密码等）"
echo "3. 在 Vercel 中添加环境变量"
echo "4. 部署到生产环境"
echo ""
echo "🔧 管理界面："
echo "- 访问 /zh-CN/admin/outreach 查看外链建设状态"
echo "- 手动触发任务：POST /api/cron/outreach"
echo "- 查看统计：GET /api/outreach/status"
echo ""
echo "⏰ 定时任务："
echo "- 每天 UTC 9:00 自动执行外链建设"
echo "- 可在 vercel.json 中调整执行时间"
echo ""
echo "🚨 重要提醒："
echo "- 确保 CRON_SECRET 足够复杂"
echo "- 定期监控邮件发送状态"
echo "- 遵守反垃圾邮件法规"
echo "- 保持适当的发送频率"
