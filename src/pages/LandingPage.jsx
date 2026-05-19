import { useState } from 'react';
import {
  Shield,
  Heart,
  TrendingUp,
  Users,
  Award,
  Target,
  Star,
  ArrowRight,
  HeartPulse,
  Gift,
  Activity,
  PiggyBank,
  ShieldCheck,
  CheckCircle,
  UserPlus,
  Crown,
  LogIn,
  Send,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockTeamMembers, mockServices, mockGallery } from '../data/mockData';
import Logo from '../components/Logo';

// Map service icon name → Lucide component
const serviceIconMap = {
  HeartPulse,
  Gift,
  Activity,
  PiggyBank,
  ShieldCheck,
};

// Translate service titles & descriptions to BM
const serviceCopy = {
  'svc-1': {
    title: 'Kad Perubatan',
    desc: 'Perlindungan hospital komprehensif dengan kemasukan tanpa wang pendahuluan dan had tahunan tanpa limit.',
    highlights: ['Kemasukan tanpa wang pendahuluan', 'Perlindungan seluruh dunia', 'Had tahunan sehingga RM2 juta'],
  },
  'svc-2': {
    title: 'Hibah Takaful',
    desc: 'Pelan pemindahan harta patuh Syariah memastikan orang tersayang mewarisi tanpa kelewatan undang-undang.',
    highlights: ['Mengikut Faraid', 'Pengeluaran cepat', 'Tiada proses probet'],
  },
  'svc-3': {
    title: 'Penyakit Kritikal',
    desc: 'Bayaran sekaligus apabila didiagnosis dengan 36+ penyakit kritikal termasuk kanser, serangan jantung dan strok.',
    highlights: ['36 penyakit dilindungi', 'Bayaran sekaligus', 'Perlindungan peringkat awal'],
  },
  'svc-4': {
    title: 'Pelan Simpanan',
    desc: 'Simpanan jangka panjang dengan elemen perlindungan. Bina kekayaan sambil melindungi keluarga.',
    highlights: ['Pulangan terjamin', 'Tambahan fleksibel', 'Perlindungan disertakan'],
  },
  'svc-5': {
    title: 'Kemalangan',
    desc: 'Perlindungan kemalangan peribadi memberi bantuan kewangan untuk kecederaan dan ketidakupayaan.',
    highlights: ['Perlindungan 24/7', 'Manfaat kematian akibat kemalangan', 'Pendapatan ketidakupayaan'],
  },
};

// Translate gallery
const galleryCopy = {
  'g-1': { title: 'Pencapaian Agensi', desc: 'Kejayaan dan anugerah Annur Agency.' },
};

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const { setLoginModalOpen } = useApp();

  return (
    <nav className="bg-black border-b border-neutral-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Logo className="w-9 h-9" />
          <span className="text-lg font-bold text-white">Annur Agency</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-neutral-300 hover:text-amber-400 text-sm transition-colors">Tentang</a>
          <a href="#team" className="text-neutral-300 hover:text-amber-400 text-sm transition-colors">Pasukan</a>
          <a href="#services" className="text-neutral-300 hover:text-amber-400 text-sm transition-colors">Perkhidmatan</a>
          <a href="#gallery" className="text-neutral-300 hover:text-amber-400 text-sm transition-colors">Galeri</a>
          <a href="#join" className="text-neutral-300 hover:text-amber-400 text-sm transition-colors">Sertai Kami</a>
          <button
            onClick={() => setLoginModalOpen(true)}
            className="bg-amber-500 hover:bg-amber-600 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-all"
          >
            Log Masuk
          </button>
        </div>
        <button
          onClick={() => setLoginModalOpen(true)}
          className="md:hidden bg-amber-500 hover:bg-amber-600 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-all min-h-[44px]"
        >
          Log Masuk
        </button>
      </div>
    </nav>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function HeroSection() {
  const { setLoginModalOpen } = useApp();

  return (
    <section className="relative bg-gradient-to-br from-black via-neutral-900 to-neutral-800 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">Perlindungan Patuh Syariah</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Lindungi Masa Depan Keluarga Anda dengan{' '}
            <span className="text-amber-400">Takaful</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Perlindungan kewangan, pemeliharaan kekayaan dan keselamatan keluarga — semuanya
            berlandaskan prinsip kerjasama dan tanggungjawab bersama.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#join"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-4 rounded-xl transition-all min-h-[44px]"
            >
              Sertai Agensi Kami
              <ArrowRight className="w-5 h-5" />
            </a>
            <button
              onClick={() => setLoginModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 border border-amber-500/50 hover:border-amber-500 hover:bg-amber-500/10 text-amber-400 font-semibold px-8 py-4 rounded-xl transition-all min-h-[44px]"
            >
              <LogIn className="w-5 h-5" />
              Log Masuk Ejen
            </button>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Users, label: '500+ Keluarga Dilindungi' },
            { icon: Award, label: 'Agensi Terbaik 2025' },
            { icon: Star, label: 'Penilaian 4.9/5' },
            { icon: Target, label: 'Tuntutan 98% Berjaya' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="text-center">
              <Icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-sm text-neutral-300">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Us Section ────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-amber-600 tracking-wider uppercase">Tentang Kami</span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2 mb-4">
            Siapa Kami
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Annur Agency ialah agensi Takaful terkemuka yang dedikasi menyediakan penyelesaian
            perlindungan kewangan patuh Syariah. Kami memperkasa keluarga Malaysia dengan ketenangan
            jiwa melalui perancangan Takaful yang beretika, telus dan diperibadikan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: 'Amanah', desc: 'Kami berpegang pada standard integriti tertinggi dalam setiap interaksi dan cadangan.' },
            { icon: Heart, title: 'Ihsan', desc: 'Melangkaui yang biasa — memberi perkhidmatan luar biasa dan keprihatinan tulus untuk setiap pelanggan.' },
            { icon: TrendingUp, title: 'Istiqamah', desc: 'Komited kepada hubungan jangka panjang, bukan transaksi sekali sahaja.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-6 rounded-2xl bg-gradient-to-b from-neutral-50 to-white border border-neutral-100">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-xl mb-4">
                <Icon className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
              <p className="text-neutral-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Our Team Section ────────────────────────────────────────────────────────
function TeamSection() {
  const groupManagers = mockTeamMembers.filter((m) => m.tier === 'group');
  const agencyManagers = mockTeamMembers.filter((m) => m.tier === 'agency');

  // Render a single member card with photo
  const renderMember = (member, sizeClass = 'w-32 h-32') => (
    <div
      key={member.id}
      className="text-center p-5 bg-white rounded-2xl border border-neutral-100 hover:border-amber-300 hover:shadow-lg transition-all"
    >
      <div
        className={`${sizeClass} rounded-full mx-auto mb-3 overflow-hidden ring-4 ring-amber-100 shadow-lg bg-neutral-100`}
      >
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-base font-bold text-neutral-900">{member.name}</h3>
      <p className="text-amber-600 font-medium text-sm mb-2">{member.role}</p>
      <p className="text-neutral-500 text-xs leading-relaxed">{member.desc}</p>
    </div>
  );

  return (
    <section id="team" className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-amber-600 tracking-wider uppercase">Pasukan Kami</span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2 mb-4">
            Kepimpinan & Pengurus
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Temui pemimpin berpengalaman yang mendorong misi Annur Agency ke hadapan.
          </p>
        </div>

        {/* Group Managers (GM) */}
        <div className="mb-14">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Crown className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-neutral-900">Group Manager (GM)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {groupManagers.map((m) => renderMember(m, 'w-32 h-32'))}
          </div>
        </div>

        {/* Agency Managers (AM) */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-neutral-900">Agency Manager (AM)</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agencyManagers.map((m) => renderMember(m, 'w-28 h-28'))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-amber-600 tracking-wider uppercase">Perkhidmatan Kami</span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2 mb-4">
            Pelan Perlindungan yang Kami Tawarkan
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Penyelesaian Takaful komprehensif yang sesuai untuk setiap peringkat hidup dan keperluan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockServices.map((service) => {
            const Icon = serviceIconMap[service.icon] || Shield;
            const copy = serviceCopy[service.id] || {};
            return (
              <div
                key={service.id}
                className="group bg-gradient-to-br from-white to-neutral-50 rounded-2xl p-6 border border-neutral-100 hover:border-amber-300 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-black" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{copy.title || service.title}</h3>
                <p className="text-neutral-600 text-sm mb-4">{copy.desc || service.desc}</p>
                <ul className="space-y-1.5">
                  {(copy.highlights || service.highlights).map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-neutral-700">
                      <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Section ─────────────────────────────────────────────────────────
function GallerySection() {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-amber-600 tracking-wider uppercase">Galeri</span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2 mb-4">
            Detik & Pencapaian
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Sekilas pandang acara, latihan dan impak komuniti agensi kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockGallery.map((item) => {
            const copy = galleryCopy[item.id] || item;
            return (
              <div
                key={item.id}
                className="group relative aspect-[4/3] bg-black rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
              >
                {item.photo ? (
                  <img
                    src={item.photo}
                    alt={copy.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-7xl bg-gradient-to-br from-black via-neutral-900 to-amber-900">
                    {item.emoji}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
                  <h3 className="text-white font-bold text-sm md:text-base">{copy.title}</h3>
                  <p className="text-amber-400 text-xs mt-0.5">{copy.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Apply Form Section ──────────────────────────────────────────────────────
const NEGERI_LIST = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang',
  'Pulau Pinang', 'Perak', 'Perlis', 'Sabah', 'Sarawak', 'Selangor',
  'Terengganu', 'Kuala Lumpur', 'Labuan', 'Putrajaya',
];

const EDUCATION_LEVELS = [
  'SPM', 'STPM / Matrikulasi / Asasi', 'Diploma', 'Ijazah Sarjana Muda',
  'Sarjana', 'PhD / Kedoktoran', 'Lain-lain',
];

function ApplyForm() {
  const { addApplication } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    umur: '',
    pekerjaan: '',
    pendidikan: '',
    negeri: '',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canSubmit =
    formData.nama && formData.umur && formData.pekerjaan && formData.pendidikan && formData.negeri;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    addApplication(formData);
    setSubmitted(true);
    console.log('[Permohonan Diterima]', formData);
  };

  if (submitted) {
    return (
      <div className="bg-white/10 backdrop-blur border border-amber-500/30 rounded-2xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Permohonan Diterima!</h3>
        <p className="text-neutral-300 mb-4">
          Terima kasih, <strong className="text-amber-400">{formData.nama}</strong>. Pengurus
          perekrut kami akan menghubungi anda dalam masa 24 jam.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ nama: '', umur: '', pekerjaan: '', pendidikan: '', negeri: '' });
          }}
          className="text-amber-400 hover:text-amber-300 text-sm font-semibold underline"
        >
          Hantar permohonan lain
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-8 space-y-4"
    >
      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
        <Send className="w-5 h-5 text-amber-400" />
        Borang Permohonan
      </h3>
      <p className="text-sm text-neutral-300 mb-4">
        Isikan maklumat anda di bawah. Kami akan hubungi anda dalam masa 24 jam.
      </p>

      {/* Nama */}
      <div>
        <label className="block text-sm font-medium text-amber-200 mb-1">Nama Penuh *</label>
        <input
          type="text"
          value={formData.nama}
          onChange={(e) => updateField('nama', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none text-white placeholder:text-neutral-500 transition-all"
          placeholder="Cth: Ahmad bin Ali"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Umur */}
        <div>
          <label className="block text-sm font-medium text-amber-200 mb-1">Umur *</label>
          <input
            type="number"
            value={formData.umur}
            onChange={(e) => updateField('umur', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none text-white placeholder:text-neutral-500 transition-all"
            placeholder="Cth: 28"
            min="18"
            max="65"
            required
          />
        </div>

        {/* Pekerjaan */}
        <div>
          <label className="block text-sm font-medium text-amber-200 mb-1">Pekerjaan *</label>
          <input
            type="text"
            value={formData.pekerjaan}
            onChange={(e) => updateField('pekerjaan', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none text-white placeholder:text-neutral-500 transition-all"
            placeholder="Cth: Eksekutif Pemasaran"
            required
          />
        </div>
      </div>

      {/* Pendidikan */}
      <div>
        <label className="block text-sm font-medium text-amber-200 mb-1">Tahap Pendidikan *</label>
        <select
          value={formData.pendidikan}
          onChange={(e) => updateField('pendidikan', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none text-white transition-all"
          required
        >
          <option value="" className="text-black">Pilih tahap pendidikan</option>
          {EDUCATION_LEVELS.map((lvl) => (
            <option key={lvl} value={lvl} className="text-black">{lvl}</option>
          ))}
        </select>
      </div>

      {/* Negeri */}
      <div>
        <label className="block text-sm font-medium text-amber-200 mb-1">Negeri *</label>
        <select
          value={formData.negeri}
          onChange={(e) => updateField('negeri', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none text-white transition-all"
          required
        >
          <option value="" className="text-black">Pilih negeri</option>
          {NEGERI_LIST.map((n) => (
            <option key={n} value={n} className="text-black">{n}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-xl transition-all min-h-[44px] mt-2"
      >
        <Send className="w-4 h-4" /> Hantar Permohonan
      </button>
    </form>
  );
}

// ─── Join Us Section ─────────────────────────────────────────────────────────
function JoinUsSection() {
  return (
    <section id="join" className="relative py-16 md:py-24 bg-gradient-to-br from-black via-neutral-900 to-amber-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
            <UserPlus className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">Pengambilan Dibuka</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Jadilah <span className="text-amber-400">Ejen Annur</span>
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Sertai agensi Takaful paling dinamik di Malaysia. Pendapatan tanpa had, trip insentif
            antarabangsa dan ubah kehidupan — sambil membina perniagaan anda sendiri.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
          {[
            { icon: TrendingUp, label: 'Pendapatan Tanpa Had' },
            { icon: Award, label: 'Trip Insentif' },
            { icon: Users, label: 'Komuniti Kuat' },
            { icon: Star, label: 'Latihan Penuh' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 text-center"
            >
              <Icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-sm text-white font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Apply Form */}
        <div className="max-w-2xl mx-auto">
          <ApplyForm />
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo className="w-7 h-7" />
            <span className="text-base font-bold text-white">Annur Agency</span>
          </div>
          <p className="text-neutral-400 text-sm text-center">
            &copy; 2026 Annur Agency. Penyelesaian Takaful berasaskan kewangan beretika.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Landing Page ───────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <ServicesSection />
      <GallerySection />
      <JoinUsSection />
      <Footer />
    </div>
  );
}
