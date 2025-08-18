import nodemailer from 'nodemailer';

export interface EmailContent {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * 发送外链建设邮件
   */
  async sendOutreachEmail(email: EmailContent): Promise<boolean> {
    try {
      // 验证配置
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('SMTP configuration not complete, email sending skipped');
        return false;
      }

      const info = await this.transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email.to,
        subject: email.subject,
        text: email.text || this.htmlToText(email.html),
        html: this.formatEmailHtml(email.html),
      });

      console.log('Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  /**
   * 批量发送邮件（带延迟）
   */
  async sendBatchEmails(emails: EmailContent[], delayMs: number = 5000): Promise<number> {
    let successCount = 0;
    
    for (const email of emails) {
      try {
        const success = await this.sendOutreachEmail(email);
        if (success) successCount++;
        
        // 添加延迟避免被标记为垃圾邮件
        if (delayMs > 0) {
          await this.delay(delayMs);
        }
      } catch (error) {
        console.error(`Failed to send email to ${email.to}:`, error);
      }
    }
    
    return successCount;
  }

  /**
   * 格式化邮件HTML内容
   */
  private formatEmailHtml(content: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MBTI TEST - 外链合作</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #6366f1;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #6366f1;
        }
        .content {
            white-space: pre-line;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
        }
        .cta {
            background-color: #6366f1;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            display: inline-block;
            margin: 20px 0;
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin-bottom: 8px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">MBTI TEST</div>
        <p>专业16型人格测试平台</p>
    </div>
    
    <div class="content">
        ${content}
    </div>
    
    <div class="footer">
        <p>
            <strong>MBTI TEST</strong><br>
            网站：<a href="https://www.mbti16personalities.online">www.mbti16personalities.online</a><br>
            服务全球1000万+用户的专业性格测试平台
        </p>
        <p style="font-size: 12px; margin-top: 20px;">
            如果您不希望收到此类邮件，请回复"取消订阅"。
        </p>
    </div>
</body>
</html>
    `.trim();
  }

  /**
   * 将HTML转换为纯文本
   */
  private htmlToText(html: string): string {
    return html
      .replace(/<[^>]*>/g, '') // 移除HTML标签
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * 延迟函数
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 验证邮件配置
   */
  async verifyConfiguration(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('SMTP configuration verified successfully');
      return true;
    } catch (error) {
      console.error('SMTP configuration verification failed:', error);
      return false;
    }
  }
}
