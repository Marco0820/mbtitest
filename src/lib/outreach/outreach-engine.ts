import { prisma } from '@/lib/db';
import axios from 'axios';

export interface OutreachTarget {
  id: string;
  domain: string;
  contactEmail?: string;
  type: 'blog' | 'forum' | 'directory' | 'social' | 'guest_post' | 'resource_page';
  authority: number; // 1-100
  relevance: number; // 1-100
  lastContactDate?: Date;
  status: 'pending' | 'contacted' | 'responded' | 'accepted' | 'rejected';
  notes?: string;
}

export interface OutreachCampaign {
  id: string;
  name: string;
  type: 'guest_posting' | 'resource_submission' | 'broken_link' | 'testimonial' | 'partnership';
  targets: OutreachTarget[];
  template: string;
  scheduledDate: Date;
  status: 'active' | 'paused' | 'completed';
}

export class OutreachEngine {
  private readonly maxDailyOutreach = 10; // 安全限制
  private readonly minInterval = 3600000; // 1小时最小间隔
  
  constructor() {}

  /**
   * 获取高质量外链目标网站
   */
  async findOutreachTargets(niche: string = 'psychology'): Promise<OutreachTarget[]> {
    // 高质量心理学和职业发展相关网站
    const targets: Partial<OutreachTarget>[] = [
      // 心理学博客和网站
      { domain: 'psychologytoday.com', type: 'blog', authority: 95, relevance: 90 },
      { domain: 'verywellmind.com', type: 'blog', authority: 85, relevance: 85 },
      { domain: 'mindtools.com', type: 'resource_page', authority: 80, relevance: 88 },
      { domain: 'careerguidance.com', type: 'blog', authority: 75, relevance: 92 },
      { domain: 'linkedin.com/pulse', type: 'blog', authority: 100, relevance: 80 },
      
      // 职业发展网站
      { domain: 'indeed.com/career-advice', type: 'resource_page', authority: 95, relevance: 85 },
      { domain: 'glassdoor.com/blog', type: 'blog', authority: 90, relevance: 80 },
      { domain: 'monster.com/career-advice', type: 'blog', authority: 85, relevance: 82 },
      
      // 教育和自我发展
      { domain: 'coursera.org/articles', type: 'resource_page', authority: 95, relevance: 75 },
      { domain: 'edx.org/blog', type: 'blog', authority: 90, relevance: 70 },
      { domain: 'skillshare.com/blog', type: 'blog', authority: 80, relevance: 75 },
      
      // 商业和管理
      { domain: 'harvard.edu/business-review', type: 'blog', authority: 100, relevance: 80 },
      { domain: 'entrepreneur.com', type: 'blog', authority: 85, relevance: 78 },
      { domain: 'inc.com', type: 'blog', authority: 88, relevance: 76 },
      
      // 论坛和社区
      { domain: 'reddit.com/r/psychology', type: 'forum', authority: 95, relevance: 85 },
      { domain: 'reddit.com/r/careeradvice', type: 'forum', authority: 95, relevance: 88 },
      { domain: 'quora.com', type: 'forum', authority: 90, relevance: 82 },
      
      // 目录和资源页面
      { domain: 'dmoz.org', type: 'directory', authority: 70, relevance: 60 },
      { domain: 'allpsych.com', type: 'directory', authority: 65, relevance: 95 },
      { domain: 'psychology.org', type: 'directory', authority: 75, relevance: 90 },
    ];

    return targets.map(target => ({
      id: `target_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      domain: target.domain!,
      type: target.type!,
      authority: target.authority!,
      relevance: target.relevance!,
      status: 'pending' as const,
    }));
  }

  /**
   * 创建外链建设活动
   */
  async createOutreachCampaign(
    name: string, 
    type: OutreachCampaign['type'],
    targetCount: number = 5
  ): Promise<OutreachCampaign> {
    const targets = await this.findOutreachTargets();
    const selectedTargets = this.selectBestTargets(targets, targetCount);
    
    const campaign: OutreachCampaign = {
      id: `campaign_${Date.now()}`,
      name,
      type,
      targets: selectedTargets,
      template: this.getTemplateForType(type),
      scheduledDate: new Date(),
      status: 'active'
    };

    // 保存到数据库
    await this.saveCampaignToDatabase(campaign);
    
    return campaign;
  }

  /**
   * 执行自动化外链建设
   */
  async executeOutreachCampaign(campaignId: string): Promise<void> {
    const campaign = await this.getCampaignFromDatabase(campaignId);
    if (!campaign || campaign.status !== 'active') {
      console.log('Campaign not found or not active');
      return;
    }

    const today = new Date();
    const dailyLimit = await this.getDailyOutreachCount(today);
    
    if (dailyLimit >= this.maxDailyOutreach) {
      console.log('Daily outreach limit reached');
      return;
    }

    const pendingTargets = campaign.targets.filter(t => t.status === 'pending');
    const remainingSlots = this.maxDailyOutreach - dailyLimit;
    const targetsToContact = pendingTargets.slice(0, remainingSlots);

    for (const target of targetsToContact) {
      try {
        await this.executeOutreach(target, campaign);
        await this.delay(this.minInterval); // 安全间隔
      } catch (error) {
        console.error(`Failed to contact ${target.domain}:`, error);
      }
    }
  }

  /**
   * 选择最佳外链目标
   */
  private selectBestTargets(targets: OutreachTarget[], count: number): OutreachTarget[] {
    return targets
      .sort((a, b) => {
        // 按权威性和相关性加权评分
        const scoreA = (a.authority * 0.6) + (a.relevance * 0.4);
        const scoreB = (b.authority * 0.6) + (b.relevance * 0.4);
        return scoreB - scoreA;
      })
      .slice(0, count);
  }

  /**
   * 根据类型获取邮件模板
   */
  private getTemplateForType(type: OutreachCampaign['type']): string {
    const templates = {
      guest_posting: `
        Subject: 高质量客座文章投稿 - MBTI性格测试专业内容

        您好！

        我是MBTI TEST (www.mbti16personalities.online) 的内容团队负责人。我们是一个专业的16型人格测试平台，为全球超过1000万用户提供科学的性格分析服务。

        我注意到您的网站 {{domain}} 在心理学/职业发展领域有很高的权威性，内容质量很棒。我想为您的读者提供一些有价值的内容。

        我可以为您撰写以下主题的原创文章：
        • "如何利用MBTI提升团队协作效率"
        • "16型人格在职业选择中的科学应用"
        • "MBTI在现代心理学中的发展与争议"

        文章特点：
        ✓ 100%原创内容，基于科学研究
        ✓ 2000-3000字深度分析
        ✓ 包含实用的案例和建议
        ✓ 符合您网站的内容风格

        如果您感兴趣，我很乐意先发送一个详细的文章大纲供您审阅。

        期待您的回复！

        最好的祝愿,
        MBTI TEST 内容团队
      `,
      
      resource_submission: `
        Subject: 推荐优质MBTI测试资源 - 适合您的资源页面

        您好！

        我发现您在 {{domain}} 上维护了一个很棒的{{niche}}资源列表。作为专业的性格测试平台，我想推荐我们的免费MBTI测试工具，它可能对您的访客很有价值。

        MBTI TEST 特色：
        • 基于权威的迈尔斯-布里格斯理论
        • 60道科学验证的测试题目
        • 95%以上的测试准确率
        • 支持21种语言
        • 完全免费使用

        网站链接：https://www.mbti16personalities.online

        如果您认为这个资源适合您的页面，我将非常感激。我们也很乐意在我们的网站上推荐您的优质内容。

        谢谢您的时间！

        诚挚问候,
        MBTI TEST 团队
      `,
      
      broken_link: `
        Subject: 发现您网站上的失效链接 - 免费修复建议

        您好！

        我在浏览您精彩的网站 {{domain}} 时，发现了一些可能已经失效的链接：
        
        {{broken_links}}

        作为一个同样关注用户体验的网站运营者，我想这可能对您的SEO和用户体验产生影响。

        如果您需要替代资源，我们的MBTI测试平台提供了高质量的性格分析内容，可能适合作为替代链接：
        https://www.mbti16personalities.online

        我们的内容包括：
        • 科学的16型人格分析
        • 职业发展指导
        • 人际关系建议

        希望这个信息对您有帮助！

        最佳祝愿,
        MBTI TEST 团队
      `,
      
      testimonial: `
        Subject: 为您的优秀服务提供推荐证言

        您好！

        我们是MBTI TEST团队，一直在使用{{service_name}}，对您的服务质量印象深刻。

        我们希望能为您提供一个真实的推荐证言，展示我们的使用体验。作为交换，如果可能的话，我们希望在证言中包含我们网站的链接。

        我们的证言将重点描述：
        • 服务的专业性和可靠性
        • 对我们业务的具体帮助
        • 推荐给其他同行的理由

        如果您感兴趣，我很乐意起草一个证言供您审阅。

        期待合作！

        MBTI TEST 团队
      `,
      
      partnership: `
        Subject: 探讨潜在合作机会 - MBTI测试与{{domain}}

        您好！

        我是MBTI TEST的业务发展负责人。我们专注于提供专业的16型人格测试服务，目前服务于全球1000万+用户。

        我注意到您在{{niche}}领域的专业影响力，想探讨一些可能的合作机会：

        1. 内容合作：共同创作高质量的心理学/职业发展内容
        2. 资源互换：相互推荐优质内容和工具
        3. 联合营销：共同推广相关活动或产品

        我们的平台特色：
        • 科学权威的测试体系
        • 多语言全球化支持
        • 强大的用户群体基础
        • 专业的内容创作团队

        如果您有兴趣了解更多，我很乐意安排一次简短的通话讨论具体合作方式。

        期待您的回复！

        MBTI TEST 业务发展团队
      `
    };

    return templates[type] || templates.guest_posting;
  }

  /**
   * 执行具体的外链联系
   */
  private async executeOutreach(target: OutreachTarget, campaign: OutreachCampaign): Promise<void> {
    try {
      // 生成个性化邮件内容
      const emailContent = this.generatePersonalizedEmail(target, campaign);
      
      // 模拟发送邮件（在实际应用中，这里会集成邮件服务）
      console.log(`Executing outreach to ${target.domain} for campaign ${campaign.name}`);
      console.log('Email content preview:', emailContent.subject);
      
      // 更新目标状态
      await prisma.outreachTarget.update({
        where: { id: target.id },
        data: {
          status: 'contacted',
          lastContactDate: new Date()
        }
      });
      
      // 记录外链活动
      await this.logOutreachActivity({
        targetDomain: target.domain,
        campaignId: campaign.id,
        type: campaign.type,
        timestamp: new Date(),
        status: 'sent'
      });
      
      // 实际发送邮件的代码会在这里
      // await this.sendEmail(emailContent);
      
    } catch (error) {
      console.error(`Failed to execute outreach to ${target.domain}:`, error);
      throw error;
    }
  }
  
  /**
   * 生成个性化邮件内容
   */
  private generatePersonalizedEmail(target: OutreachTarget, campaign: OutreachCampaign): { subject: string; content: string } {
    let template = campaign.template;
    
    // 替换模板变量
    template = template.replace(/{{domain}}/g, target.domain);
    template = template.replace(/{{niche}}/g, this.getNicheForDomain(target.domain));
    
    // 提取主题行
    const subjectMatch = template.match(/Subject: (.+)/);
    const subject = subjectMatch ? subjectMatch[1] : `外链合作机会 - ${target.domain}`;
    
    // 移除主题行，保留邮件正文
    const content = template.replace(/Subject: .+\n\n/, '');
    
    return { subject, content };
  }
  
  /**
   * 根据域名获取细分领域
   */
  private getNicheForDomain(domain: string): string {
    if (domain.includes('psychology')) return '心理学';
    if (domain.includes('career')) return '职业发展';
    if (domain.includes('business')) return '商业管理';
    if (domain.includes('education')) return '教育';
    return '专业发展';
  }

  /**
   * 获取每日外链联系数量
   */
  private async getDailyOutreachCount(date: Date): Promise<number> {
    try {
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      
      const count = await prisma.outreachActivity.count({
        where: {
          timestamp: {
            gte: startOfDay,
            lte: endOfDay
          },
          status: 'sent'
        }
      });
      
      return count;
    } catch (error) {
      console.error('Failed to get daily outreach count:', error);
      return 0;
    }
  }

  /**
   * 延迟函数
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 保存活动到数据库
   */
  private async saveCampaignToDatabase(campaign: OutreachCampaign): Promise<void> {
    try {
      // 保存活动
      await prisma.outreachCampaign.create({
        data: {
          id: campaign.id,
          name: campaign.name,
          type: campaign.type,
          template: campaign.template,
          scheduledDate: campaign.scheduledDate,
          status: campaign.status,
          targets: {
            create: campaign.targets.map(target => ({
              id: target.id,
              domain: target.domain,
              contactEmail: target.contactEmail,
              type: target.type,
              authority: target.authority,
              relevance: target.relevance,
              status: target.status,
              notes: target.notes
            }))
          }
        }
      });
      console.log(`Campaign ${campaign.name} saved to database`);
    } catch (error) {
      console.error('Failed to save campaign to database:', error);
      throw error;
    }
  }

  /**
   * 从数据库获取活动
   */
  private async getCampaignFromDatabase(campaignId: string): Promise<OutreachCampaign | null> {
    try {
      const campaign = await prisma.outreachCampaign.findUnique({
        where: { id: campaignId },
        include: { targets: true }
      });
      
      if (!campaign) {
        return null;
      }
      
      return {
        id: campaign.id,
        name: campaign.name,
        type: campaign.type as OutreachCampaign['type'],
        template: campaign.template,
        scheduledDate: campaign.scheduledDate,
        status: campaign.status as OutreachCampaign['status'],
        targets: campaign.targets.map(target => ({
          id: target.id,
          domain: target.domain,
          contactEmail: target.contactEmail || undefined,
          type: target.type as OutreachTarget['type'],
          authority: target.authority,
          relevance: target.relevance,
          lastContactDate: target.lastContactDate || undefined,
          status: target.status as OutreachTarget['status'],
          notes: target.notes || undefined
        }))
      };
    } catch (error) {
      console.error('Failed to load campaign from database:', error);
      return null;
    }
  }

  /**
   * 记录外链活动日志
   */
  private async logOutreachActivity(activity: {
    targetDomain: string;
    campaignId: string;
    type: string;
    timestamp: Date;
    status: string;
  }): Promise<void> {
    try {
      await prisma.outreachActivity.create({
        data: {
          targetDomain: activity.targetDomain,
          campaignId: activity.campaignId,
          type: activity.type,
          status: activity.status,
          timestamp: activity.timestamp
        }
      });
      console.log('Outreach activity logged:', activity);
    } catch (error) {
      console.error('Failed to log outreach activity:', error);
    }
  }
}
