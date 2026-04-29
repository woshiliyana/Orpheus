# 产品 PRD（工作名：Orpheus）

> 状态：初版需求文档，尚未进入开发实现
> 当前版本：v0.42
> 首次创建：2026-04-21
> 最近更新：2026-04-25
> 文档定位：当前阶段唯一主 PRD，后续迭代默认持续更新本文件

## 更新记录

### 2026-04-25 v0.42

1. 将 Inworld 当前真实测试费率更新为 On-Demand / Creator `$50 / 1M chars`，并保留 Developer `$40 / 1M chars` 与 Growth `$30 / 1M chars` 作为折扣场景。
2. 明确 `$30 / 1M chars` 不再是当前账号默认真相，而是 Growth / 谈判目标场景；`Pro $20 / 90 min` 仍需通过 provider-rate 或 realized-usage 证据后才能公开承诺。
3. 将早期采用建议调整为继续用 On-Demand / Creator 做 feasibility，不在真实消耗和用户验证不足前直接升级到更高固定月费计划。

### 2026-04-23 v0.41

1. 新增长文本音频竞争基准评估文档，覆盖 `ElevenLabs` 主基准、`Inworld` / `Cartesia` provider 成本现实，以及 `Raphael` 式分发可借鉴边界；该文档属于 review 层输入，不是 canonical truth。
2. 将 `Pro = $20 / 90 分钟` 明确为带 provider-cost guardrail 的内部 working anchor，并把定价 workbook 定义为 required planning companion，而不是 pricing 真源。
3. 明确 `Inworld-first` 仍是当前开工选择，但必须在第一 benchmark cycle 同步跑 `Cartesia`，而不是等做完主路径再补。
4. 将核心对外 hook 收紧为 `一次贴整稿 -> 稳定旁白 -> subtitle-ready timing`，并锁定第一技术门为 `EN + ES` 输出与 timing readiness，工作台 UI 仍以英语优先。

### 2026-04-23 v0.40

1. 将 ElevenLabs Studio 带来的竞争现实纳入 pricing / distribution / development-entry 真源，明确 Orpheus 不能靠“也支持长文本”作为公开差异化。
2. 明确 `$20 / 90 分钟` 的 `Pro` 仍是保守内部 working anchor，而不是已经验证过的公开市场最优 self-serve packaging。
3. 要求进入公开 self-serve 前必须补一份与当前长文本自助参考路径的竞争基准说明，避免在分钟数与 workflow 价值上同时失语。

### 2026-04-23 v0.39

1. 将 stable-audio 技术门、pricing / packaging 真源、以及 agent handoff 文档合并为统一的 development-entry truth bundle。
2. 新增 `Pricing, Packaging, and Unit Economics` 专题规范，并把 `Free / Pro / Ultimate` 工作版锚点收口为 `$0 / $20 / $60` 与 `10 / 90 / 240` 分钟。
3. 新增 `Phase 2` agent build-and-test brief 与 provider evidence scorecard template，使开工测试不再依赖口头融合。
4. 补充 artifact manifest、subtitle text fidelity 质量维度、Phase 2 cost snapshot 与 go / hold / fallback handoff 要求。

### 2026-04-23 v0.38

1. 新增 `Pricing, Packaging, and Unit Economics` 专题规范，单独收口价格锚点、分钟额度、单位经济模型与更新触发条件。
2. 将当前工作版价格锚点调整为 `Free / Pro / Ultimate = $0 / $20 / $60`，并将 `Pro` 明确为第一付费验证通路。
3. 将当前工作版分钟额度调整为 `Free 10 分钟`、`Pro 90 分钟`、`Ultimate 240 分钟`，用于匹配长文本稳定音频的首个商业包络。
4. 明确 Raphael-style 分发可借鉴的是“简洁入口、清晰升级层级、队列/质量差异化”，而不是“无限免费长音频”。
5. 将 pricing page、权益矩阵、计费语义与单位经济 review 绑到同一条更新链路，避免营销、产品和成本模型再次分叉。

### 2026-04-23 v0.37

1. 对齐第一付费通路与 hosted feasibility 门槛，明确首个付费主档必须覆盖第一技术门要验证的单项目长度包络。
2. 明确即使暂不开放用户侧 `SRT` 导出，成功项目也必须生成内部 alignment assets，为后续字幕与修复工作流铺路。
3. 补充后端 hidden chunking / orchestration、artifact manifest 与三层文本模型的技术约束，避免开发期再发明第二套语义。
4. 为 `Phase 2` 增补开发入口 checklist、artifact 交付要求与 pricing rollout 对齐条件。

### 2026-04-23 v0.36

1. 将首个正式执行楔子锁定为 `educational explainers + long text -> stable audio`，不再把 `story-first documentary` 作为第一执行门。
2. 明确 `SRT`、更强音色分层、独立工具页与广义增长面属于后续层，不是第一技术放行条件。
3. 将技术推进顺序锁定为 `hosted-first`：`Inworld TTS 1.5 Max` 主评估，`Cartesia` 备选，自托管路线先做参考与降本预研。
4. 新增 `Phase 2` hosted long-form feasibility spike 的正式执行方向，用以回答“20-30 分钟长文本是否能稳定完成”。

### 2026-04-22 v0.35

1. 收窄 V1：调整为英语完整产品 + story-first documentary 主赛道 + 3-5 个旗舰音色。
2. 新增 `Distribution and Growth Surface` 专题规范，明确首页主叙事、免登录试用、独立工具页与多语 SEO 页边界。
3. 调整免费层音色策略：免费用户主打大启动库选择感，付费层主打旗舰音色、一致性与完整工作流。
4. 重排 roadmap 与 plans 的阶段职责，把分发基础前移到 Phase 1，把多语增长扩展后置到 Phase 7。

### 2026-04-22 v0.34

1. 新增 `QualityOps and Automation` 专题规范，明确质量 scorecard、动态看板与自动化分类的规范真源。
2. 为运营后台、邮件系统与定时任务系统补充统一的执行真源入口。
3. 为 roadmap phase 与 plans 目录增加显式映射约定，避免执行文档各自发明目录结构。

### 2026-04-22 v0.33

1. 新增并列文档体系：`docs/roadmap/` 与 `docs/plans/`，分别承接实现顺序和执行工作包计划。
2. 明确 V1 实现顺序采用“体验轨 + 工作流轨 + 质量运营轨”的平衡闭环方式。
3. 明确品牌 / 视觉 / UIUX、质量评测与动态看板、cron / 邮件 / 服务端提醒都进入 V1 主线，而不是后补项。

### 2026-04-22 v0.32

1. 新增 PRD 真源框架：`source-of-truth-index`、`agent-conventions` 与 `MkSaaS boundary contract`。
2. 新增 6 份专题规范，分别收口能力权益、项目生命周期、计费、guest trial、内容治理与 voice metadata。
3. 将主 PRD 相关章节调整为摘要层，并补充执行真源入口，避免后续多 agent 协作时出现双真源。

### 2026-04-22 v0.31

1. 新增“计费边界与失败语义”模块。
2. 明确首次生成、局部重生成、生成失败、字幕失败、provider 超时等场景的默认处理原则。
3. 明确后续计费与客服口径必须统一建立在同一套失败语义之上。

### 2026-04-22 v0.30

1. 新增支付 provider 抽象原则。
2. 明确当前主体条件下，支付默认优先采用 `Paddle`，而不是把 `Stripe` 当作 V1 前提。
3. 明确支付层也必须具备 provider abstraction，以适应未来主体变化和支付方式扩展。

### 2026-04-22 v0.29

1. 新增 `R2` 访问控制与对象生命周期原则。
2. 新增风控阈值与触发规则表。
3. 将免费试用、上传、克隆、重生成、下载与 cron 路由统一纳入分层风控策略。

### 2026-04-22 v0.28

1. 新增 `Provider capability matrix`。
2. 明确 `Inworld / Cartesia / Google STT / WhisperX / Kokoro / IndexTTS2` 在当前产品中的角色与适用范围。
3. 将 provider 选择从抽象原则推进到可执行的比较表。

### 2026-04-22 v0.27

1. 新增“设计与视觉系统（首版）”模块。
2. 明确首页、赛道页、音色页、定价页后续都应尽量组件化，而不是复制页面。
3. 明确视觉方向应围绕 faceless YouTube creators、电影感叙事和高质感工作流，而不是通用 AI SaaS 风格。

### 2026-04-22 v0.26

1. 新增首页信息架构（首版）。
2. 明确 `Orpheus` 首页不应照搬通用 SaaS 顺序，而要优先突出人群、赛道和音色人格。
3. 明确首页模块建议顺序，并给出各模块职责。

### 2026-04-22 v0.25

1. 新增“对外展示版权益表”，将内部规则进一步收敛为更接近定价页文案的版本。
2. 明确免费层、Pro、Ultimate 的对外表达重点，避免后续页面设计时再次从技术规则翻译一遍。

### 2026-04-22 v0.24

1. 新增运营后台与管理视图初版。
2. 明确后台不只是“用户管理”，还需要覆盖音色库、项目运行、用量、风控、投诉和账单几个核心视图。
3. 明确该后台设计是初版运营面板规划，后续可继续收敛或拆分，但当前先保证范围完整。

### 2026-04-22 v0.23

1. 细化 `Content Source of Truth`，补充结构化内容实体、页面派生关系和发布分发原则。
2. 明确前端应尽量组件化，语言页、赛道页、音色页、定价页都应由统一模板与内容区块驱动。
3. 新增内容真源与组件系统的联动思路，避免后续多语言和 Geo SEO 页面变成大量复制页面。

### 2026-04-22 v0.22

1. 新增 `Provider Abstraction Layer`，明确后续接入多个 TTS / STT / 克隆 / 存储 provider 的扩展原则。
2. 新增 `Content Source of Truth`，明确营销页、帮助页、Blog、Geo SEO 页面应由统一内容真源驱动。
3. 新增“仍需继续讨论 / 细化的关键议题”清单，用于后续完善 PRD。

### 2026-04-22 v0.21

1. 新增平台建库工作流。
2. 新增用户上传 / 私有克隆工作流。
3. 新增举报、下架与权利争议处理流。
4. 明确音色系统不仅要有结构，还要有可运营、可审计、可撤销的流程。

### 2026-04-22 v0.20

1. 明确数据库托管服务默认采用 `Neon`。
2. 将数据库策略从“使用 PostgreSQL”进一步收紧为“数据库引擎是 PostgreSQL，托管优先 Neon”。
3. 新增基础设施默认组合视图：`Neon + Cloudflare R2 + Resend + cron-job.org + Crisp + Discord`。

### 2026-04-22 v0.19

1. 新增数据库实体关系说明。
2. 新增关键表职责说明，明确各表不是单纯存储，而是服务于工作流、计费、音色管理与合规。
3. 明确项目、运行、音色、克隆、用量、账单之间的基础关联关系。

### 2026-04-22 v0.18

1. 新增基础设施选型结论：对象存储使用 `Cloudflare R2`。
2. 新增邮件策略：统一使用 `Resend` 承接事务性邮件和营销邮件。
3. 新增定时任务策略：统一使用 `cron-job.org` 作为外部触发器，且必须做 `CRON_SECRET` 验证。
4. 新增用户沟通渠道策略：邮箱、`Crisp` 在线聊天组件、`Discord` 社群。
5. 将上述外部服务与“密钥防火墙”原则对齐，明确哪些信息可暴露，哪些只能留在服务端。

### 2026-04-22 v0.17

1. 删除 `学习与引导层（Enablement Layer）` 整个章节。
2. 撤回此前基于 `scys.com` 课程系统能力边界做出的外推，不再把该部分作为当前 PRD 结论。
3. 修复删除该章节后的文档结构与章节编号。

### 2026-04-22 v0.16

1. 结合 `scys.com` 课程系统的能力边界，补充“学习与引导层（Enablement Layer）”到 PRD。
2. 明确 V1 应吸收的不是“课程产品形态”本身，而是内容组织、搜索、进度与模板化引导能力。
3. 明确学习与引导层的核心模块：Guides / Playbooks、Template Library、Search、Progress / Checklist。
4. 明确评论、回复、点赞等社区化讨论能力不进入 V1 核心范围，后续再评估。

### 2026-04-21 v0.15

1. 新增“密钥防火墙”安全架构原则，作为后续实现阶段的强约束。
2. 明确 `MkSaaS` 只能作为产品壳与基础设施底座，所有第三方 API 接入仍必须按服务端代理与 service / adapter 分层落地。
3. 明确环境变量、日志脱敏、错误处理、前后端调用边界、`.env*` 管理等安全规范进入 V1 架构要求。

### 2026-04-21 v0.14

1. 修正文档章节编号漂移问题，统一定价、开源、引擎与风险章节下的小节编号。
2. 本次更新不改变任何产品结论，只提升 PRD 的结构一致性与可维护性。

### 2026-04-21 v0.13

1. 新增音色元数据模型，明确音色实体必须同时挂接语言、赛道、人格、情绪和库层级。
2. 新增页面生成映射规则，明确语言页、赛道页、音色页如何从统一标签模型派生。
3. 新增推荐逻辑原则，明确首页、工作台和音色页的推荐来源必须共用同一套元数据映射。

### 2026-04-21 v0.12

1. 将 `YouTube 赛道` 体系从纯文字说明升级为“表格 + 映射关系”形式。
2. 新增三级赛道模型总表，便于后续统一维护与扩展。
3. 新增首发优先赛道映射表，把一级母类、二级创作格式、三级热点标签和首批入口关系放在同一视图中。
4. 新增赛道动态维护规则，明确未来新增、删减、重命名的边界。

### 2026-04-21 v0.11

1. 明确 `YouTube 赛道` 不应凭空命名，而应基于 faceless YouTube 常见热门方向抽象出统一模型。
2. 将 `YouTube 赛道` 正式定义为三级结构：内容母类 + 创作格式 + 热点标签。
3. 明确首发优先的四个内容母类：Business & Finance、Mystery & Crime Stories、History & Documentary、Psychology & Self-Development。
4. 保留 `商业拆解` 与 `悬疑叙事` 作为首批旗舰音色的切入口，但将其降级为三级模型中的具体入口，而非整个赛道体系本身。

### 2026-04-21 v0.10

1. 新增 `SRT` 技术路径说明，明确默认采用“最终音频 + STT/对齐 + 原始脚本匹配”的混合路径。
2. 将 `Google STT` 正式纳入 `SRT` 主测试方案。
3. 明确 `WhisperX / forced alignment` 为重要对照测试方案。
4. 明确 provider timestamps 只作为辅助参考，不作为唯一真相来源。

### 2026-04-21 v0.9

1. 明确租户模型：V1 只做用户级隔离，不做团队级多租户。
2. 新增数据库与租户策略，明确采用“单用户优先、结构上预留未来扩展”的设计。
3. 新增 `Discoverability Layer`，将 Agent-ready 与 Geo SEO 提升为 V1 核心项。
4. 明确站点结构围绕“语言页 → YouTube 赛道页 → 音色页”组织。
5. 明确 Geo SEO 主轴以语言页为核心，并采用“统一产品框架 + 各语言本地化案例”的策略。

### 2026-04-21 v0.8

1. 明确首页级核心人群定位：`for faceless YouTube creators`。
2. 明确首页 Hero 结构采用“先人群，后能力”。
3. 将音色系统从单一赛道组织升级为五维结构：语言 × YouTube 赛道 × 人格/风格 × 情绪 × 库层级。
4. 明确 `YouTube 赛道` 是音色系统的一个一级维度，而不是唯一维度。
5. 新增三层音色库结构：平台启动库、平台旗舰库、用户私有库。
6. 明确平台启动库优先采用可商用开源声音兜底，平台旗舰库优先由 `Inworld Voice Design / Voice Cloning` 形成。
7. 明确 V1 首批旗舰音色规模：四语 × 每语 2 个旗舰音色，共 8 个。
8. 明确首批旗舰音色入口优先为 `商业拆解` 与 `悬疑叙事`。
9. 明确人格系统采用“双层表达”：通俗人格主标签 + 热点人格映射（如 MBTI）。

### 2026-04-21 v0.7

1. 补充 Founder 价与 Enterprise 的风险关系：Founder 是当前建议值的重要前提，但不能把产品成立完全押在 Founder 上。
2. 明确 Enterprise 谈判节奏：有真实用户和真实使用数据后再推进，不作为 V1 前置依赖。
3. 将首版分钟数建议进一步标注为“Founder 价成立前提下的建议值”。

### 2026-04-21 v0.6

1. 明确早期 `Inworld` 使用策略：主渲染优先评估 `TTS 1.5 Max`，但账号计划建议从 `Founder Creator` 起步。
2. 强化“不提前烧钱”的约束，明确早期不建议直接上更重的 `Developer / Growth` 级计划。
3. 将 `Founder` 与 `Enterprise` 的关系写清：Founder 用于早期验证，Enterprise 作为中期放量与议价预备路线。

### 2026-04-21 v0.5

1. 新增外部市场调研结论，纳入同类 text-to-audio / voice cloning 产品的公开价格带与产品边界参考。
2. 新增当前推荐的引擎优先级：V1 主渲染优先评估 `Inworld TTS 1.5 Max`，并明确 Founder pricing 的时间窗口风险。
3. 明确 `Cartesia` 为托管备选，`ElevenLabs` 与 `Gemini 3.1 Flash TTS` 当前不建议作为 V1 主引擎。
4. 明确开源模型在 V1 中只用于评测、成本实验与后续降本预研，不作为收费主引擎。
5. 新增保守版定价额度建议：`Free 10-12 分钟 / Pro 60 分钟 / Ultimate 180 分钟`。
6. 将三层对照总表补充为更可执行的首版建议值，并加入单项目长度建议。
7. 新增外部调研依据列表，便于后续回溯和修订。

### 2026-04-21 v0.4

1. 将当前工作名写入 PRD：`Orpheus`，并明确其仅为当前品牌工作名。
2. 新增品牌与域名策略：独立品牌、`straitnode.com` 仅作母品牌或跳转入口，`YouTube` 强出现在营销层而非主品牌层。
3. 新增语言策略：界面语言与项目语言、音色包语言强解耦；V1 核心路径首发支持 9 种界面语言。
4. 明确主推音色语言为英语、西班牙语、日语、法语，并要求按 YouTube 赛道组织主推风格音色。
5. 将首发模板默认方案调整为 `MkSaaS`，技术路线保持 `Next.js + Vercel + i18n`，并保留官方免费 fallback 方案。
6. 新增定价、权益与成本策略：三档结构、月付/年付切换、年付优惠 25%-30%、免费层免登录真实试用、前台按分钟展示、后台按点数与成本核算。
7. 新增“用户价格与权益 / 产品规则 / 内部成本与风控”三层对照表框架。
8. 明确开源只作为辅助增长渠道，首优开源方向为长文本 TTS 评测工具包。
9. 明确公共 `text-to-audio API` 不进入 V1，但预留为后续工作流 API 方向。

### 2026-04-21 v0.3

1. 主文件重命名为 `prd.md`，不再把产品名写进文件名。
2. 文档标题改为“产品 PRD（名称待定）”。
3. 删除正文中默认使用的具体产品名，统一改成中性表述，保留后续专门讨论命名空间。

### 2026-04-21 v0.2

1. 全文改为中文，便于直接评审和提出修改意见。
2. 文档改为“单文档持续更新”机制，不再默认按日期新建 PRD。
3. 新增《更新记录》和《文档维护规则》，后续每次修改都先在顶部说明更新了哪里。
4. 保留 `IndexTTS2` 作为现有重要引擎资产的定位，但不提前锁定为生产默认引擎。

### 2026-04-21 v0.1

1. 完成产品 V1 初版 PRD 草稿。
2. 明确产品主张是“长文本一键生成 + 标准 SRT 导出 + 情绪化音色”。
3. 明确将产品承诺与底层引擎选择分离。
4. 将本地已部署的 `IndexTTS2` 记入引擎候选资产。

## 文档维护规则

1. 当前阶段只维护这一份主 PRD。
2. 后续每次更新，默认直接修改本文件，不再额外新建按日期命名的新 PRD。
3. 每次更新都要先在本文顶部《更新记录》中写明：
   - 更新了哪里
   - 为什么更新
   - 是否影响产品边界、技术约束或引擎判断
4. 只有在你明确要求拆分专题文档时，才额外新建子文档。
5. 所有执行级规则的唯一真源与写入归属，统一登记在 [PRD Source of Truth Index](./source-of-truth-index.md)。

## 1. 产品摘要

本产品当前工作名为 `Orpheus`。它在长期愿景上仍是面向全球长视频创作者的配音工作流产品，但第一执行楔子不再追求“多语言、多赛道、完整平台”的一次性展开，而是收敛为：

1. 英语优先工作台与完整主流程
2. 面向全职、`YPP` 驱动、脚本重的 faceless educational explainers
3. 第一可卖结果锁定为 `long text -> stable audio + subtitle-ready timing`
4. 第一技术放行门的输出与 timing readiness 覆盖英语 + 西班牙语

产品当前有两个核心价值支柱：

1. 稳定长文本工作流：从长脚本到可发布音频成品与 timing-ready 交付
2. 后续可叠加的 premium workflow layer：字幕、修复、音色分层与更广增长面

首页级核心人群定位当前明确为：

`for faceless educational explainer creators`

同时，本产品当前的增长外壳也已经明确：

1. 独立产品品牌，不挂靠现有 YouTube 项目品牌
2. 第一阶段首页主承诺必须围绕 `一次贴整稿 -> 稳定旁白 -> subtitle-ready timing`，而不是广义 AI 视频自动化
3. 对外优先卖“稳定出片”和“减少手动拆段 / 盯流程”，而不是先卖大而全工作流
4. 前台按创作者能理解的“分钟/小时音频额度”讲价值，后台保留点数、成本、风控和引擎路由的内部弹性

本 PRD 明确把“产品承诺”和“引擎实现方案”分开描述。`IndexTTS2` 仍然是重要现有资产，但不再作为第一放行路径的默认前提。

## 2. 问题陈述

长视频创作者真正需要的，不只是高质量 TTS，而是一整套把长脚本变成可交付音频素材的工作流。

当前市场常见问题包括：

1. 长文本能力和短文本能力往往分散在不同入口或不同产品里。
2. 用户经常需要手动切文本、分段生成、再自行拼接。
3. 字幕时间轴输出弱，或者根本不符合剪辑工作流。
4. 对长内容来说，生成成本、重试成本和修复成本很快失控。

本产品要解决的核心问题是：

> 用户只提交一整篇长脚本，系统在后台完成切分、排队、拼接和重试，最终稳定交付可发布的长文本旁白音频，避免因为配音链路不稳而掉更新频率。

## 3. 产品主张

本产品不应该把自己包装成“另一个 TTS 模型入口”，而应该包装成“创作者原生的长脚本旁白工作流”。

第一执行门的核心叙事是：

1. 用户把一整篇长脚本当成一个项目提交。
2. 系统在后台处理切片、队列、拼接、重试和持久化。
3. 用户看到的是一个完整项目，而不是一堆零散分片任务。
4. 用户最终先拿到的是可用长音频成品与可继续走字幕时间轴链路的 timing-ready 结果，而不是一段“声音样本”或半手动工作流。

当前产品价值排序为：

1. 稳定长文本出音频与 subtitle-ready timing
2. 项目级工作流与可持续发布
3. 音色差异化作为后续溢价层，而不是第一放行条件

首页 Hero 当前建议采用：

1. 先人群
2. 再能力

也就是：

1. 第一层先直接点明 `faceless educational explainer creators`
2. 第二层再用 `Paste the whole script once. Get stable narration with subtitle-ready timing.` 解释第一价值

## 4. 目标用户

### 核心用户

V1 首发用户应优先收敛为英语 faceless educational explainer creators，重点特征包括：

1. 全职或接近全职
2. 视频通常 `8` 分钟以上，且很多内容远高于这个长度
3. 强依赖脚本与旁白
4. 收入对 `YPP` 节奏敏感

相邻但不作为 V1 第一刀主打的方向包括：

1. 心理学 / 教育叙事
2. 语言现象 / 语言学习 explainers
3. 一般知识解说 / concept breakdowns

### 用户假设

1. 用户多为个人创作者或极小团队。
2. 用户更在意生产效率和后期适配，而不是底层模型名称。
3. 用户真正愿意付费的第一原因是长文本旁白更稳，不必自己拆段和盯流程。
4. 用户是否购买，首先取决于它能不能保护发布频率和收入，而不是音色数量本身。
5. 用户希望降低剪辑、字幕和重复生成的摩擦，但这些更像第二层购买理由。
6. 用户对价格敏感，尤其是在长脚本场景下，所以单位经济模型必须先被证明。

## 5. 产品原则

### 5.1 对外表述原则

1. 不宣称本产品是“全球第一家”。
2. 不宣称本产品是“唯一能做一小时长音频”的产品。
3. 可以宣称本产品是面向 faceless educational explainer creators 的 `one-submit stable narration workflow`。
4. 可以宣称第一技术门覆盖英语 + 西班牙语 output / timing readiness，但不能在第一阶段暗示完整多语工作台、自动视频、自动字幕或 unlimited free 已全部完成。
5. 首页和营销页应先强调具体人群、稳定出片和具体结果，再解释模型或音色技术细节。
6. 音色差异化应被包装成后续 premium layer，而不是第一放行条件。
7. `YouTube` 应主要出现在首页文案、案例页、赛道页、音色包描述中，而不是主品牌名中。

### 5.2 体验原则

1. 用户体验单位必须是“一个项目”，不是“多个分段任务”。
2. 用户不需要理解 provider 限制、token 上限或内部切分逻辑。
3. V1 不向用户暴露模型选择。
4. 输出结果必须能直接进入后期流程，而不是只提供试听价值。
5. 品牌、视觉与前端 UI/UX 是 V1 核心系统，而不是最后再补的包装层。
6. TTS、音色、长音频与 `SRT` 的真实效果本身就是用户体验的一部分，必须持续评测和运营观测。
7. 第一执行门的产品体验判定标准是“长文本稳定出音频”，不是“先把所有 workflow layer 一次补齐”。
8. 真正的护城河先来自 `workflow + reliability`，音色一致性和更强 workflow layer 再作为下一层。

旁白输入与自然停顿的执行真源为 [`Narration Input and Pacing`](./specs/narration-input-and-pacing.md)。本节只保留体验原则，不重复输入校验、pacing mode、provider markup 或 evidence 规则。

### 5.3 决策原则

1. 产品承诺与引擎决策必须分开。
2. 本地已有可用引擎，不代表它自动成为生产默认引擎。
3. 商业授权、合规边界与运营稳定性，必须在上线前明确，而不是上线后补救。
4. 模板和基础设施选型要优先服务多语言、支付、异步任务和快速上站，而不是追求最低代码量。

## 6. 方案描述

本产品将提供一个围绕“长脚本项目”的 SaaS 工作流。

### 6.1 输入方式

V1 支持以下输入来源：

1. 直接粘贴长文本
2. 上传文本型 `txt`、`docx`、`pdf`

### 6.2 音色入口

执行真源：

1. [Capability Entitlements](./specs/capability-entitlements.md)
2. [Voice Metadata Schema](./specs/voice-metadata-schema.md)

本节只保留摘要，不重复套餐 gating、clone rollout 和 metadata 落位规则。

V1 的音色入口包括：

1. 默认人设音色库
2. 受控开放的私有克隆能力

用户在产品里选择音色，含义是选择本次生成使用的旁白声音。它不是购买、下载、拥有、转售或导出平台音色、provider `voiceId`、prompt、模型或克隆源资产。

默认人设音色库在 V1 中应先围绕英语优先工作台、英语 / 西班牙语输出边界和主赛道簇组织，首发重点是：

1. 英语 / 西班牙语启动库音色
2. 足够支撑 hosted feasibility spike 的基础英语 / 西班牙语音色
3. 围绕 educational explainers 的 narrator persona 入口

私有克隆能力属于 V1 的受控能力，而不是对所有计划默认开放的通用入口。首发默认状态、计划矩阵、激活方式和审核时点以执行真源为准。

### 6.2.1 三层音色库结构

V1 的音色库不是一个平铺列表，而是三层结构：

1. 平台启动库
2. 平台旗舰库
3. 用户私有库

这三层需要在产品体验、权限、成本和合规上严格区分。

### 6.2.2 平台启动库

平台启动库的目标是：

1. 快速覆盖主推语言
2. 支撑免费层与免登录试用的“选择感”
3. 提供低成本、可商用、可批量扩展的起步音色底座

当前建议：

1. 优先采用可商用开源声音作为底座
2. `Kokoro` 是当前优先的启动库候选之一
3. 启动库在 V1 中应形成英语主赛道内的大型 AI narrator library，而不是只给免费层 2-3 个样本音色
4. 启动库的角色是“选择很多、容易试用、能兜底”，不是最终品牌护城河

### 6.2.3 平台旗舰库

平台旗舰库承担本产品真正的差异化与品牌资产角色。

当前建议：

1. 旗舰库优先通过 `Inworld Voice Design`
2. 对权利清晰且供应商确认可用于 SaaS 内部 voice picker 的 prompt-designed voice，可形成平台旗舰候选
3. 旗舰库负责承载赛道感、人格感、情绪感、品牌感与长期一致性承诺
4. V1 首发只做少量旗舰音色，不追求大而全
5. 平台音频输入克隆属于后续受控合规 lane，不作为当前 MVP 默认建库机制

### 6.2.4 用户私有库

用户私有库的目标是：

1. 支持用户上传样本
2. 支持用户生成私有克隆音色
3. 默认不并入平台公共库
4. 在权限、撤销和合规上与平台库严格隔离

### 6.2.5 平台建库工作流

平台新增一个公共音色时，不应只是“把声音放进库里”，而应走完整建库流程。

建议的基本阶段：

1. `proposal`
2. `rights_check`
3. `prototype`
4. `qa_review`
5. `publish`
6. `monitor`

每个阶段至少要回答：

1. 这个音色服务哪种语言
2. 这个音色服务哪个 `YouTube 赛道`
3. 它对应什么人格与情绪
4. 它的来源是什么
5. 它是否具备清晰的商用权利
6. 是否进入免费层、Pro 或 Ultimate

### 6.2.6 用户上传 / 私有克隆工作流

用户上传与私有克隆不应是一个无状态动作，而应是一个可追踪流程。

建议至少包含以下状态：

1. `draft`
2. `uploaded`
3. `consent_confirmed`
4. `processing`
5. `ready`
6. `rejected`
7. `disabled`
8. `deleted`

V1 至少应支持：

1. 上传样本
2. 语言标记
3. 权利声明
4. 隐私选项
5. 删除与撤销
6. 拒绝与禁用状态回显

### 6.2.7 举报、下架与争议处理流

既然平台支持公共音色与用户私有克隆，就必须设计可执行的合规处理流。

V1 至少要具备：

1. 举报入口
2. 下架能力
3. 权利争议处理记录
4. 音色禁用状态
5. 用户可见的最小必要反馈

建议的处理状态包括：

1. `reported`
2. `under_review`
3. `restricted`
4. `removed`
5. `restored`

这套流程的目标是：

1. 保护平台公共库
2. 保护私有库中的合法用户
3. 为后续更严格的合规策略留出基础结构

### 6.3 生成工作流

执行真源：

1. [Project and Run Lifecycle](./specs/project-run-lifecycle.md)
2. [Billing and Usage Semantics](./specs/billing-usage-semantics.md)

本节只保留项目制体验摘要，不重复状态机、失败阶段和计费语义。

当用户提交一个长脚本项目时：

1. 系统创建一个完整项目记录。
2. 系统在后台完成隐藏切分、排队、生成、拼接和失败恢复。
3. 系统保留项目历史、状态和输出文件。
4. 用户看到的是一个连贯的项目详情页，而不是底层执行碎片。

项目状态、运行状态、失败阶段、可重试与可计费解释，以执行真源为准。

### 6.4 交付结果

执行真源：

1. [Capability Entitlements](./specs/capability-entitlements.md)
2. [Project and Run Lifecycle](./specs/project-run-lifecycle.md)

本节只保留交付摘要，不重复计划矩阵。

每个有下载权益的长文成功项目至少应交付：

1. 生成后的完整长文音频下载
2. 在计划允许时提供标准 `SRT` 导出
3. 分段试听，以及在计划允许时提供局部重生成能力

免登录或免费层如果后续开放，只能提供受控短试用、预览或短音频 takeaway；不能被描述为可下载完整长文生产音频。

## 7. 输出标准

### 7.1 音频输出

执行真源：

1. [Capability Entitlements](./specs/capability-entitlements.md)
2. [Project and Run Lifecycle](./specs/project-run-lifecycle.md)

本节只保留音频格式摘要，不重复能力矩阵。

当前产品姿态是：

1. 对有下载权益的长文项目，默认用户交付格式为可下载 `MP3`
2. 平台内部优先请求并保留 provider-native lossless 生产母版，例如 `WAV` / Linear PCM / raw PCM
3. 商业默认 `MP3` 目标为 `>=192 kbps`
4. 未来可提供用户侧 `MP3` / `WAV` 可选下载，但 `WAV` 导出必须等待 Phase 2 `audio_format_verdict=ready_for_export` 明确通过后再开放为产品承诺
5. `MP3` 和用户侧 `WAV` 都应从 retained lossless master 本地派生；`MP3` 反转出的 `WAV` 不能证明生产母版质量

### 7.2 SRT 标准

执行真源：

1. [Capability Entitlements](./specs/capability-entitlements.md)
2. [Billing and Usage Semantics](./specs/billing-usage-semantics.md)

`SRT` 不是附属功能，而是核心交付物之一。

平台级工作流支持标准 `SRT`，但用户是否可导出、是否计入套餐能力，以执行真源为准。即使当前阶段暂不开放用户侧导出，成功项目也必须尽量生成内部 alignment assets，避免后续字幕链路缺少事实基础。

时间轴格式必须严格使用逗号分隔毫秒：

```text
00:00:15,000 --> 00:00:17,500
```

点号分隔毫秒不符合 V1 输出标准。

### 7.3 局部修复

执行真源：

1. [Capability Entitlements](./specs/capability-entitlements.md)
2. [Billing and Usage Semantics](./specs/billing-usage-semantics.md)

用户必须能够对项目中的坏段落进行局部修复，而不是每次都整篇重跑。

平台支持局部修复工作流，但用户侧是否可触发、如何计费，以执行真源为准。

### 7.4 SRT 技术路径

`SRT` 的默认技术路线不应直接绑定某一个 TTS provider 的内部时间戳。

当前建议采用的默认思路是：

1. 先生成最终音频
2. 再以“原始文本 + 最终音频”做对齐
3. 对齐过程中可结合高精度转写或 forced alignment
4. 先产出内部 alignment assets
5. 最终导出标准 `SRT`

也就是说，`SRT` 的真相来源应优先以最终成品音频为准，而不是只依赖模型生成阶段的中间时间信息。

### 7.5 当前主测试方案

当前建议的 `SRT` 主测试方案为：

1. `Google STT`
2. `WhisperX / forced alignment` 路线

建议定位如下：

1. `Google STT`：商业级时间戳与转写候选
2. `WhisperX / forced alignment`：高精度对齐对照方案
3. provider timestamps：辅助锚点，不是唯一真相源

后续应根据以下维度做实际测试：

1. 英语首发质量表现
2. 长音频稳定性
3. 时间戳可信度
4. 与原始脚本匹配的鲁棒性
5. 局部重生成后的重新对齐效果

### 7.6 Provider 时间戳的角色

如果底层 provider 能返回 timestamps，这些信息可以作为：

1. 初始切分参考
2. 对齐校正参考
3. 加速信息来源

但不应作为唯一字幕真相来源。

## 8. V1 范围

当前 V1 边界分为两个层级：

### 8.1 第一执行门（必须先成立）

1. 营销首页
2. 英语优先工作台
3. 长文本粘贴输入
4. 文本型文档上传
5. 异步长文本生成流程
6. hosted-first 的英语 / 西班牙语稳定长文本音频输出
7. 足以支撑技术放行的基础英语 / 西班牙语音色选择
8. 项目持久化
9. 音频文件下载
10. 质量评测、稳定性记录与英语 / 西班牙语 timing readiness 证据

### 8.2 后续层（建立在第一执行门成立之后）

1. 免登录真实试用入口
2. 月付 / 年付切换式定价页
3. 标准 `SRT` 导出
4. 所有成功项目可用的分段试听
5. 付费计划可触发的局部重生成
6. 更强音色分层与 premium voice positioning
7. `1-2` 个独立工具页
8. 精选本地化分发着陆页
9. cron / 邮件 / 服务端提醒体系

## 9. 品牌与域名策略

### 9.1 品牌工作名

当前品牌工作名为 `Orpheus`。

品牌结构采用：

1. 主品牌名：`Orpheus`
2. 功能说明依赖副标题与首页文案解释
3. 具体副标题与首页主承诺以 [Distribution and Growth Surface](./specs/distribution-and-growth-surface.md) 为准

### 9.2 品牌层与营销层的分工

`YouTube` 应当被强烈使用在营销层，而不是绑定进主品牌骨架。

推荐做法是：

1. 主品牌层不直接写 `YouTube`
2. 首页 Hero、赛道页、案例页、音色包页强提 `YouTube creators`
3. 将“面向 YouTube 长视频创作者”的定位交给文案和页面结构承接

### 9.3 域名策略

域名策略当前结论如下：

1. 本产品走独立产品品牌路线
2. `straitnode.com` 不作为本产品主站域名
3. `straitnode.com` 仅作为母品牌、工作室入口或后续跳转入口使用
4. 本产品后续应单独选择与 `Orpheus` 品牌匹配的独立域名

## 10. 语言与音色策略

### 10.1 解耦原则

V1 必须把以下三层解耦：

1. `ui_locale`：界面语言
2. `project_language`：项目生成语言
3. `voice_pack`：音色包与赛道人设

界面语言不应该强绑定项目语言或音色语言，但 V1 的真实产品承诺必须收敛：

1. 工作台 UI 以英语优先
2. 第一技术门的音频输出、subtitle timing / alignment readiness 覆盖英语 + 西班牙语
3. 公共 landing pages 可选择性本地化，但不等于完整本地化工作台
4. 非英语完整工作台属于后续扩展层，不属于初始 end-user promise

### 10.2 首发界面语言

V1 的语言策略调整为：

1. 英语：工作台 UI、项目主流程与默认运营语言
2. 西班牙语：首个技术门必须证明输出、字幕 timing 与 alignment readiness
3. 其他本地化页面：允许进入分发 / 着陆页层，但不进入首发完整工作台承诺

也就是说，V1 不再把“9 语完整核心路径”作为首发产品承诺。

多语页当前更适合承担：

1. 首页或工具页的本地化搜索入口
2. 本地化价值主张
3. 后续转入英语优先工作台的增长漏斗

### 10.3 首发主推音色语言

V1 首发主推音色语言收敛为：

1. 英语
2. 西班牙语

其他语言音色保留为后续扩展方向，而不是首发必须同时兑现的完整能力。

### 10.4 音色包组织方式

默认音色系统不应只按“男声 / 女声 / 通用音色”组织，也不应只按单一赛道组织。

V1 起步时，音色系统在长期上仍保留多维结构，但实际执行范围收敛到一个主赛道簇：

1. 英语 + 西班牙语
2. `educational explainers` 主赛道
3. 人格 / 风格
4. 情绪
5. 库层级（启动 / 旗舰 / 私有）

这意味着：

1. V1 不是全赛道全展开，而是在一个赛道簇里给足选择
2. 免费层主要提供大启动库选择感
3. 付费层主要提供旗舰音色、一致性和完整工作流

### 10.4.1 YouTube 赛道的正式定义

`YouTube 赛道` 在本产品中仍应基于 faceless YouTube 生态里的真实讨论进行抽象，但 V1 实际激活的范围不再铺成多个独立主赛道，而是先收敛成一个更贴近真实用户心智的赛道簇。

当前建议采用三级模型：

1. 一级：内容母类
2. 二级：创作格式
3. 三级：热点标签

这样做的原因是：

1. 赛道来源更贴近市场真实讨论
2. 不会因为短期热点变化而推翻整个体系
3. 更适合同时服务音色系统、SEO 结构、案例页和营销页

### 10.4.2 一级：内容母类

V1 当前实际启用的一级内容母类建议如下：

| 一级内容母类 | 中文说明 | 选择原因 |
|---|---|---|
| `Educational Explainers` | 以脚本重、旁白驱动的知识解释承载长视频 | 最贴近 founder 现有工作流，也最贴近“长文本稳定出旁白”这个真钱 bottleneck |

V1 之所以先收在这一类，是因为：

1. 这类内容的收入与发布频率、时长和旁白链路高度耦合
2. 音频通常比画面更决定能不能稳定发片
3. 它天然依赖长文本旁白和后期配合

### 10.4.3 二级：创作格式

在该一级内容母类之下，V1 优先激活以下创作格式：

| 二级创作格式 | 中文说明 | 更适合的内容类型 |
|---|---|---|
| `Narrated explainers` | 旁白讲清概念 | 一般知识解说、脚本重 explainers |
| `Concept breakdowns` | 抽象概念拆解 | 心理学、学习法、知识点解析 |
| `Lesson-style walkthroughs` | 教学式分步讲解 | 语言学习、语言现象、教育内容 |

这一层的重要性在于：

1. faceless YouTube 的竞争不只取决于题材，还取决于可重复的叙事结构
2. 配音节奏、字幕切分和人格感都更受格式影响

### 10.4.4 三级：热点标签

三级用于吸收变化更快、但仍与这个主赛道簇高度相邻的传播标签。

当前建议作为热点标签池的方向如下：

| 三级热点标签 | 作用 | 典型挂载位置 |
|---|---|---|
| `psychology` | 强内容意图标签 | 心理学音色、人设页、案例页 |
| `language learning` | 明确教育标签 | 教学类入口、工具页 |
| `language phenomena` | 更窄的 explainers 标签 | 语言现象、表达分析、旁白包装 |
| `concept breakdown` | 概念拆解标签 | 知识解说、课程式讲解 |
| `study methods` | 学习策略标签 | 教育类案例与工作流入口 |

这层标签的特点是：

1. 适合传播
2. 适合把首发赛道做得更具体
3. 适合和人格/音色包装联动
4. 不应该反过来把 V1 重新扩成多个独立主赛道

### 10.4.5 首发优先赛道映射表

V1 当前建议采用如下映射关系：

| 一级内容母类 | 二级创作格式 | 三级热点标签示例 | 当前首批入口 |
|---|---|---|---|
| `Educational Explainers` | `Narrated explainers` | `concept breakdown` / `psychology` | `knowledge explainer narration` |
| `Educational Explainers` | `Concept breakdowns` | `psychology` / `study methods` | `psychology explainer narration` |
| `Educational Explainers` | `Lesson-style walkthroughs` | `language learning` / `language phenomena` | `language explainer narration` |

### 10.4.6 赛道动态维护规则

为支持未来新增、删减与热点变化，赛道模型应按以下规则维护：

1. V1 只激活一个主赛道簇，不为“看起来更全”而扩多个一级母类。
2. 二级创作格式优先复用，不轻易为单一热点新造格式。
3. 三级热点标签允许快速新增、合并、下线。
4. 首批入口名称可以调整，但必须能映射回这一套主赛道簇。
5. 音色、SEO 页面、工具页、案例页、营销页都应复用同一套赛道映射，不各自维护独立命名。

### 10.5 首批旗舰音色结构

V1 首批旗舰音色当前建议为：

1. 主推语言：英语 + 西班牙语
2. 首批只在稳定长文本音频路径成立后再做 `3-5` 个旗舰音色
3. 旗舰音色用于体现频道人格、一致性和付费层价值，而不是第一技术放行条件

首批入口方向优先为：

1. `knowledge explainer narration`
2. `psychology explainer narration`
3. `language explainer narration`

这样做的理由是：

1. 最贴 founder 当前已验证的首发目标场景
2. 更容易把“稳定长文本旁白”与后续 premium voice layer 分开验证
3. 质量评测和版本锁定成本可控
4. 能在 hosted path 稳定之后，再叠加清晰分层

这里需要明确：

1. `3-5` 个旗舰音色不等于 V1 全部音色选择
2. 免费层主要靠启动库提供大选择感
3. 付费层主要靠旗舰库提供人格感、一致性和长期可用性

### 10.6 人格系统

V1 人格系统采用“双层表达”：

1. 主标签：通俗、易理解、适合创作者选择的人格标签
2. 副标签：热点人格映射，例如 MBTI 类型

这意味着：

1. 对产品主界面和选择流程，优先展示通俗人格标签
2. 对传播与热点标签，可挂接 `INTJ` 等人格映射
3. 后续可以快速蹭热点，但不会让系统整体沦为人格测试产品

当前首批人格方向应偏向：

1. 清晰讲解型
2. 冷静概念拆解型
3. 温和教学型
4. 可信知识向导型

### 10.7 音色元数据模型

执行真源：

1. [Voice Metadata Schema](./specs/voice-metadata-schema.md)

本节只保留逻辑字段摘要，不定义字段的物理落位、typed tag 规则或 canonical owner。

为保证音色系统、SEO 页面、推荐逻辑和后续扩展保持一致，V1 的每个音色实体都应至少具备以下元数据字段：

| 字段 | 说明 | 当前用途 |
|---|---|---|
| `voice_id` | 音色唯一标识 | 数据关联、页面路由、推荐 |
| `library_tier` | 启动 / 旗舰 / 私有 | 控制权限、成本与默认展示 |
| `source_type` | 开源底座 / 平台设计 / 平台克隆 / 用户私有克隆 | 区分建库来源与合规逻辑 |
| `provider` | `Kokoro` / `Inworld` / future provider | 统计、质量追踪、成本核算 |
| `primary_language` | 主语言 | 语言页映射、推荐 |
| `supported_languages` | 可用语言集合 | 跨语言推荐与限制 |
| `primary_niche` | 一级内容母类 | 赛道页映射 |
| `content_formats` | 二级创作格式集合 | 推荐与筛选 |
| `hot_tags` | 三级热点标签集合 | SEO、传播、标签页 |
| `persona_primary` | 通俗人格主标签 | 音色卡片主展示 |
| `persona_secondary` | 热点人格映射，如 MBTI | 副标签、流量入口 |
| `emotion_profile` | 情绪/节奏特征 | 生成与推荐 |
| `commercial_status` | 是否可商用 | 上线与权限控制 |
| `rights_proof` | 权利来源证明 | 平台旗舰库和用户私有库合规 |
| `visibility` | public / private / featured | 页面曝光与权限控制 |

### 10.8 页面生成映射规则

V1 的语言页、赛道页和音色页不应手工分别维护，而应从统一元数据模型派生。

推荐映射如下：

| 页面类型 | 主要依赖字段 | 页面目标 |
|---|---|---|
| 语言页 | `primary_language`、`supported_languages`、`primary_niche` | 承接 Geo SEO，给出该语言下的 faceless YouTube 创作入口 |
| 赛道页 | `primary_niche`、`content_formats`、`hot_tags` | 承接 YouTube 赛道搜索流量，展示该赛道下的推荐音色与案例 |
| 音色页 | `voice_id`、`persona_primary`、`persona_secondary`、`emotion_profile` | 承接具体音色流量，展示试听、人设、适用赛道和语言 |

### 10.9 推荐逻辑原则

首页、工作台和音色页的推荐逻辑应共用同一套元数据映射，不应各自维护不同分类体系。

当前建议：

1. 首页推荐以 `language + primary_niche` 为主
2. 赛道页推荐以 `primary_niche + content_formats` 为主
3. 音色页推荐以 `persona_primary + hot_tags + emotion_profile` 为主
4. 工作台推荐以 `project_language + selected_niche + user_history` 为主

## 11. Provider Abstraction Layer

### 11.1 定位

V1 不能把产品绑定死在单一 provider 上。

当前虽然推荐优先评估 `Inworld TTS 1.5 Max`，但架构层必须从一开始支持未来接入：

1. 其他托管 API
2. 开源模型
3. 内部降本路由

### 11.2 抽象目标

Provider 抽象层的目标不是给用户暴露“模型选择器”，而是：

1. 让平台内部可以切换 provider
2. 让平台内部可以按成本和能力做路由
3. 让产品层不依赖单一第三方 API 的返回格式

### 11.3 建议抽象类型

当前建议至少抽象为以下四类：

1. `tts_provider`
2. `stt_or_alignment_provider`
3. `voice_clone_provider`
4. `storage_provider`

支付层也应纳入同类抽象中：

5. `billing_provider`

### 11.4 能力矩阵

每个 provider 后续都应维护能力矩阵，至少包含：

1. 支持语言
2. 情绪表达能力
3. 时间戳能力
4. 克隆方式
5. 单价 / 计费方式
6. 延迟与稳定性
7. 是否适合免费层 / 付费层 / 后台任务

### 11.4.4 支付 provider 原则

支付层不应被模板默认方案绑死。

当前建议：

1. 支付层也做 provider abstraction
2. 当前主体与收款现实条件下，默认优先采用 `Paddle`
3. `Stripe` 作为未来可扩展路径，而不是 V1 前提

这样做的原因是：

1. 中国大陆主体对 `Stripe` 的可行性限制更大
2. `Paddle` 对当前阶段更现实
3. 支付层后续仍可能因为主体变化、国家策略或业务扩展而切换

### 11.4.1 当前首版能力矩阵

当前建议至少对以下候选维护统一比较：

| Provider / 路线 | 当前定位 | 适合承担 | 当前不建议承担 | 主要原因 |
|---|---|---|---|---|
| `Inworld TTS 1.5 Max` | 第一放行主候选 | hosted-first 长文本稳定性基线、主渲染、高质量体验 | 免费层大规模无控开放 | 质量高、能力完整，最适合作为首轮 feasibility 基线，但需要控制成本 |
| `Cartesia` | 托管备选 | feasibility 备选、未来路由扩展、成本对冲 | 当前主路线首选 | 能力强，但当前综合优先级仍在 Inworld 之后 |
| `Google STT` | 商业级对齐 / 转写候选 | `SRT` 主测试方案、长音频时间戳 | 直接替代完整字幕后处理链 | 稳定、商用友好，但仍需要脚本匹配与后处理 |
| `WhisperX / forced alignment` | 高精度对照方案 | `SRT` 对照测试、alignment fallback | V1 唯一字幕真相来源 | 适合高精度对齐，但仍需验证四语与长音频稳定性 |
| `Kokoro` | 启动库 / 降本候选 | 低成本实验、后续兜底音色 | 第一放行主渲染 | 可商用、成本低，但当前不是首轮稳定性主基线 |
| `IndexTTS2` | 预研与候选资产 | 内部评测、降本与自托管预研 | 第一放行生产默认引擎 | 情绪表现强，但商业授权与上线稳定性仍是门槛 |

### 11.4.2 按能力拆分的建议

如果按能力维度拆分，当前建议如下：

| 能力类型 | 当前主选 | 当前备选 | 预研方向 |
|---|---|---|---|
| `tts_provider` | `Inworld TTS 1.5 Max` | `Cartesia` | `IndexTTS2` / 其他开源自托管 |
| `stt_or_alignment_provider` | `Google STT` | `WhisperX / forced alignment` | 更高精度对齐链路 |
| `voice_clone_provider` | `Inworld` | 未来可扩展其他托管方案 | 自托管克隆预研 |
| `storage_provider` | `Cloudflare R2` | 无需在 V1 再拆第二选择 | 可后续补对象存储抽象 |

### 11.4.3 路由原则

后续真正实现时，provider 路由应满足：

1. 用户前台无感知
2. 平台内部可切换
3. 免费层与付费层可使用不同路由策略，但不必向用户暴露
4. 不同能力链路可独立切换，而不是一换全换

### 11.5 抽象边界

产品层后续应只依赖平台自己的统一能力，而不直接依赖第三方差异字段。

也就是说：

1. 页面层只关心“生成音频”
2. 业务层只关心“生成结果、状态、用量、字幕”
3. 具体 provider 差异由 `service / adapter` 吞掉

## 12. Content Source of Truth

执行真源：

1. [Content Source Governance](./specs/content-source-governance.md)
2. [Voice Metadata Schema](./specs/voice-metadata-schema.md)

本节只保留内容真源目标和逻辑实体摘要，不重复 owner、publish flow、draft/published 或 structured field ownership 规则。

### 12.1 定位

内容系统不应拆成：

1. 营销页一套文案
2. 帮助页一套文案
3. Blog 一套文案
4. Geo 页面一套文案
5. 音色页和赛道页又各自维护一套文案

而应尽量由一个统一的内容真源驱动。

### 12.2 目标

内容真源的目标是：

1. 一次定义，多处生成
2. 多语言联动
3. SEO 与产品文案保持一致
4. 音色、赛道、FAQ、案例之间互相映射

### 12.3 建议内容实体

当前建议至少抽象以下内容实体：

1. `positioning`
2. `languages`
3. `youtube_niches`
4. `personas`
5. `voices`
6. `plans`
7. `faq_items`
8. `case_studies`
9. `legal_snippets`

### 12.4 内容真源驱动的页面

同一套内容模型后续至少应能驱动：

1. 首页
2. 定价页
3. FAQ / Help
4. Blog / Programmatic SEO
5. 语言页
6. 赛道页
7. 音色页

### 12.5 更新原则

后续如果：

1. 调整某个赛道定义
2. 调整某个人格标签
3. 调整某个音色定位
4. 调整某个套餐权益

应优先修改内容真源，而不是逐页手工维护。

### 12.6 建议内容真源数据结构

以下表格是逻辑内容实体摘要。发布流、owner/approval 和 copy vs reference 规则以执行真源为准；`voices` 的结构化字段仍以 voice metadata schema 为准。

为了让内容系统真正成为“真源”，而不是松散文案集合，建议至少把以下内容实体结构化维护：

| 实体 | 作用 | 主要下游页面 |
|---|---|---|
| `positioning` | 核心定位、hero 口号、副标题、核心卖点 | 首页、定价页、Geo 页面 |
| `languages` | 语言定义、locale、地区、默认案例 | 语言页、hreflang、SEO metadata |
| `youtube_niches` | 赛道定义、格式、热点标签 | 赛道页、推荐逻辑、SEO |
| `personas` | 主人格标签、热点人格映射、情绪特征 | 音色页、推荐模块、营销文案 |
| `voices` | 以 `voice_id` 为键的本地化音色文案、试听说明和入口内容 | 音色页、工作台选择器、推荐卡片 |
| `plans` | 以 `plan_id` 为键的套餐文案与升级说明；权益真源不在本表中定义 | 定价页、账单页、FAQ |
| `faq_items` | 常见问题与答案 | FAQ、帮助页、SEO 页面 |
| `case_studies` | 赛道案例、语言案例、效果示例 | 语言页、赛道页、首页模块 |
| `legal_snippets` | 合规短文案、同意文本、权限提示 | 上传页、克隆页、注册与支付页 |

### 12.7 内容派生与分发原则

同一套内容真源后续至少应支持以下派生关系：

1. 首页、定价页、帮助页共用同一套定位与套餐定义
2. 语言页从 `languages + case_studies + voices + youtube_niches` 派生
3. 赛道页从 `youtube_niches + voices + personas + case_studies` 派生
4. 音色页从 `voices + personas + languages + legal_snippets` 派生
5. Blog / Programmatic SEO 页面优先复用已有内容实体，而不是单独发明命名体系

### 12.8 组件化实现原则

后续基于 `MkSaaS + Next.js` 实现时，前端应尽量组件化，而不是：

1. 每种语言写一套独立页面
2. 每个赛道页手写一个版本
3. 每个音色页复制一个模板再改文案

建议至少分为两层：

1. **页面模板组件**
   - 语言页模板
   - 赛道页模板
   - 音色页模板
   - 定价页模板
2. **内容区块组件**
   - Hero
   - Case study block
   - Voice cards
   - Niche cards
   - Persona chips
   - FAQ block

### 12.9 组件化带来的收益

组件化与内容真源结合后，能直接带来：

1. 多语言维护成本更低
2. Geo SEO 页面更容易程序化生成
3. 赛道和音色扩展不需要重写页面结构
4. 定位、权益、赛道变更时可以一处修改，多处联动

## 13. 仍需继续讨论 / 细化的关键议题

以下内容虽然已经有方向，但仍需要在后续 PRD 轮次进一步细化：

1. 平台旗舰音色的首批命名与资产清单
2. 真实测试数据驱动的 provider scorecard
3. 真实成本验证后的分钟额度回调机制
4. 平台建库的 QA 验收标准
5. 运营后台的最终页面拆分粒度

## 14. 模板与上站策略

执行真源：

1. [MkSaaS Boundary Contract](./specs/mksaas-boundary-contract.md)

本节只保留模板选型摘要，不定义模板是否可以拥有业务语义。

### 11.1 首发模板选择

首发模板当前默认锁定为 `MkSaaS`。

选型理由：

1. 兼容 `Next.js + Vercel`
2. 自带较成熟的 `i18n` 支撑
3. 更适合承接订阅、权限、后台任务和多语增长页
4. 更贴合当前“英语优先工作台 + 多语 SEO / 分发面 + 长任务工作流”的产品形态
5. 相比高价商业模板，当前性价比更高

### 11.2 官方免费 fallback

如果当前阶段无法使用 `MkSaaS`，官方免费保底方案为：

1. `nextjs/saas-starter`
2. 结合 Next.js 官方 `i18n` 方案自行补齐多语言能力

该方案的优点是：

1. 官方来源清晰
2. 免费
3. 兼容 `Next.js + Vercel`

缺点是：

1. 需要自行补更多多语言与 SaaS 集成工作
2. 相比 `MkSaaS` 会多出更多站点层拼装成本

### 11.3 授权要求

`MkSaaS` 必须通过官方正规授权购买与使用。

当前不建议采用以下方式：

1. 购买他人转售的源码包
2. 使用来源不清晰的下载副本
3. 在没有授权链确认的情况下直接作为商用底座

原因是这会带来明显的授权和后续商用风险。

## 15. 数据库与租户策略

执行真源：

1. [Guest Trial Identity](./specs/guest-trial-identity.md)
2. [Project and Run Lifecycle](./specs/project-run-lifecycle.md)
3. [Voice Metadata Schema](./specs/voice-metadata-schema.md)
4. [Billing and Usage Semantics](./specs/billing-usage-semantics.md)

本节只保留逻辑数据模型摘要，不重复 guest 归并、status enum、field placement 或 billing ledger 细则。

### 12.1 租户模型

V1 不做团队级多租户。

当前租户模型明确为：

1. 用户级隔离
2. 注册 / 登录
3. 用户自己的项目
4. 用户自己的私有音色库
5. 用户自己的额度与订阅

这意味着 V1 的核心单位是 `user`，而不是 `workspace` 或 `organization`。

### 12.2 数据库策略

当前数据库策略建议为：

1. 数据库引擎使用 `PostgreSQL`
2. 数据库托管默认优先采用 `Neon`
3. 结合模板默认能力使用 `Drizzle ORM`
4. 按单用户 SaaS 的方式建模

这样选择的原因是：

1. 与 `MkSaaS` 的推荐路线更一致
2. 更适合 `Next.js + serverless` 的开发体验
3. 更适合当前产品的启动成本与后续扩展平衡

V1 核心表的设计应至少覆盖：

1. `users`
2. `subscriptions`
3. `projects`
4. `project_runs`
5. `voices`
6. `voice_assets`
7. `voice_tags`
8. `user_voice_clones`
9. `usage_ledger`
10. `billing_events`

该列表是逻辑实体清单，不等于最终物理字段落位。guest trial 身份模型、voice metadata 的字段归属和 usage/billing 记账语义，以执行真源为准。

### 12.3 未来扩展预留

虽然 V1 不做团队级多租户，但数据库设计应预留未来扩展空间。

推荐做法是：

1. 预留 `account_id` 或 `workspace_id` 这类字段位
2. 当前阶段可默认等于用户自身
3. 未来如需扩展团队空间，再在此基础上升级

这样做的目的是：

1. 不在 V1 过度设计
2. 也不在未来扩展时彻底推翻模型

### 12.4 数据库实体关系

V1 数据模型应围绕以下核心实体展开：

| 实体 | 说明 | 主要关联 |
|---|---|---|
| `users` | 用户基础信息与身份 | 关联订阅、项目、私有音色、用量 |
| `subscriptions` | 订阅与套餐状态 | 关联用户、额度策略、账单事件 |
| `projects` | 用户级长脚本项目 | 关联运行记录、输出资产、语言、音色选择 |
| `project_runs` | 单次生成或重生成记录 | 关联项目、引擎、耗时、状态、输出 |
| `voices` | 平台公共音色主实体 | 关联音色资产、标签、赛道、人设、权限 |
| `voice_assets` | 音色底层素材与外部来源 | 关联 provider、样本、权利证明、商业状态 |
| `user_voice_clones` | 用户私有克隆音色 | 关联用户、上传样本、状态、可用语言 |
| `usage_ledger` | 用量账本 | 关联用户、项目、运行、计费口径 |
| `billing_events` | 账单与支付事件 | 关联用户、订阅、发票、支付系统 |

### 12.5 关键关系说明

当前建议的关键关系如下：

1. 一个 `user` 可以有多个 `projects`
2. 一个 `project` 可以有多个 `project_runs`
3. 一个 `project_run` 可以对应一次完整生成或一次局部重生成
4. 一个平台 `voice` 可以挂接多个 `voice_assets`
5. 一个 `user` 可以拥有多个 `user_voice_clones`
6. 每次生成与重生成都应写入 `usage_ledger`
7. 订阅变更、续费、失败支付等都应写入 `billing_events`

### 12.6 关键表职责

数据库设计必须服务以下目标，而不是只为“把数据存进去”：

1. `projects`
   - 承载用户项目本身
   - 保存原始脚本、项目语言、选定音色与工作流状态
2. `project_runs`
   - 承载生成历史
   - 区分首次生成、局部重生成、失败重试
   - 为后续 `SRT` 对齐与审计保留轨迹
3. `voices`
   - 承载平台可见音色
   - 统一音色标签、赛道、人设、权限与页面展示数据
4. `voice_assets`
   - 承载底层来源信息
   - 用于区分 `Kokoro`、`Inworld Voice Design`、平台克隆、用户上传来源
5. `user_voice_clones`
   - 承载用户私有克隆
   - 与平台公共库严格隔离
6. `usage_ledger`
   - 统一分钟数、点数、重生成消耗和免费试用消耗
   - 后续定价调整时应优先依赖此表校正
7. `billing_events`
   - 统一记录支付、订阅变化、失败通知与补偿动作

## 16. 运营后台与管理视图（初版）

执行真源：

1. [Project and Run Lifecycle](./specs/project-run-lifecycle.md)
2. [Billing and Usage Semantics](./specs/billing-usage-semantics.md)
3. [QualityOps and Automation](./specs/quality-ops-and-automation.md)

本节只保留后台功能摘要，不重复质量 scorecard、动态看板定义或自动化分类规则。

### 16.1 定位

V1 虽然是单用户 SaaS，但运营后台仍然必须存在。

后台的目标不是做成庞大 ERP，而是至少让团队能：

1. 看见核心业务状态
2. 处理音色与克隆资产
3. 追踪生成任务与失败原因
4. 控制风险与处理投诉
5. 核对订阅、用量与计费

### 16.2 核心后台视图

当前建议初版至少包含以下后台视图：

1. 用户视图
2. 订阅与账单视图
3. 项目与运行视图
4. 平台音色库视图
5. 用户私有克隆视图
6. 用量与额度视图
7. 风控与举报视图
8. 质量评测与动态看板视图
9. 自动化任务与通知视图

### 16.3 用户视图

用户视图至少要回答：

1. 这个用户是谁
2. 当前处于什么套餐
3. 最近生成了什么项目
4. 是否触发过风控
5. 是否有被禁用的私有音色

### 16.4 订阅与账单视图

订阅与账单视图至少要覆盖：

1. 当前套餐
2. 生效时间
3. 续费状态
4. 失败支付
5. 补偿或人工调整记录

### 16.5 项目与运行视图

项目与运行视图至少要让团队看见：

1. 某个项目当前处于什么状态
2. 某次 `project_run` 用了哪个 provider
3. 失败发生在哪一步
4. 是否属于首次生成、局部重生成或重试
5. 输出资产与 `SRT` 是否已生成

### 16.6 平台音色库视图

平台音色库视图至少要覆盖：

1. 启动库 / 旗舰库分类
2. 音色语言
3. 赛道标签
4. 人格标签
5. 商用状态
6. 是否 featured
7. 当前开放到哪个套餐

### 16.7 用户私有克隆视图

用户私有克隆视图至少要支持：

1. 查看上传状态
2. 查看 consent / rights 声明
3. 查看处理状态
4. 禁用 / 恢复
5. 删除与撤销记录

### 16.8 用量与额度视图

用量与额度视图至少要回答：

1. 用户本月用了多少分钟
2. 哪些是首次生成消耗
3. 哪些是局部重生成消耗
4. 免费试用消耗占比
5. 是否接近风控阈值

### 16.9 风控与举报视图

风控与举报视图至少要覆盖：

1. 可疑试用行为
2. 高频生成 / 重生成
3. 样本上传异常
4. 举报记录
5. 下架 / 限制 / 恢复状态

### 16.10 初版原则

当前后台规划原则是：

1. 先保证关键视图存在
2. 不要求一开始做复杂 BI
3. 每个后台视图都应直接服务产品运营或风险处理
4. 后续可继续拆分为更细的管理面板
5. 质量评测、长音频稳定性、`SRT` 效果和 provider 表现必须进入可持续观测的动态面板，而不是只存在离线测试记录里。

## 17. Discoverability Layer（Agent-ready + Geo SEO）

执行真源：

1. [Distribution and Growth Surface](./specs/distribution-and-growth-surface.md)
2. [Content Source Governance](./specs/content-source-governance.md)

本节只保留分发与发现层摘要，不重复首页承诺、工具页矩阵或英语产品 / 多语 SEO 页边界规则。

### 13.1 定位

`Agent-ready` 和 `Geo SEO` 不是后续补丁，但它们在当前阶段的投入强度仍应服从第一技术放行门。

本产品不只是一个给人看的站点，也需要从第一天开始具备：

1. 对搜索引擎友好
2. 对语言与地区发现友好
3. 对 agent 与自动化系统可发现、可理解、可扩展

### 13.2 Agent-ready 核心项

V1 至少应考虑以下方向：

1. `robots.txt`
2. sitemap
3. 结构化 metadata
4. 机器可读的页面结构
5. 后续 API / agent 发现机制预留

当前阶段不要求把所有 agent 协议一次做完，但要求站点结构天然支持后续扩展。

### 13.3 Geo SEO 核心项

V1 的 Geo SEO 不再等同于“9 语完整产品”，而是要把多语更多当成分发资产来做。

当前阶段的第一执行门至少应包含：

1. 英语优先产品页与工作台入口
2. 基础结构化 metadata
3. 机器可读页面结构
4. 英语 / 西班牙语 output 与 timing readiness 的可说明边界

后续层可扩展为：

1. 精选本地化着陆页
2. `hreflang`
3. locale 级 metadata
4. 与独立工具页联动的 SEO 入口

### 13.4 页面结构主轴

V1 的站点结构在长期上仍可围绕四类页面展开，但第一执行门优先收敛为：

1. 英语优先产品页
2. 工作台页
3. 项目详情页

后续层再扩展为：

1. 独立工具页
2. 精选本地化着陆页
3. 音色 / 赛道说明页

其中的主轴为：

1. 先做英语优先工作台与 hosted feasibility 对应的主叙事
2. 再做工具页和精选本地化分发入口
3. 最后再扩展更多多语增长页

### 13.5 页面内容策略

精选本地化分发页不应被当成“完整工作台已经本地化”的承诺，而应采用：

1. 同一产品框架
2. 不同语言下的本地化案例
3. 不同语言下的音色推荐
4. 不同语言下的 faceless YouTube 赛道文案差异

也就是说：

1. 产品核心价值主张保持一致
2. 表达方式、案例、赛道入口和音色推荐要按语言本地化
3. 工作台 UI 默认仍以英语优先，不因为分发页本地化而自动承诺对应语言的完整工作流

## 18. 安全架构原则（密钥防火墙）

### 18.1 定位

本产品从第一天开始就必须按“密钥防火墙”原则设计，而不是等接入更多第三方服务后再补救。

这条原则的核心是：

1. 所有敏感信息只存在于服务端
2. 前端只调用本产品自己的接口
3. 所有第三方 API 都通过服务端分层代理

### 18.2 前后端调用边界

后续实现阶段必须遵守以下链路：

1. 浏览器 / 前端页面
2. 本项目自己的 `/api/**` 或 Server Action
3. 服务端 `service / adapter`
4. 第三方 API

前端禁止：

1. 直接调用第三方 TTS API
2. 直接调用第三方 STT API
3. 直接调用第三方克隆、支付、邮件、验证码、数据库相关接口

### 18.3 敏感信息管理

以下信息一律只能存在于服务端环境变量中：

1. TTS / STT API Key
2. 克隆服务 Token
3. 数据库连接串
4. 支付与 webhook secret
5. 私钥、service account 凭据
6. Cloudflare Turnstile secret
7. 未来的 OAuth client secret

要求：

1. 禁止使用 `NEXT_PUBLIC_` 暴露任何敏感值
2. 所有敏感环境变量统一通过服务端环境读取层管理
3. `.env`、`.env.local`、`.env.production`、`.env.development` 等必须被 `.gitignore` 忽略

### 18.4 服务端分层

所有第三方调用逻辑都必须封装在服务端分层中，不允许散落在页面、组件和 hooks 里。

推荐分层如下：

1. `Route Handler / Server Action`
2. `service`
3. `adapter`

职责分工：

1. `Route Handler / Server Action`：接收前端请求、校验参数、控制权限、过滤返回字段
2. `service`：承接业务逻辑，例如生成音频、生成 `SRT`、克隆音色、计算额度消耗
3. `adapter`：封装对具体第三方 API 的调用

### 18.5 错误处理与日志脱敏

所有服务端日志和错误处理必须脱敏。

不得打印：

1. 完整 API Key
2. Token / Authorization header
3. Cookie
4. 数据库连接串
5. 第三方完整原始报错 body

返回给前端的错误信息必须满足：

1. 只返回最小必要信息
2. 不直接透传第三方原始报错
3. 方便用户理解，但不泄露底层实现细节

### 18.6 与 MkSaaS 的融合方式

执行真源：

1. [MkSaaS Boundary Contract](./specs/mksaas-boundary-contract.md)

`MkSaaS` 只能作为以下内容的底座：

1. 认证
2. 支付
3. 数据库骨架
4. 营销页与后台壳
5. 多语言基础设施

但它不改变“密钥防火墙”的边界。

也就是说：

1. 即使模板自带某些集成能力，也不能让前端直接接触第三方密钥
2. 模板里的页面、hooks 和前端组件不得直接初始化第三方敏感 SDK
3. 所有真正的第三方服务接入仍必须回到本产品自己的服务端层

### 18.7 当前重点保护对象

结合本产品现阶段架构，以下能力必须优先遵守密钥防火墙：

1. `Inworld` / 未来 TTS provider
2. `Google STT` / WhisperX 对齐链路
3. Cloudflare Turnstile
4. 支付系统与 webhook
5. 用户上传与音色克隆
6. 数据库与对象存储

### 18.8 实现阶段的验收方向

进入工程实现阶段后，安全验收至少要检查：

1. 浏览器 Network 面板中是否只出现自家 `/api/**`
2. 前端代码中是否还存在第三方直连
3. 是否存在敏感的 `NEXT_PUBLIC_*`
4. 构建产物中是否不含敏感字符串
5. 服务端日志和报错是否已脱敏
6. `.env*` 是否被正确忽略

## 19. 定价、权益与成本策略

执行真源：

1. [Pricing, Packaging, and Unit Economics](./specs/pricing-packaging-and-unit-economics.md)
2. [Capability Entitlements](./specs/capability-entitlements.md)
3. [Billing and Usage Semantics](./specs/billing-usage-semantics.md)
4. [Guest Trial Identity](./specs/guest-trial-identity.md)

本节只保留商业与产品摘要，不重复计划矩阵、guest 归并或计费规则表。

### 19.1 档位结构

V1 采用三档结构：

1. `Free`
2. `Pro`
3. `Ultimate`

档位设计原则：

1. 中间档应成为默认主推购买档
2. 第三档不能只是额度翻倍
3. 第三档必须同时体现“更多额度 + 更深工作流权益 + 更强音色能力”

### 19.2 定价展示结构

定价页属于 hosted feasibility 证明之后的后续层，不是第一技术放行条件。

当前工作版价格锚点调整为：

1. `Free / Pro / Ultimate = $0 / $20 / $60`
2. `Pro` 是默认主推档，也是第一条正式付费验证通路
3. `Ultimate` 不是简单翻倍档，而是更高分钟数、更高优先级和更深受控能力
4. 年付默认先按 `20%` 左右折扣设计，不采用过于激进的“半价年付”
5. 当前锚点属于 working packaging truth，不等于已经可以公开上线的 pricing page
6. `Pro = $20 / 90 分钟` 只有在 provider-cost guardrail 通过时才可继续作为对外候选包装

公开价格、年付折扣、included minutes、provider-cost guardrail 与 unit-economics review 统一以 `docs/prd/specs/pricing-packaging-and-unit-economics.md` 为准。

### 19.3 免费层策略

免费层不是无限免费，而是低门槛体验版。

当前工作版结论如下：

1. 免登录真实试用属于后续层，不应先于 hosted feasibility 证明开放
2. 免费层首先负责让用户理解“稳定长文本出音频 + subtitle-ready timing”的价值，而不是先强调大量音色选择
3. 免费层分钟数当前先按 `10 分钟/月` 的工作版假设保留，但不得在真实成本验证前公开承诺
4. 免费层若公开，默认仍应严控单项目长度与风险边界，不复制 Raphael 式“无限免费长音频”的承诺
5. 免费层或 guest trial 可在后续提供短试用、预览或短音频 takeaway，但不能承诺下载完整长文生产音频
6. 一旦免登录试用、免费层分钟数、下载权益或单项目长度发生变化，必须同步回查 pricing / billing / distribution 三个真源

### 19.4 用户看到的计量单位

前台定价页和营销页优先使用“音频分钟数 / 小时数”来描述价值。

后台仍然保留：

1. 点数
2. 成本模型
3. 并发与风控
4. 重生成消耗
5. provider blend 与 fallback 成本

也就是说：

1. 对用户：讲分钟、单项目长度和 workflow 差异
2. 对内部：讲点数、成本、fallback mix 和毛利
3. 对 pricing review：讲 `included_seconds`、`cost_per_completed_audio_minute` 和 `gross_margin_floor`

关于这三层如何统一核算、何时必须更新，统一以 `docs/prd/specs/pricing-packaging-and-unit-economics.md` 为准。

### 19.5 三层对照总表

后续所有价格和权益调整，都要同时映射三层：

1. 用户看到的价格与权益
2. 产品层的规则与限制
3. 内部成本与风控假设

具体的分钟额度、价格锚点和更新触发条件以 `pricing-packaging-and-unit-economics.md` 为准；具体 capability matrix 以 `capability-entitlements.md` 为准。

这里保留的高层原则只有：

1. `Free` 若开放，负责稳定长文本能力的入门体验，不负责完整生产。
2. `Pro` 是默认主推档，也是第一条正式付费验证通路，必须承接首个稳定长文本商业包络。
3. `Ultimate` 负责更高强度产出、更高优先级和更深受控能力。
4. 不允许 pricing、entitlement 和 billing 各自发明自己的分钟数或边界语义。

### 19.6 当前保守版额度建议

在完成真实成本核算、provider mix 验证和稳定包络确认之前，PRD 当前采用工作版额度建议：

1. `Free`：`10 分钟/月`
2. `Pro`：`90 分钟/月`
3. `Ultimate`：`240 分钟/月`

采用这组工作版建议的原因：

1. 音频产品的边际成本与长任务运行成本显著高于生图产品
2. `Pro` 需要在 `30 分钟` 单项目包络下，至少支持约 `3` 次代表性长项目
3. `Ultimate` 需要体现“更多额度 + 更高优先级 + 更深能力”，而不是只比 `Pro` 多一点
4. 真实成本不仅包含主 TTS，还包含 alignment、重试、stitching、存储、交付与支持性开销
5. 在单位经济模型没跑稳前，不应为了表面增长把分钟数开得像生图产品一样松

同时需要明确：

1. 这组分钟数不是公开承诺，而是当前工作版 packaging anchor
2. 如果稳定单项目包络、provider 价格、fallback 占比或完成音频分钟成本出现明显变化，必须立即重算
3. 重算动作由 `pricing-packaging-and-unit-economics.md` 的 review 机制触发，而不是靠临时口头判断

### 19.7 对外展示版权益表（首版）

以下表述只保留营销摘要，完整 capability matrix 与分钟额度以执行真源为准：

1. `Free`：若开放，强调真实体验、短试用或预览价值，不承诺下载完整长文生产音频或完整生产工作流。
2. `Pro`：强调第一条可付费的稳定长文本生产路径，包括更长单项目时长、稳定音频结果和完整 workflow layer。
3. `Ultimate`：强调更高强度产出、更高优先级，以及更深的受控能力。

私有克隆在当前 V1 中属于受控能力，不能在对外表达里写成默认普遍开放。公开价格、分钟数和年付优惠统一由 `pricing-packaging-and-unit-economics.md` 管理。

### 19.8 对外表达原则

后续定价页和营销页在表达套餐时，应遵守以下原则：

1. `Free` 强调“能真实体验短试用或预览价值”，但不做“完整长文生产音频下载”或“无限免费长音频”承诺
2. `Free` 不应在第一阶段以“大量启动库音色”作为首要卖点
3. `Pro` 强调“更长单项目时长 + 更稳定的生产路径 + 更完整工作流”
4. `Ultimate` 强调“重度创作者效率与能力升级”
5. 不把内部点数、provider、成本细节直接暴露给用户
6. 优先用“分钟数 + 单项目长度 + 能力差异”来解释套餐，而不是抽象 credit
7. 可以借鉴 Raphael-style 的简洁分发与升级路径，但不能借鉴“无限免费”的成本叙事
8. 不能把“支持长文本”当成独特卖点来讲。长文本 AI 旁白已经不是空白赛道，公开表达必须强调 `稳定一次性交稿 -> 更低返工 -> alignment-ready delivery` 这一类更具体的价值。

### 19.9 计费边界与失败语义

V1 不应在实现阶段临时决定“失败算不算额度”“重生成怎么扣”“字幕失败怎么处理”，这些规则现在由执行真源统一定义。

PRD 层只保留以下原则：

1. 首次成功产出驱动实际用量确认。
2. 局部重生成只应按修复范围计量，而不是整篇重算。
3. 失败是否计费必须按 failure stage 区分。
4. 客服解释、后台账本和前台可见用量必须共用同一套语义。

### 19.10 当前建议规则

当前首版的完整规则表已迁移到执行真源。

这里仅保留三个关键结论：

1. canonical accounting unit 是 `billable_seconds`，而不是前台展示分钟数。
2. `SRT` 或 delivery 失败不应在音频成功后再叠加一次主渲染收费。
3. 补偿必须通过可审计的负向 adjustment 完成，而不是隐式改写历史。

### 19.11 需要进一步细化的点

以下内容仍可能继续基于真实数据优化，但不再属于“没有规则”的状态：

1. 自动补偿的触发阈值
2. 修复缓冲是否需要作为单独商业策略
3. 真实成本验证后，分钟额度与 clone beta 范围的回调机制

## 20. 开源与 API 预留

### 20.1 开源策略

核心产品保持闭源。

开源只作为辅助增长渠道，不作为首发主增长引擎。

优先开源方向为：

1. 长文本 TTS 评测工具包
2. 后续可考虑非核心工作流小工具

### 20.2 公共 API 预留

公共 `text-to-audio API` 不进入 V1 范围。

但路线图中明确预留：

1. 后续可做 `workflow-first` 的 API
2. 公共 API 不要求先自研或自训自有模型
3. API 层可以先是产品 API / 工作流 API，而不必一开始就是底层模型 API

## 21. 引擎策略与外部市场调研

### 21.1 V1 引擎原则

V1 不把引擎选择做成用户可见能力。

模型或引擎选择是平台内部决策，可以随着商业授权、成本、质量和稳定性变化而调整。

### 21.2 外部市场调研结论

当前 PRD 只保留由外部调研得到的结论，不在正文重复 competitor 细节。当前竞争基准、包装比较和来源清单统一维护在：

1. [Competitive Benchmark Review: Long-Form Narration, Pricing Pressure, and Distribution Pattern](./reviews/2026-04-23-competitive-benchmark-longform-audio.md)

PRD 当前只保留以下决策级结论：

1. `long text support` 本身不是公开差异化。
2. 公开 self-serve 不能只卖“能做长文本”，而必须卖 `one-submit stability + lower operator burden + alignment-ready delivery value`。
3. 更广的试用或定价 rollout 必须先过 benchmark review 与 pricing guardrail。
4. 真正决定首发是否成立的，不只是单次生成成本，而是长文本项目长度、语言边界与 timing readiness truth、分段修复、重生成，以及风控与刷量控制。
5. competitor package 细节、价格带与对比论证属于 review 层，不属于 canonical truth。

### 21.3 当前推荐引擎优先级

当前推荐的第一技术放行路径为 hosted-first：

1. 首选评估：`Inworld TTS 1.5 Max`
2. 托管备选：`Cartesia`
3. 当前不建议作为第一放行路径：`ElevenLabs`、`Gemini 3.1 Flash TTS`
4. 当前不作为第一放行路径：`IndexTTS2` 与其他自托管路线

推荐 `Inworld TTS 1.5 Max` 的原因：

1. 当前第三方质量基准中处于第一梯队
2. 当前公开的时间戳 / alignment readiness 信号以英语和西班牙语最可信，足以支撑 `English-first workspace UI + EN/ES output/timing readiness` 的当前真相边界
3. 当前真实 On-Demand / Creator 费率为 `$50 / 1M chars`，Developer / Growth 折扣档分别约为 `$40 / 1M chars` 与 `$30 / 1M chars`，单位经济模型必须按这些实际档位分场景核算
4. 更适合作为“20-30 分钟长文本稳定性”第一轮技术放行基线

其中一个重要商业约束是：

1. 当前测试可以继续使用 On-Demand / Creator 档，避免在真实消耗和用户验证不足前承担更高固定月费
2. 若要维持 `Pro $20 / 90 min` 的 full-included exposure 口径，需要争取接近 Growth `$30 / 1M chars` 的实际费率，或重新核算 `Pro / Ultimate` 的分钟额度、价格和毛利空间

### 21.4 当前推荐的早期采用方式

在当前阶段，推荐采用方式不是“一上来购买更重的计划”，而是先完成 hosted feasibility spike：

1. 主渲染能力优先评估 `Inworld TTS 1.5 Max`
2. 账号计划优先继续使用当前 On-Demand / Creator 路径，并在定价模型中保留 Developer 与 Growth 折扣场景
3. 以 `Cartesia` 作为同阶段备选比较路径
4. 不建议在还没有真实用户和真实消耗数据前，直接上更重的 `Developer` 或 `Growth` 级计划
5. 不建议在第一放行前把自托管稳定性证明当作硬前提

这样做的原因是：

1. `Max` 更符合本产品的品牌承诺和首体验要求
2. 当前 On-Demand / Creator 路径固定成本更容易承受，但其 `$50 / 1M chars` 单位费率不能当作公开分钟包的安全毛利口径
3. 早期技术风险应先由托管稳定性基线回答，而不是先啃自托管运维复杂度
4. 早期成本控制应主要通过产品规则和风控完成，而不是依赖用户先付很多钱后再慢慢摸索

### 21.5 Founder 与 Enterprise 的关系

当前建议将 `Inworld` 的两条路线区分为：

1. `Founder`：早期验证路线
2. `Enterprise`：中期放量与议价预备路线

也就是说：

1. 短期优先核实是否满足 Founder 条件，并用 Founder 价做单位经济模型验证
2. 同时可以接触 Enterprise，但不把 V1 推进依赖在 Enterprise 谈判结果上
3. 等有真实分钟量、并发量、重生成率和增长曲线后，再决定是否需要升级为 Enterprise 合作模式

这里需要额外强调：

1. Founder 是当前首版定价与额度建议的重要成立前提之一
2. 但 Founder 不应成为产品能否启动的唯一前提
3. 如果 Founder 无法锁定，产品应优先通过以下方式回调，而不是硬上原有额度：
   - 下调分钟数
   - 收紧重生成规则
   - 强化单项目长度限制
   - 更早引入内部降本路由

### 21.6 为什么本 PRD 不锁定最终引擎

本文件故意不锁定最终生产引擎，原因如下：

1. 产品承诺必须在引擎切换后仍然成立。
2. 最优引擎决策依赖授权、成本、质量一致性和运维可行性。
3. 当前轮次只做需求定义，不做工程实现。

### 21.7 开源模型在 V1 中的角色

开源模型在第一放行门中不作为收费主引擎使用。

它们当前的合理角色是：

1. 内部质量评测
2. 成本实验
3. 后续降本与自托管预研
4. 托管路径失效时的参考与 fallback 研究

当前建议重点跟踪的开源方向包括：

1. `IndexTTS2`：情绪表达与本地资产价值高，但受商业授权限制
2. `Kokoro`：商业友好、极低成本，适合做成本基线和低价实验
3. `Chatterbox`：商业友好，可作为未来自托管实验对象

当前不建议直接作为 V1 商用主引擎的开源方向包括：

1. `F5-TTS`
2. `Fish Speech / S2 Pro`

原因主要集中在：

1. 商业授权不清晰或受限
2. 常用权重存在非商用问题
3. 质量虽然强，但当前不适合作为首发付费引擎

### 21.8 IndexTTS2 在初版中的角色

`IndexTTS2` 现在被明确记录为一个重要的现有引擎资产，而不是“未来也许会研究”的方向。

本地部署 ` /Volumes/萤捷/coding/nana-indextts-20260121 ` 已经证明它具备与产品高度相关的能力：

1. 情绪表达能力强
2. 支持 zero-shot 克隆工作流
3. 模型叙事上支持音色与情绪的解耦
4. 本地服务已有队列与 batch 处理
5. 本地栈已有分段处理逻辑
6. 已有 WebUI、测试、输出目录和运行脚本

但它目前还不能直接写成第一放行路径的生产默认引擎，原因包括：

1. 官方 README 中主打的精准时长控制能力，在当前 release 里还未真正开启。
2. 它使用的是 bilibili 自定义模型协议，不是标准宽松开源协议。
3. 官方 README 对商业用途写了明确联系路径。
4. 免责声明中写明了未经授权不得直接用于商业用途。

因此，当前 PRD 应将 `IndexTTS2` 写成：

1. 现有的重要战略资产
2. 自托管和降本方向的强候选
3. hosted path 成立后的 fallback / 优化候选
4. 需要通过上线前评审门槛后，才有资格升级为生产默认引擎的候选项

### 21.9 托管 API 的角色

在自托管方案未通过评审门槛前，托管 API 仍然是有效的上线方案或回退方案。

PRD 需要保留这条灵活性，因为托管 API 在以下方面可能仍有优势：

1. 商业授权更清晰
2. 英文长文本一致性更稳定
3. 运维负担更低
4. 更快上线
5. 支持成本更低

### 21.10 引擎晋级门槛

任何引擎在成为生产默认引擎前，都必须通过以下门槛：

1. 商业使用权清晰可证明
2. 长文本质量、情绪控制和项目一致性达标
3. 代表性 `20-30` 分钟脚本可在无用户手动拆段前提下稳定完成
4. 单位经济模型成立
5. 重试和局部修复不会严重击穿毛利

## 22. 技术约束

无论底层引擎怎么选，以下约束都是 V1 的硬约束：

1. 长文本生成必须是异步流程。
2. 用户看到的工作单位必须始终是“一个项目”。
3. 架构必须允许未来接入托管 API 和自托管引擎两类方案。
4. V1 输入范围为粘贴文本加文本型 `txt`、`docx`、`pdf`。
5. V1 首发以单用户为主，不做团队协作。
6. `SRT` 输出必须严格遵循逗号分隔毫秒格式。
7. 系统必须支持项目、输出和修复状态的持久化。
8. 首发技术底座默认锁定为 `MkSaaS + Next.js + Vercel + i18n`，官方免费 fallback 为 `nextjs/saas-starter + 官方 i18n`。
9. 用户侧手动拆段不是允许的正式产品前提；若有需要，只能由后端内部 orchestration 承担。
10. 成功项目即使暂不开放 `SRT` 导出，也必须能产出内部 alignment assets。
11. `source_script`、`normalized_alignment_text`、`display_subtitle_text` 不能混为同一个真相字段。
12. 前端不得直连 `TTS / STT / 存储 provider`；所有 provider 调用、对象签名、重试和编排都必须留在服务端。
13. 长文本成功交付必须伴随可审计的 artifact manifest，包括最终音频、内部偏移信息与关键运行元数据。

旁白输入、自然停顿和 provider input adapter 的执行真源为 [`Narration Input and Pacing`](./specs/narration-input-and-pacing.md)。技术约束层不得把自动补标点、脚本改写或用户侧手动拆段变成隐含前提。

### 22.1 对象存储

V1 对象存储当前明确采用：

1. `Cloudflare R2`

对象存储至少应承载：

1. 生成音频
2. `SRT` 文件
3. 平台音色资产
4. 用户私有上传样本
5. 未来可能的中间产物或缓存文件

`R2` 不应作为公开裸存储暴露。

当前建议：

1. 平台公共试听资源可通过受控公开或受限 URL 方式提供
2. 用户私有上传样本、私有克隆资产、内部中间产物应通过服务端签名或受控访问获取
3. 不应让用户直接枚举 bucket 内部路径

### 22.1.1 对象生命周期原则

针对 `R2` 中的不同对象，当前建议至少区分以下生命周期：

1. 平台公共音色试听：长期保留
2. 用户生成音频：按产品保存策略保留
3. `SRT` 文件：与生成音频保持一致
4. 用户上传样本：优先短期或受限保留
5. 中间处理文件：尽量短期清理

### 22.2 邮件系统

执行真源：

1. [QualityOps and Automation](./specs/quality-ops-and-automation.md)

V1 邮件系统当前明确采用：

1. `Resend`

`Resend` 同时用于：

1. 事务性邮件
2. 营销邮件

事务性邮件至少包括：

1. 注册 / 登录相关通知
2. 生成完成通知
3. 额度或订阅相关通知
4. 风险与验证通知

营销邮件后续可承接：

1. 新功能发布
2. 赛道与音色推荐
3. 产品教育与促活

邮件系统不是附属基础设施，而是正式运营系统的一部分。后续应统一设计：

1. 事务性邮件
2. 营销自动化邮件
3. 服务端提醒与运营告警的触发逻辑

### 22.3 定时任务系统

执行真源：

1. [QualityOps and Automation](./specs/quality-ops-and-automation.md)

V1 定时任务系统当前明确采用：

1. `cron-job.org`

推荐职责分工为：

1. `cron-job.org` 负责触发
2. 本产品自己的 API Route 负责执行

任何定时任务入口都必须满足：

1. 有独立的 `CRON_SECRET`
2. 服务端校验通过后才执行
3. 未通过验证时返回 `401 Unauthorized`

这条原则的目标是：

1. 避免公开 cron 路由被恶意调用
2. 避免把外部调度器误当成可信内部请求

后续自动化任务不只服务单一 cron 需求，而应系统化覆盖：

1. 质量评测跑批
2. 生成完成 / 失败后的服务端提醒
3. 额度、订阅和风险相关提醒
4. 营销邮件与促活自动化

### 22.4 用户沟通渠道

V1 当前默认的用户沟通渠道为：

1. 邮箱
2. `Crisp` 在线聊天组件
3. `Discord` 社群

建议分工如下：

1. 邮箱：事务通知、营销触达、支持沟通
2. `Crisp`：站内即时咨询与转化辅助
3. `Discord`：社区沉淀、案例交流、产品反馈

### 22.5 与密钥防火墙的关系

上述基础设施在实现时必须遵守密钥防火墙：

1. `R2` 的访问密钥只保留在服务端
2. `Resend` API Key 只保留在服务端
3. `cron-job.org` 的 API Key 和 `CRON_SECRET` 只保留在服务端
4. `Crisp` 若有公开 widget 标识，可暴露最小必要前端配置；任何管理类 token 仍必须留在服务端

### 22.6 当前基础设施默认组合

V1 当前默认基础设施组合为：

1. 数据库：`Neon`
2. 对象存储：`Cloudflare R2`
3. 邮件：`Resend`
4. 定时任务触发：`cron-job.org`
5. 在线聊天：`Crisp`
6. 社群承接：`Discord`

### 22.7 风控阈值与触发规则表

风控不应只依赖单一验证码，而应采用“静默风控 + 条件触发 + 强验证”三层结构。

当前建议的初版规则如下：

| 场景 | 默认策略 | 升级触发 | 升级动作 |
|---|---|---|---|
| 免登录首次试用 | 允许一次试用 | 同设备/同 IP 高频反复触发 | `Turnstile Managed` + 频率限制 |
| 注册 | 默认轻量通过 | 异常注册频率、可疑地区或设备 | `Turnstile Managed` + 邮箱验证 |
| 登录异常 | 默认允许 | 连续失败、异常设备、可疑 IP | 强制验证 / 临时冻结 |
| 长文本生成 | 默认按套餐限额执行 | 高频连续提交、超常规速率 | 限流、排队、拒绝 |
| 局部重生成 | 默认允许 | 短时间大量重生成 | 限制次数、延迟队列、验证码 |
| 用户样本上传 | 默认允许 | 异常文件频率、异常大小、重复上传 | 阻断上传、人工复核标记 |
| 自定义克隆创建 | 默认允许但记录审计 | 可疑权利声明、异常频率、样本异常 | 强验证、禁用、人工复核 |
| 下载导出 | 默认允许 | 异常高频批量导出 | 限速、短期封禁、人工复核 |
| cron 路由 | 默认拒绝 | 无 `CRON_SECRET` 或校验失败 | `401 Unauthorized` |

### 22.8 风控原则

当前建议的风控原则如下：

1. 优先静默风控，避免全站强打断
2. 高成本动作优先保护
3. 上传与克隆属于高风险动作，必须比普通浏览更严格
4. 风控规则应能被后台查看，而不是只在代码里硬编码
5. 所有触发记录应能进入后台风控视图

## 23. 明确不做

V1 当前明确不做以下内容：

1. 本轮不做代码开发
2. 本轮不锁定最终生产引擎
3. 不对外宣称“最佳模型”或“全球第一”
4. 不向用户开放模型选择器
5. 不做移动端 App
6. 不做公共 API
7. 不做团队协作和多成员空间
8. 不做完整浏览器时间轴编辑器或 DAW

## 24. 成功标准

这份 PRD 当前阶段成功的标准是：

1. 清楚区分产品价值与引擎选择。
2. 把 hosted-first 与 self-hosted fallback 的技术顺序写清楚，而不是把它们混成一个执行门。
3. 用“引擎晋级门槛”替代“模型效果好就直接上”的模糊判断。
4. 保住第一执行楔子：
   - 长文本稳定出音频
   - 项目级工作流与发布频率保护
5. 把 `SRT`、修复、增长面和更强音色分层明确放到后续层，而不是第一放行条件。
6. 为后续实现计划提供稳定边界，而不是过早把产品绑死在某个引擎上。

## 25. 风险

### 25.1 定位风险

如果对外话术过度依赖“全球第一”或“唯一支持一小时音频”，定位会非常脆弱。

### 25.2 引擎风险

如果产品故事和某个引擎深度绑定，未来任何引擎切换都会从实现问题变成产品重写问题。

### 25.3 商业风险

如果在没有正式商业授权确认的情况下把 `IndexTTS2` 当作默认上线引擎，业务风险会被提前放大。

### 25.4 多语言范围风险

如果多语 SEO / 分发页扩张速度快于英语优先工作台和内容真源维护能力，容易造成“搜索入口很多，但真实产品承诺和页面内容不一致”的问题。

### 25.5 工作流风险

如果产品只优化声音质量，不优化 `SRT`、修复流程和“一项目体验”，就无法兑现对创作者的承诺。

### 25.6 成本与刷量风险

如果免费层、免登录试用、长文本额度和重生成没有同时配套风控，首发可能会被成本和滥用拖垮。

## 26. 首页信息架构（首版）

执行真源：

1. [Distribution and Growth Surface](./specs/distribution-and-growth-surface.md)

本节只保留首页结构摘要，不重复 Hero 约束、分发页承诺或工具页矩阵规则。

### 26.1 设计原则

首页不应直接照搬通用 SaaS landing page 的标准顺序。

对于 `Orpheus` 而言，更合理的逻辑是：

1. 先明确人群
2. 先证明稳定长文本旁白这个结果
3. 再展示赛道
4. 再展示工作流价值
5. 最后再承接试用、定价或后续层能力

因为本产品的核心不是“又一个 AI 工具”，而是：

1. 为 faceless educational explainer creators 服务
2. 通过 `一次贴整稿 -> 稳定旁白 -> subtitle-ready timing` 建立第一层差异化

### 26.2 建议模块顺序

当前首页建议顺序如下：

1. Header
2. Hero
3. Use Cases / Niches
4. Workflow
5. Benefits
6. Proof / Reliability
7. FAQ
8. Later-layer CTA
9. Footer

### 26.3 各模块职责

#### Header

建议承接：

1. Logo
2. Use Cases / Niches
3. Workflow
4. FAQ
5. Request Access

#### Hero

Hero 的职责是：

1. 第一时间说明“这是为谁做的”
2. 第二时间说明“它解决什么问题”
3. 给出低摩擦但不过度承诺的下一步动作

当前建议：

1. 主定位：面向 faceless educational explainer creators 的英语优先工作台与长文本旁白工作流
2. 副标题：强调 `Paste the whole script once. Get stable narration with subtitle-ready timing.`，而不是抽象能力描述
3. CTA：
   - 了解一次贴整稿工作流
   - 申请试用 / 预约演示

#### Proof / Reliability

这一屏用于把“稳定长文本出音频”这件事说清楚，并展示技术放行目标。

当前建议优先承接：

1. 代表性长脚本成功案例
2. 20-30 分钟脚本的完成证据
3. 不需要用户手动拆段的工作流说明
4. 若使用后台隐藏切分，则展示“由系统后台吸收复杂度”的事实而不是让用户猜测

#### Use Cases / Niches

这一屏应尽早出现，因为这比通用 Benefits 更能建立“这是为我做的”的感觉。

当前建议优先展示：

1. `knowledge explainers`
2. `psychology explainers`
3. `language explainers`

#### Voices / Personas

这一屏在第一执行门里不应承担首要叙事，只作为后续层预留：

1. 大启动库音色选择感
2. 旗舰音色人格
3. 热点人格映射
4. 赛道感

它不应被埋在通用功能介绍后面。

#### Workflow

这一屏用于解释：

1. 长文本输入
2. 异步生成
3. 稳定长文本音频输出
4. 项目制交付
5. 后续层能力再扩展到 `SRT` 与修复

#### Benefits

这一屏建议压缩成核心优势总结，而不是承担首页主要叙事。

当前建议聚焦：

1. 稳定长文本直出
2. 更少手动拆段和盯流程
3. 更接近 subtitle-ready timing 的交付结果

#### Pricing

当前建议在用户已经理解：

1. 适用人群
2. 赛道
3. 音色
4. 工作流

之后再展示三档价格结构。

#### FAQ

FAQ 应承接最关键的疑问，例如：

1. 当前稳定长度范围
2. 什么时候开放试用
3. `SRT` 能力是否在后续层提供
4. 私密性
5. 未来是否会扩到更多 workflow layer

#### Final CTA

页尾 CTA 应再次强化：

1. 申请试用
2. 预约演示
3. 联系支持 / 加入社群

### 26.4 与模板的关系

`MkSaaS` 可以提供上述模块的页面骨架，但不会自动给出最适合 `Orpheus` 的信息层级。

因此：

1. 模板负责“页面长什么样”
2. 本 PRD 负责“页面先说什么、后说什么”

## 27. 设计与视觉系统（首版）

### 27.1 定位

本产品虽然使用 `MkSaaS` 作为站点底座，但最终视觉风格不应停留在通用 SaaS 模板层。

设计系统的目标是：

1. 让产品一眼就服务于 `faceless educational explainer creators`
2. 让“稳定长文本旁白 + 可持续出片”在视觉上成立
3. 在多语言与 Geo SEO 扩展下仍然保持统一的品牌感

品牌、视觉和前端交互体验在 V1 中属于核心系统，不是等后端完成后再补的一层包装。

### 27.2 视觉方向

当前建议的视觉方向应同时包含以下气质：

1. 电影感
2. 叙事感
3. 高级感
4. 工具感

这意味着：

1. 不能做成普通“白底蓝按钮”的通用 AI SaaS
2. 也不能做成只有氛围、没有效率感的艺术站
3. 需要在“品牌氛围”与“工作流可信度”之间取得平衡
4. 首页和工具页都应同时传达“下一步低摩擦、不过度承诺”和“旗舰质量可升级”

### 27.3 组件化原则

后续实现阶段应尽量组件化，而不是按页面逐个手写。

建议至少拆成：

1. 页面模板组件
   - 首页模板
   - 语言页模板
   - 赛道页模板
   - 音色页模板
   - 定价页模板
2. 内容区块组件
   - Hero
   - Niche cards
   - Voice cards
   - Persona chips
   - Workflow steps
   - Pricing table
   - FAQ block
   - CTA block

### 27.4 内容驱动组件

组件不应只是纯视觉复用，还应服务于内容真源系统。

也就是说：

1. 同一套组件要能承接不同语言内容
2. 同一套组件要能承接不同赛道与音色数据
3. 页面差异应尽量通过内容配置驱动，而不是复制结构

### 27.5 首页与二级页的视觉层级

当前建议：

1. 首页更强调品牌、人群、赛道和工作流
2. 工具页更强调单任务价值和低摩擦下一步，而不是立即试用
3. 多语 landing 页更强调本地化搜索入口，而不是完整产品承诺
4. 赛道页更强调赛道感、案例与推荐音色
5. 音色页更强调人格、情绪、试听和适配场景
6. 定价页更强调工作流差异与旗舰音色差异，而不是只强调额度

### 27.6 动效与交互原则

后续设计应允许适量动效，但动效必须服务于理解，而不是炫技。

建议优先放在：

1. 音色试听切换
2. 工作流步骤展示
3. Pricing 切换（月付 / 年付）
4. 多语言 / 赛道 / 音色筛选切换

### 27.7 设计系统与内容系统的关系

后续真正实现时，应把：

1. 视觉组件系统
2. 内容真源系统
3. 页面模板系统

三者联动起来。

目标是：

1. 改一个定位或标签，不需要重做页面
2. 改一个语言页案例，不需要重写布局
3. 扩一个赛道或音色，不需要重新发明视觉结构

## 28. 当前假设与默认结论

1. 当前工作名为 `Orpheus`，后续仍需做域名和商标可用性确认。
2. 第一执行楔子锁定为 `educational explainers + long text -> stable audio + subtitle-ready timing`。
3. `IndexTTS2` 是认真纳入考虑的现实候选，但不是第一放行路径。
4. 生产引擎选择目前保持开放，但当前推荐优先评估 `Inworld TTS 1.5 Max`，并在同一轮 benchmark cycle 中同步评估 `Cartesia`。
5. 当前产品优先级仍然是创作者工作流优先，而不是模型选择优先。
6. 第一技术放行标准是“稳定长文本出音频 + EN/ES timing readiness”，不是先把 `SRT`、增长面和音色分层全部补齐。
7. 首发模板默认走 `MkSaaS`，官方免费 fallback 为 `nextjs/saas-starter`。
8. 首发以独立产品品牌上线，不使用 `straitnode.com` 作为主站。
9. 开源模型当前只用于评测、成本实验和预研，不进入第一收费主引擎。

## 29. 下一步建议

当前执行编排体系已拆为两层：

1. [Roadmap](../roadmap/roadmap.md)：定义 phase 顺序、里程碑和并行边界
2. [Plans Library](../plans/README.md)：定义按 phase 拆分的执行工作包计划

接下来应按以下原则推进：

1. 所有真实开发先引用 `docs/prd/` 真源文档
2. 实施顺序和里程碑以 roadmap 为准
3. 具体工作包执行、状态记录和拆分以 plans library 为准
4. 若执行过程中发现新业务语义，先回填 `docs/prd/`，再更新 roadmap / plans，再开始开发

当前最优先的下一批文档与计划工作应聚焦：

1. hosted long-form feasibility spike 的正式工作包与验证标准
2. 代表性 `20-30` 分钟脚本的技术放行评测
3. 第一阶段首页主承诺与 pricing 假设的收敛
4. 在 hosted path 成立后，再决定 `SRT`、音色分层与更广增长面的切入顺序

## 30. 外部调研与 Review 归档

当前轮次的 competitor benchmark 细节、公共来源列表和包装对比依据统一归档在：

1. [Competitive Benchmark Review: Long-Form Narration, Pricing Pressure, and Distribution Pattern](./reviews/2026-04-23-competitive-benchmark-longform-audio.md)

PRD 不再重复维护完整来源附录，避免 benchmark detail 再次变成第二份 truth。
