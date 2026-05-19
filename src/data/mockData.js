// Mock data for the entire application — minimal seed (1 entry per category)

// Vite base URL prefix for public assets (handles GitHub Pages subpath)
const BASE = import.meta.env.BASE_URL;

// ─── Agency Team (2 GM + 4 AM) ─────────────────────────────────────────────
export const mockTeamMembers = [
  // Group Managers
  {
    id: 'gm-1',
    name: 'Saharudin Sarifdin',
    role: 'Group Manager',
    tier: 'group',
    desc: 'Pemimpin berpengalaman dalam industri Takaful, mengetuai kluster agensi terbesar.',
    photo: `${BASE}team/sahar.jpg`,
  },
  {
    id: 'gm-2',
    name: 'Hizawina Karmon',
    role: 'Group Manager',
    tier: 'group',
    desc: 'Pakar dalam Takaful keluarga dan perancangan kekayaan jangka panjang.',
    photo: `${BASE}team/wina.jpg`,
  },
  // Agency Managers
  {
    id: 'am-1',
    name: 'Suffian Suhaimi',
    role: 'Agency Manager',
    tier: 'agency',
    desc: 'Pakar perlindungan keluarga dan perancangan persaraan.',
    photo: `${BASE}team/pian.jpg`,
  },
  {
    id: 'am-2',
    name: 'Fairuz Markom',
    role: 'Agency Manager',
    tier: 'agency',
    desc: 'Pakar dalam Takaful korporat dan pelan perlindungan PKS.',
    photo: `${BASE}team/fairuz.jpg`,
  },
  {
    id: 'am-3',
    name: 'Najib Nasarudin',
    role: 'Agency Manager',
    tier: 'agency',
    desc: 'Pakar kad perubatan dan penyakit kritikal.',
    photo: `${BASE}team/najib.jpg`,
  },
  {
    id: 'am-4',
    name: 'Wahida',
    role: 'Agency Manager',
    tier: 'agency',
    desc: 'Pakar Takaful keluarga dan perancangan pendidikan anak.',
    photo: `${BASE}team/wahida.jpg`,
  },
];

// ─── Services Offered (5 plans) ────────────────────────────────────────────
export const mockServices = [
  {
    id: 'svc-1',
    title: 'Plan Medical Card',
    icon: 'HeartPulse',
    desc: 'Perlindungan hospital komprehensif dengan kemasukan tanpa wang pendahuluan dan had tahunan tinggi.',
    highlights: ['Kemasukan tanpa wang pendahuluan', 'Perlindungan seluruh dunia', 'Had tahunan sehingga RM2 juta'],
  },
  {
    id: 'svc-2',
    title: 'Plan Hibah Takaful',
    icon: 'Gift',
    desc: 'Pelan pemindahan harta patuh Syariah memastikan orang tersayang mewarisi tanpa kelewatan undang-undang.',
    highlights: ['Mengikut Faraid', 'Pengeluaran cepat', 'Tiada proses probet'],
  },
  {
    id: 'svc-3',
    title: 'Plan Sakit Kritikal',
    icon: 'Activity',
    desc: 'Bayaran sekaligus apabila didiagnosis dengan 36+ penyakit kritikal termasuk kanser, jantung dan strok.',
    highlights: ['36 penyakit dilindungi', 'Bayaran sekaligus', 'Perlindungan peringkat awal'],
  },
  {
    id: 'svc-4',
    title: 'Plan Kemalangan',
    icon: 'ShieldCheck',
    desc: 'Perlindungan kemalangan peribadi memberi bantuan kewangan untuk kecederaan dan ketidakupayaan.',
    highlights: ['Perlindungan 24/7', 'Manfaat kematian akibat kemalangan', 'Pendapatan ketidakupayaan'],
  },
  {
    id: 'svc-5',
    title: 'Plan Simpanan',
    icon: 'PiggyBank',
    desc: 'Simpanan jangka panjang dengan elemen perlindungan. Bina kekayaan sambil melindungi keluarga.',
    highlights: ['Pulangan terjamin', 'Tambahan fleksibel', 'Perlindungan disertakan'],
  },
];

// ─── Gallery (1 image) ─────────────────────────────────────────────────────
export const mockGallery = [
  {
    id: 'g-1',
    title: 'Pencapaian Agensi',
    desc: 'Kejayaan dan anugerah Annur Agency.',
    photo: `${BASE}gallery/achievement.jpg`,
  },
];

// ─── Agents (1 dummy) ──────────────────────────────────────────────────────
export const mockAgentsList = [
  {
    id: 'agent-001',
    name: 'Shah Rizal',
    rank: 'Senior Agency Manager',
    phone: '012-345 6789',
    email: 'shah@annur-agency.com',
    marketingLink: 'https://annur-agency.com/join/agentshah',
    stats: { newLeads: 0, lmsProgress: 0, agencyRank: 1 },
    performance: {
      mtd: { anc: 0, fyc: 0, pr: 0, cpd: 0 },
      ytd: { anc: 0, fyc: 0, pr: 0, cpd: 0 },
    },
  },
];

// ─── Default agent ─────────────────────────────────────────────────────────
export const mockAgentData = mockAgentsList[0];

// ─── Training Modules (1 example) ──────────────────────────────────────────
export const mockTrainingModules = [
  {
    id: 'mod-1',
    title: "Handling 'Tak Mampu' Objections",
    description: 'Master the art of reframing affordability concerns into priority conversations.',
    duration: '25 min',
    status: 'Not Started',
    progress: 0,
    videoNotes: '',
  },
];

// ─── Leads (1 dummy) ───────────────────────────────────────────────────────
export const mockLeads = [
  {
    id: 'lead-1',
    name: 'Ahmad Faizal',
    phone: '011-2233 4455',
    email: 'ahmad@email.com',
    income: 'RM5,000 - RM8,000',
    age: 32,
    clientStatus: 'New',
    introducerCode: '',
    status: 'New',
    createdAt: '2026-05-19',
  },
];

// ─── Marketing Assets (1 example) ──────────────────────────────────────────
export const mockMarketingAssets = [
  {
    id: 'asset-1',
    category: 'Posters',
    title: 'Medical Card Awareness',
    thumbnail: '🏥',
    description: 'Highlight rising medical costs and Takaful coverage benefits.',
  },
];

// ─── Quiz Questions (kept for LMS) ─────────────────────────────────────────
export const mockQuizQuestions = [
  {
    question: "What is the best response when a prospect says 'Saya tak mampu'?",
    options: [
      'Offer a cheaper plan immediately',
      'Reframe it as a priority issue, not affordability',
      'End the conversation politely',
      'Give them time to think',
    ],
    correct: 1,
  },
];
