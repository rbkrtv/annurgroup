import {
  LayoutDashboard,
  BookOpen,
  Users,
  Megaphone,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
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

export default function AgentPortal() {
  const { agent, activeTab, setActiveTab, logout } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'lms':
        return <LMSTab />;
      case 'leads':
        return <CRMTab />;
      case 'marketing':
        return <MarketingKitTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* ─── Desktop Sidebar ──────────────────────────────────────────────── */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-black text-white fixed inset-y-0 left-0 z-40">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 h-16 border-b border-neutral-800">
          <Logo className="w-9 h-9" />
          <span className="text-lg font-bold">Annur Agency</span>
        </div>

        {/* Agent Info */}
        <div className="px-6 py-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-black">
                {agent.name.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold">{agent.name}</p>
              <p className="text-xs text-neutral-400">{agent.rank}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px] ${
                activeTab === id
                  ? 'bg-amber-500 text-black'
                  : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-neutral-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-neutral-300 hover:bg-red-600/10 hover:text-red-400 transition-all min-h-[44px]"
          >
            <LogOut className="w-5 h-5" />
            Log Keluar
          </button>
        </div>
      </aside>

      {/* ─── Mobile Sidebar Overlay ───────────────────────────────────────── */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-black text-white flex flex-col">
            <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Logo className="w-9 h-9" />
                <span className="text-lg font-bold">Annur Agency</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-800"
                aria-label="Tutup menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-4 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-black">
                    {agent.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{agent.name}</p>
                  <p className="text-xs text-neutral-400">{agent.rank}</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px] ${
                    activeTab === id
                      ? 'bg-amber-500 text-black'
                      : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </nav>

            <div className="px-3 py-4 border-t border-neutral-800">
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-neutral-300 hover:bg-red-600/10 hover:text-red-400 transition-all min-h-[44px]"
              >
                <LogOut className="w-5 h-5" />
                Log Keluar
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ─── Main Content ─────────────────────────────────────────────────── */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-0">
        {/* Mobile Top Bar */}
        <header className="md:hidden sticky top-0 z-30 bg-white border-b border-neutral-100 px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-100"
            aria-label="Buka menu"
          >
            <Menu className="w-5 h-5 text-neutral-700" />
          </button>
          <div className="flex items-center gap-2">
            <Logo className="w-7 h-7" />
            <span className="font-bold text-neutral-900 text-sm">Annur Agency</span>
          </div>
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-black">
              {agent.name.split(' ').map((n) => n[0]).join('')}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {renderTab()}
        </div>
      </main>

      {/* ─── Mobile Bottom Navigation ─────────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
        <div className="flex items-center justify-around h-16">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] py-1 transition-all ${
                activeTab === id ? 'text-amber-600' : 'text-neutral-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
