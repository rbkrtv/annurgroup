import { useState } from 'react';
import {
  BookOpen,
  Play,
  Clock,
  CheckCircle,
  Circle,
  ArrowLeft,
  FileText,
  HelpCircle,
  Award,
} from 'lucide-react';
import { mockQuizQuestions } from '../data/mockData';
import { useApp } from '../context/AppContext';

// ─── BM translations for module status ───────────────────────────────────────
const statusBM = {
  'In Progress': 'Sedang Dipelajari',
  'Not Started': 'Belum Mula',
  'Completed': 'Selesai',
};

// ─── Course List View ────────────────────────────────────────────────────────
function CourseList({ onSelectModule }) {
  const { trainingModules } = useApp();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Pengurusan Latihan</h1>
        <p className="text-neutral-500 mt-1">Selesaikan modul latihan untuk meningkatkan tahap anda.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trainingModules.map((mod) => (
          <div
            key={mod.id}
            onClick={() => onSelectModule(mod)}
            className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-amber-600" />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  mod.status === 'In Progress'
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-neutral-100 text-neutral-500'
                }`}
              >
                {statusBM[mod.status] || mod.status}
              </span>
            </div>

            <h3 className="font-bold text-neutral-900 text-sm mb-1">{mod.title}</h3>
            <p className="text-xs text-neutral-500 mb-3 line-clamp-2">{mod.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-neutral-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{mod.duration}</span>
              </div>
              {mod.progress > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-neutral-100 rounded-full h-1.5">
                    <div
                      className="bg-amber-500 h-1.5 rounded-full"
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-amber-600 font-medium">{mod.progress}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Video Player View ───────────────────────────────────────────────────────
function VideoPlayer({ module, onBack }) {
  const [activePlayerTab, setActivePlayerTab] = useState('video');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const getScore = () => {
    let correct = 0;
    mockQuizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.correct) correct++;
    });
    return correct;
  };

  if (showQuiz) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setShowQuiz(false)}
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 font-medium text-sm min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Modul
        </button>

        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-neutral-900">Kuiz Modul</h2>
          </div>

          {quizSubmitted ? (
            <div className="text-center py-8">
              <Award className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                Markah: {getScore()}/{mockQuizQuestions.length}
              </h3>
              <p className="text-neutral-500">
                {getScore() === mockQuizQuestions.length
                  ? 'Markah penuh! Anda telah menguasai modul ini.'
                  : 'Ulang kaji bahan dan cuba lagi untuk markah lebih baik.'}
              </p>
              <button
                onClick={() => {
                  setQuizSubmitted(false);
                  setQuizAnswers({});
                }}
                className="mt-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-3 rounded-xl transition-all min-h-[44px]"
              >
                Cuba Semula
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {mockQuizQuestions.map((q, qIndex) => (
                <div key={qIndex} className="p-4 bg-neutral-50 rounded-xl">
                  <p className="font-semibold text-neutral-900 text-sm mb-3">
                    {qIndex + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((option, oIndex) => (
                      <label
                        key={oIndex}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all min-h-[44px] ${
                          quizAnswers[qIndex] === oIndex
                            ? 'bg-amber-50 border border-amber-200'
                            : 'bg-white border border-neutral-100 hover:border-neutral-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${qIndex}`}
                          checked={quizAnswers[qIndex] === oIndex}
                          onChange={() =>
                            setQuizAnswers((prev) => ({ ...prev, [qIndex]: oIndex }))
                          }
                          className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-sm text-neutral-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={handleQuizSubmit}
                disabled={Object.keys(quizAnswers).length < mockQuizQuestions.length}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-300 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-xl transition-all min-h-[44px]"
              >
                Hantar Jawapan
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 font-medium text-sm min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Senarai Kursus
      </button>

      {/* Mock Video Player */}
      <div className="bg-black rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black" />
        <div className="relative text-center">
          <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-amber-500/50">
            <Play className="w-8 h-8 text-amber-400 ml-1" />
          </div>
          <p className="text-white font-semibold">{module.title}</p>
          <p className="text-neutral-400 text-sm mt-1">{module.duration} • Sesi Video</p>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-700">
          <div
            className="h-full bg-amber-500"
            style={{ width: `${module.progress}%` }}
          />
        </div>
      </div>

      {/* Tabs: Video Notes / Take Quiz */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-neutral-100">
          <button
            onClick={() => setActivePlayerTab('video')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all min-h-[44px] ${
              activePlayerTab === 'video'
                ? 'text-amber-600 border-b-2 border-amber-500 bg-amber-50/50'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            <FileText className="w-4 h-4" /> Nota Video
          </button>
          <button
            onClick={() => setActivePlayerTab('quiz')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all min-h-[44px] ${
              activePlayerTab === 'quiz'
                ? 'text-amber-600 border-b-2 border-amber-500 bg-amber-50/50'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> Ambil Kuiz
          </button>
        </div>

        <div className="p-5">
          {activePlayerTab === 'video' ? (
            <div>
              <h3 className="font-bold text-neutral-900 mb-2">Nota</h3>
              {module.videoNotes ? (
                <p className="text-sm text-neutral-600 leading-relaxed">{module.videoNotes}</p>
              ) : (
                <p className="text-sm text-neutral-400 italic">
                  Tiada nota lagi. Selesaikan video untuk membuka nota.
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <HelpCircle className="w-12 h-12 text-amber-200 mx-auto mb-3" />
              <h3 className="font-bold text-neutral-900 mb-1">Sedia menguji pengetahuan anda?</h3>
              <p className="text-sm text-neutral-500 mb-4">
                Jawab soalan berdasarkan kandungan modul ini.
              </p>
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-3 rounded-xl transition-all min-h-[44px]"
              >
                Mulakan Kuiz
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Module Info */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm">
        <h3 className="font-bold text-neutral-900 mb-2">Tentang Modul Ini</h3>
        <p className="text-sm text-neutral-600">{module.description}</p>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{module.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            {module.status === 'In Progress' ? (
              <>
                <Circle className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-amber-600">{statusBM[module.status]}</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-neutral-500">{statusBM[module.status] || module.status}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main LMS Tab ────────────────────────────────────────────────────────────
export default function LMSTab() {
  const [selectedModule, setSelectedModule] = useState(null);

  return selectedModule ? (
    <VideoPlayer module={selectedModule} onBack={() => setSelectedModule(null)} />
  ) : (
    <CourseList onSelectModule={setSelectedModule} />
  );
}
