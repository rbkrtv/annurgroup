import { useState } from 'react';
import {
  Users,
  Phone,
  Filter,
  Loader2,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button, Card, Textarea } from './ui';

const statusBM = {
  All: 'Semua',
  New: 'Baru',
  Contacted: 'Dihubungi',
  Presentation: 'Pembentangan',
  Closing: 'Penutupan',
  KIV: 'KIV',
};

/* Status chip — colour-coded per pipeline stage */
function StatusChip({ status }) {
  const styles = {
    New: 'bg-md-secondary-container text-md-on-secondary-container',
    Contacted: 'bg-md-primary-container text-md-on-primary-container',
    Presentation: 'bg-md-tertiary-container text-md-on-tertiary-container',
    Closing: 'bg-md-success-container text-md-success',
    KIV: 'bg-md-surface-container-high text-md-on-surface-variant',
  }[status];

  return (
    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${styles}`}>
      {statusBM[status] || status}
    </span>
  );
}

/* ─── Filter pills ─────────────────────────────────────────────────── */
function FilterPills({ value, onChange, options }) {
  return (
    <div
      role="tablist"
      className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1"
    >
      <Filter className="w-4 h-4 text-md-on-surface-variant flex-shrink-0" />
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt)}
            className={[
              'h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap',
              'transition-all duration-300 md-emphasized active:scale-95',
              active
                ? 'bg-md-inverse-surface text-md-inverse-primary shadow-md-1'
                : 'bg-md-surface-container text-md-on-surface-variant hover:bg-md-surface-container-high',
            ].join(' ')}
          >
            {statusBM[opt]}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Status select (used in row + card) ───────────────────────────── */
function StatusSelect({ value, onChange, statuses }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="appearance-none bg-md-surface-container-low border-0 border-b-2 border-md-outline rounded-t-lg rounded-b-none pl-3 pr-8 h-9 text-xs font-medium text-md-on-surface focus:border-md-primary focus:outline-none focus:bg-md-surface-container transition-colors"
      >
        {statuses.filter((s) => s !== 'All').map((s) => (
          <option key={s} value={s}>{statusBM[s]}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-md-on-surface-variant pointer-events-none" />
    </div>
  );
}

/* ─── AI Analyzer ──────────────────────────────────────────────────── */
function AIAnalyzer() {
  const [conversation, setConversation] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!conversation.trim()) return;
    setLoading(true);
    setAnalysis('');

    setTimeout(() => {
      setAnalysis(
        `**Bantahan Dikenalpasti:** Prospek menunjukkan rintangan harga dan keraguan kepercayaan.\n\n` +
        `**Strategi Penutupan Disyorkan:**\n\n` +
        `1. **Akui & Sahkan** — "Saya faham, memang ramai yang rasa macam tu pada awalnya..."\n\n` +
        `2. **Susun Semula Kos** — Pecahkan sumbangan bulanan kepada jumlah harian: "Sebenarnya, perlindungan ni hanya RM3.50 sehari — kurang dari harga kopi."\n\n` +
        `3. **Gunakan Bukti Sosial** — "Client saya Puan Aminah pun dulu rasa sama, tapi lepas claim RM45,000 untuk hospital bill anak dia, dia sangat bersyukur."\n\n` +
        `4. **Cipta Urgensi** — "Inflasi perubatan naik 15% setahun. Kalau tunggu lagi setahun, premium akan lebih tinggi dan ada risiko health declaration tak lepas."\n\n` +
        `5. **Penutupan Lembut** — "Apa kata kita tengok plan yang paling basic dulu? Tak ada commitment, saya just nak tunjuk options yang ada."\n\n` +
        `**Nasihat Nada:** Kekal mesra dan berperanan sebagai penasihat. Elakkan menjadi terlalu memaksa.`
      );
      setLoading(false);
    }, 2200);
  };

  return (
    <Card radius="lg" className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-2xl bg-md-tertiary-container text-md-on-tertiary-container flex items-center justify-center">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-medium text-md-on-surface">
            Penganalisis Penutupan WhatsApp AI
          </h2>
          <p className="text-xs text-md-on-surface-variant">
            Tampal perbualan untuk skrip pengendalian bantahan
          </p>
        </div>
      </div>

      <Textarea
        value={conversation}
        onChange={(e) => setConversation(e.target.value)}
        placeholder={
          'Tampal perbualan WhatsApp anda di sini...\n\nContoh:\nProspek: Saya rasa tak mampu la, gaji pun tak banyak...\nProspek: Lagipun saya masih muda, tak perlu insurance lagi kot...'
        }
        rows={5}
        className="text-sm"
      />

      <div className="mt-3">
        <Button
          variant="filled"
          iconLeft={loading ? Loader2 : Sparkles}
          disabled={!conversation.trim() || loading}
          onClick={handleAnalyze}
          className={loading ? '[&>svg]:animate-spin' : ''}
        >
          {loading ? 'Menganalisis...' : 'Analisis dengan AI'}
        </Button>
      </div>

      {analysis && (
        <div className="mt-5 p-5 bg-md-tertiary-container text-md-on-tertiary-container rounded-2xl">
          <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Cadangan AI:
          </h3>
          <div className="text-sm whitespace-pre-line leading-relaxed">
            {analysis}
          </div>
        </div>
      )}
    </Card>
  );
}

/* ─── Main CRM ─────────────────────────────────────────────────────── */
export default function CRMTab() {
  const { leads, updateLeadStatus } = useApp();
  const [filter, setFilter] = useState('All');

  const statuses = ['All', 'New', 'Contacted', 'Presentation', 'Closing', 'KIV'];
  const filtered = filter === 'All' ? leads : leads.filter((l) => l.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[1.75rem] md:text-[2.25rem] font-medium text-md-on-surface tracking-[-0.01em]">
          Senarai Prospek
        </h1>
        <p className="text-md-on-surface-variant mt-1.5">
          Urus dan jejak saluran prospek anda.
        </p>
      </div>

      <FilterPills value={filter} onChange={setFilter} options={statuses} />

      {/* Desktop table */}
      <Card radius="lg" className="hidden md:block overflow-hidden p-0">
        <table className="w-full">
          <thead>
            <tr className="bg-md-surface-container-high">
              {['Nama', 'Telefon', 'Tarikh', 'Status', 'Tindakan'].map((h) => (
                <th
                  key={h}
                  className="text-left text-xs font-medium text-md-on-surface-variant uppercase tracking-wider px-5 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr
                key={lead.id}
                className="border-t border-md-outline-variant hover:bg-md-primary/5 transition-colors"
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-md-on-surface text-sm">{lead.name}</p>
                  <p className="text-xs text-md-on-surface-variant">{lead.email}</p>
                </td>
                <td className="px-5 py-4">
                  <div className="inline-flex items-center gap-1.5 text-sm text-md-on-surface">
                    <Phone className="w-3.5 h-3.5 text-md-on-surface-variant" />
                    {lead.phone}
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-md-on-surface-variant">
                  {lead.createdAt}
                </td>
                <td className="px-5 py-4"><StatusChip status={lead.status} /></td>
                <td className="px-5 py-4">
                  <StatusSelect
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                    statuses={statuses}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-md-on-surface-variant text-sm">
            Tiada prospek dijumpai untuk penapis ini.
          </div>
        )}
      </Card>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((lead) => (
          <Card key={lead.id} radius="lg" className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="min-w-0">
                <p className="font-medium text-md-on-surface truncate">{lead.name}</p>
                <p className="text-xs text-md-on-surface-variant truncate">{lead.email}</p>
              </div>
              <StatusChip status={lead.status} />
            </div>
            <div className="flex items-center gap-1.5 text-sm text-md-on-surface mb-3">
              <Phone className="w-3.5 h-3.5 text-md-on-surface-variant" />
              {lead.phone}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-md-on-surface-variant">{lead.createdAt}</span>
              <StatusSelect
                value={lead.status}
                onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                statuses={statuses}
              />
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-md-on-surface-variant text-sm">
            Tiada prospek dijumpai untuk penapis ini.
          </div>
        )}
      </div>

      <p className="inline-flex items-center gap-2 text-sm text-md-on-surface-variant">
        <Users className="w-4 h-4" />
        Memaparkan <strong className="text-md-on-surface">{filtered.length}</strong>{' '}
        daripada <strong className="text-md-on-surface">{leads.length}</strong> prospek
      </p>

      <AIAnalyzer />
    </div>
  );
}
