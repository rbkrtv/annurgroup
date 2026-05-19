import { createContext, useContext, useState } from 'react';
import { mockAgentsList, mockLeads, mockTrainingModules } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // ─── View / Routing ──────────────────────────────────────────────────────
  // 'landing' | 'agentPortal' | 'adminPortal'
  const [currentView, setCurrentView] = useState('landing');

  // ─── Auth ────────────────────────────────────────────────────────────────
  const [userRole, setUserRole] = useState(null); // null | 'agent' | 'admin'
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // ─── Agents (admin can edit) ─────────────────────────────────────────────
  const [agents, setAgents] = useState(mockAgentsList);
  // Active logged-in agent (defaults to first)
  const [currentAgentId, setCurrentAgentId] = useState(mockAgentsList[0].id);

  // ─── Training modules (admin can edit) ───────────────────────────────────
  const [trainingModules, setTrainingModules] = useState(mockTrainingModules);

  // ─── Leads / CRM ─────────────────────────────────────────────────────────
  const [leads, setLeads] = useState(mockLeads);

  // ─── Recruitment applications ────────────────────────────────────────────
  const [applications, setApplications] = useState([]);

  // ─── Portal active tab ───────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('dashboard');

  // ─── Login (role-based) ──────────────────────────────────────────────────
  const login = (email, password, role = 'agent') => {
    if (!email || !password) return false;
    setUserRole(role);
    setCurrentView(role === 'admin' ? 'adminPortal' : 'agentPortal');
    setLoginModalOpen(false);
    setActiveTab(role === 'admin' ? 'overview' : 'dashboard');
    return true;
  };

  const logout = () => {
    setUserRole(null);
    setCurrentView('landing');
    setActiveTab('dashboard');
  };

  // ─── Lead actions ────────────────────────────────────────────────────────
  const addLead = (leadData) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      ...leadData,
      status: 'New',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = (leadId, newStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  // ─── Recruitment application actions ─────────────────────────────────────
  const addApplication = (data) => {
    const newApp = {
      id: `app-${Date.now()}`,
      ...data,
      status: 'Baru',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setApplications((prev) => [newApp, ...prev]);
    return newApp;
  };

  // ─── Admin actions: Agent stats ──────────────────────────────────────────
  const updateAgentStats = (agentId, stats) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === agentId ? { ...a, stats: { ...a.stats, ...stats } } : a
      )
    );
  };

  // ─── Admin actions: Agent performance (ANC, FYC, PR, CPD) ───────────────
  const updateAgentPerformance = (agentId, period, metrics) => {
    // period: 'mtd' | 'ytd', metrics: partial { anc, fyc, pr, cpd }
    setAgents((prev) =>
      prev.map((a) => {
        if (a.id !== agentId) return a;
        const current = a.performance || { mtd: {}, ytd: {} };
        return {
          ...a,
          performance: {
            ...current,
            [period]: { ...current[period], ...metrics },
          },
        };
      })
    );
  };

  // ─── Admin actions: Training modules ─────────────────────────────────────
  const updateTrainingModule = (moduleId, updates) => {
    setTrainingModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, ...updates } : m))
    );
  };

  const addTrainingModule = (moduleData) => {
    const newModule = {
      id: `mod-${Date.now()}`,
      title: moduleData.title || 'New Module',
      description: moduleData.description || '',
      duration: moduleData.duration || '20 min',
      status: 'Not Started',
      progress: 0,
      videoNotes: moduleData.videoNotes || '',
    };
    setTrainingModules((prev) => [...prev, newModule]);
    return newModule;
  };

  const removeTrainingModule = (moduleId) => {
    setTrainingModules((prev) => prev.filter((m) => m.id !== moduleId));
  };

  // ─── Derived: current agent ──────────────────────────────────────────────
  const agent = agents.find((a) => a.id === currentAgentId) || agents[0];

  const value = {
    // Auth & view
    userRole,
    currentView,
    setCurrentView,
    loginModalOpen,
    setLoginModalOpen,
    login,
    logout,

    // Agents
    agents,
    agent,
    currentAgentId,
    setCurrentAgentId,
    updateAgentStats,
    updateAgentPerformance,

    // Training
    trainingModules,
    updateTrainingModule,
    addTrainingModule,
    removeTrainingModule,

    // Leads
    leads,
    addLead,
    updateLeadStatus,

    // Applications
    applications,
    addApplication,

    // UI
    activeTab,
    setActiveTab,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
