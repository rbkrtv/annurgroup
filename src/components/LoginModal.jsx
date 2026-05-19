import { useState } from 'react';
import { Mail, Lock, X, User, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Logo from './Logo';

export default function LoginModal() {
  const { loginModalOpen, setLoginModalOpen, login } = useApp();
  const [role, setRole] = useState('agent'); // 'agent' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!loginModalOpen) return null;

  const handleClose = () => {
    setLoginModalOpen(false);
    setEmail('');
    setPassword('');
    setError('');
    setRole('agent');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(email, password, role);
    if (!ok) setError('Sila masukkan kelayakan yang sah.');
    else {
      setEmail('');
      setPassword('');
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Logo className="w-7 h-7" />
            <h3 className="font-bold text-neutral-900">Log Masuk Annur Agency</h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Role Toggle */}
          <div className="grid grid-cols-2 gap-2 mb-5 p-1 bg-neutral-100 rounded-xl">
            <button
              type="button"
              onClick={() => setRole('agent')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all min-h-[44px] ${
                role === 'agent'
                  ? 'bg-black text-amber-400 shadow'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <User className="w-4 h-4" /> Ejen
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all min-h-[44px] ${
                role === 'admin'
                  ? 'bg-black text-amber-400 shadow'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">E-mel</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                  placeholder={role === 'admin' ? 'admin@annur-agency.com' : 'ejen@annur-agency.com'}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Kata Laluan</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                  placeholder="Masukkan kata laluan"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-xl transition-all min-h-[44px]"
            >
              Log Masuk sebagai {role === 'admin' ? 'Admin' : 'Ejen'}
            </button>
            <p className="text-xs text-center text-neutral-400">
              Demo MVP: Masukkan sebarang e-mel & kata laluan
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
