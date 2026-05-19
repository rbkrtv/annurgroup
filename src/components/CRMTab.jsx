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

// ─── BM Status Translations ──────────────────────────────────────────────────
const statusBM = {
  All: 'Semua',
  New: 'Baru',
  Contacted: 'Dihubungi',
  Presentation: 'Pembentangan',
  Closing: 'Penutupan',
  KIV: 'KIV',
};

// ─── AI WhatsApp Analyzer ────────────────────────────────────────────────────
function AIAnalyzer() {
  const [conversation, setConversation] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!conversation.trim()) return;
    setLoading(true);
    setAnalysis('');

    // Simulate AI processing delay
    setTimeout(() => {
      setAnalysis(
        `**Bantahan Dikenalpasti:** Prospek menunjukkan rintangan harga dan keraguan kepercayaan.\n\n` +
        `**Strategi Penutupan Disyorkan:**\n\n` +
        `1. **Akui & Sahkan** — "Saya faham, memang ramai yang rasa macam tu pada awalnya..."\n\n` +
        `2. **Susun Semula Kos** — Pecahkan sumbangan bulanan kepada jumlah harian: "Sebenarnya, perlindungan ni hanya RM3.50 sehari — kurang dari harga kopi."\n\n` +
        `3. **Gunakan Bukti Sosial** — "Client saya Puan Aminah pun dulu rasa sama, tapi lepas claim RM45,000 untuk hospital bill anak dia, dia sangat bersyukur."\n\n` +
        `4. **Cipta Urgensi** — "Inflasi perubatan naik 15% setahun. Kalau tunggu lagi setahun, premium akan lebih tinggi dan ada risiko health declaration tak lepas."\n\n` +
        `5. **Penutupan Lembut** — "Apa kata kita tengok plan yang paling basic dulu? Tak ada commitment, saya just nak tunjuk options yang ada."\n\n` +
        `**Nasihat Nada:** Kekal mesra dan berperanan sebagai penasihat. Elakkan menjadi terlalu memaksa — anda penasihat, bukan jurujual.`
      );
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-amber-600" />
        <h2 className="text-lg font-bold text-neutral-900">Penganalisis Penutupan WhatsApp AI</h2>
      </div>
      <p className="text-sm text-neutral-500 mb-4">
        Tampal perbualan WhatsApp yang sukar dan dapatkan skrip pengendalian bantahan berkuasa AI.
      </p>

      <textarea
        value={conversation}
        onChange={(e) => setConversation(e.target.value)}
        placeholder="Tampal perbualan WhatsApp anda di sini...&#10;&#10;Contoh:&#10;Prospek: Saya rasa tak mampu la, gaji pun tak banyak...&#10;Prospek: Lagipun saya masih muda, tak perlu insurance lagi kot..."
        className="w-full h-32 px-4 py-3 rounded-xl border border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-sm resize-none"
      />

      <button
        onClick={handleAnalyze}
        disabled={!conversation.trim() || loading}
        className="mt-3 inline-flex items-center gap-2 bg-black hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed text-amber-400 font-semibold px-5 py-3 rounded-xl transition-all min-h-[44px]"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Menganalisis...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" /> Analisis dengan AI
          </>
        )}
      </button>

      {analysis && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <h3 className="font-bold text-neutral-900 text-sm mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" /> Cadangan AI:
          </h3>
          <div className="text-sm text-neutral-800 whitespace-pre-line leading-relaxed">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Lead Status Badge ───────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const styles = {
    New: 'bg-blue-50 text-blue-700 border-blue-200',
    Contacted: 'bg-amber-50 text-amber-700 border-amber-200',
    Presentation: 'bg-purple-50 text-purple-700 border-purple-200',
    Closing: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    KIV: 'bg-neutral-100 text-neutral-600 border-neutral-200',
  };

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${styles[status] || styles.New}`}>
      {statusBM[status] || status}
    </span>
  );
}

// ─── Main CRM Tab ────────────────────────────────────────────────────────────
export default function CRMTab() {
  const { leads, updateLeadStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState('All');

  const statuses = ['All', 'New', 'Contacted', 'Presentation', 'Closing', 'KIV'];

  const filteredLeads =
    filterStatus === 'All' ? leads : leads.filter((l) => l.status === filterStatus);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Senarai Prospek</h1>
        <p className="text-neutral-500 mt-1">Urus dan jejak saluran prospek anda.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-neutral-400 flex-shrink-0" />
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all min-h-[36px] ${
              filterStatus === status
                ? 'bg-black text-amber-400'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {statusBM[status]}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-100">
              <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-5 py-3">Nama</th>
              <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-5 py-3">Telefon</th>
              <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-5 py-3">Tarikh</th>
              <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-5 py-3">Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                <td className="px-5 py-4">
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">{lead.name}</p>
                    <p className="text-xs text-neutral-400">{lead.email}</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                    <Phone className="w-3.5 h-3.5" />
                    {lead.phone}
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-neutral-500">{lead.createdAt}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-5 py-4">
                  <div className="relative">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className="appearance-none bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-700 pr-7 cursor-pointer focus:outline-none focus:border-amber-500 min-h-[36px]"
                    >
                      {statuses.filter((s) => s !== 'All').map((s) => (
                        <option key={s} value={s}>{statusBM[s]}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <div className="text-center py-8 text-neutral-400 text-sm">
            Tiada prospek dijumpai untuk penapis ini.
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-neutral-900">{lead.name}</p>
                <p className="text-xs text-neutral-400">{lead.email}</p>
              </div>
              <StatusBadge status={lead.status} />
            </div>
            <div className="flex items-center gap-1.5 text-sm text-neutral-600 mb-3">
              <Phone className="w-3.5 h-3.5" />
              {lead.phone}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">{lead.createdAt}</span>
              <select
                value={lead.status}
                onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                className="appearance-none bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-700 cursor-pointer focus:outline-none focus:border-amber-500 min-h-[36px]"
              >
                {statuses.filter((s) => s !== 'All').map((s) => (
                  <option key={s} value={s}>{statusBM[s]}</option>
                ))}
              </select>
            </div>
          </div>
        ))}

        {filteredLeads.length === 0 && (
          <div className="text-center py-8 text-neutral-400 text-sm">
            Tiada prospek dijumpai untuk penapis ini.
          </div>
        )}
      </div>

      {/* Lead count */}
      <div className="flex items-center gap-2 text-sm text-neutral-500">
        <Users className="w-4 h-4" />
        <span>Memaparkan <strong>{filteredLeads.length}</strong> daripada <strong>{leads.length}</strong> prospek</span>
      </div>

      {/* AI Analyzer */}
      <AIAnalyzer />
    </div>
  );
}
