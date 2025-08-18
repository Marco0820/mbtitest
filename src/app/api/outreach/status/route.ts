import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    // 这里需要实际的数据库查询
    // 目前返回模拟数据
    const mockStats = {
      totalCampaigns: 45,
      activeCampaigns: 12,
      totalTargets: 180,
      contactedTargets: 135,
      respondedTargets: 28,
      acceptedTargets: 15,
      rejectedTargets: 8,
      pendingTargets: 45,
      
      // 每日统计
      dailyStats: Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          date: date.toISOString().split('T')[0],
          campaigns: Math.floor(Math.random() * 5) + 1,
          contacts: Math.floor(Math.random() * 10) + 2,
          responses: Math.floor(Math.random() * 3),
          successes: Math.floor(Math.random() * 2)
        };
      }).reverse(),

      // 按类型统计
      typeStats: [
        { type: 'guest_posting', campaigns: 15, successRate: 0.12 },
        { type: 'resource_submission', campaigns: 18, successRate: 0.22 },
        { type: 'broken_link', campaigns: 8, successRate: 0.35 },
        { type: 'partnership', campaigns: 4, successRate: 0.25 }
      ],

      // 顶级域名表现
      topDomains: [
        { domain: 'psychologytoday.com', contacts: 3, responses: 1, accepted: 1 },
        { domain: 'mindtools.com', contacts: 2, responses: 1, accepted: 0 },
        { domain: 'linkedin.com', contacts: 4, responses: 2, accepted: 1 },
        { domain: 'reddit.com', contacts: 5, responses: 1, accepted: 1 },
        { domain: 'quora.com', contacts: 3, responses: 0, accepted: 0 }
      ],

      // 近期活动
      recentActivities: [
        {
          id: 1,
          date: new Date().toISOString(),
          type: 'contact_sent',
          target: 'psychologytoday.com',
          campaign: 'Guest Posting Campaign',
          status: 'sent'
        },
        {
          id: 2,
          date: new Date(Date.now() - 86400000).toISOString(),
          type: 'response_received',
          target: 'mindtools.com',
          campaign: 'Resource Submission Campaign',
          status: 'positive'
        },
        {
          id: 3,
          date: new Date(Date.now() - 172800000).toISOString(),
          type: 'link_acquired',
          target: 'careerguidance.com',
          campaign: 'Guest Posting Campaign',
          status: 'success'
        }
      ]
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

    // 这里应该更新数据库中的目标状态
    console.log(`Updating target ${targetId} status to ${status}`);

    // 如果状态是accepted且提供了链接URL，记录成功的外链
    if (status === 'accepted' && linkUrl) {
      console.log(`Recording successful backlink: ${linkUrl}`);
      // 这里应该保存外链信息到数据库
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
