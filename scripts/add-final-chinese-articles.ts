import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const finalChineseArticles = [
  {
    trendingKeyword: 'MBTI科学性',
    title: '迈尔斯-布里格斯类型指标：为什么它被认为是伪科学',
    content: `
      <h4>科学审视下的MBTI</h4>
      <p>迈尔斯-布里格斯类型指标（MBTI）在全球范围内被广泛应用，从企业招聘到个人发展咨询，它似乎无处不在。然而，尽管其受欢迎程度很高，科学界对MBTI的有效性和可靠性一直存在严重质疑。让我们从科学的角度来审视这个争议话题。</p>
      
      <h5>MBTI的理论基础</h5>
      <p>MBTI基于卡尔·荣格1921年的心理类型理论，由凯瑟琳·布里格斯和伊莎贝尔·迈尔斯在1940年代开发：</p>
      <ul>
        <li><strong>四个维度：</strong>内向/外向、感觉/直觉、思维/情感、判断/知觉</li>
        <li><strong>16种类型：</strong>四个维度组合形成16种人格类型</li>
        <li><strong>类型理论：</strong>假设人格是离散的类别而非连续的维度</li>
      </ul>
      
      <h5>科学有效性的问题</h5>
      
      <h6>1. 缺乏实证支持</h6>
      <ul>
        <li><strong>因子分析不支持：</strong>统计分析无法确认四个独立维度的存在</li>
        <li><strong>与大五人格模型冲突：</strong>科学研究更支持连续性维度而非离散类型</li>
        <li><strong>预测效力有限：</strong>无法有效预测工作表现或其他重要结果</li>
        <li><strong>跨文化一致性差：</strong>在不同文化背景下结果不一致</li>
      </ul>
      
      <h6>2. 可靠性问题</h6>
      <ul>
        <li><strong>测试-再测可靠性低：</strong>同一人在不同时间测试可能得到不同结果</li>
        <li><strong>边界效应：</strong>许多人的分数接近各维度的中点</li>
        <li><strong>二分法问题：</strong>强制将连续特质分为两极</li>
        <li><strong>内部一致性问题：</strong>某些量表的内部一致性系数较低</li>
      </ul>
      
      <h6>3. 理论基础过时</h6>
      <ul>
        <li><strong>荣格理论的局限性：</strong>基于临床观察而非实证研究</li>
        <li><strong>心理学发展：</strong>现代人格心理学已经超越了1920年代的理论</li>
        <li><strong>神经科学证据：</strong>大脑研究不支持MBTI的类型划分</li>
        <li><strong>认知科学进展：</strong>对人类认知过程的理解已大幅进步</li>
      </ul>
      
      <h5>为什么MBTI仍然流行？</h5>
      
      <h6>心理学原因</h6>
      <ul>
        <li><strong>巴纳姆效应：</strong>人们倾向于接受模糊而普遍适用的描述</li>
        <li><strong>确认偏差：</strong>寻找支持既定信念的信息</li>
        <li><strong>分类需求：</strong>人们喜欢将复杂现象简化为类别</li>
        <li><strong>身份认同：</strong>提供了身份标签和归属感</li>
      </ul>
      
      <h6>商业和社会因素</h6>
      <ul>
        <li><strong>营销策略：</strong>简单易懂的概念更容易推广</li>
        <li><strong>培训行业：</strong>为培训师和咨询师提供了商业机会</li>
        <li><strong>企业需求：</strong>HR部门需要简单的工具进行人员评估</li>
        <li><strong>文化影响：</strong>在某些文化中个性分类更受欢迎</li>
      </ul>
      
      <h5>科学替代方案</h5>
      
      <h6>大五人格模型</h6>
      <p>科学界普遍接受的人格理论：</p>
      <ul>
        <li><strong>开放性：</strong>对新体验的开放程度</li>
        <li><strong>尽责性：</strong>自律和目标导向</li>
        <li><strong>外向性：</strong>社交性和活跃度</li>
        <li><strong>宜人性：</strong>合作和信任倾向</li>
        <li><strong>神经质：</strong>情绪稳定性</li>
      </ul>
      
      <h6>优势对比</h6>
      <ul>
        <li><strong>实证基础：</strong>基于几十年的科学研究</li>
        <li><strong>连续性：</strong>认识到人格特质是连续的维度</li>
        <li><strong>预测效力：</strong>能更好地预测行为和结果</li>
        <li><strong>跨文化稳定性：</strong>在不同文化中表现一致</li>
      </ul>
      
      <h5>MBTI的有限价值</h5>
      <p>尽管存在科学问题，MBTI仍可能在某些情况下有用：</p>
      
      <h6>个人发展</h6>
      <ul>
        <li>作为自我反思的起点</li>
        <li>促进对不同思维方式的理解</li>
        <li>提供讨论个人差异的框架</li>
      </ul>
      
      <h6>团队建设</h6>
      <ul>
        <li>增进团队成员之间的理解</li>
        <li>促进关于工作风格的对话</li>
        <li>提高对多样性的认识</li>
      </ul>
      
      <h5>使用建议</h5>
      <p>如果选择使用MBTI，应该：</p>
      <ul>
        <li><strong>保持批判态度：</strong>不要将结果视为绝对真理</li>
        <li><strong>结合其他工具：</strong>配合科学验证的评估方法</li>
        <li><strong>避免刻板印象：</strong>不要基于类型做重要决策</li>
        <li><strong>重视个体差异：</strong>认识到每个人都是独特的</li>
        <li><strong>定期重评：</strong>人格可能随时间发生变化</li>
      </ul>
      
      <h5>科学思维的重要性</h5>
      <p>这个案例提醒我们：</p>
      <ul>
        <li>受欢迎程度不等于科学有效性</li>
        <li>需要基于证据而非直觉做判断</li>
        <li>批判性思维在评估心理学工具时至关重要</li>
        <li>科学方法是验证理论的最佳途径</li>
      </ul>
      
      <p><strong>结论：</strong>虽然MBTI可能在某些非正式场合有娱乐或对话价值，但在需要科学严谨性的场合（如人员选拔、职业指导等），应优先考虑经过科学验证的工具。</p>
    `,
    sourceUrl: 'https://bigfive-test.com/zh-cn/articles/mbti-pseudoscience-analysis',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    locale: 'zh-CN',
  },
  {
    trendingKeyword: '卡尔荣格',
    title: '探索人类心理的深度：卡尔·荣格的生平和遗产',
    content: `
      <h4>分析心理学之父的传奇人生</h4>
      <p>卡尔·古斯塔夫·荣格（1875-1961）是20世纪最具影响力的心理学家之一。他不仅是精神分析的先驱，更是分析心理学的创立者。荣格的理论超越了个人心理，深入探索了人类集体无意识的奥秘，对心理学、人类学、文学和宗教研究都产生了深远影响。</p>
      
      <h5>早年生活与学术发展</h5>
      
      <h6>成长背景</h6>
      <ul>
        <li><strong>出生地：</strong>瑞士凯瑟威尔，一个充满宗教氛围的家庭</li>
        <li><strong>家庭影响：</strong>父亲是牧师，母亲常有神秘体验</li>
        <li><strong>早期经历：</strong>童年即表现出对梦境和象征的特殊兴趣</li>
        <li><strong>学术道路：</strong>在巴塞尔大学学习医学，专攻精神病学</li>
      </ul>
      
      <h6>职业起步</h6>
      <ul>
        <li><strong>精神病院工作：</strong>在布尔茨医院积累临床经验</li>
        <li><strong>词汇联想测试：</strong>开发了著名的心理测试方法</li>
        <li><strong>早期研究：</strong>专注于精神分裂症和无意识过程</li>
      </ul>
      
      <h5>与弗洛伊德的关系</h5>
      
      <h6>合作阶段（1907-1913）</h6>
      <ul>
        <li><strong>初次相遇：</strong>1907年在维也纳的历史性会面</li>
        <li><strong>深度合作：</strong>成为国际精神分析协会首任主席</li>
        <li><strong>理论贡献：</strong>为精神分析理论的发展做出重要贡献</li>
        <li><strong>父子关系：</strong>弗洛伊德视荣格为精神分析的继承人</li>
      </ul>
      
      <h6>分歧与决裂</h6>
      <ul>
        <li><strong>理论差异：</strong>对无意识本质的不同理解</li>
        <li><strong>性欲理论：</strong>荣格认为力比多不仅仅是性能量</li>
        <li><strong>宗教观点：</strong>荣格更重视宗教和精神体验</li>
        <li><strong>最终决裂：</strong>1913年正式分道扬镳</li>
      </ul>
      
      <h5>核心理论贡献</h5>
      
      <h6>集体无意识理论</h6>
      <p>荣格最著名的理论贡献：</p>
      <ul>
        <li><strong>概念定义：</strong>超越个人经验的共同心理层面</li>
        <li><strong>跨文化普遍性：</strong>在所有人类文化中都存在</li>
        <li><strong>遗传基础：</strong>通过进化过程在人类中保存</li>
        <li><strong>表现形式：</strong>通过原型在意识中显现</li>
      </ul>
      
      <h6>原型理论</h6>
      <p>集体无意识的具体表现形式：</p>
      <ul>
        <li><strong>阿尼玛/阿尼姆斯：</strong>男性内在的女性面和女性内在的男性面</li>
        <li><strong>阴影：</strong>被压抑或否认的人格部分</li>
        <li><strong>自性：</strong>人格的统一和完整性</li>
        <li><strong>智慧老人：</strong>智慧和指导的象征</li>
        <li><strong>大母神：</strong>nurturing和保护的力量</li>
      </ul>
      
      <h6>心理类型理论</h6>
      <p>现代人格理论的基础：</p>
      <ul>
        <li><strong>态度类型：</strong>内向型和外向型</li>
        <li><strong>功能类型：</strong>思维、情感、感觉、直觉</li>
        <li><strong>主导功能：</strong>个人最发达的心理功能</li>
        <li><strong>补偿原理：</strong>意识态度与无意识态度的平衡</li>
      </ul>
      
      <h5>分析心理学的发展</h5>
      
      <h6>治疗方法</h6>
      <ul>
        <li><strong>积极想象：</strong>与无意识内容的主动对话</li>
        <li><strong>梦境分析：</strong>不同于弗洛伊德的前瞻性解释</li>
        <li><strong>沙盘游戏：</strong>通过象征表达探索无意识</li>
        <li><strong>个体化过程：</strong>成为完整自我的心理发展</li>
      </ul>
      
      <h6>个体化概念</h6>
      <ul>
        <li><strong>生命目标：</strong>实现真正的自我</li>
        <li><strong>阴影整合：</strong>接纳被否认的人格部分</li>
        <li><strong>对立统一：</strong>整合内在的矛盾冲突</li>
        <li><strong>自性实现：</strong>达到人格的完整性</li>
      </ul>
      
      <h5>跨学科影响</h5>
      
      <h6>文学与艺术</h6>
      <ul>
        <li><strong>象征主义：</strong>影响了众多作家和艺术家</li>
        <li><strong>神话研究：</strong>为约瑟夫·坎贝尔的英雄之旅提供理论基础</li>
        <li><strong>创作理论：</strong>关于艺术创作中无意识作用的理论</li>
      </ul>
      
      <h6>宗教与哲学</h6>
      <ul>
        <li><strong>宗教心理学：</strong>对宗教体验的心理学解释</li>
        <li><strong>东西方思想：</strong>促进了东西方哲学的对话</li>
        <li><strong>炼金术研究：</strong>将炼金术理解为心理转化的象征</li>
      </ul>
      
      <h6>人类学与社会学</h6>
      <ul>
        <li><strong>文化分析：</strong>用原型理论解释文化现象</li>
        <li><strong>社会心理：</strong>分析群体行为的无意识动机</li>
        <li><strong>历史研究：</strong>从心理学角度理解历史事件</li>
      </ul>
      
      <h5>争议与批评</h5>
      
      <h6>科学性质疑</h6>
      <ul>
        <li><strong>实证验证：</strong>许多理论难以科学验证</li>
        <li><strong>主观性强：</strong>过分依赖个人解释和直觉</li>
        <li><strong>神秘主义：</strong>被批评过于神秘化</li>
      </ul>
      
      <h6>政治争议</h6>
      <ul>
        <li><strong>纳粹时期：</strong>在德国心理治疗协会的角色引发争议</li>
        <li><strong>反犹指控：</strong>一些言论被质疑带有反犹倾向</li>
        <li><strong>历史澄清：</strong>后续研究对这些指控提供了更平衡的视角</li>
      </ul>
      
      <h5>现代影响与遗产</h5>
      
      <h6>心理治疗</h6>
      <ul>
        <li><strong>荣格分析：</strong>全球范围内的专业治疗方法</li>
        <li><strong>深度心理学：</strong>影响了多种治疗流派</li>
        <li><strong>人本主义心理学：</strong>为人本主义发展提供了理论基础</li>
      </ul>
      
      <h6>流行文化</h6>
      <ul>
        <li><strong>人格测试：</strong>MBTI等工具基于荣格的类型理论</li>
        <li><strong>自助书籍：</strong>大量心理自助类书籍受其影响</li>
        <li><strong>电影文学：</strong>原型理论在现代叙事中广泛应用</li>
      </ul>
      
      <h6>学术传承</h6>
      <ul>
        <li><strong>荣格学院：</strong>世界各地的专业培训机构</li>
        <li><strong>研究期刊：</strong>专门的学术出版物</li>
        <li><strong>学术会议：</strong>定期的国际学术交流</li>
      </ul>
      
      <h5>当代评价</h5>
      <p>今天我们如何看待荣格的贡献：</p>
      <ul>
        <li><strong>开创性思想：</strong>在心理学史上具有里程碑意义</li>
        <li><strong>整体视角：</strong>强调心理生活的整体性和意义</li>
        <li><strong>文化桥梁：</strong>连接了科学与人文、东方与西方</li>
        <li><strong>人性洞察：</strong>对人类心理深层结构的独特见解</li>
        <li><strong>治疗贡献：</strong>为心理治疗提供了宝贵的方法和理念</li>
      </ul>
      
      <p><strong>结语：</strong>卡尔·荣格的一生是探索人类心理奥秘的传奇。虽然他的一些理论在今天看来可能缺乏严格的科学验证，但他对人类心理深层结构的洞察和对个体化过程的强调，仍然为我们理解自我和他人提供了宝贵的视角。</p>
    `,
    sourceUrl: 'https://bigfive-test.com/zh-cn/articles/carl-jung-life-legacy',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    locale: 'zh-CN',
  },
  {
    trendingKeyword: '乔丹彼得森',
    title: '乔丹·B·彼得森的旅程：对一位有争议思想家的回顾',
    content: `
      <h4>从学术界到公共知识分子的转变</h4>
      <p>乔丹·B·彼得森是当代最具争议性的公共知识分子之一。他从一名相对默默无闻的临床心理学教授，转变为全球知名的思想家、作家和演说家。他的旅程充满了学术成就、公共争议和个人挑战，反映了当代社会在文化、政治和心理健康等议题上的深层分歧。</p>
      
      <h5>早年生活与学术起步</h5>
      
      <h6>成长背景</h6>
      <ul>
        <li><strong>出生地：</strong>1962年生于加拿大阿尔伯塔省埃德蒙顿</li>
        <li><strong>家庭环境：</strong>在一个中产阶级家庭中长大</li>
        <li><strong>早期兴趣：</strong>对政治、历史和心理学表现出浓厚兴趣</li>
        <li><strong>形成期：</strong>冷战时期的成长经历影响了他的世界观</li>
      </ul>
      
      <h6>学术训练</h6>
      <ul>
        <li><strong>本科教育：</strong>阿尔伯塔大学政治学和心理学</li>
        <li><strong>博士学位：</strong>麦吉尔大学临床心理学博士</li>
        <li><strong>博士论文：</strong>酒精中毒中的aggression预测因子</li>
        <li><strong>博士后研究：</strong>哈佛大学心理学系</li>
      </ul>
      
      <h5>学术生涯发展</h5>
      
      <h6>哈佛时期（1993-1998）</h6>
      <ul>
        <li><strong>助理教授：</strong>在哈佛大学心理学系任教</li>
        <li><strong>研究重点：</strong>人格心理学、异常心理学和宗教心理学</li>
        <li><strong>教学声誉：</strong>以富有感染力的讲课风格闻名</li>
        <li><strong>第一本书：</strong>《意义地图》（Maps of Meaning）的构思开始</li>
      </ul>
      
      <h6>多伦多大学时期（1998-至今）</h6>
      <ul>
        <li><strong>正教授职位：</strong>心理学系终身教授</li>
        <li><strong>临床实践：</strong>继续从事私人心理治疗实践</li>
        <li><strong>研究成果：</strong>发表大量关于人格和动机的学术论文</li>
        <li><strong>网络课程：</strong>早期开始录制和分享在线讲座</li>
      </ul>
      
      <h5>核心学术贡献</h5>
      
      <h6>《意义地图》（1999）</h6>
      <p>彼得森的第一部主要著作：</p>
      <ul>
        <li><strong>核心主题：</strong>人类如何构建意义和应对混乱</li>
        <li><strong>理论框架：</strong>整合神经科学、心理学和神话学</li>
        <li><strong>学术影响：</strong>在学术界获得关注但影响有限</li>
        <li><strong>复杂性：</strong>理论体系庞大而复杂，读者有限</li>
      </ul>
      
      <h6>人格心理学研究</h6>
      <ul>
        <li><strong>大五人格模型：</strong>在人格特质研究方面的贡献</li>
        <li><strong>创造力研究：</strong>探索创造力与心理健康的关系</li>
        <li><strong>政治心理学：</strong>研究人格特质与政治倾向的关系</li>
        <li><strong>临床应用：</strong>将研究成果应用于心理治疗实践</li>
      </ul>
      
      <h5>公众影响力的崛起</h5>
      
      <h6>C-16法案争议（2016）</h6>
      <p>彼得森公众生涯的转折点：</p>
      <ul>
        <li><strong>法案内容：</strong>加拿大人权法修正案，保护性别认同和表达</li>
        <li><strong>彼得森的立场：</strong>反对强制使用特定代词</li>
        <li><strong>争议核心：</strong>言论自由vs.权利保护的冲突</li>
        <li><strong>媒体关注：</strong>迅速成为全国性争议话题</li>
      </ul>
      
      <h6>YouTube和在线影响</h6>
      <ul>
        <li><strong>视频讲座：</strong>上传心理学课程和个人观点</li>
        <li><strong>病毒式传播：</strong>特别是关于"清理房间"的建议</li>
        <li><strong>全球受众：</strong>吸引了数百万订阅者</li>
        <li><strong>收入来源：</strong>Patreon捐赠成为重要收入</li>
      </ul>
      
      <h5>《人生十二法则》现象</h5>
      
      <h6>书籍成功</h6>
      <ul>
        <li><strong>出版时间：</strong>2018年1月发布</li>
        <li><strong>销售数字：</strong>全球销售超过500万册</li>
        <li><strong>国际影响：</strong>被翻译成多种语言</li>
        <li><strong>畅销书地位：</strong>长期占据各国畅销书榜单</li>
      </ul>
      
      <h6>核心信息</h6>
      <p>书中的主要原则：</p>
      <ul>
        <li><strong>个人责任：</strong>强调个人对自己生活的责任</li>
        <li><strong>秩序vs混乱：</strong>在秩序和混乱之间寻找平衡</li>
        <li><strong>传统智慧：</strong>从传统文化中汲取现代指导</li>
        <li><strong>实用建议：</strong>从"整理房间"到"说真话"</li>
      </ul>
      
      <h5>争议与批评</h5>
      
      <h6>政治立场争议</h6>
      <ul>
        <li><strong>保守主义标签：</strong>被贴上右翼保守派标签</li>
        <li><strong>反女权主义指控：</strong>某些言论被批评为反女权</li>
        <li><strong>气候变化：</strong>对气候变化科学的质疑态度</li>
        <li><strong>social justice：</strong>对社会正义运动的批评</li>
      </ul>
      
      <h6>学术界反应</h6>
      <ul>
        <li><strong>同行批评：</strong>一些心理学家质疑其理论基础</li>
        <li><strong>过度简化指控：</strong>被批评过度简化复杂的学术概念</li>
        <li><strong>科学准确性：</strong>某些表述的科学准确性受到质疑</li>
        <li><strong>学术声誉：</strong>在学术界的声誉出现两极分化</li>
      </ul>
      
      <h5>个人挑战与康复</h5>
      
      <h6>健康危机（2019-2020）</h6>
      <ul>
        <li><strong>苯二氮平依赖：</strong>对抗焦虑药物产生依赖</li>
        <li><strong>妻子患病：</strong>妻子的癌症诊断带来巨大压力</li>
        <li><strong>国际治疗：</strong>前往俄罗斯接受戒断治疗</li>
        <li><strong>公众缺席：</strong>长期从公众视野中消失</li>
      </ul>
      
      <h6>康复与回归</h6>
      <ul>
        <li><strong>健康恢复：</strong>逐步恢复身体和精神健康</li>
        <li><strong>家庭支持：</strong>女儿和妻子的支持起关键作用</li>
        <li><strong>新的视角：</strong>对苦难和脆弱性有了新的理解</li>
        <li><strong>重新活跃：</strong>2020年后逐渐重返公共舞台</li>
      </ul>
      
      <h5>后续发展</h5>
      
      <h6>新项目和计划</h6>
      <ul>
        <li><strong>第二本书：</strong>《秩序之外》的写作和出版</li>
        <li><strong>在线平台：</strong>开发个人发展在线课程</li>
        <li><strong>播客和媒体：</strong>继续通过各种媒体平台发声</li>
        <li><strong>国际演讲：</strong>恢复全球巡回演讲</li>
      </ul>
      
      <h6>影响评估</h6>
      <ul>
        <li><strong>正面影响：</strong>
          <ul>
            <li>激励许多人改善生活</li>
            <li>提高对心理健康的关注</li>
            <li>促进个人责任意识</li>
            <li>复兴对传统智慧的兴趣</li>
          </ul>
        </li>
        <li><strong>争议影响：</strong>
          <ul>
            <li>加剧文化战争的分化</li>
            <li>一些极端观点的理论支撑</li>
            <li>学术界的两极分化</li>
            <li>简化复杂社会问题的风险</li>
          </ul>
        </li>
      </ul>
      
      <h5>思想家的复杂遗产</h5>
      
      <h6>积极贡献</h6>
      <ul>
        <li><strong>心理健康意识：</strong>提高了社会对心理健康的关注</li>
        <li><strong>个人成长：</strong>为许多人提供了实用的生活指导</li>
        <li><strong>跨学科思考：</strong>展示了整合不同学科的价值</li>
        <li><strong>深度对话：</strong>促进了关于重要议题的深度讨论</li>
      </ul>
      
      <h6>持续争议</h6>
      <ul>
        <li><strong>政治化风险：</strong>学术观点被过度政治化</li>
        <li><strong>简化倾向：</strong>复杂问题的过度简化</li>
        <li><strong>偏见指控：</strong>某些观点被指带有偏见</li>
        <li><strong>影响分化：</strong>在不同群体中产生截然不同的反应</li>
      </ul>
      
      <h5>当代评价与启示</h5>
      <p>如何客观评价彼得森现象：</p>
      
      <h6>平衡视角</h6>
      <ul>
        <li><strong>学术价值：</strong>承认其在学术领域的贡献</li>
        <li><strong>社会影响：</strong>认识其对公众讨论的推动作用</li>
        <li><strong>争议现实：</strong>直面争议性观点的问题</li>
        <li><strong>个人成长：</strong>从其个人挑战中学习</li>
      </ul>
      
      <h6>更广泛的意义</h6>
      <ul>
        <li><strong>知识分子角色：</strong>现代社会中公共知识分子的作用</li>
        <li><strong>媒体时代：</strong>社交媒体如何塑造公共话语</li>
        <li><strong>文化分化：</strong>当代社会价值观分化的反映</li>
        <li><strong>个人责任：</strong>个人在社会变革中的责任和局限</li>
      </ul>
      
      <p><strong>结语：</strong>乔丹·B·彼得森的旅程是一个复杂而引人深思的故事。无论人们如何评价他的观点，都不能否认他在心理学、公共话语和个人发展领域产生的深远影响。他的经历提醒我们，在复杂的现代社会中，理解和对话比简单的支持或反对更为重要。</p>
    `,
    sourceUrl: 'https://bigfive-test.com/zh-cn/articles/jordan-peterson-controversial-thinker-review',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    locale: 'zh-CN',
  }
];

async function main() {
  console.log('开始添加最后一批中文文章到博客数据库...');
  
  for (const article of finalChineseArticles) {
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
  
  console.log('最后一批中文文章添加完成!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

