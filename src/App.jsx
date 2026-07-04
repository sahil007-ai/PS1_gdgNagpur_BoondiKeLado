import React, { useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import MedicalChatbot from './components/MedicalChatbot';
import ConsentManager from './components/ConsentManager';
import { useLang } from './context/LanguageContext';

const NAV_KEYS = [
  { id: 'dashboard', labelKey: 'nav_timeline', icon: '📋' },
  { id: 'chatbot',   labelKey: 'nav_chatbot',  icon: '🤖' },
  { id: 'consent',   labelKey: 'nav_consent',  icon: '🔒', patientOnly: true },
];

export default function App() {
  const { t, lang, setLang } = useLang();
  const [user, setUser]           = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) return <Auth onLoginSuccess={(u) => setUser(u)} />;

  const displayId = user.idNumber
    ? `****-****-${user.idNumber.slice(-4)}`
    : '****-****-4321';

  const tabs = NAV_KEYS.filter(n => !n.patientOnly || user.role === 'Patient');

  return (
    <div className="flex h-screen overflow-hidden"
      style={{ background: 'linear-gradient(145deg,#EEF6F3 0%,#EBF4FF 60%,#F0FBF7 100%)' }}>

      {/* ── Sidebar ─────────────────────────────── */}
      <aside className="clay-sidebar w-64 flex flex-col justify-between py-8 px-5 flex-shrink-0 z-10">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-3 mb-10 px-1">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-lg"
              style={{ background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)', boxShadow: '4px 4px 12px rgba(78,203,160,0.35),-2px -2px 6px rgba(255,255,255,0.9)' }}>
              H
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none" style={{ color: '#1A3D35' }}>
                {t.appName}
              </h1>
              <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#7ABDB4' }}>
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="space-y-1.5">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button key={tab.id} id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${active ? 'clay-btn text-white' : 'hover:bg-white/50 text-teal-700 hover:text-teal-900'}`}
                  style={active ? { background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)', boxShadow: '4px 4px 12px rgba(78,203,160,0.25),-1px -1px 5px rgba(255,255,255,0.8)' } : {}}>
                  <span className={`text-base ${active ? 'opacity-100' : 'opacity-70'}`}>{tab.icon}</span>
                  {t[tab.labelKey]}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ── Bottom section ───────────────────── */}
        <div className="space-y-3">

          {/* Language switcher */}
          <div className="clay-sm px-4 py-3">
            <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: '#9BBAB4' }}>
              {t.lang_label}
            </p>
            <div className="flex gap-1.5">
              {[
                { code: 'en', label: 'EN — English' },
                { code: 'hi', label: 'HI — हिन्दी' },
              ].map(({ code, label }) => (
                <button key={code} id={`sidebar-lang-${code}`}
                  onClick={() => setLang(code)}
                  className={`flex-1 py-1.5 text-[10px] font-bold rounded-xl transition-all duration-200 ${lang === code ? 'text-white clay-btn' : 'text-teal-700 hover:text-teal-900'}`}
                  style={lang === code
                    ? { background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)', boxShadow: '3px 3px 8px rgba(78,203,160,0.3)' }
                    : { background: 'transparent' }}>
                  {code === 'en' ? 'EN' : 'HI'}
                </button>
              ))}
            </div>
          </div>

          {/* User info */}
          <div className="clay-sm px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#9BBAB4' }}>
                  {t.role_label}
                </p>
                <p className="text-xs font-mono font-bold truncate" style={{ color: '#1A3D35' }}>{displayId}</p>
              </div>
              <button id="logout-btn" onClick={() => setUser(null)}
                className="clay-sm text-[10px] font-bold px-3 py-1.5 hover:text-red-500 transition-colors ml-2 flex-shrink-0"
                style={{ color: '#7A9A94' }}>
                {t.logout}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main content ──────────────────────── */}
      <main className="flex-1 overflow-y-auto px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard user={user} />}
        {activeTab === 'chatbot'   && <MedicalChatbot />}
        {activeTab === 'consent'   && <ConsentManager />}
      </main>
    </div>
  );
}
