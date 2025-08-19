import { NextRequest, NextResponse } from 'next/server';
import { OutreachEngine } from '@/lib/outreach/outreach-engine';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes

// Validate if request comes from legitimate cron service
function validateCronRequest(request: NextRequest): boolean {
  // 1) Allow Vercel Cron (Vercel will include this header automatically)
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';
  if (isVercelCron) return true;

  // 2) Allow manual trigger via Authorization header
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error('CRON_SECRET not configured');
    return false;
  }
  return authHeader === `Bearer ${cronSecret}`;
}

/**
 * Daily automatic outreach task
 * Recommended to run once daily, e.g., 9 AM Beijing time
 */
export async function GET(request: NextRequest) {
  try {
    // Validate request permissions
    if (!validateCronRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Starting daily outreach campaign...');
    
    const outreachEngine = new OutreachEngine();
    const today = new Date();
    
    // 1. Create daily outreach campaigns
    const campaigns = await Promise.all([
      // Guest posting campaign
      outreachEngine.createOutreachCampaign(
        `Guest Posting Campaign - ${today.toISOString().split('T')[0]}`,
        'guest_posting',
        3
      ),
      
      // Resource submission campaign
      outreachEngine.createOutreachCampaign(
        `Resource Submission Campaign - ${today.toISOString().split('T')[0]}`,
        'resource_submission',
        4
      ),
      
      // Broken link repair campaign (twice weekly)
      ...(today.getDay() === 1 || today.getDay() === 4 ? [
        outreachEngine.createOutreachCampaign(
          `Broken Link Campaign - ${today.toISOString().split('T')[0]}`,
          'broken_link',
          2
        )
      ] : []),
      
      // Partnership campaign (once weekly)
      ...(today.getDay() === 2 ? [
        outreachEngine.createOutreachCampaign(
          `Partnership Campaign - ${today.toISOString().split('T')[0]}`,
          'partnership',
          1
        )
      ] : [])
    ]);

    // 2. Execute campaigns
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

    // 3. Generate execution report
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
 * Manually trigger outreach task
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
