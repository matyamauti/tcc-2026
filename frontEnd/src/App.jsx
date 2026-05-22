import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Detections } from './pages/Detections';
import { Reports } from './pages/Reports';
import { History } from './pages/History';
import { Settings } from './pages/Settings';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('pt-BR'));
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('pt-BR'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('pt-BR'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          <Header currentDate={currentDate} currentTime={currentTime} />

          <div className="p-6 lg:p-10 space-y-6 flex-1 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
            <Routes>
              <Route path="/" element={<Dashboard currentDate={currentDate} currentTime={currentTime} />} />
              <Route path="/detections" element={<Detections />} />
              <Route path="/reports" element={<Reports currentTime={currentTime} />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;