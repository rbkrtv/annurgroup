import { useState } from 'react';
import { Mail, Lock, X, User, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Logo from './Logo';
import { Button, Card, Field, Input } from './ui';

export default function LoginModal() {
  const { loginModalOpen, setLoginModalOpen, login } = useApp();
  const [role, setRole] = useState('agent');
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
    <div
      className="fixed inset-0 bg-md-inverse-surface/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <Card
        radius="2xl"
        tone="lowest"
        className="max-w-md w-full p-0 overflow-hidden shadow-md-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-md-outline-variant">
          <div className="flex items-center gap-2.5">
            <Logo className="w-8 h-8" />
            <h3 id="login-title" className="font-medium text-md-on-surface">
              Log Masuk Annur Agency
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 inline-flex items-center justify-center rounded-full text-md-on-surface-variant hover:bg-md-primary/10 active:scale-95 transition-all duration-200 md-emphasized focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Role toggle — segmented control */}
          <div
            role="tablist"
            aria-label="Pilih jenis akaun"
            className="grid grid-cols-2 gap-1 mb-6 p-1 bg-md-surface-container-low rounded-full"
          >
            {[
              { id: 'agent', label: 'Ejen', icon: User },
              { id: 'admin', label: 'Admin', icon: ShieldCheck },
            ].map(({ id, label, icon: Icon }) => {
              const active = role === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setRole(id)}
                  className={[
                    'inline-flex items-center justify-center gap-2 h-10 rounded-full text-sm font-medium',
                    'transition-all duration-300 md-emphasized active:scale-95',
                    active
                      ? 'bg-md-inverse-surface text-md-inverse-primary shadow-md-1'
                      : 'text-md-on-surface-variant hover:text-md-on-surface',
                  ].join(' ')}
                >
                  <Icon className="w-4 h-4" /> {label}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                role="alert"
                className="bg-md-error-container text-md-error text-sm px-4 py-3 rounded-2xl"
              >
                {error}
              </div>
            )}

            <Field label="E-mel" required>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-md-on-surface-variant pointer-events-none" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    role === 'admin'
                      ? 'admin@annur-agency.com'
                      : 'ejen@annur-agency.com'
                  }
                  className="pl-12"
                  required
                />
              </div>
            </Field>

            <Field label="Kata Laluan" required>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-md-on-surface-variant pointer-events-none" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata laluan"
                  className="pl-12"
                  required
                />
              </div>
            </Field>

            <Button type="submit" variant="filled" size="lg" className="w-full mt-2">
              Log Masuk sebagai {role === 'admin' ? 'Admin' : 'Ejen'}
            </Button>

            <p className="text-xs text-center text-md-on-surface-variant pt-2">
              Demo MVP: Masukkan sebarang e-mel & kata laluan
            </p>
          </form>
        </div>
      </Card>
    </div>
  );
}
