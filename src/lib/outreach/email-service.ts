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
    this.transporter = nodemailer.createTransport({
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
   * Send outreach email
   */
  async sendOutreachEmail(email: EmailContent): Promise<boolean> {
    try {
      // Verify configuration
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
   * Send batch emails (with delay)
   */
  async sendBatchEmails(emails: EmailContent[], delayMs: number = 5000): Promise<number> {
    let successCount = 0;
    
    for (const email of emails) {
      try {
        const success = await this.sendOutreachEmail(email);
        if (success) successCount++;
        
        // Add delay to avoid being marked as spam
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
   * Format email HTML content
   */
  private formatEmailHtml(content: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MBTI TEST - Outreach Collaboration</title>
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
        <p>Professional 16 Personality Types Test Platform</p>
    </div>
    
    <div class="content">
        ${content}
    </div>
    
    <div class="footer">
        <p>
            <strong>MBTI TEST</strong><br>
            Website: <a href="https://www.mbti16personalities.online">www.mbti16personalities.online</a><br>
            Professional personality test platform serving 10+ million users worldwide
        </p>
        <p style="font-size: 12px; margin-top: 20px;">
            If you do not wish to receive such emails, please reply "Unsubscribe".
        </p>
    </div>
</body>
</html>
    `.trim();
  }

  /**
   * Convert HTML to plain text
   */
  private htmlToText(html: string): string {
    return html
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Verify email configuration
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
