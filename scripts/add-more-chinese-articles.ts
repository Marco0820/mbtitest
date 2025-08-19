import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const moreChineseArticles = [
  {
    trendingKeyword: '肠道微生物群',
    title: '注意力缺陷多动障碍和自闭症与早期肠道微生物群失调的关联：新见解',
    content: `
      <h4>肠道-大脑轴：新的研究前沿</h4>
      <p>最新的科学研究揭示了一个令人震惊的发现：婴儿期肠道微生物群的失调与日后患注意力缺陷多动障碍(ADHD)和自闭症谱系障碍(ASD)的风险存在密切联系。这一发现为我们理解神经发育障碍提供了全新的视角。</p>
      
      <h5>肠道微生物群的重要性</h5>
      <p>人体肠道内居住着数万亿的微生物，它们形成了一个复杂的生态系统：</p>
      <ul>
        <li><strong>消化功能：</strong>帮助消化食物，合成维生素</li>
        <li><strong>免疫调节：</strong>训练和调节免疫系统</li>
        <li><strong>神经传递：</strong>产生影响大脑的化学物质</li>
        <li><strong>屏障功能：</strong>防止有害物质进入血液循环</li>
      </ul>
      
      <h5>早期失调的影响</h5>
      <p>研究表明，在生命早期（特别是前三年），肠道微生物群的失调可能导致：</p>
      <ul>
        <li>神经传递素合成异常</li>
        <li>免疫系统过度激活</li>
        <li>肠道屏障功能受损</li>
        <li>炎症反应增加</li>
      </ul>
      
      <h5>与ADHD和自闭症的关联机制</h5>
      <p>科学家提出了几种可能的机制：</p>
      <ul>
        <li><strong>神经炎症：</strong>肠道炎症可能影响大脑发育</li>
        <li><strong>代谢物影响：</strong>微生物产生的代谢物影响神经发育</li>
        <li><strong>迷走神经通路：</strong>通过迷走神经影响大脑功能</li>
        <li><strong>免疫调节异常：</strong>影响大脑的免疫环境</li>
      </ul>
      
      <h5>预防和干预策略</h5>
      <p>基于这些发现，研究者们提出了可能的预防措施：</p>
      <ul>
        <li><strong>母乳喂养：</strong>促进健康微生物群的建立</li>
        <li><strong>谨慎使用抗生素：</strong>特别是在婴幼儿期</li>
        <li><strong>益生菌补充：</strong>在医生指导下使用</li>
        <li><strong>多样化饮食：</strong>为有益菌提供营养</li>
      </ul>
      
      <h5>未来的研究方向</h5>
      <p>这一领域的研究仍在快速发展：</p>
      <ul>
        <li>开发基于微生物群的诊断工具</li>
        <li>设计针对性的益生菌治疗方案</li>
        <li>研究饮食干预的最佳时机</li>
        <li>探索个性化的微生物群调节策略</li>
      </ul>
      
      <p><strong>注意：</strong>这些研究结果虽然令人鼓舞，但仍需要更多的临床验证。如果您有相关担忧，请咨询专业医生。</p>
    `,
    sourceUrl: 'https://bigfive-test.com/zh-cn/articles/gut-microbiome-adhd-autism',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    locale: 'zh-CN',
  },
  {
    trendingKeyword: '占星术与智力',
    title: '相信占星术与较低智力和更高自恋水平的关联：一项新研究的见解',
    content: `
      <h4>科学视角下的占星术信仰</h4>
      <p>一项最新的心理学研究发现了一个有趣但可能引起争议的结论：相信占星术与较低的智力水平和更高的自恋倾向存在统计学上的相关性。这一发现提醒我们，看似无害的信仰体系可能反映了更深层的认知和人格特征。</p>
      
      <h5>研究发现概述</h5>
      <p>研究人员对数千名参与者进行了综合测评，发现：</p>
      <ul>
        <li><strong>智力相关性：</strong>占星术信仰者在标准化智力测试中得分较低</li>
        <li><strong>自恋关联：</strong>表现出更高的自恋人格特征</li>
        <li><strong>认知偏差：</strong>更容易受到确认偏差的影响</li>
        <li><strong>批判思维：</strong>批判性思维能力相对较弱</li>
      </ul>
      
      <h5>可能的心理机制</h5>
      <p>研究者提出了几种可能的解释：</p>
      
      <h6>1. 认知需求差异</h6>
      <ul>
        <li>低认知需求的人更倾向于接受简化的解释</li>
        <li>占星术提供了复杂问题的简单答案</li>
        <li>减少了深入思考的需求</li>
      </ul>
      
      <h6>2. 自我中心偏向</h6>
      <ul>
        <li>占星术关注个人特质和命运</li>
        <li>迎合了自恋者的自我关注倾向</li>
        <li>提供了"特殊性"的感觉</li>
      </ul>
      
      <h6>3. 控制感需求</h6>
      <ul>
        <li>面对不确定性时寻求预测和控制</li>
        <li>占星术提供了虚假的控制感</li>
        <li>满足了对秩序的心理需求</li>
      </ul>
      
      <h5>科学思维的重要性</h5>
      <p>这项研究强调了培养科学思维的重要性：</p>
      <ul>
        <li><strong>证据导向：</strong>基于可验证的证据做出判断</li>
        <li><strong>批判质疑：</strong>对未经验证的说法保持怀疑</li>
        <li><strong>概率思维：</strong>理解随机性和概率的作用</li>
        <li><strong>因果关系：</strong>区分相关性和因果性</li>
      </ul>
      
      <h5>教育的启示</h5>
      <p>这些发现对教育有重要启示：</p>
      <ul>
        <li><strong>批判思维训练：</strong>从早期开始培养质疑精神</li>
        <li><strong>科学方法教育：</strong>教授如何评估证据</li>
        <li><strong>认知偏差awareness：</strong>了解人类思维的局限性</li>
        <li><strong>逻辑推理训练：</strong>提高逻辑分析能力</li>
      </ul>
      
      <h5>平衡的观点</h5>
      <p>需要注意的是：</p>
      <ul>
        <li>这是相关性研究，不能证明因果关系</li>
        <li>个体差异很大，不能一概而论</li>
        <li>文化和社会因素也可能起作用</li>
        <li>有些人可能只是将占星术视为娱乐</li>
      </ul>
      
      <h5>培养理性思维</h5>
      <p>无论个人信仰如何，我们都可以：</p>
      <ul>
        <li>保持开放但批判的心态</li>
        <li>寻求多种信息来源</li>
        <li>学习基本的统计和科学概念</li>
        <li>练习逻辑推理和批判性思维</li>
      </ul>
    `,
    sourceUrl: 'https://bigfive-test.com/zh-cn/articles/astrology-intelligence-narcissism',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    locale: 'zh-CN',
  },
  {
    trendingKeyword: '自杀预防',
    title: '我们能预测自杀企图吗？一项突破性的丹麦研究给出了肯定的答案',
    content: `
      <h4>自杀风险预测的科学突破</h4>
      <p>一项来自丹麦的突破性研究为自杀预防带来了希望。研究人员通过分析大量数据，成功识别了19种显著增加年轻人自杀企图风险的生活情况，为开发有效的预防策略提供了科学依据。</p>
      
      <h5>研究的重要发现</h5>
      <p>这项大规模的队列研究跟踪了数万名丹麦年轻人，发现以下因素与自杀风险显著相关：</p>
      
      <h6>心理健康因素</h6>
      <ul>
        <li>既往的精神疾病诊断</li>
        <li>抑郁症和焦虑障碍</li>
        <li>物质滥用问题</li>
        <li>人格障碍</li>
      </ul>
      
      <h6>社会环境因素</h6>
      <ul>
        <li>家庭暴力或虐待史</li>
        <li>社会孤立</li>
        <li>经济困难</li>
        <li>学业或工作压力</li>
      </ul>
      
      <h6>行为模式</h6>
      <ul>
        <li>自伤行为</li>
        <li>冲动性决策</li>
        <li>睡眠模式紊乱</li>
        <li>社交媒体使用模式</li>
      </ul>
      
      <h5>预测模型的应用</h5>
      <p>基于这些发现，研究者开发了风险评估工具：</p>
      
      <h6>早期识别系统</h6>
      <ul>
        <li><strong>学校筛查：</strong>在教育机构中识别高风险学生</li>
        <li><strong>医疗评估：</strong>在医疗接触中进行风险评估</li>
        <li><strong>社区监测：</strong>在社区层面识别风险群体</li>
      </ul>
      
      <h6>分层干预策略</h6>
      <ul>
        <li><strong>高风险群体：</strong>密集的专业干预</li>
        <li><strong>中等风险：</strong>定期监测和支持</li>
        <li><strong>低风险群体：</strong>预防性教育和资源提供</li>
      </ul>
      
      <h5>预防策略的创新</h5>
      <p>研究结果指导了更精准的预防措施：</p>
      
      <h6>个性化干预</h6>
      <ul>
        <li>根据个人风险档案制定干预计划</li>
        <li>针对性的心理健康支持</li>
        <li>定制化的资源配置</li>
      </ul>
      
      <h6>技术辅助工具</h6>
      <ul>
        <li><strong>AI风险评估：</strong>使用人工智能分析风险模式</li>
        <li><strong>移动应用：</strong>提供即时支持和监测</li>
        <li><strong>在线平台：</strong>便于获取帮助和资源</li>
      </ul>
      
      <h5>社会系统的作用</h5>
      <p>有效的自杀预防需要多层面的社会支持：</p>
      
      <h6>教育系统</h6>
      <ul>
        <li>心理健康教育课程</li>
        <li>教师和辅导员培训</li>
        <li>校园危机干预协议</li>
      </ul>
      
      <h6>医疗保健系统</h6>
      <ul>
        <li>筛查标准化流程</li>
        <li>专业人员培训</li>
        <li>跨学科协作</li>
      </ul>
      
      <h6>社区支持网络</h6>
      <ul>
        <li>同伴支持项目</li>
        <li>家庭教育和支持</li>
        <li>社区资源整合</li>
      </ul>
      
      <h5>警示信号的识别</h5>
      <p>重要的警示信号包括：</p>
      <ul>
        <li><strong>言语线索：</strong>谈论死亡、绝望或无价值感</li>
        <li><strong>行为变化：</strong>社交退缩、学业下降、睡眠改变</li>
        <li><strong>情绪波动：</strong>持续的悲伤、愤怒或情绪麻木</li>
        <li><strong>危险行为：</strong>冒险行为增加、物质滥用</li>
      </ul>
      
      <h5>如何提供帮助</h5>
      <p>如果您发现有人可能处于危险中：</p>
      <ul>
        <li>认真对待所有的威胁和警示信号</li>
        <li>倾听而不判断</li>
        <li>鼓励寻求专业帮助</li>
        <li>提供情感支持和陪伴</li>
        <li>必要时联系紧急服务</li>
      </ul>
      
      <p><strong>紧急情况：</strong>如果有人有即时的自杀危险，请立即拨打紧急电话或联系当地的危机干预热线。</p>
    `,
    sourceUrl: 'https://bigfive-test.com/zh-cn/articles/suicide-prediction-danish-study',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    locale: 'zh-CN',
  },
  {
    trendingKeyword: '焦虑预防',
    title: '揭示宁静：掌握焦虑预防并增强心理健康',
    content: `
      <h4>构建内心的宁静堡垒</h4>
      <p>在现代快节奏的生活中，焦虑已成为许多人的常态。然而，通过科学的方法和实用的策略，我们完全可以预防焦虑的发生，培养内心的宁静，并建立持久的心理健康基础。</p>
      
      <h5>理解焦虑的本质</h5>
      <p>焦虑是一种自然的生理和心理反应，但当它变得过度或持续时，就需要我们的关注：</p>
      <ul>
        <li><strong>适应性焦虑：</strong>帮助我们应对真实威胁</li>
        <li><strong>病理性焦虑：</strong>过度、持续、影响日常生活</li>
        <li><strong>早期信号：</strong>肌肉紧张、睡眠问题、注意力难以集中</li>
      </ul>
      
      <h5>预防焦虑的核心策略</h5>
      
      <h6>1. 建立稳定的日常节律</h6>
      <ul>
        <li><strong>规律睡眠：</strong>每天保持7-9小时的优质睡眠</li>
        <li><strong>固定作息：</strong>建立一致的起床和就寝时间</li>
        <li><strong>均衡饮食：</strong>避免过量咖啡因和糖分</li>
        <li><strong>定期运动：</strong>每周至少150分钟中等强度运动</li>
      </ul>
      
      <h6>2. 掌握压力管理技巧</h6>
      <ul>
        <li><strong>深呼吸练习：</strong>
          <ul>
            <li>4-7-8呼吸法：吸气4秒，屏息7秒，呼气8秒</li>
            <li>腹式呼吸：专注于腹部的起伏</li>
            <li>盒式呼吸：每个阶段4秒钟</li>
          </ul>
        </li>
        <li><strong>渐进性肌肉放松：</strong>
          <ul>
            <li>从脚趾开始，逐步放松全身肌肉</li>
            <li>先紧张后放松，感受对比</li>
            <li>每天练习15-20分钟</li>
          </ul>
        </li>
      </ul>
      
      <h6>3. 培养正念意识</h6>
      <ul>
        <li><strong>正念冥想：</strong>
          <ul>
            <li>专注于当下的呼吸</li>
            <li>观察思绪而不被卷入</li>
            <li>从每天5分钟开始</li>
          </ul>
        </li>
        <li><strong>身体扫描：</strong>
          <ul>
            <li>系统性地关注身体各部位</li>
            <li>识别紧张和放松的区域</li>
            <li>培养身体觉察能力</li>
          </ul>
        </li>
      </ul>
      
      <h5>认知重构技巧</h5>
      <p>改变思维模式是预防焦虑的关键：</p>
      
      <h6>识别认知扭曲</h6>
      <ul>
        <li><strong>灾难化思维：</strong>"这将是世界末日"</li>
        <li><strong>全或无思维：</strong>"我总是失败"</li>
        <li><strong>心理过滤：</strong>只关注负面方面</li>
        <li><strong>读心术：</strong>假设别人的想法</li>
      </ul>
      
      <h6>挑战负面思维</h6>
      <ul>
        <li>这个想法现实吗？</li>
        <li>有证据支持这个担忧吗？</li>
        <li>最坏的情况真的会发生吗？</li>
        <li>我能如何重新框架这个情况？</li>
      </ul>
      
      <h5>建立支持系统</h5>
      <p>强大的社会支持网络是心理健康的保护因素：</p>
      
      <h6>培养深层关系</h6>
      <ul>
        <li>与家人和朋友保持定期联系</li>
        <li>加入兴趣小组或社区活动</li>
        <li>寻找志同道合的伙伴</li>
        <li>学习有效的沟通技巧</li>
      </ul>
      
      <h6>专业支持资源</h6>
      <ul>
        <li>心理健康专业人士</li>
        <li>支持小组和互助团体</li>
        <li>心理健康应用和在线资源</li>
        <li>员工援助计划(EAP)</li>
      </ul>
      
      <h5>环境优化策略</h5>
      <p>创造支持心理健康的环境：</p>
      
      <h6>物理环境</h6>
      <ul>
        <li>保持整洁有序的生活空间</li>
        <li>确保充足的自然光照</li>
        <li>减少噪音污染</li>
        <li>添加绿色植物</li>
      </ul>
      
      <h6>数字环境</h6>
      <ul>
        <li>限制社交媒体使用时间</li>
        <li>避免睡前使用电子设备</li>
        <li>筛选新闻和信息来源</li>
        <li>使用有益的应用程序</li>
      </ul>
      
      <h5>长期维护策略</h5>
      <p>心理健康需要持续的维护：</p>
      <ul>
        <li><strong>定期自我评估：</strong>监测心理健康状态</li>
        <li><strong>持续学习：</strong>了解新的应对策略</li>
        <li><strong>预防性干预：</strong>在压力期提前采取措施</li>
        <li><strong>寻求专业指导：</strong>必要时不要犹豫寻求帮助</li>
      </ul>
      
      <p><strong>记住：</strong>预防焦虑是一个过程，不是一次性的解决方案。每个人的情况不同，找到最适合自己的策略组合是关键。</p>
    `,
    sourceUrl: 'https://bigfive-test.com/zh-cn/articles/anxiety-prevention-mental-health',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    locale: 'zh-CN',
  },
  {
    trendingKeyword: '自我效能感',
    title: '理解并提升自我效能感',
    content: `
      <h4>释放内在潜力的关键</h4>
      <p>自我效能感是心理学中的一个重要概念，它指的是个人对自己能够成功执行特定任务或达成目标的信心程度。这种信念不仅影响我们的动机和表现，更是建立有韧性和积极员工队伍的基础。</p>
      
      <h5>自我效能感的本质</h5>
      <p>由著名心理学家阿尔伯特·班杜拉提出的自我效能理论包含几个关键要素：</p>
      
      <h6>核心特征</h6>
      <ul>
        <li><strong>任务特异性：</strong>针对特定情境和任务的信心</li>
        <li><strong>主观评估：</strong>基于个人感知而非客观能力</li>
        <li><strong>未来导向：</strong>关注即将面临的挑战</li>
        <li><strong>可塑性强：</strong>可以通过经验和训练改变</li>
      </ul>
      
      <h6>与相关概念的区别</h6>
      <ul>
        <li><strong>vs 自尊：</strong>自我效能关注能力，自尊关注价值</li>
        <li><strong>vs 自信：</strong>自我效能更具体和情境化</li>
        <li><strong>vs 乐观：</strong>自我效能基于能力评估，乐观基于结果期待</li>
      </ul>
      
      <h5>自我效能感的四个来源</h5>
      <p>班杜拉确定了建立自我效能感的四个主要来源：</p>
      
      <h6>1. 成功经验（最强来源）</h6>
      <ul>
        <li><strong>逐步挑战：</strong>从简单任务开始，逐步增加难度</li>
        <li><strong>技能建构：</strong>确保每次成功都建立在扎实的技能基础上</li>
        <li><strong>反思总结：</strong>帮助个人认识到成功与自身努力的关系</li>
        <li><strong>失败重新框架：</strong>将失败视为学习机会而非能力缺陷</li>
      </ul>
      
      <h6>2. 替代经验（观察学习）</h6>
      <ul>
        <li><strong>榜样选择：</strong>选择相似背景和能力的成功榜样</li>
        <li><strong>过程观察：</strong>关注榜样如何克服困难和挑战</li>
        <li><strong>策略学习：</strong>从榜样那里学习有效的方法和技巧</li>
        <li><strong>同伴示范：</strong>利用同事的成功案例</li>
      </ul>
      
      <h6>3. 言语说服</h6>
      <ul>
        <li><strong>可信来源：</strong>来自受信任和有权威的人</li>
        <li><strong>具体反馈：</strong>针对特定技能和改进提供建设性意见</li>
        <li><strong>现实期望：</strong>设定具有挑战性但可达成的目标</li>
        <li><strong>积极框架：</strong>强调进步和潜力而非缺陷</li>
      </ul>
      
      <h6>4. 生理和情绪状态</h6>
      <ul>
        <li><strong>压力管理：</strong>帮助个人学会管理焦虑和紧张</li>
        <li><strong>积极情绪：</strong>创造支持性和积极的工作环境</li>
        <li><strong>身体准备：</strong>确保个人具备执行任务的身体条件</li>
        <li><strong>情绪调节：</strong>教授情绪管理技巧</li>
      </ul>
      
      <h5>在工作场所提升自我效能感</h5>
      
      <h6>清晰的指导和期望</h6>
      <ul>
        <li><strong>明确目标：</strong>设定具体、可测量、可达成的目标</li>
        <li><strong>步骤分解：</strong>将复杂任务分解为可管理的步骤</li>
        <li><strong>资源提供：</strong>确保员工有必要的工具和信息</li>
        <li><strong>标准说明：</strong>清晰传达成功的标准和期望</li>
      </ul>
      
      <h6>系统性培训和发展</h6>
      <ul>
        <li><strong>技能培训：</strong>提供针对性的技能发展机会</li>
        <li><strong>实践机会：</strong>在安全环境中练习新技能</li>
        <li><strong>渐进挑战：</strong>逐步增加任务的复杂性和责任</li>
        <li><strong>持续学习：</strong>支持终身学习和专业发展</li>
      </ul>
      
      <h6>建设性反馈系统</h6>
      <ul>
        <li><strong>及时反馈：</strong>在任务完成后尽快提供反馈</li>
        <li><strong>平衡方法：</strong>既认可成就也指出改进空间</li>
        <li><strong>具体例证：</strong>使用具体例子说明表现</li>
        <li><strong>前瞻性建议：</strong>提供未来改进的具体建议</li>
      </ul>
      
      <h5>创造支持性环境</h5>
      
      <h6>心理安全</h6>
      <ul>
        <li>鼓励提问和实验</li>
        <li>将错误视为学习机会</li>
        <li>支持冒险和创新</li>
        <li>避免指责和惩罚文化</li>
      </ul>
      
      <h6>社会支持</h6>
      <ul>
        <li>建立导师制度</li>
        <li>促进团队协作</li>
        <li>创造互助学习机会</li>
        <li>庆祝团队和个人成就</li>
      </ul>
      
      <h5>衡量和评估效果</h5>
      <p>定期评估自我效能感的发展：</p>
      
      <h6>评估指标</h6>
      <ul>
        <li><strong>主观测量：</strong>自我效能感量表和调查</li>
        <li><strong>行为观察：</strong>主动性、坚持性、挑战接受度</li>
        <li><strong>绩效指标：</strong>任务完成质量和效率</li>
        <li><strong>情绪状态：</strong>工作满意度和压力水平</li>
      </ul>
      
      <h6>持续改进</h6>
      <ul>
        <li>根据评估结果调整策略</li>
        <li>个性化发展计划</li>
        <li>定期回顾和更新目标</li>
        <li>分享最佳实践</li>
      </ul>
      
      <h5>长期益处</h5>
      <p>提升自我效能感带来的组织和个人益处：</p>
      <ul>
        <li><strong>提高表现：</strong>更高的工作质量和生产力</li>
        <li><strong>增强韧性：</strong>更好地应对挫折和挑战</li>
        <li><strong>促进创新：</strong>更愿意尝试新方法和承担风险</li>
        <li><strong>改善福利：</strong>更高的工作满意度和心理健康</li>
        <li><strong>减少流失：</strong>更强的组织承诺和归属感</li>
      </ul>
    `,
    sourceUrl: 'https://bigfive-test.com/zh-cn/articles/self-efficacy-understanding-enhancement',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    locale: 'zh-CN',
  }
];

async function main() {
  console.log('开始添加更多中文文章到博客数据库...');
  
  for (const article of moreChineseArticles) {
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
  
  console.log('更多中文文章添加完成!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


