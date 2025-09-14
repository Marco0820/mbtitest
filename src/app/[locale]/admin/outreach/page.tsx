'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  Send, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ExternalLink,
  RefreshCw,
  Plus,
  Eye
} from 'lucide-react';

interface OutreachStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalTargets: number;
  contactedTargets: number;
  respondedTargets: number;
  acceptedTargets: number;
  rejectedTargets: number;
  pendingTargets: number;
  dailyStats: Array<{
    date: string;
    campaigns: number;
    contacts: number;
    responses: number;
    successes: number;
  }>;
  typeStats: Array<{
    type: string;
    campaigns: number;
    successRate: number;
  }>;
  topDomains: Array<{
    domain: string;
    contacts: number;
    responses: number;
    accepted: number;
  }>;
  recentActivities: Array<{
    id: number;
    date: string;
    type: string;
    target: string;
    campaign: string;
    status: string;
  }>;
}

export default function OutreachManagementPage() {
  const [stats, setStats] = useState<OutreachStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取外链建设统计数据
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/outreach/status');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
        setError(null);
      } else {
        setError(data.error || '获取数据失败');
      }
    } catch (err) {
      setError('网络请求失败');
      console.error('Error fetching outreach stats:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 手动触发外链建设任务
  const triggerManualOutreach = async (type: string) => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/cron/outreach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`
        },
        body: JSON.stringify({
          campaignType: type,
          targetCount: 5
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('外链建设任务已成功触发！');
        fetchStats(); // 刷新数据
      } else {
        alert(`任务触发失败: ${data.error}`);
      }
    } catch (err) {
      alert('网络请求失败');
      console.error('Error triggering manual outreach:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert className="border-red-200 bg-red-50">
          <XCircle className="h-4 w-4 text-red-500" />
          <span className="text-red-700">{error}</span>
        </Alert>
      </div>
    );
  }

  if (!stats) return null;

  const successRate = stats.contactedTargets > 0 
    ? (stats.acceptedTargets / stats.contactedTargets * 100).toFixed(1)
    : '0';

  const responseRate = stats.contactedTargets > 0
    ? (stats.respondedTargets / stats.contactedTargets * 100).toFixed(1)
    : '0';

  const pieData = [
    { name: '已接受', value: stats.acceptedTargets, color: '#10B981' },
    { name: '已拒绝', value: stats.rejectedTargets, color: '#EF4444' },
    { name: '待回复', value: stats.contactedTargets - stats.respondedTargets, color: '#F59E0B' },
    { name: '未联系', value: stats.pendingTargets, color: '#6B7280' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">外链建设管理</h1>
          <p className="text-gray-600 mt-2">监控和管理自动化外链建设活动</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => fetchStats()}
            disabled={refreshing}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            刷新数据
          </Button>
          <Button
            onClick={() => triggerManualOutreach('guest_posting')}
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            触发手动任务
          </Button>
        </div>
      </div>

      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">总活动数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCampaigns}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            活跃: {stats.activeCampaigns}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">联系成功率</p>
              <p className="text-2xl font-bold text-green-600">{successRate}%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {stats.acceptedTargets}/{stats.contactedTargets} 已接受
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">回复率</p>
              <p className="text-2xl font-bold text-orange-600">{responseRate}%</p>
            </div>
            <Send className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {stats.respondedTargets}/{stats.contactedTargets} 已回复
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">待处理</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingTargets}</p>
            </div>
            <Clock className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            等待联系的目标
          </p>
        </Card>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 每日活动趋势 */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">每日活动趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="campaigns" stroke="#3B82F6" name="活动数" />
              <Line type="monotone" dataKey="contacts" stroke="#10B981" name="联系数" />
              <Line type="monotone" dataKey="successes" stroke="#F59E0B" name="成功数" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* 目标状态分布 */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">目标状态分布</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 活动类型表现 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">活动类型表现</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.typeStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="campaigns" fill="#3B82F6" name="活动数" />
            <Bar dataKey="successRate" fill="#10B981" name="成功率" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* 顶级域名表现 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">顶级域名表现</h3>
          <div className="space-y-4">
            {stats.topDomains.map((domain, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">{domain.domain}</span>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>联系: {domain.contacts}</span>
                  <span>回复: {domain.responses}</span>
                  <span className="text-green-600">成功: {domain.accepted}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 近期活动 */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">近期活动</h3>
          <div className="space-y-4">
            {stats.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'contact_sent' && <Send className="w-4 h-4 text-blue-500" />}
                  {activity.type === 'response_received' && <Eye className="w-4 h-4 text-orange-500" />}
                  {activity.type === 'link_acquired' && <CheckCircle className="w-4 h-4 text-green-500" />}
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-900">{activity.target}</p>
                  <p className="text-xs text-gray-600">{activity.campaign}</p>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(activity.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 快速操作 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            onClick={() => triggerManualOutreach('guest_posting')}
            disabled={refreshing}
            className="flex items-center justify-center gap-2 h-12"
          >
            <Plus className="w-4 h-4" />
            客座文章投稿
          </Button>
          <Button
            onClick={() => triggerManualOutreach('resource_submission')}
            disabled={refreshing}
            variant="outline"
            className="flex items-center justify-center gap-2 h-12"
          >
            <Plus className="w-4 h-4" />
            资源页面提交
          </Button>
          <Button
            onClick={() => triggerManualOutreach('broken_link')}
            disabled={refreshing}
            variant="outline"
            className="flex items-center justify-center gap-2 h-12"
          >
            <Plus className="w-4 h-4" />
            破损链接修复
          </Button>
          <Button
            onClick={() => triggerManualOutreach('partnership')}
            disabled={refreshing}
            variant="outline"
            className="flex items-center justify-center gap-2 h-12"
          >
            <Plus className="w-4 h-4" />
            合作伙伴关系
          </Button>
        </div>
      </Card>
    </div>
  );
}
