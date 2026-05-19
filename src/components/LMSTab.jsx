import { useState } from 'react';
import {
  BookOpen,
  Play,
  Clock,
  CheckCircle2,
  Circle,
  ArrowLeft,
  FileText,
  HelpCircle,
  Award,
  GraduationCap,
} from 'lucide-react';
import { mockQuizQuestions } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Button, Card } from './ui';

const statusBM = {
  'In Progress': 'Sedang Dipelajari',
  'Not Started': 'Belum Mula',
  'Completed': 'Selesai',
};

/* Status pill — colour-coded MD3 chip */
function StatusChip({ status }) {
  const styles = {
    'In Progress': 'bg-md-primary-container text-md-on-primary-container',
    'Not Started': 'bg-md-surface-container-high text-md-on-surface-variant',
    'Completed': 'bg-md-success-container text-md-success',
  }[status];
  return (
    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${styles}`}>
      {statusBM[status] || status}
    </span>
  );
}

/* ─── Course list ─────────────────────────────────────────────────── */
function CourseList({ onSelect }) {
  const { trainingModules } = useApp();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[1.75rem] md:text-[2.25rem] font-medium text-md-on-surface tracking-[-0.01em]">
          Pengurusan Latihan
        </h1>
        <p className="text-md-on-surface-variant mt-1.5">
          Selesaikan modul latihan untuk meningkatkan tahap anda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trainingModules.map((mod) => (
          <Card
            key={mod.id}
            radius="lg"
            interactive
            className="p-6 group"
            onClick={() => onSelect(mod)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-md-primary-container text-md-on-primary-container flex items-center justify-center transition-transform duration-300 md-emphasized group-hover:rotate-[-4deg] group-hover:scale-110">
                <BookOpen className="w-5 h-5" />
              </div>
              <StatusChip status={mod.status} />
            </div>

            <h3 className="font-medium text-md-on-surface text-base mb-1.5 leading-snug">
              {mod.title}
            </h3>
            <p className="text-sm text-md-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
              {mod.description}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-md-outline-variant">
              <div className="flex items-center gap-1.5 text-xs text-md-on-surface-variant">
                <Clock className="w-3.5 h-3.5" />
                <span>{mod.duration}</span>
              </div>
              {mod.progress > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-md-surface-container-high rounded-full h-1.5">
                    <div
                      className="bg-md-primary h-1.5 rounded-full"
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-md-primary font-medium">
                    {mod.progress}%
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─── Quiz ─────────────────────────────────────────────────────────── */
function Quiz({ onBack }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = mockQuizQuestions.reduce(
    (acc, q, i) => (answers[i] === q.correct ? acc + 1 : acc),
    0
  );
  const allAnswered = Object.keys(answers).length === mockQuizQuestions.length;

  if (submitted) {
    return (
      <div className="space-y-6">
        <Button variant="text" iconLeft={ArrowLeft} onClick={onBack}>
          Kembali ke Modul
        </Button>

        <Card radius="xl" className="p-10 text-center">
          <div className="inline-flex w-20 h-20 rounded-full bg-md-primary-container items-center justify-center mb-5">
            <Award className="w-10 h-10 text-md-on-primary-container" />
          </div>
          <h3 className="text-3xl font-medium text-md-on-surface mb-2 tracking-[-0.01em]">
            Markah: {score}/{mockQuizQuestions.length}
          </h3>
          <p className="text-md-on-surface-variant mb-6">
            {score === mockQuizQuestions.length
              ? 'Markah penuh! Anda telah menguasai modul ini.'
              : 'Ulang kaji bahan dan cuba lagi untuk markah lebih baik.'}
          </p>
          <Button
            variant="filled"
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
            }}
          >
            Cuba Semula
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="text" iconLeft={ArrowLeft} onClick={onBack}>
        Kembali ke Modul
      </Button>

      <Card radius="xl" className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-md-primary" />
          <h2 className="text-lg font-medium text-md-on-surface">Kuiz Modul</h2>
        </div>

        <div className="space-y-5">
          {mockQuizQuestions.map((q, qi) => (
            <fieldset key={qi} className="p-5 bg-md-surface-container-low rounded-2xl">
              <legend className="font-medium text-md-on-surface text-sm mb-3 px-2">
                {qi + 1}. {q.question}
              </legend>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const checked = answers[qi] === oi;
                  return (
                    <label
                      key={oi}
                      className={[
                        'flex items-center gap-3 p-3 rounded-2xl cursor-pointer min-h-[48px]',
                        'transition-all duration-200 md-emphasized',
                        checked
                          ? 'bg-md-primary-container ring-2 ring-md-primary'
                          : 'bg-md-surface-container-lowest hover:bg-md-primary/5',
                      ].join(' ')}
                    >
                      <input
                        type="radio"
                        name={`q-${qi}`}
                        checked={checked}
                        onChange={() => setAnswers((p) => ({ ...p, [qi]: oi }))}
                        className="w-4 h-4 accent-md-primary"
                      />
                      <span className="text-sm text-md-on-surface">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}

          <Button
            variant="filled"
            size="lg"
            disabled={!allAnswered}
            onClick={() => setSubmitted(true)}
            className="w-full"
          >
            Hantar Jawapan
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* ─── Module detail / video player ────────────────────────────────── */
function ModuleDetail({ module, onBack }) {
  const [tab, setTab] = useState('video');
  const [showQuiz, setShowQuiz] = useState(false);

  if (showQuiz) return <Quiz onBack={() => setShowQuiz(false)} />;

  return (
    <div className="space-y-6">
      <Button variant="text" iconLeft={ArrowLeft} onClick={onBack}>
        Kembali ke Senarai Kursus
      </Button>

      {/* Mock video */}
      <Card radius="xl" tone="inverse" className="aspect-video relative overflow-hidden p-0">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,210,122,0.18) 0%, transparent 65%)',
          }}
        />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
          <button
            type="button"
            className="w-20 h-20 rounded-full bg-md-inverse-primary text-md-inverse-surface flex items-center justify-center mb-4 shadow-md-3 transition-transform duration-300 md-emphasized hover:scale-110 active:scale-95"
            aria-label={`Mainkan ${module.title}`}
          >
            <Play className="w-9 h-9 ml-1" fill="currentColor" />
          </button>
          <p className="font-medium text-md-inverse-on-surface">{module.title}</p>
          <p className="text-sm text-md-inverse-on-surface/65 mt-1">
            {module.duration} · Sesi Video
          </p>
        </div>
        {/* progress */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
          <div
            className="h-full bg-md-inverse-primary"
            style={{ width: `${module.progress}%` }}
          />
        </div>
      </Card>

      {/* Notes / quiz tabs */}
      <Card radius="lg" className="overflow-hidden p-0">
        <div role="tablist" className="flex border-b border-md-outline-variant">
          {[
            { id: 'video', label: 'Nota Video', Icon: FileText },
            { id: 'quiz', label: 'Ambil Kuiz', Icon: HelpCircle },
          ].map(({ id, label, Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(id)}
                className={[
                  'flex-1 inline-flex items-center justify-center gap-2 h-12 text-sm font-medium',
                  'transition-colors duration-200 md-emphasized',
                  active
                    ? 'text-md-primary border-b-2 border-md-primary bg-md-primary/5'
                    : 'text-md-on-surface-variant hover:text-md-on-surface',
                ].join(' ')}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {tab === 'video' ? (
            <div>
              <h3 className="font-medium text-md-on-surface mb-2">Nota</h3>
              {module.videoNotes ? (
                <p className="text-sm text-md-on-surface-variant leading-relaxed">
                  {module.videoNotes}
                </p>
              ) : (
                <p className="text-sm text-md-on-surface-variant/70 italic">
                  Tiada nota lagi. Selesaikan video untuk membuka nota.
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="inline-flex w-14 h-14 rounded-2xl bg-md-primary-container items-center justify-center mb-3">
                <GraduationCap className="w-6 h-6 text-md-on-primary-container" />
              </div>
              <h3 className="font-medium text-md-on-surface mb-1">
                Sedia menguji pengetahuan anda?
              </h3>
              <p className="text-sm text-md-on-surface-variant mb-5">
                Jawab soalan berdasarkan kandungan modul ini.
              </p>
              <Button variant="filled" onClick={() => setShowQuiz(true)}>
                Mulakan Kuiz
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* About module */}
      <Card radius="lg" className="p-6">
        <h3 className="font-medium text-md-on-surface mb-2">Tentang Modul Ini</h3>
        <p className="text-sm text-md-on-surface-variant leading-relaxed">
          {module.description}
        </p>
        <div className="flex items-center gap-4 mt-3 text-xs text-md-on-surface-variant">
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {module.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            {module.status === 'In Progress' ? (
              <Circle className="w-3.5 h-3.5 text-md-primary" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            <StatusChip status={module.status} />
          </span>
        </div>
      </Card>
    </div>
  );
}

export default function LMSTab() {
  const [selected, setSelected] = useState(null);
  return selected ? (
    <ModuleDetail module={selected} onBack={() => setSelected(null)} />
  ) : (
    <CourseList onSelect={setSelected} />
  );
}
