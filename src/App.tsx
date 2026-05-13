import {
  Activity,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Crown,
  Diamond,
  Film,
  Home,
  Megaphone,
  MessageCircle,
  PlayCircle,
  Plus,
  Search,
  Settings,
  ShieldAlert,
  Sparkles,
  Ticket,
  Trophy,
  UserRound,
  UsersRound,
  Video,
  WalletCards
} from "lucide-react";
import { useMemo, useState } from "react";

type Period = "today" | "week" | "month";
type NavKey = "overview" | "members" | "sports" | "videos" | "community" | "orders" | "marketing" | "data";

const periodLabel: Record<Period, string> = {
  today: "今日",
  week: "本周",
  month: "本月"
};

const navItems: Array<{ key: NavKey; label: string; icon: typeof Home }> = [
  { key: "overview", label: "总览", icon: Home },
  { key: "members", label: "会员", icon: UsersRound },
  { key: "sports", label: "体育", icon: Trophy },
  { key: "videos", label: "AI影视", icon: PlayCircle },
  { key: "community", label: "社区", icon: MessageCircle },
  { key: "orders", label: "订单", icon: ClipboardList },
  { key: "marketing", label: "营销", icon: Megaphone },
  { key: "data", label: "数据中心", icon: BarChart3 }
];

const pageMeta: Record<NavKey, { title: string; subtitle: string; search: string }> = {
  overview: {
    title: "运营总览",
    subtitle: "高净值家庭私域运营平台 · 数据更新于 2025-05-18 10:30",
    search: "搜索会员/订单/内容"
  },
  members: {
    title: "会员运营",
    subtitle: "等级、权益、家庭共享、积分与高价值会员生命周期管理",
    search: "搜索会员/手机号/家庭"
  },
  sports: {
    title: "体育中心",
    subtitle: "赛事票务、场馆预约、活动报名与核销协同管理",
    search: "搜索赛事/场馆/城市"
  },
  videos: {
    title: "AI影视 CMS",
    subtitle: "内容审核、付费规则、播放表现与转码状态监控",
    search: "搜索片名/标签/专题"
  },
  community: {
    title: "社区发现",
    subtitle: "圈层动态、话题运营、活动回顾与互动质量管理",
    search: "搜索话题/动态/用户"
  },
  orders: {
    title: "订单中心",
    subtitle: "票务、影视、场馆、会员与活动订单统一处理",
    search: "搜索订单号/用户/业务"
  },
  marketing: {
    title: "营销工具",
    subtitle: "Banner、优惠券、Push、积分商城与活动运营配置",
    search: "搜索活动/券码/推送"
  },
  data: {
    title: "数据中心",
    subtitle: "实时看板、收入分析、内容表现与转化漏斗追踪",
    search: "搜索指标/报表/接口"
  }
};

const moduleData: Record<
  Exclude<NavKey, "overview">,
  {
    stat: Array<{ label: string; value: string; change: string; icon: typeof Home; tone: "blue" | "gold" | "teal" | "orange" }>;
    columns: string[];
    rows: string[][];
    actions: string[];
  }
> = {
  members: {
    stat: [
      { label: "钻石会员", value: "2,301", change: "优先管家覆盖 96%", icon: Diamond, tone: "blue" },
      { label: "续费提醒", value: "418", change: "7日内到期", icon: Bell, tone: "orange" },
      { label: "家庭共享", value: "6,842", change: "金卡及以上家庭", icon: UsersRound, tone: "teal" },
      { label: "积分余额", value: "18.6M", change: "本月消耗 +12%", icon: WalletCards, tone: "gold" }
    ],
    columns: ["家庭", "城市", "等级", "权益状态", "最近动作"],
    rows: [
      ["顾云舟家庭", "上海", "钻石", "VIP时段 8 次", "参与高尔夫大师课"],
      ["李思远家庭", "北京", "钻石", "影视抢先看 6 部", "购买年度会员"],
      ["张明轩家庭", "深圳", "白金", "网球场预约 2 次", "即将升级金卡"],
      ["陈雅涵家庭", "杭州", "黄金", "亲子活动优先报名", "兑换帆船体验券"]
    ],
    actions: ["批量续费提醒", "配置权益规则", "导出会员画像"]
  },
  sports: {
    stat: [
      { label: "在售赛事", value: "32", change: "8场热卖", icon: Ticket, tone: "orange" },
      { label: "预约人次", value: "2,317", change: "较昨日 +3.1%", icon: Trophy, tone: "teal" },
      { label: "场馆利用率", value: "72.4%", change: "目标 75%", icon: Activity, tone: "blue" },
      { label: "待核销票", value: "1,086", change: "今晚赛事高峰", icon: CheckCircle2, tone: "gold" }
    ],
    columns: ["项目", "城市", "时间", "库存/名额", "运营状态"],
    rows: [
      ["上海网球公开课", "上海", "05-18 19:00", "12/20", "钻石优先"],
      ["青少年马术体验", "北京", "05-20 10:00", "6/12", "报名审核中"],
      ["湾区帆船邀请赛", "深圳", "05-24 14:00", "188/320", "票务热卖"],
      ["亲子高尔夫营", "杭州", "05-26 09:30", "18/30", "待推送"]
    ],
    actions: ["新建赛事", "配置座位图", "查看核销台"]
  },
  videos: {
    stat: [
      { label: "上架内容", value: "486", change: "今日新增 12", icon: Film, tone: "blue" },
      { label: "付费转化", value: "8.3%", change: "目标 8.5%", icon: CircleDollarSign, tone: "gold" },
      { label: "平均完播率", value: "64.8%", change: "短剧表现最佳", icon: Video, tone: "teal" },
      { label: "审核风险", value: "2", change: "版权待复核", icon: ShieldAlert, tone: "orange" }
    ],
    columns: ["内容", "类型", "权限", "播放表现", "状态"],
    rows: [
      ["家族荣耀：传承", "短剧", "金卡免费", "收入 1,287,650", "热播"],
      ["风华年代", "剧集", "单片付费", "完播率 68%", "推荐中"],
      ["商海浮沉", "纪录片", "钻石抢先看", "转化 9.1%", "待加推"],
      ["她的时代", "短剧", "银卡基础库", "播放 548,720", "已上架"]
    ],
    actions: ["上传内容", "设置付费规则", "进入审核流"]
  },
  community: {
    stat: [
      { label: "今日动态", value: "1,248", change: "高价值家庭 236", icon: MessageCircle, tone: "teal" },
      { label: "热门话题", value: "18", change: "运动打卡最高", icon: Sparkles, tone: "gold" },
      { label: "活动回顾", value: "42", change: "待精选 7", icon: CalendarDays, tone: "blue" },
      { label: "待处理举报", value: "3", change: "均为低风险", icon: ShieldAlert, tone: "orange" }
    ],
    columns: ["话题/动态", "圈层", "互动", "运营动作", "状态"],
    rows: [
      ["高尔夫大师课回顾", "运动打卡", "428赞 / 96评", "置顶推荐", "已发布"],
      ["亲子帆船照片墙", "活动回顾", "316赞 / 42评", "精选素材", "待审核"],
      ["AI短剧观后讨论", "观影讨论", "239赞 / 61评", "引导评论", "升温中"],
      ["周末网球搭子", "同城社交", "88报名", "匹配群聊", "进行中"]
    ],
    actions: ["发布话题", "精选回顾", "处理举报"]
  },
  orders: {
    stat: [
      { label: "今日订单", value: "3,462", change: "支付成功率 96.8%", icon: ClipboardList, tone: "blue" },
      { label: "待退款", value: "3", change: "平均等待 18分", icon: CircleDollarSign, tone: "orange" },
      { label: "会员收入", value: "¥1.92M", change: "年费占比 58%", icon: Crown, tone: "gold" },
      { label: "待对账", value: "126", change: "微信/支付宝", icon: WalletCards, tone: "teal" }
    ],
    columns: ["订单号", "类型", "用户", "金额", "状态"],
    rows: [
      ["JY202505180091", "赛事门票", "顾云舟", "¥1,880", "已支付"],
      ["JY202505180087", "钻石会员", "李思远", "¥2,999", "已完成"],
      ["JY202505180073", "场馆预约", "张明轩", "¥360", "待使用"],
      ["JY202505180052", "AI影视", "陈雅涵", "¥19.9", "退款审核"]
    ],
    actions: ["退款审核", "批量对账", "导出订单"]
  },
  marketing: {
    stat: [
      { label: "Push打开率", value: "28.6%", change: "钻石人群 41%", icon: Megaphone, tone: "teal" },
      { label: "优惠券使用", value: "18.4%", change: "体育券最高", icon: Ticket, tone: "orange" },
      { label: "Banner计划", value: "7", change: "2个待上线", icon: Sparkles, tone: "blue" },
      { label: "积分兑换", value: "4,826", change: "本周 +9%", icon: WalletCards, tone: "gold" }
    ],
    columns: ["活动", "目标人群", "触达渠道", "关键指标", "状态"],
    rows: [
      ["钻石会员生日礼", "高价值家庭", "Push + 管家", "打开率 43%", "今日执行"],
      ["网球场晚高峰补贴", "上海运动用户", "首页Banner", "转化 11.2%", "上线中"],
      ["AI短剧限免周", "影视活跃用户", "站内信", "新增观看 18k", "待复盘"],
      ["家庭共享拉新", "金卡会员", "短信 + Push", "邀请 526", "灰度中"]
    ],
    actions: ["新建Push", "配置优惠券", "编辑Banner"]
  },
  data: {
    stat: [
      { label: "DAU/MAU", value: "36.9%", change: "目标 ≥35%", icon: BarChart3, tone: "blue" },
      { label: "ARPU", value: "¥286", change: "目标 ≥¥200", icon: CircleDollarSign, tone: "gold" },
      { label: "接口P95", value: "148ms", change: "目标 <200ms", icon: Activity, tone: "teal" },
      { label: "系统可用率", value: "99.94%", change: "近30天", icon: CheckCircle2, tone: "orange" }
    ],
    columns: ["指标", "当前值", "目标", "趋势", "判断"],
    rows: [
      ["次月留存率", "67.2%", "≥65%", "连续上升", "达标"],
      ["付费会员占比", "40.8%", "≥40%", "稳定", "达标"],
      ["影视日均观看", "28分钟", "≥25分钟", "上升", "达标"],
      ["月均预约人次", "3,411", "≥3,000", "上升", "达标"]
    ],
    actions: ["打开漏斗", "下载报表", "配置预警"]
  }
};

const metrics = {
  today: [
    { label: "DAU/MAU", value: "8,742 / 23,681", delta: "4.2%", tone: "blue", icon: UsersRound, data: [18, 22, 20, 28, 24, 30, 27, 34, 29, 38, 33, 41] },
    { label: "付费会员", value: "12,846", delta: "1.8%", tone: "gold", icon: Crown, data: [20, 23, 27, 21, 25, 24, 30, 28, 35, 31, 39, 36] },
    { label: "月收入（元）", value: "8,631,200", delta: "6.7%", tone: "teal", icon: CircleDollarSign, data: [30, 32, 31, 36, 34, 39, 37, 42, 40, 45, 43, 49] },
    { label: "预约人次", value: "2,317", delta: "3.1%", tone: "orange", icon: Ticket, data: [14, 18, 15, 22, 19, 26, 23, 29, 25, 31, 28, 35] },
    { label: "影视时长（小时）", value: "18,673", delta: "5.4%", tone: "blue", icon: Video, data: [26, 28, 25, 33, 30, 35, 34, 39, 36, 42, 38, 45] }
  ],
  week: [
    { label: "DAU/MAU", value: "10,418 / 24,326", delta: "6.8%", tone: "blue", icon: UsersRound, data: [20, 24, 27, 29, 33, 36, 39, 41, 44, 46, 49, 51] },
    { label: "付费会员", value: "13,092", delta: "2.9%", tone: "gold", icon: Crown, data: [18, 21, 20, 26, 25, 29, 31, 30, 35, 34, 38, 41] },
    { label: "月收入（元）", value: "9,084,600", delta: "8.2%", tone: "teal", icon: CircleDollarSign, data: [28, 31, 34, 35, 39, 41, 42, 45, 48, 50, 51, 55] },
    { label: "预约人次", value: "15,904", delta: "7.6%", tone: "orange", icon: Ticket, data: [16, 19, 24, 21, 27, 30, 33, 35, 34, 39, 41, 44] },
    { label: "影视时长（小时）", value: "126,820", delta: "9.1%", tone: "blue", icon: Video, data: [20, 22, 28, 31, 33, 37, 40, 43, 45, 48, 51, 53] }
  ],
  month: [
    { label: "DAU/MAU", value: "12,638 / 26,120", delta: "12.4%", tone: "blue", icon: UsersRound, data: [24, 26, 29, 33, 35, 38, 42, 45, 48, 51, 54, 58] },
    { label: "付费会员", value: "14,518", delta: "9.3%", tone: "gold", icon: Crown, data: [18, 22, 25, 28, 30, 32, 35, 38, 41, 43, 47, 51] },
    { label: "月收入（元）", value: "10,426,900", delta: "14.8%", tone: "teal", icon: CircleDollarSign, data: [25, 29, 32, 36, 39, 41, 44, 48, 52, 56, 59, 62] },
    { label: "预约人次", value: "63,411", delta: "11.6%", tone: "orange", icon: Ticket, data: [20, 21, 26, 29, 34, 37, 39, 42, 47, 50, 53, 57] },
    { label: "影视时长（小时）", value: "512,090", delta: "16.7%", tone: "blue", icon: Video, data: [22, 25, 31, 35, 37, 42, 45, 49, 53, 56, 60, 64] }
  ]
};

const membership = [
  { name: "钻石会员", value: 2301, percent: 11.4, color: "#4a8be8" },
  { name: "白金会员", value: 4826, percent: 24.0, color: "#53b7aa" },
  { name: "黄金会员", value: 7182, percent: 35.7, color: "#d9a43b" },
  { name: "青铜会员", value: 5823, percent: 28.9, color: "#8f9498" }
];

const venueSlots = [
  { time: "06:00-07:00", available: 12, total: 20 },
  { time: "07:00-08:00", available: 8, total: 20 },
  { time: "12:00-13:00", available: 20, total: 20, hot: true },
  { time: "18:00-19:00", available: 6, total: 20 },
  { time: "19:00-20:00", available: 4, total: 20 }
];

const videoRank = [
  { title: "家族荣耀：传承", meta: "剧集 · 24集", income: "1,287,650", image: "linear-gradient(135deg,#161b1f,#7a5a35)" },
  { title: "风华年代", meta: "剧集 · 36集", income: "963,540", image: "linear-gradient(135deg,#15242b,#5d7357)" },
  { title: "商海浮沉", meta: "剧集 · 30集", income: "789,210", image: "linear-gradient(135deg,#183b4a,#bec9c6)" },
  { title: "荣耀之路", meta: "电影 · 2小时10分", income: "654,310", image: "linear-gradient(135deg,#17191d,#9b755d)" },
  { title: "她的时代", meta: "剧集 · 28集", income: "548,720", image: "linear-gradient(135deg,#2e2425,#d0a45d)" }
];

const tasks = [
  { title: "高价值会员生日", note: "今日有12位高价值会员生日", count: 12, level: "高", icon: CalendarDays, tone: "gold" },
  { title: "活动报名审核", note: "等待审核的活动报名申请", count: 5, level: "中", icon: ClipboardList, tone: "blue" },
  { title: "退款申请处理", note: "3笔退款申请待处理", count: 3, level: "中", icon: CircleDollarSign, tone: "gold" },
  { title: "内容侵权风险", note: "2个内容存在版权风险", count: 2, level: "高", icon: ShieldAlert, tone: "red" },
  { title: "会员等级变动", note: "8位会员即将晋升/降级", count: 8, level: "低", icon: UserRound, tone: "blue" }
];

const familyFeed = [
  { name: "顾家｜顾云舟", city: "上海", tag: "钻石", action: "参与了“高尔夫大师课”", time: "10:23", avatar: "顾" },
  { name: "李家｜李思远", city: "北京", tag: "钻石", action: "购买了《家族荣耀：传承》", time: "09:45", avatar: "李" },
  { name: "张家｜张明轩", city: "深圳", tag: "白金", action: "预约了网球场（05-20 18:00）", time: "09:12", avatar: "张" },
  { name: "陈家｜陈雅涵", city: "杭州", tag: "黄金", action: "参与了“亲子帆船体验营”", time: "昨天 21:30", avatar: "陈" },
  { name: "王家｜王子墨", city: "广州", tag: "钻石", action: "升级为钻石会员", time: "昨天 18:05", avatar: "王" }
];

const operationRows = [
  { module: "会员", metric: "新增付费会员", value: "186", day: "12.0%", week: "8.4%", target: "200", rate: "93%", trend: [14, 17, 15, 19, 18, 22, 20, 25, 23, 28] },
  { module: "会员", metric: "会员活跃率", value: "68.7%", day: "2.1%", week: "3.6%", target: "70.0%", rate: "98%", trend: [30, 29, 33, 32, 36, 35, 38, 36, 39, 42] },
  { module: "体育", metric: "预约人次", value: "2,317", day: "3.1%", week: "6.2%", target: "2,500", rate: "93%", trend: [18, 23, 20, 26, 24, 29, 27, 33, 31, 36] },
  { module: "体育", metric: "场馆利用率", value: "72.4%", day: "-1.8%", week: "1.2%", target: "75.0%", rate: "97%", trend: [36, 35, 33, 34, 32, 35, 34, 36, 35, 37] },
  { module: "AI影视", metric: "付费转化率", value: "8.3%", day: "0.6%", week: "1.1%", target: "8.5%", rate: "98%", trend: [16, 17, 18, 17, 20, 19, 22, 23, 22, 25] },
  { module: "AI影视", metric: "ARPU（元）", value: "28.6", day: "5.3%", week: "4.7%", target: "30.0", rate: "95%", trend: [20, 22, 21, 24, 23, 26, 25, 29, 28, 31] }
];

function Sparkline({ data, color = "#0f766e" }: { data: number[]; color?: string }) {
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 38 - ((value - Math.min(...data)) / (Math.max(...data) - Math.min(...data) || 1)) * 30;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg className="sparkline" viewBox="0 0 100 44" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DonutChart() {
  let cumulative = 0;
  const radius = 58;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="donut-block">
      <svg className="donut" viewBox="0 0 160 160" aria-label="会员等级分布图">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#eef1f3" strokeWidth="24" />
        {membership.map((item) => {
          const length = (item.percent / 100) * circumference;
          const dashArray = `${length} ${circumference - length}`;
          const dashOffset = -cumulative;
          cumulative += length;
          return (
            <circle
              key={item.name}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="24"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
              transform="rotate(-90 80 80)"
            />
          );
        })}
      </svg>
      <div className="donut-center">
        <span>总会员数</span>
        <strong>20,132</strong>
      </div>
    </div>
  );
}

function Sidebar({ active, onChange }: { active: NavKey; onChange: (value: NavKey) => void }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <Diamond size={28} />
        <span>家域会</span>
      </div>
      <nav className="nav-list" aria-label="主导航">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button key={key} className={`nav-item ${active === key ? "active" : ""}`} onClick={() => onChange(key)}>
            <Icon size={21} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="operator-card">
        <div className="operator-badge">
          <Diamond size={18} />
          <span>黄金运营中心</span>
        </div>
        <div className="operator-row">
          <div>
            <strong>王睿</strong>
            <span>运营总监</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
      <div className="dock">
        <button aria-label="通知">
          <Bell size={20} />
          <span>12</span>
        </button>
        <button aria-label="消息">
          <MessageCircle size={20} />
          <span>28</span>
        </button>
        <button aria-label="设置">
          <Settings size={20} />
        </button>
      </div>
    </aside>
  );
}

function Topbar({
  period,
  onPeriodChange,
  activeNav
}: {
  period: Period;
  onPeriodChange: (period: Period) => void;
  activeNav: NavKey;
}) {
  const meta = pageMeta[activeNav];

  return (
    <header className="topbar">
      <div>
        <h1>{meta.title}</h1>
        <p>{meta.subtitle}</p>
      </div>
      <div className="topbar-actions">
        <div className="date-picker">
          <CalendarDays size={17} />
          <span>2025-05-18</span>
          <ChevronDown size={15} />
        </div>
        <div className="segmented" role="tablist" aria-label="时间范围">
          {(Object.keys(periodLabel) as Period[]).map((key) => (
            <button key={key} className={period === key ? "active" : ""} onClick={() => onPeriodChange(key)}>
              {periodLabel[key]}
            </button>
          ))}
        </div>
        <button className="primary-action">
          <Plus size={18} />
          新建活动
        </button>
        <button className="ghost-action">
          <Megaphone size={18} />
          推送计划
        </button>
        <label className="search">
          <Search size={18} />
          <input placeholder={meta.search} />
        </label>
      </div>
    </header>
  );
}

function MetricCard({ metric }: { metric: (typeof metrics.today)[number] }) {
  const Icon = metric.icon;
  const toneColor = {
    blue: "#3c7fe8",
    gold: "#c9902e",
    teal: "#008376",
    orange: "#e46e31"
  }[metric.tone];

  return (
    <article className="metric-card">
      <div className="metric-title">
        <span className={`metric-icon ${metric.tone}`}>
          <Icon size={18} />
        </span>
        <span>{metric.label}</span>
      </div>
      <strong>{metric.value}</strong>
      <Sparkline data={metric.data} color={toneColor} />
      <p>
        较昨日 <span>↑ {metric.delta}</span>
      </p>
    </article>
  );
}

function MembershipPanel() {
  return (
    <section className="panel membership-panel">
      <div className="panel-header">
        <h2>会员等级分布</h2>
      </div>
      <div className="membership-body">
        <DonutChart />
        <div className="legend-list">
          {membership.map((item) => (
            <div key={item.name} className="legend-row">
              <span style={{ background: item.color }} />
              <p>{item.name}</p>
              <strong>
                {item.value.toLocaleString()} <small>({item.percent}%)</small>
              </strong>
            </div>
          ))}
        </div>
      </div>
      <div className="panel-foot positive">较昨日新增 +186 ↑</div>
    </section>
  );
}

function StadiumMap({ selectedDay, onDayChange }: { selectedDay: number; onDayChange: (index: number) => void }) {
  const days = ["05-18 今天", "05-19 明天", "05-20 周二", "05-21 周三", "05-22 周四", "05-23 周五", "05-24 周六"];
  const seats = [
    "A8",
    "A3",
    "B1",
    "B3",
    "B3",
    "A8",
    "A3",
    "VIP",
    "VIP",
    "C6",
    "A3",
    "A1",
    "D2",
    "D1",
    "C3",
    "D3",
    "B4",
    "B5",
    "B7",
    "C7"
  ];

  return (
    <section className="panel sports-panel">
      <div className="panel-header with-tabs">
        <h2>体育预约与票务</h2>
        <div className="mini-tabs">
          <button className="active">场馆预约</button>
          <button>票务销售</button>
        </div>
      </div>
      <div className="day-strip">
        {days.map((day, index) => (
          <button key={day} className={selectedDay === index ? "active" : ""} onClick={() => onDayChange(index)}>
            {day}
          </button>
        ))}
      </div>
      <div className="venue-selector">
        <button>
          上海 · 家域会体育中心 <ChevronDown size={15} />
        </button>
        <div>
          <span className="available" /> 可预约
          <span className="booked" /> 已预订
          <span className="locked" /> 维护
        </div>
      </div>
      <div className="sports-grid">
        <div className="stadium" aria-label="场馆座位和场地示意">
          <div className="court" />
          {seats.map((seat, index) => (
            <span key={`${seat}-${index}`} className={`seat seat-${index % 4}`}>
              {seat}
            </span>
          ))}
        </div>
        <div className="slot-list">
          <h3>今日热门时段</h3>
          {venueSlots.map((slot) => (
            <button key={slot.time} className={slot.hot ? "hot" : ""}>
              <span>{slot.time}</span>
              <strong>
                {slot.available}/{slot.total}
              </strong>
            </button>
          ))}
          <a href="#operations">查看全部时段 <ChevronRight size={14} /></a>
        </div>
      </div>
    </section>
  );
}

function VideoPanel() {
  return (
    <section className="panel video-panel">
      <div className="panel-header with-link">
        <h2>AI影视内容表现</h2>
        <button>
          更多 <ChevronRight size={15} />
        </button>
      </div>
      <div className="rank-tabs">
        <button className="active">热播TOP5</button>
        <button>收入TOP5</button>
        <button>完播率TOP5</button>
      </div>
      <div className="rank-list">
        {videoRank.map((item, index) => (
          <article key={item.title} className="rank-row">
            <span className={`rank-num rank-${index + 1}`}>{index + 1}</span>
            <div className="poster" style={{ background: item.image }}>
              <Film size={18} />
            </div>
            <div>
              <strong>{item.title}</strong>
              <p>{item.meta}</p>
            </div>
            <small>收入(元) {item.income}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function RightRail() {
  const [activeTask, setActiveTask] = useState(tasks[0].title);

  return (
    <aside className="right-rail">
      <section className="panel task-panel">
        <div className="panel-header with-link">
          <h2>待处理事项</h2>
          <button>
            全部(18) <ChevronRight size={15} />
          </button>
        </div>
        <div className="task-list">
          {tasks.map((task) => {
            const Icon = task.icon;
            return (
              <button
                key={task.title}
                className={`task-row ${activeTask === task.title ? "selected" : ""}`}
                onClick={() => setActiveTask(task.title)}
              >
                <span className={`task-icon ${task.tone}`}>
                  <Icon size={20} />
                </span>
                <span>
                  <strong>{task.title}</strong>
                  <small>{task.note}</small>
                </span>
                <em className={task.level === "高" ? "urgent" : ""}>{task.level}</em>
                <b>{task.count}</b>
                <ChevronRight size={15} />
              </button>
            );
          })}
        </div>
        <button className="plain-link">查看全部待办 <ChevronRight size={14} /></button>
      </section>

      <section className="panel feed-panel">
        <div className="panel-header with-link">
          <h2>高价值家庭动态</h2>
          <button>
            更多 <ChevronRight size={15} />
          </button>
        </div>
        <div className="feed-list">
          {familyFeed.map((item) => (
            <article key={`${item.name}-${item.time}`} className="feed-row">
              <div className="avatar">{item.avatar}</div>
              <div>
                <strong>{item.name}</strong>
                <p>
                  <span>{item.city}</span>
                  <em>{item.tag}</em>
                </p>
                <small>{item.action}</small>
              </div>
              <time>{item.time}</time>
            </article>
          ))}
        </div>
        <button className="plain-link">查看全部动态 <ChevronRight size={14} /></button>
      </section>
    </aside>
  );
}

function OperationsTable() {
  return (
    <section id="operations" className="panel operations-panel">
      <div className="panel-header">
        <h2>今日关键运营数据</h2>
        <span className="info-dot">i</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>模块</th>
              <th>指标</th>
              <th>今日数据</th>
              <th>较昨日</th>
              <th>较上周同期</th>
              <th>目标</th>
              <th>完成率</th>
              <th>趋势</th>
            </tr>
          </thead>
          <tbody>
            {operationRows.map((row) => (
              <tr key={`${row.module}-${row.metric}`}>
                <td>{row.module}</td>
                <td>{row.metric}</td>
                <td>
                  <strong>{row.value}</strong>
                </td>
                <td className={row.day.startsWith("-") ? "negative" : "positive"}>{row.day.startsWith("-") ? "↓" : "↑"} {row.day.replace("-", "")}</td>
                <td className="positive">↑ {row.week}</td>
                <td>{row.target}</td>
                <td>{row.rate}</td>
                <td>
                  <Sparkline data={row.trend} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span>数据更新时间：2025-05-18 10:30</span>
        <button>
          进入数据中心 <ChevronRight size={15} />
        </button>
      </div>
    </section>
  );
}

function ModuleWorkspace({ activeNav }: { activeNav: Exclude<NavKey, "overview"> }) {
  const config = moduleData[activeNav];

  return (
    <section className="module-workspace">
      <div className="module-stat-grid">
        {config.stat.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="module-stat-card">
              <span className={`metric-icon ${item.tone}`}>
                <Icon size={18} />
              </span>
              <div>
                <p>{item.label}</p>
                <strong>{item.value}</strong>
                <small>{item.change}</small>
              </div>
            </article>
          );
        })}
      </div>

      <div className="module-main-grid">
        <section className="panel module-table-panel">
          <div className="panel-header with-link">
            <h2>{pageMeta[activeNav].title}工作台</h2>
            <button>
              查看全部 <ChevronRight size={15} />
            </button>
          </div>
          <div className="module-actions">
            {config.actions.map((action, index) => (
              <button key={action} className={index === 0 ? "active" : ""}>
                {action}
              </button>
            ))}
          </div>
          <div className="table-wrap module-table-wrap">
            <table>
              <thead>
                <tr>
                  {config.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {config.rows.map((row) => (
                  <tr key={row.join("-")}>
                    {row.map((cell, index) => (
                      <td key={`${cell}-${index}`}>
                        {index === 0 ? <strong>{cell}</strong> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel module-side-panel">
          <div className="panel-header">
            <h2>运营建议</h2>
          </div>
          <div className="recommendation-list">
            <article>
              <Sparkles size={18} />
              <div>
                <strong>优先处理高价值家庭触点</strong>
                <p>根据 PRD 的会员分层，钻石与金卡用户应优先触达管家、生日、续费和活动权益。</p>
              </div>
            </article>
            <article>
              <ShieldAlert size={18} />
              <div>
                <strong>关注合规与支付风险</strong>
                <p>影视版权、退款审核、Apple IAP 与个人信息保护需要进入日常待办。</p>
              </div>
            </article>
            <article>
              <BarChart3 size={18} />
              <div>
                <strong>以转化漏斗驱动运营</strong>
                <p>围绕 DAU/MAU、付费率、ARPU、预约人次、影视时长持续看板化。</p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
}

function MobilePreview() {
  return (
    <section className="mobile-preview panel">
      <div className="phone-shell">
        <div className="phone-top">
          <span>家域会</span>
          <Bell size={15} />
        </div>
        <div className="member-card">
          <span>钻石会员</span>
          <strong>顾云舟家庭</strong>
          <p>权益剩余：VIP时段 8 次 · 影视抢先看 6 部</p>
        </div>
        <div className="phone-actions">
          <button><Ticket size={15} /> 赛事</button>
          <button><Trophy size={15} /> 场馆</button>
          <button><Video size={15} /> 影视</button>
        </div>
        <div className="phone-list">
          <h3>推荐日程</h3>
          <p><CheckCircle2 size={14} /> 明日 19:00 网球场预约</p>
          <p><Sparkles size={14} /> 新片《家族荣耀：传承》可观看</p>
        </div>
      </div>
      <div className="preview-copy">
        <h2>移动端首页状态</h2>
        <p>按 PRD 的五栏 Tab 结构预留移动端信息架构，运营后台与 App 端会员权益、预约、影视消费数据保持同一套业务语言。</p>
      </div>
    </section>
  );
}

export default function App() {
  const [period, setPeriod] = useState<Period>("today");
  const [activeNav, setActiveNav] = useState<NavKey>("overview");
  const [selectedDay, setSelectedDay] = useState(0);
  const activeMetrics = useMemo(() => metrics[period], [period]);

  return (
    <div className="app-shell">
      <Sidebar active={activeNav} onChange={setActiveNav} />
      <main className="workspace">
        <Topbar period={period} onPeriodChange={setPeriod} activeNav={activeNav} />
        <div className="content-grid">
          <section className="main-column">
            {activeNav === "overview" ? (
              <>
                <div className="metrics-grid">
                  {activeMetrics.map((metric) => (
                    <MetricCard key={metric.label} metric={metric} />
                  ))}
                </div>
                <div className="dashboard-grid">
                  <MembershipPanel />
                  <StadiumMap selectedDay={selectedDay} onDayChange={setSelectedDay} />
                  <VideoPanel />
                </div>
                <OperationsTable />
                <MobilePreview />
              </>
            ) : (
              <ModuleWorkspace activeNav={activeNav} />
            )}
          </section>
          {activeNav === "overview" ? <RightRail /> : null}
        </div>
      </main>
    </div>
  );
}
