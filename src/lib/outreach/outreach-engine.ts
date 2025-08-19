import { prisma } from '@/lib/db';
import axios from 'axios';
import { EmailService } from '@/lib/outreach/email-service';

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
  private readonly maxDailyOutreach = 10; // Safety limit
  private readonly minInterval = 3600000; // 1 hour minimum interval
  
  constructor() {}

  /**
   * Get high-quality backlink target websites
   */
  async findOutreachTargets(niche: string = 'psychology'): Promise<OutreachTarget[]> {
    // High-quality psychology and career development related websites
    const targets: Partial<OutreachTarget>[] = [
      // Psychology blogs and websites
      { domain: 'psychologytoday.com', type: 'blog', authority: 95, relevance: 90 },
      { domain: 'verywellmind.com', type: 'blog', authority: 85, relevance: 85 },
      { domain: 'mindtools.com', type: 'resource_page', authority: 80, relevance: 88 },
      { domain: 'careerguidance.com', type: 'blog', authority: 75, relevance: 92 },
      { domain: 'linkedin.com/pulse', type: 'blog', authority: 100, relevance: 80 },
      
      // Career development websites
      { domain: 'indeed.com/career-advice', type: 'resource_page', authority: 95, relevance: 85 },
      { domain: 'glassdoor.com/blog', type: 'blog', authority: 90, relevance: 80 },
      { domain: 'monster.com/career-advice', type: 'blog', authority: 85, relevance: 82 },
      
      // Education and self-development
      { domain: 'coursera.org/articles', type: 'resource_page', authority: 95, relevance: 75 },
      { domain: 'edx.org/blog', type: 'blog', authority: 90, relevance: 70 },
      { domain: 'skillshare.com/blog', type: 'blog', authority: 80, relevance: 75 },
      
      // Business and management
      { domain: 'harvard.edu/business-review', type: 'blog', authority: 100, relevance: 80 },
      { domain: 'entrepreneur.com', type: 'blog', authority: 85, relevance: 78 },
      { domain: 'inc.com', type: 'blog', authority: 88, relevance: 76 },
      
      // Forums and communities
      { domain: 'reddit.com/r/psychology', type: 'forum', authority: 95, relevance: 85 },
      { domain: 'reddit.com/r/careeradvice', type: 'forum', authority: 95, relevance: 88 },
      { domain: 'quora.com', type: 'forum', authority: 90, relevance: 82 },
      
      // Directories and resource pages
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
   * Create outreach campaign
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

    // Save to database
    await this.saveCampaignToDatabase(campaign);
    
    return campaign;
  }

  /**
   * Execute automated outreach campaign
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
        await this.delay(this.minInterval); // Safety interval
      } catch (error) {
        console.error(`Failed to contact ${target.domain}:`, error);
      }
    }
  }

  /**
   * Select best outreach targets
   */
  private selectBestTargets(targets: OutreachTarget[], count: number): OutreachTarget[] {
    return targets
      .sort((a, b) => {
        // Weighted scoring by authority and relevance
        const scoreA = (a.authority * 0.6) + (a.relevance * 0.4);
        const scoreB = (b.authority * 0.6) + (b.relevance * 0.4);
        return scoreB - scoreA;
      })
      .slice(0, count);
  }

  /**
   * Get email template based on type
   */
  private getTemplateForType(type: OutreachCampaign['type']): string {
    const templates = {
      guest_posting: `
        Subject: High-Quality Guest Article Submission - Professional MBTI Content

        Hello!

        I'm the content team lead at MBTI TEST (www.mbti16personalities.online). We are a professional 16 personality types testing platform providing scientific personality analysis services to over 10 million users worldwide.

        I noticed that your website {{domain}} has high authority in the psychology/career development field with excellent content quality. I'd like to provide valuable content for your readers.

        I can write original articles on the following topics:
        • "How to Use MBTI to Improve Team Collaboration Efficiency"
        • "Scientific Application of 16 Personality Types in Career Selection"
        • "Development and Controversies of MBTI in Modern Psychology"

        Article features:
        ✓ 100% original content based on scientific research
        ✓ 2000-3000 words in-depth analysis
        ✓ Contains practical cases and suggestions
        ✓ Matches your website's content style

        If you're interested, I'd be happy to send a detailed article outline for your review first.

        Looking forward to your reply!

        Best regards,
        MBTI TEST Content Team
      `,
      
      resource_submission: `
        Subject: Recommend Quality MBTI Test Resource - Perfect for Your Resource Page

        Hello!

        I found that you maintain an excellent {{niche}} resource list on {{domain}}. As a professional personality testing platform, I'd like to recommend our free MBTI test tool, which could be valuable for your visitors.

        MBTI TEST Features:
        • Based on authoritative Myers-Briggs theory
        • 60 scientifically validated test questions
        • Over 95% test accuracy
        • Supports 21 languages
        • Completely free to use

        Website link: https://www.mbti16personalities.online

        If you think this resource is suitable for your page, I would be very grateful. We'd also be happy to recommend your quality content on our website.

        Thank you for your time!

        Best regards,
        MBTI TEST Team
      `,
      
      broken_link: `
        Subject: Found Broken Links on Your Website - Free Fix Suggestions

        Hello!

        While browsing your excellent website {{domain}}, I discovered some links that may have become broken:
        
        {{broken_links}}

        As a website operator who also cares about user experience, I think this might affect your SEO and user experience.

        If you need alternative resources, our MBTI testing platform provides high-quality personality analysis content that might be suitable as replacement links:
        https://www.mbti16personalities.online

        Our content includes:
        • Scientific 16 personality type analysis
        • Career development guidance
        • Interpersonal relationship advice

        Hope this information is helpful to you!

        Best wishes,
        MBTI TEST Team
      `,
      
      testimonial: `
        Subject: Providing Testimonial for Your Excellent Service

        Hello!

        We are the MBTI TEST team and have been using {{service_name}}. We are impressed with your service quality.

        We would like to provide you with a genuine testimonial showcasing our experience. In exchange, if possible, we hope to include a link to our website in the testimonial.

        Our testimonial will focus on:
        • The professionalism and reliability of the service
        • Specific help to our business
        • Reasons to recommend to other peers

        If you're interested, I'd be happy to draft a testimonial for your review.

        Looking forward to collaboration!

        MBTI TEST Team
      `,
      
      partnership: `
        Subject: Exploring Potential Collaboration Opportunities - MBTI TEST & {{domain}}

        Hello!

        I'm the business development lead at MBTI TEST. We focus on providing professional 16 personality type testing services, currently serving 10+ million users worldwide.

        I noticed your professional influence in the {{niche}} field and would like to explore some potential collaboration opportunities:

        1. Content Collaboration: Co-create high-quality psychology/career development content
        2. Resource Exchange: Mutually recommend quality content and tools
        3. Joint Marketing: Jointly promote related activities or products

        Our platform features:
        • Scientifically authoritative testing system
        • Multi-language global support
        • Strong user community base
        • Professional content creation team

        If you're interested in learning more, I'd be happy to arrange a brief call to discuss specific collaboration methods.

        Looking forward to your reply!

        MBTI TEST Business Development Team
      `
    };

    return templates[type] || templates.guest_posting;
  }

  /**
   * Execute specific outreach contact
   */
  private async executeOutreach(target: OutreachTarget, campaign: OutreachCampaign): Promise<void> {
    try {
      // Generate personalized email content
      const emailContent = this.generatePersonalizedEmail(target, campaign);
      
      // Send email if contact address is available
      console.log(`Executing outreach to ${target.domain} for campaign ${campaign.name}`);
      const emailService = new EmailService();
      if (target.contactEmail) {
        await emailService.sendOutreachEmail({
          to: target.contactEmail,
          subject: emailContent.subject,
          html: emailContent.content
        });
      } else {
        console.log(`No contactEmail for ${target.domain}, skipping email send`);
      }
      
      // Update target status
      await prisma.outreachTarget.update({
        where: { id: target.id },
        data: {
          status: 'contacted',
          lastContactDate: new Date()
        }
      });
      
      // Record outreach activity
      await this.logOutreachActivity({
        targetDomain: target.domain,
        campaignId: campaign.id,
        type: campaign.type,
        timestamp: new Date(),
        status: 'sent',
        emailSubject: emailContent.subject,
        emailContent: emailContent.content
      });
      
    } catch (error) {
      console.error(`Failed to execute outreach to ${target.domain}:`, error);
      throw error;
    }
  }
  
  /**
   * Generate personalized email content
   */
  private generatePersonalizedEmail(target: OutreachTarget, campaign: OutreachCampaign): { subject: string; content: string } {
    let template = campaign.template;
    
    // Replace template variables
    template = template.replace(/{{domain}}/g, target.domain);
    template = template.replace(/{{niche}}/g, this.getNicheForDomain(target.domain));
    
    // Extract subject line
    const subjectMatch = template.match(/Subject: (.+)/);
    const subject = subjectMatch ? subjectMatch[1] : `Outreach Collaboration Opportunity - ${target.domain}`;
    
    // Remove subject line, keep email body
    const content = template.replace(/Subject: .+\n\n/, '');
    
    return { subject, content };
  }
  
  /**
   * Get niche field based on domain
   */
  private getNicheForDomain(domain: string): string {
    if (domain.includes('psychology')) return 'psychology';
    if (domain.includes('career')) return 'career development';
    if (domain.includes('business')) return 'business management';
    if (domain.includes('education')) return 'education';
    return 'professional development';
  }

  /**
   * Get daily outreach contact count
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
   * Delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Save campaign to database
   */
  private async saveCampaignToDatabase(campaign: OutreachCampaign): Promise<void> {
    try {
      // Save campaign
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
   * Get campaign from database
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
   * Log outreach activity
   */
  private async logOutreachActivity(activity: {
    targetDomain: string;
    campaignId: string;
    type: string;
    timestamp: Date;
    status: string;
    emailSubject?: string;
    emailContent?: string;
  }): Promise<void> {
    try {
      await prisma.outreachActivity.create({
        data: {
          targetDomain: activity.targetDomain,
          campaignId: activity.campaignId,
          type: activity.type,
          status: activity.status,
          emailSubject: activity.emailSubject,
          emailContent: activity.emailContent,
          timestamp: activity.timestamp
        }
      });
      console.log('Outreach activity logged:', activity);
    } catch (error) {
      console.error('Failed to log outreach activity:', error);
    }
  }
}
