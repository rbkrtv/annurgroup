import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import AgentPortal from './pages/AgentPortal';
import AdminPortal from './pages/AdminPortal';
import LoginModal from './components/LoginModal';

function AppContent() {
  const { currentView } = useApp();

  return (
    <>
      {currentView === 'agentPortal' && <AgentPortal />}
      {currentView === 'adminPortal' && <AdminPortal />}
      {currentView === 'landing' && <LandingPage />}
      <LoginModal />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
