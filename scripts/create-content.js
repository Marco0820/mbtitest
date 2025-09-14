#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// 内容模板数据
const contentTemplates = {
  personalityTypes: [
    {
      type: 'INTJ',
      name: '建筑师',
      description: '内向直觉思维判断型',
      traits: ['战略思维', '独立自主', '完美主义', '理性分析'],
      careers: ['软件工程师', '系统分析师', '研究科学家', '投资银行家'],
      relationships: ['寻找智力匹配的伴侣', '重视深度交流', '需要个人空间']
    },
    {
      type: 'ENFP',
      name: '竞选者',
      description: '外向直觉情感感知型',
      traits: ['热情洋溢', '富有创造力', '善于沟通', '灵活适应'],
      careers: ['市场营销专家', '活动策划师', '培训师', '创意总监'],
      relationships: ['充满激情', '善于表达', '重视情感连接']
    },
    {
      type: 'ISTJ',
      name: '物流师',
      description: '内向感觉思维判断型',
      traits: ['可靠负责', '注重细节', '遵守规则', '实际务实'],
      careers: ['会计师', '审计师', '项目经理', '行政助理'],
      relationships: ['忠诚可靠', '稳定持久', '重视承诺']
    },
    {
      type: 'ESTP',
      name: '企业家',
      description: '外向感觉思维感知型',
      traits: ['行动导向', '善于交际', '灵活应变', '享受当下'],
      careers: ['销售代表', '企业家', '运动员', '活动策划'],
      relationships: ['充满活力', '善于社交', '享受冒险']
    }
  ],
  
  psychologyTopics: [
    {
      title: '认知功能详解：内向直觉(Ni)如何工作',
      category: '认知功能',
      keyPoints: ['模式识别', '未来导向', '整体思维', '洞察力']
    },
    {
      title: '外向情感(Fe)在人际关系中的作用',
      category: '认知功能',
      keyPoints: ['情感协调', '群体和谐', '社会价值', '他人需求']
    },
    {
      title: '内向感觉(Si)如何影响记忆和学习',
      category: '认知功能',
      keyPoints: ['经验积累', '细节记忆', '传统价值', '稳定偏好']
    }
  ],
  
  careerGuides: [
    {
      title: 'MBTI与职业选择：如何找到最适合你的工作',
      category: '职业发展',
      keyPoints: ['自我评估', '职业研究', '实践体验', '持续调整']
    },
    {
      title: '内向型人格的职业发展策略',
      category: '职业发展',
      keyPoints: ['深度工作', '独立环境', '专业发展', '网络建设']
    },
    {
      title: '外向型人格如何在工作场所发挥优势',
      category: '职业发展',
      keyPoints: ['团队合作', '沟通技巧', '领导能力', '创新思维']
    }
  ]
};

// 生成文章内容
function generateArticle(template, type) {
  const timestamp = new Date().toISOString();
  const date = new Date().toLocaleDateString('zh-CN');
  
  let content = '';
  
  if (type === 'personality') {
    const personality = template;
    content = `# ${personality.type}${personality.name}：深度解析${personality.description}

## 概述
${personality.type}是MBTI性格类型中${personality.description}的代表，以其${personality.traits.join('、')}而闻名。

## 核心特征
### 性格特点
${personality.traits.map(trait => `- **${trait}**: 详细描述...`).join('\n')}

## 职业发展
### 适合的职业
${personality.careers.map(career => `- ${career}`).join('\n')}

### 职业发展建议
1. 寻找能够发挥${personality.traits[0]}的工作
2. 避免过于${personality.traits[0]}的任务
3. 寻求${personality.traits[1]}的机会
4. 建立专业网络

## 人际关系
### 恋爱关系
${personality.relationships.map(rel => `- ${rel}`).join('\n')}

### 友谊
- 朋友数量适中
- 重视深度交流
- 善于维护关系
- 忠诚可靠

## 成长建议
1. 发展${personality.traits[2]}能力
2. 学会${personality.traits[3]}
3. 改善人际沟通技巧
4. 平衡工作与生活

## 常见误解
- 过于${personality.traits[0]}
- 缺乏${personality.traits[1]}
- 难以接近
- 不够灵活

## 总结
${personality.type}是复杂而有趣的人格类型，他们为世界带来了${personality.traits[0]}和${personality.traits[1]}。理解他们的特点有助于更好地与他们相处，也帮助他们更好地发展自己。

---
*本文基于Myers-Briggs类型指标理论，结合心理学研究和个人发展经验编写。*
*创建时间: ${date}*`;
  }
  
  else if (type === 'psychology') {
    const topic = template;
    content = `# ${topic.title}

## 概述
${topic.category}是MBTI理论中的重要组成部分，它帮助我们理解人们如何${topic.keyPoints[0]}和${topic.keyPoints[1]}。

## 核心概念
### 主要特点
${topic.keyPoints.map(point => `- **${point}**: 详细解释...`).join('\n')}

## 工作原理
### 信息处理方式
1. **${topic.keyPoints[0]}**: 从复杂信息中识别模式
2. **${topic.keyPoints[1]}**: 关注未来可能性
3. **${topic.keyPoints[2]}**: 从整体角度理解问题
4. **${topic.keyPoints[3]}**: 产生深刻的洞察

### 与其他功能的区别
- **vs 其他功能**: 详细对比分析
- **独特优势**: 说明其独特价值
- **应用场景**: 实际应用情况

## 发展过程
### 早期发展
- 儿童期：开始显示相关特征
- 青少年期：发展相关能力
- 成年期：形成成熟的表现

### 成熟表现
- 专业应用
- 创新思维
- 深度理解
- 实际效果

## 实际应用
### 职业应用
- 相关职业领域
- 工作中的应用
- 职业发展建议
- 成功案例分析

### 日常生活
- 决策制定
- 问题解决
- 人际关系
- 个人发展

## 发展建议
1. 练习相关技能
2. 培养相关能力
3. 关注发展趋势
4. 持续学习改进

## 常见挑战
- 过度使用的问题
- 忽视其他方面
- 沟通困难
- 适应挑战

## 总结
${topic.category}是一个重要的认知功能，它帮助我们${topic.keyPoints[0]}并${topic.keyPoints[1]}。通过正确的发展和应用，它可以成为个人和职业成功的重要工具。

---
*本文基于Jung的认知功能理论和现代心理学研究。*
*创建时间: ${date}*`;
  }
  
  else if (type === 'career') {
    const guide = template;
    content = `# ${guide.title}

## 为什么${guide.category}重要
${guide.category}不仅帮助我们了解自己的特点，更重要的是，它揭示了我们的工作偏好和发展方向。

## 核心策略
### 主要方法
${guide.keyPoints.map(point => `- **${point}**: 详细说明...`).join('\n')}

## 实施步骤
### 第一阶段：${guide.keyPoints[0]}
1. 了解自己的特点
2. 评估现有技能
3. 识别发展需求
4. 制定改进计划

### 第二阶段：${guide.keyPoints[1]}
1. 研究相关领域
2. 了解行业趋势
3. 分析成功案例
4. 制定学习计划

### 第三阶段：${guide.keyPoints[2]}
1. 寻找实践机会
2. 积累相关经验
3. 建立专业网络
4. 获得反馈指导

### 第四阶段：${guide.keyPoints[3]}
1. 定期评估进展
2. 调整发展策略
3. 持续学习改进
4. 实现长期目标

## 实用技巧
### 技能发展
- 专业能力提升
- 软技能培养
- 跨领域学习
- 实践经验积累

### 网络建设
- 专业社交
- 行业参与
- 导师指导
- 同行交流

### 持续改进
- 定期反思
- 目标调整
- 技能更新
- 适应变化

## 成功案例
### 案例1：技术专家转型
- 背景介绍
- 转型过程
- 关键因素
- 成功结果

### 案例2：管理岗位发展
- 背景介绍
- 发展过程
- 关键因素
- 成功结果

## 常见挑战
### 挑战1：技能不匹配
- 问题描述
- 解决方案
- 预防措施
- 长期规划

### 挑战2：机会有限
- 问题描述
- 解决方案
- 主动创造
- 持续努力

## 总结
${guide.category}是一个持续的过程，需要${guide.keyPoints[0]}、${guide.keyPoints[1]}、${guide.keyPoints[2]}和${guide.keyPoints[3]}。通过系统的方法和持续的努力，每个人都能实现职业发展目标。

---
*本文基于职业发展理论和实际案例，结合MBTI理论编写。*
*创建时间: ${date}*`;
  }
  
  return content;
}

// 创建内容文件
function createContentFiles() {
  const contentDir = 'content';
  
  // 创建内容目录
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  
  // 创建性格类型文章
  const personalityDir = path.join(contentDir, 'personality-types');
  if (!fs.existsSync(personalityDir)) {
    fs.mkdirSync(personalityDir, { recursive: true });
  }
  
  contentTemplates.personalityTypes.forEach(personality => {
    const content = generateArticle(personality, 'personality');
    const filename = `${personality.type.toLowerCase()}-${personality.name}.md`;
    const filepath = path.join(personalityDir, filename);
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ 创建性格类型文章: ${filename}`);
  });
  
  // 创建心理学文章
  const psychologyDir = path.join(contentDir, 'psychology');
  if (!fs.existsSync(psychologyDir)) {
    fs.mkdirSync(psychologyDir, { recursive: true });
  }
  
  contentTemplates.psychologyTopics.forEach(topic => {
    const content = generateArticle(topic, 'psychology');
    const filename = `${topic.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase()}.md`;
    const filepath = path.join(psychologyDir, filename);
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ 创建心理学文章: ${filename}`);
  });
  
  // 创建职业发展文章
  const careerDir = path.join(contentDir, 'career');
  if (!fs.existsSync(careerDir)) {
    fs.mkdirSync(careerDir, { recursive: true });
  }
  
  contentTemplates.careerGuides.forEach(guide => {
    const content = generateArticle(guide, 'career');
    const filename = `${guide.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase()}.md`;
    const filepath = path.join(careerDir, filename);
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ 创建职业发展文章: ${filename}`);
  });
  
  console.log('\n🎉 内容创建完成！');
  console.log(`📁 内容目录: ${contentDir}`);
  console.log('📝 请编辑这些文件，添加详细内容和完善信息');
}

// 主函数
function main() {
  console.log('🚀 开始创建高质量内容...\n');
  createContentFiles();
}

main();
