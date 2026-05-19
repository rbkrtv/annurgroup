import { useState } from 'react';
import {
  Shield,
  Users,
  BookOpen,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Award,
  UserCircle,
  Save,
  Plus,
  Trash2,
  Edit,
  ShieldCheck,
  UserPlus,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Briefcase,
  Calendar,
  BarChart3,
  ArrowLeft,
  ChevronRight,
  LayoutDashboard,
  DollarSign,
  Target,
  Inbox,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Logo from '../components/Logo';

// ─── Utility: Format RM ──────────────────────────────────────────────────────
const formatRM = (v) => `RM ${Number(v || 0).toLocaleString('en-MY')}`;

// Bahasa Melayu day & month names
const HARI_BM = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
const BULAN_BM = [
  'Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun',
  'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember',
];
const formatTodayBM = () => {
  const d = new Date();
  return `${HARI_BM[d.getDay()]}, ${d.getDate()} ${BULAN_BM[d.getMonth()]} ${d.getFullYear()}`;
};

// ─── Admin: Overview ─────────────────────────────────────────────────────────
function AdminOverviewTab({ goToTab }) {
  const { agents, applications, leads, trainingModules } = useApp();

  // Aggregate metrics across all agents
  const aggregate = agents.reduce(
    (acc, a) => {
      const mtd = a.performance?.mtd || { anc: 0, fyc: 0, pr: 0, cpd: 0 };
      const ytd = a.performance?.ytd || { anc: 0, fyc: 0, pr: 0, cpd: 0 };
      acc.mtdAnc += mtd.anc;
      acc.mtdFyc += mtd.fyc;
      acc.ytdAnc += ytd.anc;
      acc.ytdFyc += ytd.fyc;
      acc.prSum += ytd.pr;
      acc.cpdSum += ytd.cpd;
      return acc;
    },
    { mtdAnc: 0, mtdFyc: 0, ytdAnc: 0, ytdFyc: 0, prSum: 0, cpdSum: 0 }
  );

  const avgPR = agents.length ? Math.round(aggregate.prSum / agents.length) : 0;
  const avgCPD = agents.length ? Math.round(aggregate.cpdSum / agents.length) : 0;

  // Top performer (by YTD FYC)
  const topPerformer = [...agents].sort(
    (a, b) => (b.performance?.ytd?.fyc || 0) - (a.performance?.ytd?.fyc || 0)
  )[0];

  // Recent leads (latest 5)
  const recentLeads = [...leads].slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Overview Agensi</h1>
          <p className="text-neutral-500 mt-1">Ringkasan prestasi keseluruhan agensi Annur.</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-3 py-2 self-start sm:self-end">
          <Calendar className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-neutral-700">{formatTodayBM()}</span>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Jumlah Ejen', value: agents.length, icon: Users, color: 'blue' },
          { label: 'Permohonan Baru', value: applications.length, icon: UserPlus, color: 'amber' },
          { label: 'Jumlah Prospek', value: leads.length, icon: Inbox, color: 'purple' },
          { label: 'Modul Latihan', value: trainingModules.length, icon: BookOpen, color: 'emerald' },
        ].map((stat) => {
          const colors = {
            blue: 'bg-blue-50 text-blue-600',
            amber: 'bg-amber-50 text-amber-600',
            purple: 'bg-purple-50 text-purple-600',
            emerald: 'bg-emerald-50 text-emerald-600',
          }[stat.color];
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm">
              <div className={`inline-flex w-10 h-10 ${colors} rounded-xl items-center justify-center mb-2`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Performance Aggregate */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-bold text-neutral-900">Prestasi Keseluruhan</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-emerald-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-600">ANC YTD</span>
              <Briefcase className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{aggregate.ytdAnc}</p>
            <p className="text-[10px] text-neutral-500 mt-1">{aggregate.mtdAnc} bulan ini</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-600">FYC YTD</span>
              <DollarSign className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-lg md:text-2xl font-bold text-neutral-900">{formatRM(aggregate.ytdFyc)}</p>
            <p className="text-[10px] text-neutral-500 mt-1">{formatRM(aggregate.mtdFyc)} bulan ini</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-600">PR Purata</span>
              <Target className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{avgPR}%</p>
            <div className="mt-2 w-full bg-white rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${avgPR}%` }} />
            </div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-600">CPD Purata</span>
              <GraduationCap className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{avgCPD}<span className="text-sm font-medium text-neutral-500"> jam</span></p>
            <p className="text-[10px] text-neutral-500 mt-1">setiap ejen YTD</p>
          </div>
        </div>
      </div>

      {/* Two-column: Top performer + Recent applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Performer */}
        {topPerformer && (
          <div className="bg-gradient-to-br from-black via-neutral-900 to-amber-900 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold">Ejen Terbaik (YTD)</h3>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-base font-bold text-black">
                  {topPerformer.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-bold">{topPerformer.name}</p>
                <p className="text-xs text-amber-300">{topPerformer.rank}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/10 rounded-lg p-2">
                <p className="text-amber-300">FYC YTD</p>
                <p className="font-bold text-base">{formatRM(topPerformer.performance?.ytd?.fyc)}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-2">
                <p className="text-amber-300">ANC YTD</p>
                <p className="font-bold text-base">{topPerformer.performance?.ytd?.anc} kes</p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold text-neutral-900">Prospek Terkini</h3>
            </div>
            {leads.length > 0 && (
              <span className="text-xs text-neutral-500">{leads.length} jumlah</span>
            )}
          </div>

          {recentLeads.length === 0 ? (
            <p className="text-sm text-neutral-400 text-center py-4">Tiada prospek lagi.</p>
          ) : (
            <div className="space-y-2">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-2 bg-neutral-50 rounded-lg"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-neutral-900 truncate">{lead.name}</p>
                    <p className="text-[10px] text-neutral-500">{lead.createdAt} • {lead.phone}</p>
                  </div>
                  <span className="text-[10px] font-medium bg-amber-50 text-amber-600 px-2 py-1 rounded-full whitespace-nowrap">
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Urus Ejen', desc: 'Edit prestasi & ranking', icon: Users, tab: 'agents' },
          { label: 'Urus Latihan', desc: 'Tambah/edit modul LMS', icon: BookOpen, tab: 'lms' },
          { label: 'Lihat Permohonan', desc: 'Calon ejen baru', icon: UserPlus, tab: 'applications' },
        ].map((action) => (
          <button
            key={action.tab}
            onClick={() => goToTab(action.tab)}
            className="bg-white hover:bg-amber-50 rounded-2xl p-4 border border-neutral-100 hover:border-amber-300 shadow-sm transition-all text-left flex items-center gap-3 min-h-[44px]"
          >
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <action.icon className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-neutral-900 text-sm">{action.label}</p>
              <p className="text-xs text-neutral-500">{action.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-300" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Admin: Agent List Row ───────────────────────────────────────────────────
function AgentListRow({ agent, onEdit }) {
  const ytd = agent.performance?.ytd || { fyc: 0, anc: 0, pr: 0 };
  return (
    <button
      onClick={() => onEdit(agent.id)}
      className="w-full bg-white hover:bg-amber-50/40 rounded-2xl p-4 border border-neutral-100 hover:border-amber-300 shadow-sm transition-all text-left flex items-center gap-3 min-h-[44px]"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-base font-bold text-black">
          {agent.name.split(' ').map((n) => n[0]).join('')}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-bold text-neutral-900">{agent.name}</p>
        <p className="text-xs text-amber-600 font-medium">{agent.rank}</p>
      </div>

      <div className="hidden sm:grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-[10px] font-semibold text-neutral-500 uppercase">FYC YTD</p>
          <p className="font-bold text-sm text-neutral-900">{formatRM(ytd.fyc)}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-neutral-500 uppercase">ANC</p>
          <p className="font-bold text-sm text-neutral-900">{ytd.anc}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-neutral-500 uppercase">Rank</p>
          <p className="font-bold text-sm text-neutral-900">#{agent.stats.agencyRank}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold ml-2">
        <Edit className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Edit</span>
      </div>
    </button>
  );
}

// ─── Admin: Agent Edit Card ──────────────────────────────────────────────────
function AgentEditCard({ agent, onCancel, onSaved }) {
  const { updateAgentStats, updateAgentPerformance } = useApp();
  const [draft, setDraft] = useState({ ...agent.stats });
  const [perfDraft, setPerfDraft] = useState({
    mtd: { ...(agent.performance?.mtd || { anc: 0, fyc: 0, pr: 0, cpd: 0 }) },
    ytd: { ...(agent.performance?.ytd || { anc: 0, fyc: 0, pr: 0, cpd: 0 }) },
  });

  const save = () => {
    updateAgentStats(agent.id, {
      newLeads: Number(draft.newLeads) || 0,
      lmsProgress: Math.min(100, Math.max(0, Number(draft.lmsProgress) || 0)),
      agencyRank: Number(draft.agencyRank) || 0,
    });
    ['mtd', 'ytd'].forEach((p) => {
      updateAgentPerformance(agent.id, p, {
        anc: Number(perfDraft[p].anc) || 0,
        fyc: Number(perfDraft[p].fyc) || 0,
        pr: Math.min(100, Math.max(0, Number(perfDraft[p].pr) || 0)),
        cpd: Number(perfDraft[p].cpd) || 0,
      });
    });
    onSaved();
  };

  const renderPerfInputs = (period, label) => (
    <div className="bg-neutral-50 rounded-xl p-3">
      <p className="text-xs font-bold text-neutral-700 mb-2">{label}</p>
      <div className="grid grid-cols-4 gap-2">
        {['anc', 'fyc', 'pr', 'cpd'].map((key) => (
          <div key={key}>
            <label className="block text-[10px] font-semibold text-neutral-500 uppercase mb-1">
              {key}
            </label>
            <input
              type="number"
              value={perfDraft[period][key]}
              onChange={(e) =>
                setPerfDraft((prev) => ({
                  ...prev,
                  [period]: { ...prev[period], [key]: e.target.value },
                }))
              }
              className="w-full text-center text-xs font-bold bg-white border border-neutral-200 rounded-lg px-1 py-1.5 focus:border-amber-500 outline-none"
              min="0"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-5 border-2 border-amber-300 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onCancel}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-700" />
        </button>
        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
          <span className="text-base font-bold text-black">
            {agent.name.split(' ').map((n) => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-neutral-900">{agent.name}</h3>
          <p className="text-xs text-amber-600 font-medium">{agent.rank}</p>
        </div>
      </div>

      {/* Basic stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
          <p className="text-xs text-blue-600 font-medium mb-1">Prospek</p>
          <input
            type="number"
            value={draft.newLeads}
            onChange={(e) => setDraft({ ...draft, newLeads: e.target.value })}
            className="w-full text-center text-base font-bold bg-white border border-blue-200 rounded-lg px-1 py-1"
            min="0"
          />
        </div>
        <div className="bg-amber-50 rounded-xl p-3 text-center">
          <TrendingUp className="w-4 h-4 text-amber-600 mx-auto mb-1" />
          <p className="text-xs text-amber-600 font-medium mb-1">Latihan %</p>
          <input
            type="number"
            value={draft.lmsProgress}
            onChange={(e) => setDraft({ ...draft, lmsProgress: e.target.value })}
            className="w-full text-center text-base font-bold bg-white border border-amber-200 rounded-lg px-1 py-1"
            min="0"
            max="100"
          />
        </div>
        <div className="bg-yellow-50 rounded-xl p-3 text-center">
          <Award className="w-4 h-4 text-yellow-600 mx-auto mb-1" />
          <p className="text-xs text-yellow-600 font-medium mb-1">Ranking</p>
          <input
            type="number"
            value={draft.agencyRank}
            onChange={(e) => setDraft({ ...draft, agencyRank: e.target.value })}
            className="w-full text-center text-base font-bold bg-white border border-yellow-200 rounded-lg px-1 py-1"
            min="1"
          />
        </div>
      </div>

      {/* Performance */}
      <div className="border-t border-neutral-100 pt-4 space-y-2">
        <p className="text-xs font-bold text-neutral-700 mb-2 flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
          Prestasi (ANC / FYC / PR / CPD)
        </p>
        {renderPerfInputs('mtd', 'Bulan Ini')}
        {renderPerfInputs('ytd', 'Year-to-Date')}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-5">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-neutral-600 hover:bg-neutral-100 transition-all min-h-[44px]"
        >
          Batal
        </button>
        <button
          onClick={save}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[44px]"
        >
          <Save className="w-4 h-4" /> Simpan
        </button>
      </div>
    </div>
  );
}

// ─── Admin: Manage Agents ────────────────────────────────────────────────────
function AdminAgentsTab() {
  const { agents } = useApp();
  const [editingId, setEditingId] = useState(null);
  const [savedFlash, setSavedFlash] = useState(false);

  const editingAgent = editingId ? agents.find((a) => a.id === editingId) : null;

  if (editingAgent) {
    return (
      <div className="space-y-4">
        <AgentEditCard
          agent={editingAgent}
          onCancel={() => setEditingId(null)}
          onSaved={() => {
            setEditingId(null);
            setSavedFlash(true);
            setTimeout(() => setSavedFlash(false), 2000);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Senarai Ejen</h1>
        <p className="text-neutral-500 mt-1">
          Klik pada ejen untuk mengedit prestasi (ANC, FYC, PR, CPD) dan ranking.
        </p>
      </div>

      {savedFlash && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm px-4 py-3 rounded-xl">
          Maklumat ejen berjaya disimpan.
        </div>
      )}

      <div className="space-y-3">
        {agents.map((agent) => (
          <AgentListRow key={agent.id} agent={agent} onEdit={(id) => setEditingId(id)} />
        ))}
      </div>
    </div>
  );
}

// ─── Admin: Manage LMS ───────────────────────────────────────────────────────
function AdminLMSTab() {
  const {
    trainingModules,
    updateTrainingModule,
    addTrainingModule,
    removeTrainingModule,
  } = useApp();

  const statusBM = {
    'In Progress': 'Sedang Dipelajari',
    'Not Started': 'Belum Mula',
    'Completed': 'Selesai',
  };

  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [newDraft, setNewDraft] = useState({
    title: '',
    description: '',
    duration: '20 min',
    videoNotes: '',
  });

  const startEdit = (mod) => {
    setEditingId(mod.id);
    setDraft({ ...mod });
  };

  const saveEdit = (modId) => {
    updateTrainingModule(modId, {
      title: draft.title,
      description: draft.description,
      duration: draft.duration,
      status: draft.status,
      progress: Math.min(100, Math.max(0, Number(draft.progress) || 0)),
      videoNotes: draft.videoNotes,
    });
    setEditingId(null);
  };

  const handleAdd = () => {
    if (!newDraft.title.trim()) return;
    addTrainingModule(newDraft);
    setNewDraft({ title: '', description: '', duration: '20 min', videoNotes: '' });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Pengurusan Latihan</h1>
          <p className="text-neutral-500 mt-1">Tambah, edit atau buang modul latihan.</p>
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-2.5 rounded-xl transition-all min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          {showAdd ? 'Batal' : 'Tambah Modul'}
        </button>
      </div>

      {/* Add new module */}
      {showAdd && (
        <div className="bg-white rounded-2xl p-5 border-2 border-amber-300 shadow-sm">
          <h3 className="font-bold text-neutral-900 mb-3">Modul Latihan Baru</h3>
          <div className="space-y-3">
            <input
              value={newDraft.title}
              onChange={(e) => setNewDraft({ ...newDraft, title: e.target.value })}
              placeholder="Tajuk modul (wajib)"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm"
            />
            <textarea
              value={newDraft.description}
              onChange={(e) => setNewDraft({ ...newDraft, description: e.target.value })}
              placeholder="Penerangan ringkas"
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm resize-none"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                value={newDraft.duration}
                onChange={(e) => setNewDraft({ ...newDraft, duration: e.target.value })}
                placeholder="Tempoh (cth: 25 min)"
                className="px-4 py-3 rounded-xl border border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm"
              />
              <input
                value={newDraft.videoNotes}
                onChange={(e) => setNewDraft({ ...newDraft, videoNotes: e.target.value })}
                placeholder="Nota video (pilihan)"
                className="px-4 py-3 rounded-xl border border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm"
              />
            </div>
            <button
              onClick={handleAdd}
              disabled={!newDraft.title.trim()}
              className="w-full bg-black hover:bg-neutral-800 disabled:bg-neutral-300 text-amber-400 disabled:text-neutral-500 font-semibold py-3 rounded-xl transition-all min-h-[44px] flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Tambah Modul
            </button>
          </div>
        </div>
      )}

      {/* Modules list */}
      <div className="space-y-3">
        {trainingModules.map((mod) => {
          const isEditing = editingId === mod.id;
          return (
            <div key={mod.id} className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    value={draft.title}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm font-semibold"
                  />
                  <textarea
                    value={draft.description}
                    onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm resize-none"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      value={draft.duration}
                      onChange={(e) => setDraft({ ...draft, duration: e.target.value })}
                      className="px-3 py-2.5 rounded-xl border border-neutral-200 focus:border-amber-500 outline-none text-sm"
                      placeholder="Tempoh"
                    />
                    <select
                      value={draft.status}
                      onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                      className="px-3 py-2.5 rounded-xl border border-neutral-200 focus:border-amber-500 outline-none text-sm"
                    >
                      <option value="Not Started">Belum Mula</option>
                      <option value="In Progress">Sedang Dipelajari</option>
                      <option value="Completed">Selesai</option>
                    </select>
                    <input
                      type="number"
                      value={draft.progress}
                      onChange={(e) => setDraft({ ...draft, progress: e.target.value })}
                      className="px-3 py-2.5 rounded-xl border border-neutral-200 focus:border-amber-500 outline-none text-sm"
                      placeholder="Progres %"
                      min="0"
                      max="100"
                    />
                  </div>
                  <textarea
                    value={draft.videoNotes}
                    onChange={(e) => setDraft({ ...draft, videoNotes: e.target.value })}
                    rows={2}
                    placeholder="Nota video..."
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-amber-500 outline-none text-sm resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-neutral-600 hover:bg-neutral-100 min-h-[44px]"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => saveEdit(mod.id)}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-black px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 min-h-[44px]"
                    >
                      <Save className="w-4 h-4" /> Simpan
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        <h3 className="font-bold text-neutral-900 text-sm">{mod.title}</h3>
                      </div>
                      <p className="text-xs text-neutral-500">{mod.description}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
                        mod.status === 'In Progress'
                          ? 'bg-amber-50 text-amber-600'
                          : mod.status === 'Completed'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {statusBM[mod.status] || mod.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-3">
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      <span>{mod.duration}</span>
                      <span>•</span>
                      <span>{mod.progress}% progres</span>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => startEdit(mod)}
                        className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[36px]"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Padam modul "${mod.title}"?`)) {
                            removeTrainingModule(mod.id);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[36px]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {trainingModules.length === 0 && (
          <div className="text-center py-12 text-neutral-400 text-sm">
            Tiada modul lagi. Klik "Tambah Modul" untuk membuat satu.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Admin: Recruitment Applications ─────────────────────────────────────────
function AdminApplicationsTab() {
  const { applications } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Permohonan Sertai</h1>
        <p className="text-neutral-500 mt-1">Senarai permohonan dari calon ejen baru.</p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-neutral-100">
          <UserPlus className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <p className="text-neutral-500 text-sm">Belum ada permohonan diterima.</p>
          <p className="text-neutral-400 text-xs mt-1">
            Permohonan dari borang "Sertai Kami" akan muncul di sini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-base font-bold text-black">
                      {app.nama.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm">{app.nama}</h3>
                    <p className="text-xs text-neutral-500">Umur: {app.umur} tahun</p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full">
                  {app.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-neutral-700">
                  <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="text-xs">{app.pekerjaan}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <GraduationCap className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="text-xs">{app.pendidikan}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="text-xs">{app.negeri}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400 pt-1 border-t border-neutral-100">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-xs">Dihantar: {app.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Portal ───────────────────────────────────────────────────────
const adminTabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'agents', label: 'Ejen', icon: Users },
  { id: 'lms', label: 'Latihan', icon: BookOpen },
  { id: 'applications', label: 'Permohonan', icon: UserPlus },
];

export default function AdminPortal() {
  const { activeTab, setActiveTab, logout, applications } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverviewTab goToTab={setActiveTab} />;
      case 'agents':
        return <AdminAgentsTab />;
      case 'lms':
        return <AdminLMSTab />;
      case 'applications':
        return <AdminApplicationsTab />;
      default:
        return <AdminOverviewTab goToTab={setActiveTab} />;
    }
  };

  const SidebarContent = ({ onItemClick }) => (
    <>
      <div className="flex items-center gap-2 px-6 h-16 border-b border-neutral-800">
        <Logo className="w-9 h-9" />
        <div>
          <span className="text-base font-bold block leading-tight">Annur Agency</span>
          <span className="text-xs text-amber-400 leading-tight">Konsol Admin</span>
        </div>
      </div>

      <div className="px-6 py-4 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-black" />
          </div>
          <div>
            <p className="text-sm font-semibold">Pentadbir</p>
            <p className="text-xs text-neutral-400">Akses penuh</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {adminTabs.map(({ id, label, icon: Icon }) => {
          const showBadge = id === 'applications' && applications.length > 0;
          return (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                onItemClick?.();
              }}
              className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px] ${
                activeTab === id
                  ? 'bg-amber-500 text-black'
                  : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 text-left">{label}</span>
              {showBadge && (
                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                  {applications.length}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-neutral-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-neutral-300 hover:bg-red-600/10 hover:text-red-400 transition-all min-h-[44px]"
        >
          <LogOut className="w-5 h-5" />
          Log Keluar
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-black text-white fixed inset-y-0 left-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-black text-white flex flex-col">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-800"
              aria-label="Tutup menu"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent onItemClick={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-0">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-30 bg-white border-b border-neutral-100 px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-100"
            aria-label="Buka menu"
          >
            <Menu className="w-5 h-5 text-neutral-700" />
          </button>
          <div className="flex items-center gap-2">
            <Logo className="w-7 h-7" />
            <span className="font-bold text-neutral-900 text-sm">Konsol Admin</span>
          </div>
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
            <UserCircle className="w-5 h-5 text-black" />
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto">{renderTab()}</div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
        <div className="flex items-center justify-around h-16">
          {adminTabs.map(({ id, label, icon: Icon }) => {
            const showBadge = id === 'applications' && applications.length > 0;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[60px] min-h-[44px] py-1 transition-all ${
                  activeTab === id ? 'text-amber-600' : 'text-neutral-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{label}</span>
                {showBadge && (
                  <span className="absolute top-0 right-2 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {applications.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
