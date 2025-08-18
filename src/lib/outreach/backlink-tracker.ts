import axios from 'axios';

export interface BacklinkData {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  discoveredDate: Date;
  lastCheckedDate: Date;
  status: 'active' | 'removed' | 'nofollow' | 'redirect';
  domainAuthority?: number;
  pageAuthority?: number;
  traffic?: number;
  clicks?: number;
}

export class BacklinkTracker {
  private readonly checkInterval = 24 * 60 * 60 * 1000; // 24小时
  
  constructor() {}

  /**
   * 发现新的外链
   */
  async discoverBacklinks(): Promise<BacklinkData[]> {
    const discovered: BacklinkData[] = [];
    
    try {
      // 使用多种方法发现外链
      const sources = [
        await this.checkGoogleSearchConsole(),
        await this.checkAhrefs(),
        await this.checkMajestic(),
        await this.checkMoz(),
        await this.manualCheck()
      ];

      for (const sourceResults of sources) {
        discovered.push(...sourceResults);
      }

      // 去重
      const uniqueBacklinks = this.deduplicateBacklinks(discovered);
      
      // 保存新发现的外链
      for (const backlink of uniqueBacklinks) {
        await this.saveBacklink(backlink);
      }

      return uniqueBacklinks;

    } catch (error) {
      console.error('Error discovering backlinks:', error);
      return [];
    }
  }

  /**
   * 验证外链状态
   */
  async verifyBacklink(backlink: BacklinkData): Promise<BacklinkData> {
    try {
      const response = await axios.get(backlink.sourceUrl, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; MBTI-Checker/1.0)'
        }
      });

      const html = response.data;
      const isLinkPresent = html.includes(backlink.targetUrl);
      const isNoFollow = html.includes('rel="nofollow"');

      if (!isLinkPresent) {
        backlink.status = 'removed';
      } else if (isNoFollow) {
        backlink.status = 'nofollow';
      } else {
        backlink.status = 'active';
      }

      backlink.lastCheckedDate = new Date();

      // 获取页面权威性数据
      backlink.pageAuthority = await this.getPageAuthority(backlink.sourceUrl);
      backlink.domainAuthority = await this.getDomainAuthority(backlink.sourceUrl);

      return backlink;

    } catch (error) {
      console.error(`Error verifying backlink ${backlink.sourceUrl}:`, error);
      backlink.status = 'removed'; // 假设无法访问则链接已移除
      return backlink;
    }
  }

  /**
   * 批量验证所有外链
   */
  async verifyAllBacklinks(): Promise<void> {
    const backlinks = await this.getAllBacklinks();
    const batchSize = 5; // 限制并发数量
    
    for (let i = 0; i < backlinks.length; i += batchSize) {
      const batch = backlinks.slice(i, i + batchSize);
      const verificationPromises = batch.map(backlink => 
        this.verifyBacklink(backlink)
      );
      
      try {
        const verifiedBacklinks = await Promise.all(verificationPromises);
        
        // 更新数据库
        for (const backlink of verifiedBacklinks) {
          await this.updateBacklink(backlink);
        }
        
        // 添加延迟避免过频繁请求
        await this.delay(2000);
        
      } catch (error) {
        console.error('Error in batch verification:', error);
      }
    }
  }

  /**
   * 生成外链报告
   */
  async generateBacklinkReport(days: number = 30): Promise<any> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const backlinks = await this.getBacklinksByDateRange(startDate, endDate);
    
    const report = {
      period: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        days
      },
      summary: {
        totalBacklinks: backlinks.length,
        activeBacklinks: backlinks.filter(b => b.status === 'active').length,
        removedBacklinks: backlinks.filter(b => b.status === 'removed').length,
        nofollowBacklinks: backlinks.filter(b => b.status === 'nofollow').length,
        newBacklinks: backlinks.filter(b => 
          b.discoveredDate >= startDate && b.discoveredDate <= endDate
        ).length
      },
      domainBreakdown: this.generateDomainBreakdown(backlinks),
      authorityDistribution: this.generateAuthorityDistribution(backlinks),
      anchorTextAnalysis: this.generateAnchorTextAnalysis(backlinks),
      topPerformingBacklinks: this.getTopPerformingBacklinks(backlinks, 10),
      qualityScore: this.calculateBacklinkQuality(backlinks)
    };

    return report;
  }

  /**
   * 检查Google Search Console
   */
  private async checkGoogleSearchConsole(): Promise<BacklinkData[]> {
    // 这里需要集成Google Search Console API
    // 目前返回模拟数据
    return [
      {
        id: 'gsc_1',
        sourceUrl: 'https://example-blog.com/personality-tests',
        targetUrl: 'https://www.mbti16personalities.online',
        anchorText: 'MBTI测试',
        discoveredDate: new Date(),
        lastCheckedDate: new Date(),
        status: 'active',
        domainAuthority: 65,
        pageAuthority: 45
      }
    ];
  }

  /**
   * 检查Ahrefs API
   */
  private async checkAhrefs(): Promise<BacklinkData[]> {
    // 这里需要集成Ahrefs API
    return [];
  }

  /**
   * 检查Majestic API
   */
  private async checkMajestic(): Promise<BacklinkData[]> {
    // 这里需要集成Majestic API
    return [];
  }

  /**
   * 检查Moz API
   */
  private async checkMoz(): Promise<BacklinkData[]> {
    // 这里需要集成Moz API
    return [];
  }

  /**
   * 手动检查方法
   */
  private async manualCheck(): Promise<BacklinkData[]> {
    // 通过搜索引擎查询或其他方法发现外链
    const searchQueries = [
      'site:mbti16personalities.online -site:mbti16personalities.online',
      '"mbti16personalities.online"',
      '"MBTI TEST"'
    ];

    // 这里可以实现搜索引擎查询逻辑
    return [];
  }

  /**
   * 去重外链
   */
  private deduplicateBacklinks(backlinks: BacklinkData[]): BacklinkData[] {
    const seen = new Set();
    return backlinks.filter(backlink => {
      const key = `${backlink.sourceUrl}-${backlink.targetUrl}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  /**
   * 获取页面权威性
   */
  private async getPageAuthority(url: string): Promise<number> {
    // 这里需要集成Moz API或其他权威性检查服务
    return Math.floor(Math.random() * 100);
  }

  /**
   * 获取域名权威性
   */
  private async getDomainAuthority(url: string): Promise<number> {
    // 这里需要集成Moz API或其他权威性检查服务
    const domain = new URL(url).hostname;
    return Math.floor(Math.random() * 100);
  }

  /**
   * 生成域名分解报告
   */
  private generateDomainBreakdown(backlinks: BacklinkData[]): any {
    const domains = new Map();
    
    backlinks.forEach(backlink => {
      const domain = new URL(backlink.sourceUrl).hostname;
      if (!domains.has(domain)) {
        domains.set(domain, { count: 0, active: 0, authority: 0 });
      }
      const domainData = domains.get(domain);
      domainData.count++;
      if (backlink.status === 'active') domainData.active++;
      if (backlink.domainAuthority) domainData.authority = Math.max(domainData.authority, backlink.domainAuthority);
    });

    return Array.from(domains.entries()).map(([domain, data]) => ({
      domain,
      ...data
    })).sort((a, b) => b.count - a.count);
  }

  /**
   * 生成权威性分布
   */
  private generateAuthorityDistribution(backlinks: BacklinkData[]): any {
    const distribution = {
      'high': 0,      // DA > 70
      'medium': 0,    // DA 40-70
      'low': 0        // DA < 40
    };

    backlinks.forEach(backlink => {
      if (backlink.domainAuthority) {
        if (backlink.domainAuthority > 70) distribution.high++;
        else if (backlink.domainAuthority >= 40) distribution.medium++;
        else distribution.low++;
      }
    });

    return distribution;
  }

  /**
   * 生成锚文本分析
   */
  private generateAnchorTextAnalysis(backlinks: BacklinkData[]): any {
    const anchors = new Map();
    
    backlinks.forEach(backlink => {
      const anchor = backlink.anchorText.toLowerCase();
      anchors.set(anchor, (anchors.get(anchor) || 0) + 1);
    });

    return Array.from(anchors.entries())
      .map(([text, count]) => ({ text, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  /**
   * 获取表现最佳的外链
   */
  private getTopPerformingBacklinks(backlinks: BacklinkData[], limit: number): BacklinkData[] {
    return backlinks
      .filter(b => b.status === 'active')
      .sort((a, b) => (b.domainAuthority || 0) - (a.domainAuthority || 0))
      .slice(0, limit);
  }

  /**
   * 计算外链质量评分
   */
  private calculateBacklinkQuality(backlinks: BacklinkData[]): number {
    if (backlinks.length === 0) return 0;

    const activeBacklinks = backlinks.filter(b => b.status === 'active');
    const avgAuthority = activeBacklinks.reduce((sum, b) => sum + (b.domainAuthority || 0), 0) / activeBacklinks.length;
    const diversityScore = new Set(backlinks.map(b => new URL(b.sourceUrl).hostname)).size / backlinks.length;
    
    return Math.round((avgAuthority * 0.7 + diversityScore * 30) * 100) / 100;
  }

  // 数据库操作方法（需要实际实现）
  private async saveBacklink(backlink: BacklinkData): Promise<void> {
    console.log('Saving backlink:', backlink.sourceUrl);
  }

  private async updateBacklink(backlink: BacklinkData): Promise<void> {
    console.log('Updating backlink:', backlink.id);
  }

  private async getAllBacklinks(): Promise<BacklinkData[]> {
    // 从数据库获取所有外链
    return [];
  }

  private async getBacklinksByDateRange(startDate: Date, endDate: Date): Promise<BacklinkData[]> {
    // 从数据库获取指定日期范围的外链
    return [];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
