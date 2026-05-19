import { useState } from 'react';
import {
  Users,
  TrendingUp,
  Award,
  BookOpen,
  Copy,
  Check,
  ExternalLink,
  Briefcase,
  DollarSign,
  Target,
  GraduationCap,
  BarChart3,
  Share2,
  QrCode,
  Eye,
  MousePointerClick,
  Send,
  X,
  Calendar,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button, Card } from './ui';

/* ─── Bahasa Melayu date helpers ───────────────────────────────────── */
const HARI_BM = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
const BULAN_BM = [
  'Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun',
  'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember',
];
const formatTodayBM = () => {
  const d = new Date();
  return `${HARI_BM[d.getDay()]}, ${d.getDate()} ${BULAN_BM[d.getMonth()]} ${d.getFullYear()}`;
};

/* ─── Period toggle (MTD / YTD) ───────────────────────────────────── */
function PeriodToggle({ value, onChange }) {
  const opts = [
    { id: 'mtd', label: 'Bulan Ini' },
    { id: 'ytd', label: 'YTD' },
  ];
  return (
    <div
      role="tablist"
      className="inline-flex bg-white/[0.08] backdrop-blur-sm rounded-full p-1 border border-white/10"
    >
      {opts.map(({ id, label }) => {
        const active = value === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            className={[
              'h-9 px-5 rounded-full text-xs font-medium transition-all duration-300 md-emphasized active:scale-95',
              active
                ? 'bg-md-inverse-primary text-md-inverse-surface shadow-md-1'
                : 'text-md-inverse-on-surface/70 hover:text-md-inverse-on-surface',
            ].join(' ')}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Glass metric tile (used inside the dark Prestasi panel) ─────── */
function MetricTile({ label, fullName, value, suffix, Icon, accent, showBar }) {
  // accent: 'primary' | 'amber' | 'sky' | 'mauve'
  const accentBg = {
    primary: 'bg-md-inverse-primary/15 text-md-inverse-primary',
    amber: 'bg-amber-300/15 text-amber-300',
    sky: 'bg-sky-300/15 text-sky-300',
    mauve: 'bg-fuchsia-300/15 text-fuchsia-300',
  }[accent];

  const barFill = {
    primary: 'bg-md-inverse-primary',
    amber: 'bg-amber-300',
    sky: 'bg-sky-300',
    mauve: 'bg-fuchsia-300',
  }[accent];

  return (
    <div className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-4 border border-white/[0.08] transition-colors hover:bg-white/[0.1]">
      <div className="flex items-center justify-between mb-2.5">
        <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${accentBg}`}>
          {label}
        </span>
        <Icon className="w-4 h-4 text-md-inverse-on-surface/65" />
      </div>
      <p className="text-xl md:text-2xl font-medium text-md-inverse-on-surface leading-tight tracking-[-0.01em]">
        {value}
        {suffix && typeof value !== 'string' && (
          <span className="text-sm font-normal text-md-inverse-on-surface/55 ml-0.5">
            {suffix}
          </span>
        )}
      </p>
      <p className="text-[11px] text-md-inverse-on-surface/55 mt-1 leading-tight">
        {fullName}
      </p>
      {showBar && (
        <div className="mt-2.5 w-full bg-white/15 rounded-full h-1">
          <div
            className={`${barFill} h-1 rounded-full transition-all duration-500`}
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Light KPI card (stats grid) ─────────────────────────────────── */
function StatCard({ icon: Icon, value, label, accent, badge, progress }) {
  const accentBg = {
    primary: 'bg-md-primary-container text-md-on-primary-container',
    secondary: 'bg-md-secondary-container text-md-on-secondary-container',
    tertiary: 'bg-md-tertiary-container text-md-on-tertiary-container',
  }[accent];

  return (
    <Card radius="lg" className="p-6">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${accentBg}`}>
          <Icon className="w-5 h-5" />
        </div>
        {badge && (
          <span className="text-[11px] font-medium text-md-on-surface-variant bg-md-surface-container-high px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <p className="text-3xl font-medium text-md-on-surface tracking-[-0.01em]">{value}</p>
      <p className="text-sm text-md-on-surface-variant mt-1">{label}</p>
      {typeof progress === 'number' && (
        <div className="mt-3 w-full bg-md-surface-container-high rounded-full h-1.5">
          <div
            className="bg-md-primary h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </Card>
  );
}

/* ─── Main Dashboard ──────────────────────────────────────────────── */
export default function DashboardTab() {
  const { agent, trainingModules } = useApp();
  const [copied, setCopied] = useState(false);
  const [perfPeriod, setPerfPeriod] = useState('mtd');
  const [showQR, setShowQR] = useState(false);

  const formatRM = (v) => `RM ${Number(v || 0).toLocaleString('en-MY')}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(agent.marketingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = agent.marketingLink;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const data = {
      title: 'Sertai Annur Agency',
      text: `Hi! Saya ${agent.name}, ejen Takaful Annur Agency. Klik untuk maklumat lanjut:`,
      url: agent.marketingLink,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        const text = encodeURIComponent(`${data.text}\n\n${data.url}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
      }
    } catch {
      /* user cancelled */
    }
  };

  const linkAnalytics = { views: 142, clicks: 38, conversions: 5 };
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    agent.marketingLink
  )}&color=000000&bgcolor=ffffff&margin=10`;

  const activeModules = trainingModules.filter((m) => m.status === 'In Progress');

  const perf = (agent.performance && agent.performance[perfPeriod]) || {
    anc: 0, fyc: 0, pr: 0, cpd: 0,
  };

  const perfTiles = [
    { label: 'ANC', fullName: 'Active New Cases', value: perf.anc, suffix: ' kes', Icon: Briefcase, accent: 'primary' },
    { label: 'FYC', fullName: 'First Year Commission', value: formatRM(perf.fyc), Icon: DollarSign, accent: 'amber' },
    { label: 'PR', fullName: 'Persistency Rate', value: perf.pr, suffix: '%', Icon: Target, accent: 'sky', showBar: true },
    { label: 'CPD', fullName: 'Continuing Prof. Dev.', value: perf.cpd, suffix: ' jam', Icon: GraduationCap, accent: 'mauve' },
  ];

  return (
    <div className="space-y-6">
      {/* ─── Welcome header ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-[1.75rem] md:text-[2.25rem] font-medium text-md-on-surface leading-tight tracking-[-0.01em]">
            Selamat datang, <span className="text-md-primary">{agent.name}</span>
          </h1>
          <p className="text-md-on-surface-variant mt-1.5">
            Berikut ringkasan prestasi agensi anda.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 bg-md-surface-container-low px-4 py-2.5 rounded-full self-start">
          <Calendar className="w-4 h-4 text-md-primary" />
          <span className="text-sm font-medium text-md-on-surface-variant">
            {formatTodayBM()}
          </span>
        </div>
      </div>

      {/* ─── Prestasi Saya (hero metric panel — dark inverse) ──── */}
      <div className="relative bg-md-inverse-surface text-md-inverse-on-surface rounded-[28px] p-6 md:p-7 overflow-hidden shadow-md-2">
        {/* atmospheric glow */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-72 h-72 bg-md-inverse-primary/20 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-24 w-96 h-96 bg-md-tertiary/40 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-md-inverse-primary/15 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-md-inverse-primary" />
              </div>
              <div>
                <h2 className="text-lg font-medium">Prestasi Saya</h2>
                <p className="text-xs text-md-inverse-on-surface/60">
                  ANC · FYC · PR · CPD
                </p>
              </div>
            </div>
            <PeriodToggle value={perfPeriod} onChange={setPerfPeriod} />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {perfTiles.map((t) => (
              <MetricTile key={t.label} {...t} />
            ))}
          </div>
        </div>
      </div>

      {/* ─── Stats row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={Users}
          value={agent.stats.newLeads}
          label="Prospek Baru"
          accent="secondary"
          badge="Bulan Ini"
        />
        <StatCard
          icon={TrendingUp}
          value={`${agent.stats.lmsProgress}%`}
          label="Latihan Selesai"
          accent="primary"
          badge="Progres"
          progress={agent.stats.lmsProgress}
        />
        <StatCard
          icon={Award}
          value={`#${agent.stats.agencyRank}`}
          label="Ranking Agensi"
          accent="tertiary"
          badge="Kedudukan"
        />
      </div>

      {/* ─── Active training ───────────────────────────────────── */}
      <Card radius="lg" className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-md-primary" />
          <h2 className="text-base font-medium text-md-on-surface">Latihan Aktif</h2>
        </div>

        {activeModules.length === 0 ? (
          <p className="text-sm text-md-on-surface-variant">
            Tiada modul sedang dipelajari. Mulakan kursus baru!
          </p>
        ) : (
          <div className="space-y-3">
            {activeModules.map((mod) => (
              <div
                key={mod.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-md-surface-container-low rounded-2xl"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-md-on-surface text-sm truncate">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-md-on-surface-variant mt-0.5">
                    {mod.duration}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-md-surface-container-high rounded-full h-1.5">
                    <div
                      className="bg-md-primary h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-md-primary whitespace-nowrap">
                    {mod.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* ─── Marketing link card ───────────────────────────────── */}
      <Card radius="xl" className="overflow-hidden p-0">
        {/* Top: dark inverse band */}
        <div className="bg-md-inverse-surface text-md-inverse-on-surface p-6 md:p-7 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-20 w-64 h-64 bg-md-inverse-primary/15 rounded-full blur-3xl"
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <ExternalLink className="w-5 h-5 text-md-inverse-primary" />
              <h2 className="text-lg font-medium">
                Pautan Pemasaran Peribadi
              </h2>
            </div>
            <p className="text-md-inverse-on-surface/70 text-sm mb-5">
              Kongsi pautan ini untuk merekrut ejen baru atau menarik prospek terus
              ke CRM anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="flex-1 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-5 py-3 text-sm font-mono text-md-inverse-primary truncate">
                {agent.marketingLink}
              </div>
              <Button
                variant="inverse"
                onClick={handleCopyLink}
                iconLeft={copied ? Check : Copy}
              >
                {copied ? 'Disalin!' : 'Salin'}
              </Button>
            </div>
          </div>
        </div>

        {/* Middle: action row */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-md-surface-container-low border-y border-md-outline-variant">
          <Button variant="text" iconLeft={Share2} onClick={handleShare}>
            Kongsi
          </Button>
          <Button variant="text" iconLeft={QrCode} onClick={() => setShowQR(true)}>
            Kod QR
          </Button>
        </div>

        {/* Bottom: analytics */}
        <div className="p-6">
          <p className="text-xs font-medium text-md-on-surface-variant uppercase tracking-wider mb-3">
            Analitik Pautan
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { Icon: Eye, value: linkAnalytics.views, label: 'Tontonan', tone: 'bg-md-secondary-container text-md-on-secondary-container' },
              { Icon: MousePointerClick, value: linkAnalytics.clicks, label: 'Klik', tone: 'bg-md-primary-container text-md-on-primary-container' },
              { Icon: Send, value: linkAnalytics.conversions, label: 'Penukaran', tone: 'bg-md-tertiary-container text-md-on-tertiary-container' },
            ].map((m) => (
              <div key={m.label} className={`text-center p-4 rounded-2xl ${m.tone}`}>
                <m.Icon className="w-4 h-4 mx-auto mb-1.5 opacity-70" />
                <p className="text-2xl font-medium tracking-[-0.01em]">{m.value}</p>
                <p className="text-[11px] mt-0.5 opacity-75">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ─── QR modal ──────────────────────────────────────────── */}
      {showQR && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-title"
          className="fixed inset-0 bg-md-inverse-surface/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowQR(false)}
        >
          <Card
            radius="2xl"
            tone="lowest"
            className="max-w-sm w-full p-0 overflow-hidden shadow-md-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-md-outline-variant">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-md-primary" />
                <h3 id="qr-title" className="font-medium text-md-on-surface">
                  Kod QR Pautan
                </h3>
              </div>
              <button
                onClick={() => setShowQR(false)}
                className="w-10 h-10 inline-flex items-center justify-center rounded-full text-md-on-surface-variant hover:bg-md-primary/10 active:scale-95 transition-all"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 text-center">
              <div className="bg-white p-3 rounded-2xl inline-block ring-4 ring-md-primary-container">
                <img src={qrUrl} alt="QR Code pautan pemasaran" className="w-56 h-56" />
              </div>
              <p className="text-sm text-md-on-surface-variant mt-5">
                Imbas kod QR ini untuk akses pantas ke pautan pemasaran anda.
              </p>
              <p className="text-xs text-md-on-surface-variant/70 mt-2 font-mono break-all">
                {agent.marketingLink}
              </p>

              <Button
                as="a"
                href={qrUrl}
                download={`annur-qr-${agent.name.replace(/\s+/g, '-').toLowerCase()}.png`}
                variant="filled"
                size="lg"
                className="w-full mt-5"
              >
                Muat Turun QR
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
