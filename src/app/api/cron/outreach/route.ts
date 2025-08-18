import { NextRequest, NextResponse } from 'next/server';
import { OutreachEngine } from '@/lib/outreach/outreach-engine';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes

// 验证请求是否来自合法的cron服务
function validateCronRequest(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (!cronSecret) {
    console.error('CRON_SECRET not configured');
    return false;
  }
  
  return authHeader === `Bearer ${cronSecret}`;
}

/**
 * 每日自动外链建设任务
 * 建议设置为每天执行一次，例如北京时间上午9点
 */
export async function GET(request: NextRequest) {
  try {
    // 验证请求权限
    if (!validateCronRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Starting daily outreach campaign...');
    
    const outreachEngine = new OutreachEngine();
    const today = new Date();
    
    // 1. 创建每日外链建设活动
    const campaigns = await Promise.all([
      // 客座文章投稿活动
      outreachEngine.createOutreachCampaign(
        `Guest Posting Campaign - ${today.toISOString().split('T')[0]}`,
        'guest_posting',
        3
      ),
      
      // 资源页面提交活动
      outreachEngine.createOutreachCampaign(
        `Resource Submission Campaign - ${today.toISOString().split('T')[0]}`,
        'resource_submission',
        4
      ),
      
      // 破损链接修复活动（每周两次）
      ...(today.getDay() === 1 || today.getDay() === 4 ? [
        outreachEngine.createOutreachCampaign(
          `Broken Link Campaign - ${today.toISOString().split('T')[0]}`,
          'broken_link',
          2
        )
      ] : []),
      
      // 合作伙伴关系活动（每周一次）
      ...(today.getDay() === 2 ? [
        outreachEngine.createOutreachCampaign(
          `Partnership Campaign - ${today.toISOString().split('T')[0]}`,
          'partnership',
          1
        )
      ] : [])
    ]);

    // 2. 执行活动
    const results = [];
    for (const campaign of campaigns) {
      try {
        await outreachEngine.executeOutreachCampaign(campaign.id);
        results.push({
          campaignId: campaign.id,
          name: campaign.name,
          status: 'executed',
          targetCount: campaign.targets.length
        });
      } catch (error) {
        console.error(`Failed to execute campaign ${campaign.id}:`, error);
        results.push({
          campaignId: campaign.id,
          name: campaign.name,
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // 3. 生成执行报告
    const summary = {
      date: today.toISOString().split('T')[0],
      totalCampaigns: campaigns.length,
      successfulCampaigns: results.filter(r => r.status === 'executed').length,
      failedCampaigns: results.filter(r => r.status === 'failed').length,
      totalTargets: campaigns.reduce((sum, c) => sum + c.targets.length, 0),
      results
    };

    console.log('Daily outreach campaign completed:', summary);

    return NextResponse.json({
      success: true,
      message: 'Daily outreach campaign executed successfully',
      summary
    });

  } catch (error) {
    console.error('Error in daily outreach campaign:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

/**
 * 手动触发外链建设任务
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignType, targetCount } = body;

    if (!validateCronRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const outreachEngine = new OutreachEngine();
    
    const campaign = await outreachEngine.createOutreachCampaign(
      `Manual Campaign - ${new Date().toISOString()}`,
      campaignType || 'guest_posting',
      targetCount || 5
    );

    await outreachEngine.executeOutreachCampaign(campaign.id);

    return NextResponse.json({
      success: true,
      message: 'Manual outreach campaign executed successfully',
      campaign: {
        id: campaign.id,
        name: campaign.name,
        type: campaign.type,
        targetCount: campaign.targets.length
      }
    });

  } catch (error) {
    console.error('Error in manual outreach campaign:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
