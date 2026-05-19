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

// Bahasa Melayu day & month names
const HARI_BM = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
const BULAN_BM = [
  'Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun',
  'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember',
];

// Format today as "Selasa, 19 Mei 2026"
const formatTodayBM = () => {
  const d = new Date();
  return `${HARI_BM[d.getDay()]}, ${d.getDate()} ${BULAN_BM[d.getMonth()]} ${d.getFullYear()}`;
};

export default function DashboardTab() {
  const { agent, trainingModules } = useApp();
  const [copied, setCopied] = useState(false);
  const [perfPeriod, setPerfPeriod] = useState('mtd'); // 'mtd' | 'ytd'
  const [showQR, setShowQR] = useState(false);

  // Format RM currency
  const formatRM = (value) =>
    `RM ${Number(value || 0).toLocaleString('en-MY')}`;

  // Translate module status
  const statusBM = {
    'In Progress': 'Sedang Dipelajari',
    'Not Started': 'Belum Mula',
    'Completed': 'Selesai',
  };

  // Copy marketing link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(agent.marketingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = agent.marketingLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Share via Web Share API or fallback to WhatsApp
  const handleShare = async () => {
    const shareData = {
      title: 'Sertai Annur Agency',
      text: `Hi! Saya ${agent.name}, ejen Takaful Annur Agency. Klik untuk maklumat lanjut:`,
      url: agent.marketingLink,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: open WhatsApp
        const text = encodeURIComponent(`${shareData.text}\n\n${shareData.url}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
      }
    } catch {
      // User cancelled or error
    }
  };

  // Mock click/view analytics
  const linkAnalytics = {
    views: 142,
    clicks: 38,
    conversions: 5,
  };

  // QR code via free API service (no library needed)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    agent.marketingLink
  )}&color=000000&bgcolor=ffffff&margin=10`;

  // Active training modules (In Progress only)
  const activeModules = trainingModules.filter((m) => m.status === 'In Progress');

  // Current period performance
  const perf = (agent.performance && agent.performance[perfPeriod]) || {
    anc: 0, fyc: 0, pr: 0, cpd: 0,
  };
  const perfCards = [
    { label: 'ANC', fullName: 'Active New Cases', value: perf.anc, icon: Briefcase, color: 'emerald', suffix: ' kes' },
    { label: 'FYC', fullName: 'First Year Commission', value: formatRM(perf.fyc), icon: DollarSign, color: 'amber', suffix: '' },
    { label: 'PR', fullName: 'Persistency Rate', value: perf.pr, icon: Target, color: 'blue', suffix: '%', showBar: true },
    { label: 'CPD', fullName: 'Continuing Prof. Dev.', value: perf.cpd, icon: GraduationCap, color: 'purple', suffix: ' jam' },
  ];

  const colorMap = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: 'text-emerald-600', bar: 'bg-emerald-500' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', icon: 'text-amber-600', bar: 'bg-amber-500' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-600', bar: 'bg-blue-500' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'text-purple-600', bar: 'bg-purple-500' },
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
            Selamat datang, <span className="text-amber-600">{agent.name}</span>
          </h1>
          <p className="text-neutral-500 mt-1">Berikut ringkasan prestasi agensi anda.</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-3 py-2 self-start sm:self-end">
          <Calendar className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-neutral-700">{formatTodayBM()}</span>
        </div>
      </div>

      {/* ─── Performance Metrics (MOVED TO TOP) ─────────────────────────── */}
      <div className="bg-gradient-to-br from-black via-neutral-900 to-amber-900 rounded-2xl p-5 md:p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-lg font-bold">Prestasi Saya</h2>
              <p className="text-xs text-neutral-400">ANC, FYC, PR & CPD</p>
            </div>
          </div>

          {/* MTD / YTD toggle */}
          <div className="inline-flex bg-white/10 backdrop-blur rounded-xl p-1">
            <button
              onClick={() => setPerfPeriod('mtd')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
                perfPeriod === 'mtd'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Bulan Ini
            </button>
            <button
              onClick={() => setPerfPeriod('ytd')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
                perfPeriod === 'ytd'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              YTD
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {perfCards.map((c) => {
            const colors = colorMap[c.color];
            return (
              <div key={c.label} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold ${colors.text} bg-white px-2 py-0.5 rounded`}>
                    {c.label}
                  </span>
                  <c.icon className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-xl md:text-2xl font-bold text-white leading-tight">
                  {c.value}
                  {c.suffix && typeof c.value !== 'string' && (
                    <span className="text-sm font-medium text-neutral-300 ml-0.5">{c.suffix}</span>
                  )}
                </p>
                <p className="text-[10px] text-neutral-300 mt-1 leading-tight">{c.fullName}</p>
                {c.showBar && (
                  <div className="mt-2 w-full bg-white/20 rounded-full h-1.5">
                    <div
                      className={`${colors.bar} h-1.5 rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(100, Math.max(0, c.value))}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* New Leads */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              Bulan Ini
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{agent.stats.newLeads}</p>
          <p className="text-sm text-neutral-500 mt-1">Prospek Baru</p>
        </div>

        {/* LMS Progress */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              Progres
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{agent.stats.lmsProgress}%</p>
          <p className="text-sm text-neutral-500 mt-1">Latihan Selesai</p>
          <div className="mt-3 w-full bg-neutral-100 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${agent.stats.lmsProgress}%` }}
            />
          </div>
        </div>

        {/* Agency Rank */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
              Kedudukan
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900">#{agent.stats.agencyRank}</p>
          <p className="text-sm text-neutral-500 mt-1">Ranking Agensi</p>
        </div>
      </div>

      {/* Active Training Tracker */}
      <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-bold text-neutral-900">Latihan Aktif</h2>
        </div>

        {activeModules.length === 0 ? (
          <p className="text-neutral-500 text-sm">Tiada modul sedang dipelajari. Mulakan kursus baru!</p>
        ) : (
          <div className="space-y-4">
            {activeModules.map((mod) => (
              <div key={mod.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-neutral-50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 text-sm">{mod.title}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{mod.duration}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-amber-600 whitespace-nowrap">
                    {mod.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── Marketing Link Card (ENHANCED) ─────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-black to-neutral-800 p-5 md:p-6 text-white">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold">Pautan Pemasaran Peribadi</h2>
            </div>
          </div>
          <p className="text-neutral-300 text-sm mb-4">
            Kongsi pautan ini untuk merekrut ejen baru atau menarik prospek terus ke CRM anda.
          </p>

          {/* URL Display + Copy */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-sm font-mono text-amber-200 truncate">
              {agent.marketingLink}
            </div>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-black font-semibold px-5 py-3 rounded-xl hover:bg-amber-400 transition-all min-h-[44px]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Disalin!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Salin
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 border-b border-neutral-100">
          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-amber-50 border border-neutral-200 hover:border-amber-300 text-neutral-700 hover:text-amber-700 font-medium py-2.5 rounded-xl transition-all text-sm min-h-[44px]"
          >
            <Share2 className="w-4 h-4" /> Kongsi
          </button>
          <button
            onClick={() => setShowQR(true)}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-amber-50 border border-neutral-200 hover:border-amber-300 text-neutral-700 hover:text-amber-700 font-medium py-2.5 rounded-xl transition-all text-sm min-h-[44px]"
          >
            <QrCode className="w-4 h-4" /> Kod QR
          </button>
        </div>

        {/* Analytics */}
        <div className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
            Analitik Pautan
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <Eye className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <p className="text-xl font-bold text-neutral-900">{linkAnalytics.views}</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Tontonan</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-xl">
              <MousePointerClick className="w-4 h-4 text-amber-600 mx-auto mb-1" />
              <p className="text-xl font-bold text-neutral-900">{linkAnalytics.clicks}</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Klik</p>
            </div>
            <div className="text-center p-3 bg-emerald-50 rounded-xl">
              <Send className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <p className="text-xl font-bold text-neutral-900">{linkAnalytics.conversions}</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Penukaran</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── QR Code Modal ──────────────────────────────────────────────── */}
      {showQR && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowQR(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-neutral-900">Kod QR Pautan</h3>
              </div>
              <button
                onClick={() => setShowQR(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100"
                aria-label="Tutup"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <div className="p-6 text-center">
              <div className="bg-white border-4 border-amber-500 rounded-2xl p-3 inline-block">
                <img src={qrUrl} alt="QR Code" className="w-56 h-56" />
              </div>
              <p className="text-sm text-neutral-600 mt-4">
                Imbas kod QR ini untuk akses pantas ke pautan pemasaran anda.
              </p>
              <p className="text-xs text-neutral-400 mt-2 font-mono break-all">
                {agent.marketingLink}
              </p>

              <a
                href={qrUrl}
                download={`annur-qr-${agent.name.replace(/\s+/g, '-').toLowerCase()}.png`}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-xl transition-all min-h-[44px]"
              >
                Muat Turun QR
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
