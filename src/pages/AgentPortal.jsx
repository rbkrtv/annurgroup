import { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Megaphone,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import DashboardTab from '../components/DashboardTab';
import LMSTab from '../components/LMSTab';
import CRMTab from '../components/CRMTab';
import MarketingKitTab from '../components/MarketingKitTab';
import Logo from '../components/Logo';

const tabs = [
  { id: 'dashboard', label: 'Papan Pemuka', icon: LayoutDashboard },
  { id: 'lms', label: 'Latihan', icon: BookOpen },
  { id: 'leads', label: 'Prospek', icon: Users },
  { id: 'marketing', label: 'Pemasaran', icon: Megaphone },
];

/* ──────────────────────────────────────────────────────────────────────────
   Sidebar nav item — extracted to keep desktop + mobile sidebars in sync
   ──────────────────────────────────────────────────────────────────────── */
function SidebarItem({ active, icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={[
        'w-full flex items-center gap-3 px-4 h-12 rounded-full text-sm font-medium',
        'transition-all duration-300 md-emphasized active:scale-[0.98]',
        active
          ? 'bg-md-inverse-primary text-md-inverse-surface shadow-md-1'
          : 'text-md-inverse-on-surface/75 hover:bg-white/5 hover:text-md-inverse-on-surface',
      ].join(' ')}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="truncate">{label}</span>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Sidebar content (shared between desktop fixed + mobile drawer)
   ──────────────────────────────────────────────────────────────────────── */
function SidebarContent({ onItemClick }) {
  const { agent, activeTab, setActiveTab, logout } = useApp();

  return (
    <>
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-white/5">
        <Logo className="w-9 h-9" />
        <span className="text-base font-medium text-md-inverse-on-surface tracking-[-0.01em]">
          Annur Agency
        </span>
      </div>

      {/* Agent identity card */}
      <div className="px-4 py-4 border-b border-white/5">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-md-inverse-primary text-md-inverse-surface flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium">
              {agent.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-md-inverse-on-surface truncate">
              {agent.name}
            </p>
            <p className="text-xs text-md-inverse-on-surface/60 truncate">
              {agent.rank}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {tabs.map(({ id, label, icon }) => (
          <SidebarItem
            key={id}
            active={activeTab === id}
            icon={icon}
            label={label}
            onClick={() => {
              setActiveTab(id);
              onItemClick?.();
            }}
          />
        ))}
      </nav>

      {/* Logout */}
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

/* ──────────────────────────────────────────────────────────────────────────
   AgentPortal — main shell
   ──────────────────────────────────────────────────────────────────────── */
export default function AgentPortal() {
  const { agent, activeTab, setActiveTab } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'lms':       return <LMSTab />;
      case 'leads':     return <CRMTab />;
      case 'marketing': return <MarketingKitTab />;
      default:          return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-md-background flex">
      {/* ─── Desktop sidebar (fixed) ──────────────────────────────────── */}
      <aside className="hidden md:flex md:flex-col md:w-72 bg-md-inverse-surface fixed inset-y-0 left-0 z-40">
        <SidebarContent />
      </aside>

      {/* ─── Mobile drawer ────────────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
        >
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

      {/* ─── Main column ──────────────────────────────────────────────── */}
      <main className="flex-1 md:ml-72 pb-24 md:pb-0">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-30 bg-md-background/85 backdrop-blur-md border-b border-md-outline-variant px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-11 h-11 inline-flex items-center justify-center rounded-full text-md-on-surface hover:bg-md-primary/10 active:scale-95 transition-all md-emphasized"
            aria-label="Buka menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Logo className="w-7 h-7" />
            <span className="font-medium text-md-on-surface text-sm">
              Annur Agency
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-md-primary text-md-on-primary flex items-center justify-center">
            <span className="text-xs font-medium">
              {agent.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </span>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 md:p-8 max-w-6xl mx-auto">{renderTab()}</div>
      </main>

      {/* ─── Mobile bottom nav ───────────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-md-inverse-surface z-40 px-3 py-2">
        <div className="flex items-center justify-around bg-md-inverse-surface rounded-full">
          {tabs.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                aria-current={active ? 'page' : undefined}
                className={[
                  'inline-flex flex-col items-center justify-center gap-0.5',
                  'min-w-[64px] min-h-[52px] px-3 py-2 rounded-full',
                  'transition-all duration-300 md-emphasized active:scale-95',
                  active
                    ? 'bg-md-inverse-primary text-md-inverse-surface'
                    : 'text-md-inverse-on-surface/65',
                ].join(' ')}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium tracking-wide">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
