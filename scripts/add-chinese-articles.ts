import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const chineseArticles = [
  {
    trendingKeyword: '脆弱性与压力',
    title: '脆弱性与压力：为什么有些人更容易受到影响？',
    content: `
      <h4>理解脆弱性-压力模型</h4>
      <p>为什么有些人在面对同样的压力时表现出截然不同的反应？有的人能够轻松应对挑战，而另一些人却容易被压垮？答案在于脆弱性-压力模型，这个模型揭示了遗传、环境和心理因素如何共同影响我们对压力的反应。</p>
      
      <h5>什么是脆弱性-压力模型？</h5>
      <p>脆弱性-压力模型是心理学中的一个重要概念，它解释了心理健康问题的发生机制。该模型认为，每个人都有一定的脆弱性阈值，当环境压力超过这个阈值时，就可能出现心理健康问题。</p>
      
      <h5>影响脆弱性的因素</h5>
      <ul>
        <li><strong>遗传因素：</strong>基因可能会影响我们对压力的敏感性和应对能力</li>
        <li><strong>早期经历：</strong>童年创伤或不良经历可能增加脆弱性</li>
        <li><strong>性格特质：</strong>某些人格特征可能使人更容易受到压力影响</li>
        <li><strong>社会支持：</strong>缺乏社会支持网络会增加脆弱性</li>
      </ul>
      
      <h5>如何降低脆弱性？</h5>
      <p>虽然我们无法改变遗传因素，但可以通过以下方式增强抗压能力：建立良好的社会关系、学习有效的应对策略、保持健康的生活方式、寻求专业帮助等。</p>
    `,
    sourceUrl: 'https://bigfive-test.com/zh-cn/articles/vulnerability-stress',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    locale: 'zh-CN',
  },
  {
    trendingKeyword: '儿童自我护理',
    title: '帮助孩子茁壮成长的简单自我护理实践',
    content: `
      <h4>培养孩子的身心健康</h4>
      <p>在快节奏的现代生活中，教会孩子自我护理的重要性不言而喻。通过简单而有效的实践，我们可以帮助孩子建立健康的生活习惯，培养他们的韧性、创造力和同理心。</p>
      
      <h5>亲近自然的力量</h5>
      <p>大自然是孩子最好的老师之一。鼓励孩子花时间在户外，观察植物的生长、聆听鸟儿的歌声、感受微风的轻抚。这些简单的活动能够：</p>
      <ul>
        <li>减少压力和焦虑</li>
        <li>提高注意力和专注力</li>
        <li>增强免疫系统</li>
        <li>培养对环境的关爱</li>
      </ul>
      
      <h5>正念练习的益处</h5>
      <p>适合儿童的正念练习包括：</p>
      <ul>
        <li><strong>呼吸游戏：</strong>教孩子深呼吸，想象吹气球或闻花香</li>
        <li><strong>身体扫描：</strong>引导孩子关注身体的各个部位</li>
        <li><strong>感官觉察：</strong>专注于听到、看到、摸到的事物</li>
      </ul>
      
      <h5>创造性游戏的重要性</h5>
      <p>创造性游戏不仅能激发孩子的想象力，还能帮助他们：</p>
      <ul>
        <li>表达情感和想法</li>
        <li>发展问题解决能力</li>
        <li>建立自信心</li>
        <li>学会与他人合作</li>
      </ul>
    `,
    sourceUrl: 'https://bigfive-test.com/zh-cn/articles/children-self-care',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    locale: 'zh-CN',
  },
  {
    trendingKeyword: '内向性格',
    title: '书评：《安静的力量》作者苏珊·凯恩',
    content: `
      <h4>重新认识内向者的价值</h4>
      <p>苏珊·凯恩的《安静的力量》是一本革命性的著作，它挑战了社会对内向性格的偏见，揭示了内向者独特的优势和贡献。如果您在社交场合感到不自在，这本书将帮助您更好地了解和接纳自己。</p>
      
      <h5>内向不等于害羞</h5>
      <p>凯恩在书中澄清了一个常见的误解：内向和害羞是两个不同的概念。内向是一种性格倾向，指的是从独处中获得能量；而害羞则是对社交评判的恐惧。许多内向者在社交场合表现得非常自信。</p>
      
      <h5>内向者的独特优势</h5>
      <ul>
        <li><strong>深度思考：</strong>内向者倾向于深入思考问题，而非匆忙做决定</li>
        <li><strong>专注力强：</strong>能够长时间专注于单一任务</li>
        <li><strong>善于倾听：</strong>更愿意倾听他人的观点和想法</li>
        <li><strong>创造力：</strong>独处时间为创造性思维提供了空间</li>
      </ul>
      
      <h5>在外向世界中生存的策略</h5>
      <p>凯恩提供了许多实用建议，帮助内向者在偏向外向的社会中茁壮成长：</p>
      <ul>
        <li>了解自己的能量周期，合理安排社交活动</li>
        <li>创造安静的工作环境</li>
        <li>学会为自己的需求发声</li>
        <li>寻找志同道合的伙伴</li>
      </ul>
      
      <h5>对教育和职场的启示</h5>
      <p>这本书不仅对个人有益，也为教育者和管理者提供了宝贵的见解。它提醒我们要创造包容不同性格类型的环境，让每个人都能发挥自己的潜力。</p>
    `,
    sourceUrl: 'https://bigfive-test.com/zh-cn/articles/quiet-power-book-review',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    locale: 'zh-CN',
  },
  {
    trendingKeyword: '人格心理学',
    title: '心理学与人格的简要介绍',
    content: `
      <h4>从古希腊到现代：人格理论的演变</h4>
      <p>人格心理学是研究个体差异的科学，它探索为什么人们在思维、情感和行为方面存在如此大的差异。从古希腊神话中的性格类型到现代精密的心理测量工具，人格理论经历了漫长而丰富的发展历程。</p>
      
      <h5>古代的人格分类</h5>
      <p>早在古希腊时期，希波克拉底就提出了四种体液理论，认为人的性格取决于体内四种体液的平衡：</p>
      <ul>
        <li><strong>多血质：</strong>乐观、活跃、善于社交</li>
        <li><strong>胆汁质：</strong>易怒、冲动、雄心勃勃</li>
        <li><strong>黏液质：</strong>冷静、可靠、深思熟虑</li>
        <li><strong>抑郁质：</strong>敏感、内向、富有创造力</li>
      </ul>
      
      <h5>现代人格理论</h5>
      <p>20世纪以来，心理学家们开发了更科学、更精确的人格理论：</p>
      
      <h6>大五人格模型</h6>
      <p>这是目前最被广泛接受的人格理论，包括五个维度：</p>
      <ul>
        <li><strong>开放性：</strong>对新体验的开放程度</li>
        <li><strong>尽责性：</strong>自律和目标导向的程度</li>
        <li><strong>外向性：</strong>社交性和活跃程度</li>
        <li><strong>宜人性：</strong>合作和信任的倾向</li>
        <li><strong>神经质：</strong>情绪稳定性的程度</li>
      </ul>
      
      <h6>MBTI类型指标</h6>
      <p>基于卡尔·荣格的心理类型理论，MBTI将人格分为16种类型，从四个维度进行分类：</p>
      <ul>
        <li>内向(I) vs 外向(E)</li>
        <li>感觉(S) vs 直觉(N)</li>
        <li>思维(T) vs 情感(F)</li>
        <li>判断(J) vs 知觉(P)</li>
      </ul>
      
      <h5>人格测评的应用</h5>
      <p>现代人格理论和测评工具在多个领域发挥重要作用：</p>
      <ul>
        <li><strong>职业发展：</strong>帮助个人选择适合的职业道路</li>
        <li><strong>团队建设：</strong>优化团队组成和协作</li>
        <li><strong>心理健康：</strong>识别心理问题的风险因素</li>
        <li><strong>教育：</strong>个性化的学习方法</li>
      </ul>
    `,
    sourceUrl: 'https://bigfive-test.com/zh-cn/articles/psychology-personality-intro',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    locale: 'zh-CN',
  },
  {
    trendingKeyword: '人格与工作表现',
    title: '人格与工作表现之间的联系',
    content: `
      <h4>大五人格特质对职场成功的影响</h4>
      <p>在现代职场中，技能和经验固然重要，但人格特质往往是决定工作表现和职业成功的关键因素。大量研究表明，大五人格特质与工作表现存在显著的相关性，理解这些关系对员工发展和组织管理具有重要意义。</p>
      
      <h5>尽责性：工作表现的最强预测因子</h5>
      <p>在所有人格特质中，尽责性是工作表现最可靠的预测因子：</p>
      <ul>
        <li><strong>高尽责性员工的特点：</strong>
          <ul>
            <li>严格遵守截止日期</li>
            <li>注重细节和质量</li>
            <li>主动承担责任</li>
            <li>持续努力达成目标</li>
          </ul>
        </li>
        <li><strong>在工作中的表现：</strong>更高的生产力、更少的缺勤、更好的工作质量</li>
      </ul>
      
      <h5>外向性：领导力和销售的关键</h5>
      <p>外向性在某些职业中特别重要：</p>
      <ul>
        <li><strong>销售岗位：</strong>外向者更善于建立客户关系，成交率更高</li>
        <li><strong>管理职位：</strong>外向的领导者更能激励团队，促进沟通</li>
        <li><strong>团队协作：</strong>在需要大量人际互动的工作中表现出色</li>
      </ul>
      
      <h5>开放性：创新和适应能力</h5>
      <p>在快速变化的工作环境中，开放性变得越来越重要：</p>
      <ul>
        <li>更容易接受新技术和新方法</li>
        <li>在创意工作中表现突出</li>
        <li>善于学习和适应变化</li>
        <li>具有更强的问题解决能力</li>
      </ul>
      
      <h5>宜人性：团队和谐的基石</h5>
      <p>高宜人性的员工为组织带来：</p>
      <ul>
        <li>更好的团队协作</li>
        <li>减少工作场所冲突</li>
        <li>优秀的客户服务</li>
        <li>积极的工作氛围</li>
      </ul>
      
      <h5>神经质：压力管理的挑战</h5>
      <p>虽然高神经质可能带来挑战，但在某些情况下也有优势：</p>
      <ul>
        <li><strong>挑战：</strong>在高压环境下可能表现不佳</li>
        <li><strong>优势：</strong>对细节敏感，能够识别潜在问题</li>
        <li><strong>管理策略：</strong>提供情绪支持和压力管理培训</li>
      </ul>
      
      <h5>组织心理学的应用</h5>
      <p>了解人格与工作表现的关系，组织可以：</p>
      <ul>
        <li><strong>优化招聘：</strong>根据岗位要求选择合适的人格特质</li>
        <li><strong>团队组建：</strong>平衡不同人格类型，形成互补</li>
        <li><strong>培训发展：</strong>针对个人特质设计发展计划</li>
        <li><strong>绩效管理：</strong>制定符合个人特点的工作目标</li>
      </ul>
    `,
    sourceUrl: 'https://bigfive-test.com/zh-cn/articles/personality-work-performance',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    locale: 'zh-CN',
  },
  {
    trendingKeyword: '关系沟通',
    title: '如何修复关系中的沟通障碍',
    content: `
      <h4>建立健康沟通的实用策略</h4>
      <p>良好的沟通是所有健康关系的基础。然而，在现实中，我们经常发现自己陷入沟通障碍、误解和冲突的循环中。学习如何识别和修复这些障碍，对于建立和维持深层次的人际关系至关重要。</p>
      
      <h5>识别常见的沟通障碍</h5>
      <p>首先，我们需要认识到哪些行为会阻碍有效沟通：</p>
      <ul>
        <li><strong>防御性回应：</strong>当感到被攻击时，立即为自己辩护</li>
        <li><strong>批评指责：</strong>专注于对方的错误而非问题本身</li>
        <li><strong>石墙化：</strong>情绪关闭，拒绝参与对话</li>
        <li><strong>轻蔑态度：</strong>表现出优越感或不屑</li>
      </ul>
      
      <h5>积极倾听的艺术</h5>
      <p>真正的倾听不仅仅是等待轮到自己说话：</p>
      <ul>
        <li><strong>全神贯注：</strong>放下手机，保持眼神接触</li>
        <li><strong>反映理解：</strong>"我听到你说...是这样吗？"</li>
        <li><strong>询问澄清：</strong>"你能帮我更好地理解这一点吗？"</li>
        <li><strong>验证情感：</strong>"我可以理解你为什么会感到沮丧"</li>
      </ul>
      
      <h5>管理情绪反应</h5>
      <p>当情绪激动时，有效沟通变得困难：</p>
      <ul>
        <li><strong>暂停技巧：</strong>感到愤怒时，请求短暂休息</li>
        <li><strong>深呼吸：</strong>使用呼吸技巧平静情绪</li>
        <li><strong>自我觉察：</strong>识别自己的情绪触发点</li>
        <li><strong>选择回应：</strong>而非条件反射式的反应</li>
      </ul>
      
      <h5>促进合作而非对抗</h5>
      <p>将冲突转化为合作的机会：</p>
      <ul>
        <li><strong>使用"我"语句：</strong>"我感到..."而非"你总是..."</li>
        <li><strong>专注于行为：</strong>讨论具体行为而非性格标签</li>
        <li><strong>寻找共同点：</strong>强调共同的目标和价值观</li>
        <li><strong>一起解决问题：</strong>"我们如何一起解决这个问题？"</li>
      </ul>
      
      <h5>重建信任的步骤</h5>
      <p>当关系受到伤害时，重建信任需要时间和努力：</p>
      <ol>
        <li><strong>承认伤害：</strong>诚实地承认发生的事情</li>
        <li><strong>承担责任：</strong>为自己的行为负责</li>
        <li><strong>表达歉意：</strong>真诚的道歉和理解对方的感受</li>
        <li><strong>制定计划：</strong>具体的改变和改进措施</li>
        <li><strong>保持一致：</strong>通过行动证明改变的决心</li>
      </ol>
      
      <h5>建立长期的沟通习惯</h5>
      <p>健康的沟通需要持续的练习：</p>
      <ul>
        <li>定期的关系检查：讨论关系的状态</li>
        <li>感激表达：经常表达对彼此的欣赏</li>
        <li>预防性沟通：在问题变严重之前解决</li>
        <li>寻求帮助：必要时寻求专业指导</li>
      </ul>
    `,
    sourceUrl: 'https://bigfive-test.com/zh-cn/articles/fix-communication-barriers',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    locale: 'zh-CN',
  }
];

async function main() {
  console.log('开始添加中文文章到博客数据库...');
  
  for (const article of chineseArticles) {
    try {
      await prisma.blog.upsert({
        where: { sourceUrl: article.sourceUrl },
        update: article,
        create: article,
      });
      console.log(`成功添加文章: ${article.title}`);
    } catch (error) {
      console.error(`添加文章失败: ${article.title}`, error);
    }
  }
  
  console.log('中文文章添加完成!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
