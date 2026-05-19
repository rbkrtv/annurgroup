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
  CheckCircle2,
  UserPlus,
  Crown,
  LogIn,
  Send,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockTeamMembers, mockServices, mockGallery } from '../data/mockData';
import Logo from '../components/Logo';
import {
  Button,
  Card,
  Section,
  BlurShape,
  BlurShapeField,
  Field,
  Input,
  Select,
} from '../components/ui';

/* ────────────────────────────────────────────────────────────────────────
   Static copy / lookups
   ──────────────────────────────────────────────────────────────────────── */

const serviceIconMap = { HeartPulse, Gift, Activity, PiggyBank, ShieldCheck };

const NEGERI_LIST = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang',
  'Pulau Pinang', 'Perak', 'Perlis', 'Sabah', 'Sarawak', 'Selangor',
  'Terengganu', 'Kuala Lumpur', 'Labuan', 'Putrajaya',
];

const EDUCATION_LEVELS = [
  'SPM', 'STPM / Matrikulasi / Asasi', 'Diploma', 'Ijazah Sarjana Muda',
  'Sarjana', 'PhD / Kedoktoran', 'Lain-lain',
];

/* ────────────────────────────────────────────────────────────────────────
   Navbar — sticky, glass-morphic, switches to dark/inverse
   ──────────────────────────────────────────────────────────────────────── */
function Navbar() {
  const { setLoginModalOpen } = useApp();
  const links = [
    { href: '#about', label: 'Tentang' },
    { href: '#team', label: 'Pasukan' },
    { href: '#services', label: 'Perkhidmatan' },
    { href: '#gallery', label: 'Galeri' },
    { href: '#join', label: 'Sertai Kami' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-md-inverse-surface/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo className="w-9 h-9" />
          <span className="text-base font-medium text-md-inverse-on-surface tracking-[-0.01em]">
            Annur Agency
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-md-inverse-on-surface/70 hover:text-md-inverse-on-surface px-3 py-2 rounded-full transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Button
          variant="inverse"
          size="sm"
          iconLeft={LogIn}
          onClick={() => setLoginModalOpen(true)}
        >
          Log Masuk
        </Button>
      </div>
    </nav>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Hero — atmospheric dark surface with gold glow
   ──────────────────────────────────────────────────────────────────────── */
function HeroSection() {
  const { setLoginModalOpen } = useApp();

  const trust = [
    { icon: Users, label: '500+ Keluarga Dilindungi' },
    { icon: Award, label: 'Agensi Terbaik 2025' },
    { icon: Star, label: 'Penilaian 4.9/5' },
    { icon: Target, label: '98% Tuntutan Berjaya' },
  ];

  return (
    <section
      id="top"
      className="relative bg-md-inverse-surface text-md-inverse-on-surface overflow-hidden"
    >
      <BlurShapeField tone="dark" />

      {/* Subtle radial spotlight */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 210, 122, 0.18), transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-md-inverse-primary/10 border border-md-inverse-primary/25 rounded-full px-4 py-1.5 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-md-inverse-primary" />
            <span className="text-xs font-medium text-md-inverse-primary tracking-wide">
              Perlindungan Patuh Syariah
            </span>
          </div>

          <h1 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-medium leading-[1.05] tracking-[-0.02em] mb-6">
            Lindungi masa depan{' '}
            <span className="text-md-inverse-primary">keluarga anda</span>{' '}
            dengan Takaful.
          </h1>

          <p className="text-lg md:text-xl text-md-inverse-on-surface/75 mb-10 max-w-2xl mx-auto leading-relaxed">
            Perlindungan kewangan, pemeliharaan kekayaan, dan keselamatan keluarga,
            berlandaskan prinsip kerjasama dan tanggungjawab bersama.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              as="a"
              href="#join"
              variant="inverse"
              size="lg"
              iconRight={ArrowRight}
            >
              Sertai Agensi Kami
            </Button>
            <Button
              variant="outlined"
              size="lg"
              iconLeft={LogIn}
              onClick={() => setLoginModalOpen(true)}
              className="border-md-inverse-primary/40 text-md-inverse-primary hover:bg-md-inverse-primary/10"
            >
              Log Masuk Ejen
            </Button>
          </div>
        </div>

        {/* Trust strip in glass cards */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {trust.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center transition-colors hover:bg-white/[0.1]"
            >
              <Icon className="w-5 h-5 text-md-inverse-primary mx-auto mb-2" />
              <p className="text-xs text-md-inverse-on-surface/85 font-medium leading-tight">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   About — values
   ──────────────────────────────────────────────────────────────────────── */
function AboutSection() {
  const values = [
    {
      icon: Shield,
      title: 'Amanah',
      desc: 'Kami berpegang pada standard integriti tertinggi dalam setiap interaksi dan cadangan.',
    },
    {
      icon: Heart,
      title: 'Ihsan',
      desc: 'Memberi perkhidmatan luar biasa dan keprihatinan tulus untuk setiap pelanggan.',
    },
    {
      icon: TrendingUp,
      title: 'Istiqamah',
      desc: 'Komited kepada hubungan jangka panjang, bukan transaksi sekali sahaja.',
    },
  ];

  return (
    <Section
      id="about"
      tone="surface"
      eyebrow="Tentang Kami"
      title="Misi & nilai yang menjadi pegangan kami"
      subtitle="Annur Agency dedikasi menyediakan penyelesaian Takaful patuh Syariah, beretika, telus, dan diperibadikan untuk keluarga Malaysia."
    >
      <div className="grid md:grid-cols-3 gap-5">
        {values.map(({ icon: Icon, title, desc }) => (
          <Card key={title} radius="lg" className="p-7 text-center group" interactive>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-md-primary-container mb-5 transition-transform duration-300 md-emphasized group-hover:scale-110">
              <Icon className="w-6 h-6 text-md-on-primary-container" />
            </div>
            <h3 className="text-xl font-medium text-md-on-surface mb-2">{title}</h3>
            <p className="text-md-on-surface-variant leading-relaxed">{desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Team — GM + AM with photo cards
   ──────────────────────────────────────────────────────────────────────── */
function TeamSection() {
  const groupManagers = mockTeamMembers.filter((m) => m.tier === 'group');
  const agencyManagers = mockTeamMembers.filter((m) => m.tier === 'agency');

  const Member = ({ member, large = false }) => (
    <Card radius="xl" className="p-6 text-center group" interactive>
      <div
        className={[
          'mx-auto mb-4 overflow-hidden rounded-full ring-4 ring-md-primary-container',
          'transition-transform duration-300 md-emphasized group-hover:scale-105',
          large ? 'w-32 h-32' : 'w-24 h-24',
        ].join(' ')}
      >
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <h3
        className={`font-medium text-md-on-surface ${
          large ? 'text-lg' : 'text-base'
        }`}
      >
        {member.name}
      </h3>
      <p className="text-sm text-md-primary font-medium mt-1">{member.role}</p>
      <p className="text-xs text-md-on-surface-variant leading-relaxed mt-2">
        {member.desc}
      </p>
    </Card>
  );

  return (
    <Section
      id="team"
      tone="container"
      eyebrow="Pasukan Kami"
      title="Kepimpinan & pengurus"
      subtitle="Pemimpin berpengalaman yang mendorong misi Annur Agency ke hadapan."
    >
      {/* Group Managers — featured tier */}
      <div className="mb-14">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Crown className="w-5 h-5 text-md-primary" />
          <h3 className="text-base font-medium tracking-wide uppercase text-md-on-surface-variant">
            Group Manager (GM)
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {groupManagers.map((m) => (
            <Member key={m.id} member={m} large />
          ))}
        </div>
      </div>

      {/* Agency Managers */}
      <div>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Award className="w-5 h-5 text-md-primary" />
          <h3 className="text-base font-medium tracking-wide uppercase text-md-on-surface-variant">
            Agency Manager (AM)
          </h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {agencyManagers.map((m) => (
            <Member key={m.id} member={m} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Services — 5 protection plans
   ──────────────────────────────────────────────────────────────────────── */
function ServicesSection() {
  return (
    <Section
      id="services"
      tone="surface"
      eyebrow="Perkhidmatan Kami"
      title="Pelan perlindungan yang kami tawarkan"
      subtitle="Penyelesaian Takaful komprehensif untuk setiap peringkat hidup dan keperluan."
    >
      {/* Decorative background */}
      <BlurShape
        color="primaryContainer"
        size="xl"
        opacity={40}
        position="top-1/3 -right-40"
      />

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockServices.map((service, idx) => {
          const Icon = serviceIconMap[service.icon] || Shield;
          // First card gets featured/elevated treatment
          const featured = idx === 0;

          return (
            <Card
              key={service.id}
              radius="lg"
              tone={featured ? 'high' : 'default'}
              className={[
                'p-7 group relative',
                featured ? 'lg:row-span-1 ring-1 ring-md-primary/20' : '',
              ].join(' ')}
              interactive
            >
              <div className="w-14 h-14 rounded-2xl bg-md-primary text-md-on-primary flex items-center justify-center mb-5 shadow-md-1 transition-transform duration-300 md-emphasized group-hover:scale-110 group-hover:rotate-[-4deg]">
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-medium text-md-on-surface mb-2 leading-snug">
                {service.title}
              </h3>
              <p className="text-sm text-md-on-surface-variant leading-relaxed mb-5">
                {service.desc}
              </p>

              <ul className="space-y-2 pt-4 border-t border-md-outline-variant">
                {service.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-sm text-md-on-surface"
                  >
                    <CheckCircle2 className="w-4 h-4 text-md-primary flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Gallery
   ──────────────────────────────────────────────────────────────────────── */
function GallerySection() {
  return (
    <Section
      id="gallery"
      tone="container"
      eyebrow="Galeri"
      title="Detik & pencapaian"
      subtitle="Sekilas pandang acara, latihan dan impak komuniti agensi kami."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockGallery.map((item) => (
          <Card
            key={item.id}
            radius="xl"
            tone="inverse"
            className="aspect-[4/3] overflow-hidden relative group p-0"
            interactive
          >
            <img
              src={item.photo}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 md-emphasized group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-md-inverse-surface via-md-inverse-surface/70 to-transparent">
              <h3 className="text-md-inverse-on-surface font-medium text-base">
                {item.title}
              </h3>
              <p className="text-md-inverse-primary text-xs mt-1">{item.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Join Us — recruitment + apply form
   ──────────────────────────────────────────────────────────────────────── */
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

  const update = (k, v) => setFormData((p) => ({ ...p, [k]: v }));
  const canSubmit = Object.values(formData).every((v) => v.toString().trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    addApplication(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card radius="2xl" tone="lowest" className="p-10 text-center">
        <div className="inline-flex w-16 h-16 rounded-full bg-md-success-container items-center justify-center mb-5">
          <CheckCircle2 className="w-8 h-8 text-md-success" />
        </div>
        <h3 className="text-2xl font-medium text-md-on-surface mb-2">
          Permohonan diterima
        </h3>
        <p className="text-md-on-surface-variant mb-6 max-w-md mx-auto">
          Terima kasih, <strong className="text-md-primary">{formData.nama}</strong>.
          Pengurus perekrut kami akan menghubungi anda dalam masa 24 jam.
        </p>
        <Button
          variant="text"
          onClick={() => {
            setSubmitted(false);
            setFormData({ nama: '', umur: '', pekerjaan: '', pendidikan: '', negeri: '' });
          }}
        >
          Hantar permohonan lain
        </Button>
      </Card>
    );
  }

  return (
    <Card radius="2xl" tone="lowest" className="p-7 md:p-10">
      <div className="flex items-center gap-2 mb-5">
        <Send className="w-5 h-5 text-md-primary" />
        <h3 className="text-xl font-medium text-md-on-surface">Borang Permohonan</h3>
      </div>
      <p className="text-sm text-md-on-surface-variant mb-6">
        Isikan maklumat anda di bawah. Kami akan hubungi anda dalam masa 24 jam.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Nama Penuh" required>
          <Input
            value={formData.nama}
            onChange={(e) => update('nama', e.target.value)}
            placeholder="Cth: Ahmad bin Ali"
            required
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Umur" required>
            <Input
              type="number"
              value={formData.umur}
              onChange={(e) => update('umur', e.target.value)}
              placeholder="Cth: 28"
              min="18"
              max="65"
              required
            />
          </Field>
          <Field label="Pekerjaan" required>
            <Input
              value={formData.pekerjaan}
              onChange={(e) => update('pekerjaan', e.target.value)}
              placeholder="Cth: Eksekutif"
              required
            />
          </Field>
        </div>

        <Field label="Tahap Pendidikan" required>
          <Select
            value={formData.pendidikan}
            onChange={(e) => update('pendidikan', e.target.value)}
            required
          >
            <option value="">Pilih tahap pendidikan</option>
            {EDUCATION_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </Select>
        </Field>

        <Field label="Negeri" required>
          <Select
            value={formData.negeri}
            onChange={(e) => update('negeri', e.target.value)}
            required
          >
            <option value="">Pilih negeri</option>
            {NEGERI_LIST.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </Select>
        </Field>

        <Button
          type="submit"
          variant="filled"
          size="lg"
          iconLeft={Send}
          disabled={!canSubmit}
          className="w-full mt-2"
        >
          Hantar Permohonan
        </Button>
      </form>
    </Card>
  );
}

function JoinUsSection() {
  const benefits = [
    { icon: TrendingUp, label: 'Pendapatan Tanpa Had' },
    { icon: Award, label: 'Trip Insentif' },
    { icon: Users, label: 'Komuniti Kuat' },
    { icon: Star, label: 'Latihan Penuh' },
  ];

  return (
    <Section id="join" tone="inverse">
      <BlurShapeField tone="dark" />

      <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Pitch */}
        <div>
          <div className="inline-flex items-center gap-2 bg-md-inverse-primary/10 border border-md-inverse-primary/25 rounded-full px-3.5 py-1.5 mb-6">
            <UserPlus className="w-3.5 h-3.5 text-md-inverse-primary" />
            <span className="text-xs font-medium text-md-inverse-primary tracking-wide">
              Pengambilan Dibuka
            </span>
          </div>

          <h2 className="text-[2rem] md:text-[2.75rem] font-medium leading-[1.1] tracking-[-0.01em] mb-5">
            Jadilah{' '}
            <span className="text-md-inverse-primary">Ejen Annur</span>
          </h2>
          <p className="text-md-inverse-on-surface/75 leading-relaxed mb-8 text-lg">
            Sertai agensi Takaful paling dinamik di Malaysia. Pendapatan tanpa had,
            trip insentif antarabangsa, dan ubah kehidupan, sambil membina perniagaan
            anda sendiri.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {benefits.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-colors hover:bg-white/[0.1]"
              >
                <Icon className="w-5 h-5 text-md-inverse-primary mb-2" />
                <p className="text-sm text-md-inverse-on-surface font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Apply form */}
        <div>
          <ApplyForm />
        </div>
      </div>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Footer
   ──────────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-md-inverse-surface border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Logo className="w-7 h-7" />
          <span className="text-md-inverse-on-surface font-medium">Annur Agency</span>
        </div>
        <p className="text-md-inverse-on-surface/60 text-sm text-center">
          © 2026 Annur Agency. Penyelesaian Takaful berasaskan kewangan beretika.
        </p>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Page composition
   ──────────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-md-background">
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
