import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * 获取外链建设状态和统计
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const type = searchParams.get('type');

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // 获取实际统计数据
    const [totalCampaigns, activeCampaigns, totalTargets, contactedTargets, respondedTargets, acceptedTargets, rejectedTargets] = await Promise.all([
      prisma.outreachCampaign.count(),
      prisma.outreachCampaign.count({ where: { status: 'active' } }),
      prisma.outreachTarget.count(),
      prisma.outreachTarget.count({ where: { status: 'contacted' } }),
      prisma.outreachTarget.count({ where: { status: 'responded' } }),
      prisma.outreachTarget.count({ where: { status: 'accepted' } }),
      prisma.outreachTarget.count({ where: { status: 'rejected' } })
    ]);
    
    const pendingTargets = totalTargets - contactedTargets;
    
    // 获取每日统计
    const dailyStats = await Promise.all(
      Array.from({ length: 7 }, async (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));
        
        const [campaigns, contacts, responses, successes] = await Promise.all([
          prisma.outreachCampaign.count({
            where: {
              createdAt: { gte: startOfDay, lte: endOfDay }
            }
          }),
          prisma.outreachActivity.count({
            where: {
              timestamp: { gte: startOfDay, lte: endOfDay },
              status: 'sent'
            }
          }),
          prisma.outreachTarget.count({
            where: {
              lastContactDate: { gte: startOfDay, lte: endOfDay },
              status: 'responded'
            }
          }),
          prisma.outreachTarget.count({
            where: {
              updatedAt: { gte: startOfDay, lte: endOfDay },
              status: 'accepted'
            }
          })
        ]);
        
        return {
          date: date.toISOString().split('T')[0],
          campaigns,
          contacts,
          responses,
          successes
        };
      })
    );
    
    // 按类型统计
    const typeStats = await Promise.all([
      { type: 'guest_posting', campaigns: await prisma.outreachCampaign.count({ where: { type: 'guest_posting' } }) },
      { type: 'resource_submission', campaigns: await prisma.outreachCampaign.count({ where: { type: 'resource_submission' } }) },
      { type: 'broken_link', campaigns: await prisma.outreachCampaign.count({ where: { type: 'broken_link' } }) },
      { type: 'partnership', campaigns: await prisma.outreachCampaign.count({ where: { type: 'partnership' } }) }
    ]);
    
    // 添加成功率计算
    for (const stat of typeStats) {
      const typeAccepted = await prisma.outreachTarget.count({
        where: {
          status: 'accepted',
          campaign: { type: stat.type }
        }
      });
      const typeContacted = await prisma.outreachTarget.count({
        where: {
          status: { in: ['contacted', 'responded', 'accepted', 'rejected'] },
          campaign: { type: stat.type }
        }
      });
      stat.successRate = typeContacted > 0 ? typeAccepted / typeContacted : 0;
    }
    
    // 顶级域名表现
    const topDomains = await prisma.outreachTarget.groupBy({
      by: ['domain'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5
    });
    
    const topDomainsWithStats = await Promise.all(
      topDomains.map(async (domain) => {
        const [contacts, responses, accepted] = await Promise.all([
          domain._count.id,
          prisma.outreachTarget.count({ where: { domain: domain.domain, status: 'responded' } }),
          prisma.outreachTarget.count({ where: { domain: domain.domain, status: 'accepted' } })
        ]);
        return {
          domain: domain.domain,
          contacts,
          responses,
          accepted
        };
      })
    );
    
    // 近期活动
    const recentActivities = await prisma.outreachActivity.findMany({
      orderBy: { timestamp: 'desc' },
      take: 5,
      select: {
        id: true,
        timestamp: true,
        type: true,
        targetDomain: true,
        status: true,
        campaignId: true
      }
    });
    
    const recentActivitiesFormatted = await Promise.all(
      recentActivities.map(async (activity) => {
        const campaign = await prisma.outreachCampaign.findUnique({
          where: { id: activity.campaignId },
          select: { name: true }
        });
        
        return {
          id: parseInt(activity.id.slice(-6), 16), // 简化ID
          date: activity.timestamp.toISOString(),
          type: activity.status === 'sent' ? 'contact_sent' : 'response_received',
          target: activity.targetDomain,
          campaign: campaign?.name || 'Unknown Campaign',
          status: activity.status
        };
      })
    );
    
    const stats = {
      totalCampaigns,
      activeCampaigns,
      totalTargets,
      contactedTargets,
      respondedTargets,
      acceptedTargets,
      rejectedTargets,
      pendingTargets,
      dailyStats: dailyStats.reverse(),
      typeStats,
      topDomains: topDomainsWithStats,
      recentActivities: recentActivitiesFormatted
    };

    return NextResponse.json({
      success: true,
      stats: mockStats,
      period: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        days
      }
    });

  } catch (error) {
    console.error('Error fetching outreach stats:', error);
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
 * 更新外链目标状态
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { targetId, status, notes, linkUrl } = body;

    // 验证状态值
    const validStatuses = ['pending', 'contacted', 'responded', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    // 更新数据库中的目标状态
    await prisma.outreachTarget.update({
      where: { id: targetId },
      data: {
        status,
        notes,
        updatedAt: new Date()
      }
    });

    // 如果状态是accepted且提供了链接URL，记录成功的外链
    if (status === 'accepted' && linkUrl) {
      const target = await prisma.outreachTarget.findUnique({
        where: { id: targetId },
        select: { domain: true }
      });
      
      if (target) {
        await prisma.backlink.create({
          data: {
            sourceUrl: linkUrl,
            targetUrl: 'https://www.mbti16personalities.online',
            anchorText: 'MBTI测试',
            status: 'active'
          }
        });
        console.log(`Recorded successful backlink: ${linkUrl}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Target status updated successfully',
      targetId,
      newStatus: status
    });

  } catch (error) {
    console.error('Error updating target status:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
