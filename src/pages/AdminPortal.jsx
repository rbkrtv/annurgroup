import { useState } from 'react';
import {
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
  UserPlus,
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
import { Button, Card, Field, Input, Select, Textarea } from '../components/ui';

/* ─── Helpers ────────────────────────────────────────────────────── */
const formatRM = (v) => `RM ${Number(v || 0).toLocaleString('en-MY')}`;
const HARI_BM = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
const BULAN_BM = [
  'Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun',
  'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember',
];
const formatTodayBM = () => {
  const d = new Date();
  return `${HARI_BM[d.getDay()]}, ${d.getDate()} ${BULAN_BM[d.getMonth()]} ${d.getFullYear()}`;
};

const statusBM = {
  'In Progress': 'Sedang Dipelajari',
  'Not Started': 'Belum Mula',
  'Completed': 'Selesai',
};

/* ──────────────────────────────────────────────────────────────────────────
   OVERVIEW TAB
   ──────────────────────────────────────────────────────────────────────── */
function OverviewStat({ icon: Icon, value, label, accent }) {
  const colors = {
    primary: 'bg-md-primary-container text-md-on-primary-container',
    secondary: 'bg-md-secondary-container text-md-on-secondary-container',
    tertiary: 'bg-md-tertiary-container text-md-on-tertiary-container',
    success: 'bg-md-success-container text-md-success',
  }[accent];

  return (
    <Card radius="lg" className="p-5">
      <div className={`inline-flex w-11 h-11 rounded-2xl items-center justify-center mb-3 ${colors}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-3xl font-medium text-md-on-surface tracking-[-0.01em]">
        {value}
      </p>
      <p className="text-xs text-md-on-surface-variant mt-1">{label}</p>
    </Card>
  );
}

function PerformancePill({ label, value, suffix, Icon, accent, showBar }) {
  const colors = {
    primary: 'bg-md-primary-container text-md-on-primary-container',
    secondary: 'bg-md-secondary-container text-md-on-secondary-container',
    tertiary: 'bg-md-tertiary-container text-md-on-tertiary-container',
    success: 'bg-md-success-container text-md-success',
  }[accent];

  return (
    <div className={`rounded-2xl p-4 ${colors}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold tracking-wider uppercase opacity-90">{label}</span>
        <Icon className="w-4 h-4 opacity-75" />
      </div>
      <p className="text-xl md:text-2xl font-medium tracking-[-0.01em]">
        {value}
        {suffix && typeof value !== 'string' && (
          <span className="text-sm font-normal opacity-70 ml-0.5">{suffix}</span>
        )}
      </p>
      {showBar && (
        <div className="mt-2 w-full bg-white/30 rounded-full h-1">
          <div
            className="bg-current h-1 rounded-full opacity-80"
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          />
        </div>
      )}
    </div>
  );
}

function AdminOverviewTab({ goToTab }) {
  const { agents, applications, leads, trainingModules } = useApp();

  const agg = agents.reduce(
    (acc, a) => {
      const m = a.performance?.mtd || { anc: 0, fyc: 0, pr: 0, cpd: 0 };
      const y = a.performance?.ytd || { anc: 0, fyc: 0, pr: 0, cpd: 0 };
      return {
        mtdAnc: acc.mtdAnc + m.anc,
        mtdFyc: acc.mtdFyc + m.fyc,
        ytdAnc: acc.ytdAnc + y.anc,
        ytdFyc: acc.ytdFyc + y.fyc,
        prSum: acc.prSum + y.pr,
        cpdSum: acc.cpdSum + y.cpd,
      };
    },
    { mtdAnc: 0, mtdFyc: 0, ytdAnc: 0, ytdFyc: 0, prSum: 0, cpdSum: 0 }
  );

  const avgPR = agents.length ? Math.round(agg.prSum / agents.length) : 0;
  const avgCPD = agents.length ? Math.round(agg.cpdSum / agents.length) : 0;

  const topPerformer = [...agents].sort(
    (a, b) => (b.performance?.ytd?.fyc || 0) - (a.performance?.ytd?.fyc || 0)
  )[0];

  const recentLeads = [...leads].slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-[1.75rem] md:text-[2.25rem] font-medium text-md-on-surface tracking-[-0.01em]">
            Overview Agensi
          </h1>
          <p className="text-md-on-surface-variant mt-1.5">
            Ringkasan prestasi keseluruhan agensi Annur.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 bg-md-surface-container-low px-4 py-2.5 rounded-full self-start">
          <Calendar className="w-4 h-4 text-md-primary" />
          <span className="text-sm font-medium text-md-on-surface-variant">
            {formatTodayBM()}
          </span>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <OverviewStat icon={Users} value={agents.length} label="Jumlah Ejen" accent="secondary" />
        <OverviewStat icon={UserPlus} value={applications.length} label="Permohonan Baru" accent="primary" />
        <OverviewStat icon={Inbox} value={leads.length} label="Jumlah Prospek" accent="tertiary" />
        <OverviewStat icon={BookOpen} value={trainingModules.length} label="Modul Latihan" accent="success" />
      </div>

      {/* Aggregate performance */}
      <Card radius="lg" className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 className="w-5 h-5 text-md-primary" />
          <h2 className="text-base font-medium text-md-on-surface">Prestasi Keseluruhan</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <PerformancePill label="ANC YTD" value={agg.ytdAnc} suffix=" kes" Icon={Briefcase} accent="success" />
          <PerformancePill label="FYC YTD" value={formatRM(agg.ytdFyc)} Icon={DollarSign} accent="primary" />
          <PerformancePill label="PR Purata" value={avgPR} suffix="%" Icon={Target} accent="secondary" showBar />
          <PerformancePill label="CPD Purata" value={avgCPD} suffix=" jam" Icon={GraduationCap} accent="tertiary" />
        </div>
      </Card>

      {/* Two-column: top performer + recent leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {topPerformer && (
          <Card radius="xl" tone="inverse" className="p-6 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-16 w-56 h-56 bg-md-inverse-primary/20 rounded-full blur-3xl"
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-md-inverse-primary" />
                <h3 className="text-base font-medium">Ejen Terbaik (YTD)</h3>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-md-inverse-primary text-md-inverse-surface flex items-center justify-center">
                  <span className="text-base font-medium">
                    {topPerformer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{topPerformer.name}</p>
                  <p className="text-xs text-md-inverse-primary">{topPerformer.rank}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-2xl p-3">
                  <p className="text-md-inverse-primary mb-0.5">FYC YTD</p>
                  <p className="font-medium text-base">
                    {formatRM(topPerformer.performance?.ytd?.fyc)}
                  </p>
                </div>
                <div className="bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-2xl p-3">
                  <p className="text-md-inverse-primary mb-0.5">ANC YTD</p>
                  <p className="font-medium text-base">
                    {topPerformer.performance?.ytd?.anc} kes
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card radius="lg" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-md-primary" />
              <h3 className="text-base font-medium text-md-on-surface">Prospek Terkini</h3>
            </div>
            {leads.length > 0 && (
              <span className="text-xs text-md-on-surface-variant">{leads.length} jumlah</span>
            )}
          </div>

          {recentLeads.length === 0 ? (
            <p className="text-sm text-md-on-surface-variant text-center py-6">
              Tiada prospek lagi.
            </p>
          ) : (
            <div className="space-y-2">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-3 bg-md-surface-container-low rounded-2xl"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-md-on-surface truncate">
                      {lead.name}
                    </p>
                    <p className="text-[11px] text-md-on-surface-variant">
                      {lead.createdAt} · {lead.phone}
                    </p>
                  </div>
                  <span className="text-[11px] font-medium bg-md-primary-container text-md-on-primary-container px-2.5 py-1 rounded-full whitespace-nowrap">
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Urus Ejen', desc: 'Edit prestasi & ranking', icon: Users, tab: 'agents' },
          { label: 'Urus Latihan', desc: 'Tambah/edit modul LMS', icon: BookOpen, tab: 'lms' },
          { label: 'Lihat Permohonan', desc: 'Calon ejen baru', icon: UserPlus, tab: 'applications' },
        ].map(({ label, desc, icon: Icon, tab }) => (
          <Card
            key={tab}
            radius="lg"
            interactive
            className="p-5 group flex items-center gap-3"
            onClick={() => goToTab(tab)}
          >
            <div className="w-11 h-11 rounded-2xl bg-md-primary-container text-md-on-primary-container flex items-center justify-center flex-shrink-0 transition-transform duration-300 md-emphasized group-hover:scale-110 group-hover:rotate-[-4deg]">
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-md-on-surface text-sm">{label}</p>
              <p className="text-xs text-md-on-surface-variant">{desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-md-on-surface-variant flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   AGENTS TAB
   ──────────────────────────────────────────────────────────────────────── */
function AgentListRow({ agent, onEdit }) {
  const ytd = agent.performance?.ytd || { fyc: 0, anc: 0, pr: 0 };
  return (
    <Card
      radius="lg"
      interactive
      className="p-4 flex items-center gap-4"
      onClick={() => onEdit(agent.id)}
    >
      <div className="w-12 h-12 rounded-full bg-md-primary text-md-on-primary flex items-center justify-center flex-shrink-0">
        <span className="text-base font-medium">
          {agent.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-md-on-surface truncate">{agent.name}</p>
        <p className="text-xs text-md-primary">{agent.rank}</p>
      </div>

      <div className="hidden sm:grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-[10px] font-medium text-md-on-surface-variant uppercase tracking-wider">
            FYC YTD
          </p>
          <p className="font-medium text-sm text-md-on-surface mt-0.5">{formatRM(ytd.fyc)}</p>
        </div>
        <div>
          <p className="text-[10px] font-medium text-md-on-surface-variant uppercase tracking-wider">
            ANC
          </p>
          <p className="font-medium text-sm text-md-on-surface mt-0.5">{ytd.anc}</p>
        </div>
        <div>
          <p className="text-[10px] font-medium text-md-on-surface-variant uppercase tracking-wider">
            Rank
          </p>
          <p className="font-medium text-sm text-md-on-surface mt-0.5">#{agent.stats.agencyRank}</p>
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 text-xs font-medium text-md-primary">
        <Edit className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Edit</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </Card>
  );
}

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
    <div className="bg-md-surface-container-low rounded-2xl p-4">
      <p className="text-xs font-medium text-md-on-surface uppercase tracking-wider mb-3">
        {label}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {['anc', 'fyc', 'pr', 'cpd'].map((key) => (
          <div key={key}>
            <label className="block text-[10px] font-medium text-md-on-surface-variant uppercase mb-1.5 tracking-wider">
              {key}
            </label>
            <Input
              type="number"
              value={perfDraft[period][key]}
              onChange={(e) =>
                setPerfDraft((p) => ({
                  ...p,
                  [period]: { ...p[period], [key]: e.target.value },
                }))
              }
              className="text-center !h-11 text-sm font-medium"
              min="0"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card radius="xl" className="p-6 ring-1 ring-md-primary/30">
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={onCancel}
          className="w-11 h-11 inline-flex items-center justify-center rounded-full text-md-on-surface-variant hover:bg-md-primary/10 active:scale-95 transition-all md-emphasized"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-12 h-12 rounded-full bg-md-primary text-md-on-primary flex items-center justify-center flex-shrink-0">
          <span className="text-base font-medium">
            {agent.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-md-on-surface truncate">{agent.name}</h3>
          <p className="text-xs text-md-primary">{agent.rank}</p>
        </div>
      </div>

      {/* Basic stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { key: 'newLeads', Icon: Users, label: 'Prospek', accent: 'bg-md-secondary-container text-md-on-secondary-container' },
          { key: 'lmsProgress', Icon: TrendingUp, label: 'Latihan %', accent: 'bg-md-primary-container text-md-on-primary-container' },
          { key: 'agencyRank', Icon: Award, label: 'Ranking', accent: 'bg-md-tertiary-container text-md-on-tertiary-container' },
        ].map(({ key, Icon, label, accent }) => (
          <div key={key} className={`rounded-2xl p-3 text-center ${accent}`}>
            <Icon className="w-4 h-4 mx-auto mb-1.5 opacity-70" />
            <p className="text-[10px] font-medium uppercase tracking-wider mb-1">{label}</p>
            <Input
              type="number"
              value={draft[key]}
              onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
              className="!h-10 text-center !bg-white text-md-on-surface text-base font-medium"
              min="0"
            />
          </div>
        ))}
      </div>

      {/* Performance */}
      <div className="border-t border-md-outline-variant pt-5 space-y-3">
        <p className="text-sm font-medium text-md-on-surface flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-md-primary" />
          Prestasi (ANC / FYC / PR / CPD)
        </p>
        {renderPerfInputs('mtd', 'Bulan Ini')}
        {renderPerfInputs('ytd', 'Year-to-Date')}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-6">
        <Button variant="text" onClick={onCancel} className="flex-1">
          Batal
        </Button>
        <Button variant="filled" iconLeft={Save} onClick={save} className="flex-1">
          Simpan
        </Button>
      </div>
    </Card>
  );
}

function AdminAgentsTab() {
  const { agents } = useApp();
  const [editingId, setEditingId] = useState(null);
  const [savedFlash, setSavedFlash] = useState(false);

  const editingAgent = editingId ? agents.find((a) => a.id === editingId) : null;

  if (editingAgent) {
    return (
      <AgentEditCard
        agent={editingAgent}
        onCancel={() => setEditingId(null)}
        onSaved={() => {
          setEditingId(null);
          setSavedFlash(true);
          setTimeout(() => setSavedFlash(false), 2000);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[1.75rem] md:text-[2.25rem] font-medium text-md-on-surface tracking-[-0.01em]">
          Senarai Ejen
        </h1>
        <p className="text-md-on-surface-variant mt-1.5">
          Klik pada ejen untuk mengedit prestasi (ANC, FYC, PR, CPD) dan ranking.
        </p>
      </div>

      {savedFlash && (
        <div className="bg-md-success-container text-md-success text-sm px-4 py-3 rounded-2xl">
          Maklumat ejen berjaya disimpan.
        </div>
      )}

      <div className="space-y-3">
        {agents.map((agent) => (
          <AgentListRow key={agent.id} agent={agent} onEdit={setEditingId} />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   LMS TAB
   ──────────────────────────────────────────────────────────────────────── */
function AdminLMSTab() {
  const {
    trainingModules,
    updateTrainingModule,
    addTrainingModule,
    removeTrainingModule,
  } = useApp();

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

  const saveEdit = (id) => {
    updateTrainingModule(id, {
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
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-[1.75rem] md:text-[2.25rem] font-medium text-md-on-surface tracking-[-0.01em]">
            Pengurusan Latihan
          </h1>
          <p className="text-md-on-surface-variant mt-1.5">
            Tambah, edit atau buang modul latihan.
          </p>
        </div>
        <Button
          variant="filled"
          iconLeft={showAdd ? X : Plus}
          onClick={() => setShowAdd((v) => !v)}
        >
          {showAdd ? 'Batal' : 'Tambah Modul'}
        </Button>
      </div>

      {/* Add new */}
      {showAdd && (
        <Card radius="xl" className="p-6 ring-1 ring-md-primary/30">
          <h3 className="font-medium text-md-on-surface mb-4">Modul Latihan Baru</h3>
          <div className="space-y-4">
            <Field label="Tajuk Modul" required>
              <Input
                value={newDraft.title}
                onChange={(e) => setNewDraft({ ...newDraft, title: e.target.value })}
                placeholder="Cth: Handling Tak Mampu Objections"
              />
            </Field>
            <Field label="Penerangan">
              <Textarea
                rows={2}
                value={newDraft.description}
                onChange={(e) => setNewDraft({ ...newDraft, description: e.target.value })}
                placeholder="Penerangan ringkas modul"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Tempoh">
                <Input
                  value={newDraft.duration}
                  onChange={(e) => setNewDraft({ ...newDraft, duration: e.target.value })}
                  placeholder="Cth: 25 min"
                />
              </Field>
              <Field label="Nota Video">
                <Input
                  value={newDraft.videoNotes}
                  onChange={(e) => setNewDraft({ ...newDraft, videoNotes: e.target.value })}
                  placeholder="Pilihan"
                />
              </Field>
            </div>
            <Button
              variant="filled"
              iconLeft={Plus}
              disabled={!newDraft.title.trim()}
              onClick={handleAdd}
              className="w-full"
            >
              Tambah Modul
            </Button>
          </div>
        </Card>
      )}

      {/* Module list */}
      <div className="space-y-3">
        {trainingModules.map((mod) => {
          const isEditing = editingId === mod.id;
          if (isEditing) {
            return (
              <Card key={mod.id} radius="xl" className="p-6 ring-1 ring-md-primary/30">
                <div className="space-y-4">
                  <Field label="Tajuk">
                    <Input
                      value={draft.title}
                      onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    />
                  </Field>
                  <Field label="Penerangan">
                    <Textarea
                      rows={2}
                      value={draft.description}
                      onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                    />
                  </Field>
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Tempoh">
                      <Input
                        value={draft.duration}
                        onChange={(e) => setDraft({ ...draft, duration: e.target.value })}
                      />
                    </Field>
                    <Field label="Status">
                      <Select
                        value={draft.status}
                        onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                      >
                        <option value="Not Started">Belum Mula</option>
                        <option value="In Progress">Sedang Dipelajari</option>
                        <option value="Completed">Selesai</option>
                      </Select>
                    </Field>
                    <Field label="Progres %">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={draft.progress}
                        onChange={(e) => setDraft({ ...draft, progress: e.target.value })}
                      />
                    </Field>
                  </div>
                  <Field label="Nota Video">
                    <Textarea
                      rows={2}
                      value={draft.videoNotes}
                      onChange={(e) => setDraft({ ...draft, videoNotes: e.target.value })}
                    />
                  </Field>
                  <div className="flex gap-2">
                    <Button variant="text" onClick={() => setEditingId(null)} className="flex-1">
                      Batal
                    </Button>
                    <Button
                      variant="filled"
                      iconLeft={Save}
                      onClick={() => saveEdit(mod.id)}
                      className="flex-1"
                    >
                      Simpan
                    </Button>
                  </div>
                </div>
              </Card>
            );
          }

          const statusStyles = {
            'In Progress': 'bg-md-primary-container text-md-on-primary-container',
            'Completed': 'bg-md-success-container text-md-success',
            'Not Started': 'bg-md-surface-container-high text-md-on-surface-variant',
          }[mod.status];

          return (
            <Card key={mod.id} radius="lg" className="p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-md-primary" />
                    <h3 className="font-medium text-md-on-surface text-sm">{mod.title}</h3>
                  </div>
                  <p className="text-xs text-md-on-surface-variant leading-relaxed">
                    {mod.description}
                  </p>
                </div>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles}`}>
                  {statusBM[mod.status] || mod.status}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-md-outline-variant">
                <div className="flex items-center gap-3 text-xs text-md-on-surface-variant">
                  <span>{mod.duration}</span>
                  <span>·</span>
                  <span>{mod.progress}% progres</span>
                </div>
                <div className="flex gap-1.5">
                  <Button variant="tonal" size="sm" iconLeft={Edit} onClick={() => startEdit(mod)}>
                    Edit
                  </Button>
                  <button
                    onClick={() => {
                      if (confirm(`Padam modul "${mod.title}"?`)) {
                        removeTrainingModule(mod.id);
                      }
                    }}
                    className="h-9 w-9 inline-flex items-center justify-center rounded-full text-md-error hover:bg-md-error-container active:scale-95 transition-all md-emphasized"
                    aria-label={`Padam ${mod.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}

        {trainingModules.length === 0 && (
          <div className="text-center py-12 text-md-on-surface-variant text-sm">
            Tiada modul lagi. Klik "Tambah Modul" untuk membuat satu.
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   APPLICATIONS TAB
   ──────────────────────────────────────────────────────────────────────── */
function AdminApplicationsTab() {
  const { applications } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[1.75rem] md:text-[2.25rem] font-medium text-md-on-surface tracking-[-0.01em]">
          Permohonan Sertai
        </h1>
        <p className="text-md-on-surface-variant mt-1.5">
          Senarai permohonan dari calon ejen baru.
        </p>
      </div>

      {applications.length === 0 ? (
        <Card radius="xl" className="p-12 text-center">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-md-surface-container-high items-center justify-center mb-4">
            <UserPlus className="w-6 h-6 text-md-on-surface-variant" />
          </div>
          <p className="text-md-on-surface font-medium">Belum ada permohonan diterima.</p>
          <p className="text-sm text-md-on-surface-variant mt-1">
            Permohonan dari borang "Sertai Kami" akan muncul di sini.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.map((app) => (
            <Card key={app.id} radius="lg" className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-md-primary text-md-on-primary flex items-center justify-center">
                    <span className="text-base font-medium">
                      {app.nama.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-md-on-surface text-sm">{app.nama}</h3>
                    <p className="text-xs text-md-on-surface-variant">
                      Umur: {app.umur} tahun
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-medium bg-md-primary-container text-md-on-primary-container px-2.5 py-1 rounded-full">
                  {app.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                {[
                  { Icon: Briefcase, value: app.pekerjaan },
                  { Icon: GraduationCap, value: app.pendidikan },
                  { Icon: MapPin, value: app.negeri },
                ].map(({ Icon, value }, i) => (
                  <div key={i} className="flex items-center gap-2 text-md-on-surface">
                    <Icon className="w-3.5 h-3.5 text-md-on-surface-variant flex-shrink-0" />
                    <span className="text-xs">{value}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-md-on-surface-variant pt-2 border-t border-md-outline-variant">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-xs">Dihantar: {app.createdAt}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   ADMIN PORTAL — MAIN SHELL
   ──────────────────────────────────────────────────────────────────────── */
const adminTabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'agents', label: 'Ejen', icon: Users },
  { id: 'lms', label: 'Latihan', icon: BookOpen },
  { id: 'applications', label: 'Permohonan', icon: UserPlus },
];

function SidebarItem({ active, icon: Icon, label, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={[
        'relative w-full flex items-center gap-3 px-4 h-12 rounded-full text-sm font-medium',
        'transition-all duration-300 md-emphasized active:scale-[0.98]',
        active
          ? 'bg-md-inverse-primary text-md-inverse-surface shadow-md-1'
          : 'text-md-inverse-on-surface/75 hover:bg-white/5 hover:text-md-inverse-on-surface',
      ].join(' ')}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge > 0 && (
        <span
          className={[
            'min-w-[20px] h-5 inline-flex items-center justify-center px-1.5 text-[10px] font-bold rounded-full',
            active
              ? 'bg-md-inverse-surface text-md-inverse-primary'
              : 'bg-md-error text-md-on-error',
          ].join(' ')}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function SidebarContent({ onItemClick }) {
  const { activeTab, setActiveTab, logout, applications } = useApp();

  return (
    <>
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-white/5">
        <Logo className="w-9 h-9" />
        <div className="min-w-0">
          <span className="text-base font-medium text-md-inverse-on-surface block leading-tight tracking-[-0.01em]">
            Annur Agency
          </span>
          <span className="text-[11px] text-md-inverse-primary leading-tight">
            Konsol Admin
          </span>
        </div>
      </div>

      <div className="px-4 py-4 border-b border-white/5">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-md-inverse-primary text-md-inverse-surface flex items-center justify-center">
            <UserCircle className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-md-inverse-on-surface">Pentadbir</p>
            <p className="text-xs text-md-inverse-on-surface/60">Akses penuh</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {adminTabs.map(({ id, label, icon }) => (
          <SidebarItem
            key={id}
            active={activeTab === id}
            icon={icon}
            label={label}
            badge={id === 'applications' ? applications.length : 0}
            onClick={() => {
              setActiveTab(id);
              onItemClick?.();
            }}
          />
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/5">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 h-12 rounded-full text-sm font-medium text-md-inverse-on-surface/75 hover:bg-md-error/15 hover:text-md-error transition-all duration-300 md-emphasized active:scale-[0.98]"
        >
          <LogOut className="w-5 h-5" />
          Log Keluar
        </button>
      </div>
    </>
  );
}

export default function AdminPortal() {
  const { activeTab, setActiveTab, applications } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':     return <AdminOverviewTab goToTab={setActiveTab} />;
      case 'agents':       return <AdminAgentsTab />;
      case 'lms':          return <AdminLMSTab />;
      case 'applications': return <AdminApplicationsTab />;
      default:             return <AdminOverviewTab goToTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-md-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-72 bg-md-inverse-surface fixed inset-y-0 left-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-md-inverse-surface/70 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-md-inverse-surface flex flex-col rounded-r-[28px] overflow-hidden">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 inline-flex items-center justify-center rounded-full text-md-inverse-on-surface hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Tutup menu"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent onItemClick={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      <main className="flex-1 md:ml-72 pb-24 md:pb-0">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-30 bg-md-background/85 backdrop-blur-md border-b border-md-outline-variant px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-11 h-11 inline-flex items-center justify-center rounded-full text-md-on-surface hover:bg-md-primary/10 active:scale-95 transition-all"
            aria-label="Buka menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Logo className="w-7 h-7" />
            <span className="font-medium text-md-on-surface text-sm">Konsol Admin</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-md-primary text-md-on-primary flex items-center justify-center">
            <UserCircle className="w-5 h-5" />
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto">{renderTab()}</div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-md-inverse-surface z-40 px-3 py-2">
        <div className="flex items-center justify-around">
          {adminTabs.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            const showBadge = id === 'applications' && applications.length > 0;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                aria-current={active ? 'page' : undefined}
                className={[
                  'relative inline-flex flex-col items-center justify-center gap-0.5',
                  'min-w-[56px] min-h-[52px] px-3 py-2 rounded-full',
                  'transition-all duration-300 md-emphasized active:scale-95',
                  active
                    ? 'bg-md-inverse-primary text-md-inverse-surface'
                    : 'text-md-inverse-on-surface/65',
                ].join(' ')}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium tracking-wide">{label}</span>
                {showBadge && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 inline-flex items-center justify-center px-1 bg-md-error text-md-on-error text-[9px] font-bold rounded-full">
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
